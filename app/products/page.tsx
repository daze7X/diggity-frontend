import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import { api } from '../../lib/api';
import ScrollReveal from '../../components/ScrollReveal';
import { Layers, MonitorSmartphone, ArrowRight, Bot, Cloud } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Product Hub - Diggity',
    description: 'Jelajahi ekosistem produk unggulan Diggity: Business Software & Digital Marketplace.',
};

export default async function ProductsHubPage() {
    const locale = await getLocaleServer();
    const hierarchy = await api.getProductHierarchy().catch(() => []);
    
    const bsCount = hierarchy.find(c => c.slug === 'business-software')?.children?.length || 8;
    const dmCount = hierarchy.find(c => c.slug === 'digital-marketplace')?.children?.length || 5;

    return (
        <div className="min-h-screen bg-bg-canvas flex flex-col">
            {/* HERO SECTION */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-24 px-6 overflow-hidden">
                {/* SVG Filter for Gooey Effect */}
                <svg className="hidden">
                    <defs>
                        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                {/* Animated Background Blobs */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                    <div className="absolute -left-32 top-1/4 w-96 h-96 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />
                    <div className="absolute -left-10 top-1/3 w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />
                    <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-purple-600 rounded-full animate-morph-blob-fast mix-blend-screen" />
                    <div className="absolute -right-10 bottom-1/3 w-64 h-64 bg-cyan-500 rounded-full animate-gooey-2 mix-blend-screen" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                        {locale === 'en' ? 'Diggity Product Ecosystem' : 'Ekosistem Produk Diggity'}
                    </h1>
                    <p className="text-lg text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
                        {locale === 'en'
                            ? 'Discover our comprehensive suite of business applications and premium digital assets designed to scale your operations.'
                            : 'Temukan rangkaian aplikasi bisnis terintegrasi dan aset digital premium kami yang dirancang untuk menskalakan operasional Anda.'}
                    </p>
                </div>

                {/* Soft Blue Bleed Downwards (Hidden in Dark Mode) */}
                <div className="w-full h-24 bg-gradient-to-b from-brand-blue to-transparent dark:hidden pointer-events-none -mb-24 absolute bottom-0 left-0 right-0 z-0" />
            </div>

            {/* PRODUCT HUB CARDS */}
            <div className="flex-1 w-full relative z-20 -mt-10 mb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Business Software Card */}
                        <ScrollReveal animation="fade-up" delay={100}>
                            <Link href="/products/business-software" className="group block h-full">
                                <div className="h-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 rounded-3xl p-10 lg:p-12 shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
                                    
                                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-300">
                                        <Layers className="w-10 h-10 text-brand-blue" strokeWidth={1.5} />
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main tracking-tight mb-2 group-hover:text-brand-blue transition-colors">
                                        Business Software
                                    </h3>
                                    
                                    <p className="text-sm font-bold text-brand-blue mb-4">
                                        ({bsCount}) {locale === 'en' ? 'Subcategories' : 'Sub Kategori'}
                                    </p>
                                    
                                    <p className="text-base text-text-gray font-medium leading-relaxed mb-10 flex-1">
                                        {locale === 'en' 
                                            ? 'An integrated suite of business applications to support various enterprise operations.'
                                            : 'Kumpulan aplikasi bisnis terintegrasi untuk mendukung berbagai proses operasional perusahaan.'}
                                    </p>
                                    
                                    <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue bg-brand-blue/5 px-6 py-3 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                        {locale === 'en' ? 'Explore Solutions' : 'Jelajahi Kategori'} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        {/* Digital Marketplace Card */}
                        <ScrollReveal animation="fade-up" delay={200}>
                            <Link href="/products/digital-marketplace" className="group block h-full">
                                <div className="h-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 rounded-3xl p-10 lg:p-12 shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
                                    
                                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-300">
                                        <MonitorSmartphone className="w-10 h-10 text-brand-blue" strokeWidth={1.5} />
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main tracking-tight mb-2 group-hover:text-brand-blue transition-colors">
                                        Digital Marketplace
                                    </h3>

                                    <p className="text-sm font-bold text-brand-blue mb-4">
                                        ({dmCount}) {locale === 'en' ? 'Subcategories' : 'Sub Kategori'}
                                    </p>
                                    
                                    <p className="text-base text-text-gray font-medium leading-relaxed mb-10 flex-1">
                                        {locale === 'en'
                                            ? 'A collection of premium digital assets and ready-to-use products for design, development, and business needs.'
                                            : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.'}
                                    </p>
                                    
                                    <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue bg-brand-blue/5 px-6 py-3 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                        {locale === 'en' ? 'Explore Marketplace' : 'Jelajahi Marketplace'} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        {/* AI Products Card (Coming Soon) */}
                        <ScrollReveal animation="fade-up" delay={300}>
                            <div className="h-full bg-gray-50/50 dark:bg-glass-bg/50 border border-dashed border-glass-border rounded-3xl p-10 lg:p-12 flex flex-col items-center text-center relative overflow-hidden grayscale-[0.5] opacity-80 cursor-not-allowed">
                                <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-6">
                                    <Bot className="w-10 h-10 text-text-muted" strokeWidth={1.5} />
                                </div>
                                
                                <h3 className="text-3xl font-black text-text-muted tracking-tight mb-4">
                                    AI Products
                                </h3>
                                
                                <p className="text-base text-text-muted font-medium leading-relaxed mb-10 flex-1">
                                    {locale === 'en' 
                                        ? 'Next-generation artificial intelligence tools and models.'
                                        : 'Alat dan model kecerdasan buatan generasi berikutnya.'}
                                </p>
                                
                                <div className="inline-flex items-center justify-center text-xs font-black uppercase tracking-widest text-text-muted bg-gray-200 dark:bg-white/10 px-6 py-2 rounded-full">
                                    {locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Cloud Products Card (Coming Soon) */}
                        <ScrollReveal animation="fade-up" delay={400}>
                            <div className="h-full bg-gray-50/50 dark:bg-glass-bg/50 border border-dashed border-glass-border rounded-3xl p-10 lg:p-12 flex flex-col items-center text-center relative overflow-hidden grayscale-[0.5] opacity-80 cursor-not-allowed">
                                <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-6">
                                    <Cloud className="w-10 h-10 text-text-muted" strokeWidth={1.5} />
                                </div>
                                
                                <h3 className="text-3xl font-black text-text-muted tracking-tight mb-4">
                                    Cloud Products
                                </h3>
                                
                                <p className="text-base text-text-muted font-medium leading-relaxed mb-10 flex-1">
                                    {locale === 'en' 
                                        ? 'Scalable cloud infrastructure and hosting solutions.'
                                        : 'Infrastruktur cloud dan solusi hosting yang skalabel.'}
                                </p>
                                
                                <div className="inline-flex items-center justify-center text-xs font-black uppercase tracking-widest text-text-muted bg-gray-200 dark:bg-white/10 px-6 py-2 rounded-full">
                                    {locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
