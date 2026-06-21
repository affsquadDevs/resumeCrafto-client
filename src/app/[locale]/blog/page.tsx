import { Metadata } from "next";
import { getLocalizedBlogPosts } from "@/lib/blog-data";
import { BlogListing, POSTS_PER_PAGE } from "@/components/dashboard/BlogListing";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Blog & Career Tips",
        description: "Expert advice on resume writing, ATS optimization, personal branding, and career progression. Learn how to create a professional resume that gets interviews.",
        openGraph: {
            title: "Blog & Career Tips | ResumeCraftor",
            description: "Expert advice on resume writing, ATS optimization, personal branding, and career progression.",
            url: localizedUrl("/blog", locale),
            siteName: "ResumeCraftor",
            locale: ogLocale(locale),
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Blog & Career Tips | ResumeCraftor",
            description: "Expert advice on resume writing, ATS optimization, personal branding, and career progression.",
        },
        alternates: buildAlternates("/blog", locale),
    };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const localizedPosts = getLocalizedBlogPosts(locale);
    const totalPages = Math.max(1, Math.ceil(localizedPosts.length / POSTS_PER_PAGE));
    const posts = localizedPosts.slice(0, POSTS_PER_PAGE);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://resumecraftor.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://resumecraftor.com/blog"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <BlogListing posts={posts} currentPage={1} totalPages={totalPages} />
        </>
    );
}
