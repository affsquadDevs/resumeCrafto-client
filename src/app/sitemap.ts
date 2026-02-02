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
        'future-of-resume-design-ai',
        'resume-mistakes-cost-interview',
        'choose-perfect-resume-template',
        'psychology-color-resume-design',
        'ats-optimization-getting-past-robots',
        'building-personal-brand-resume',
    ].map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogPosts];
}
