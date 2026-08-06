import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Service, Portfolio, Testimonial } from '../lib/api';
import ContactForm from '../components/ContactForm';
import SpotlightCard from '../components/SpotlightCard';
import HomePortfolios from '../components/HomePortfolios';
import { 
    Code, 
    Smartphone, 
    Palette, 
    Search, 
    TrendingUp, 
    Server, 
    GraduationCap,
    ArrowRight,
    Star,
    CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
    code: Code,
    smartphone: Smartphone,
    palette: Palette,
    search: Search,
    'trending-up': TrendingUp,
    server: Server,
    'graduation-cap': GraduationCap,
};

import { generatePageMetadata } from '../lib/seo';
import { getLocaleServer } from '../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export async function generateMetadata() {
    try {
        const res = await api.getStaticPageSeo('home');
        return generatePageMetadata(res?.seo, {
            title: 'Diggity - Corporate IT Solutions & Learning',
            description: 'Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.',
            path: '/'
        });
    } catch {
        return generatePageMetadata(null, { path: '/' });
    }
}

export default async function Home() {
    const locale = await getLocaleServer();
    let services: Service[] = [];
    let portfolios: Portfolio[] = [];
    let testimonials: Testimonial[] = [];
    let settings: any = null;

    try {
        // Fetch data concurrently from Laravel API
        const [servicesRes, portfoliosRes, testimonialsRes, settingsRes] = await Promise.all([
            api.getServices(),
            api.getPortfolios(),
            api.getTestimonials(),
            api.getCompanySettings(),
        ]);
        services = servicesRes.slice(0, 4); // Limit to top 4 services
        portfolios = portfoliosRes.slice(0, 3); // Limit to top 3 portfolios
        testimonials = testimonialsRes;
        settings = settingsRes;
    } catch (error) {
        console.error('Error fetching home page data:', error);
    }

    const stats = locale === 'en' ? [
        { value: '150+', label: 'Happy Clients' },
        { value: '300+', label: 'Projects Completed' },
        { value: '99%', label: 'Success KPI Rate' },
        { value: '8+', label: 'Years Experience' },
    ] : [
        { value: '150+', label: 'Klien Puas' },
        { value: '300+', label: 'Proyek Selesai' },
        { value: '99%', label: 'Tingkat Sukses KPI' },
        { value: '8+', label: 'Tahun Pengalaman' },
    ];

    // Fallback professional avatars if database lacks avatars
    const fallbackAvatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
    ];

    return (
        <div className="relative">
            {/* 1. Hero Section */}
            <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
                {/* Center Radial Glow Spotlight */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/8 dark:bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

                <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">


                    <h1 className="text-4xl md:text-7xl font-black tracking-tight text-text-main leading-tight max-w-4xl mx-auto">
                        Build. Grow. Scale.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-blue-500 dark:from-brand-blue dark:via-blue-400 dark:to-blue-300">
                            Digital Architecture.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-gray max-w-2xl mx-auto font-medium">
                        {locale === 'en' 
                            ? 'We build integrated digital architectures, optimize search rankings, and systematically engineer sales conversions.'
                            : 'Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15"
                        >
                            {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                        </Link>
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-text-main bg-glass-bg border border-glass-border rounded-xl hover:border-brand-blue/40 transition-colors"
                        >
                            {locale === 'en' ? 'View Our Work' : 'Lihat Karya'}
                            <ArrowRight className="ml-2 w-4.5 h-4.5" />
                        </Link>
                    </div>

                    {/* Hero Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-16 text-left">
                        {/* Box 1: Code Sandbox (md:col-span-2) */}
                        <a href="#services" className="md:col-span-2 group block">
                            <SpotlightCard className="h-full p-6 flex flex-col justify-between min-h-[220px] overflow-hidden border border-glass-border bg-neutral-950/20 backdrop-blur rounded-2xl relative transition-all duration-300 group-hover:scale-[1.01] group-hover:border-brand-blue/30 cursor-pointer">
                                <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                        <span className="text-[10px] text-text-muted font-mono pl-2">DiggityApp.tsx</span>
                                    </div>
                                    <Code className="w-4 h-4 text-text-muted group-hover:text-brand-blue transition-colors" />
                                </div>
                                <pre className="font-mono text-xs text-brand-blue leading-relaxed overflow-x-auto select-none">
                                    <code className="text-slate-500 dark:text-slate-400">
                                        <span className="text-blue-500 dark:text-blue-400">const</span> app = <span className="text-blue-500 dark:text-blue-400">new</span> <span className="text-amber-600 dark:text-amber-300">DiggityApp</span>&#40;&#123;<br />
                                        &nbsp;&nbsp;client: <span className="text-emerald-600 dark:text-emerald-400">"ForwardThinking"</span>,<br />
                                        &nbsp;&nbsp;growth: <span className="text-emerald-600 dark:text-emerald-400">"Accelerated"</span>,<br />
                                        &nbsp;&nbsp;scale: <span className="text-emerald-600 dark:text-emerald-400">"Enterprise"</span><br />
                                        &#125;&#41;;<br />
                                        app.<span className="text-purple-600 dark:text-purple-400">build</span>&#40;&#41;.<span className="text-purple-600 dark:text-purple-400">grow</span>&#40;&#41;.&nbsp;&nbsp;<span className="text-brand-blue font-bold group-hover:underline">explore_services()</span>;
                                    </code>
                                </pre>
                            </SpotlightCard>
                        </a>

                        {/* Box 2: Live Cloud Monitor (md:col-span-1) */}
                        <a href="#services" className="md:col-span-1 group block">
                            <SpotlightCard className="h-full p-6 flex flex-col justify-between min-h-[220px] border border-glass-border bg-neutral-950/20 backdrop-blur rounded-2xl text-left transition-all duration-300 group-hover:scale-[1.02] group-hover:border-brand-blue/30 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cloud Squad</span>
                                    <Server className="w-4 h-4 text-brand-blue group-hover:animate-pulse" />
                                </div>
                                <div className="space-y-2 py-4">
                                    <div className="text-2xl font-black text-text-main group-hover:text-brand-blue transition-colors">99.98%</div>
                                    <div className="text-xs text-text-gray font-semibold">Uptime Guarantee</div>
                                    <div className="flex items-center space-x-1.5 pt-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">Active Node</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-text-muted">Latency: 12ms (SG-Zone)</div>
                            </SpotlightCard>
                        </a>

                        {/* Box 3: SEO Ranking Growth (md:col-span-1) */}
                        <a href="#services" className="md:col-span-1 group block">
                            <SpotlightCard className="h-full p-6 flex flex-col justify-between min-h-[220px] border border-glass-border bg-neutral-950/20 backdrop-blur rounded-2xl relative overflow-hidden text-left transition-all duration-300 group-hover:scale-[1.02] group-hover:border-brand-blue/30 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Growth Div</span>
                                    <TrendingUp className="w-4 h-4 text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                                <div className="space-y-1 py-3">
                                    <div className="text-2xl font-black text-text-main group-hover:text-brand-blue transition-colors">+142%</div>
                                    <div className="text-xs text-text-gray font-semibold">Organic SEO Traffic</div>
                                    <div className="inline-block px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-bold text-emerald-500 mt-1">
                                        Google Page #1
                                    </div>
                                </div>
                                <div className="h-10 w-full overflow-hidden opacity-60">
                                    <svg viewBox="0 0 100 40" className="w-full h-full">
                                        <defs>
                                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0 35 Q 25 32, 50 15 T 100 5 L 100 40 L 0 40 Z"
                                            fill="url(#chartGrad)"
                                        />
                                        <path
                                            d="M0 35 Q 25 32, 50 15 T 100 5"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                            </SpotlightCard>
                        </a>
                    </div>

                    {/* Client Logos Marquee */}
                    <div className="pt-16 max-w-5xl mx-auto">
                        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">Trusted by Forward-Thinking Brands</p>
                        <div className="flex justify-between items-center gap-8 flex-wrap opacity-45 dark:opacity-30 filter grayscale py-5 border-t border-b border-glass-border">
                            {settings && settings.partner_logos && settings.partner_logos.length > 0 ? (
                                settings.partner_logos.map((partner: string, idx: number) => (
                                    <span key={idx} className="font-extrabold text-lg text-text-main tracking-wider">{partner.toUpperCase()}</span>
                                ))
                            ) : (
                                <>
                                    <span className="font-extrabold text-lg text-text-main tracking-wider">GOOGLE</span>
                                    <span className="font-extrabold text-lg text-text-main tracking-wider">STRIPE</span>
                                    <span className="font-extrabold text-lg text-text-main tracking-wider">MICROSOFT</span>
                                    <span className="font-extrabold text-lg text-text-main tracking-wider">META</span>
                                    <span className="font-extrabold text-lg text-text-main tracking-wider">AMAZON</span>
                                </>
                            )}
                        </div>
                    </div>


                </div>
            </section>

            {/* 2. Services Section */}
            <section id="services" className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Keahlian Modular
                            </span>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Solusi Sistem <span className="text-brand-blue">Terintegrasi</span>
                            </h3>
                        </div>
                        <p className="text-text-gray max-w-md text-sm md:text-base leading-relaxed">
                            Penyusunan kode sumber yang bersih dipadukan dengan strategi pertumbuhan pemasaran yang berbasis performa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.length > 0 ? (
                            services.slice(0, 3).map((service: any) => {
                                const IconComponent = iconMap[service.icon || 'code'] || Code;
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/solutions/${service.slug}`}
                                        className="group block cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                                    >
                                        <SpotlightCard
                                            className="p-8 space-y-6 animate-fade-in h-full group-hover:border-brand-blue/30"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors">{service.name}</h4>
                                                <p className="text-sm text-text-gray leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center text-text-muted py-10">
                                Belum ada data layanan di database.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Mengapa Diggity?</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            Keunggulan Layanan <span className="text-brand-blue">IT & Bisnis Kami</span>
                        </h2>
                        <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto">
                            Kami menyatukan rekayasa teknis tingkat lanjut dengan strategi pertumbuhan yang terukur untuk kesuksesan jangka panjang.
                        </p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Professional Team (Spans 2 columns) */}
                        <SpotlightCard className="p-8 md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden text-left min-h-[220px]">
                            <div className="space-y-4 max-w-md">
                                <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    <span>👥 Team</span>
                                </div>
                                <h4 className="text-xl font-bold text-text-main">Professional Team</h4>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    Didukung oleh engineer senior, desainer UI/UX berpengalaman, dan ahli SEO bersertifikasi yang siap merekayasa pertumbuhan bisnis Anda.
                                </p>
                            </div>
                            <div className="flex -space-x-4 overflow-hidden py-2 shrink-0">
                                {fallbackAvatars.map((url, i) => (
                                    <div key={i} className="relative w-12 h-12 rounded-full border-2 border-brand-bg overflow-hidden bg-glass-bg shadow-md">
                                        <Image
                                            src={url}
                                            alt="Team Avatar"
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-brand-bg bg-brand-blue/10 flex items-center justify-center text-xs font-bold text-brand-blue shadow-md backdrop-blur">
                                    +15
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Card 2: Success KPI Rate */}
                        <SpotlightCard className="p-8 text-center flex flex-col justify-center items-center min-h-[220px]">
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">99%</div>
                            <h5 className="text-sm font-bold text-text-main uppercase tracking-wider mt-4">Success KPI Rate</h5>
                            <p className="text-xs text-text-gray mt-2 leading-relaxed max-w-[200px]">Tingkat kepuasan klien dan keberhasilan peluncuran produk digital.</p>
                        </SpotlightCard>

                        {/* Card 3: Affordable Price */}
                        <SpotlightCard className="p-8 flex flex-col justify-between text-left min-h-[220px]">
                            <div className="space-y-4">
                                <div className="text-3xl">💰</div>
                                <h4 className="text-lg font-bold text-text-main">Affordable Price</h4>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    Solusi premium dengan harga yang kompetitif, transparan, tanpa ada biaya tambahan tak terduga.
                                </p>
                            </div>
                        </SpotlightCard>

                        {/* Card 4: Award Winning (Spans 2 columns) */}
                        <SpotlightCard className="p-8 md:col-span-2 flex flex-col justify-between text-left min-h-[220px] relative overflow-hidden">
                            <div className="space-y-4 max-w-lg z-10">
                                <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    <span>🏆 Awards</span>
                                </div>
                                <h4 className="text-xl font-bold text-text-main">Award Winning Digital Agency</h4>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    Diakui secara luas atas dedikasi tinggi dalam rekayasa solusi arsitektur digital dan optimasi performa konversi yang efektif secara berkelanjutan.
                                </p>
                            </div>
                            <div className="absolute right-[-50px] bottom-[-50px] w-48 h-48 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
                        </SpotlightCard>

                        {/* Card 5: Projects Completed */}
                        <SpotlightCard className="p-8 text-center flex flex-col justify-center items-center min-h-[180px]">
                            <div className="text-4xl md:text-5xl font-black text-brand-blue">300+</div>
                            <div className="text-xs font-bold text-text-gray uppercase tracking-wider mt-2">Projects Completed</div>
                            <p className="text-[11px] text-text-muted mt-1 leading-normal max-w-[200px] mx-auto">Website, aplikasi mobile & sistem kustom.</p>
                        </SpotlightCard>

                        {/* Card 6: Happy Clients */}
                        <SpotlightCard className="p-8 text-center flex flex-col justify-center items-center min-h-[180px]">
                            <div className="text-4xl md:text-5xl font-black text-brand-blue">150+</div>
                            <div className="text-xs font-bold text-text-gray uppercase tracking-wider mt-2">Happy Clients</div>
                            <p className="text-[11px] text-text-muted mt-1 leading-normal max-w-[200px] mx-auto">Perusahaan lokal & skala multinasional.</p>
                        </SpotlightCard>

                        {/* Card 7: Years Experience */}
                        <SpotlightCard className="p-8 text-center flex flex-col justify-center items-center min-h-[180px]">
                            <div className="text-4xl md:text-5xl font-black text-brand-blue">8+</div>
                            <div className="text-xs font-bold text-text-gray uppercase tracking-wider mt-2">Years Experience</div>
                            <p className="text-[11px] text-text-muted mt-1 leading-normal max-w-[200px] mx-auto">Pengalaman matang di industri teknologi.</p>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 3. Featured Portfolio Section (Client Component with Modal Popup) */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-end justify-between mb-16">
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Studi Kasus
                            </span>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Hasil Kerja <span className="text-brand-blue">Unggulan</span>
                            </h3>
                        </div>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-brand-blue-dark"
                        >
                            Semua Portfolio
                            <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>

                    {/* Client component holding Portfolio Grid and dynamic modal */}
                    <HomePortfolios portfolios={portfolios} />
                </div>
            </section>

            {/* 4. Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center space-y-4 mb-16">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Validasi Klien
                            </span>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Laporan Hasil <span className="text-brand-blue">Umpan Balik</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((test: any, idx) => (
                                <SpotlightCard
                                    key={test.id}
                                    className="p-8 space-y-6 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-1 text-brand-blue">
                                            {[...Array(test.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-brand-blue stroke-brand-blue" />
                                            ))}
                                        </div>
                                        <p className="text-sm md:text-base italic text-text-gray leading-relaxed">
                                            &ldquo;{test.review || test.message}&rdquo;
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-glass-border">
                                        <div className="relative w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue text-sm overflow-hidden">
                                            {test.avatar ? (
                                                <Image 
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${test.avatar}`}
                                                    alt={test.client_name || test.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <Image 
                                                    src={fallbackAvatars[idx % fallbackAvatars.length]}
                                                    alt={test.client_name || test.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-text-main">{test.client_name || test.name}</h5>
                                            <p className="text-xs text-text-muted">{test.company}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Home Page CTA Section */}
            <section className="container max-w-7xl mx-auto px-6 md:px-8 py-10">
                <SpotlightCard className="relative overflow-hidden" style={{ padding: '60px 40px', borderRadius: '16px' }}>
                    <div className="topographic-bg" />
                    <div className="relative z-20 max-w-2xl mx-auto text-center space-y-6">
                        <span className="studio-badge" style={{ marginBottom: 0 }}>Mulai Sekarang</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main leading-tight">
                            Siap Mengakselerasi <br />
                            <span className="text-brand-blue">Bisnis Digital Anda?</span>
                        </h2>
                        <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto">
                            Hubungi tim konsultan teknis kami hari ini dan dapatkan analisis arsitektur digital gratis untuk proyek Anda.
                        </p>
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15"
                        >
                            Mulai Diskusi Proyek
                        </Link>
                    </div>
                </SpotlightCard>
            </section>

            {/* 5. Contact Section */}
            <section id="contact" className="py-20 border-t border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Text Content */}
                        <div className="space-y-8 lg:sticky lg:top-32 text-left">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    Hubungi Kami
                                </span>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight">
                                    Mari Bangun Sesuatu yang <span className="text-brand-blue">Hebat Bersama</span>
                                </h3>
                            </div>
                            
                            <p className="text-text-gray text-base leading-relaxed">
                                Punya ide produk digital, butuh bantuan pemasaran ads/SEO, atau mencari server hosting handal untuk infrastruktur IT perusahaan Anda? Hubungi kami sekarang dan dapatkan analisis bisnis gratis dari pakar kami.
                            </p>

                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>Konsultasi gratis tanpa komitmen apa-apa</span>
                                </div>
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>Analisis performa web & audit SEO dasar</span>
                                </div>
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>Tawaran harga khusus (Best Value Guarantee)</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="w-full">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
