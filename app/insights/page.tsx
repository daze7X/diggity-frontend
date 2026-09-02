import React, { Suspense } from 'react';
import { api, Category, Blog } from '../../lib/api';
import BlogList from '../../components/BlogList';
import { getLocaleServer } from '../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function BlogPage() {
    const locale = await getLocaleServer();
    let blogs: Blog[] = [];
    let categories: Category[] = [];

    try {
        let rawBlogs = await api.getInsights();
        
        // Filter out news articles (category: Berita & Pengumuman)
        blogs = rawBlogs.filter(
            (b) => b.category?.slug !== 'berita-pengumuman' && b.category?.name !== 'Berita & Pengumuman'
        );
        
        // Extract unique categories from blogs
        const categoriesMap: Record<string, Category> = {};
        blogs.forEach((b) => {
            if (b.category) {
                categoriesMap[b.category.name] = b.category;
            }
        });
        categories = Object.values(categoriesMap);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }

    return (
                <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    
                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>
                    
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-6 inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                        {locale === 'en' ? 'Knowledge Hub' : 'Pusat Wawasan'}
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                        {locale === 'en' ? (
                            <>Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Education</span></>
                        ) : (
                            <>Wawasan & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Edukasi</span></>
                        )}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        {locale === 'en' 
                            ? 'Educational articles, latest tech trends, and practical digital marketing guides.' 
                            : 'Artikel edukasi, tren teknologi terbaru, dan panduan praktis digital marketing.'}
                    </p>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Overlapping) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-24">
                <div className="bg-gray-50/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-10 shadow-2xl">
                    {/* Blog Filter & Grid List */}
                    <Suspense fallback={<div className="text-center py-12 text-sm text-text-gray font-semibold">{locale === 'en' ? 'Loading articles...' : 'Memuat artikel...'}</div>}>
                        <BlogList blogs={blogs} categories={categories} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
