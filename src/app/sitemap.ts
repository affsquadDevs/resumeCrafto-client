import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { roles } from '@/lib/roles';
import { authors } from '@/lib/authors';
import { POSTS_PER_PAGE } from '@/components/dashboard/BlogListing';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://resumecraftor.com';

    const staticRoutes = [
        '',
        '/how-it-works',
        '/about',
        '/contact',
        '/blog',
        '/privacy-policy',
        '/terms-of-service',
        '/resume-builder',
        '/templates',
        '/resume-examples',
        '/cover-letter-builder',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Paginated blog index pages (page 1 lives at /blog)
    const totalBlogPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
    const blogPageRoutes = Array.from({ length: Math.max(0, totalBlogPages - 1) }, (_, i) => ({
        url: `${baseUrl}/blog/page/${i + 2}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.4,
    }));

    const roleRoutes = roles.map((role) => ({
        url: `${baseUrl}/resume-templates/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const authorRoutes = authors.map((author) => ({
        url: `${baseUrl}/author/${author.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    }));

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...blogPageRoutes,
        ...roleRoutes,
        ...authorRoutes,
    ];
}
