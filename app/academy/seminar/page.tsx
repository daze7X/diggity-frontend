'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Mic, Search, ArrowRight, Calendar, MapPin, Users, 
    Lightbulb, PlayCircle, Network, ArrowUpRight, CheckCircle2
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function SeminarPage() {
    const { language: locale } = useLanguage();
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await api.getAcademyCourses();
                setPrograms(data.filter((c: any) => c.type === 'seminar' || c.type === 'webinar'));
            } catch (error) {
                console.error("Failed to fetch seminars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    const formatIDR = (val: any) => {
        if (!val) return null;
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val));
    };

    const filteredPrograms = programs.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                        <Mic className="w-4 h-4" />
                        SEMINAR & WEBINAR
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Expand Your Horizon, ' : 'Perluas Wawasan, '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Gain Expert Insights.' : 'Dapatkan Insight Praktisi.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Join Diggity seminars to understand technological advancements, industry trends, careers, business, and various digital topics directly from practitioners and experts.' 
                            : 'Ikuti seminar Diggity untuk memahami perkembangan teknologi, industri, karier, bisnis, dan berbagai topik digital langsung dari praktisi dan expert.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#upcoming" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Explore Seminars' : 'Jelajahi Seminar'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. WHY JOIN */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Not Just Listening.' : 'Bukan Sekadar Mendengarkan.'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto">
                            {locale === 'en' ? 'Designed to give you new perspectives relevant to industry developments.' : 'Dirancang untuk membantu kamu mendapatkan perspektif baru yang relevan dengan perkembangan industri.'}
                        </p>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: ArrowUpRight, title: 'Upgrade Knowledge', desc: 'Pelajari tren, teknologi, strategi, dan insight terbaru dari berbagai bidang digital.' },
                            { icon: Users, title: 'Learn from Practitioners', desc: 'Dengarkan pengalaman langsung dari praktisi yang menghadapi tantangan nyata di industri.' },
                            { icon: Network, title: 'Build Your Network', desc: 'Berkenalan dengan peserta, praktisi, profesional, dan komunitas yang memiliki minat serupa.' },
                            { icon: Lightbulb, title: 'Expand Perspective', desc: 'Dapatkan sudut pandang baru untuk memahami peluang dan tantangan di bidang yang kamu minati.' }
                        ].map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border h-full hover:border-brand-blue/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                                        <exp.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{exp.title}</h3>
                                    <p className="text-sm text-text-gray font-medium">{exp.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03. UPCOMING SEMINARS */}
            <section id="upcoming" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Upcoming Seminars' : 'Seminar yang Akan Datang'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search seminars..." : "Cari seminar..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-text-main shadow-sm"
                            />
                        </ScrollReveal>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
                        </div>
                    ) : filteredPrograms.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredPrograms.map((p: any, idx: number) => (
                                <ScrollReveal key={p.id} animation="fade-up" delay={(idx % 2) * 100}>
                                    <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full">
                                        <div className="w-full sm:w-2/5 aspect-video sm:aspect-auto bg-slate-100 dark:bg-slate-800 relative shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={p.thumbnail ? (p.thumbnail.startsWith('http') ? p.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${p.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                alt={p.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col grow">
                                            <div className="inline-flex px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-4 w-fit">
                                                SEMINAR
                                            </div>
                                            <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">{p.title}</h3>
                                            <p className="text-sm text-text-gray font-medium line-clamp-2 mb-6">{p.description}</p>
                                            
                                            <div className="mt-auto space-y-3 mb-6">
                                                <div className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                    <Calendar className="w-4 h-4 text-brand-blue" />
                                                    {p.duration || 'TBA'}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                    <MapPin className="w-4 h-4 text-brand-blue" />
                                                    Online via Zoom
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-glass-border flex justify-between items-center">
                                                <span className="text-lg font-black text-brand-blue">
                                                    {p.price == 0 ? 'Gratis' : formatIDR(p.price)}
                                                </span>
                                                <Link href={`/academy/course/${p.slug}`} className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-colors text-sm">
                                                    Daftar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                            <Mic className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-50" />
                            <p className="text-lg font-bold text-text-main">
                                {locale === 'en' ? 'No seminars available right now.' : 'Belum ada jadwal seminar saat ini.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
