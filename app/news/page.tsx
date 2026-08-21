import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Blog } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import { FileText, ArrowRight, Calendar, Bookmark, Building } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default async function NewsPortalPage() {
    const locale = await getLocaleServer();
    let newsList: Blog[] = [];

    try {
        const rawBlogs = await api.getInsights();
        // Filter: ONLY include news & announcements
        newsList = rawBlogs.filter(
            (b) => b.category?.slug === 'berita-pengumuman' || b.category?.name === 'Berita & Pengumuman'
        );
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    const featuredNews = newsList[0];
    const secondaryNews = newsList.slice(1);

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 text-left">
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight">
                        {locale === 'en' ? 'News & Announcements' : 'Kabar & Pengumuman'} <span className="text-brand-blue">{locale === 'en' ? 'Official' : 'Resmi'}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' ? 'Collection of partnership news, latest product innovation releases, and Diggity business achievements.' : 'Kumpulan berita kemitraan, perilisan inovasi produk terbaru, serta pencapaian bisnis Diggity.'}
                    </p>
                </div>

                {newsList.length > 0 ? (
                    <div className="space-y-10">
                        {/* Featured News Block */}
                        {featuredNews && (
                            <Link href={`/news/${featuredNews.slug}`} className="group block">
                                <SpotlightCard className="overflow-hidden border border-glass-border hover:border-brand-blue/30 bg-gradient-to-br from-glass-bg/60 to-glass-bg/30 rounded-3xl transition-all duration-300 hover:scale-[1.005]">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-neutral-950/10 dark:bg-neutral-950/40 border-b lg:border-b-0 lg:border-r border-glass-border overflow-hidden">
                                            {featuredNews.image ? (
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${featuredNews.image}`}
                                                    alt={featuredNews.title}
                                                    fill
                                                    priority
                                                    className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                    <FileText className="w-16 h-16" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-xs text-text-muted font-semibold">
                                                    <Calendar className="w-4 h-4 text-brand-blue" />
                                                    <span>{formatDate(featuredNews.created_at)}</span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                    {featuredNews.title}
                                                </h3>
                                                <div 
                                                    className="text-sm text-text-gray line-clamp-4 leading-relaxed font-medium"
                                                    dangerouslySetInnerHTML={{ __html: featuredNews.content }}
                                                />
                                            </div>
                                            <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-4 border-t border-glass-border/60 group-hover:translate-x-1 transition-transform">
                                                {locale === 'en' ? 'Read More' : 'Baca Selengkapnya'}
                                                <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        )}

                        {/* Secondary News List (2-column layout for other announcements) */}
                        {secondaryNews.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                {secondaryNews.map((news) => (
                                    <Link key={news.id} href={`/news/${news.slug}`} className="group block">
                                        <SpotlightCard className="h-full flex flex-col justify-between border border-glass-border hover:border-brand-blue/30 rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                            <div>
                                                <div className="relative aspect-[16/9] w-full bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                                    {news.image ? (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${news.image}`}
                                                            alt={news.title}
                                                            fill
                                                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                            <FileText className="w-8 h-8" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 space-y-3">
                                                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-semibold">
                                                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                                                        <span>{formatDate(news.created_at)}</span>
                                                    </div>
                                                    <h4 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                                        {news.title}
                                                    </h4>
                                                    <div 
                                                        className="text-xs text-text-gray line-clamp-3 leading-relaxed font-medium"
                                                        dangerouslySetInnerHTML={{ __html: news.content }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-3 border-t border-glass-border group-hover:translate-x-1 transition-transform">
                                                    {locale === 'en' ? 'Read Full News' : 'Baca Berita Lengkap'}
                                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-text-muted py-24 border border-dashed border-glass-border rounded-3xl bg-glass-bg/10">
                        <FileText className="w-12 h-12 mx-auto text-text-muted opacity-40 mb-3" />
                        <p className="text-sm font-semibold">{locale === 'en' ? 'There are currently no official news or announcements released.' : 'Saat ini belum ada berita atau pengumuman resmi yang dirilis.'}</p>
                    </div>
                )}

            </div>
        </div>
    );
}
