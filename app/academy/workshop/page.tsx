'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Wrench, Clock, Users, Briefcase, Search, ArrowRight, 
    PlayCircle, Code, Layers, FileCode2, Target, Calendar, BookOpen, CheckCircle2
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function WorkshopPage() {
    const { language: locale } = useLanguage();
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await api.getAcademyCourses();
                setPrograms(data.filter((c: any) => c.type === 'workshop'));
            } catch (error) {
                console.error("Failed to fetch workshops:", error);
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
            <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                        <Wrench className="w-4 h-4" />
                        WORKSHOP
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Learn by Doing, ' : 'Belajar dengan Praktik, '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Build Real Skills.' : 'Bangun Skill yang Nyata.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Develop your capabilities through hands-on workshops with mentors and practitioners. Produce tangible results you can take forward.' 
                            : 'Kembangkan kemampuan melalui workshop hands-on bersama mentor dan praktisi. Hasilkan sesuatu yang bisa kamu kembangkan lebih lanjut.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#upcoming" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Explore Workshops' : 'Jelajahi Workshop'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* WHY JOIN WORKSHOP */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Don\'t Just Learn. Practice.' : 'Jangan Hanya Belajar. Praktikkan.'}
                        </h2>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: BookOpen, title: 'Learn', desc: 'Pahami konsep dan fundamental yang dibutuhkan.' },
                            { icon: Code, title: 'Practice', desc: 'Langsung mencoba melalui latihan dan exercise.' },
                            { icon: Layers, title: 'Build', desc: 'Terapkan skill melalui mini project atau real-world case.' },
                            { icon: Target, title: 'Get Feedback', desc: 'Dapatkan feedback dan arahan langsung dari mentor.' }
                        ].map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-6 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border text-center h-full hover:border-brand-blue/50 transition-colors">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                                        <exp.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-2">{exp.title}</h3>
                                    <p className="text-sm text-text-gray font-medium">{exp.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT YOU WILL BUILD */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                                {locale === 'en' ? 'Bring Home Real Results' : 'Pulang Membawa Hasil'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium mb-8">
                                {locale === 'en' 
                                    ? 'Every workshop is designed with a clear output. You will not only listen but also create a mini project, prototype, or portfolio piece.' 
                                    : 'Setiap workshop dirancang dengan output yang jelas. Kamu tidak hanya mendengar, tetapi juga menghasilkan karya atau portfolio nyata.'}
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="font-bold text-text-main">UI/UX Workshop</h4>
                                        <p className="text-sm text-text-gray">Output: Wireframe + UI Design + Prototype</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="font-bold text-text-main">Web Development</h4>
                                        <p className="text-sm text-text-gray">Output: Functional Website / Mini Application</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="font-bold text-text-main">AI Workshop</h4>
                                        <p className="text-sm text-text-gray">Output: AI Automation Workflow / Chatbot</p>
                                    </div>
                                </li>
                            </ul>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left">
                            <div className="bg-brand-blue/5 rounded-3xl p-8 border border-brand-blue/20">
                                <div className="text-2xl font-black text-brand-blue mb-6">Workshop Methodology</div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 bg-white dark:bg-glass-bg p-4 rounded-xl border border-glass-border">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">1</div>
                                        <div><span className="font-bold text-text-main">Learn</span> <span className="text-text-gray">— Fundamental & Framework</span></div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white dark:bg-glass-bg p-4 rounded-xl border border-glass-border">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">2</div>
                                        <div><span className="font-bold text-text-main">Practice</span> <span className="text-text-gray">— Guided Exercise</span></div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white dark:bg-glass-bg p-4 rounded-xl border border-glass-border">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">3</div>
                                        <div><span className="font-bold text-text-main">Build</span> <span className="text-text-gray">— Mini Project / Case Study</span></div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white dark:bg-glass-bg p-4 rounded-xl border border-glass-border">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">4</div>
                                        <div><span className="font-bold text-text-main">Review</span> <span className="text-text-gray">— Mentor Feedback</span></div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* UPCOMING WORKSHOPS */}
            <section id="upcoming" className="py-24 px-6 relative z-10 bg-brand-blue/5 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Upcoming Workshops' : 'Workshop yang Akan Datang'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search workshops..." : "Cari workshop..."}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrograms.map((p: any, idx: number) => (
                                <ScrollReveal key={p.id} animation="fade-up" delay={(idx % 3) * 100}>
                                    <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                        <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={p.thumbnail ? (p.thumbnail.startsWith('http') ? p.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${p.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                alt={p.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full shadow-lg">
                                                WORKSHOP
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col grow">
                                            <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">{p.title}</h3>
                                            <p className="text-sm text-text-gray font-medium line-clamp-2 mb-6">{p.description}</p>
                                            
                                            <div className="space-y-3 mb-6 flex-1">
                                                <div className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                    <Calendar className="w-4 h-4 text-brand-blue" />
                                                    {p.duration || 'TBA'}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                    <Clock className="w-4 h-4 text-brand-blue" />
                                                    09.00 - 13.00 WIB
                                                </div>
                                                <div className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                    <Users className="w-4 h-4 text-brand-blue" />
                                                    Kuota Terbatas
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-glass-border flex justify-between items-center">
                                                <span className="text-xl font-black text-brand-blue">
                                                    {p.price == 0 ? 'Gratis' : formatIDR(p.price)}
                                                </span>
                                                <Link href={`/academy/course/${p.slug}`} className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
                                                    <ArrowRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                            <Wrench className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-50" />
                            <p className="text-lg font-bold text-text-main">
                                {locale === 'en' ? 'No workshops available right now.' : 'Belum ada jadwal workshop saat ini.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
