'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { Search, ArrowRight, TrendingUp, Building2, Briefcase, Filter } from 'lucide-react';

const SCALES = ['All', 'Startup', 'UMKM', 'Small and Medium Business', 'Enterprise'];
const SCOPES = ['All', 'Technology & Software', 'AI & Data', 'Creative & Brand', 'Marketing & Growth'];
const INDUSTRIES = ['All', 'Government', 'Education', 'Technology', 'Finance', 'Healthcare'];

export default function SuccessStoriesHubPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [scale, setScale] = useState('All');
    const [scope, setScope] = useState('All');
    const [industry, setIndustry] = useState('All');

    // Dummy data
    const stories = [
        {
            id: 1,
            client: 'CarePro',
            category: 'Marketing & Growth',
            industry: 'Healthcare',
            title: 'CarePro Meningkatkan Lead Generation melalui Strategi Digital Marketing Terintegrasi',
            desc: 'CarePro bekerja sama dengan Diggity untuk membangun strategi digital marketing yang lebih terukur melalui kombinasi Meta Ads, Google Ads, creative campaign, dan performance optimization.',
            metrics: [
                { value: '68', label: 'Leads Generated' },
                { value: '12.5K+', label: 'Reach' },
                { value: 'Rp9.590', label: 'Cost per Lead' }
            ],
            slug: 'carepro-lead-generation'
        },
        {
            id: 2,
            client: 'EduTech Indo',
            category: 'Technology & Software',
            industry: 'Education',
            title: 'Transformasi Sistem Manajemen Pembelajaran Berbasis Cloud',
            desc: 'Mengatasi masalah server yang sering down dengan memigrasikan sistem ke infrastruktur cloud yang scalable dan terintegrasi dengan mobile app.',
            metrics: [
                { value: '99.9%', label: 'Uptime' },
                { value: '45%', label: 'Cost Efficiency' },
                { value: '150K+', label: 'Active Users' }
            ],
            slug: 'edutech-cloud-migration'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto border-b border-glass-border">
                <ScrollReveal animation="fade-up">
                    <p className="text-sm font-bold text-text-gray tracking-widest uppercase mb-4">SUCCESS STORIES</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        Cerita Nyata. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 block sm:inline">Dampak Nyata.</span>
                    </h1>
                    <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Explore how Diggity helps businesses, organizations, and talents overcome digital challenges through our services, products, and Academy programs.' 
                            : 'Jelajahi bagaimana Diggity membantu bisnis, organisasi, dan talenta menghadapi tantangan digital melalui layanan, produk, dan program Academy.'}
                    </p>
                </ScrollReveal>
            </section>

            {/* 02. EXPLORER (FILTERS & LISTING) */}
            <section className="py-16 px-6 relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-1/4 shrink-0">
                        <ScrollReveal animation="slide-right">
                            <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-6 sticky top-24">
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-bold text-text-main">Filter</h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Search */}
                                    <div>
                                        <label className="text-sm font-bold text-text-gray mb-2 block">Search</label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 text-text-gray absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input 
                                                type="text" 
                                                placeholder="Cari client/project..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Skala Bisnis */}
                                    <div>
                                        <label className="text-sm font-bold text-text-gray mb-2 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" /> Skala Bisnis
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            {SCALES.map(s => (
                                                <label key={s} className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="scale" 
                                                        checked={scale === s} 
                                                        onChange={() => setScale(s)}
                                                        className="text-amber-500 focus:ring-amber-500"
                                                    />
                                                    <span className="text-sm text-text-main font-medium">{s}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lingkup Kerja */}
                                    <div>
                                        <label className="text-sm font-bold text-text-gray mb-2 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> Lingkup Kerja
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            {SCOPES.map(s => (
                                                <label key={s} className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="scope" 
                                                        checked={scope === s} 
                                                        onChange={() => setScope(s)}
                                                        className="text-amber-500 focus:ring-amber-500"
                                                    />
                                                    <span className="text-sm text-text-main font-medium">{s}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Stories Listing */}
                    <div className="w-full lg:w-3/4">
                        <ScrollReveal animation="fade-up" className="mb-8">
                            <h2 className="text-2xl font-black text-text-main flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-amber-500" />
                                Stories Behind the Impact
                            </h2>
                        </ScrollReveal>

                        <div className="flex flex-col gap-8">
                            {stories.map((story, i) => (
                                <ScrollReveal key={story.id} animation="fade-up" delay={i * 100}>
                                    <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-8 hover:border-amber-500/50 transition-all shadow-sm hover:shadow-xl group">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            
                                            {/* Client Logo & Info */}
                                            <div className="w-full md:w-1/4 shrink-0 flex flex-col items-start border-b md:border-b-0 md:border-r border-glass-border pb-6 md:pb-0 md:pr-6">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xl text-text-gray mb-4">
                                                    {story.client.substring(0, 2).toUpperCase()}
                                                </div>
                                                <h4 className="font-bold text-text-main text-lg mb-1">{story.client}</h4>
                                                <p className="text-xs font-bold text-text-gray tracking-wider uppercase">{story.industry}</p>
                                            </div>

                                            {/* Content */}
                                            <div className="w-full md:w-3/4 flex flex-col">
                                                <div className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs mb-4 w-fit">
                                                    {story.category}
                                                </div>
                                                <h3 className="text-2xl font-black text-text-main mb-3 group-hover:text-amber-500 transition-colors leading-tight">
                                                    {story.title}
                                                </h3>
                                                <p className="text-text-gray font-medium mb-6">
                                                    {story.desc}
                                                </p>
                                                
                                                {/* Metrics */}
                                                <div className="grid grid-cols-3 gap-4 mb-6">
                                                    {story.metrics.map((metric, mIdx) => (
                                                        <div key={mIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border">
                                                            <div className="text-xl md:text-2xl font-black text-text-main mb-1">{metric.value}</div>
                                                            <div className="text-xs font-bold text-text-gray uppercase">{metric.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Link href={`/insights/success-stories/${story.slug}`} className="inline-flex items-center gap-2 font-bold text-amber-500 hover:text-amber-600 transition-colors w-fit">
                                                    Read Success Story <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
