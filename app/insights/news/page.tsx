'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { Search, ArrowRight, Calendar, Tag, Radio, Clock, ChevronRight } from 'lucide-react';

export interface NewsItem {
    id: number;
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    content?: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    isFeatured?: boolean;
    tags: string[];
}

export const NEWS_DATABASE: NewsItem[] = [
    {
        id: 1,
        slug: 'partnership-global-ai-leader',
        title: 'Diggity Gandeng Mitra AI Global untuk Akselerasi Transformasi Industri',
        category: 'Partnership',
        excerpt: 'Diggity memperluas ekosistem kolaborasi strategis dengan penyedia platform kecerdasan buatan global guna menghadirkan solusi otomatisasi tingkat lanjut bagi klien korporasi di Indonesia.',
        author: 'Diggity Editorial Team',
        date: '28 September 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop',
        isFeatured: true,
        tags: ['Partnership', 'AI Innovation', 'Enterprise']
    },
    {
        id: 2,
        slug: 'peluncuran-diggity-hris-2',
        title: 'Peluncuran Diggity HRIS 2.0 dengan Dukungan Otomasi AI Terpadu',
        category: 'Products',
        excerpt: 'Generasi terbaru platform Diggity HRIS resmi diluncurkan dengan penambahan fitur AI smart attendance, payroll otomatis, dan analitik produktivitas karyawan.',
        author: 'Product Engineering',
        date: '25 September 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        tags: ['Products', 'SaaS', 'HR Tech']
    },
    {
        id: 3,
        slug: 'academy-batch-baru-bootcamp',
        title: 'Diggity Academy Buka Pendaftaran Batch Baru Full-Stack & AI Bootcamp',
        category: 'Academy',
        excerpt: 'Kurikulum intensif 16 minggu dirancang bersama para Tech Lead praktisi industri untuk mempersiapkan talenta digital Indonesia siap kerja.',
        author: 'Diggity Academy',
        date: '20 September 2026',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
        tags: ['Academy', 'Bootcamp', 'Talent']
    },
    {
        id: 4,
        slug: 'sertifikasi-iso-27001',
        title: 'Pencapaian: Diggity Resmi Raih Sertifikasi Keamanan Informasi ISO 27001:2022',
        category: 'Achievement',
        excerpt: 'Langkah nyata Diggity dalam menjamin standar keamanan data dan kerahasiaan informasi kelas dunia untuk seluruh produk dan layanan klien.',
        author: 'Corporate Governance',
        date: '15 September 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
        tags: ['ISO 27001', 'Security', 'Compliance']
    },
    {
        id: 5,
        slug: 'ekspansi-layanan-cloud-enterprise',
        title: 'Diggity Luncurkan Divisi Solusi Cloud & DevOps Enterprise',
        category: 'Solutions',
        excerpt: 'Memperluas penawaran solusi IT dengan arsitektur cloud terdistribusi, otomatisasi CI/CD, dan migrasi server skala korporasi.',
        author: 'Solutions Team',
        date: '10 September 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        tags: ['Cloud', 'Solutions', 'DevOps']
    },
    {
        id: 6,
        slug: 'diggity-tech-summit-2026',
        title: 'Seminar Tahunan Diggity Tech Summit 2026 Segera Digelar di Yogyakarta',
        category: 'Events',
        excerpt: 'Menghadirkan lebih dari 20 praktisi teknologi terkemuka untuk membahas adopsi AI generatif, arsitektur headless CMS, dan strategi growth digital.',
        author: 'Events Committee',
        date: '05 September 2026',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
        tags: ['Events', 'Seminar', 'Networking']
    },
    {
        id: 7,
        slug: 'program-beasiswa-talenta-digital',
        title: 'Program Beasiswa Talenta Digital Diggity 2026 Dibuka untuk Mahasiswa',
        category: 'Company',
        excerpt: 'Inisiatif CSR Diggity untuk memberikan beasiswa pendidikan teknologi dan mentoring karir gratis bagi 100 mahasiswa berprestasi.',
        author: 'People & Culture',
        date: '28 Agustus 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
        tags: ['CSR', 'Scholarship', 'Education']
    },
    {
        id: 8,
        slug: 'maintenance-infrastruktur-q4',
        title: 'Pemberitahuan: Peningkatan Kapasitas Server & Maintenance Terjadwal Q4',
        category: 'Announcement',
        excerpt: 'Informasi pembaruan infrastruktur cloud data center untuk meningkatkan kecepatan respons API dan reliabilitas uptime hingga 99.99%.',
        author: 'Infrastructure Operations',
        date: '20 Agustus 2026',
        readTime: '2 min read',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
        tags: ['Announcement', 'Maintenance', 'Server']
    }
];

const CATEGORIES = [
    'All', 'Company', 'Products', 'Solutions', 'Partnership', 
    'Academy', 'Achievement', 'Events', 'Announcement'
];

export default function NewsHubPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(5);

    const filteredNews = useMemo(() => {
        return NEWS_DATABASE.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
            const matchesSearch = searchQuery.trim() === '' || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const featuredNews = useMemo(() => {
        return filteredNews.find(n => n.isFeatured) || filteredNews[0] || NEWS_DATABASE[0];
    }, [filteredNews]);

    const supportingNews = useMemo(() => {
        return filteredNews.filter(n => n.id !== featuredNews?.id);
    }, [filteredNews, featuredNews]);

    const displayedSupporting = useMemo(() => {
        return supportingNews.slice(0, visibleCount);
    }, [supportingNews, visibleCount]);

    const handleViewAllNews = () => {
        setActiveCategory('All');
        setSearchQuery('');
        setVisibleCount(NEWS_DATABASE.length);
        const listEl = document.getElementById('news-listing-anchor');
        if (listEl) {
            listEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-xs md:text-sm font-bold text-text-gray tracking-widest uppercase mb-4">DIGGITY NEWS &amp; ANNOUNCEMENTS</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? "What's New at Diggity?" : 'Kabar & Berita Terkini Diggity'}
                    </h1>
                    <p className="text-base md:text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Follow the latest Diggity updates—from product releases and service innovations, strategic partnerships, achievements, Academy programs, to corporate announcements.' 
                            : 'Ikuti perkembangan terbaru Diggity—mulai dari peluncuran produk dan layanan, kerja sama strategis, pencapaian perusahaan, program Academy, hingga pengumuman penting.'}
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group mb-10">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-text-gray group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={locale === 'en' ? "Search news, topics, or announcements..." : "Cari berita, topik, atau pengumuman..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium text-text-main shadow-sm"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setVisibleCount(5);
                                }}
                                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                                    activeCategory === cat 
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                                        : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-indigo-600 hover:border-indigo-600/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. LATEST NEWS LISTING */}
            <section id="news-listing-anchor" className="py-20 px-6 relative z-10 max-w-7xl mx-auto scroll-mt-28">
                <ScrollReveal animation="fade-up" className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-6 h-6 text-indigo-500 animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            {locale === 'en' ? 'Latest Updates' : 'Kabar & Pengumuman Terbaru'}
                        </h2>
                    </div>
                    <span className="text-xs font-bold text-text-gray">
                        {filteredNews.length} {locale === 'en' ? 'articles found' : 'artikel ditemukan'}
                    </span>
                </ScrollReveal>

                {filteredNews.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                        <p className="text-text-gray font-medium mb-4">
                            {locale === 'en' ? 'No news found matching your search.' : 'Tidak ada berita yang cocok dengan kriteria pencarian Anda.'}
                        </p>
                        <button
                            onClick={() => {
                                setActiveCategory('All');
                                setSearchQuery('');
                            }}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            {locale === 'en' ? 'Reset Filters' : 'Reset Filter'}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Featured Big News (Left 7 cols) */}
                        {featuredNews && (
                            <div className="lg:col-span-7 h-full">
                                <ScrollReveal animation="slide-right" className="h-full">
                                    <Link 
                                        href={`/insights/news/${featuredNews.slug}`} 
                                        className="block h-full group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col"
                                    >
                                        <div className="w-full aspect-[16/10] bg-slate-200 relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={featuredNews.image} 
                                                alt={featuredNews.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            <div className="absolute top-4 left-4 inline-flex px-3 py-1.5 rounded-full bg-indigo-600 text-white font-black text-xs tracking-wider uppercase shadow-md">
                                                {featuredNews.category}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col grow">
                                            <h3 className="text-2xl md:text-3xl font-black text-text-main mb-4 group-hover:text-indigo-500 transition-colors leading-tight">
                                                {featuredNews.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-text-gray font-medium mb-6 line-clamp-3 leading-relaxed">
                                                {featuredNews.excerpt}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between text-xs font-semibold text-text-gray pt-4 border-t border-glass-border">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredNews.date}</span>
                                                    <div className="w-1 h-1 rounded-full bg-glass-border"></div>
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredNews.readTime}</span>
                                                </div>
                                                <span className="text-indigo-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    {locale === 'en' ? 'Read News' : 'Baca Berita'} <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            </div>
                        )}

                        {/* Supporting News List (Right 5 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {displayedSupporting.map((news, i) => (
                                <ScrollReveal key={news.id} animation="slide-left" delay={i * 80}>
                                    <Link 
                                        href={`/insights/news/${news.slug}`} 
                                        className="block group bg-white dark:bg-glass-bg border border-glass-border rounded-2xl p-5 hover:border-indigo-500/50 transition-all flex flex-col shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="inline-flex items-center gap-1 text-indigo-500 font-bold text-[11px] tracking-wider uppercase">
                                                <Tag className="w-3 h-3" />
                                                {news.category}
                                            </span>
                                            <span className="text-[11px] font-medium text-text-gray flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {news.date}
                                            </span>
                                        </div>
                                        <h4 className="text-sm md:text-base font-bold text-text-main mb-2 group-hover:text-indigo-500 transition-colors leading-snug line-clamp-2">
                                            {news.title}
                                        </h4>
                                        <p className="text-xs text-text-gray font-medium line-clamp-2 leading-relaxed">
                                            {news.excerpt}
                                        </p>
                                    </Link>
                                </ScrollReveal>
                            ))}

                            {/* View All / Load More Action */}
                            {visibleCount < supportingNews.length ? (
                                <ScrollReveal animation="fade-up" className="mt-2">
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + 4)}
                                        className="w-full py-3.5 text-center rounded-2xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs transition-all cursor-pointer border border-indigo-500/20"
                                    >
                                        {locale === 'en' ? 'Load More News' : 'Muat Berita Lainnya'} ({supportingNews.length - visibleCount} {locale === 'en' ? 'remaining' : 'tersisa'})
                                    </button>
                                </ScrollReveal>
                            ) : supportingNews.length > 0 ? (
                                <ScrollReveal animation="fade-up" className="mt-2">
                                    <button 
                                        onClick={handleViewAllNews}
                                        className="w-full py-3.5 text-center rounded-2xl bg-white dark:bg-glass-bg border border-glass-border text-text-main hover:border-indigo-500/50 font-bold text-xs transition-colors cursor-pointer"
                                    >
                                        {locale === 'en' ? 'View All News (All Categories)' : 'Tampilkan Seluruh Berita (Semua Kategori)'}
                                    </button>
                                </ScrollReveal>
                            ) : null}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
