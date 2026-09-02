import React from 'react';
import { api, Team } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import {
    ShieldCheck,
    Award,
    Users,
    Compass,
    FileText,
    Code,
    TrendingUp,
    Server,
    GraduationCap,
    Building2,
    Briefcase,
    Star,
    Zap,
} from 'lucide-react';

import { generatePageMetadata } from '../../lib/seo';
import { getLocaleServer } from '../../lib/locale-server';

export const revalidate = 60;

export async function generateMetadata() {
    try {
        const res = await api.getStaticPageSeo('about');
        return generatePageMetadata(res?.seo, {
            title: 'Tentang Kami - Diggity',
            description: 'Pelajari visi, misi, dan nilai-nilai inti Diggity dalam mendorong kemajuan teknologi industri.',
            path: '/about'
        });
    } catch {
        return generatePageMetadata(null, { path: '/about' });
    }
}

export default async function About() {
    const locale = await getLocaleServer();
    let teams: Team[] = [];
    let settings: any = null;

    try {
        const [teamsRes, settingsRes] = await Promise.all([
            api.getTeams(),
            api.getCompanySettings()
        ]);
        teams = teamsRes;
        settings = settingsRes;
    } catch (error) {
        console.error('Error fetching data for about page:', error);
    }

    const defaultTimeline = locale === 'en' ? [
        { year: '2018', title: 'Founding Year', desc: 'Diggity was founded as a provider of simple website development services and blog content writing.' },
        { year: '2020', title: 'Division Restructuring', desc: 'Formed specialized App Builder Squad and Brand Growth Division for results-focused services.' },
        { year: '2022', title: 'Cloud Services Expansion', desc: 'Launched premium cloud hosting infrastructure, VPS servers, and business email integration for corporate clients.' },
        { year: '2024', title: 'Digital Lab Launch', desc: 'Pioneered Digital Skill Lab to facilitate bootcamps and digital training for corporate groups.' },
    ] : [
        { year: '2018', title: 'Awal Mula Pendirian', desc: 'Diggity didirikan sebagai penyedia jasa pembuatan website sederhana dan penulisan konten blog.' },
        { year: '2020', title: 'Restrukturisasi Divisi', desc: 'Membentuk divisi khusus App Builder Squad dan Brand Growth Division untuk layanan yang lebih berfokus pada hasil.' },
        { year: '2022', title: 'Ekspansi Cloud Services', desc: 'Meluncurkan infrastruktur cloud hosting premium, server VPS, dan integrasi email bisnis untuk klien korporat.' },
        { year: '2024', title: 'Peluncuran Digital Lab', desc: 'Merintis Digital Skill Lab untuk memfasilitasi bootcamp dan pelatihan digital bagi kalangan perusahaan.' },
    ];

    const values = locale === 'en' ? [
        {
            icon: Compass,
            title: 'Boundless Innovation',
            desc: 'We continuously explore leading edge technologies to deliver competitive advantages for our clients.',
            gradient: 'from-blue-500/20 to-indigo-500/10',
            iconColor: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-500/10',
        },
        {
            icon: ShieldCheck,
            title: 'Integrity & Transparency',
            desc: 'Building client trust through honesty, regular communication, and transparent analytical reports.',
            gradient: 'from-emerald-500/20 to-teal-500/10',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            iconBg: 'bg-emerald-500/10',
        },
        {
            icon: Award,
            title: 'Classy Quality',
            desc: 'No compromise in quality. From code hygiene to the aesthetics of UI/UX interfaces.',
            gradient: 'from-amber-500/20 to-orange-500/10',
            iconColor: 'text-amber-600 dark:text-amber-400',
            iconBg: 'bg-amber-500/10',
        },
        {
            icon: Users,
            title: 'High-Impact Collaboration',
            desc: 'We are not just a vendor, we are a strategic partner working closely to drive your business growth.',
            gradient: 'from-violet-500/20 to-purple-500/10',
            iconColor: 'text-violet-600 dark:text-violet-400',
            iconBg: 'bg-violet-500/10',
        },
    ] : [
        {
            icon: Compass,
            title: 'Inovasi Tanpa Batas',
            desc: 'Kami terus mengeksplorasi teknologi terdepan untuk menghadirkan keunggulan kompetitif bagi klien kami.',
            gradient: 'from-blue-500/20 to-indigo-500/10',
            iconColor: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-500/10',
        },
        {
            icon: ShieldCheck,
            title: 'Integritas & Transparansi',
            desc: 'Membangun kepercayaan klien melalui kejujuran, komunikasi berkala, dan penyajian laporan analitik yang transparan.',
            gradient: 'from-emerald-500/20 to-teal-500/10',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            iconBg: 'bg-emerald-500/10',
        },
        {
            icon: Award,
            title: 'Kualitas Berkelas',
            desc: 'Tidak ada kompromi dalam kualitas. Mulai dari kebersihan baris kode hingga estetika antarmuka UI/UX.',
            gradient: 'from-amber-500/20 to-orange-500/10',
            iconColor: 'text-amber-600 dark:text-amber-400',
            iconBg: 'bg-amber-500/10',
        },
        {
            icon: Users,
            title: 'Kolaborasi Dampak Tinggi',
            desc: 'Kami tidak sekadar vendor, kami adalah mitra strategis yang bekerja erat untuk mendorong pertumbuhan bisnis Anda.',
            gradient: 'from-violet-500/20 to-purple-500/10',
            iconColor: 'text-violet-600 dark:text-violet-400',
            iconBg: 'bg-violet-500/10',
        },
    ];

    const pillars = [
        {
            num: '01',
            label: 'BUILD',
            icon: Code,
            accentBorder: 'border-t-blue-500',
            accentText: 'text-blue-600 dark:text-blue-400',
            accentBg: 'bg-blue-500/10',
            desc: settings?.philosophy_build || (locale === 'en'
                ? 'Designing high-performance software products (web/mobile).'
                : 'Merancang produk software (web/mobile) berkinerja tinggi.'),
        },
        {
            num: '02',
            label: 'GROW',
            icon: TrendingUp,
            accentBorder: 'border-t-emerald-500',
            accentText: 'text-emerald-600 dark:text-emerald-400',
            accentBg: 'bg-emerald-500/10',
            desc: settings?.philosophy_grow || (locale === 'en'
                ? 'Driving market growth through SEO, advertising, and social media marketing.'
                : 'Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.'),
        },
        {
            num: '03',
            label: 'SCALE',
            icon: Server,
            accentBorder: 'border-t-amber-500',
            accentText: 'text-amber-600 dark:text-amber-400',
            accentBg: 'bg-amber-500/10',
            desc: settings?.philosophy_scale || (locale === 'en'
                ? 'Ensuring cloud hosting infrastructure reliability and stable system capacity.'
                : 'Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.'),
        },
        {
            num: '04',
            label: 'EMPOWER',
            icon: GraduationCap,
            accentBorder: 'border-t-violet-500',
            accentText: 'text-violet-600 dark:text-violet-400',
            accentBg: 'bg-violet-500/10',
            desc: settings?.philosophy_empower || (locale === 'en'
                ? 'Empowering your team through digital skills training and transfer.'
                : 'Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.'),
        },
    ];

    const defaultVision = locale === 'en'
        ? 'To be the leading digital transformation partner in Southeast Asia, empowering businesses to grow in a structured and sustainable manner through integrated technology, creativity, and education.'
        : 'Menjadi mitra transformasi digital terdepan di Asia Tenggara yang memberdayakan bisnis untuk bertumbuh secara terstruktur dan berkelanjutan melalui teknologi, kreativitas, dan edukasi terintegrasi.';

    const defaultMission = locale === 'en' ? [
        { text: 'Quality Software Engineering: Building high-performance, secure, and scalable digital products and infrastructure.' },
        { text: 'Targeted Business Growth: Helping business partners dominate the digital market systematically through performance- and data-driven marketing.' },
        { text: 'Sustainable Knowledge Transfer: Training partners\' internal talents to master relevant digital skills that align with industry needs.' }
    ] : [
        { text: 'Rekayasa Software Berkualitas: Membangun infrastruktur dan produk digital berkinerja tinggi, aman, dan mudah diskalakan.' },
        { text: 'Pertumbuhan Bisnis Terarah: Membantu mitra bisnis mendominasi pasar digital secara sistematis melalui pemasaran berbasis performa dan data.' },
        { text: 'Transfer Pengetahuan Berkelanjutan: Melatih talenta internal mitra bisnis untuk menguasai keterampilan digital yang relevan dengan kebutuhan industri.' }
    ];

    const vision = locale === 'en'
        ? (settings?.vision_en || defaultVision)
        : (settings?.vision_id || defaultVision);

    const missionPoints = locale === 'en'
        ? (settings?.mission_en || defaultMission)
        : (settings?.mission_id || defaultMission);

    const timelineData = settings && settings.history_timeline && settings.history_timeline.length > 0
        ? settings.history_timeline
        : defaultTimeline;

    const missionAccents = [
        'border-l-blue-500 bg-blue-500/5',
        'border-l-emerald-500 bg-emerald-500/5',
        'border-l-violet-500 bg-violet-500/5',
    ];
    const missionNumColors = [
        'from-blue-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-violet-500 to-purple-600',
    ];

    const timelineColors = [
        { dot: 'bg-blue-500', year: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-600 dark:text-blue-400' },
        { dot: 'bg-emerald-500', year: 'from-emerald-500/20 to-emerald-500/5', text: 'text-emerald-600 dark:text-emerald-400' },
        { dot: 'bg-amber-500', year: 'from-amber-500/20 to-amber-500/5', text: 'text-amber-600 dark:text-amber-400' },
        { dot: 'bg-violet-500', year: 'from-violet-500/20 to-violet-500/5', text: 'text-violet-600 dark:text-violet-400' },
    ];

    const stats = [
        { label: locale === 'en' ? 'Founded' : 'Berdiri', value: '2018', icon: Building2 },
        { label: locale === 'en' ? 'Projects' : 'Proyek', value: '200+', icon: Briefcase },
        { label: locale === 'en' ? 'Clients' : 'Klien', value: '50+', icon: Users },
        { label: locale === 'en' ? 'Rating' : 'Rating', value: '4.9★', icon: Star },
    ];

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    
                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>
                    
                    <ScrollReveal animation="fade-up">
                        <div className="text-center space-y-8 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                                    {locale === 'en' ? 'Company Profile' : 'Profil Perusahaan'}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                                    {locale === 'en' ? (
                                        <>About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Us</span></>
                                    ) : (
                                        <>Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Kami</span></>
                                    )}
                                </h1>
                                <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                                    {locale === 'en'
                                        ? 'Build. Grow. Scale. Your Business in the Digital Era.'
                                        : 'Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.'}
                                </p>
                            </div>

                            {/* Stats bar */}
                            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                                {stats.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-2.5 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                            <Icon className="w-5 h-5 text-blue-200 shrink-0" />
                                            <span className="text-xl font-black text-white">{s.value}</span>
                                            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">{s.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Overlapping) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-24">
                <div className="bg-gray-50/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-12 shadow-2xl space-y-28">

                    {/* Download Company Profile Button */}
                    <div className="flex justify-center -mt-4">
                        <a
                            href={settings?.company_profile_pdf ? `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${settings.company_profile_pdf}` : "/company-profile-diggity.pdf"}
                            target="_blank" rel="noopener noreferrer"
                            download
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-2xl hover:bg-brand-blue-dark shadow-xl shadow-brand-blue/20 hover:shadow-brand-blue/40 text-sm font-bold transition-all transform hover:-translate-y-1"
                        >
                            <FileText className="w-5 h-5" />
                            {locale === 'en' ? 'Download Company Profile (PDF)' : 'Unduh Company Profile (PDF)'}
                        </a>
                    </div>
                    
                    {/* 02. PHILOSOPHY — History Text
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className="p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative large text */}
                        <span className="absolute right-8 top-4 text-[120px] font-black text-brand-blue/5 select-none leading-none pointer-events-none hidden md:block">
                            2018
                        </span>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                    <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                        {locale === 'en' ? 'History & Philosophy' : 'Sejarah & Filosofi'}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight leading-tight">
                                    {locale === 'en' ? 'Our Core Digital Engineering Pillars' : 'Pilar Utama Rekayasa Digital Kami'}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <p className="text-text-gray leading-relaxed text-sm md:text-base">
                                    {locale === 'en'
                                        ? (settings?.history_text_en || 'Established in 2018 in Tangerang, Diggity was born from a vision to deliver global-standard digital solutions for local businesses. We believe in structured growth frameworks to help businesses build technical foundations, dominate markets, scale capacity, and train internal capabilities.')
                                        : (settings?.history_text_id || 'Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan terstruktur untuk membantu bisnis membangun fondasi teknis, mendominasi pasar, menskalakan kapasitas, dan melatih kemandirian internal.')}
                                </p>
                                <p className="text-xs font-semibold text-text-muted">Sleman, Yogyakarta • Est. 2019</p>
                            </div>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

                {/* ════════════════════════════════
                    03. PILLARS — Build/Grow/Scale/Empower
                ════════════════════════════════ */}
                <div className="space-y-8">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                            <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                {locale === 'en' ? 'Our Framework' : 'Kerangka Kerja Kami'}
                            </span>
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {pillars.map((p, i) => {
                            const PIcon = p.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                    <SpotlightCard className={`p-6 relative overflow-hidden flex flex-col gap-5 border-t-2 ${p.accentBorder} h-full`}>
                                        {/* Large decorative number */}
                                        <span className={`absolute -bottom-2 -right-1 text-7xl font-black select-none leading-none pointer-events-none ${p.accentText} opacity-10`}>
                                            {p.num}
                                        </span>

                                        <div className={`w-12 h-12 rounded-2xl ${p.accentBg} flex items-center justify-center shrink-0`}>
                                            <PIcon className={`w-6 h-6 ${p.accentText}`} strokeWidth={1.5} />
                                        </div>

                                        <div className="space-y-2">
                                            <p className={`text-xs font-black uppercase tracking-[0.15em] ${p.accentText}`}>
                                                {p.num} / {p.label}
                                            </p>
                                            <p className="text-sm text-text-gray leading-relaxed font-medium">{p.desc}</p>
                                        </div>
                                    </SpotlightCard>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* ════════════════════════════════
                    04. VISION — Dramatic Quote
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <div className="relative overflow-hidden rounded-3xl border border-brand-blue/15 bg-gradient-to-br from-[#0a192f] via-[#0d2040] to-[#091525]">
                        {/* Decorative blobs */}
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                        {/* Giant quote mark */}
                        <span className="absolute top-4 left-8 text-[180px] font-black text-white/5 leading-none select-none pointer-events-none font-serif">"</span>

                        <div className="relative z-10 p-10 md:p-16 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-blue-400/50 rounded-full" />
                                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">
                                    {locale === 'en' ? 'Vision' : 'Visi'}
                                </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-white/60 tracking-tight">
                                {locale === 'en' ? 'Our Strategic Horizon' : 'Arah Strategis Kami'}
                            </h2>
                            <p className="text-xl md:text-3xl font-black text-white leading-snug max-w-4xl tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                                    {vision}
                                </span>
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ════════════════════════════════
                    05. MISSION — Accent Cards
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                    {locale === 'en' ? 'Mission' : 'Misi'}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight leading-tight">
                                {locale === 'en' ? 'How We Deliver Impact' : 'Bagaimana Kami Mewujudkannya'}
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {missionPoints.map((point: any, index: number) => (
                                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                                    <div className={`flex items-start gap-6 p-6 rounded-2xl border-l-4 ${missionAccents[index] || 'border-l-brand-blue bg-brand-blue/5'}`}>
                                        {/* Large gradient number circle */}
                                        <div className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${missionNumColors[index] || 'from-brand-blue to-indigo-600'} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                                            {index + 1}
                                        </div>
                                        <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium pt-2.5">
                                            {point.text}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ════════════════════════════════
                    06. VALUES — Bento Grid
                ════════════════════════════════ */}
                <div className="space-y-10">
                    <ScrollReveal animation="fade-up">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                    {locale === 'en' ? 'Company Values' : 'Nilai Perusahaan'}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Core Principles Guiding Us' : 'Prinsip Yang Mengarahkan Kami'}
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Featured card — spans 2 rows */}
                        {(() => {
                            const FeaturedIcon = values[0].icon;
                            return (
                        <ScrollReveal animation="fade-up" delay={0} className="md:row-span-2">
                            <SpotlightCard className={`p-8 h-full flex flex-col gap-6 bg-gradient-to-br ${values[0].gradient} border-brand-blue/20`}>
                                <div className={`w-16 h-16 rounded-2xl ${values[0].iconBg} flex items-center justify-center`}>
                                    <FeaturedIcon className={`w-8 h-8 ${values[0].iconColor}`} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-3 flex-1">
                                    <h3 className="text-xl md:text-2xl font-black text-text-main">{values[0].title}</h3>
                                    <p className="text-base text-text-gray leading-relaxed font-medium">{values[0].desc}</p>
                                </div>
                                {/* Decorative element */}
                                <div className="flex items-center gap-2 pt-2">
                                    <Zap className={`w-4 h-4 ${values[0].iconColor}`} />
                                    <span className={`text-xs font-bold ${values[0].iconColor} uppercase tracking-wider`}>
                                        {locale === 'en' ? 'Core Value' : 'Nilai Utama'}
                                    </span>
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                            );
                        })()}

                        {/* Remaining 3 cards — stacked */}
                        {values.slice(1).map((val, i) => {
                            const Icon = val.icon;
                            return (
                                <ScrollReveal key={i + 1} animation="fade-up" delay={(i + 1) * 80}>
                                    <SpotlightCard className={`p-7 flex items-start gap-5 bg-gradient-to-br ${val.gradient} h-full`}>
                                        <div className={`w-14 h-14 rounded-2xl ${val.iconBg} flex items-center justify-center shrink-0`}>
                                            <Icon className={`w-7 h-7 ${val.iconColor}`} strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4 className="text-base font-extrabold text-text-main">{val.title}</h4>
                                            <p className="text-sm text-text-gray leading-relaxed font-medium">{val.desc}</p>
                                        </div>
                                    </SpotlightCard>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* ════════════════════════════════
                    07. TIMELINE — Milestone Cards
                ════════════════════════════════ */}
                <div className="space-y-10">
                    <ScrollReveal animation="fade-up">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                    Milestones
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Our Historic Journey' : 'Perjalanan Sejarah Kami'}
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Gradient connector line */}
                        <div className="absolute left-[27px] md:left-[43px] top-8 bottom-8 w-px bg-gradient-to-b from-brand-blue via-emerald-500 via-amber-500 to-violet-500 opacity-30 pointer-events-none" />

                        <div className="space-y-5">
                            {timelineData.map((item: any, i: number) => {
                                const tc = timelineColors[i % timelineColors.length];
                                return (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                        <div className="flex items-start gap-5 md:gap-8">
                                            {/* Dot indicator */}
                                            <div className={`w-14 h-14 rounded-2xl ${tc.dot} bg-opacity-15 flex items-center justify-center shrink-0 relative z-10 border border-white/10`}
                                                style={{ background: `linear-gradient(135deg, ${tc.dot.replace('bg-', '')}20, ${tc.dot.replace('bg-', '')}05)` }}
                                            >
                                                <span className={`text-base font-black ${tc.text}`}>{item.year.slice(-2)}'</span>
                                            </div>

                                            {/* Content card */}
                                            <SpotlightCard className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className={`shrink-0 px-4 py-2 rounded-xl bg-gradient-to-br ${tc.year} border border-white/5`}>
                                                    <span className={`text-2xl font-black ${tc.text} leading-none`}>{item.year}</span>
                                                </div>
                                                <div className="space-y-1 flex-1">
                                                    <h4 className="text-base font-extrabold text-text-main">{locale === 'en' ? (item.title_en || item.title) : item.title}</h4>
                                                    <p className="text-sm text-text-gray leading-relaxed font-medium">{locale === 'en' ? (item.desc_en || item.desc) : item.desc}</p>
                                                </div>
                                            </SpotlightCard>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}


