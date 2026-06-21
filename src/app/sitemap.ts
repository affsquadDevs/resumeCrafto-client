import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { roles } from '@/lib/roles';
import { authors } from '@/lib/authors';
import { POSTS_PER_PAGE } from '@/components/dashboard/BlogListing';
import { routing } from '@/i18n/routing';
import { localizedUrl } from '@/lib/seo';

type EntryOpts = {
    changeFrequency: 'weekly' | 'monthly';
    priority: number;
    lastModified: Date;
};

export default function sitemap(): MetadataRoute.Sitemap {
    // Emit one entry per locale for each logical path, each carrying the full
    // set of hreflang alternates. Listing every localized URL also means the
    // IndexNow cron (which reads sitemap().url) submits all locale variants.
    const entriesFor = (path: string, opts: EntryOpts): MetadataRoute.Sitemap => {
        const languages: Record<string, string> = {};
        for (const loc of routing.locales) languages[loc] = localizedUrl(path, loc);
        languages['x-default'] = localizedUrl(path, routing.defaultLocale);

        return routing.locales.map((loc) => ({
            url: localizedUrl(path, loc),
            lastModified: opts.lastModified,
            changeFrequency: opts.changeFrequency,
            priority: opts.priority,
            alternates: { languages },
        }));
    };

    const staticPaths = [
        '/', '/how-it-works', '/about', '/contact', '/blog', '/privacy-policy',
        '/terms-of-service', '/resume-builder', '/templates', '/resume-examples',
        '/cover-letter-builder',
    ];
    const staticRoutes = staticPaths.flatMap((p) =>
        entriesFor(p, { changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.8, lastModified: new Date() })
    );

    const blogRoutes = blogPosts.flatMap((post) =>
        entriesFor(`/blog/${post.slug}`, { changeFrequency: 'monthly', priority: 0.7, lastModified: new Date(post.date) })
    );

    const totalBlogPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
    const blogPageRoutes = Array.from({ length: Math.max(0, totalBlogPages - 1) }, (_, i) =>
        entriesFor(`/blog/page/${i + 2}`, { changeFrequency: 'weekly', priority: 0.4, lastModified: new Date() })
    ).flat();

    const roleRoutes = roles.flatMap((role) =>
        entriesFor(`/resume-templates/${role.slug}`, { changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() })
    );

    const authorRoutes = authors.flatMap((author) =>
        entriesFor(`/author/${author.slug}`, { changeFrequency: 'monthly', priority: 0.4, lastModified: new Date() })
    );

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...blogPageRoutes,
        ...roleRoutes,
        ...authorRoutes,
    ];
}
