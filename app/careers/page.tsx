'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../../components/ScrollReveal';
import { 
    Briefcase, Rocket, BookOpen, Users, TrendingUp, Target, 
    Globe, Heart, CheckCircle2, ChevronRight, Search, MapPin
} from 'lucide-react';

export default function CareersPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDept, setFilterDept] = useState('All');

    const DEPARTMENTS = ['All', 'Technology', 'AI & Data', 'Creative & Brand', 'Growth Marketing', 'Cloud & Cyber Security'];

    const openPositions = [
        { id: 1, title: 'Full-Stack Developer', dept: 'Technology', location: 'Yogyakarta / Hybrid', type: 'Full-time', level: 'Junior–Middle', date: 'Dibuat 3 hari yang lalu', slug: 'full-stack-developer' },
        { id: 2, title: 'UI/UX Designer', dept: 'Creative & Brand', location: 'Yogyakarta / Hybrid', type: 'Full-time', level: 'Junior–Middle', date: 'Dibuat 3 hari yang lalu', slug: 'ui-ux-designer' },
        { id: 3, title: 'Digital Marketing Specialist', dept: 'Growth Marketing', location: 'Remote / Hybrid', type: 'Full-time', level: 'Junior–Middle', date: 'Dibuat 7 hari yang lalu', slug: 'digital-marketing-specialist' },
        { id: 4, title: 'AI & Automation Specialist', dept: 'AI & Data', location: 'Remote / Hybrid', type: 'Project-based / Full-time', level: 'Middle', date: 'Dibuat 10 hari yang lalu', slug: 'ai-automation-specialist' },
    ];

    const filteredPositions = openPositions.filter(p => 
        (filterDept === 'All' || p.dept === filterDept) &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* 1. HERO SECTION */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                        <Briefcase className="w-4 h-4" />
                        CAREERS AT DIGGITY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        Build Your Career. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            Build the Future.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Join Diggity and be part of the team building digital solutions for businesses, organizations, and society. You won’t just fill a position; you will build, experiment, and create an impact.' 
                            : 'Bergabung bersama Diggity dan jadilah bagian dari tim yang membangun solusi digital untuk bisnis, organisasi, dan masyarakat. Kamu bukan sekadar mengisi posisi, kamu akan menciptakan sesuatu yang berdampak.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#open-positions" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Explore Open Positions' : 'Lihat Lowongan'}
                        </Link>
                        <Link href="#culture" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all">
                            {locale === 'en' ? 'Our Culture' : 'Kenali Budaya Diggity'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* 2 & 3. WHY JOIN DIGGITY */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4">
                            More Than Just a Workplace
                        </h2>
                        <p className="text-lg text-text-gray font-medium">Kenapa bergabung dengan Diggity?</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Rocket, title: 'Work on Real Projects', desc: 'Terlibat langsung dalam proyek dan produk digital yang digunakan oleh bisnis, organisasi, dan masyarakat.' },
                            { icon: BookOpen, title: 'Keep Learning', desc: 'Belajar bukan sekadar benefit, tetapi bagian dari cara kami bekerja. Eksplorasi teknologi dan skill baru.' },
                            { icon: Users, title: 'Collaborative Environment', desc: 'Bekerja bersama tim lintas keahlian—developer, designer, marketer, strategist, hingga AI specialist.' },
                            { icon: TrendingUp, title: 'Room to Grow', desc: 'Kami membuka ruang bagi setiap individu untuk berkembang, mengambil ownership, dan mengeksplorasi jalur karier.' },
                            { icon: Target, title: 'Build Something Meaningful', desc: 'Bukan hanya mengerjakan task, tetapi memahami masalah dan ikut membangun solusi yang bernilai.' },
                            { icon: Globe, title: 'Flexible & Future-Oriented', desc: 'Membangun cara kerja yang adaptif terhadap perkembangan teknologi dan perubahan dunia kerja.' }
                        ].map((item, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border h-full hover:border-brand-blue/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{item.title}</h3>
                                    <p className="text-sm text-text-gray font-medium">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. OUR CULTURE */}
            <section id="culture" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6 leading-tight">
                                Work. Learn. <br />Create. Grow.
                            </h2>
                            <p className="text-lg text-text-gray font-medium mb-8">
                                Di Diggity, kehidupan kerja bukan hanya tentang deadline dan meeting. Kami ingin menciptakan lingkungan di mana setiap orang dapat berkembang pesat.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Curious', desc: 'Selalu ingin tahu, belajar, dan mengeksplorasi hal baru.' },
                                    { title: 'Collaborative', desc: 'Percaya bahwa solusi terbaik lahir dari kolaborasi lintas fungsi.' },
                                    { title: 'Adaptive', desc: 'Cepat beradaptasi dengan teknologi dan perubahan kebutuhan.' },
                                    { title: 'Accountable', desc: 'Berani bertanggung jawab terhadap pekerjaan dan hasil.' }
                                ].map((c, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/20">
                                        <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                                        <div>
                                            <h4 className="font-bold text-text-main text-lg">{c.title}</h4>
                                            <p className="text-text-gray font-medium text-sm">{c.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <ScrollReveal animation="slide-left" className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>
                            <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-8 relative z-10 shadow-2xl">
                                <h3 className="text-2xl font-black text-text-main mb-6">Employee Value Proposition</h3>
                                <div className="space-y-4">
                                    {[
                                        ['Learning', 'Learning resources, mentoring & knowledge sharing'],
                                        ['Career', 'Career development & growth opportunities'],
                                        ['Experience', 'Real-world projects & cross-functional exposure'],
                                        ['Community', 'Collaborative digital ecosystem'],
                                        ['Flexibility', 'Flexible work arrangement sesuai kebutuhan role'],
                                        ['Impact', 'Kesempatan membangun solusi yang digunakan secara nyata']
                                    ].map((evp, i) => (
                                        <div key={i} className="flex items-start gap-3 pb-4 border-b border-glass-border last:border-0 last:pb-0">
                                            <Heart className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                                            <div>
                                                <div className="font-bold text-text-main">{evp[0]}</div>
                                                <div className="text-sm text-text-gray">{evp[1]}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 5. OPEN POSITIONS (ATS LITE) */}
            <section id="open-positions" className="py-24 px-6 relative z-10 bg-brand-blue/5 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4">
                            Find Your Place at Diggity
                        </h2>
                        <p className="text-lg text-text-gray font-medium">Temukan posisi yang sesuai dengan keahlian dan perjalanan kariermu.</p>
                    </ScrollReveal>

                    {/* Filter & Search */}
                    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {DEPARTMENTS.map(dept => (
                                <button 
                                    key={dept}
                                    onClick={() => setFilterDept(dept)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filterDept === dept ? 'bg-brand-blue text-white shadow-md' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-brand-blue'}`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-72 shrink-0">
                            <Search className="w-5 h-5 text-text-gray absolute left-4 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder="Cari posisi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue outline-none transition-all font-medium text-sm shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {filteredPositions.map((job, i) => (
                            <ScrollReveal key={job.id} animation="fade-up" delay={i * 100}>
                                <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-6 md:p-8 hover:border-brand-blue/50 transition-all shadow-sm hover:shadow-xl group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-text-main mb-1 group-hover:text-brand-blue transition-colors">{job.title}</h3>
                                            <p className="text-sm font-bold text-text-gray">CV Sinergi Cita Digital — Diggity</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                            <Briefcase className="w-6 h-6 text-brand-blue" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-text-main flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {job.location}
                                        </div>
                                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-text-main">
                                            {job.type}
                                        </div>
                                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-text-main">
                                            {job.level}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-glass-border">
                                        <span className="text-xs text-text-gray font-medium">{job.date}</span>
                                        <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-blue-hover transition-colors">
                                            Lihat Detail <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}

                        {filteredPositions.length === 0 && (
                            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                                <p className="text-lg font-bold text-text-gray">Tidak ada lowongan yang sesuai kriteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Don't See Your Role? */}
                    <ScrollReveal animation="fade-up">
                        <div className="bg-gradient-to-r from-brand-blue to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl">
                            <h3 className="text-2xl md:text-4xl font-black mb-4">Don&apos;t See Your Role?</h3>
                            <p className="text-lg font-medium opacity-90 max-w-2xl mx-auto mb-8">
                                Kami selalu terbuka untuk bertemu dengan orang-orang yang memiliki passion untuk technology, creativity, business, dan innovation. Simpan talent terbaik hari ini, bukan hanya ketika posisi sudah terbuka.
                            </p>
                            <button className="px-8 py-4 rounded-xl bg-white text-brand-blue font-black hover:bg-slate-50 transition-colors shadow-lg">
                                Join Our Talent Pool
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
