'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Book, Download, Smartphone, Star, Search, ArrowRight, 
    Library, LayoutTemplate, BookOpen, FileText, CheckCircle2, Target
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function EBookPage() {
    const { language: locale } = useLanguage();
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await api.getAcademyCourses();
                setPrograms(data.filter((c: any) => c.type === 'e_book'));
            } catch (error) {
                console.error("Failed to fetch e-books:", error);
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
                        <Book className="w-4 h-4" />
                        PREMIUM E-BOOKS
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Read, Learn, and ' : 'Baca, Pelajari, dan '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Expand New Skills.' : 'Kembangkan Skill Baru.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Find practical and relevant e-books to broaden your insights, learn digital skills, and help you grow in your career or business.' 
                            : 'Temukan e-book praktis dan relevan untuk memperluas wawasan, mempelajari skill digital, dan membantu kamu berkembang dalam karier maupun bisnis.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#catalog" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Explore E-Books' : 'Jelajahi Semua E-Book'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* 08. READING EXPERIENCE */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'More Than Just Digital Books' : 'Lebih dari Sekadar Buku Digital'}
                        </h2>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: FileText, title: 'Practical Content', desc: locale === 'en' ? 'Designed to help readers grasp concepts and apply them immediately.' : 'Materi dirancang untuk membantu pembaca memahami konsep dan langsung menerapkannya.' },
                            { icon: BookOpen, title: 'Easy to Understand', desc: locale === 'en' ? 'Practical language and structured layouts for easy comprehension.' : 'Bahasa yang praktis dan terstruktur agar mudah dipahami, termasuk bagi pemula.' },
                            { icon: Target, title: 'Industry Relevant', desc: locale === 'en' ? 'Topics curated based on current tech, business, and job market demands.' : 'Topik disusun berdasarkan kebutuhan teknologi, bisnis, dan dunia kerja digital.' }
                        ].map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border text-center h-full">
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                                        <exp.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-4">{exp.title}</h3>
                                    <p className="text-text-gray font-medium">{exp.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 09. PRACTICAL KNOWLEDGE JOURNEY */}
            <section className="py-24 px-6 relative z-10 bg-brand-blue/5">
                <div className="max-w-5xl mx-auto text-center">
                    <ScrollReveal animation="fade-up">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-16">
                            {locale === 'en' ? 'Read. Understand. Apply.' : 'Baca. Pahami. Terapkan.'}
                        </h2>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-blue/20 -translate-y-1/2 hidden md:block"></div>
                            
                            {['Discover', 'Read', 'Understand', 'Apply', 'Grow'].map((step, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center gap-4 my-4 md:my-0 bg-brand-blue/5 md:bg-transparent p-4 md:p-0 rounded-xl">
                                    <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center shadow-lg border-4 border-bg-canvas">
                                        {i + 1}
                                    </div>
                                    <span className="font-bold text-text-main">{step}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 07. E-BOOK CATALOG */}
            <section id="catalog" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'E-Book Collection' : 'Koleksi E-Book Diggity'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search e-books..." : "Cari e-book..."}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredPrograms.map((p: any, idx: number) => (
                                <ScrollReveal key={p.id} animation="fade-up" delay={(idx % 4) * 100}>
                                    <Link href={`/academy/course/${p.slug}`} className="block h-full group">
                                        <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                            <div className="w-full aspect-[3/4] bg-slate-100 dark:bg-slate-800 relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={p.thumbnail ? (p.thumbnail.startsWith('http') ? p.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${p.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                    alt={p.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {p.badge && (
                                                    <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full shadow-lg">
                                                        {p.badge}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-lg font-bold text-text-main mb-2 line-clamp-2">{p.title}</h3>
                                                <p className="text-xs text-text-gray font-medium line-clamp-2 mb-4">{p.description}</p>
                                                <div className="mt-auto pt-4 border-t border-glass-border flex justify-between items-center">
                                                    <span className="text-lg font-black text-brand-blue">
                                                        {p.price == 0 ? (locale === 'en' ? 'Free' : 'Gratis') : formatIDR(p.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                            <Library className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-50" />
                            <p className="text-lg font-bold text-text-main">
                                {locale === 'en' ? 'No e-books available yet.' : 'Belum ada e-book tersedia.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
