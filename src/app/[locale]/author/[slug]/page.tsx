import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { authors, getAuthor } from "@/lib/authors";
import { blogPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
    return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const author = getAuthor(slug);

    if (!author) {
        return { title: "Author Not Found" };
    }

    const canonical = `https://resumecraftor.com/author/${slug}`;

    return {
        title: author.name,
        description: author.bio,
        alternates: {
            canonical,
        },
        openGraph: {
            title: `${author.name} | ResumeCraftor`,
            description: author.bio,
            url: canonical,
            siteName: "ResumeCraftor",
            locale: "en_US",
            type: "profile",
        },
    };
}

export default async function AuthorPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("AuthorPage");
    const author = getAuthor(slug);

    if (!author) {
        notFound();
    }

    const canonical = `https://resumecraftor.com/author/${slug}`;
    const authorPosts = blogPosts.filter((post) => post.author === author.name);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://resumecraftor.com/",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": author.name,
                "item": canonical,
            },
        ],
    };

    const profileSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": author.type,
            "name": author.name,
            "url": canonical,
            "description": author.bio,
            "sameAs": author.sameAs,
            "knowsAbout": author.expertise,
        },
    };

    return (
        <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-700">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
            />
            <CraftorNavbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-6">
                            {author.role}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            {author.name}
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl">
                            {author.bio}
                        </p>
                    </div>

                    <section className="mb-16">
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">
                            {t("areasOfExpertise")}
                        </h2>
                        <ul className="flex flex-wrap gap-3">
                            {author.expertise.map((item) => (
                                <li
                                    key={item}
                                    className="px-4 py-2 rounded-full border border-gray-100 bg-gray-50 text-gray-700 text-sm font-bold"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
                            {t("articlesBy", { name: author.name })}
                        </h2>

                        {authorPosts.length === 0 ? (
                            <p className="text-gray-600 font-medium">
                                {t("noArticles")}
                            </p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {authorPosts.map((post) => (
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        key={post.id}
                                        title={post.title}
                                        aria-label={t("readArticleAria", { title: post.title })}
                                        className="group cursor-pointer rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-500 bg-white p-8"
                                    >
                                        <div className="mb-4">
                                            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-medium">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-50 font-bold">
                                            <span>
                                                {new Date(post.date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-2 text-purple-600">
                                                {t("readArticle")}
                                                <ArrowRight
                                                    size={18}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <DashboardFooter />
        </div>
    );
}
