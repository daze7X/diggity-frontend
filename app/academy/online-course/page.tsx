'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, PlayCircle, Clock, Award, MessageSquare, 
    MonitorSmartphone, Star, Search, Filter, BookOpen,
    Code2, LayoutTemplate, Megaphone, Cloud, Briefcase, Play, PenTool,
    CheckCircle2, Flame, Tag, ChevronRight, Zap, Sparkles, X, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import { api } from '../../../lib/api';

const POPULAR_TOOLS = ['React', 'Next.js', 'Laravel', 'Flutter', 'Python', 'Figma', 'Tailwind', 'SQL'];

const PROMO_CAMPAIGNS = [
    {
        id: 'weekend-flash',
        titleEn: 'Weekend Tech Booster Sale',
        titleId: 'Promo Spesial Upgrade Skill Akhir Pekan',
        code: 'DIGGITY50',
        discount: 'Diskon Hingga 50%',
        badge: 'FLASH SALE',
        gradient: 'from-orange-500 to-red-600',
        descEn: 'Get up to 50% discount on selected high-impact engineering courses.',
        descId: 'Nikmati potongan harga hingga 50% untuk kelas-kelas engineering pilihan berstandar industri.',
        validUntil: 'Berlaku s/d Akhir Pekan Ini'
    },
    {
        id: 'career-switcher',
        titleEn: 'Career Switcher Starter Pack',
        titleId: 'Paket Belajar Persiapan Career Switcher',
        code: 'CAREERBOOST',
        discount: 'Diskon Tambahan 30%',
        badge: 'BUNDLE PROMO',
        gradient: 'from-brand-blue to-indigo-600',
        descEn: 'Curated self-paced classes designed for rapid onboarding into tech roles.',
        descId: 'Rangkaian kelas mandiri terarah untuk akselerasi transisi karier ke dunia teknologi digital.',
        validUntil: 'Kuota Terbatas 100 Pendaftar Pertama'
    }
];

export default function OnlineCourseLandingPage() {
    const { language: locale } = useLanguage();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedTool, setSelectedTool] = useState('all');
    const [filterType, setFilterType] = useState<'all' | 'free' | 'promo'>('all');
    const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc'>('popular');
    const [activePromo, setActivePromo] = useState<typeof PROMO_CAMPAIGNS[0] | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await api.getAcademyCourses();
                // Filter only 'online_course'
                setCourses(data.filter((c: any) => c.type === 'online_course'));
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const formatIDR = (val: any) => {
        if (!val || Number(val) === 0) return 'Gratis';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val));
    };

    const categories = ['all', ...Array.from(new Set(courses.map(c => c.category?.slug).filter(Boolean)))];

    // Handle filter to free classes from buttons
    const handleGoToFreeClasses = (e: React.MouseEvent) => {
        e.preventDefault();
        setFilterType('free');
        const element = document.getElementById('browse');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Filter & Sort logic
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || course.category?.slug === activeCategory;
        const matchesTool = selectedTool === 'all' || 
            course.title?.toLowerCase().includes(selectedTool.toLowerCase()) ||
            course.description?.toLowerCase().includes(selectedTool.toLowerCase());

        let matchesFilterType = true;
        if (filterType === 'free') {
            matchesFilterType = Number(course.price) === 0 || !course.price;
        } else if (filterType === 'promo') {
            matchesFilterType = Boolean(course.original_price && Number(course.original_price) > Number(course.price));
        }

        return matchesSearch && matchesCategory && matchesTool && matchesFilterType;
    }).sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        }
        if (sortBy === 'price-asc') {
            return (Number(a.price) || 0) - (Number(b.price) || 0);
        }
        if (sortBy === 'price-desc') {
            return (Number(b.price) || 0) - (Number(a.price) || 0);
        }
        // default popular: rating or id
        return (Number(b.rating) || 5) - (Number(a.rating) || 5);
    });

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative selection:bg-brand-blue/20">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Flexible Learning, ' : 'Belajar Fleksibel, '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Real Industry Skills.' : 'Skill Nyata untuk Karier Digital.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Learn anytime, anywhere with comprehensive video modules, practical coding assignments, and verified certificates designed by seasoned industry practitioners.' 
                            : 'Pelajari teknologi modern sesuai ritme Anda sendiri dengan modul video berkualitas tinggi, latihan praktik terarah, serta sertifikat kelulusan yang diverifikasi.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#browse" className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 group">
                            {locale === 'en' ? 'Explore All Courses' : 'Jelajahi Semua Kelas'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button 
                            onClick={handleGoToFreeClasses} 
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-glass-border text-text-main font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4 text-emerald-500" />
                            {locale === 'en' ? 'View Free Courses' : 'Lihat Kelas Gratis'}
                        </button>
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. POPULAR CATEGORIES */}
            <section className="py-16 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="text-xs font-black uppercase text-brand-blue tracking-widest block mb-2">Disiplin Belajar</span>
                            <h2 className="text-2xl md:text-4xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Explore by Category' : 'Eksplorasi Berdasarkan Kategori'}
                            </h2>
                        </div>
                        <Link href="/academy/learning-paths" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline">
                            {locale === 'en' ? 'View Competency Roadmaps' : 'Lihat Peta Jalur Belajar'}
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Code2, title: 'Web Development', desc: 'Frontend, Backend, Next.js, Laravel', cat: 'technology' },
                            { icon: LayoutTemplate, title: 'UI/UX & Design', desc: 'Figma, Design Systems, Wireframing', cat: 'design' },
                            { icon: Cloud, title: 'AI & Data Science', desc: 'Python, Machine Learning, Analytics', cat: 'ai-data' },
                            { icon: Megaphone, title: 'Digital Business', desc: 'SEO, Growth Hacking, Ads Strategy', cat: 'business' },
                        ].map((cat, i) => {
                            const Icon = cat.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                    <div 
                                        onClick={() => {
                                            setActiveCategory(cat.cat);
                                            const el = document.getElementById('browse');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="p-6 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-black text-text-main mb-1 text-base group-hover:text-brand-blue transition-colors">{cat.title}</h3>
                                        <p className="text-xs text-text-gray font-medium">{cat.desc}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 05. PROMO / SPECIAL OFFERS (MULTI-PROMO CARDS) */}
            <section className="py-12 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                                <h3 className="text-xl font-black text-text-main">
                                    {locale === 'en' ? 'Special Discount & Promo Programs' : 'Promo & Diskon Spesial Program Pembelajaran'}
                                </h3>
                            </div>
                            <span className="text-xs font-bold text-text-gray hidden sm:inline">
                                {locale === 'en' ? 'Click card to see discounted courses' : 'Klik kartu untuk melihat daftar kelas yang mendapatkan promo'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PROMO_CAMPAIGNS.map((promo) => {
                                return (
                                    <div
                                        key={promo.id}
                                        onClick={() => {
                                            setActivePromo(promo);
                                            setFilterType('promo');
                                            const el = document.getElementById('browse');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`rounded-3xl p-7 text-white bg-gradient-to-r ${promo.gradient} relative overflow-hidden shadow-xl cursor-pointer hover:scale-[1.01] transition-all group`}
                                    >
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-2xl rounded-full pointer-events-none" />
                                        <div className="relative z-10 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="flex items-center justify-between gap-4 mb-3">
                                                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-sm border border-white/30">
                                                        {promo.badge}
                                                    </span>
                                                    <span className="text-xs font-black text-yellow-300">
                                                        {promo.discount}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2">
                                                    {locale === 'en' ? promo.titleEn : promo.titleId}
                                                </h4>
                                                <p className="text-xs text-white/90 font-medium mb-4 leading-relaxed">
                                                    {locale === 'en' ? promo.descEn : promo.descId}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-white/20 flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] uppercase font-bold text-white/80">Kode Voucher:</span>
                                                    <code className="px-2 py-0.5 rounded bg-black/30 font-mono font-bold text-xs text-yellow-300">{promo.code}</code>
                                                </div>
                                                <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-slate-900 px-3.5 py-1.5 rounded-xl group-hover:bg-yellow-300 transition-colors shadow-sm">
                                                    <Tag className="w-3.5 h-3.5" />
                                                    {locale === 'en' ? 'Show Courses' : 'Tampilkan Kelas'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 06. BROWSE KELAS (CATALOG, FILTERS, TOOLS, & SORT) */}
            <section id="browse" className="py-20 px-6 relative z-10 bg-gray-50/50 dark:bg-black/10 border-t border-glass-border">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <ScrollReveal animation="slide-right" className="max-w-2xl">
                            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-brand-blue tracking-wider mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Katalog Online Course Diggity
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Find the Class That Fits Your Ambition' : 'Temukan Kelas yang Sesuai dengan Targetmu'}
                            </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-80 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search class or tool..." : "Cari kelas atau teknologi..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue outline-none transition-all font-medium text-sm text-text-main shadow-sm"
                            />
                        </ScrollReveal>
                    </div>

                    {/* Filter Bar: Promo/Free Pill Switcher & Sort */}
                    <div className="p-5 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border mb-8 shadow-sm space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Filter Type Segment */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => { setFilterType('all'); setActivePromo(null); }}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        filterType === 'all'
                                            ? 'bg-brand-blue text-white shadow-sm'
                                            : 'bg-glass-bg text-text-gray hover:text-text-main border border-glass-border'
                                    }`}
                                >
                                    {locale === 'en' ? 'All Classes' : 'Semua Kelas'}
                                </button>
                                <button
                                    onClick={() => setFilterType('promo')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        filterType === 'promo'
                                            ? 'bg-red-500 text-white shadow-sm'
                                            : 'bg-glass-bg text-text-gray hover:text-text-main border border-glass-border'
                                    }`}
                                >
                                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                                    {locale === 'en' ? 'Special Promo' : 'Hanya Promo'}
                                </button>
                                <button
                                    onClick={() => { setFilterType('free'); setActivePromo(null); }}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        filterType === 'free'
                                            ? 'bg-emerald-500 text-white shadow-sm'
                                            : 'bg-glass-bg text-text-gray hover:text-text-main border border-glass-border'
                                    }`}
                                >
                                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                                    {locale === 'en' ? 'Free Courses' : 'Hanya Kelas Gratis'}
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2 self-start lg:self-auto">
                                <span className="text-xs font-bold text-text-gray flex items-center gap-1">
                                    <ArrowUpDown className="w-3.5 h-3.5" />
                                    Urutkan:
                                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-3.5 py-2 rounded-xl bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none focus:border-brand-blue cursor-pointer"
                                >
                                    <option value="popular">Paling Populer</option>
                                    <option value="newest">Terbaru</option>
                                    <option value="price-asc">Harga: Rendah ke Tinggi</option>
                                    <option value="price-desc">Harga: Tinggi ke Rendah</option>
                                </select>
                            </div>
                        </div>

                        {/* Integrated Tools / Technologies Filter Pills */}
                        <div className="pt-3 border-t border-glass-border flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-text-gray mr-1 flex items-center gap-1">
                                <Code2 className="w-3.5 h-3.5 text-brand-blue" />
                                Tools &amp; Tech:
                            </span>
                            <button
                                onClick={() => setSelectedTool('all')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    selectedTool === 'all'
                                        ? 'bg-brand-blue/15 text-brand-blue border border-brand-blue/30'
                                        : 'bg-glass-bg text-text-gray hover:text-text-main border border-transparent'
                                }`}
                            >
                                All
                            </button>
                            {POPULAR_TOOLS.map((tool) => {
                                const active = selectedTool === tool;
                                return (
                                    <button
                                        key={tool}
                                        onClick={() => setSelectedTool(active ? 'all' : tool)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                            active
                                                ? 'bg-brand-blue text-white shadow-sm'
                                                : 'bg-glass-bg text-text-gray hover:text-text-main border border-glass-border'
                                        }`}
                                    >
                                        {tool}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Promo Notification Banner */}
                    {activePromo && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-text-main flex items-center justify-between gap-4 mb-8 animate-in fade-in">
                            <div className="flex items-center gap-3">
                                <Tag className="w-5 h-5 text-red-500 shrink-0" />
                                <div className="text-xs">
                                    <span className="font-bold text-red-500 mr-2">[{activePromo.badge}] {activePromo.titleId}</span>
                                    <span className="text-text-gray">Gunakan voucher <strong className="font-mono text-text-main">{activePromo.code}</strong> saat checkout ({activePromo.validUntil}).</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setActivePromo(null); setFilterType('all'); }}
                                className="p-1 rounded-lg hover:bg-red-500/20 text-text-gray hover:text-text-main"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Course Cards Grid (Digital Marketplace Layout) */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-96 rounded-3xl bg-glass-bg animate-pulse border border-glass-border" />
                            ))}
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course: any, idx: number) => {
                                const isFree = Number(course.price) === 0 || !course.price;
                                const hasDiscount = Boolean(course.original_price && Number(course.original_price) > Number(course.price));
                                const discountPct = hasDiscount 
                                    ? Math.round(((Number(course.original_price) - Number(course.price)) / Number(course.original_price)) * 100) 
                                    : null;

                                return (
                                    <ScrollReveal key={course.id || idx} animation="fade-up" delay={(idx % 3) * 80}>
                                        <div className="group rounded-3xl overflow-hidden border border-glass-border bg-white dark:bg-glass-bg hover:border-brand-blue/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full">
                                            {/* Thumbnail Header */}
                                            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={course.thumbnail ? (course.thumbnail.startsWith('http') ? course.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${course.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                    alt={course.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                                
                                                {/* Top Badges */}
                                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                                    {isFree ? (
                                                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                                            GRATIS
                                                        </span>
                                                    ) : hasDiscount ? (
                                                        <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                                            HEMAT {discountPct}%
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 rounded-full bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                                            ONLINE COURSE
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="absolute bottom-3 left-3 text-white text-xs font-bold px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg">
                                                    {course.category?.name || 'Programming'}
                                                </div>
                                            </div>

                                            {/* Body Content */}
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-lg font-black text-text-main mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors leading-snug">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-text-gray font-medium mb-4 line-clamp-2 leading-relaxed">
                                                    {course.description}
                                                </p>

                                                {/* Metadata Chips */}
                                                <div className="flex items-center gap-3 text-[11px] font-bold text-text-gray mb-6">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                                                        {course.duration || '6 Jam Belajar'}
                                                    </span>
                                                    <span>&bull;</span>
                                                    <span className="flex items-center gap-1 text-amber-500">
                                                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                                                        {course.rating || '4.9'}
                                                    </span>
                                                    <span>&bull;</span>
                                                    <span className="text-text-gray">
                                                        {course.level || 'All Levels'}
                                                    </span>
                                                </div>

                                                {/* Price & Action Button */}
                                                <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                                                    <div>
                                                        {hasDiscount && (
                                                            <span className="text-xs text-text-gray line-through block font-medium">
                                                                {formatIDR(course.original_price)}
                                                            </span>
                                                        )}
                                                        <span className={`text-xl font-black ${isFree ? 'text-emerald-500' : 'text-brand-blue'}`}>
                                                            {formatIDR(course.price)}
                                                        </span>
                                                    </div>
                                                    <Link 
                                                        href={`/academy/course/${course.slug}`}
                                                        className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-all flex items-center gap-1.5 shadow-md shadow-brand-blue/15"
                                                    >
                                                        {isFree ? 'Mulai Gratis' : 'Detail Kelas'}
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl max-w-lg mx-auto">
                            <BookOpen className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-40" />
                            <h3 className="text-lg font-bold text-text-main mb-2">
                                {locale === 'en' ? 'No matching courses found.' : 'Tidak ada kelas yang cocok dengan filter.'}
                            </h3>
                            <p className="text-xs text-text-gray mb-6">
                                {locale === 'en' ? 'Try clearing your search query or reset the filter.' : 'Coba ubah kata kunci atau reset filter pencarian.'}
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSelectedTool('all'); setFilterType('all'); }}
                                className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-all"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 08 & 09. LEARNING EXPERIENCE */}
            <section className="py-24 px-6 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <ScrollReveal animation="slide-right">
                            <span className="text-xs font-black uppercase text-brand-blue tracking-widest block mb-2">Kurikulum Berstandar</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                                {locale === 'en' ? 'Not Just Watching Videos, You Actually Build.' : 'Bukan Sekadar Menonton, Anda Benar-Benar Membangun.'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-right" delay={100}>
                            <p className="text-base text-text-gray font-medium leading-relaxed">
                                {locale === 'en' 
                                    ? 'Every module is packaged with step-by-step code exercises, downloadable starter kits, and self-assessment quizzes to ensure true concept retention.' 
                                    : 'Setiap modul dilengkapi latihan kode praktis, starter kit siap pakai, serta kuis pemahaman konsep agar Anda benar-benar menguasai materi secara mendalam.'}
                            </p>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: 'Hands-on Practice', desc: 'Latihan coding dan studi kasus nyata industri.' },
                                { title: 'Akses Selamanya', desc: 'Materi dapat diakses kapan saja tanpa batas waktu.' },
                                { title: 'Sertifikat Digital', desc: 'Validasi kelulusan dengan ID sertifikat resmi.' },
                                { title: 'Forum Tanya Jawab', desc: 'Bimbingan mentor di kanal komunitas resmi.' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                    <div className="flex items-center gap-2 font-bold text-text-main text-sm mb-1">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        {item.title}
                                    </div>
                                    <p className="text-xs text-text-gray font-medium pl-6">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <ScrollReveal animation="slide-left">
                            <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border shadow-2xl relative overflow-hidden">
                                <div className="flex items-center justify-between pb-6 border-b border-glass-border mb-6">
                                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Silabus Pembelajaran</span>
                                    <span className="text-xs font-bold text-emerald-500">Akses Mandiri</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { mod: 'Modul 01', title: 'Fondasi Arsitektur & Best Practices' },
                                        { mod: 'Modul 02', title: 'Implementasi Komponen & State Management' },
                                        { mod: 'Modul 03', title: 'Integrasi API & Autentikasi Modern' },
                                        { mod: 'Modul 04', title: 'Final Capstone Project & Deployment' },
                                    ].map((m, i) => (
                                        <div key={i} className="p-3.5 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-between text-xs">
                                            <span className="font-bold text-text-main">{m.mod}: {m.title}</span>
                                            <Play className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 14. FAQ & 15. FINAL CTA */}
            <section className="py-20 px-6 relative z-10 bg-bg-canvas border-t border-glass-border">
                <div className="max-w-4xl mx-auto mb-24">
                    <ScrollReveal animation="fade-up" className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                            {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Seputar Online Course'}
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {[
                            { q: 'Apakah kelas dapat diakses kapan saja?', a: 'Ya, seluruh Online Course bersifat self-paced. Anda bebas belajar kapan saja dan mengatur jadwal sendiri.' },
                            { q: 'Apakah saya mendapatkan sertifikat setelah selesai?', a: 'Tentu. Anda akan mendapatkan sertifikat digital terverifikasi setelah menyelesaikan seluruh video modul dan kuis evaluasi.' },
                            { q: 'Bagaimana jika saya mengalami kendala saat mengerjakan latihan?', a: 'Anda dapat bertanya langsung melalui forum diskusi komunitas atau grup Telegram resmi Diggity Academy.' },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                <h4 className="font-bold text-text-main text-base mb-2">{faq.q}</h4>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA Banner */}
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-blue via-indigo-600 to-brand-blue-dark p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                                    {locale === 'en' ? 'Your Next Skill Starts Right Here.' : 'Skill Baru Bisa Dimulai Hari Ini.'}
                                </h2>
                                <p className="text-base md:text-lg text-white/90 font-medium mb-8">
                                    {locale === 'en' 
                                        ? 'Choose the class that matches your goals and start learning at your own pace.' 
                                        : 'Pilih kelas yang sesuai dengan target kariermu dan mulai belajar dengan modul berkualitas tinggi.'}
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="#browse" className="px-8 py-4 bg-white text-brand-blue font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                        {locale === 'en' ? 'Explore All Classes' : 'Jelajahi Semua Kelas'}
                                    </Link>
                                    <button 
                                        onClick={handleGoToFreeClasses} 
                                        className="px-8 py-4 bg-black/20 text-white border border-white/30 font-bold rounded-2xl hover:bg-black/30 transition-colors backdrop-blur-sm"
                                    >
                                        {locale === 'en' ? 'Start with Free Classes' : 'Mulai dari Kelas Gratis'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
