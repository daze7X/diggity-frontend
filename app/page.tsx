import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Service, Portfolio, Testimonial, Product, Blog } from '../lib/api';
import ContactForm from '../components/ContactForm';
import SpotlightCard from '../components/SpotlightCard';
import HomePortfolios from '../components/HomePortfolios';
import HomeProducts from '../components/HomeProducts';
import HomeTestimonials from '../components/HomeTestimonials';
import ScrollReveal from '../components/ScrollReveal';
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
    CheckCircle2,
    Briefcase,
    Users,
    Activity,
    Cpu,
    Cloud,
    Shield,
    Globe,
    Layers,
    BookOpen,
    HelpCircle,
    ArrowUpRight,
    Building2,
    Award,
    Compass,
    Handshake,
    ThumbsUp,
    PlayCircle,
    Sparkles
} from 'lucide-react';

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
    let products: Product[] = [];
    let blogs: Blog[] = [];

    try {
        // Fetch data concurrently from Laravel API
        const [servicesRes, portfoliosRes, testimonialsRes, settingsRes, productsRes, blogsRes] = await Promise.all([
            api.getServices(),
            api.getPortfolios(),
            api.getTestimonials(),
            api.getCompanySettings(),
            api.getProducts(),
            api.getInsights(),
        ]);
        services = servicesRes;
        portfolios = portfoliosRes;
        testimonials = testimonialsRes;
        settings = settingsRes;
        products = productsRes.slice(0, 4); // Limit to top 4 products
        blogs = blogsRes.slice(0, 3); // Limit to top 3 blogs
    } catch (error) {
        console.error('Error fetching home page data:', error);
    }

    const fallbackAvatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
    ];

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-36 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Dynamic Wave Background */}
                <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                    <Image
                        src="/images/hero-bg-dark.svg"
                        alt="Hero Wave Background"
                        fill
                        priority
                        className="object-cover object-top opacity-20 mix-blend-overlay"
                    />
                </div>

                                {/* SVG Filter for Gooey Effect */}
                <svg className="absolute hidden">
                    <defs>
                        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="
                                1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 22 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                    
                    {/* LEFT FLANK CLUSTER */}
                    <div className="absolute -left-32 top-1/4 w-96 h-96 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />
                    <div className="absolute -left-10 top-1/3 w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                    {/* RIGHT FLANK CLUSTER */}
                    <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-purple-600 rounded-full animate-morph-blob-fast mix-blend-screen" />
                    <div className="absolute -right-10 bottom-1/3 w-64 h-64 bg-cyan-500 rounded-full animate-gooey-2 mix-blend-screen" />

                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    


                    <ScrollReveal animation="fade-up" className="max-w-3xl relative z-10 space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{locale === 'en' ? 'Digital Technology Company' : 'Perusahaan Teknologi Digital'}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                            {locale === 'en' ? 'Build. Grow. Scale.' : 'Bangun. Tumbuhkan. Skalakan.'}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                                {locale === 'en' ? 'Your Digital Vision' : 'Visi Digital Anda'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
                            {locale === 'en'
                                ? 'We build integrated digital architectures, optimize search rankings, and systematically engineer sales conversions.'
                                : 'Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/solutions" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-lg shadow-white/20">
                                {locale === 'en' ? 'Explore Solutions' : 'Jelajahi Solusi'}
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
                                {locale === 'en' ? 'Consult with Us' : 'Konsultasi Sekarang'}
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>

            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 space-y-24">
                {/* 02. Trusted By Section (Client Logos Marquee) */}
                    <ScrollReveal animation="fade-up" delay={200} className="pt-16 max-w-5xl mx-auto">
                        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/80 mb-6">
                            {locale === 'en' ? 'Trusted by forward-thinking businesses and organizations' : 'Dipercaya oleh berbagai bisnis, organisasi, dan institusi'}
                        </p>

                        {/* Premium Rounded Glass Capsule */}
                        <div className="relative py-6 px-8 bg-glass-bg/10 dark:bg-glass-bg/5 backdrop-blur-sm border border-glass-border/30 rounded-3xl overflow-hidden flex">
                            {/* Soft fade gradients on edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none rounded-l-3xl" />
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none rounded-r-3xl" />

                            <div className="animate-marquee flex items-center space-x-16 shrink-0 pr-16">
                                {settings && settings.partner_logos && settings.partner_logos.length > 0 ? (
                                    (() => {
                                        const logos = settings.partner_logos;
                                        const minItems = 16;
                                        const repeatCount = Math.ceil(minItems / logos.length);
                                        const duplicatedLogos = Array(repeatCount).fill(logos).flat();
                                        const finalLogos = [...duplicatedLogos, ...duplicatedLogos];
                                        
                                        return finalLogos.map((logo: string, idx: number) => {
                                            const isFilePath = logo.includes('/') || logo.includes('.') || logo.startsWith('http');
                                            return (
                                                <div key={idx} className="flex items-center justify-center h-10 w-32 relative shrink-0 grayscale opacity-60 dark:opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                                                    {isFilePath ? (
                                                        <Image
                                                            src={logo.startsWith('http') ? logo : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${logo}`}
                                                            alt="Partner Logo"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <span className="font-black text-lg text-text-main tracking-widest">{logo.toUpperCase()}</span>
                                                    )}
                                                </div>
                                            );
                                        });
                                    })()
                                ) : (
                                    ['GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON'].map((logo, idx) => (
                                        <div key={idx} className="flex items-center justify-center h-10 w-32 shrink-0 grayscale opacity-50 dark:opacity-30">
                                            <span className="font-black text-xl text-text-main tracking-widest">{logo}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </ScrollReveal>

            {/* 03. What We Do Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {locale === 'en' ? 'What We Do' : 'Apa Yang Kami Lakukan'}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'One Digital Ecosystem. Three Ways to Grow.' : 'Satu Ekosistem Digital. Tiga Cara Tumbuh.'}
                        </h2>
                        <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            {locale === 'en' 
                                ? 'Diggity assists businesses and organizations through three core ecosystems.'
                                : 'Diggity membantu bisnis dan organisasi melalui tiga ekosistem utama.'}
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* SOLUTIONS */}
                        <ScrollReveal animation="fade-up" delay={100}>
                            <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full group hover:border-brand-blue/30 transition-all duration-300">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
                                            <Cpu className="w-6 h-6" />
                                        </div>
                                        <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            BUILD · GROW
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main">SOLUTIONS</h3>
                                    <p className="text-sm text-text-gray leading-relaxed">
                                        {locale === 'en'
                                            ? 'Build and grow your business through technology, AI, creative, marketing, cloud, cybersecurity, and consulting.'
                                            : 'Membangun dan mengembangkan bisnis melalui teknologi, AI, creative, marketing, cloud, cybersecurity, dan consulting.'}
                                    </p>
                                </div>
                                <Link href="/solutions" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group/link mt-6">
                                    <span>Explore Solutions</span>
                                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </SpotlightCard>
                        </ScrollReveal>

                        {/* PRODUCTS */}
                        <ScrollReveal animation="fade-up" delay={200}>
                            <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full group hover:border-brand-blue/30 transition-all duration-300">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
                                            <Layers className="w-6 h-6" />
                                        </div>
                                        <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            SCALE
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main">PRODUCTS</h3>
                                    <p className="text-sm text-text-gray leading-relaxed">
                                        {locale === 'en'
                                            ? 'Ready-to-use digital products to improve efficiency, productivity, automation, and scalability.'
                                            : 'Produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomatisasi, dan skalabilitas.'}
                                    </p>
                                </div>
                                <Link href="/products" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group/link mt-6">
                                    <span>Explore Products</span>
                                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </SpotlightCard>
                        </ScrollReveal>

                        {/* ACADEMY */}
                        <ScrollReveal animation="fade-up" delay={300}>
                            <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full group hover:border-brand-blue/30 transition-all duration-300">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            EMPOWER
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main">ACADEMY</h3>
                                    <p className="text-sm text-text-gray leading-relaxed">
                                        {locale === 'en'
                                            ? 'Education and competency development for individuals and corporate teams.'
                                            : 'Pendidikan dan pengembangan kompetensi untuk individu maupun organisasi.'}
                                    </p>
                                </div>
                                <Link href="/academy" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group/link mt-6">
                                    <span>Explore Academy</span>
                                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 04. Solutions Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 text-left">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Solutions
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Build &amp; Grow Your <span className="text-brand-blue">Digital Business</span>
                            </h2>
                        </div>
                        <Link href="/solutions" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0 cursor-pointer">
                            Explore All Solutions <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 1. Technology Solutions */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Code className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Technology Solutions</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Website, Mobile App, Software Development, ERP Systems, and Custom Platforms.</p>
                        </SpotlightCard>

                        {/* 2. AI & Emerging Technology */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">AI &amp; Emerging Technology</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Artificial Intelligence, Robotic Process Automation, Machine Learning, and Big Data.</p>
                        </SpotlightCard>

                        {/* 3. Creative & Brand Experience */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Palette className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Creative &amp; Brand Experience</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Branding Strategy, UI/UX Design, Creative Writing, and Video Production.</p>
                        </SpotlightCard>

                        {/* 4. Growth Marketing */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Growth Marketing</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Search Engine Optimization (SEO), Paid Ads (Google/Meta), Social Media, and E-commerce.</p>
                        </SpotlightCard>

                        {/* 5. Cloud & Cyber Security */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Cloud className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Cloud &amp; Cyber Security</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Cloud Infrastructure, DevOps Automation, Security Audits, and Quality Assurance.</p>
                        </SpotlightCard>

                        {/* 6. Consulting */}
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Consulting</h4>
                            <p className="text-xs text-text-gray leading-relaxed">IT Roadmapping, Enterprise Digital Architecture, Business Consulting, and Digital Transformation.</p>
                        </SpotlightCard>

                        {/* 7. IT Talent & Workforce Solutions */}
                        <SpotlightCard className="p-6 text-left space-y-4 md:col-span-2 lg:col-span-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-2">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-base font-extrabold text-text-main">IT Talent &amp; Workforce Solutions</h4>
                                    <p className="text-xs text-text-gray leading-relaxed">IT Headhunting, Outsourcing, and Tech Talent Recruitment Management.</p>
                                </div>
                                <Link href="/solutions" className="px-5 py-2.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-dark transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer">
                                    Explore Solutions <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 05. Products Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 text-left">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Products
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Digital Products Built to <span className="text-brand-blue">Scale</span>
                            </h2>
                        </div>
                        <Link href="/products" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0 cursor-pointer">
                            Explore All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Interactive Tabbed Product Grid */}
                    <HomeProducts locale={locale} />
                </div>
            </section>

            {/* 06. Academy Section */}
            {/* 06. Academy Section (Dark Contrast Section) */}
            <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none" />
                <div className="absolute -left-40 -top-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal animation="slide-right">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="inline-block px-3 py-1 bg-brand-blue/20 text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-brand-blue/30">
                                        Diggity Academy
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                        Learn. Build Skills. <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                            Empower Your Future.
                                        </span>
                                    </h2>
                                    <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                                        {locale === 'en' 
                                            ? 'We don\'t just build technology. We build the people behind it. Master in-demand digital skills through our intensive bootcamps, self-paced courses, and corporate training.' 
                                            : 'Kami tidak sekadar membangun teknologi. Kami membangun SDM di baliknya. Kuasai keahlian digital paling dicari melalui bootcamp intensif, e-learning, dan pelatihan korporat.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { name: 'Coding Bootcamp', icon: Code },
                                        { name: 'Corporate Training', icon: Users },
                                        { name: 'Professional Certification', icon: Award },
                                        { name: 'Digital Ecosystem (LMS)', icon: Globe },
                                    ].map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={idx} className="flex items-center space-x-3 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-brand-blue/50 hover:bg-white/10 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-blue-400">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-sm">{item.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="pt-4">
                                    <Link href="/academy" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/25 hover:-translate-y-1">
                                        {locale === 'en' ? 'Explore Academy Programs' : 'Jelajahi Program Akademi'}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={200}>
                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                                        alt="Team Learning" 
                                        fill 
                                        className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-80" />
                                </div>
                                
                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-glass-border/30 animate-bounce" style={{ animationDuration: '4s' }}>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white">500+</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alumni Sukses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 07. Career Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {locale === 'en' ? 'Careers' : 'Karir'}
                        </span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Opportunities & Talent Development' : 'Peluang & Pengembangan Bakat'}
                        </h3>
                        <p className="text-sm text-text-gray leading-relaxed max-w-md mx-auto">
                            {locale === 'en' 
                                ? 'Join our team or build your career with leading corporations. Explore our vacancies.'
                                : 'Bergabunglah dengan tim kami atau bangun karir Anda bersama korporasi terkemuka. Jelajahi lowongan kami.'}
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-glass-bg/50 border border-glass-border p-8 rounded-2xl text-center space-y-6 shadow-md">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-base font-bold text-text-main">{locale === 'en' ? 'Job Board & Talent Pool' : 'Papan Lowongan Kerja'}</h4>
                            <p className="text-xs text-text-gray leading-relaxed">
                                {locale === 'en'
                                    ? 'Submit your CV or apply for open tech positions in our network.'
                                    : 'Kirimkan CV Anda atau lamar posisi teknologi yang terbuka di jaringan kami.'}
                            </p>
                        </div>
                        <Link href="/job-connect" className="inline-flex items-center justify-center w-full px-5 py-3 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-dark transition-colors cursor-pointer">
                            {locale === 'en' ? 'Explore Career Opportunities' : 'Jelajahi Lowongan Pekerjaan'} &rarr;
                        </Link>
                        <div className="text-[10px] text-text-muted italic pt-2">
                            {locale === 'en'
                                ? '* Note: IT Headhunting & IT Outsourcing are mapped under Solutions.'
                                : '* Catatan: Layanan IT Headhunting & IT Outsourcing berada di bawah Solutions.'}
                        </div>
                    </div>
                </div>
            </section>

            {/* 08. Industries Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Industries</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Digital Solutions for Every Industry' : 'Solusi Digital untuk Setiap Industri'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {(locale === 'en' ? [
                            'Government', 'Education', 'Healthcare', 'Finance & Banking',
                            'Retail & E-commerce', 'Manufacturing', 'Hospitality',
                            'Technology & SaaS', 'Professional Services', 'Logistics'
                        ] : [
                            'Pemerintah', 'Pendidikan', 'Kesehatan', 'Keuangan & Perbankan',
                            'Ritel & E-commerce', 'Manufaktur', 'Perhotelan',
                            'Teknologi & SaaS', 'Layanan Profesional', 'Logistik'
                        ]).map((ind, idx) => (
                            <SpotlightCard key={idx} className="p-4 text-center flex items-center justify-center min-h-[60px] cursor-default hover:border-brand-blue/30 transition-all duration-300">
                                <span className="text-xs font-bold text-text-main">{ind}</span>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 09. Why Diggity Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Why Diggity</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'More Than a Digital Agency' : 'Lebih Dari Sekadar Agensi Digital'}
                        </h2>
                    </div>

                    {/* Balanced 3-Column Grid: 5 Core Cards + 1 CTA Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {[
                            { title: 'End-to-End Capability', descId: 'Solusi terintegrasi mencakup Teknologi, AI, Creative, Marketing, Cloud, dan Consulting.', descEn: 'Integrated solutions covering Technology, AI, Creative, Marketing, Cloud, and Consulting.' },
                            { title: 'Product Mindset', descId: 'Kami membangun produk digital yang dapat diskalakan (scalable), modular, dan maintainable, bukan sekadar proyek sementara.', descEn: 'We build scalable, modular, and maintainable digital products, not just temporary projects.' },
                            { title: 'Business Driven', descId: 'Teknologi hanya berhasil jika mendorong ROI bisnis klien, konversi penjualan, dan efisiensi indikator.', descEn: 'Technology only succeeds when it drives client ROI, sales conversions, and business efficiency.' },
                            { title: 'Integrated Ecosystem', descId: 'Alur kerja yang padu menyinkronkan Solutions, Produk SaaS, dan Academy untuk kesiapan keterampilan tim.', descEn: 'Cohesive workflow syncing Solutions, SaaS Products, and Academy for workforce skills.' },
                            { title: 'Long-Term Partnership', descId: 'Kami mendampingi Anda melewati setiap fase: dari Build dan Grow hingga Scale dan Empower.', descEn: 'We walk with you through every phase: from Build and Grow to Scale and Empower.' }
                        ].map((val, idx) => (
                            <SpotlightCard key={idx} className="p-6 space-y-3 flex flex-col justify-between border border-glass-border">
                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-base font-extrabold text-text-main">{val.title}</h4>
                                    <p className="text-xs text-text-gray leading-relaxed">
                                        {locale === 'en' ? val.descEn : val.descId}
                                    </p>
                                </div>
                            </SpotlightCard>
                        ))}

                        {/* 6th Slot CTA Card for Balance */}
                        <SpotlightCard className="p-6 flex flex-col justify-between border border-brand-blue/20 bg-brand-blue/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
                            <div className="space-y-3 z-10">
                                <div className="w-8 h-8 rounded-lg bg-brand-blue/25 flex items-center justify-center text-brand-blue">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <h4 className="text-base font-extrabold text-text-main">
                                    {locale === 'en' ? 'Start Your Project' : 'Mulai Proyek Anda'}
                                </h4>
                                <p className="text-xs text-text-gray leading-relaxed">
                                    {locale === 'en' 
                                        ? 'Transform your business with our dynamic tech ecosystem today.'
                                        : 'Transformasikan bisnis Anda bersama ekosistem teknologi dinamis kami hari ini.'}
                                </p>
                            </div>
                            <Link href="#contact" className="mt-4 inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group cursor-pointer z-10">
                                <span>{locale === 'en' ? 'Get Free Consultation' : 'Konsultasi Gratis Sekarang'}</span>
                                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 10. Portfolio Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 text-left">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Portfolio
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                {locale === 'en' ? 'Our Featured Work' : 'Karya Pilihan Kami'}
                            </h2>
                        </div>
                        <Link href="/portfolio" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0 cursor-pointer">
                            {locale === 'en' ? 'View All Portfolio' : 'Lihat Semua Portofolio'} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Dual Divisions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SpotlightCard className="p-6 space-y-3 text-left border border-glass-border">
                            <h4 className="text-lg font-bold text-text-main">IT Portfolio</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Website • Mobile App • Software • ERP • AI • Digital Platforms</p>
                            <div className="pt-2">
                                <Link href="/portfolio?tab=it" className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                                    Explore IT Projects &rarr;
                                </Link>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 space-y-3 text-left border border-glass-border">
                            <h4 className="text-lg font-bold text-text-main">Marketing &amp; Creative Portfolio</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Branding • Campaigns • Social Media • Design • Video • Digital Ads</p>
                            <div className="pt-2">
                                <Link href="/portfolio?tab=marketing" className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                                    Explore Marketing Projects &rarr;
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* Portfolios dynamic viewer - Limited to 3 cards max */}
                    <div className="mt-8">
                        <HomePortfolios portfolios={portfolios.slice(0, 3)} />
                    </div>
                </div>
            </section>

            {/* 11. Success Stories Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Success Stories</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Turning Challenges into Business Impact' : 'Mengubah Tantangan Menjadi Dampak Bisnis'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {portfolios.slice(0, 3).map((item, idx) => (
                            <SpotlightCard key={idx} className="p-6 space-y-4 flex flex-col justify-between border border-glass-border">
                                <div className="space-y-3">
                                    <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-[9px] font-bold uppercase rounded tracking-wider">
                                        Case: {item.client || 'Enterprise'}
                                    </span>
                                    <h4 className="text-base font-extrabold text-text-main">{item.title}</h4>
                                    <div className="text-xs text-text-gray space-y-3 pt-2">
                                        <div>
                                            <span className="font-extrabold text-text-main block mb-0.5">Challenge:</span>
                                            <p className="line-clamp-2 leading-relaxed">{item.problem}</p>
                                        </div>
                                        <div>
                                            <span className="font-extrabold text-text-main block mb-0.5">Solution:</span>
                                            <p className="line-clamp-2 leading-relaxed">{item.solution}</p>
                                        </div>
                                        {item.result && (
                                            <div>
                                                <span className="font-extrabold text-text-main block mb-0.5">Impact:</span>
                                                <p className="line-clamp-2 text-brand-blue font-bold leading-relaxed">{item.result}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Link href={`/portfolio/${item.slug}`} className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline mt-4 cursor-pointer">
                                    {locale === 'en' ? 'Read Case Study' : 'Baca Selengkapnya'} &rarr;
                                </Link>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. Partnership Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Partnership</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Grow Together With Diggity' : 'Tumbuh Bersama Diggity'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Strategic Partnership', descId: 'Perluas batasan layanan Anda', descEn: 'Expand service boundaries' },
                            { title: 'Technology Partnership', descId: 'Membangun bersama alat teknologi', descEn: 'Co-build core digital tools' },
                            { title: 'Agency Partnership', descId: 'Subkontrak & tingkatkan skala output', descEn: 'Subcontract & scale output' },
                            { title: 'Referral Program', descId: 'Kenalkan klien & dapatkan imbalan', descEn: 'Introduce clients & earn rewards' }
                        ].map((part, idx) => (
                            <SpotlightCard key={idx} className="p-6 text-left space-y-2 flex flex-col justify-between border border-glass-border">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-extrabold text-text-main">{part.title}</h4>
                                    <p className="text-[11px] text-text-gray leading-tight">
                                        {locale === 'en' ? part.descEn : part.descId}
                                    </p>
                                </div>
                                <Link href="/partnership" className="text-[10px] font-bold text-brand-blue hover:underline mt-4 cursor-pointer">
                                    {locale === 'en' ? 'Join Network' : 'Bergabung Jaringan'} &rarr;
                                </Link>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. Testimonials Section (Slider Carousel) */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center space-y-4 mb-16">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                {locale === 'en' ? 'Client Validation' : 'Validasi Klien'}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                {locale === 'en' ? 'Feedback Reports' : 'Laporan Hasil Umpan Balik'}
                            </h3>
                        </div>

                        {/* Testimonials Slider Component */}
                        <HomeTestimonials testimonials={testimonials} locale={locale} />
                    </div>
                </section>
            )}

            {/* 14. Insights Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 text-left">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Insights
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Ideas, Knowledge &amp; <span className="text-brand-blue">Digital Perspectives</span>
                            </h2>
                        </div>
                        <Link href="/insights" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0 cursor-pointer">
                            Explore Insights <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => {
                                const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                                const imageUrl = blog.image 
                                    ? `${storageUrl}/${blog.image}` 
                                    : 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80';
                                return (
                                    <Link key={blog.id} href={`/insights/${blog.slug}`} className="group block space-y-4 cursor-pointer">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-glass-border">
                                            <Image src={imageUrl} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">{blog.category?.name || 'Education'}</span>
                                            <h4 className="text-base font-extrabold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2">{blog.title}</h4>
                                            <p className="text-xs text-text-gray line-clamp-2 leading-relaxed">
                                                {blog.meta_description || blog.content.replace(/<[^>]*>/g, '').slice(0, 120)}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-3 text-center text-xs text-text-muted py-8">
                                No articles found.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            </div>

            {/* 15. Final CTA & Contact Section */}
            <section id="contact" className="py-20 border-t border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                    <SpotlightCard className="relative overflow-hidden" style={{ padding: '60px 40px', borderRadius: '24px' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent pointer-events-none" />
                        <div className="relative z-20 max-w-3xl mx-auto text-center space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main leading-tight animate-fade-in">
                                Ready to Build What&apos;s Next?
                            </h2>
                            <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                                {locale === 'en'
                                    ? 'Let\'s transform your ideas, challenges, and opportunities into digital solutions that make a real impact.'
                                    : 'Mari mengubah ide, tantangan, dan peluang Anda menjadi solusi digital yang memberikan dampak nyata.'}
                            </p>
                        </div>
                    </SpotlightCard>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Text Content */}
                        <div className="space-y-8 lg:sticky lg:top-32 text-left">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight">
                                    {locale === 'en' ? 'Let\'s Build Something Great Together' : 'Mari Bangun Sesuatu yang Hebat Bersama'}
                                </h3>
                            </div>
                            
                            <p className="text-text-gray text-base leading-relaxed">
                                {locale === 'en'
                                    ? 'Have a digital product idea, need help with ads/SEO, or seeking reliable VPS cloud hosting? Contact us today for a free expert consultation.'
                                    : 'Punya ide produk digital, butuh bantuan pemasaran ads/SEO, atau mencari server hosting handal untuk infrastruktur IT perusahaan Anda? Hubungi kami sekarang dan dapatkan analisis bisnis gratis dari pakar kami.'}
                            </p>

                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>{locale === 'en' ? 'Free consultation with no commitments' : 'Konsultasi gratis tanpa komitmen apa-apa'}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>{locale === 'en' ? 'Web performance analysis & SEO audit' : 'Analisis performa web & audit SEO dasar'}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-text-main">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                    <span>{locale === 'en' ? 'Best Value Guarantee pricing packages' : 'Tawaran harga khusus (Best Value Guarantee)'}</span>
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
