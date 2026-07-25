import { MetadataRoute } from 'next';
import { api } from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static pages
    const staticRoutes = ['', '/about', '/services', '/portfolio', '/pricing', '/blog', '/career', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    let blogRoutes: any[] = [];
    let portfolioRoutes: any[] = [];
    let serviceRoutes: any[] = [];
    let careerRoutes: any[] = [];

    try {
        const [blogs, portfolios, services, careers] = await Promise.all([
            api.getBlogs().catch(() => []),
            api.getPortfolios().catch(() => []),
            api.getServices().catch(() => []),
            api.getCareers().catch(() => []),
        ]);

        blogRoutes = blogs.map((item) => ({
            url: `${baseUrl}/blog/${item.slug}`,
            lastModified: new Date(item.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        portfolioRoutes = portfolios.map((item) => ({
            url: `${baseUrl}/portfolio/${item.slug}`,
            lastModified: new Date(item.created_at || new Date()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        serviceRoutes = services.map((item) => ({
            url: `${baseUrl}/services/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

        careerRoutes = careers.filter((c) => c.is_active).map((item) => ({
            url: `${baseUrl}/career/${item.slug}`,
            lastModified: new Date(item.created_at || new Date()),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));
    } catch (err) {
        console.error('Error generating sitemap dynamic routes:', err);
    }

    return [...staticRoutes, ...blogRoutes, ...portfolioRoutes, ...serviceRoutes, ...careerRoutes];
}
