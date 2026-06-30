// ─── Daily blog generator ─────────────────────────────────────────────────────
// Generates N brand-new blog posts with the Claude API, matching the existing
// posts' voice, structure, length, and on-page SEO, then writes them into this
// repo's blog data model:
//
//   • src/lib/blog-data.ts                 — the blogPosts[] metadata array
//                                            (list page + sitemap). English only.
//   • src/lib/content/articles/en.json     — the English full article body
//                                            (detail page), keyed by slug.
//   • src/lib/content/articles/<locale>.json — translated full articles (10 locales),
//                                            keyed by slug.
//   • src/lib/content/blog/<locale>.json   — translated card metadata (10 locales),
//                                            keyed by slug.
//
// A push of those changes to the default branch triggers the production deploy.
//
// Usage:
//   node scripts/generate-blog.mjs              # generate 2 posts, write files
//   node scripts/generate-blog.mjs --count 1    # generate 1 post
//   node scripts/generate-blog.mjs --no-write   # generate + print, write nothing
//
// Env:
//   ANTHROPIC_API_KEY   required — the Claude API key
//   ANTHROPIC_MODEL     optional — defaults to "claude-opus-4-8"
//
// Dependency-free: Node 20+ global fetch, no npm packages.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Non-default locales. English is the default (served at the root) and lives in
// blog-data.ts + articles/en.json. Keep in sync with src/i18n/routing.ts.
const LOCALES = ["pl", "es", "pt", "fr", "it", "de", "uk", "sv", "cs", "el"];
const LOCALE_NAMES = {
    pl: "Polish", es: "Spanish", pt: "Portuguese", fr: "French", it: "Italian",
    de: "German", uk: "Ukrainian", sv: "Swedish", cs: "Czech", el: "Greek",
};

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const API_KEY = process.env.ANTHROPIC_API_KEY;

const args = process.argv.slice(2);
const COUNT = Number(args[args.indexOf("--count") + 1]) > 0 ? Number(args[args.indexOf("--count") + 1]) : 2;
const NO_WRITE = args.includes("--no-write");

const BLOG_DATA_TS = path.join(ROOT, "src/lib/blog-data.ts");
const articleFile = (l) => path.join(ROOT, `src/lib/content/articles/${l}.json`);
const blogMetaFile = (l) => path.join(ROOT, `src/lib/content/blog/${l}.json`);

const DEFAULT_AUTHOR = "ResumeCraftor Editorial Team";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";

// ─── Tool schemas ─────────────────────────────────────────────────────────────
// A generated post bundles BOTH the card metadata (for blog-data.ts + blog/<locale>.json)
// and the full article (for articles/<locale>.json). Field names exactly match
// this repo's data model.
const POST_SCHEMA = {
    type: "object",
    properties: {
        slug: { type: "string", description: "short, kebab-case, unique" },
        title: { type: "string" },
        excerpt: { type: "string", description: "1-2 sentence blog index card summary" },
        description: { type: "string", description: "meta description / article summary" },
        category: { type: "string" },
        readTime: { type: "string", description: 'e.g. "9 min read"' },
        keywords: { type: "array", items: { type: "string" } },
        faq: {
            type: "array",
            items: {
                type: "object",
                properties: { q: { type: "string" }, a: { type: "string" } },
                required: ["q", "a"],
            },
        },
        contentHtml: {
            type: "string",
            description:
                'Full article body as an HTML string wrapped in <div class="prose prose-lg prose-gray max-w-none">…</div>, using <p>, <h2>, <h3>, <ul><li>, <strong>, <em>, and <a href="/blog/slug" class="text-purple-600 hover:underline"> for internal links.',
        },
    },
    required: ["slug", "title", "excerpt", "description", "category", "readTime", "keywords", "faq", "contentHtml"],
};

const POSTS_TOOL = {
    name: "submit_posts",
    description: "Submit the finished blog post objects.",
    input_schema: {
        type: "object",
        properties: { posts: { type: "array", items: POST_SCHEMA } },
        required: ["posts"],
    },
};

// ─── Anthropic Messages API (tool use → structured, valid JSON) ───────────────
// Forces the model to call submit_posts; the API returns input already parsed as
// an object, so there is no manual JSON.parse (and no "bad control character"
// failures from raw newlines in the HTML body).
async function claudePosts(prompt, maxTokens = 16000) {
    if (!API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: maxTokens,
            tools: [POSTS_TOOL],
            tool_choice: { type: "tool", name: "submit_posts" },
            messages: [{ role: "user", content: prompt }],
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Anthropic API ${res.status}: ${text.slice(0, 500)}`);
    }
    const data = await res.json();
    const tool = (data.content || []).find((b) => b.type === "tool_use");
    if (!tool || !Array.isArray(tool.input?.posts)) {
        throw new Error(`Model did not return posts (stop_reason: ${data.stop_reason})`);
    }
    return tool.input.posts;
}

// ─── Read the English blogPosts[] array out of blog-data.ts ────────────────────
function extractBlogPosts(src) {
    const anchor = src.indexOf("blogPosts: BlogPostMeta[] = ");
    if (anchor < 0) throw new Error("Could not locate blogPosts in blog-data.ts");
    const arrStart = src.indexOf("[", anchor);
    // The array closes at a line that is exactly "];" at column 0.
    const arrEnd = src.indexOf("\n];", arrStart);
    if (arrStart < 0 || arrEnd < 0) throw new Error("Could not locate blogPosts array bounds");
    // The source mixes single/double quotes and trailing-comma-free entries, so it
    // is valid JS but not valid JSON. We only need slugs + ids, so extract those
    // directly with regexes rather than parsing the whole array.
    const arrText = src.slice(arrStart, arrEnd);
    const slugs = [...arrText.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
    const ids = [...arrText.matchAll(/id:\s*['"](\d+)['"]/g)].map((m) => Number(m[1]));
    return { slugs, ids, arrEnd };
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
function generationPrompt(samples, existingSlugs, categories) {
    return `You are a senior writer for ResumeCraftor, an AI resume builder for job seekers. Write ${COUNT} brand-new English blog post(s) for the blog.

Match the EXISTING posts exactly in voice, depth, structure, length, and on-page SEO. Here are ${samples.length} real examples (study their tone, body length ~1500-2200 words, practical guidance, before/after wording examples, and FAQ style):

${JSON.stringify(samples, null, 2)}

STRICT REQUIREMENTS for each new post object:
- "slug": short, kebab-case, unique. MUST NOT be any of these existing slugs: ${JSON.stringify(existingSlugs)}
- "title": specific and useful (not clickbait), like the samples.
- "excerpt": 1-2 sentences for the blog index card (the short list summary).
- "description": 1-2 sentence meta description that includes the primary keyword.
- "category": reuse one of the existing categories where it fits: ${JSON.stringify([...new Set(categories)])}.
- "readTime": like "9 min read", matching the article length.
- "keywords": array of 8-12 target keyword phrases.
- "faq": array of 5-7 {"q","a"} objects, substantive answers (2-4 sentences).
- "contentHtml": the FULL article body as an HTML string. It MUST:
    * be wrapped in a single root element: <div class="prose prose-lg prose-gray max-w-none"> … </div>
    * use only these tags: <p>, <h2>, <h3>, <ul>/<li>, <strong>, <em>, and <a>.
    * NOT include an <h1> (the title renders separately on the page).
    * use plain bare tags WITHOUT extra class attributes on <p>/<h2>/<h3>/<ul>/<li> (only the wrapper div carries classes).
    * for internal links to other posts use root-relative hrefs like <a href="/blog/${existingSlugs[0] ?? "some-slug"}" class="text-purple-600 hover:underline">anchor text</a>. Only link to slugs that exist in the existing-slugs list. Keep all hrefs root-relative (start with "/blog/"); never prefix a locale.
    * be 1500-2200 words of genuinely useful, non-repetitive prose.

Pick fresh, non-overlapping topics that are NOT already covered by the existing slugs. Each post must be on a distinct topic about resumes, job search, ATS, or careers.

Call the submit_posts tool with exactly ${COUNT} post object(s).`;
}

function translationPrompt(localeName, posts) {
    return `Translate the following ${posts.length} blog post object(s) from English into ${localeName} for ResumeCraftor.

RULES:
- Translate these fields naturally and idiomatically: "title", "excerpt", "description", "category", "readTime" (translate the unit, e.g. "9 min read"), "keywords" (translate each phrase), "faq" (both q and a), and "contentHtml".
- In "contentHtml" preserve ALL HTML structure EXACTLY: the same wrapper <div class="prose prose-lg prose-gray max-w-none">, the same <p>/<h2>/<h3>/<ul>/<li>/<strong>/<em>/<a> tags and attributes, and every href. Translate only the visible human text. Keep every href identical and root-relative (do NOT add a locale prefix — the app does that at render time). Do NOT translate the brand name "ResumeCraftor".
- Keep the "slug" field EXACTLY as given in English (do not translate it).

English posts:
${JSON.stringify(posts, null, 2)}

Call the submit_posts tool with exactly ${posts.length} translated post object(s).`;
}

// ─── Serializers ──────────────────────────────────────────────────────────────

// A blog-data.ts array element (BlogPostMeta), 4-space indented to match file.
function toBlogDataElement(post, id) {
    const ordered = {
        id: String(id),
        title: post.title,
        excerpt: post.excerpt,
        author: DEFAULT_AUTHOR,
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        slug: post.slug,
        image: post.image || DEFAULT_IMAGE,
    };
    return JSON.stringify(ordered, null, 4)
        .split("\n")
        .map((line) => "    " + line)
        .join("\n");
}

// A full article entry (articles/<locale>.json value) — LocalizedArticle shape.
function toArticleEntry(post) {
    return {
        title: post.title,
        description: post.description,
        category: post.category,
        readTime: post.readTime,
        keywords: post.keywords,
        faq: post.faq,
        contentHtml: post.contentHtml,
    };
}

// A card-metadata translation entry (blog/<locale>.json value).
function toBlogMetaEntry(post) {
    return {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
    };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const ts = await readFile(BLOG_DATA_TS, "utf8");
    const { slugs: existingSlugs, ids } = extractBlogPosts(ts);
    let nextId = (ids.length ? Math.max(...ids) : 0) + 1;

    const articlesEn = JSON.parse(await readFile(articleFile("en"), "utf8"));
    const categories = Object.values(articlesEn).map((a) => a.category);

    // Two recent full articles as the style reference (trim faq to keep prompt lean).
    const sampleSlugs = Object.keys(articlesEn).slice(-2);
    const samples = sampleSlugs.map((s) => {
        const a = articlesEn[s];
        return { slug: s, ...a, faq: (a.faq || []).slice(0, 2) };
    });

    console.log(`→ Generating ${COUNT} new English post(s) with ${MODEL}…`);
    const generated = await claudePosts(generationPrompt(samples, existingSlugs, categories));

    const today = new Date().toISOString().slice(0, 10);
    const seen = new Set(existingSlugs);
    const newPosts = [];
    for (const p of Array.isArray(generated) ? generated : [generated]) {
        if (!p || !p.slug || !p.contentHtml) { console.warn("  ⚠ skipping malformed post", p?.slug); continue; }
        if (seen.has(p.slug)) { console.warn(`  ⚠ duplicate slug "${p.slug}" — skipping`); continue; }
        seen.add(p.slug);
        newPosts.push({ ...p, date: today, author: DEFAULT_AUTHOR, image: p.image || DEFAULT_IMAGE });
    }
    if (!newPosts.length) throw new Error("Model returned no usable new posts");
    console.log(`  ✓ ${newPosts.length} post(s): ${newPosts.map((p) => p.slug).join(", ")}`);

    // Translate into every non-default locale (one call per locale).
    const translations = {}; // locale -> array (slug-aligned to newPosts)
    for (const loc of LOCALES) {
        console.log(`→ Translating to ${LOCALE_NAMES[loc]} (${loc})…`);
        const arr = await claudePosts(translationPrompt(LOCALE_NAMES[loc], newPosts));
        translations[loc] = newPosts.map((en, i) => {
            const tr = arr.find((t) => t && t.slug === en.slug) || arr[i] || {};
            return { ...en, ...tr, slug: en.slug }; // force English slug
        });
    }

    if (NO_WRITE) {
        console.log("\n--no-write: nothing written. Generated English posts:\n");
        console.log(JSON.stringify(newPosts, null, 2));
        return;
    }

    // 1) Append English metadata into blog-data.ts (before the closing "\n];").
    const freshTs = await readFile(BLOG_DATA_TS, "utf8");
    const insertAt = freshTs.indexOf("\n];", freshTs.indexOf("blogPosts: BlogPostMeta[] = "));
    const tsBlock = newPosts.map((p) => toBlogDataElement(p, nextId++)).join(",\n");
    const newTs = freshTs.slice(0, insertAt) + ",\n" + tsBlock + freshTs.slice(insertAt);
    await writeFile(BLOG_DATA_TS, newTs);
    console.log(`  ✓ wrote ${newPosts.length} post(s) to src/lib/blog-data.ts`);

    // 2) Append English full articles into articles/en.json.
    const enArticles = JSON.parse(await readFile(articleFile("en"), "utf8"));
    for (const p of newPosts) enArticles[p.slug] = toArticleEntry(p);
    await writeFile(articleFile("en"), JSON.stringify(enArticles, null, 2) + "\n");
    console.log(`  ✓ articles/en.json now has ${Object.keys(enArticles).length} articles`);

    // 3) Append translated full articles + card metadata into each locale.
    for (const loc of LOCALES) {
        const arts = JSON.parse(await readFile(articleFile(loc), "utf8"));
        const metas = JSON.parse(await readFile(blogMetaFile(loc), "utf8"));
        for (const tp of translations[loc]) {
            arts[tp.slug] = toArticleEntry(tp);
            metas[tp.slug] = toBlogMetaEntry(tp);
        }
        await writeFile(articleFile(loc), JSON.stringify(arts, null, 2) + "\n");
        await writeFile(blogMetaFile(loc), JSON.stringify(metas, null, 2) + "\n");
        console.log(`  ✓ ${loc}: articles=${Object.keys(arts).length}, blog meta=${Object.keys(metas).length}`);
    }

    console.log("\n✅ Done.");
}

main().catch((err) => {
    console.error("❌", err.message);
    process.exit(1);
});
