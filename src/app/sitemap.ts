import { MetadataRoute } from 'next';

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
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogPosts = [
        'how-to-write-a-strategic-resume',
        'how-to-make-your-resume-sound-more-senior',
        'resume-keywords-for-ats',
        'ats-resume-formatting-tips',
        'what-is-an-ats-resume',
        'how-to-make-your-resume-reflect-leadership',
        'ats-optimization-getting-past-the-robots',
        'building-your-personal-brand-through-your-resume',
        'how-to-choose-the-perfect-resume-template',
        'how-to-build-a-professional-resume-step-by-step',
    ].map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogPosts];
}
