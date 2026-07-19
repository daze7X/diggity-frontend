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
    Sparkles,
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

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function Home() {
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

    const stats = [
        { value: '150+', label: 'Happy Clients' },
        { value: '300+', label: 'Projects Completed' },
        { value: '99%', label: 'Success KPI Rate' },
        { value: '8+', label: 'Years Experience' },
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
            <section className="relative pt-36 pb-20 md:pt-48 md:pb-28">
                <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>DESIGN STUDIO & DIGITAL SYSTEM</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tight text-text-main leading-tight max-w-4xl mx-auto">
                        Build. Grow. Scale.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-blue-500 dark:from-brand-blue dark:via-blue-400 dark:to-blue-300">
                            Digital Architecture.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-gray max-w-2xl mx-auto font-medium">
                        Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-text-main bg-glass-bg border border-glass-border rounded-xl hover:border-brand-blue/40 transition-colors"
                        >
                            Lihat Karya
                            <ArrowRight className="ml-2 w-4.5 h-4.5" />
                        </Link>
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

                    {/* Asymmetric Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
                        {stats.slice(0, 3).map((stat, i) => (
                            <SpotlightCard key={i} className="p-8 text-center flex flex-col justify-center min-h-[140px]">
                                <div className="text-3xl md:text-5xl font-black text-brand-blue">{stat.value}</div>
                                <div className="text-xs md:text-sm text-text-gray font-bold uppercase tracking-wider mt-2">{stat.label}</div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Services Section */}
            <section className="py-20 bg-glass-bg border-t border-b border-glass-border">
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
                                    <SpotlightCard
                                        key={service.id}
                                        className="p-8 space-y-6 animate-fade-in"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-bold text-text-main">{service.name}</h4>
                                            <p className="text-sm text-text-gray leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </SpotlightCard>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SpotlightCard className="p-8 space-y-4">
                            <div className="text-3xl">💰</div>
                            <h4 className="text-lg font-bold text-text-main">Affordable Price</h4>
                            <p className="text-sm text-text-gray leading-relaxed">
                                Solusi bernilai tinggi dengan struktur harga yang kompetitif, transparan, dan disesuaikan dengan budget proyek Anda.
                            </p>
                        </SpotlightCard>
                        <SpotlightCard className="p-8 space-y-4">
                            <div className="text-3xl">👥</div>
                            <h4 className="text-lg font-bold text-text-main">Professional Team</h4>
                            <p className="text-sm text-text-gray leading-relaxed">
                                Didukung oleh engineer senior, UI/UX desainer, dan ahli SEO tersertifikasi dengan pengalaman bertahun-tahun di industri.
                            </p>
                        </SpotlightCard>
                        <SpotlightCard className="p-8 space-y-4">
                            <div className="text-3xl">🏆</div>
                            <h4 className="text-lg font-bold text-text-main">Award Winning</h4>
                            <p className="text-sm text-text-gray leading-relaxed">
                                Diakui secara luas dalam rekayasa solusi arsitektur digital dan optimasi performa konversi yang efektif secara berkelanjutan.
                            </p>
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
