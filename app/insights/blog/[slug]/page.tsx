'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    Clock, User, ChevronRight, Share2, Link2, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    const { language: locale } = useLanguage();

    const article = {
        title: 'How AI Agents Are Changing Business Automation',
        category: 'AI & Data',
        topic: 'Artificial Intelligence',
        excerpt: 'AI Agents mulai mengubah cara bisnis menjalankan proses operasional, mulai dari customer service hingga workflow automation. Pelajari bagaimana AI Agents bekerja dan bagaimana bisnis dapat mulai mengimplementasikannya.',
        author: 'Diggity Editorial',
        date: '28 September 2026',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop'
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* BREADCRUMB */}
                <nav className="flex items-center gap-2 text-xs font-bold text-text-gray mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-brand-blue">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/insights" className="hover:text-brand-blue">Insights</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/insights/blog" className="hover:text-brand-blue">Blog & Education</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-brand-blue">{article.category}</span>
                </nav>

                {/* HEADER */}
                <ScrollReveal animation="fade-up" className="max-w-4xl mx-auto text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs uppercase tracking-widest">{article.category}</span>
                        <span className="text-text-gray font-bold text-sm">{article.topic}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-tight mb-6">
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm font-medium text-text-gray">
                        <div className="flex items-center gap-2"><User className="w-4 h-4" /> By {article.author}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div>Published {article.date}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</div>
                    </div>
                </ScrollReveal>

                {/* HERO IMAGE */}
                <ScrollReveal animation="fade-up" className="mb-16">
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                </ScrollReveal>

                {/* TWO-COLUMN LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* LEFT CONTENT (65-75%) */}
                    <div className="w-full lg:w-2/3">
                        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand-blue mb-16">
                            <h2>Introduction</h2>
                            <p>AI tidak lagi hanya digunakan untuk menghasilkan teks atau menjawab pertanyaan. Perkembangan AI Agents memungkinkan sistem menjalankan serangkaian task secara lebih autonomous berdasarkan tujuan yang diberikan.</p>
                            
                            <h2>What Are AI Agents?</h2>
                            <p>Penjelasan konsep dasar tentang bagaimana entitas AI ini dapat mengobservasi lingkungan mereka, membuat keputusan, dan mengambil tindakan secara mandiri untuk mencapai target.</p>
                            
                            <blockquote>
                                "AI Agents paling bernilai ketika digunakan untuk menyelesaikan workflow yang jelas dan berulang, bukan sekadar menggantikan aktivitas manusia secara keseluruhan."
                            </blockquote>
                            
                            <h2>Business Use Cases</h2>
                            <ul>
                                <li><strong>Customer Service:</strong> AI support agent yang bisa mengecek status pesanan dan memproses refund secara otomatis.</li>
                                <li><strong>Sales:</strong> Lead qualification dan personalized outreach.</li>
                                <li><strong>Operations:</strong> Workflow automation antar departemen.</li>
                            </ul>
                        </article>

                        {/* KEY TAKEAWAYS */}
                        <ScrollReveal animation="fade-up" className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-8 mb-16">
                            <h3 className="text-2xl font-black text-text-main mb-6">Key Takeaways</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                                    <span className="text-text-main font-medium">AI Agents dapat menjalankan workflow multi-step.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                                    <span className="text-text-main font-medium">Tidak semua proses bisnis perlu menggunakan AI Agent.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                                    <span className="text-text-main font-medium">Implementasi sebaiknya dimulai dari workflow yang jelas.</span>
                                </li>
                            </ul>
                        </ScrollReveal>

                        {/* FROM INSIGHT TO ACTION */}
                        <ScrollReveal animation="fade-up" className="bg-gradient-to-r from-brand-blue to-indigo-600 rounded-3xl p-10 text-white text-center shadow-xl">
                            <h3 className="text-3xl font-black mb-4">Want to explore AI for your business?</h3>
                            <p className="text-lg font-medium opacity-90 mb-8 max-w-xl mx-auto">
                                Pelajari bagaimana AI, automation, dan data dapat diterapkan untuk meningkatkan proses bisnis dan produktivitas tim.
                            </p>
                            <Link href="/solutions" className="inline-flex px-8 py-4 bg-white text-brand-blue font-black rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                                Explore AI & Data Solutions
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT SIDEBAR (25-35%) */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24 space-y-8">
                            
                            {/* TOC */}
                            <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-2xl p-6">
                                <h4 className="font-bold text-text-main mb-4 uppercase tracking-widest text-xs">On This Page</h4>
                                <ul className="space-y-3 text-sm font-medium text-text-gray">
                                    <li><a href="#" className="hover:text-brand-blue transition-colors">01. Introduction</a></li>
                                    <li><a href="#" className="hover:text-brand-blue transition-colors">02. What Are AI Agents?</a></li>
                                    <li><a href="#" className="hover:text-brand-blue transition-colors">03. Business Use Cases</a></li>
                                    <li><a href="#" className="hover:text-brand-blue transition-colors">04. Key Takeaways</a></li>
                                </ul>
                            </div>

                            {/* SHARE */}
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-text-gray uppercase tracking-widest">Share:</span>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-glass-bg border border-glass-border flex items-center justify-center text-text-gray hover:text-brand-blue hover:border-brand-blue transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white dark:bg-glass-bg border border-glass-border flex items-center justify-center text-text-gray hover:text-brand-blue hover:border-brand-blue transition-colors">
                                        <Link2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* CTA BANNER */}
                            <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-6 border border-glass-border text-center">
                                <div className="w-12 h-12 mx-auto rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h4 className="font-black text-text-main mb-2">Want to Learn This Skill?</h4>
                                <p className="text-sm text-text-gray font-medium mb-6">Pelajari lebih lanjut melalui program Diggity Academy.</p>
                                <Link href="/academy" className="block w-full py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded-xl transition-colors text-sm">
                                    Explore Academy
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
