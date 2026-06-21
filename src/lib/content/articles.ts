import articlesPl from "./articles/pl.json";
import articlesEs from "./articles/es.json";
import articlesPt from "./articles/pt.json";
import articlesFr from "./articles/fr.json";
import articlesIt from "./articles/it.json";
import articlesDe from "./articles/de.json";
import articlesUk from "./articles/uk.json";
import articlesSv from "./articles/sv.json";
import articlesCs from "./articles/cs.json";
import articlesEl from "./articles/el.json";
import articlesEn from "./articles/en.json";

// A fully-translated blog article for a non-English locale. English articles
// keep their original JSX bodies (in the page), so there is no `en` entry here.
export interface LocalizedArticle {
    title: string;
    description: string;
    category: string;
    readTime: string;
    keywords?: string[];
    faq?: { q: string; a: string }[];
    contentHtml: string;
}

const ARTICLE_TRANSLATIONS = {
    // `en` only contains the new data-driven articles; legacy articles keep
    // their JSX bodies in the page and are absent here (so getLocalizedArticle
    // returns undefined for them in English, and the page renders the JSX).
    en: articlesEn,
    pl: articlesPl, es: articlesEs, pt: articlesPt, fr: articlesFr, it: articlesIt,
    de: articlesDe, uk: articlesUk, sv: articlesSv, cs: articlesCs, el: articlesEl,
} as Record<string, Record<string, LocalizedArticle>>;

// Returns the translated article for a locale, or undefined for English /
// missing translations (caller falls back to the original JSX content).
export function getLocalizedArticle(slug: string, locale: string): LocalizedArticle | undefined {
    return ARTICLE_TRANSLATIONS[locale]?.[slug];
}

// Rewrites root-relative internal links in translated article HTML so they keep
// the active locale (e.g. href="/blog/x" -> href="/de/blog/x"). External links
// (http...) and already-prefixed links are left untouched. No-op for English.
export function localizeArticleHtml(html: string, locale: string): string {
    if (locale === "en") return html;
    return html.replace(/href="\/(?!\/)/g, `href="/${locale}/`);
}
