'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    Clock, ChevronRight, Share2, Calendar, MapPin, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
    const { language: locale } = useLanguage();

    const news = {
        title: 'Diggity Announces Strategic Partnership with Global AI Leader',
        category: 'Partnership',
        excerpt: 'Diggity expands its collaboration ecosystem through a strategic partnership focused on digital technology and talent development.',
        author: 'Diggity Editorial',
        date: '28 September 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop'
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* BREADCRUMB */}
                <nav className="flex items-center gap-2 text-xs font-bold text-text-gray mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-indigo-500">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/insights" className="hover:text-indigo-500">Insights</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/insights/news" className="hover:text-indigo-500">News & Announcements</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-indigo-500">{news.category}</span>
                </nav>

                {/* HEADER */}
                <ScrollReveal animation="fade-up" className="mb-10">
                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-xs uppercase tracking-widest mb-6">
                        {news.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-main leading-tight mb-6">
                        {news.title}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed mb-8">
                        {news.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium text-text-gray">
                        <div className="font-bold text-text-main">{news.author}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {news.date}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {news.readTime}</div>
                    </div>
                </ScrollReveal>

                {/* HERO IMAGE */}
                <ScrollReveal animation="fade-up" className="mb-12">
                    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-200 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                </ScrollReveal>

                {/* KEY INFORMATION BOX */}
                <ScrollReveal animation="fade-up" className="bg-slate-50 dark:bg-black/20 border border-glass-border rounded-2xl p-8 mb-12">
                    <h3 className="text-xs font-bold text-text-gray uppercase tracking-widest mb-6">PARTNERSHIP DETAILS</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <div className="text-xs font-bold text-text-gray mb-1">Partner</div>
                            <div className="text-sm font-bold text-text-main">XYZ University</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-text-gray mb-1">Collaboration</div>
                            <div className="text-sm font-bold text-text-main">Digital Talent Development</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-text-gray mb-1">Focus</div>
                            <div className="text-sm font-bold text-text-main">Education • Technology • Talent</div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* CONTENT */}
                <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-a:text-indigo-500 mb-16">
                    <h3>Introduction</h3>
                    <p>Diggity hari ini mengumumkan kemitraan strategis dengan XYZ University untuk mengembangkan talenta digital di Indonesia. Kerja sama ini bertujuan untuk menjembatani kesenjangan antara kurikulum akademis dan kebutuhan industri teknologi yang terus berkembang pesat.</p>
                    
                    <h3>Why This Collaboration</h3>
                    <p>Dengan adopsi AI dan otomatisasi yang masif, perusahaan membutuhkan talenta yang siap kerja. XYZ University memiliki komitmen kuat dalam pendidikan, sementara Diggity membawa pengalaman praktis dari industri.</p>

                    <h3>Programs / Initiatives</h3>
                    <ul>
                        <li>Kurikulum bersama berbasis studi kasus nyata.</li>
                        <li>Program magang (internship) eksklusif bagi mahasiswa tingkat akhir.</li>
                        <li>Akses gratis ke platform Diggity Academy bagi dosen dan pengajar.</li>
                    </ul>
                </article>

                {/* FROM NEWS TO ACTION */}
                <ScrollReveal animation="fade-up" className="pt-12 border-t border-glass-border mb-16">
                    <div className="bg-indigo-500/5 rounded-3xl p-8 md:p-12 text-center border border-indigo-500/20">
                        <h3 className="text-2xl font-black text-text-main mb-4">Looking for a Ready-to-Use Solution?</h3>
                        <p className="text-text-gray font-medium mb-8 max-w-lg mx-auto">
                            Temukan produk digital dan solusi siap pakai dari Diggity yang dapat membantu mempercepat pertumbuhan bisnis Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/products" className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors">
                                Explore Products
                            </Link>
                            <Link href="/solutions" className="px-6 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-indigo-500/50 text-text-main font-bold transition-colors">
                                View Solutions
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </div>
    );
}
