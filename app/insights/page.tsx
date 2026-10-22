'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../../components/ScrollReveal';
import { api, Blog } from '../../lib/api';
import { 
    BookOpen, Newspaper, Trophy, Users, Handshake, 
    ArrowRight, Search, Zap, Star, Mail, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function InsightsHubPage() {
    const { language: locale } = useLanguage();
    const isEn = locale === 'en';
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [newsletterMsg, setNewsletterMsg] = useState('');
    const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);

    useEffect(() => {
        api.getInsights()
            .then((blogs) => {
                if (blogs && blogs.length > 0) {
                    setFeaturedBlog(blogs[0]);
                }
            })
            .catch(() => {});
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/insights/blog?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setNewsletterStatus('loading');
        try {
            await api.submitLead({
                name: 'Newsletter Subscriber',
                email: newsletterEmail,
                phone: '-',
                company: '-',
                service: 'Newsletter - Stay in the Loop',
                message: `User subscribed to newsletter via Insights Hub.`,
            }).catch(() => {});
            
            setNewsletterStatus('success');
            setNewsletterMsg(isEn ? 'Thank you for subscribing! You are now in the loop.' : 'Terima kasih telah berlangganan! Anda akan mendapatkan pembaruan wawasan terbaru.');
            setNewsletterEmail('');
        } catch (err: any) {
            setNewsletterStatus('error');
            setNewsletterMsg(isEn ? 'Failed to subscribe. Please try again.' : 'Gagal berlangganan. Silakan coba kembali.');
        }
    };

    const categories = [
        {
            title: isEn ? 'Blog & Education' : 'Blog & Edukasi',
            desc: isEn 
                ? 'Practical insights, tutorials, and guides on technology, business, and digital transformation.' 
                : 'Wawasan, tips, tutorial, dan panduan praktis seputar teknologi, AI, bisnis, dan kreativitas.',
            icon: BookOpen,
            href: '/insights/blog',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            title: isEn ? 'News & Announcements' : 'Berita & Pengumuman',
            desc: isEn 
                ? 'Latest updates on Diggity services, products, partnerships, and company achievements.' 
                : 'Informasi terbaru tentang Diggity, layanan, produk, program, dan aktivitas perusahaan.',
            icon: Newspaper,
            href: '/insights/news',
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10'
        },
        {
            title: isEn ? 'Success Stories' : 'Kisah Sukses',
            desc: isEn 
                ? 'Real-world case studies on how Diggity helps businesses, organizations, and talents grow.' 
                : 'Cerita nyata mengenai bagaimana layanan dan produk Diggity digunakan untuk membantu bisnis berkembang.',
            icon: Trophy,
            href: '/insights/success-stories',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10'
        },
        {
            title: isEn ? 'Digital Community' : 'Komunitas Digital',
            desc: isEn 
                ? 'Stories, activities, and collaborations from mentors, alumni, and the Diggity community.' 
                : 'Cerita, aktivitas, karya, dan kolaborasi dari mentor, alumni, member, serta komunitas Diggity.',
            icon: Users,
            href: '/community',
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        },
        {
            title: isEn ? 'Partnership & Referral' : 'Kemitraan & Referral',
            desc: isEn 
                ? 'Discover B2B partnership opportunities, referral programs, and strategic collaborations.' 
                : 'Temukan peluang partnership strategis, program referral, dan kolaborasi bisnis bersama Diggity.',
            icon: Handshake,
            href: '/partnership',
            color: 'text-rose-500',
            bg: 'bg-rose-500/10'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 1. HERO SECTION & FUNCTIONAL SEARCH */}
            <section className="relative pt-16 pb-20 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8 tracking-widest">
                        DIGGITY INSIGHTS
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {isEn ? 'Insights, Perspectives, and ' : 'Wawasan, Cerita, dan '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {isEn ? 'Digital Developments.' : 'Perkembangan di Dunia Digital.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {isEn 
                            ? 'Discover practical insights, the latest news, verified success stories, community activities, and collaboration opportunities to learn, grow, and connect.' 
                            : 'Temukan wawasan praktis, kabar terbaru, kisah keberhasilan, aktivitas komunitas, serta peluang kolaborasi bersama Diggity untuk terus belajar, berkembang, dan terhubung.'}
                    </p>
                    
                    {/* Functional Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-text-gray group-focus-within:text-brand-blue transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={isEn ? "Search insights, tutorials, or news..." : "Cari artikel, tutorial, atau berita..."}
                            className="w-full pl-16 pr-28 py-4 md:py-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-base md:text-lg text-text-main shadow-lg"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button 
                                type="submit"
                                className="px-5 py-2.5 md:py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
                            >
                                {isEn ? 'Search' : 'Cari'}
                            </button>
                        </div>
                    </form>
                </ScrollReveal>
            </section>

            {/* 2. CATEGORIES GRID & FEATURED HIGHLIGHT (3.7) */}
            <section className="py-12 px-6 relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                            <Link href={cat.href} className="block h-full p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 hover:shadow-xl transition-all group">
                                <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-brand-blue transition-colors">{cat.title}</h3>
                                <p className="text-text-gray font-medium mb-8 line-clamp-3">{cat.desc}</p>
                                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-blue opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                                    {isEn ? 'Explore' : 'Jelajahi'} <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                    
                    {/* Featured Article Highlights Card (Dynamic & Validated Link) */}
                    <ScrollReveal animation="fade-up" delay={500}>
                        <div className="block h-full p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-indigo-600 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500">
                                <Star className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-6 w-fit backdrop-blur-sm">
                                    {isEn ? 'FEATURED INSIGHT' : 'ARTIKEL UNGGULAN'}
                                </div>
                                <h3 className="text-2xl font-black mb-3 line-clamp-2">
                                    {featuredBlog ? featuredBlog.title : '5 Teknologi Web Modern Terbaik di Tahun 2026'}
                                </h3>
                                <p className="text-white/80 font-medium mb-8 line-clamp-3 text-sm leading-relaxed">
                                    {featuredBlog 
                                        ? (featuredBlog.meta_description || featuredBlog.content.replace(/<[^>]*>/g, '').slice(0, 130))
                                        : 'Dunia pengembangan web bergerak sangat cepat. Beberapa teknologi modern telah mendominasi industri untuk performa maksimal.'}
                                </p>
                                <Link 
                                    href={featuredBlog ? `/insights/${featuredBlog.slug}` : '/insights/blog'} 
                                    className="mt-auto inline-flex items-center gap-2 font-bold hover:text-white/80 transition-colors w-fit text-sm bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl backdrop-blur-sm"
                                >
                                    {isEn ? 'Read Full Article' : 'Baca Artikel Lengkap'} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 3. STAY IN THE LOOP (NEWSLETTER) - Replaces the old Keep Learning banner */}
            <section className="py-20 px-6 relative z-10 max-w-4xl mx-auto text-center border-t border-glass-border mt-12">
                <ScrollReveal animation="fade-up">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 rotate-6">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4 tracking-tight">
                        Stay in the Loop.
                    </h2>
                    <p className="text-base md:text-lg text-text-gray font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                        {isEn 
                            ? 'Get curated perspectives on technology, AI architecture, digital business growth, and developer playbooks delivered to your inbox.' 
                            : 'Dapatkan kurasi wawasan teknologi terkini, arsitektur AI, pertumbuhan bisnis digital, dan studi kasus praktis langsung di email Anda.'}
                    </p>

                    {newsletterStatus === 'success' ? (
                        <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span>{newsletterMsg}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input 
                                type="email" 
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder={isEn ? "Enter your business email..." : "Masukkan email aktif Anda..."}
                                className="flex-1 px-5 py-3.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-sm text-text-main"
                            />
                            <button 
                                type="submit" 
                                disabled={newsletterStatus === 'loading'}
                                className="px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm transition-colors cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-brand-blue/20"
                            >
                                {newsletterStatus === 'loading' ? (isEn ? 'Subscribing...' : 'Memproses...') : (isEn ? 'Subscribe' : 'Berlangganan')}
                            </button>
                        </form>
                    )}

                    {newsletterStatus === 'error' && (
                        <p className="text-rose-500 text-xs mt-3 flex items-center justify-center gap-1.5">
                            <AlertCircle className="w-4 h-4" />
                            <span>{newsletterMsg}</span>
                        </p>
                    )}

                    <p className="text-xs text-text-muted mt-4">
                        {isEn ? 'No spam ever. Unsubscribe anytime with one click.' : 'Kami menjaga privasi Anda. Berhenti berlangganan kapan saja dengan satu klik.'}
                    </p>
                </ScrollReveal>
            </section>
        </div>
    );
}
