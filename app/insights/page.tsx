'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../../components/ScrollReveal';
import { 
    BookOpen, Newspaper, Trophy, Users, Handshake, 
    ArrowRight, Search, Zap, Star
} from 'lucide-react';

export default function InsightsHubPage() {
    const { language: locale } = useLanguage();

    const categories = [
        {
            title: locale === 'en' ? 'Blog & Education' : 'Blog & Edukasi',
            desc: locale === 'en' 
                ? 'Practical insights, tutorials, and guides on technology, business, and digital transformation.' 
                : 'Wawasan, tips, tutorial, dan panduan praktis seputar teknologi, AI, bisnis, dan kreativitas.',
            icon: BookOpen,
            href: '/insights/blog',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            title: locale === 'en' ? 'News & Announcements' : 'Berita & Pengumuman',
            desc: locale === 'en' 
                ? 'Latest updates on Diggity services, products, partnerships, and company achievements.' 
                : 'Informasi terbaru tentang Diggity, layanan, produk, program, dan aktivitas perusahaan.',
            icon: Newspaper,
            href: '/insights/news',
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10'
        },
        {
            title: locale === 'en' ? 'Success Stories' : 'Kisah Sukses',
            desc: locale === 'en' 
                ? 'Real-world case studies on how Diggity helps businesses, organizations, and talents grow.' 
                : 'Cerita nyata mengenai bagaimana layanan dan produk Diggity digunakan untuk membantu bisnis berkembang.',
            icon: Trophy,
            href: '/insights/success-stories',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10'
        },
        {
            title: locale === 'en' ? 'Digital Community' : 'Komunitas Digital',
            desc: locale === 'en' 
                ? 'Stories, activities, and collaborations from mentors, alumni, and the Diggity community.' 
                : 'Cerita, aktivitas, karya, dan kolaborasi dari mentor, alumni, member, serta komunitas Diggity.',
            icon: Users,
            href: '/insights/community',
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        },
        {
            title: locale === 'en' ? 'Partnership & Referral' : 'Partnership & Referral',
            desc: locale === 'en' 
                ? 'Discover partnership opportunities, referrals, and strategic collaborations with Diggity.' 
                : 'Temukan peluang partnership, referral, dan kolaborasi strategis bersama Diggity.',
            icon: Handshake,
            href: '/insights/partnership',
            color: 'text-rose-500',
            bg: 'bg-rose-500/10'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* HERO SECTION */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8 tracking-widest">
                        DIGGITY INSIGHTS
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Insights, Stories, and ' : 'Wawasan, Cerita, dan '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Digital Developments.' : 'Perkembangan di Dunia Digital.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Discover practical insights, the latest news, success stories, community activities, and collaboration opportunities to learn, grow, and connect in the digital era.' 
                            : 'Temukan wawasan praktis, kabar terbaru, kisah keberhasilan, aktivitas komunitas, serta peluang kolaborasi bersama Diggity untuk terus belajar, berkembang, dan terhubung.'}
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-6 h-6 text-text-gray group-focus-within:text-brand-blue transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={locale === 'en' ? "Search insights, tutorials, or news..." : "Cari artikel, tutorial, atau berita..."}
                            className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-lg text-text-main shadow-lg"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded-xl transition-colors">
                                {locale === 'en' ? 'Search' : 'Cari'}
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* CATEGORIES GRID */}
            <section className="py-12 px-6 relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} className={idx === 0 || idx === 1 ? "lg:col-span-1" : ""}>
                            <Link href={cat.href} className="block h-full p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 hover:shadow-xl transition-all group">
                                <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-brand-blue transition-colors">{cat.title}</h3>
                                <p className="text-text-gray font-medium mb-8 line-clamp-3">{cat.desc}</p>
                                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-blue opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                                    {locale === 'en' ? 'Explore' : 'Jelajahi'} <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                    
                    {/* Featured Article Highlights Card */}
                    <ScrollReveal animation="fade-up" delay={500} className="md:col-span-2 lg:col-span-1">
                        <div className="block h-full p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-indigo-600 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500">
                                <Star className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-6 w-fit backdrop-blur-sm">
                                    FEATURED
                                </div>
                                <h3 className="text-2xl font-black mb-3">Diggity Resmi Meluncurkan Layanan Rekayasa AI B2B</h3>
                                <p className="text-white/80 font-medium mb-8 line-clamp-3">
                                    Ekspansi layanan ini bertujuan membantu perusahaan lokal mengadopsi AI secara aman dan efisien dalam operasional mereka.
                                </p>
                                <Link href="/insights/news" className="mt-auto inline-flex items-center gap-2 font-bold hover:text-white/80 transition-colors w-fit">
                                    {locale === 'en' ? 'Read Full Story' : 'Baca Selengkapnya'} <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 relative z-10 text-center">
                <ScrollReveal animation="fade-up" className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                        Keep Learning. Keep Growing. Keep Building.
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                        <Link href="/academy" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Join Diggity Academy' : 'Gabung Diggity Academy'}
                        </Link>
                        <Link href="/solutions" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all">
                            {locale === 'en' ? 'Explore Solutions' : 'Eksplorasi Solusi'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
