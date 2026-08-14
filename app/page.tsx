import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Service, Portfolio, Testimonial, Product, Blog } from '../lib/api';
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
    ArrowUpRight
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
                {/* Dynamic Background SVGs from Haikei */}
                <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
                    {/* Light Mode Background */}
                    <Image
                        src="/images/hero-bg-light.svg"
                        alt="Hero Background Light"
                        fill
                        priority
                        className="block dark:hidden object-cover object-center opacity-45"
                    />
                    {/* Dark Mode Background */}
                    <Image
                        src="/images/hero-bg-dark.svg"
                        alt="Hero Background Dark"
                        fill
                        priority
                        className="hidden dark:block object-cover object-center opacity-25"
                    />
                </div>

                {/* Center Radial Glow Spotlight */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/8 dark:bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

                <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight text-text-main leading-tight max-w-4xl mx-auto">
                        Build. Grow. Scale.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-blue-500 dark:from-brand-blue dark:via-blue-400 dark:to-blue-300">
                            Empower.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-gray max-w-3xl mx-auto font-medium">
                        {locale === 'en' 
                            ? 'We build digital solutions, grow businesses through technology, and empower communities through continuous learning.'
                            : 'Kami membangun solusi digital, mengembangkan bisnis melalui teknologi, dan memberdayakan masyarakat melalui pembelajaran berkelanjutan.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/about"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15"
                        >
                            {locale === 'en' ? 'Explore Diggity' : 'Jelajahi Diggity'}
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-text-main bg-glass-bg border border-glass-border rounded-xl hover:border-brand-blue/40 transition-colors"
                        >
                            {locale === 'en' ? 'Talk to Our Team' : 'Hubungi Tim Kami'}
                            <ArrowRight className="ml-2 w-4.5 h-4.5" />
                        </Link>
                    </div>

                    {/* 2. Trusted By Section (Client Logos Marquee) */}
                    <div className="pt-16 max-w-5xl mx-auto">
                        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">
                            {locale === 'en' ? 'Trusted by forward-thinking businesses and organizations' : 'Dipercaya oleh berbagai bisnis, organisasi, dan institusi'}
                        </p>

                        {/* Premium Rounded Glass Capsule */}
                        <div className="relative py-6 px-8 bg-glass-bg/10 dark:bg-glass-bg/5 backdrop-blur-sm border border-glass-border/30 rounded-3xl overflow-hidden flex">
                            {/* Soft fade gradients on edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none rounded-l-3xl" />
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none rounded-r-3xl" />

                            <div className="animate-marquee flex items-center space-x-16 shrink-0 pr-16">
                                {settings && settings.partner_logos && settings.partner_logos.length > 0 ? (
                                    [...settings.partner_logos, ...settings.partner_logos].map((logo: string, idx: number) => {
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
                                    })
                                ) : (
                                    ['GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON'].map((logo, idx) => (
                                        <div key={idx} className="flex items-center justify-center h-10 w-32 shrink-0 grayscale opacity-50 dark:opacity-30">
                                            <span className="font-black text-xl text-text-main tracking-widest">{logo}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient fade-out overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-transparent pointer-events-none z-10" />
            </section>

            {/* 3. What We Do Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {locale === 'en' ? 'What We Do' : 'Apa Yang Kami Lakukan'}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'One Digital Ecosystem. Three Ways to Grow.' : 'Satu Ekosistem Digital. Tiga Cara Tumbuh.'}
                        </h2>
                        <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto">
                            {locale === 'en' 
                                ? 'Diggity assists businesses and organizations through three core ecosystems.'
                                : 'Diggity membantu bisnis dan organisasi melalui tiga ekosistem utama.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. Solutions */}
                        <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-text-main">SOLUTIONS (BUILD &amp; GROW)</h3>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    {locale === 'en'
                                        ? 'Build and grow your business through technology, AI, creative, marketing, cloud, cybersecurity, and consulting.'
                                        : 'Membangun dan mengembangkan bisnis melalui teknologi, AI, creative, marketing, cloud, cybersecurity, dan consulting.'}
                                </p>
                            </div>
                            <Link href="/solutions" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group mt-4">
                                <span>Explore Solutions</span>
                                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </SpotlightCard>

                        {/* 2. Products */}
                        <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-text-main">PRODUCTS (SCALE)</h3>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    {locale === 'en'
                                        ? 'Ready-to-use digital products to improve efficiency, productivity, automation, and scalability.'
                                        : 'Produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomatisasi, dan skalabilitas.'}
                                </p>
                            </div>
                            <Link href="/products" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group mt-4">
                                <span>Explore Products</span>
                                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </SpotlightCard>

                        {/* 3. Academy */}
                        <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between text-left h-full">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-text-main">ACADEMY (EMPOWER)</h3>
                                <p className="text-sm text-text-gray leading-relaxed">
                                    {locale === 'en'
                                        ? 'Education and competency development for individuals and corporate teams.'
                                        : 'Pendidikan dan pengembangan kompetensi untuk individu maupun organisasi.'}
                                </p>
                            </div>
                            <Link href="/academy" className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark group mt-4">
                                <span>Explore Academy</span>
                                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 4. Solutions Section */}
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
                        <Link href="/solutions" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0">
                            Explore All Solutions <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Code className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Technology Solutions</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Website, Mobile App, Software Development, ERP Systems, and Custom Platforms.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">AI &amp; Emerging Technology</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Artificial Intelligence, Robotic Process Automation, Machine Learning, and Big Data.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Palette className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Creative &amp; Brand Experience</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Branding Strategy, UI/UX Design, Creative Writing, and Video Production.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Growth Marketing</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Search Engine Optimization (SEO), Paid Ads (Google/Meta), Social Media, and E-commerce.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Cloud className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Cloud &amp; Cyber Security</h4>
                            <p className="text-xs text-text-gray leading-relaxed">Cloud Infrastructure, DevOps Automation, Security Audits, and Quality Assurance.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-text-main">Consulting &amp; Digital Transformation</h4>
                            <p className="text-xs text-text-gray leading-relaxed">IT Roadmapping, Enterprise Digital Architecture, and Change Management.</p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 text-left space-y-4 md:col-span-2 lg:col-span-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-2">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-base font-extrabold text-text-main">IT Talent &amp; Workforce Solutions</h4>
                                    <p className="text-xs text-text-gray leading-relaxed">IT Headhunting, Outsourcing, and Tech Talent Recruitment Management.</p>
                                </div>
                                <Link href="/solutions/it-headhunting" className="px-5 py-2.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-dark transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                                    Explore Talent Solutions <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 5. Products Section */}
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
                        <Link href="/products" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0">
                            Explore All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Product Category Tags */}
                    <div className="flex flex-wrap gap-2">
                        {['Business Software', 'AI Products', 'Cloud Products', 'Digital Marketplace'].map((cat, idx) => (
                            <span key={idx} className="px-3.5 py-1.5 bg-glass-bg border border-glass-border text-text-main rounded-full text-xs font-bold">
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.length > 0 ? (
                            products.map((prod) => (
                                <SpotlightCard key={prod.id} className="p-6 text-left flex flex-col justify-between h-full min-h-[180px]">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-lg font-extrabold text-text-main">{prod.name}</h4>
                                            {prod.is_popular && (
                                                <span className="px-2 py-0.5 bg-brand-blue/15 text-brand-blue text-[9px] font-black uppercase rounded">Popular</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-text-gray leading-relaxed line-clamp-3">{prod.description}</p>
                                    </div>
                                    <div className="pt-4 border-t border-glass-border/40 mt-4 flex items-center justify-between">
                                        <span className="text-xs font-black text-brand-blue">
                                            {prod.price > 0 ? `Rp ${new Intl.NumberFormat('id-ID').format(prod.price)} / ${prod.billing_period}` : 'Custom Pricing'}
                                        </span>
                                        <Link href={`/products/${prod.slug}`} className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                                            View Product <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-xs text-text-muted py-8">
                                No featured products available in the database yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 6. Academy Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 text-left">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Academy
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                                Learn. Build Skills. <span className="text-brand-blue">Empower Your Future.</span>
                            </h2>
                        </div>
                        <Link href="/academy" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0">
                            Explore Academy <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Bootcamp', desc: 'Intensive engineering training' },
                            { name: 'Online Course', desc: 'Self-paced video modules' },
                            { name: 'Corporate Training', desc: 'Upskilling employee workforce' },
                            { name: 'Professional Certification', desc: 'Industry recognized credentials' },
                            { name: 'Workshop', desc: 'Hands-on practice classes' },
                            { name: 'Webinar', desc: 'Expert dynamic insights' },
                            { name: 'E-Book', desc: 'Guides & programming books' },
                            { name: 'Learning Ecosystem', desc: 'Complete LMS portal' }
                        ].map((item, idx) => (
                            <SpotlightCard key={idx} className="p-5 text-left space-y-1">
                                <h4 className="text-xs font-extrabold text-text-main">{item.name}</h4>
                                <p className="text-[10px] text-text-gray font-medium leading-tight">{item.desc}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Career Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Careers</span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
                            Talent Development &amp; Opportunities
                        </h3>
                        <p className="text-sm text-text-gray leading-relaxed max-w-md mx-auto">
                            Join our partners or build your career with leading corporations. Explore our job board.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-glass-bg/50 border border-glass-border p-6 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-text-main">Job Board &amp; Talent Pool</h4>
                        <p className="text-xs text-text-gray">Submit your CV or apply for open tech positions in our network.</p>
                        <Link href="/job-connect" className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-dark transition-colors">
                            Explore Job Board &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. Industries Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Industries</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            Digital Solutions for <span className="text-brand-blue">Every Industry</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {[
                            'Government', 'Education', 'Healthcare', 'Finance & Banking',
                            'Retail & E-commerce', 'Manufacturing', 'Hospitality',
                            'Technology & SaaS', 'Professional Services', 'Logistics'
                        ].map((ind, idx) => (
                            <div key={idx} className="p-4 border border-glass-border/60 bg-glass-bg/20 rounded-xl text-center flex items-center justify-center min-h-[60px] hover:border-brand-blue/30 transition-all cursor-default">
                                <span className="text-xs font-bold text-text-main">{ind}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Why Diggity Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Why Diggity</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            More Than a <span className="text-brand-blue">Digital Agency</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {[
                            { title: 'End-to-End Capability', desc: 'Integrated solutions covering Technology, AI, Creative, Marketing, Cloud, and Consulting.' },
                            { title: 'Product Mindset', desc: 'We build digital products that are scalable, modular, and maintainable, not just temporary projects.' },
                            { title: 'Business Driven', desc: 'Technology only succeeds when it drives client ROI, sales conversions, and efficiency indicators.' },
                            { title: 'Integrated Ecosystem', desc: 'Cohesive workflow syncing Solutions, SaaS Products, and Academy for workforce skills.' },
                            { title: 'Long-Term Partnership', desc: 'We walk with you through every phase: from Build and Grow to Scale and Empower.' }
                        ].map((val, idx) => (
                            <SpotlightCard key={idx} className="p-6 space-y-3 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-base font-extrabold text-text-main">{val.title}</h4>
                                    <p className="text-xs text-text-gray leading-relaxed">{val.desc}</p>
                                </div>
                            </SpotlightCard>
                        ))}
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
                                Our Proven <span className="text-brand-blue">Work</span>
                            </h2>
                        </div>
                        <Link href="/portfolio" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0">
                            View All Portfolio <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SpotlightCard className="p-8 space-y-4 text-left">
                            <h4 className="text-xl font-bold text-text-main">IT Portfolio</h4>
                            <p className="text-xs text-text-gray">Website • Mobile App • Software • ERP • AI • Digital Platforms</p>
                            <div className="pt-4">
                                <Link href="/portfolio/it" className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline">
                                    View IT Projects &rarr;
                                </Link>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="p-8 space-y-4 text-left">
                            <h4 className="text-xl font-bold text-text-main">Marketing &amp; Creative Portfolio</h4>
                            <p className="text-xs text-text-gray">Branding • Campaigns • Social Media • Design • Video • Digital Ads</p>
                            <div className="pt-4">
                                <Link href="/portfolio/marketing" className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline">
                                    View Marketing Projects &rarr;
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* Portfolios dynamic modal viewer */}
                    <div className="mt-8">
                        <HomePortfolios portfolios={portfolios} />
                    </div>
                </div>
            </section>

            {/* 11. Success Stories Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Success Stories</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                            Turning Challenges into <span className="text-brand-blue">Business Impact</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {portfolios.slice(0, 3).map((item, idx) => (
                            <SpotlightCard key={idx} className="p-6 space-y-4 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-extrabold text-brand-blue uppercase tracking-wider">Case: {item.client || 'Client project'}</h4>
                                    <h5 className="text-base font-extrabold text-text-main">{item.title}</h5>
                                    <div className="text-xs text-text-gray space-y-2">
                                        <div>
                                            <span className="font-bold text-text-main block">Challenge:</span>
                                            <p className="line-clamp-2">{item.problem}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-text-main block">Solution:</span>
                                            <p className="line-clamp-2">{item.solution}</p>
                                        </div>
                                        {item.result && (
                                            <div>
                                                <span className="font-bold text-text-main block">Impact:</span>
                                                <p className="line-clamp-2 text-brand-blue font-semibold">{item.result}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Link href={`/portfolio?slug=${item.slug}`} className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline mt-4">
                                    Read Full Story &rarr;
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
                            Grow Together <span className="text-brand-blue">With Diggity</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Strategic Partnership', desc: 'Expand service boundaries' },
                            { title: 'Technology Partnership', desc: 'Co-build core digital tools' },
                            { title: 'Agency Partnership', desc: 'Subcontract & scale output' },
                            { title: 'Referral Program', desc: 'Introduce clients & earn rewards' }
                        ].map((part, idx) => (
                            <SpotlightCard key={idx} className="p-6 text-left space-y-2 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-extrabold text-text-main">{part.title}</h4>
                                    <p className="text-[11px] text-text-gray leading-tight">{part.desc}</p>
                                </div>
                                <Link href="/partnership" className="text-[10px] font-bold text-brand-blue hover:underline mt-4">
                                    Join Network &rarr;
                                </Link>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
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
                        <Link href="/insights" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 shrink-0">
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
                                    <Link key={blog.id} href={`/insights/${blog.slug}`} className="group block space-y-4">
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

            {/* 15. Final CTA & Contact Section */}
            <section id="contact" className="py-20 border-t border-glass-border">
                <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                    <SpotlightCard className="relative overflow-hidden" style={{ padding: '60px 40px', borderRadius: '24px' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent pointer-events-none" />
                        <div className="relative z-20 max-w-3xl mx-auto text-center space-y-6">
                            <span className="px-3 py-1 bg-brand-blue/15 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-full inline-block">Mulai Sekarang</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main leading-tight animate-fade-in">
                                Ready to Build What&apos;s Next?
                            </h2>
                            <p className="text-text-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                                Mari mengubah ide, tantangan, dan peluang Anda menjadi solusi digital yang memberikan dampak nyata.
                            </p>
                        </div>
                    </SpotlightCard>

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
                                    <span>Analisis performa web &amp; audit SEO dasar</span>
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
