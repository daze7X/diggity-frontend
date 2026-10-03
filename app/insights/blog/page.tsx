'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { Search, ArrowRight, Clock, User, ChevronRight, Mail } from 'lucide-react';

const CATEGORIES = [
    'AI & Data', 'Technology', 'Creative', 'Marketing', 'Business', 'Cloud & Cyber Security'
];

export default function BlogHubPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Dummy data for visual layout. In real app, fetch from CMS.
    const featuredArticles = [
        { id: 1, title: 'How AI Agents Are Changing Business Automation', category: 'AI & Data', excerpt: 'AI Agents mulai mengubah cara bisnis menjalankan proses operasional...', author: 'Diggity Editorial', readTime: '8 min read', date: '28 Sep 2026', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop', isMain: true },
        { id: 2, title: '10 Cara Meningkatkan Kecepatan Website Next.js Anda', category: 'Technology', excerpt: 'Optimasi performa website untuk meningkatkan conversion rate dan SEO ranking.', author: 'Tech Team', readTime: '5 min read', date: '25 Sep 2026', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop', isMain: false },
        { id: 3, title: 'Panduan SEO Pemula untuk Menembus Peringkat 1 Google', category: 'Marketing', excerpt: 'Langkah praktis optimasi on-page dan off-page untuk website bisnis.', author: 'Growth Team', readTime: '12 min read', date: '20 Sep 2026', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop', isMain: false },
        { id: 4, title: 'Pentingnya UI/UX Design untuk Meningkatkan Retention Rate', category: 'Creative', excerpt: 'Bagaimana desain interaksi mempengaruhi loyalitas pengguna.', author: 'Design Team', readTime: '6 min read', date: '15 Sep 2026', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', isMain: false },
    ];

    const latestArticles = [
        { id: 5, title: 'Membangun Sistem Informasi Skala Enterprise Berbasis Laravel Filament', category: 'Technology', excerpt: 'Panduan teknis membangun sistem backend modern untuk perusahaan.', author: 'Aji', readTime: '10 min read', date: '10 Sep 2026', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop' },
        { id: 6, title: 'Fundamental Data Analytics untuk Pengambilan Keputusan Bisnis', category: 'AI & Data', excerpt: 'Ubah data mentah menjadi insight yang actionable.', author: 'Data Team', readTime: '7 min read', date: '08 Sep 2026', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' },
        { id: 7, title: 'Strategi Rebranding: Kapan Waktu yang Tepat Melakukannya?', category: 'Creative', excerpt: 'Evaluasi identitas visual perusahaan Anda agar tetap relevan di era digital.', author: 'Brand Strategy', readTime: '6 min read', date: '05 Sep 2026', image: 'https://images.unsplash.com/photo-1542744094-24638ea0b5b5?q=80&w=1000&auto=format&fit=crop' },
        { id: 8, title: 'Masa Depan Cyber Security di Tengah Ancaman Ransomware', category: 'Cloud & Cyber Security', excerpt: 'Langkah pencegahan dan mitigasi risiko keamanan data perusahaan.', author: 'SecOps', readTime: '9 min read', date: '01 Sep 2026', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-sm font-bold text-text-gray tracking-widest uppercase mb-4">DIGGITY BLOG & EDUCATION</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Learn Something New. ' : 'Pelajari Hal Baru. '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500 block sm:inline">
                            {locale === 'en' ? 'Build Something Better.' : 'Bangun Sesuatu yang Lebih Baik.'}
                        </span>
                    </h1>
                    <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Learn technology, AI, business, creativity, marketing, and digital transformation through practical insights and tutorials from Diggity.' 
                            : 'Pelajari teknologi, AI, bisnis, kreativitas, marketing, dan digital transformation melalui insight, tutorial, dan panduan praktis dari Diggity.'}
                    </p>
                    
                    <div className="max-w-2xl mx-auto relative group mb-12">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-text-gray" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={locale === 'en' ? "Search articles, topics, or keywords..." : "Cari artikel, topik, atau kata kunci..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-text-main shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <button 
                            onClick={() => setActiveCategory('All')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-brand-blue text-white' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-brand-blue'}`}
                        >
                            All
                        </button>
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-brand-blue text-white' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-brand-blue'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. FEATURED ARTICLES */}
            <section className="py-20 px-6 relative z-10 max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up" className="mb-10">
                    <h2 className="text-3xl font-black text-text-main">
                        {locale === 'en' ? 'Featured Insights' : 'Artikel Pilihan'}
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Featured Article (Left 8 cols) */}
                    <div className="lg:col-span-8 h-full">
                        <ScrollReveal animation="slide-right" className="h-full">
                            <Link href={`/insights/blog/slug`} className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 transition-all shadow-sm hover:shadow-xl flex flex-col">
                                <div className="w-full aspect-video bg-slate-200 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={featuredArticles[0].image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <div className="text-brand-blue font-bold text-sm tracking-widest uppercase mb-3">{featuredArticles[0].category}</div>
                                    <h3 className="text-3xl lg:text-4xl font-black text-text-main mb-4 group-hover:text-brand-blue transition-colors leading-tight">{featuredArticles[0].title}</h3>
                                    <p className="text-lg text-text-gray font-medium mb-6 line-clamp-2">{featuredArticles[0].excerpt}</p>
                                    <div className="mt-auto flex items-center gap-4 text-sm font-medium text-text-gray">
                                        <div className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredArticles[0].author}</div>
                                        <div className="w-1 h-1 rounded-full bg-glass-border"></div>
                                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredArticles[0].readTime}</div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* 3 Supporting Articles (Right 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {featuredArticles.slice(1).map((article, i) => (
                            <ScrollReveal key={article.id} animation="slide-left" delay={i * 100} className="flex-1">
                                <Link href={`/insights/blog/slug`} className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-2xl p-5 hover:border-brand-blue/50 transition-all flex flex-col">
                                    <div className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-2">{article.category}</div>
                                    <h4 className="text-lg font-bold text-text-main mb-2 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">{article.title}</h4>
                                    <div className="mt-auto flex items-center gap-3 text-xs font-medium text-text-gray pt-4 border-t border-glass-border">
                                        <span>{article.date}</span>
                                        <div className="w-1 h-1 rounded-full bg-glass-border"></div>
                                        <span>{article.readTime}</span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03. LATEST ARTICLES (GRID) */}
            <section className="py-20 px-6 relative z-10 bg-brand-blue/5 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-text-main mb-2">
                                {locale === 'en' ? 'Latest Articles' : 'Artikel Terbaru'}
                            </h2>
                            <p className="text-text-gray font-medium">Pelajari teknologi dan strategi digital yang membantu kamu terus berkembang.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestArticles.map((article, i) => (
                            <ScrollReveal key={article.id} animation="fade-up" delay={i * 100}>
                                <Link href={`/insights/blog/slug`} className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all flex flex-col">
                                    <div className="w-full aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col grow">
                                        <div className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-2">{article.category}</div>
                                        <h4 className="text-xl font-bold text-text-main mb-3 group-hover:text-brand-blue transition-colors leading-snug line-clamp-3">{article.title}</h4>
                                        <p className="text-sm text-text-gray font-medium mb-6 line-clamp-2">{article.excerpt}</p>
                                        <div className="mt-auto flex items-center gap-3 text-xs font-medium text-text-gray pt-4 border-t border-glass-border">
                                            <span>{article.date}</span>
                                            <div className="w-1 h-1 rounded-full bg-glass-border"></div>
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-3 rounded-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue text-text-main font-bold transition-all">
                            {locale === 'en' ? 'Load More Articles' : 'Muat Lebih Banyak Artikel'}
                        </button>
                    </div>
                </div>
            </section>

            {/* 04. NEWSLETTER */}
            <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto text-center">
                <ScrollReveal animation="fade-up">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-8 rotate-12">
                        <Mail className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6">Stay in the Loop.</h2>
                    <p className="text-lg text-text-gray font-medium mb-10 max-w-2xl mx-auto">
                        {locale === 'en' 
                            ? 'Get the latest insights on technology, AI, business, and digital growth directly to your inbox.' 
                            : 'Dapatkan insight terbaru tentang teknologi, AI, bisnis, dan digital growth langsung ke inbox kamu.'}
                    </p>
                    
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex-1 px-6 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-text-main"
                            required
                        />
                        <button type="submit" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-colors">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-text-gray mt-6">
                        I agree to receive Diggity Insights and relevant updates.
                    </p>
                </ScrollReveal>
            </section>
        </div>
    );
}
