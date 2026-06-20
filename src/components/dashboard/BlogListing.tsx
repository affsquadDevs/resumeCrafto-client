import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import type { BlogPostMeta } from "@/lib/blog-data";

export const POSTS_PER_PAGE = 9;

function pageHref(page: number) {
    return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

interface BlogListingProps {
    posts: BlogPostMeta[];
    currentPage: number;
    totalPages: number;
}

export function BlogListing({ posts, currentPage, totalPages }: BlogListingProps) {
    const t = useTranslations("BlogListing");
    return (
        <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-700">
            <CraftorNavbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
                            {currentPage > 1 ? t("heroTitlePaged", { page: currentPage }) : t("heroTitle")}
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.id}
                                title={post.title}
                                aria-label={t("readArticleAria", { title: post.title })}
                                className="group cursor-pointer rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-500 bg-white"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-purple-600 text-xs font-bold shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-medium">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-col gap-4 text-sm text-gray-500 pt-6 border-t border-gray-50 font-bold">
                                        <div className="flex items-center justify-between w-full">
                                            <span>{post.author}</span>
                                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-600">
                                            <span>{t("readArticle")}</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav className="flex items-center justify-center gap-2 mt-16" aria-label={t("paginationAria")}>
                            {currentPage > 1 && (
                                <Link
                                    href={pageHref(currentPage - 1)}
                                    rel="prev"
                                    className="px-4 py-2 rounded-xl font-bold text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                >
                                    {t("previous")}
                                </Link>
                            )}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={pageHref(page)}
                                    aria-current={page === currentPage ? "page" : undefined}
                                    className={`px-4 py-2 rounded-xl font-bold transition-colors ${page === currentPage
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"}`}
                                >
                                    {page}
                                </Link>
                            ))}
                            {currentPage < totalPages && (
                                <Link
                                    href={pageHref(currentPage + 1)}
                                    rel="next"
                                    className="px-4 py-2 rounded-xl font-bold text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                >
                                    {t("next")}
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </main>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        {t("ctaTitle")}
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        {t("ctaSubtitle")}
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        <span>{t("ctaButton")}</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <DashboardFooter />
        </div>
    );
}
