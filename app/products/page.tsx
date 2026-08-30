import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import { api, CategoryHierarchy } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import { 
    Layers, MonitorSmartphone, ArrowRight, Building2, Hexagon, 
    Triangle, Circle, Briefcase, CheckCircle2, Star,
    ShieldCheck, Zap, Headphones, Puzzle, Quote
} from 'lucide-react';
import SubServiceIcon from '../../components/SubServiceIcon';
import FaqAccordion from '../../components/FaqAccordion';
import HomeTestimonials from '../../components/HomeTestimonials'; from '../../components/FaqAccordion';

export const metadata: Metadata = {
    title: 'Products Hub - Diggity Agency',
    description: 'Solusi pengelolaan digital dan aset perangkat lunak terbaik untuk mempercepat bisnis Anda.',
};

export const revalidate = 60;

export default async function ProductsHubPage() {
    const locale = await getLocaleServer();

    let hierarchy: CategoryHierarchy[] = [];
    let faqs: any[] = [];
    let settings: any = null;
    let testimonials: any[] = [];
    try {
        const [hierRes, faqsRes, settingsRes, testimonialsRes] = await Promise.all([
            api.getProductHierarchy(),
            api.getFaqs(),
            api.getSettings(),
            api.getTestimonials(),
        ]);
        hierarchy = hierRes || [];
        faqs = faqsRes || [];
        settings = settingsRes || null;
        testimonials = testimonialsRes || [];
    } catch {
        // Fallback
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 selection:bg-brand-blue/20 text-text-main">
            
            {/* 1. HERO SECTION (Mekari Style - Left/Right) */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pb-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Left: Copy & CTA */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
                            Solusi ekosistem <span className="text-brand-blue">digital terbaik</span> untuk akselerasi bisnis Anda
                        </h1>
                        <p className="text-lg text-text-gray font-medium leading-relaxed max-w-lg">
                            Kelola seluruh aspek operasional, pengembangan teknologi, hingga aset kreatif perusahaan Anda dalam satu platform terintegrasi.
                        </p>
                        
                        {/* Bullet Points */}
                        <div className="flex flex-col gap-3 py-2">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-sm font-bold text-text-main">Sistem terintegrasi untuk seluruh divisi</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-sm font-bold text-text-main">Keamanan data standar enterprise ISO</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-sm font-bold text-text-main">Skalabilitas tanpa batas seiring pertumbuhan</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue-dark transition-all shadow-lg shadow-brand-blue/20">
                                Jadwalkan Demo
                            </Link>
                            <a href="#catalog" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-brand-blue border border-brand-blue/30 font-bold text-sm hover:bg-brand-blue/5 transition-all">
                                Lihat Produk
                            </a>
                        </div>

                        {/* Ratings */}
                        <div className="pt-6 flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <p className="text-xs font-bold text-text-gray uppercase tracking-widest">Gartner & G2 Top Rated</p>
                        </div>
                    </div>
                    
                    {/* Right: Hero Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-brand-blue/5 blur-3xl rounded-full transform scale-110" />
                        <div className="relative rounded-3xl overflow-hidden border border-glass-border shadow-2xl bg-white p-2">
                            <Image 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Dashboard 3D Illustration" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto rounded-2xl object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CLIENT LOGOS (Dynamic Marquee) */}
            <div className="border-y border-glass-border bg-gray-50/50 py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold text-text-muted mb-6 uppercase tracking-widest">
                        {locale === 'en' ? 'Trusted by forward-thinking businesses and organizations' : 'Telah dipercaya oleh +500 klien lintas industri'}
                    </p>
                    
                    <div className="relative flex">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
                        
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
                                            <div key={idx} className="flex items-center justify-center h-10 w-32 relative shrink-0 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
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
                                    <div key={idx} className="flex items-center justify-center h-10 w-32 relative shrink-0 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                                        <span className="font-black text-lg text-text-main tracking-widest">{logo}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. WHY CHOOSE US */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-left mb-12">
                    <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Mengapa memilih Diggity Ecosystem</h2>
                    <p className="text-text-gray font-medium text-lg max-w-2xl">Kami tidak sekadar menjual software, kami memberikan infrastruktur berkelanjutan untuk masa depan perusahaan Anda.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-8 rounded-3xl bg-gray-50 border border-glass-border hover:shadow-lg transition-shadow duration-300">
                        <ShieldCheck className="w-10 h-10 text-brand-blue mb-6" />
                        <h3 className="text-lg font-bold mb-3">Keamanan Enterprise</h3>
                        <p className="text-sm text-text-gray font-medium leading-relaxed">Seluruh data Anda dilindungi dengan enkripsi end-to-end dan standar kepatuhan internasional ISO 27001.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gray-50 border border-glass-border hover:shadow-lg transition-shadow duration-300">
                        <Puzzle className="w-10 h-10 text-brand-blue mb-6" />
                        <h3 className="text-lg font-bold mb-3">Integrasi Tanpa Batas</h3>
                        <p className="text-sm text-text-gray font-medium leading-relaxed">Semua produk kami dirancang untuk saling berbicara lewat API terbuka, mencegah silo data pada bisnis Anda.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gray-50 border border-glass-border hover:shadow-lg transition-shadow duration-300">
                        <Zap className="w-10 h-10 text-brand-blue mb-6" />
                        <h3 className="text-lg font-bold mb-3">Lebih Cepat & Akurat</h3>
                        <p className="text-sm text-text-gray font-medium leading-relaxed">Otomatisasi proses repetitif menggunakan AI, menghemat waktu operasional hingga 70% setiap harinya.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gray-50 border border-glass-border hover:shadow-lg transition-shadow duration-300">
                        <Headphones className="w-10 h-10 text-brand-blue mb-6" />
                        <h3 className="text-lg font-bold mb-3">Dukungan Premium 24/7</h3>
                        <p className="text-sm text-text-gray font-medium leading-relaxed">Tim ahli kami siap mendampingi Anda dari proses implementasi hingga maintenance bergaransi penuh.</p>
                    </div>
                </div>
            </div>

            {/* 4. THE PRODUCTS CATALOG (Clean Minimalist Accordion/List Style) */}
            <div id="catalog" className="bg-gray-50/50 border-y border-glass-border py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Solusi terbaik untuk setiap aspek operasional bisnis</h2>
                        <p className="text-text-gray font-medium text-lg">Jelajahi modul dan produk spesifik kami yang dirancang untuk mengatasi tantangan di setiap divisi perusahaan.</p>
                    </div>

                    <div className="space-y-8">
                        {hierarchy.map((cat, i) => (
                            <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100}>
                                <div className="bg-white rounded-3xl border border-glass-border p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col lg:flex-row gap-12">
                                        
                                        {/* Left Side: Meta Info */}
                                        <div className="w-full lg:w-1/3 shrink-0">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center">
                                                    {cat.slug === 'business-software' ? <Layers className="w-6 h-6 text-brand-blue" /> : <MonitorSmartphone className="w-6 h-6 text-brand-blue" />}
                                                </div>
                                                <h3 className="text-2xl font-black tracking-tight">{cat.name}</h3>
                                            </div>
                                            <p className="text-text-gray font-medium text-sm leading-relaxed mb-6">
                                                {cat.slug === 'business-software' 
                                                    ? 'Rangkaian alat lengkap untuk mengelola dan mengembangkan operasi bisnis Anda dari hulu ke hilir. Tersedia untuk HR, Keuangan, Inventaris, hingga Penjualan.'
                                                    : cat.slug === 'digital-marketplace'
                                                    ? 'Aset digital premium, templat desain, aset 3D, dan sumber daya siap pakai untuk memangkas waktu produksi kreator dan developer Anda.'
                                                    : 'Solusi inovatif masa depan yang disesuaikan untuk mengatasi hambatan skalabilitas secara efisien.'}
                                            </p>
                                            <Link href={`/products/${cat.slug}`} className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-brand-blue-dark">
                                                Pelajari lebih lanjut <ArrowRight className="w-4 h-4 ml-1.5" />
                                            </Link>
                                        </div>

                                        {/* Right Side: Product Grid */}
                                        <div className="w-full lg:w-2/3 lg:border-l lg:border-glass-border lg:pl-12">
                                            {cat.children && cat.children.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {cat.children.map((sub: any) => (
                                                        <Link 
                                                            key={sub.slug} 
                                                            href={`/products/${cat.slug}/${sub.slug}`} 
                                                            className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-brand-blue/5 border border-transparent hover:border-brand-blue/20 transition-all"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-glass-border flex items-center justify-center shrink-0">
                                                                    <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className="w-5 h-5 text-text-gray group-hover:text-brand-blue transition-colors" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-[14px] font-bold text-text-main group-hover:text-brand-blue transition-colors">{sub.name}</h4>
                                                                    <p className="text-[12px] text-text-muted mt-0.5">{sub.products_count || 0} Produk Spesifik</p>
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-brand-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center rounded-2xl border-2 border-dashed border-glass-border bg-gray-50/50">
                                                    <span className="px-4 py-1.5 rounded-full bg-white shadow-sm border border-glass-border text-xs font-bold text-text-gray tracking-widest uppercase mb-3">
                                                        Segera Hadir
                                                    </span>
                                                    <p className="text-sm text-text-gray font-medium">Modul-modul canggih sedang diracik oleh tim R&D kami.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. TESTIMONIALS */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center space-y-4 mb-16">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                        {locale === 'en' ? 'Client Validation' : 'Validasi Klien'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                        {locale === 'en' ? 'What our users say' : 'Apa kata pengguna tentang Diggity'}
                    </h2>
                </div>
                
                <HomeTestimonials testimonials={testimonials} locale={locale} />
            </div>

            {/* 6. FAQ Section */}
            {faqs.length > 0 && (
                <div className="bg-gray-50/50 border-t border-glass-border">
                    <div className="max-w-4xl mx-auto px-6 py-24">
                        <div className="text-center space-y-4 mb-12">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Bantuan</span>
                            <h3 className="text-3xl font-black text-text-main tracking-tight">FAQ Seputar Produk Kami</h3>
                        </div>
                        <div className="text-left bg-white p-8 md:p-10 rounded-3xl border border-glass-border shadow-sm">
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </div>
                </div>
            )}
            
            {/* 7. Bottom CTA */}
            <div className="max-w-7xl mx-auto px-6 pb-12 pt-12">
                <div className="p-12 md:p-16 text-center space-y-8 bg-brand-blue rounded-[2.5rem] shadow-xl relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                        <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Bebaskan potensi bisnis Anda bersama Diggity
                        </h4>
                        <p className="text-lg text-white/80 font-medium leading-relaxed">
                            Mulai perjalanan transformasi digital Anda hari ini. Hubungi tim konsultan kami untuk menemukan solusi paling tepat.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-brand-blue bg-white hover:bg-gray-50 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Jadwalkan Demo Sekarang
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
