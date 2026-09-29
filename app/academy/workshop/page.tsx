'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    ArrowRight, Book, Download, Smartphone, Code, Video, Users, Award, 
    MessageSquare, Wrench, Clock, Briefcase, Settings, TrendingUp, Target, 
    ShieldCheck, Heart, BookOpen, Star, Search
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function WorkshopLandingPage() {
    const { language: locale } = useLanguage();
    const [programs, setPrograms] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await api.getAcademyCourses();
                setPrograms(data.filter((c: any) => c.type === 'workshop'));
            } catch (error) {
                console.error("Failed to fetch programs:", error);
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
            {/* Background */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Intensive Workshops' : 'Workshop Intensif'}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' ? 'Master specific skills through hands-on practice in 1-3 day intensive sessions.' : 'Kuasai skill spesifik melalui praktik langsung dalam sesi intensif 1-3 hari.'}
                    </p>
                </ScrollReveal>
            </section>

            {/* 02. BENEFITS */}
            <section className="py-20 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    { [
                        { icon: Wrench, en: 'Hands-on Practice', id: 'Praktik Langsung' },
                        { icon: Clock, en: 'Intensive Learning', id: 'Belajar Intensif' },
                        { icon: Users, en: 'Direct Mentoring', id: 'Mentoring Langsung' },
                        { icon: Briefcase, en: 'Real Case Studies', id: 'Studi Kasus Nyata' }
                    ].map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border text-center shadow-sm">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-text-main">{locale === 'en' ? b.en : b.id}</h4>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>

            {/* 03. CATALOG */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Explore Programs' : 'Eksplorasi Program'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search..." : "Cari..."}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrograms.map((p: any, idx: number) => (
                                <ScrollReveal key={p.id} animation="fade-up" delay={(idx % 3) * 100}>
                                    <Link href={`/academy/course/${p.slug}`} className="block h-full group">
                                        <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                            <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={p.thumbnail ? (p.thumbnail.startsWith('http') ? p.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${p.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                    alt={p.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">{p.title}</h3>
                                                <p className="text-sm text-text-gray font-medium line-clamp-2 mb-4">{p.description}</p>
                                                <div className="mt-auto pt-4 border-t border-glass-border flex justify-between items-center">
                                                    <span className="text-lg font-black text-brand-blue">
                                                        {p.price == 0 ? (locale === 'en' ? 'Free' : 'Gratis') : formatIDR(p.price)}
                                                    </span>
                                                    <ArrowRight className="w-5 h-5 text-text-gray group-hover:text-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                            <BookOpen className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-50" />
                            <p className="text-lg font-bold text-text-main">
                                {locale === 'en' ? 'No programs available yet.' : 'Belum ada program tersedia.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
