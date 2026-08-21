import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../../../lib/api';
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
    Star
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
    let portfolio = null;

    try {
        portfolio = await api.getPortfolioBySlug(slug);
    } catch (error) {
        console.error('Error fetching portfolio details:', error);
    }

    if (!portfolio) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">
                    {locale === 'en' ? 'Case Study Not Found' : 'Studi Kasus Tidak Ditemukan'}
                </h1>
                <Link href="/portfolio" className="text-brand-blue hover:underline">
                    {locale === 'en' ? 'Back to Portfolio' : 'Kembali ke Portfolio'}
                </Link>
            </div>
        );
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* Back Button */}
                <Link
                    href="/portfolio"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {locale === 'en' ? 'Back to Portfolio' : 'Kembali ke Portfolio'}
                </Link>

                {/* Hero / Header */}
                <div className="space-y-6 text-left">
                    {portfolio.category && (
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            {portfolio.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                        {portfolio.title}
                    </h1>
                </div>

                {/* Project Metadata Cards (Spotlight Card) */}
                <SpotlightCard className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 text-sm text-left">
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <User className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{locale === 'en' ? 'Client' : 'Klien'}</span>
                        </div>
                        <div className="font-semibold text-text-main">{portfolio.client || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{locale === 'en' ? 'Duration' : 'Durasi'}</span>
                        </div>
                        <div className="font-semibold text-text-main">{portfolio.duration || 'N/A'}</div>
                    </div>
                    <div className="space-y-1 col-span-2">
                        <div className="flex items-center text-text-muted space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <Cpu className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{locale === 'en' ? 'Technology' : 'Teknologi'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {portfolio.technologies?.map((tech: string) => (
                                <span key={tech} className="px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/20 rounded text-xs text-brand-blue font-medium">
                                    {tech}
                                </span>
                            )) || 'N/A'}
                        </div>
                    </div>
                </SpotlightCard>

                {/* Project Image Gallery (FR-004) */}
                <PortfolioGallery 
                    images={portfolio.gallery} 
                    coverImage={portfolio.image} 
                    title={portfolio.title} 
                />

                {/* Case Study Sections */}
                <div className="space-y-12 pt-6 text-left">
                    {/* 1. Problem */}
                    {portfolio.problem && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-rose-500">
                                <AlertCircle className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-text-main">
                                    {locale === 'en' ? 'Challenges & Problems' : 'Tantangan & Masalah'}
                                </h2>
                            </div>
                            <p className="text-text-gray leading-relaxed pl-9">
                                {portfolio.problem}
                            </p>
                        </div>
                    )}

                    {/* 2. Strategy */}
                    {portfolio.strategy && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-brand-blue">
                                <Compass className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-text-main">
                                    {locale === 'en' ? 'Approach Strategy' : 'Strategi Pendekatan'}
                                </h2>
                            </div>
                            <p className="text-text-gray leading-relaxed pl-9">
                                {portfolio.strategy}
                            </p>
                        </div>
                    )}

                    {/* 3. Execution */}
                    {portfolio.execution && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-blue-600">
                                <Settings className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-text-main">
                                    {locale === 'en' ? 'Execution & Implementation' : 'Eksekusi & Implementasi'}
                                </h2>
                            </div>
                            <p className="text-text-gray leading-relaxed pl-9">
                                {portfolio.execution}
                            </p>
                        </div>
                    )}

                    {/* 4. Result */}
                    {portfolio.result && (
                        <SpotlightCard className="p-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-emerald-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <h2 className="text-xl font-bold text-text-main">
                                        {locale === 'en' ? 'Final Results & Business Impact' : 'Hasil Akhir & Dampak Bisnis'}
                                    </h2>
                                </div>
                                <p className="text-text-main font-medium leading-relaxed pl-9">
                                    {portfolio.result}
                                </p>
                            </div>
                        </SpotlightCard>
                    )}

                    {/* 5. Client Testimonial (FR-005) */}
                    {portfolio.testimonial && (
                        <div className="space-y-6 pt-6">
                            <div className="flex items-center space-x-3 text-yellow-500">
                                <Sparkles className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-text-main">
                                    {locale === 'en' ? 'Client Feedback' : 'Umpan Balik Klien'}
                                </h2>
                            </div>
                            
                            <SpotlightCard className="p-8 bg-glass-bg/20 border border-glass-border/40 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-2 right-6 text-brand-blue/10 text-8xl font-serif pointer-events-none select-none">
                                    “
                                </div>
                                <div className="space-y-6 relative z-10">
                                    {/* Stars */}
                                    <div className="flex items-center space-x-1">
                                        {[...Array(portfolio.testimonial.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                                        ))}
                                    </div>
                                    
                                    <p className="text-sm md:text-base text-text-main italic leading-relaxed">
                                        &ldquo;{portfolio.testimonial.review || portfolio.testimonial.message}&rdquo;
                                    </p>
                                    
                                    <div className="flex items-center space-x-3">
                                        {portfolio.testimonial.avatar ? (
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-glass-border">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.testimonial.avatar}`}
                                                    alt={portfolio.testimonial.client_name || portfolio.testimonial.name || 'Client Avatar'}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue text-sm border border-glass-border">
                                                {(portfolio.testimonial.client_name || portfolio.testimonial.name || 'K').substring(0, 1)}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-bold text-text-main">
                                                {portfolio.testimonial.client_name || portfolio.testimonial.name}
                                            </div>
                                            <div className="text-xs text-text-gray font-medium">
                                                {portfolio.testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
