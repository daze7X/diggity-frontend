import { Metadata } from 'next';

interface SeoData {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    canonical_url?: string;
    json_ld_schema?: Record<string, string>;
}

export function generatePageMetadata(
    seoData?: SeoData | null,
    defaults?: { title?: string; description?: string; path?: string }
): Metadata {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://diggity.id';
    
    const title = seoData?.meta_title || defaults?.title || 'Diggity - Corporate IT Solutions & Learning';
    const description = seoData?.meta_description || defaults?.description || 'Diggity menyediakan solusi teknologi informasi korporasi kelas dunia, lisensi produk digital premium, dan pelatihan pemrograman intensif.';
    const canonical = seoData?.canonical_url || (defaults?.path ? `${siteUrl}${defaults.path}` : siteUrl);
    const keywords = seoData?.meta_keywords || 'IT solutions, software development, LMS, coding academy, midtrans, nextjs';

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'Diggity',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}
