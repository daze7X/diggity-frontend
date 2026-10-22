'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Search, ArrowRight, TrendingUp, Building2, Briefcase, Filter, 
    ArrowUpDown, Calendar, CheckCircle2, Sparkles, Layers
} from 'lucide-react';

export interface SuccessStoryItem {
    id: number;
    slug: string;
    client: string;
    division: 'Solutions' | 'Products' | 'Academy';
    category: string;
    industry: string;
    scale: string;
    title: string;
    desc: string;
    publishedDate: string; // YYYY-MM-DD for sorting
    displayDate: string;
    metrics: { value: string; label: string }[];
}

export const STORIES_DATABASE: SuccessStoryItem[] = [
    {
        id: 1,
        slug: 'carepro-lead-generation',
        client: 'CarePro Clinic',
        division: 'Solutions',
        category: 'Digital Marketing & Growth',
        industry: 'Healthcare',
        scale: 'Small and Medium Business',
        title: 'CarePro Meningkatkan Lead Acquisition 320% melalui Strategi Digital Marketing Terukur',
        desc: 'CarePro bermitra dengan Diggity untuk membangun funnel akuisisi digital end-to-end melalui kombinasi performance marketing, dynamic landing page, dan integrasi tracking analitik.',
        publishedDate: '2026-09-15',
        displayDate: '15 September 2026',
        metrics: [
            { value: '320%', label: 'Lead Growth' },
            { value: '12.5K+', label: 'Targeted Reach' },
            { value: 'Rp9.590', label: 'Cost per Lead' }
        ]
    },
    {
        id: 2,
        slug: 'edutech-cloud-migration',
        client: 'EduTech Nusantara',
        division: 'Solutions',
        category: 'Cloud Architecture & IT Solutions',
        industry: 'Education',
        scale: 'Enterprise',
        title: 'Transformasi Infrastruktur Cloud Scalable untuk Ujian Online Serentak 150K Pengguna',
        desc: 'Mengatasi kendala server downtime saat peak season dengan merestrukturisasi sistem ke arsitektur microservices terdistribusi dan otomatisasi load balancing.',
        publishedDate: '2026-08-20',
        displayDate: '20 Agustus 2026',
        metrics: [
            { value: '99.98%', label: 'Uptime SLA' },
            { value: '45%', label: 'Cost Efficiency' },
            { value: '150K+', label: 'Concurrent Users' }
        ]
    },
    {
        id: 3,
        slug: 'diggity-hris-adoption',
        client: 'PT Logistik Maju Sejahtera',
        division: 'Products',
        category: 'Business Software (HRIS)',
        industry: 'Logistics & Supply Chain',
        scale: 'Enterprise',
        title: 'Otomatisasi Payroll dan Presensi 850 Karyawan Lapangan Menggunakan Diggity HRIS',
        desc: 'Implementasi platform Diggity HRIS 2.0 menggantikan pencatatan absensi manual, menekan waktu pemrosesan gaji bulanan dari 5 hari kerja menjadi 2 jam.',
        publishedDate: '2026-07-10',
        displayDate: '10 Juli 2026',
        metrics: [
            { value: '96%', label: 'Time Saved' },
            { value: '850+', label: 'Active Staff' },
            { value: '0 Error', label: 'Payroll Discrepancy' }
        ]
    },
    {
        id: 4,
        slug: 'retailos-multistore',
        client: 'Kopi Kenari Chain',
        division: 'Products',
        category: 'Digital Marketplace & POS',
        industry: 'Food & Beverage',
        scale: 'Startup',
        title: 'Sentralisasi Manajemen Inventori 24 Gerai Kafe melalui Diggity POS & Marketplace',
        desc: 'Kopi Kenari mengadopsi produk POS multi-outlet Diggity untuk sinkronisasi bahan baku real-time, integrasi QRIS dinamis, dan analitik penjualan otomatis.',
        publishedDate: '2026-05-18',
        displayDate: '18 Mei 2026',
        metrics: [
            { value: '24', label: 'Outlets Synced' },
            { value: '+28%', label: 'Revenue Growth' },
            { value: '-60%', label: 'Stock Wastage' }
        ]
    },
    {
        id: 5,
        slug: 'academy-alumni-hiring',
        client: 'Fintech X Nusantara',
        division: 'Academy',
        category: 'Bootcamp & Talent Placement',
        industry: 'Financial Technology',
        scale: 'Enterprise',
        title: 'Akselerasi Rekrutmen 12 Junior Software Engineer Siap Kerja dari Diggity Academy',
        desc: 'Kemitraan khusus penyerapan talenta lulusan Full-Stack Bootcamp Diggity Academy yang telah dibekali standar rekayasa software modern dan etika kerja industri.',
        publishedDate: '2026-04-05',
        displayDate: '05 April 2026',
        metrics: [
            { value: '100%', label: 'Hiring Pass Rate' },
            { value: '< 14 Hari', label: 'Onboarding Speed' },
            { value: '4.9/5', label: 'Employer Rating' }
        ]
    },
    {
        id: 6,
        slug: 'smart-desa-governance',
        client: 'Pemerintah Daerah Jawa Timur',
        division: 'Solutions',
        category: 'Custom Software & E-Government',
        industry: 'Government',
        scale: 'Enterprise',
        title: 'Digitalisasi Layanan Administrasi Publik Desa Terpadu Berbasis Web & Mobile',
        desc: 'Pembangunan portal layanan surat menyurat dan bansos desa terpadu yang memangkas birokrasi antrean fisik warga hingga 80%.',
        publishedDate: '2026-03-02',
        displayDate: '02 Maret 2026',
        metrics: [
            { value: '42 Desa', label: 'Integrated' },
            { value: '80%', label: 'Wait Time Cut' },
            { value: '65K+', label: 'Citizens Served' }
        ]
    }
];

const DIVISIONS = ['All', 'Solutions', 'Products', 'Academy'] as const;

export default function SuccessStoriesHubPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDivision, setSelectedDivision] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    // Concurrent filtering & sorting
    const filteredStories = useMemo(() => {
        let result = STORIES_DATABASE.filter(story => {
            const matchesDivision = selectedDivision === 'All' || story.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesSearch = searchQuery.trim() === '' || 
                story.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDivision && matchesSearch;
        });

        result.sort((a, b) => {
            const dateA = new Date(a.publishedDate).getTime();
            const dateB = new Date(b.publishedDate).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [selectedDivision, searchQuery, sortOrder]);

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-xs md:text-sm font-bold text-text-gray tracking-widest uppercase mb-4">DIGGITY SUCCESS STORIES</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Real Stories. ' : 'Cerita Nyata. '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                            {locale === 'en' ? 'Measurable Impact.' : 'Dampak Nyata.'}
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-8">
                        {locale === 'en' 
                            ? 'Discover how Diggity empowers businesses, institutions, and talents to overcome digital roadblocks across Solutions, Products, and Academy.' 
                            : 'Pelajari bagaimana Diggity mendampingi perusahaan, institusi, dan talenta menaklukkan tantangan digital lewat Solutions, Products, dan Academy.'}
                    </p>
                </ScrollReveal>
            </section>

            {/* 02. FILTERS & SORT CONTROLS BAR */}
            <section className="py-8 px-6 relative z-10 max-w-7xl mx-auto border-b border-glass-border/60">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    
                    {/* Primary 3-Way Filter Pills (Solutions, Products, Academy, All) */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-text-gray uppercase tracking-wider mr-2 hidden sm:inline-flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5" /> Divisi:
                        </span>
                        {DIVISIONS.map(div => (
                            <button
                                key={div}
                                onClick={() => setSelectedDivision(div)}
                                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                                    selectedDivision === div
                                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                                        : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-amber-500 hover:border-amber-500/30'
                                }`}
                            >
                                {div === 'All' ? (locale === 'en' ? 'All Divisions' : 'Semua Divisi') : div}
                            </button>
                        ))}
                    </div>

                    {/* Controls: Search + Sort (Terbaru vs Terlama) */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <Search className="w-4 h-4 text-text-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder={locale === 'en' ? "Search client or metric..." : "Cari klien atau dampak..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-xs font-medium text-text-main"
                            />
                        </div>

                        {/* Sort Selector: Newest vs Oldest */}
                        <div className="flex items-center gap-1.5 bg-white dark:bg-glass-bg border border-glass-border rounded-xl px-3 py-1.5 shrink-0">
                            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
                            <label className="text-[11px] font-bold text-text-gray uppercase hidden sm:inline">Urutkan:</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                                className="bg-transparent text-xs font-bold text-text-main outline-none cursor-pointer pr-1"
                            >
                                <option value="newest" className="bg-bg-canvas text-text-main">
                                    {locale === 'en' ? 'Newest First' : 'Terbaru ke Terlama'}
                                </option>
                                <option value="oldest" className="bg-bg-canvas text-text-main">
                                    {locale === 'en' ? 'Oldest First' : 'Terlama ke Terbaru'}
                                </option>
                            </select>
                        </div>
                    </div>

                </div>
            </section>

            {/* 03. STORIES LISTING */}
            <section className="py-12 px-6 relative z-10 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl font-black text-text-main flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        {locale === 'en' ? 'Documented Case Studies' : 'Daftar Studi Kasus Teruji'}
                    </h2>
                    <span className="text-xs font-bold text-text-gray">
                        {filteredStories.length} {locale === 'en' ? 'stories' : 'kisah sukses'}
                    </span>
                </div>

                {filteredStories.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                        <p className="text-text-gray font-medium mb-4">
                            {locale === 'en' ? 'No success stories match your filters.' : 'Tidak ada kisah sukses yang sesuai dengan filter.'}
                        </p>
                        <button
                            onClick={() => {
                                setSelectedDivision('All');
                                setSearchQuery('');
                                setSortOrder('newest');
                            }}
                            className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors cursor-pointer"
                        >
                            {locale === 'en' ? 'Reset All Filters' : 'Reset Semua Filter'}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {filteredStories.map((story, i) => (
                            <ScrollReveal key={story.id} animation="fade-up" delay={i * 60}>
                                <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-6 md:p-8 hover:border-amber-500/50 transition-all shadow-sm hover:shadow-xl group">
                                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                                        
                                        {/* Client & Metadata Box (Left) */}
                                        <div className="w-full lg:w-1/4 shrink-0 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-glass-border pb-6 lg:pb-0 lg:pr-6">
                                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-xl mb-4 border border-amber-500/20">
                                                {story.client.substring(0, 2).toUpperCase()}
                                            </div>
                                            <h4 className="font-extrabold text-text-main text-lg mb-1">{story.client}</h4>
                                            <p className="text-xs font-semibold text-text-gray mb-3">{story.industry} • {story.scale}</p>
                                            
                                            <div className="mt-auto flex items-center gap-1.5 text-[11px] font-semibold text-text-gray">
                                                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                                <span>{story.displayDate}</span>
                                            </div>
                                        </div>

                                        {/* Content & Metrics (Right) */}
                                        <div className="w-full lg:w-3/4 flex flex-col">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-black text-xs uppercase tracking-wider">
                                                    {story.division}
                                                </span>
                                                <span className="text-xs font-bold text-text-gray">
                                                    {story.category}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-black text-text-main mb-3 group-hover:text-amber-500 transition-colors leading-tight">
                                                {story.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-text-gray font-medium mb-6 leading-relaxed">
                                                {story.desc}
                                            </p>
                                            
                                            {/* Verifiable Impact Metrics Grid */}
                                            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                                                {story.metrics.map((metric, mIdx) => (
                                                    <div key={mIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border/60 text-center">
                                                        <div className="text-lg md:text-2xl font-black text-amber-500 mb-0.5">{metric.value}</div>
                                                        <div className="text-[10px] md:text-xs font-bold text-text-gray uppercase tracking-wider">{metric.label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2">
                                                <Link 
                                                    href={`/insights/success-stories/${story.slug}`} 
                                                    className="inline-flex items-center gap-2 font-bold text-xs md:text-sm text-amber-500 hover:text-amber-600 group-hover:translate-x-1 transition-all"
                                                >
                                                    {locale === 'en' ? 'Read Case Study' : 'Pelajari Studi Kasus Lengkap'} <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
