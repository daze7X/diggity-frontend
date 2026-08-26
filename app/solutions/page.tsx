import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import { api } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import {
    Code,
    TrendingUp,
    Cloud,
    GraduationCap,
    ArrowRight,
    Check,
    Sparkles,
    Users,
    Star,
    Calendar,
    Zap,
    Shield,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Business Solutions & Enterprise Services - Diggity',
    description:
        'Find various technology solutions from Diggity, ranging from Website Development, Custom ERP, Cloud Infrastructure, to Digital Skill Lab for your company.',
};

export const revalidate = 60;

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const techStack = [
    'Next.js', 'React', 'TypeScript', 'TailwindCSS',
    'Laravel', 'Node.js', 'PostgreSQL', 'Docker',
    'AWS', 'Figma', 'Python', 'Redis',
];

const stats = [
    { icon: Users,    valueEn: '100+', labelEn: 'Happy Clients',   labelId: 'Klien Puas'       },
    { icon: Zap,      valueEn: '4',    labelEn: 'Core Solutions',  labelId: 'Solusi Utama'     },
    { icon: Star,     valueEn: '5.0',  labelEn: 'Client Rating',   labelId: 'Rating Klien'     },
    { icon: Calendar, valueEn: '3+',   labelEn: 'Years Experience',labelId: 'Tahun Berpengalaman'},
];

const solutions = [
    {
        href:        '/solutions/technology-solutions',
        badge:       'APP BUILDER SQUAD',
        Icon:        Code,
        BgIcon:      Code,
        titleEn:     'Software Engineering',
        titleId:     'Rekayasa Perangkat Lunak',
        descEn:      'Build high-specification digital products with clean, fast, scalable, and secure source code architecture (Web, Mobile & Enterprise ERP).',
        descId:      'Membangun produk digital berspesifikasi tinggi dengan arsitektur kode sumber bersih, cepat, terukur, dan aman (Web, Mobile & Enterprise ERP).',
        features:    ['Website & Mobile Apps (Native)', 'Custom Software & ERP Systems'],
        gradient:    'from-blue-500/20 to-indigo-500/10',
        iconBg:      'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        accentBorder:'hover:border-blue-500/50',
        isHero:      true,
    },
    {
        href:        '/solutions/growth-marketing',
        badge:       'BRAND GROWTH DIVISION',
        Icon:        TrendingUp,
        BgIcon:      TrendingUp,
        titleEn:     'Optimization & Marketing',
        titleId:     'Optimasi & Pemasaran',
        descEn:      'Accelerate brand reach strategically to dominate organic search rankings and multiply sales conversions.',
        descId:      'Mengakselerasi jangkauan brand secara terarah untuk mendominasi peringkat pencarian organik dan melipatgandakan konversi penjualan.',
        features:    ['Search Engine Optimization (SEO)', 'Google Ads & Social Media Campaigns'],
        gradient:    'from-emerald-500/20 to-teal-500/10',
        iconBg:      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        accentBorder:'hover:border-emerald-500/50',
        isHero:      false,
    },
    {
        href:        '/solutions/cloud-cyber-security',
        badge:       'CLOUD SERVICE HUB',
        Icon:        Cloud,
        BgIcon:      Shield,
        titleEn:     'Infrastructure & Cloud',
        titleId:     'Infrastruktur & Cloud',
        descEn:      'Provision of robust cloud server architecture, continuous DevOps orchestration, and enterprise-grade layered security audits.',
        descId:      'Penyediaan arsitektur cloud server tangguh, orkestrasi DevOps berkelanjutan, dan audit keamanan berlapis tingkat enterprise.',
        features:    ['Premium Cloud Hosting & VPS', 'Cyber Security & Penetration Testing'],
        gradient:    'from-violet-500/20 to-purple-500/10',
        iconBg:      'bg-violet-500/10 text-violet-600 dark:text-violet-400',
        accentBorder:'hover:border-violet-500/50',
        isHero:      false,
    },
    {
        href:        '/solutions/digital-skill-lab',
        badge:       'DIGITAL SKILL LAB',
        Icon:        GraduationCap,
        BgIcon:      GraduationCap,
        titleEn:     'Digital Training & Education',
        titleId:     'Pelatihan & Edukasi Digital',
        descEn:      "Improve the technical competence of your company's internal team to be ready to compete in the midst of rapid digital transformation.",
        descId:      'Meningkatkan kompetensi teknis tim internal perusahaan Anda agar siap bersaing di tengah pesatnya perkembangan transformasi digital.',
        features:    ['Corporate IT Training & Bootcamps', 'Digital Marketing & UI/UX Masterclass'],
        gradient:    'from-amber-500/20 to-orange-500/10',
        iconBg:      'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        accentBorder:'hover:border-amber-500/50',
        isHero:      false,
    },
];

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
export default async function SolutionsPage() {
    const locale = await getLocaleServer();

    let settings = null;
    try {
        settings = await api.getCompanySettings().catch(() => null);
    } catch {
        /* silently fail */
    }

    const heroSolution   = solutions.find((s) => s.isHero)!;
    const gridSolutions  = solutions.filter((s) => !s.isHero);

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* ── Background depth elements ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-blue/4 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none -z-10" />

            <section className="container max-w-7xl mx-auto px-6 md:px-8 space-y-20">

                {/* ════════════════════════════════
                    HERO SECTION
                ════════════════════════════════ */}
                <div className="text-center space-y-8 max-w-4xl mx-auto flex flex-col items-center">

                    {/* Main heading */}
                    <ScrollReveal animation="fade-up" delay={0}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-text-main leading-[0.9] pt-2">
                            {locale === 'en' ? 'Our ' : 'Solusi '}
                            <span className="relative inline-block">
                                <span className="text-brand-blue">
                                    {locale === 'en' ? 'Solutions' : 'Kami'}
                                </span>
                                {/* underline accent */}
                                <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-gradient-to-r from-brand-blue via-indigo-500 to-transparent opacity-60" />
                            </span>
                        </h1>
                    </ScrollReveal>

                    {/* Subtitle */}
                    <ScrollReveal animation="fade-up" delay={100}>
                        <p className="text-text-gray max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            {locale === 'en'
                                ? 'Helping companies build, develop, and transform business through technology, creativity, marketing, and consulting.'
                                : 'Membantu perusahaan membangun, mengembangkan, dan mentransformasi bisnis melalui teknologi, kreativitas, marketing, dan consulting.'}
                        </p>
                    </ScrollReveal>

                    {/* Stats row */}
                    <ScrollReveal animation="fade-up" delay={180}>
                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            {stats.map(({ icon: Icon, valueEn, labelEn, labelId }) => (
                                <div
                                    key={labelEn}
                                    className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-sm shadow-sm min-w-[110px]"
                                >
                                    <Icon className="w-5 h-5 text-brand-blue mb-1" />
                                    <span className="text-2xl font-black text-text-main">{valueEn}</span>
                                    <span className="text-[11px] font-semibold text-text-gray text-center leading-tight">
                                        {locale === 'en' ? labelEn : labelId}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* ════════════════════════════════
                    BENTO GRID
                ════════════════════════════════ */}
                <div className="space-y-6 max-w-6xl mx-auto">

                    {/* Hero card — full width */}
                    <ScrollReveal animation="fade-up" delay={100}>
                        <Link
                            href={heroSolution.href}
                            className="group block cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                        >
                            <SpotlightCard
                                className={`p-10 md:p-14 border border-glass-border h-full ${heroSolution.accentBorder} shadow-xl shadow-brand-blue/5 transition-all duration-300`}
                            >
                                {/* Large decorative background icon */}
                                <div className="absolute top-6 right-8 opacity-[0.04] pointer-events-none select-none">
                                    <heroSolution.BgIcon className="w-64 h-64 text-brand-blue" strokeWidth={0.8} />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                                    {/* Left: icon + badge + number */}
                                    <div className="flex flex-col items-start gap-4 md:min-w-[200px]">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${heroSolution.iconBg} ring-1 ring-inset ring-white/10`}>
                                            <heroSolution.Icon className="w-8 h-8" strokeWidth={1.5} />
                                        </div>
                                        <div className="inline-flex items-center gap-2 bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                                            <heroSolution.Icon className="w-3.5 h-3.5 text-brand-blue" />
                                            <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">
                                                {heroSolution.badge}
                                            </span>
                                        </div>
                                        <span className="text-[80px] font-black text-text-main/5 leading-none select-none -mt-2">
                                            01
                                        </span>
                                    </div>

                                    {/* Right: content */}
                                    <div className="flex-1 space-y-5">
                                        <h3 className="text-4xl md:text-5xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                            {locale === 'en' ? heroSolution.titleEn : heroSolution.titleId}
                                        </h3>
                                        <p className="text-text-gray leading-relaxed font-medium text-base md:text-lg max-w-xl">
                                            {locale === 'en' ? heroSolution.descEn : heroSolution.descId}
                                        </p>
                                        <ul className="flex flex-wrap gap-3 pt-1">
                                            {heroSolution.features.map((f) => (
                                                <li
                                                    key={f}
                                                    className="flex items-center gap-2 text-sm text-text-gray font-medium bg-glass-bg border border-glass-border px-3 py-1.5 rounded-full"
                                                >
                                                    <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-2 flex items-center gap-2 text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform w-fit">
                                            {locale === 'en' ? 'Learn More' : 'Pelajari Selengkapnya'}
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>

                    {/* Three smaller cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {gridSolutions.map((sol, i) => (
                            <ScrollReveal key={sol.href} animation="fade-up" delay={(i + 1) * 100}>
                                <Link
                                    href={sol.href}
                                    className="group block cursor-pointer transition-all duration-300 hover:scale-[1.02] h-full"
                                >
                                    <SpotlightCard
                                        className={`p-8 flex flex-col justify-between h-full border border-glass-border ${sol.accentBorder} shadow-xl shadow-brand-blue/5 transition-all duration-300 min-h-[340px]`}
                                    >
                                        {/* Decorative background icon */}
                                        <div className="absolute bottom-4 right-4 opacity-[0.04] pointer-events-none select-none">
                                            <sol.BgIcon className="w-32 h-32" strokeWidth={0.8} />
                                        </div>

                                        <div className="space-y-5 z-10">
                                            {/* Number + Icon row */}
                                            <div className="flex items-start justify-between">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sol.iconBg} ring-1 ring-inset ring-white/10`}>
                                                    <sol.Icon className="w-6 h-6" strokeWidth={1.5} />
                                                </div>
                                                <span className="text-5xl font-black text-text-main/5 leading-none select-none">
                                                    {String(i + 2).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {/* Badge */}
                                            <div className="inline-flex items-center gap-1.5 bg-brand-blue/8 px-2.5 py-1 rounded-full border border-brand-blue/15">
                                                <sol.Icon className="w-3 h-3 text-brand-blue" />
                                                <span className="text-[9px] font-extrabold text-brand-blue uppercase tracking-wider">
                                                    {sol.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                {locale === 'en' ? sol.titleEn : sol.titleId}
                                            </h3>
                                            <p className="text-sm text-text-gray leading-relaxed font-medium">
                                                {locale === 'en' ? sol.descEn : sol.descId}
                                            </p>

                                            <ul className="text-sm text-text-gray space-y-2 font-medium">
                                                {sol.features.map((f) => (
                                                    <li key={f} className="flex items-center gap-2">
                                                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-6 mt-auto flex items-center gap-1.5 text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                            {locale === 'en' ? 'Learn More' : 'Pelajari Selengkapnya'}
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </SpotlightCard>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* ════════════════════════════════
                    TECH STACK MARQUEE
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-in" delay={0}>
                    <div className="space-y-6 max-w-6xl mx-auto">
                        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                            {locale === 'en' ? 'Powered by Modern Technology' : 'Ditenagai Teknologi Modern'}
                        </p>
                        {/* Marquee wrapper with fade edges */}
                        <div className="relative overflow-hidden">
                            {/* Left fade */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
                            {/* Right fade */}
                            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />

                            <div className="animate-marquee-slow">
                                {/* Duplicate for seamless loop */}
                                {[...techStack, ...techStack].map((tech, i) => (
                                    <span
                                        key={`${tech}-${i}`}
                                        className="inline-flex items-center gap-2 mx-3 px-5 py-2.5 rounded-full border border-glass-border bg-glass-bg text-text-gray font-semibold text-sm whitespace-nowrap shadow-sm"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60 flex-shrink-0" />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ════════════════════════════════
                    CTA SECTION
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up" delay={0}>
                    <div className="max-w-5xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl border border-brand-blue/20 shadow-2xl shadow-brand-blue/10">
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-indigo-600 to-blue-800 -z-10" />
                            {/* Decorative circles */}
                            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
                            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-white/3 rounded-full blur-3xl pointer-events-none" />
                            {/* Topographic overlay */}
                            <div className="topographic-bg !opacity-10" />

                            {/* Content */}
                            <div className="relative z-10 p-12 md:p-16 text-center space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3" />
                                    {locale === 'en' ? 'Free Consultation' : 'Konsultasi Gratis'}
                                </div>

                                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                    {locale === 'en'
                                        ? 'Ready to Realize Your\nDigital Plan?'
                                        : 'Siap Mewujudkan\nRencana Digital Anda?'}
                                </h3>

                                <p className="text-white/75 text-base md:text-lg leading-relaxed font-medium max-w-xl mx-auto">
                                    {locale === 'en'
                                        ? 'Contact a Diggity consultant today to analyze your technical needs, system architecture, and design a free business optimization strategy.'
                                        : 'Hubungi konsultan Diggity hari ini untuk menganalisis kebutuhan teknis, arsitektur sistem, dan perancangan strategi optimasi bisnis Anda secara gratis.'}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-brand-blue bg-white hover:bg-white/90 rounded-xl transition-all shadow-lg shadow-black/20 group"
                                    >
                                        {locale === 'en' ? 'Start Free Consultation' : 'Mulai Konsultasi Gratis'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/portfolio"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all group"
                                    >
                                        {locale === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </section>
        </div>
    );
}
