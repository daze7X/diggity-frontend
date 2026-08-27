import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SpotlightCard from '../../../components/SpotlightCard';
import ScrollReveal from '../../../components/ScrollReveal';
import { api, Service } from '../../../lib/api';
import { getLocaleServer } from '../../../lib/locale-server';
import {
    Code2, Bot, Palette, TrendingUp, Cloud, Lightbulb,
    Users, ArrowRight, ChevronRight, ArrowLeft, Check,
} from 'lucide-react';

export const revalidate = 60;

/* ─────────────────────────────────────────────
   Category meta config (same as index page)
───────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<string, {
    icon: React.ElementType;
    gradient: string;
    accentText: string;
    accentBg: string;
    border: string;
    heroGradient: string;
    descEn: string;
    descId: string;
}> = {
    'technology': {
        icon: Code2,
        gradient: 'from-blue-500/10 to-indigo-500/5',
        accentText: 'text-blue-500',
        accentBg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        heroGradient: 'from-blue-500/10 via-transparent to-transparent',
        descEn: 'End-to-end technology solutions to build, develop, and integrate digital systems.',
        descId: 'Solusi teknologi end-to-end untuk membangun, mengembangkan, dan mengintegrasikan sistem digital.',
    },
    'ai-emerging-technology': {
        icon: Bot,
        gradient: 'from-violet-500/10 to-purple-500/5',
        accentText: 'text-violet-500',
        accentBg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
        heroGradient: 'from-violet-500/10 via-transparent to-transparent',
        descEn: 'AI, data, automation, IoT, and emerging technology to enhance business capabilities.',
        descId: 'Solusi AI, data, automation, IoT, dan teknologi emerging untuk meningkatkan kapabilitas bisnis.',
    },
    'creative-brand-experience': {
        icon: Palette,
        gradient: 'from-pink-500/10 to-rose-500/5',
        accentText: 'text-pink-500',
        accentBg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
        heroGradient: 'from-pink-500/10 via-transparent to-transparent',
        descEn: 'Branding, creative production, and digital experience to build identity and engagement.',
        descId: 'Solusi branding, creative production, dan digital experience untuk membangun identitas dan engagement.',
    },
    'growth-marketing': {
        icon: TrendingUp,
        gradient: 'from-emerald-500/10 to-teal-500/5',
        accentText: 'text-emerald-500',
        accentBg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        heroGradient: 'from-emerald-500/10 via-transparent to-transparent',
        descEn: 'Digital marketing strategy to increase awareness, acquisition, engagement, and conversion.',
        descId: 'Strategi digital marketing untuk meningkatkan awareness, acquisition, engagement, dan conversion.',
    },
    'cloud-cyber-security': {
        icon: Cloud,
        gradient: 'from-cyan-500/10 to-sky-500/5',
        accentText: 'text-cyan-500',
        accentBg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        heroGradient: 'from-cyan-500/10 via-transparent to-transparent',
        descEn: 'Cloud infrastructure, DevOps, security, QA, and managed services for scalable, secure systems.',
        descId: 'Cloud infrastructure, DevOps, security, QA, dan managed services untuk sistem yang scalable dan secure.',
    },
    'consulting': {
        icon: Lightbulb,
        gradient: 'from-amber-500/10 to-orange-500/5',
        accentText: 'text-amber-500',
        accentBg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        heroGradient: 'from-amber-500/10 via-transparent to-transparent',
        descEn: 'Technology, business, and digital transformation consulting to help organizations define strategy.',
        descId: 'Konsultasi teknologi, bisnis, dan transformasi digital untuk membantu organisasi menentukan strategi.',
    },
    'it-talent-workforce': {
        icon: Users,
        gradient: 'from-indigo-500/10 to-blue-500/5',
        accentText: 'text-indigo-500',
        accentBg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        heroGradient: 'from-indigo-500/10 via-transparent to-transparent',
        descEn: 'Provision and management of IT talent through headhunting and outsourcing.',
        descId: 'Penyediaan dan pengelolaan talenta IT melalui headhunting dan outsourcing.',
    },
};

const VALID_CATEGORIES = Object.keys(CATEGORY_CONFIG);

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const cfg = CATEGORY_CONFIG[category];
    if (!cfg) return { title: 'Solutions - Diggity' };

    const services = await api.getSolutionsByCategory(category).catch(() => [] as Service[]);
    const catName = services[0]?.category?.name ?? category.replace(/-/g, ' ');

    return {
        title: `${catName} — Solutions - Diggity`,
        description: cfg.descEn,
    };
}

export default async function SolutionCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const locale = await getLocaleServer();

    if (!VALID_CATEGORIES.includes(category)) {
        notFound();
    }

    let services: Service[] = [];
    try {
        services = await api.getSolutionsByCategory(category);
    } catch {
        // fallback empty
    }

    const cfg = CATEGORY_CONFIG[category];
    const CatIcon = cfg.icon;
    const categoryName = services[0]?.category?.name ?? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Special routing for IT Talent services → /job-connect
    const getServiceHref = (svc: Service) => {
        if (category === 'it-talent-workforce') {
            if (svc.slug === 'it-headhunting') return '/job-connect/headhunting';
            if (svc.slug === 'it-outsourcing') return '/job-connect/outsourcing';
        }
        return `/solutions/${category}/${svc.slug}`;
    };

    return (
        <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b ${cfg.heroGradient} pointer-events-none -z-10`} />
            <div className={`absolute top-1/4 right-0 w-[600px] h-[400px] ${cfg.accentBg} rounded-full blur-[140px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/2`} />
            <div className={`absolute bottom-1/4 left-0 w-[400px] h-[400px] ${cfg.accentBg} rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/2`} />

            <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-20">

                {/* Breadcrumb */}
                <ScrollReveal animation="fade-up">
                    <nav className="flex items-center gap-2 text-xs text-text-muted font-medium mb-4">
                        <Link href="/solutions" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" />
                            Solutions
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className={`font-bold ${cfg.accentText}`}>{categoryName}</span>
                    </nav>
                </ScrollReveal>

                {/* ═══ HERO ═══ */}
                <ScrollReveal animation="fade-up">
                    <div className="space-y-6 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <span className={`h-px w-8 ${cfg.accentBg} rounded-full`} />
                            <span className={`text-[11px] font-black ${cfg.accentText} uppercase tracking-[0.2em]`}>
                                {locale === 'en' ? 'Category Solutions' : 'Kategori Solusi'}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-[0.95]">
                            {categoryName.split(' ')[0]} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${cfg.gradient.replace('from-', 'from-').replace('/10', '').replace('/5', '')} to-brand-blue`}>
                                {categoryName.substring(categoryName.indexOf(' ') + 1)}
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl">
                            {locale === 'en' ? cfg.descEn : cfg.descId}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-6">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Get a Free Consultation' : 'Konsultasi Gratis'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/solutions"
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-text-main bg-glass-bg border border-glass-border hover:border-brand-blue/30 hover:bg-glass-bg/80 rounded-xl transition-all"
                            >
                                {locale === 'en' ? 'Explore All Solutions' : 'Eksplorasi Semua Solusi'}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ═══ SERVICES GRID ═══ */}
                <div className="space-y-8 pt-8 border-t border-glass-border/40">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                {locale === 'en' ? `${services.length} Services Available` : `${services.length} Layanan Tersedia`}
                            </span>
                            <div className="flex-1 h-px bg-glass-border rounded-full" />
                        </div>
                    </ScrollReveal>

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((svc, i) => {
                                const href = getServiceHref(svc);
                                return (
                                    <ScrollReveal key={svc.slug} animation="fade-up" delay={i * 50}>
                                        <Link href={href} className="block h-full group">
                                            <SpotlightCard className={`h-full p-8 flex flex-col gap-5 border border-glass-border bg-glass-bg transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/40 hover:-translate-y-1.5 relative overflow-hidden`}>
                                                
                                                {/* Hover background glow inside card */}
                                                <div className={`absolute -top-12 -right-12 w-32 h-32 ${cfg.accentBg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                                {/* Icon */}
                                                <div className={`w-12 h-12 rounded-xl ${cfg.accentBg} flex items-center justify-center shrink-0 border ${cfg.border} z-10`}>
                                                    <CatIcon className={`w-6 h-6 ${cfg.accentText}`} strokeWidth={1.5} />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 space-y-3 z-10">
                                                    <h2 className={`text-xl font-extrabold text-text-main group-hover:${cfg.accentText} transition-colors leading-snug`}>
                                                        {svc.name}
                                                    </h2>
                                                    <p className="text-sm text-text-gray leading-relaxed font-medium line-clamp-3">
                                                        {svc.description}
                                                    </p>
                                                </div>

                                                {/* Sub-services preview */}
                                                {svc.sub_services && svc.sub_services.length > 0 && (
                                                    <div className="z-10 pt-4 border-t border-glass-border/40">
                                                        <ul className="space-y-2">
                                                            {svc.sub_services.slice(0, 3).map((sub, idx) => (
                                                                <li key={idx} className="flex items-start gap-2">
                                                                    <Check className={`w-4 h-4 ${cfg.accentText} shrink-0 mt-0.5`} />
                                                                    <span className="text-xs text-text-gray font-medium leading-relaxed">{sub}</span>
                                                                </li>
                                                            ))}
                                                            {svc.sub_services.length > 3 && (
                                                                <li className={`text-xs font-bold ${cfg.accentText} pl-6 pt-1`}>
                                                                    + {svc.sub_services.length - 3} {locale === 'en' ? 'more services' : 'layanan lainnya'}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* CTA */}
                                                <div className={`flex items-center gap-1.5 text-xs font-bold ${cfg.accentText} pt-4 z-10`}>
                                                    {locale === 'en' ? 'Explore details' : 'Lihat detail selengkapnya'}
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                                </div>
                                            </SpotlightCard>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    ) : (
                        <ScrollReveal animation="fade-up">
                            <div className="text-center py-24 bg-glass-bg border border-glass-border rounded-3xl backdrop-blur-sm">
                                <CatIcon className={`w-16 h-16 mx-auto ${cfg.accentText} opacity-30 mb-4`} strokeWidth={1} />
                                <h3 className="text-xl font-bold text-text-main mb-2">
                                    {locale === 'en' ? 'No Services Yet' : 'Belum Ada Layanan'}
                                </h3>
                                <p className="text-sm text-text-muted font-medium">
                                    {locale === 'en' ? 'Services for this category are coming soon.' : 'Layanan untuk kategori ini akan segera hadir.'}
                                </p>
                            </div>
                        </ScrollReveal>
                    )}
                </div>

                {/* ═══ CTA ═══ */}
                <ScrollReveal animation="fade-up" className="pt-10">
                    <SpotlightCard className={`relative overflow-hidden p-10 md:p-14 border ${cfg.border} bg-glass-bg`}>
                        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${cfg.gradient} opacity-50 pointer-events-none -z-10`} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-text-main tracking-tight leading-tight">
                                    {locale === 'en'
                                        ? `Ready to scale with ${categoryName}?`
                                        : `Siap berkembang dengan ${categoryName}?`}
                                </h3>
                                <p className="text-base text-text-gray font-medium leading-relaxed max-w-md">
                                    {locale === 'en'
                                        ? 'Our team is ready to design and implement the perfect solution for your business challenges.'
                                        : 'Tim kami siap merancang dan mengimplementasikan solusi yang tepat untuk tantangan bisnis Anda.'}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 md:justify-end">
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-xl shadow-brand-blue/20 hover:-translate-y-1"
                                >
                                    {locale === 'en' ? 'Start a Project' : 'Mulai Proyek Sekarang'}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/solutions"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-text-main bg-white/5 border border-glass-border hover:border-brand-blue/30 hover:bg-white/10 rounded-xl transition-all hover:-translate-y-1"
                                >
                                    {locale === 'en' ? 'View All Solutions' : 'Lihat Solusi Lainnya'}
                                </Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

            </div>
        </div>
    );
}
