import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { api, Blog } from '../../../lib/api';
import { getLocaleServer } from '../../../lib/locale-server';
import { 
    ArrowLeft, Calendar, User, Share2, Clock, Tag as TagIcon, 
    ArrowRight, Cpu, Layers, GraduationCap, Briefcase 
} from 'lucide-react';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const blog = await api.getInsightBySlug(slug);
        const metaTitle = blog.seo_meta?.meta_title || blog.meta_title || blog.title;
        const metaDesc = blog.seo_meta?.meta_description || blog.meta_description || 'Baca selengkapnya artikel edukasi di Diggity Insights.';
        const canonical = blog.seo_meta?.canonical_url || '';

        return {
            title: `${metaTitle} | Diggity Insights`,
            description: metaDesc,
            alternates: {
                canonical: canonical || undefined,
            },
            openGraph: {
                title: metaTitle,
                description: metaDesc,
                type: 'article',
            }
        };
    } catch {
        return {
            title: 'Artikel Wawasan | Diggity Insights',
        };
    }
}

export default async function BlogDetail({ params }: Props) {
    const locale = await getLocaleServer();
    const isEn = locale === 'en';
    const { slug } = await params;
    let blog: Blog | null = null;
    let relatedBlogs: any[] = [];

    try {
        blog = await api.getInsightBySlug(slug);
        if (blog) {
            const currentBlog = blog;
            const allBlogs = await api.getInsights();
            relatedBlogs = allBlogs
                .filter((b: any) => b.id !== currentBlog.id && b.category_id === currentBlog.category_id)
                .slice(0, 3);
            
            if (relatedBlogs.length < 3) {
                const extraBlogs = allBlogs
                    .filter((b: any) => b.id !== currentBlog.id && !relatedBlogs.some((rb) => rb.id === b.id))
                    .slice(0, 3 - relatedBlogs.length);
                relatedBlogs = [...relatedBlogs, ...extraBlogs];
            }
        }
    } catch (error) {
        console.error('Error fetching blog details / related posts:', error);
    }

    if (!blog) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">{isEn ? 'Article Not Found' : 'Artikel Tidak Ditemukan'}</h1>
                <Link href="/insights/blog" className="text-brand-blue hover:underline">
                    {isEn ? 'Back to Blog' : 'Kembali ke Blog'}
                </Link>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
    const imageUrl = blog.image 
        ? (blog.image.startsWith('http') ? blog.image : `${storageUrl}/${blog.image}`)
        : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';

    // Tags fallback
    const tags = Array.isArray(blog.tags) && blog.tags.length > 0 
        ? blog.tags 
        : [blog.category?.name || 'Technology', 'Digital Growth', 'Engineering'];

    return (
        <div className="relative pt-36 pb-24 md:pt-40 md:pb-28 text-left">
            {blog.seo_meta?.json_ld_schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ 
                        __html: typeof blog.seo_meta.json_ld_schema === 'string'
                            ? blog.seo_meta.json_ld_schema 
                            : JSON.stringify(blog.seo_meta.json_ld_schema) 
                    }}
                />
            )}
            
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-10">
                
                {/* Back Link */}
                <Link
                    href="/insights/blog"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {isEn ? 'Back to Blog & Insights' : 'Kembali ke Blog & Wawasan'}
                </Link>

                {/* 1. JUDUL & 2. METADATA (Urutan Sesuai Brief 3.2) */}
                <div className="space-y-4">
                    {blog.category && (
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            {blog.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                    
                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-muted pt-2 border-b border-glass-border pb-6">
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{blog.author || (isEn ? 'Diggity Editorial' : 'Tim Editorial Diggity')}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-glass-border" />
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{formatDate(blog.created_at)}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-glass-border" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{blog.reading_time || '5 min read'}</span>
                        </div>
                    </div>
                </div>

                {/* 3. GAMBAR UTAMA */}
                <div className="relative aspect-[16/9] bg-neutral-900/10 border border-glass-border rounded-3xl overflow-hidden shadow-xl">
                    <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 4. ISI ARTIKEL */}
                <article 
                    className="prose prose-lg dark:prose-invert max-w-none text-text-main leading-relaxed space-y-6 text-sm md:text-base pt-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* 5. TAGS & SOCIAL SHARE */}
                <div className="pt-8 border-t border-glass-border space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Tags list */}
                        <div className="flex flex-wrap items-center gap-2">
                            <TagIcon className="w-4 h-4 text-brand-blue shrink-0" />
                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
                                Tags:
                            </span>
                            {tags.map((tag) => (
                                <Link 
                                    key={tag}
                                    href={`/insights/blog?search=${encodeURIComponent(tag)}`}
                                    className="px-3 py-1 rounded-lg bg-neutral-950/5 dark:bg-white/5 border border-glass-border hover:border-brand-blue text-xs font-semibold text-text-gray hover:text-brand-blue transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
                                {isEn ? 'Share:' : 'Bagikan:'}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://diggity.id/insights/' + blog.slug)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                                >
                                    <Facebook />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://diggity.id/insights/' + blog.slug)}&text=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                                >
                                    <Twitter />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://diggity.id/insights/' + blog.slug)}&title=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                                >
                                    <Linkedin />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. ARTIKEL TERKAIT */}
                {relatedBlogs.length > 0 && (
                    <div className="pt-12 border-t border-glass-border space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl md:text-2xl font-bold text-text-main">
                                {isEn ? 'Related Articles' : 'Artikel Terkait'}
                            </h3>
                            <Link href="/insights/blog" className="text-xs font-bold text-brand-blue hover:underline">
                                {isEn ? 'View All' : 'Lihat Semua Blog'} &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedBlogs.map((item: any) => {
                                const relImageUrl = item.image 
                                    ? (item.image.startsWith('http') ? item.image : `${storageUrl}/${item.image}`)
                                    : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop';
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/insights/${item.slug}`}
                                        className="group flex flex-col space-y-3 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-brand-blue/30 h-full justify-between shadow-sm"
                                    >
                                        <div className="space-y-3">
                                            <div className="relative aspect-[16/10] bg-neutral-900 border border-glass-border/40 rounded-xl overflow-hidden">
                                                <Image
                                                    src={relImageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                {item.category && (
                                                    <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                                                        {item.category.name}
                                                    </span>
                                                )}
                                                <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-text-muted font-semibold block pt-2 border-t border-glass-border/30">
                                            {formatDate(item.created_at)}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 7. CTA LAYANAN DIGGITY YANG RELEVAN (Solutions, Products, Academy, Career) */}
                <div className="pt-12 border-t border-glass-border space-y-6">
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {isEn ? 'Explore Diggity Ecosystem' : 'Eksplorasi Ekosistem Diggity'}
                        </span>
                        <h3 className="text-2xl font-black text-text-main">
                            {isEn ? 'Accelerate Your Digital Journey' : 'Kembangkan Potensi Digital Anda'}
                        </h3>
                        <p className="text-xs text-text-gray">
                            {isEn 
                                ? 'Discover how our services and products help your team build, scale, and innovate.'
                                : 'Temukan bagaimana layanan, produk, dan program kami membantu bisnis serta talenta berkembang.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* 1. Solutions */}
                        <Link href="/solutions" className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue transition-all group flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                    <Cpu className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                    Diggity Solutions
                                </h4>
                                <p className="text-[11px] text-text-gray leading-relaxed">
                                    Software development, AI, cloud, dan pemasaran digital.
                                </p>
                            </div>
                            <span className="text-[11px] font-bold text-brand-blue inline-flex items-center gap-1 pt-2 border-t border-glass-border">
                                {isEn ? 'Explore' : 'Jelajahi Solusi'} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>

                        {/* 2. Products */}
                        <Link href="/products" className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue transition-all group flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                                    <Layers className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                    Diggity Products
                                </h4>
                                <p className="text-[11px] text-text-gray leading-relaxed">
                                    Business Software &amp; Digital Marketplace siap pakai.
                                </p>
                            </div>
                            <span className="text-[11px] font-bold text-brand-blue inline-flex items-center gap-1 pt-2 border-t border-glass-border">
                                {isEn ? 'Explore' : 'Lihat Produk'} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>

                        {/* 3. Academy */}
                        <Link href="/academy" className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue transition-all group flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                    Diggity Academy
                                </h4>
                                <p className="text-[11px] text-text-gray leading-relaxed">
                                    Bootcamp koding, sertifikasi profesi, dan corporate training.
                                </p>
                            </div>
                            <span className="text-[11px] font-bold text-brand-blue inline-flex items-center gap-1 pt-2 border-t border-glass-border">
                                {isEn ? 'Explore' : 'Ikuti Program'} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>

                        {/* 4. Career */}
                        <Link href="/job-connect" className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue transition-all group flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                    Karier &amp; Rekrutmen
                                </h4>
                                <p className="text-[11px] text-text-gray leading-relaxed">
                                    Lamar lowongan kerja teknologi atau bergabung jadi mentor.
                                </p>
                            </div>
                            <span className="text-[11px] font-bold text-brand-blue inline-flex items-center gap-1 pt-2 border-t border-glass-border">
                                {isEn ? 'Explore' : 'Lihat Peluang'} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
