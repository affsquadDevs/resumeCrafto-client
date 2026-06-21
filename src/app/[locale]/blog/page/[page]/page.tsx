import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getLocalizedBlogPosts } from "@/lib/blog-data";
import { BlogListing, POSTS_PER_PAGE } from "@/components/dashboard/BlogListing";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));

export function generateStaticParams() {
    // Page 1 lives at /blog; generate /blog/page/2 ... /blog/page/N
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
        page: String(i + 2),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
    const { locale, page } = await params;
    const pageNum = Number(page);
    return {
        title: `Blog & Career Tips — Page ${pageNum}`,
        description: "Expert advice on resume writing, ATS optimization, personal branding, and career progression.",
        alternates: buildAlternates(`/blog/page/${pageNum}`, locale),
        openGraph: {
            title: `Blog & Career Tips — Page ${pageNum} | ResumeCraftor`,
            description: "Expert advice on resume writing, ATS optimization, personal branding, and career progression.",
            url: localizedUrl(`/blog/page/${pageNum}`, locale),
            siteName: "ResumeCraftor",
            locale: ogLocale(locale),
            type: "website",
        },
    };
}

export default async function BlogPaginatedPage({
    params,
}: {
    params: Promise<{ locale: string; page: string }>;
}) {
    const { locale, page } = await params;
    setRequestLocale(locale);
    const pageNum = Number(page);

    // Page 1 canonically lives at /blog; reject invalid/out-of-range pages.
    if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > totalPages) {
        notFound();
    }

    const start = (pageNum - 1) * POSTS_PER_PAGE;
    const posts = getLocalizedBlogPosts(locale).slice(start, start + POSTS_PER_PAGE);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://resumecraftor.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://resumecraftor.com/blog" },
            { "@type": "ListItem", "position": 3, "name": `Page ${pageNum}`, "item": `https://resumecraftor.com/blog/page/${pageNum}` },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <BlogListing posts={posts} currentPage={pageNum} totalPages={totalPages} />
        </>
    );
}
