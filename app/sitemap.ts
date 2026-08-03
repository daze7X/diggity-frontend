import { MetadataRoute } from 'next';
import { api } from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static pages
    const staticRoutes = ['', '/about', '/solutions', '/products', '/academy', '/portfolio', '/insights', '/job-connect', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    let insightRoutes: any[] = [];
    let portfolioRoutes: any[] = [];
    let solutionRoutes: any[] = [];
    let productRoutes: any[] = [];
    let courseRoutes: any[] = [];
    let jobConnectRoutes: any[] = [];

    try {
        const [insights, portfolios, solutions, products, courses, jobs] = await Promise.all([
            api.getInsights().catch(() => []),
            api.getPortfolios().catch(() => []),
            api.getSolutions().catch(() => []),
            api.getProducts().catch(() => []),
            api.getCourses().catch(() => []),
            api.getJobConnect().catch(() => []),
        ]);

        insightRoutes = insights.map((item) => ({
            url: `${baseUrl}/insights/${item.slug}`,
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

        solutionRoutes = solutions.map((item) => ({
            url: `${baseUrl}/solutions/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

        productRoutes = products.map((item) => ({
            url: `${baseUrl}/products/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        courseRoutes = courses.map((item) => ({
            url: `${baseUrl}/academy/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        jobConnectRoutes = jobs.map((item) => ({
            url: `${baseUrl}/job-connect/${item.slug}`,
            lastModified: new Date(item.created_at || new Date()),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));
    } catch (err) {
        console.error('Error generating sitemap dynamic routes:', err);
    }

    return [
        ...staticRoutes,
        ...insightRoutes,
        ...portfolioRoutes,
        ...solutionRoutes,
        ...productRoutes,
        ...courseRoutes,
        ...jobConnectRoutes,
    ];
}
