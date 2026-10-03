'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { Search, ArrowRight, Calendar, Tag, Radio } from 'lucide-react';

const CATEGORIES = [
    'Company', 'Products', 'Solutions', 'Partnership', 
    'Academy', 'Achievement', 'Events', 'Announcement'
];

export default function NewsHubPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Dummy data for visual layout.
    const featuredNews = { 
        id: 1, 
        title: 'Diggity Announces New Strategic Partnership with Global AI Leader', 
        category: 'Partnership', 
        excerpt: 'Diggity expands its collaboration ecosystem through a strategic partnership focused on digital technology and talent development...', 
        date: '28 Sep 2026', 
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1000&auto=format&fit=crop'
    };

    const supportingNews = [
        { id: 2, title: 'Peluncuran Diggity HRIS 2.0 dengan Fitur AI Automation', category: 'Products', date: '25 Sep 2026' },
        { id: 3, title: 'Diggity Academy Buka Batch Baru Full-Stack Bootcamp', category: 'Academy', date: '20 Sep 2026' },
        { id: 4, title: 'Pencapaian: Diggity Meraih Sertifikasi ISO 27001', category: 'Achievement', date: '15 Sep 2026' },
        { id: 5, title: 'Maintenance Server Terjadwal - Oktober 2026', category: 'Announcement', date: '10 Sep 2026' },
    ];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-sm font-bold text-text-gray tracking-widest uppercase mb-4">DIGGITY NEWS & ANNOUNCEMENTS</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        What&apos;s New at Diggity?
                    </h1>
                    <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Follow the latest Diggity updates—from product and service launches, partnerships, achievements, Academy programs, to various activities and important announcements.' 
                            : 'Ikuti perkembangan terbaru Diggity—mulai dari peluncuran produk dan layanan, partnership, pencapaian, program Academy, hingga berbagai aktivitas dan pengumuman penting.'}
                    </p>
                    
                    <div className="max-w-2xl mx-auto relative group mb-12">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-text-gray" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={locale === 'en' ? "Search news & announcements..." : "Cari berita & pengumuman..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-text-main shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <button 
                            onClick={() => setActiveCategory('All')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-indigo-500'}`}
                        >
                            All
                        </button>
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-indigo-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. LATEST NEWS (FEATURED + SUPPORTING) */}
            <section className="py-20 px-6 relative z-10 max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up" className="mb-10 flex items-center gap-3">
                    <Radio className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-3xl font-black text-text-main">
                        {locale === 'en' ? 'Latest News' : 'Berita Terbaru'}
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Featured News (Left 8 cols) */}
                    <div className="lg:col-span-8 h-full">
                        <ScrollReveal animation="slide-right" className="h-full">
                            <Link href={`/insights/news/slug`} className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col">
                                <div className="w-full aspect-[2/1] bg-slate-200 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={featuredNews.image} alt="Featured News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-xs tracking-widest uppercase mb-4 w-fit">
                                        {featuredNews.category}
                                    </div>
                                    <h3 className="text-3xl font-black text-text-main mb-4 group-hover:text-indigo-500 transition-colors leading-tight">{featuredNews.title}</h3>
                                    <p className="text-lg text-text-gray font-medium mb-6 line-clamp-2">{featuredNews.excerpt}</p>
                                    <div className="mt-auto flex items-center justify-between text-sm font-medium text-text-gray">
                                        <div className="flex items-center gap-3">
                                            <span>{featuredNews.date}</span>
                                            <div className="w-1 h-1 rounded-full bg-glass-border"></div>
                                            <span>{featuredNews.readTime}</span>
                                        </div>
                                        <div className="text-indigo-500 font-bold flex items-center gap-1">
                                            Read News <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* Supporting News List (Right 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {supportingNews.map((news, i) => (
                            <ScrollReveal key={news.id} animation="slide-left" delay={i * 100} className="flex-1">
                                <Link href={`/insights/news/slug`} className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Tag className="w-4 h-4 text-indigo-500" />
                                        <span className="text-indigo-500 font-bold text-xs tracking-widest uppercase">{news.category}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-text-main mb-4 group-hover:text-indigo-500 transition-colors leading-snug">{news.title}</h4>
                                    <div className="mt-auto flex items-center gap-2 text-xs font-medium text-text-gray">
                                        <Calendar className="w-4 h-4" />
                                        <span>{news.date}</span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                        
                        <ScrollReveal animation="slide-left" delay={400} className="mt-2">
                            <Link href="/insights/news" className="block w-full py-4 text-center rounded-2xl bg-indigo-500/10 text-indigo-500 font-bold hover:bg-indigo-500 hover:text-white transition-colors">
                                View All News
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
