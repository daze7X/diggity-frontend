import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Service, Portfolio, Testimonial } from '../lib/api';
import ContactForm from '../components/ContactForm';
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

    try {
        // Fetch data concurrently from Laravel API
        const [servicesRes, portfoliosRes, testimonialsRes] = await Promise.all([
            api.getServices(),
            api.getPortfolios(),
            api.getTestimonials(),
        ]);
        services = servicesRes.slice(0, 4); // Limit to top 4 services
        portfolios = portfoliosRes.slice(0, 3); // Limit to top 3 portfolios
        testimonials = testimonialsRes;
    } catch (error) {
        console.error('Error fetching home page data:', error);
    }

    const stats = [
        { value: '150+', label: 'Happy Clients' },
        { value: '300+', label: 'Projects Completed' },
        { value: '99%', label: 'Success Rate' },
        { value: '8+', label: 'Years Experience' },
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] -z-10" />

            {/* 1. Hero Section */}
            <section className="relative pt-36 pb-20 md:pt-48 md:pb-28">
                <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-semibold text-amber-500">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Agensi Digital Kreatif Terintegrasi</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
                        Build. Grow. Scale.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300">
                            Digital Performance.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
                        Kami membantu bisnis Anda bersinar di dunia digital melalui perancangan software tangguh, strategi pertumbuhan pemasaran, dan infrastruktur cloud handal.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-neutral-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
                        >
                            Mulai Konsultasi
                        </Link>
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors"
                        >
                            Lihat Portfolio
                            <ArrowRight className="ml-2 w-4.5 h-4.5" />
                        </Link>
                    </div>

                    {/* Stats counters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center space-y-1">
                                <div className="text-3xl md:text-5xl font-black text-white">{stat.value}</div>
                                <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Services Section */}
            <section className="py-20 bg-neutral-950/50 border-t border-b border-neutral-900">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                                Layanan Kami
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                Solusi Digital Ujung-ke-Ujung
                            </h3>
                        </div>
                        <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
                            Kami memadukan desain visual premium dengan performa teknologi modern untuk menghadirkan hasil yang optimal bagi bisnis Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {services.length > 0 ? (
                            services.map((service: any) => {
                                const IconComponent = iconMap[service.icon || 'code'] || Code;
                                return (
                                    <div
                                        key={service.id}
                                        className="bg-neutral-900/40 border border-neutral-800/60 p-8 rounded-2xl space-y-6 hover:border-amber-500/40 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-bold text-white">{service.name}</h4>
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center text-neutral-600 py-10">
                                Belum ada data layanan di database.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Featured Portfolio Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-end justify-between mb-16">
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                                Studi Kasus
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                Hasil Kerja Unggulan
                            </h3>
                        </div>
                        <Link
                            href="/portfolio"
                            className="hidden md:inline-flex items-center text-sm font-bold text-amber-500 hover:text-amber-400"
                        >
                            Semua Portfolio
                            <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {portfolios.length > 0 ? (
                            portfolios.map((portfolio: any) => (
                                <Link
                                    key={portfolio.id}
                                    href={`/portfolio/${portfolio.slug}`}
                                    className="group bg-neutral-900 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full"
                                >
                                    <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center border-b border-neutral-800">
                                        {portfolio.image ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.image}`}
                                                alt={portfolio.title}
                                                fill
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-neutral-600">
                                                <Code className="w-10 h-10" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Project Showcase</span>
                                            </div>
                                        )}
                                        {portfolio.category && (
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-full text-xs font-bold text-amber-500">
                                                {portfolio.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
                                                {portfolio.title}
                                            </h4>
                                            <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                                                {portfolio.problem}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-amber-500 uppercase tracking-widest pt-2 group-hover:translate-x-1 transition-transform">
                                            Baca Studi Kasus
                                            <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-neutral-600 py-10">
                                Belum ada data portofolio di database.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-neutral-950/30 border-t border-neutral-900">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                                Testimoni
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                Apa Kata Klien Kami
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((test: any) => (
                                <div
                                    key={test.id}
                                    className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-6 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-1 text-amber-500">
                                            {[...Array(test.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-500" />
                                            ))}
                                        </div>
                                        <p className="text-sm md:text-base italic text-neutral-300 leading-relaxed">
                                            &ldquo;{test.review}&rdquo;
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-neutral-800/60">
                                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-white text-sm">
                                            {test.client_name[0]}
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-white">{test.client_name}</h5>
                                            <p className="text-xs text-neutral-500">{test.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Contact Section */}
            <section id="contact" className="py-20 border-t border-neutral-900">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Text Content */}
                        <div className="space-y-8 lg:sticky lg:top-32">
                            <div className="space-y-4">
                                <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                                    Hubungi Kami
                                </h2>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                    Mari Bangun Sesuatu yang Hebat Bersama
                                </h3>
                            </div>
                            
                            <p className="text-neutral-400 text-base leading-relaxed">
                                Punya ide produk digital, butuh bantuan pemasaran ads/SEO, atau mencari server hosting handal untuk infrastruktur IT perusahaan Anda? Hubungi kami sekarang dan dapatkan analisis bisnis gratis dari pakar kami.
                            </p>

                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                    <span>Konsultasi gratis tanpa komitmen apa-apa</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                    <span>Analisis performa web & audit SEO dasar</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                    <span>Tawaran harga khusus (Best Value Guarantee)</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
