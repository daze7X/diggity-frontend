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
    Building2,
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
            {/* Background */}
            <div className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b ${cfg.heroGradient} pointer-events-none -z-10`} />

            <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-16">

                {/* Breadcrumb */}
                <ScrollReveal animation="fade-up">
                    <nav className="flex items-center gap-2 text-xs text-text-muted font-medium">
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
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${cfg.accentBg} border ${cfg.border}`}>
                            <CatIcon className={`w-5 h-5 ${cfg.accentText}`} strokeWidth={1.5} />
                            <span className={`text-sm font-black ${cfg.accentText} uppercase tracking-wider`}>
                                {categoryName}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-text-main leading-[0.95]">
                            {locale === 'en' ? cfg.descEn.split('.')[0] : cfg.descId.split('.')[0]}
                        </h1>
                        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed">
                            {locale === 'en' ? cfg.descEn : cfg.descId}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Get a Free Consultation' : 'Konsultasi Gratis'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/solutions"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-text-main bg-glass-bg border border-glass-border hover:border-brand-blue/30 rounded-xl transition-all"
                            >
                                {locale === 'en' ? 'All Solutions' : 'Semua Solusi'}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ═══ SERVICES GRID ═══ */}
                <div className="space-y-5">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                {locale === 'en' ? `${services.length} Services Available` : `${services.length} Layanan Tersedia`}
                            </span>
                            <div className="flex-1 h-px bg-glass-border rounded-full" />
                        </div>
                    </ScrollReveal>

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((svc, i) => {
                                const href = getServiceHref(svc);
                                return (
                                    <ScrollReveal key={svc.slug} animation="fade-up" delay={i * 50}>
                                        <Link href={href} className="block h-full group">
                                            <SpotlightCard className={`h-full p-7 flex flex-col gap-5 border ${cfg.border} bg-gradient-to-br ${cfg.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                                {/* Icon */}
                                                <div className={`w-11 h-11 rounded-xl ${cfg.accentBg} flex items-center justify-center shrink-0`}>
                                                    <CatIcon className={`w-5 h-5 ${cfg.accentText}`} strokeWidth={1.5} />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 space-y-2">
                                                    <h2 className={`text-base font-extrabold text-text-main group-hover:${cfg.accentText} transition-colors leading-snug`}>
                                                        {svc.name}
                                                    </h2>
                                                    <p className="text-xs text-text-gray leading-relaxed font-medium line-clamp-2">
                                                        {svc.description}
                                                    </p>
                                                </div>

                                                {/* Sub-services preview */}
                                                {svc.sub_services && svc.sub_services.length > 0 && (
                                                    <ul className="space-y-1.5">
                                                        {svc.sub_services.slice(0, 4).map((sub, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <Check className={`w-3 h-3 ${cfg.accentText} shrink-0 mt-0.5`} />
                                                                <span className="text-xs text-text-gray font-medium leading-relaxed">{sub}</span>
                                                            </li>
                                                        ))}
                                                        {svc.sub_services.length > 4 && (
                                                            <li className={`text-xs font-bold ${cfg.accentText}`}>
                                                                +{svc.sub_services.length - 4} more
                                                            </li>
                                                        )}
                                                    </ul>
                                                )}

                                                {/* CTA */}
                                                <div className={`flex items-center gap-1 text-xs font-bold ${cfg.accentText} pt-1 border-t border-white/5`}>
                                                    {locale === 'en' ? 'Learn more' : 'Selengkapnya'}
                                                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </SpotlightCard>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    ) : (
                        <ScrollReveal animation="fade-up">
                            <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-3xl">
                                <CatIcon className={`w-14 h-14 mx-auto ${cfg.accentText} opacity-30 mb-4`} strokeWidth={1} />
                                <p className="text-text-muted font-medium">
                                    {locale === 'en' ? 'Services coming soon.' : 'Layanan segera hadir.'}
                                </p>
                            </div>
                        </ScrollReveal>
                    )}
                </div>

                {/* ═══ CTA ═══ */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className={`relative overflow-hidden p-10 md:p-12 border ${cfg.border} bg-gradient-to-r ${cfg.gradient}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black text-text-main tracking-tight">
                                    {locale === 'en'
                                        ? `Ready to grow with ${categoryName}?`
                                        : `Siap berkembang dengan ${categoryName}?`}
                                </h3>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    {locale === 'en'
                                        ? 'Our team is ready to design the right solution for your business challenges.'
                                        : 'Tim kami siap merancang solusi yang tepat untuk tantangan bisnis Anda.'}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 md:justify-end">
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                                >
                                    {locale === 'en' ? 'Start a Project' : 'Mulai Proyek'}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/solutions"
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-text-main bg-glass-bg border border-glass-border hover:border-brand-blue/30 rounded-xl transition-all"
                                >
                                    {locale === 'en' ? 'Other Solutions' : 'Solusi Lainnya'}
                                </Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

            </div>
        </div>
    );
}
