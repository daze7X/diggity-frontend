path = r"D:\SEMESTER 6\PKL\diggity-frontend\app\products\page.tsx"

content = """import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import ScrollReveal from '../../components/ScrollReveal';
import { Layers, MonitorSmartphone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Product Hub - Diggity',
    description: 'Jelajahi ekosistem produk unggulan Diggity: Business Software & Digital Marketplace.',
};

export default async function ProductsHubPage() {
    const locale = await getLocaleServer();

    return (
        <div className="min-h-screen bg-bg-canvas flex flex-col">
            {/* HERO SECTION */}
            <div className="bg-brand-blue relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
                
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

                {/* Soft Blue Bleed Downwards */}
                <div className="w-full h-24 bg-gradient-to-b from-brand-blue to-transparent pointer-events-none -mb-24 absolute bottom-0 left-0 right-0 z-0" />
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
                                    
                                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-300">
                                        <Layers className="w-10 h-10 text-brand-blue" strokeWidth={1.5} />
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main tracking-tight mb-4 group-hover:text-brand-blue transition-colors">
                                        Business Software
                                    </h3>
                                    
                                    <p className="text-base text-text-gray font-medium leading-relaxed mb-10 flex-1">
                                        Kumpulan aplikasi bisnis terintegrasi untuk mendukung berbagai proses operasional perusahaan.
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
                                    
                                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-300">
                                        <MonitorSmartphone className="w-10 h-10 text-brand-blue" strokeWidth={1.5} />
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main tracking-tight mb-4 group-hover:text-brand-blue transition-colors">
                                        Digital Marketplace
                                    </h3>
                                    
                                    <p className="text-base text-text-gray font-medium leading-relaxed mb-10 flex-1">
                                        Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.
                                    </p>
                                    
                                    <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue bg-brand-blue/5 px-6 py-3 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                        {locale === 'en' ? 'Explore Marketplace' : 'Jelajahi Marketplace'} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
"""

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Successfully replaced /products/page.tsx for Task 2.")
