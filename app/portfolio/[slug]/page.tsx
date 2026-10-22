import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Portfolio } from '../../../lib/api';
import { 
    ArrowLeft, 
    Calendar, 
    User, 
    Cpu, 
    AlertCircle, 
    Compass, 
    Settings, 
    CheckCircle2,
    Sparkles,
    Star,
    ArrowRight,
    Layers,
    Check,
    MessageSquare
} from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';
import PortfolioGallery from '../../../components/PortfolioGallery';
import { getLocaleServer } from '../../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function PortfolioDetail({ params }: Props) {
    const { slug } = await params;
    const locale = await getLocaleServer();
    const isEn = locale === 'en';
    let portfolio: Portfolio | null = null;
    let relatedPortfolios: Portfolio[] = [];

    try {
        portfolio = await api.getPortfolioBySlug(slug);
        const all = await api.getPortfolios().catch(() => []);
        relatedPortfolios = all.filter((p: Portfolio) => p.slug !== slug).slice(0, 3);
    } catch (error) {
        console.error('Error fetching portfolio details:', error);
    }

    if (!portfolio) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">
                    {isEn ? 'Case Study Not Found' : 'Studi Kasus Tidak Ditemukan'}
                </h1>
                <Link href="/solutions#portfolio" className="text-brand-blue hover:underline">
                    {isEn ? 'Back to Portfolio' : 'Kembali ke Portofolio'}
                </Link>
            </div>
        );
    }

    return (
        <div className="relative pt-36 pb-24 md:pt-44 md:pb-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* 1. Back Navigation Button */}
                <Link
                    href="/solutions#portfolio"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {isEn ? 'Back to All Portfolios' : 'Kembali ke Semua Portofolio'}
                </Link>

                {/* 2. Project Overview (Header) */}
                <div className="space-y-4 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                        {portfolio.category && (
                            <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                {portfolio.category.name}
                            </span>
                        )}
                        <span className="text-xs text-text-muted font-medium">
                            {isEn ? 'Verified Project Showcase' : 'Studi Kasus Proyek Terverifikasi'}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                        {portfolio.title}
                    </h1>

                    {portfolio.solution && (
                        <p className="text-base md:text-lg text-text-gray leading-relaxed font-medium">
                            {portfolio.solution}
                        </p>
                    )}
                </div>

                {/* 3. Structured Project Metadata Card */}
                <SpotlightCard className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 text-sm text-left border border-glass-border">
                    {/* Client */}
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <User className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{isEn ? 'Client' : 'Klien'}</span>
                        </div>
                        <div className="font-semibold text-text-main">{portfolio.client || 'Enterprise Client'}</div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{isEn ? 'Duration' : 'Durasi'}</span>
                        </div>
                        <div className="font-semibold text-text-main">{portfolio.duration || '3 - 4 Bulan'}</div>
                    </div>

                    {/* Services */}
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <Layers className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{isEn ? 'Service Scope' : 'Layanan'}</span>
                        </div>
                        <div className="font-semibold text-text-main">{portfolio.category?.name || 'IT & Digital Solutions'}</div>
                    </div>

                    {/* Technology Stack */}
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <Cpu className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{isEn ? 'Technology' : 'Teknologi'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                            {portfolio.technologies && portfolio.technologies.length > 0 ? (
                                portfolio.technologies.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="px-2 py-0.5 bg-brand-blue/10 border border-brand-blue/20 rounded text-[11px] text-brand-blue font-medium">
                                        {tech}
                                    </span>
                                ))
                            ) : (
                                <span className="text-text-muted text-xs">Standard Stack</span>
                            )}
                        </div>
                    </div>
                </SpotlightCard>

                {/* 4. Gallery & Visual Preview */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted text-left">
                        {isEn ? 'Project Gallery & Visual Preview' : 'Galeri Tampilan & Dokumentasi Proyek'}
                    </h3>
                    <PortfolioGallery 
                        images={portfolio.gallery} 
                        coverImage={portfolio.image} 
                        title={portfolio.title} 
                    />
                </div>

                {/* 5. Detailed Case Study Sections (Project Details) */}
                <div className="space-y-10 pt-4 text-left">
                    
                    {/* A. Challenge / Problem */}
                    {portfolio.problem && (
                        <div className="space-y-3 p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                            <div className="flex items-center space-x-3 text-rose-500">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <h2 className="text-lg font-bold text-text-main">
                                    {isEn ? 'The Challenge & Problem' : 'Tantangan & Masalah Klien'}
                                </h2>
                            </div>
                            <p className="text-sm text-text-gray leading-relaxed pl-8">
                                {portfolio.problem}
                            </p>
                        </div>
                    )}

                    {/* B. Strategy & Approach */}
                    {portfolio.strategy && (
                        <div className="space-y-3 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                            <div className="flex items-center space-x-3 text-brand-blue">
                                <Compass className="w-5 h-5 shrink-0" />
                                <h2 className="text-lg font-bold text-text-main">
                                    {isEn ? 'Strategic Approach & Roadmap' : 'Strategi Pendekatan & Roadmap'}
                                </h2>
                            </div>
                            <p className="text-sm text-text-gray leading-relaxed pl-8">
                                {portfolio.strategy}
                            </p>
                        </div>
                    )}

                    {/* C. Execution & Implementation */}
                    {portfolio.execution && (
                        <div className="space-y-3 p-6 rounded-2xl bg-neutral-950/5 dark:bg-white/5 border border-glass-border">
                            <div className="flex items-center space-x-3 text-text-main">
                                <Settings className="w-5 h-5 text-brand-blue shrink-0" />
                                <h2 className="text-lg font-bold text-text-main">
                                    {isEn ? 'Execution & Technical Deliverables' : 'Eksekusi & Deliverables Teknis'}
                                </h2>
                            </div>
                            <p className="text-sm text-text-gray leading-relaxed pl-8">
                                {portfolio.execution}
                            </p>
                        </div>
                    )}

                    {/* D. Results & Verified Business Impact */}
                    {portfolio.result && (
                        <SpotlightCard className="p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-emerald-500">
                                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                                    <h2 className="text-xl font-bold text-text-main">
                                        {isEn ? 'Final Results & Business Impact' : 'Hasil Akhir & Dampak Bisnis Terverifikasi'}
                                    </h2>
                                </div>
                                <p className="text-base text-text-main font-semibold leading-relaxed pl-9">
                                    {portfolio.result}
                                </p>
                            </div>
                        </SpotlightCard>
                    )}

                    {/* E. Client Testimonial (if available) */}
                    {portfolio.testimonial && (
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center space-x-2 text-yellow-500">
                                <Sparkles className="w-5 h-5" />
                                <h3 className="text-base font-bold text-text-main">
                                    {isEn ? 'Client Feedback' : 'Umpan Balik Klien'}
                                </h3>
                            </div>
                            
                            <SpotlightCard className="p-8 bg-glass-bg/20 border border-glass-border/40 rounded-2xl relative overflow-hidden">
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(portfolio.testimonial.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="text-sm md:text-base text-text-main italic leading-relaxed">
                                        &ldquo;{portfolio.testimonial.review || portfolio.testimonial.message}&rdquo;
                                    </p>
                                    <div className="text-sm font-bold text-text-main">
                                        {portfolio.testimonial.client_name || portfolio.testimonial.name}
                                        <span className="text-xs text-text-muted font-normal block">
                                            {portfolio.testimonial.company}
                                        </span>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    )}
                </div>

                {/* 6. Related Projects (Portfolio Lain yang Relevan) */}
                {relatedPortfolios.length > 0 && (
                    <div className="space-y-6 pt-10 border-t border-glass-border text-left">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-text-main">
                                {isEn ? 'Related Projects' : 'Proyek Terkait Lainnya'}
                            </h3>
                            <Link href="/solutions#portfolio" className="text-xs font-bold text-brand-blue hover:underline">
                                {isEn ? 'View All' : 'Lihat Semua'} &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPortfolios.map((item) => (
                                <Link key={item.id} href={`/portfolio/${item.slug}`} className="block group">
                                    <SpotlightCard className="p-5 h-full flex flex-col justify-between border border-glass-border hover:border-brand-blue/30 transition-all">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                                                {item.category?.name || 'Case Study'}
                                            </span>
                                            <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-text-gray line-clamp-2 leading-relaxed">
                                                {item.problem}
                                            </p>
                                        </div>
                                        <span className="text-[11px] font-bold text-brand-blue mt-4 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                            {isEn ? 'Read Details' : 'Lihat Detail'} <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </SpotlightCard>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 7. Action CTA Section */}
                <SpotlightCard className="p-10 text-center rounded-3xl border border-glass-border bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-blue/5 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-main">
                        {isEn ? 'Ready to Build a Similar Project?' : 'Tertarik Membangun Proyek Serupa?'}
                    </h3>
                    <p className="text-sm text-text-gray max-w-lg mx-auto">
                        {isEn
                            ? 'Consult your digital transformation needs with our expert engineers and strategic consultants.'
                            : 'Konsultasikan kebutuhan transformasi digital dan produk Anda bersama tim ahli Diggity tanpa biaya komitmen awal.'}
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>{isEn ? 'Consult with Us Today' : 'Konsultasikan Proyek Serupa Sekarang'}</span>
                        </Link>
                    </div>
                </SpotlightCard>

            </div>
        </div>
    );
}
