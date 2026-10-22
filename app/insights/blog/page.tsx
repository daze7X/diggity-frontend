'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { api, Blog } from '../../../lib/api';
import { Search, ArrowRight, Clock, User, ChevronRight, Mail, Tag, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
    'All', 'Technology', 'AI & Data', 'Creative', 'Marketing', 'Cloud & Cyber Security'
];

function BlogHubContent() {
    const { language: locale } = useLanguage();
    const isEn = locale === 'en';
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('search') || '';

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [activeCategory, setActiveCategory] = useState('All');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);

    // Fallback blogs if database has few
    const fallbackBlogs: Blog[] = [
        {
            id: 1,
            category_id: 1,
            title: '5 Teknologi Web Modern Terbaik di Tahun 2026',
            slug: '5-teknologi-web-modern-terbaik-2026',
            content: 'Dunia pengembangan web bergerak sangat cepat. Di tahun 2026 ini, Next.js 16, Tailwind v4, dan TypeScript mendominasi ekosistem web skala enterprise.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
            author: 'Diggity Engineering',
            reading_time: '6 min read',
            category: { id: 1, name: 'Technology' },
            tags: ['Next.js', 'Tailwind', 'Engineering'],
            created_at: '2026-09-28'
        },
        {
            id: 2,
            category_id: 2,
            title: 'Implementasi AI Agents dalam Otomatisasi Workflow Perusahaan',
            slug: 'implementasi-ai-agents-dalam-otomatisasi-workflow',
            content: 'Bagaimana agen AI otonom dapat menghubungkan database, API pihak ketiga, dan analitik bisnis untuk memangkas waktu kerja manual tim hingga 70%.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
            author: 'AI Research Lab',
            reading_time: '8 min read',
            category: { id: 2, name: 'AI & Data' },
            tags: ['AI Agents', 'Automation', 'Machine Learning'],
            created_at: '2026-09-25'
        },
        {
            id: 3,
            category_id: 3,
            title: 'Audit Corong Konversi dan Strategi Retargeting Iklan Berbayar',
            slug: 'audit-corong-konversi-dan-strategi-retargeting',
            content: 'Panduan lengkap menurunkan Cost per Acquisition (CAC) dan memaksimalkan Return on Ad Spend (ROAS) melalui pelacakan pixel yang presisi.',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
            author: 'Growth Team',
            reading_time: '7 min read',
            category: { id: 3, name: 'Marketing' },
            tags: ['Meta Ads', 'SEO', 'Performance Marketing'],
            created_at: '2026-09-20'
        },
        {
            id: 4,
            category_id: 4,
            title: 'Desain Interaksi UI/UX yang Mendorong Retensi Pengguna',
            slug: 'desain-interaksi-ui-ux-yang-mendorong-retensi',
            content: 'Membahas prinsip visual hierarchy, micro-interactions, dan kontras warna yang nyaman untuk aplikasi enterprise dan marketplace.',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
            author: 'Creative Studio',
            reading_time: '5 min read',
            category: { id: 4, name: 'Creative' },
            tags: ['UI/UX', 'Figma', 'Product Design'],
            created_at: '2026-09-15'
        },
        {
            id: 5,
            category_id: 5,
            title: 'Membangun Arsitektur Multi-Cloud dengan Auto-Scaling Kubernetes',
            slug: 'membangun-arsitektur-multi-cloud-kubernetes',
            content: 'Studi kasus implementasi cluster container yang menjamin uptime server 99.99% saat menghadapi lonjakan transaksi bulanan.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
            author: 'Cloud & DevOps Team',
            reading_time: '9 min read',
            category: { id: 5, name: 'Cloud & Cyber Security' },
            tags: ['Kubernetes', 'Docker', 'Cloud'],
            created_at: '2026-09-10'
        },
        {
            id: 6,
            category_id: 1,
            title: 'Laravel 11 & Filament CMS: Fondasi Headless Backend Modern',
            slug: 'laravel-11-filament-cms-backend-modern',
            content: 'Eksplorasi pembuatan REST API performa tinggi dan dashboard administrasi kustom yang cepat dengan arsitektur decoupled.',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
            author: 'Aji',
            reading_time: '10 min read',
            category: { id: 1, name: 'Technology' },
            tags: ['Laravel', 'Filament', 'Headless CMS'],
            created_at: '2026-09-05'
        }
    ];

    useEffect(() => {
        setIsLoading(true);
        api.getInsights()
            .then((data) => {
                if (data && data.length > 0) {
                    setBlogs(data);
                } else {
                    setBlogs(fallbackBlogs);
                }
            })
            .catch(() => {
                setBlogs(fallbackBlogs);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Filter by category and search query
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesCat = activeCategory === 'All' || 
                (blog.category?.name?.toLowerCase().includes(activeCategory.toLowerCase()));
            const matchesSearch = !searchQuery.trim() || 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.tags && blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
            return matchesCat && matchesSearch;
        });
    }, [blogs, activeCategory, searchQuery]);

    const displayedBlogs = filteredBlogs.slice(0, visibleCount);
    const hasMore = visibleCount < filteredBlogs.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-16 overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 1. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-xs font-bold text-text-gray tracking-widest uppercase mb-4">
                        DIGGITY BLOG &amp; PERSPECTIVES
                    </p>
                    <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {isEn ? 'Learn Something New. ' : 'Pelajari Hal Baru. '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500 block sm:inline">
                            {isEn ? 'Build Something Better.' : 'Bangun Sesuatu yang Lebih Baik.'}
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {isEn 
                            ? 'Learn technology, AI, business, creativity, marketing, and digital transformation through practical guides and articles from Diggity.' 
                            : 'Pelajari teknologi, AI, bisnis, kreativitas, marketing, dan digital transformation melalui insight, tutorial, dan panduan praktis dari tim pakar Diggity.'}
                    </p>
                    
                    {/* Search Input */}
                    <div className="max-w-2xl mx-auto relative group mb-10">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-text-gray" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={isEn ? "Search articles, topics, or keywords..." : "Cari artikel, topik, atau kata kunci..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-sm md:text-base text-text-main shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-4 text-xs font-bold text-text-muted hover:text-text-main"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setVisibleCount(8);
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                                    activeCategory === cat 
                                        ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20' 
                                        : 'bg-white dark:bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:border-brand-blue/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* 2. ARTICLES GRID */}
            <section className="py-16 px-6 relative z-10 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl md:text-2xl font-black text-text-main">
                        {activeCategory === 'All' ? (isEn ? 'All Articles' : 'Semua Artikel') : activeCategory}
                        <span className="text-xs text-text-muted font-normal ml-2">
                            ({filteredBlogs.length} {isEn ? 'articles' : 'artikel'})
                        </span>
                    </h2>
                </div>

                {displayedBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedBlogs.map((blog) => {
                            const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                            const imageUrl = blog.image 
                                ? (blog.image.startsWith('http') ? blog.image : `${storageUrl}/${blog.image}`)
                                : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
                            
                            return (
                                <Link 
                                    key={blog.id} 
                                    href={`/insights/${blog.slug}`} 
                                    className="block group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all flex flex-col"
                                >
                                    <div className="w-full aspect-[16/10] bg-neutral-900/10 relative overflow-hidden">
                                        <Image 
                                            src={imageUrl} 
                                            alt={blog.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        {blog.category && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-bg/90 backdrop-blur border border-glass-border rounded-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                                                {blog.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col grow justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                                {blog.title}
                                            </h3>
                                            <p className="text-xs text-text-gray line-clamp-3 leading-relaxed">
                                                {blog.meta_description || blog.content.replace(/<[^>]*>/g, '').slice(0, 130)}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-glass-border flex items-center justify-between text-[11px] font-medium text-text-muted">
                                            <span>{blog.author || 'Diggity Editorial'}</span>
                                            <span>{blog.reading_time || '5 min read'}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center text-text-muted bg-neutral-950/5 dark:bg-white/5 rounded-3xl border border-glass-border">
                        {isEn ? 'No articles match your search or filter.' : 'Tidak ada artikel yang cocok dengan pencarian Anda.'}
                    </div>
                )}

                {/* Real Functional Load More Button (3.2) */}
                {hasMore && (
                    <div className="text-center mt-12">
                        <button 
                            onClick={handleLoadMore}
                            className="px-8 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
                        >
                            {isEn ? 'Load More Articles' : 'Muat Lebih Banyak Artikel'}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default function BlogHubPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-36 text-center text-text-muted">Loading blog...</div>}>
            <BlogHubContent />
        </Suspense>
    );
}
