import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import FaqAccordion from '../../components/FaqAccordion';
import { api, Service, Faq } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import {
    Code2, Bot, Palette, TrendingUp, Cloud, Lightbulb,
    Users, ArrowRight, ChevronRight, Zap, Star, Calendar,
    Building2, ShieldCheck, Target, Clock, MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Solutions - Diggity Agency',
    description:
        'Jelajahi 7 kategori solusi digital Diggity: Technology, AI, Creative, Growth Marketing, Cloud & Security, Consulting, dan IT Talent.',
};

export const revalidate = 60;

/* ─────────────────────────────────────────────
   Category config (icon, color, description)
   keyed by category slug from backend
───────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<string, {
    icon: React.ElementType;
    gradient: string;
    accentText: string;
    accentBg: string;
    border: string;
    glowColor: string;
    descEn: string;
    descId: string;
}> = {
    'technology': {
        icon: Code2,
        gradient: 'from-blue-500/10 to-indigo-500/5',
        accentText: 'text-blue-500',
        accentBg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glowColor: 'bg-blue-500/10',
        descEn: 'End-to-end technology solutions to build, develop, and integrate digital systems.',
        descId: 'Solusi teknologi end-to-end untuk membangun, mengembangkan, dan mengintegrasikan sistem digital.',
    },
    'ai-emerging-technology': {
        icon: Bot,
        gradient: 'from-violet-500/10 to-purple-500/5',
        accentText: 'text-violet-500',
        accentBg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
        glowColor: 'bg-violet-500/10',
        descEn: 'AI, data, automation, IoT, and emerging technology to enhance business capabilities.',
        descId: 'Solusi AI, data, automation, IoT, dan teknologi emerging untuk meningkatkan kapabilitas bisnis.',
    },
    'creative-brand-experience': {
        icon: Palette,
        gradient: 'from-pink-500/10 to-rose-500/5',
        accentText: 'text-pink-500',
        accentBg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
        glowColor: 'bg-pink-500/10',
        descEn: 'Branding, creative production, and digital experience to build identity and engagement.',
        descId: 'Solusi branding, creative production, dan digital experience untuk membangun identitas dan engagement.',
    },
    'growth-marketing': {
        icon: TrendingUp,
        gradient: 'from-emerald-500/10 to-teal-500/5',
        accentText: 'text-emerald-500',
        accentBg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        glowColor: 'bg-emerald-500/10',
        descEn: 'Digital marketing strategy to increase awareness, acquisition, engagement, and conversion.',
        descId: 'Strategi digital marketing untuk meningkatkan awareness, acquisition, engagement, dan conversion.',
    },
    'cloud-cyber-security': {
        icon: Cloud,
        gradient: 'from-cyan-500/10 to-sky-500/5',
        accentText: 'text-cyan-500',
        accentBg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        glowColor: 'bg-cyan-500/10',
        descEn: 'Cloud infrastructure, DevOps, security, QA, and managed services for scalable, secure systems.',
        descId: 'Cloud infrastructure, DevOps, security, QA, dan managed services untuk sistem yang scalable dan secure.',
    },
    'consulting': {
        icon: Lightbulb,
        gradient: 'from-amber-500/10 to-orange-500/5',
        accentText: 'text-amber-500',
        accentBg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        glowColor: 'bg-amber-500/10',
        descEn: 'Technology, business, and digital transformation consulting to help organizations define strategy and roadmap.',
        descId: 'Konsultasi teknologi, bisnis, dan transformasi digital untuk membantu organisasi menentukan strategi dan roadmap.',
    },
    'it-talent-workforce': {
        icon: Users,
        gradient: 'from-indigo-500/10 to-blue-500/5',
        accentText: 'text-indigo-500',
        accentBg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        glowColor: 'bg-indigo-500/10',
        descEn: 'Provision and management of IT talent through headhunting and outsourcing.',
        descId: 'Penyediaan dan pengelolaan talenta IT melalui headhunting dan outsourcing.',
    },
};

const DEFAULT_CONFIG = {
    icon: Building2, ShieldCheck, Target, Clock, MessageSquare,
    gradient: 'from-brand-blue/10 to-indigo-500/5',
    accentText: 'text-brand-blue',
    accentBg: 'bg-brand-blue/10',
    border: 'border-brand-blue/20',
    glowColor: 'bg-brand-blue/10',
    descEn: 'Digital solutions for your business.',
    descId: 'Solusi digital untuk bisnis Anda.',
};

// Ordered category slugs per PDF
const CATEGORY_ORDER = [
    'technology',
    'ai-emerging-technology',
    'creative-brand-experience',
    'growth-marketing',
    'cloud-cyber-security',
    'consulting',
    'it-talent-workforce',
];


const BENEFITS = [
    {
        icon: Target,
        titleEn: 'Tailored Strategies',
        titleId: 'Strategi Tepat Sasaran',
        descEn: 'We don’t believe in one-size-fits-all. Every solution is custom-engineered to meet your specific business goals.',
        descId: 'Kami merancang solusi yang dikustomisasi secara presisi untuk memenuhi target bisnis spesifik Anda.',
    },
    {
        icon: ShieldCheck,
        titleEn: 'Enterprise-Grade Security',
        titleId: 'Keamanan Tingkat Enterprise',
        descEn: 'Built with scalable and secure architectures to ensure your digital assets are protected at all times.',
        descId: 'Dibangun dengan arsitektur yang aman dan scalable untuk memastikan aset digital Anda selalu terlindungi.',
    },
    {
        icon: Users,
        titleEn: 'Expert Multidisciplinary Team',
        titleId: 'Tim Ahli Multidisiplin',
        descEn: 'From senior engineers to creative strategists, our team brings diverse expertise to cover every angle.',
        descId: 'Mulai dari engineer senior hingga strategis kreatif, tim kami membawa keahlian beragam dari berbagai sisi.',
    },
    {
        icon: Clock,
        titleEn: 'Agile & Fast Delivery',
        titleId: 'Eksekusi Agile & Cepat',
        descEn: 'We utilize agile methodologies to ensure rapid deployment without compromising on quality or performance.',
        descId: 'Kami menggunakan metodologi agile untuk memastikan peluncuran yang cepat tanpa mengorbankan kualitas.',
    }
];

export default async function SolutionsPage() {
    const locale = await getLocaleServer();

    let allServices: Service[] = [];
    let faqs: Faq[] = [];
    try {
        const [servicesRes, faqsRes] = await Promise.all([
            api.getSolutions(),
            api.getFaqs()
        ]);
        allServices = servicesRes || [];
        faqs = faqsRes || [];
    } catch {
        // fallback: empty
    }

    // Group services by category slug, then order by CATEGORY_ORDER
    const categoriesMap = new Map<string, { name: string; slug: string; services: Service[] }>();
    for (const svc of allServices) {
        const catSlug = svc.category?.slug ?? 'other';
        const catName = svc.category?.name ?? 'Other';
        if (!categoriesMap.has(catSlug)) {
            categoriesMap.set(catSlug, { name: catName, slug: catSlug, services: [] });
        }
        categoriesMap.get(catSlug)!.services.push(svc);
    }

    // Sort categories by PDF order
    const categories = CATEGORY_ORDER
        .map(slug => categoriesMap.get(slug))
        .filter(Boolean) as { name: string; slug: string; services: Service[] }[];

    const stats = [
        { icon: Users,    val: '100+', labelEn: 'Clients', labelId: 'Klien' },
        { icon: Zap,      val: `${categories.length || 7}`,  labelEn: 'Categories', labelId: 'Kategori' },
        { icon: Star,     val: '56+',  labelEn: 'Services', labelId: 'Layanan' },
        { icon: Calendar, val: '3+',   labelEn: 'Years', labelId: 'Tahun' },
    ];

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-32 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="max-w-2xl space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">
                                {locale === 'en' ? 'Comprehensive Ecosystem' : 'Ekosistem Komprehensif'}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                            {locale === 'en' ? (
                                <>Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Solutions</span></>
                            ) : (
                                <>Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Enterprise</span></>
                            )}
                        </h1>
                        
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {locale === 'en'
                                ? 'From technology development to digital marketing, branding, cloud, AI, and consulting — we cover your full digital growth journey.'
                                : 'Dari pengembangan teknologi hingga digital marketing, branding, cloud, AI, dan konsultasi — kami siap mendampingi setiap langkah pertumbuhan bisnis Anda.'}
                        </p>

                        {/* Stats bar */}
                        <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                            {stats.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-2xl font-black text-white leading-none">{s.val}</div>
                                            <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">
                                                {locale === 'en' ? s.labelEn : s.labelId}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Right Illustration - Morphing Water Blob */}
                    <div className="hidden lg:block relative w-full max-w-lg aspect-square">
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes morphBlob {
                                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                            }
                            .animate-morph-blob {
                                animation: morphBlob 12s ease-in-out infinite;
                            }
                            .animate-morph-blob-fast {
                                animation: morphBlob 8s ease-in-out infinite reverse;
                            }
                        `}} />
                        
                        {/* Glowing backdrop matching the blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-violet-500 blur-2xl opacity-40 animate-morph-blob-fast scale-105 pointer-events-none" />
                        
                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/saas_hero.jpg" 
                                alt="Digital Solutions Ecosystem"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            />

                        </div>

                        {/* Floating Elements acting as satellites */}
                        <div className="absolute top-10 -left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-12 -right-4 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <Cloud className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-4 right-16 w-12 h-12 bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/40 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>


            {/* 2. MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 space-y-16">
                
                {/* 2A. CATEGORY CARDS GRID */}
                <div className="bg-white dark:bg-glass-bg border border-glass-border shadow-xl rounded-3xl p-6 md:p-10 space-y-8">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                {locale === 'en' ? 'Browse by Category' : 'Telusuri per Kategori'}
                            </span>
                            <div className="flex-1 h-px bg-glass-border rounded-full" />
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {categories.map((cat, i) => {
                            const cfg = CATEGORY_CONFIG[cat.slug] || DEFAULT_CONFIG;
                            const CatIcon = cfg.icon;
                            return (
                                <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100} className="h-full">
                                    <Link href={`/solutions/${cat.slug}`} className="block h-full group">
                                        <SpotlightCard className={`relative h-full p-7 flex flex-col gap-5 border ${cfg.border} bg-gradient-to-br ${cfg.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                            <div className={`absolute -top-6 -right-6 w-24 h-24 ${cfg.glowColor} rounded-full blur-2xl pointer-events-none`} />
                                            <div className="flex items-start justify-between gap-3">
                                                <div className={`w-12 h-12 rounded-2xl ${cfg.accentBg} flex items-center justify-center shrink-0`}>
                                                    <CatIcon className={`w-6 h-6 ${cfg.accentText}`} strokeWidth={1.5} />
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${cfg.accentText} px-2.5 py-1.5 rounded-xl ${cfg.accentBg}`}>
                                                    {cat.services.length} {locale === 'en' ? 'services' : 'layanan'}
                                                </span>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h2 className={`text-lg font-extrabold text-text-main group-hover:${cfg.accentText} transition-colors leading-snug`}>
                                                    {cat.name}
                                                </h2>
                                                <p className="text-sm text-text-gray leading-relaxed font-medium">
                                                    {locale === 'en' ? cfg.descEn : cfg.descId}
                                                </p>
                                            </div>
                                            {cat.services.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {cat.services.slice(0, 3).map(svc => (
                                                        <span key={svc.slug} className={`text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-black/5 dark:border-white/10 text-text-muted`}>
                                                            {svc.name}
                                                        </span>
                                                    ))}
                                                    {cat.services.length > 3 && (
                                                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-black/5 dark:border-white/10 text-text-muted">
                                                            +{cat.services.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className={`flex items-center gap-1.5 text-xs font-bold ${cfg.accentText}`}>
                                                {locale === 'en' ? 'Explore services' : 'Lihat layanan'}
                                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* 2B. WHY CHOOSE US */}
                <div className="py-8">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                            <span className="text-sm font-black text-brand-blue uppercase tracking-widest px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                                {locale === 'en' ? 'The Diggity Advantage' : 'Keunggulan Diggity'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Why Partner With Us?' : 'Mengapa Memilih Kami?'}
                            </h2>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'We combine technical excellence with strategic thinking to deliver solutions that drive real business growth.'
                                    : 'Kami memadukan keunggulan teknis dengan pemikiran strategis untuk memberikan solusi yang mendorong pertumbuhan bisnis nyata.'}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        {BENEFITS.map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="h-full">
                                    <div className="group p-6 md:p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 h-full flex flex-col">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue transition-all duration-300">
                                            <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-extrabold text-text-main mb-2">
                                            {locale === 'en' ? benefit.titleEn : benefit.titleId}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed flex-1">
                                            {locale === 'en' ? benefit.descEn : benefit.descId}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* 2C. CLOSING CTA */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className="relative overflow-hidden p-10 md:p-14 text-center border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-4 max-w-lg mx-auto">
                            <h3 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? "Can't find what you need?" : 'Tidak menemukan yang Anda cari?'}
                            </h3>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'Tell us your challenge and our team will design a custom solution for you.'
                                    : 'Ceritakan tantangan Anda dan tim kami akan merancang solusi kustom yang tepat.'}
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Consult for Free' : 'Konsultasi Gratis'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

                {/* 2D. GLOBAL FAQS */}
                {faqs && faqs.length > 0 && (
                    <div className="pt-8 pb-4">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                                <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-7 h-7 text-brand-blue" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                    {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    {locale === 'en' 
                                        ? 'Find answers to common questions about our solutions and engagement models.' 
                                        : 'Temukan jawaban untuk pertanyaan umum seputar layanan dan model kerja kami.'}
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <ScrollReveal animation="fade-up" delay={150}>
                            <div className="max-w-3xl mx-auto text-left bg-white dark:bg-glass-bg border border-glass-border p-4 md:p-8 rounded-3xl shadow-xl">
                                <FaqAccordion faqs={faqs} />
                            </div>
                        </ScrollReveal>
                    </div>
                )}
            </div>
        </div>
    );
}
