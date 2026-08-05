import { MetadataRoute } from 'next';
import { api } from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    try {
        const res = await api.getSitemapUrls();
        if (res.success && Array.isArray(res.urls)) {
            return res.urls.map((item: any) => ({
                url: item.loc.startsWith('http') ? item.loc : `${baseUrl}${item.loc}`,
                lastModified: new Date(item.lastmod),
                changeFrequency: item.changefreq as any,
                priority: parseFloat(item.priority),
            }));
        }
    } catch (err) {
        console.error('Error generating sitemap dynamic routes:', err);
    }

    // Fallback static pages jika API backend bermasalah
    return ['', '/about', '/solutions', '/products', '/academy', '/portfolio', '/insights', '/job-connect', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));
}
