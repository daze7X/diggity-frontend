import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '../../../../lib/api';
import { getLocaleServer } from '../../../../lib/locale-server';
import ScrollReveal from '../../../../components/ScrollReveal';
import SpotlightCard from '../../../../components/SpotlightCard';
import { ArrowRight, CheckCircle2, ChevronRight, LayoutGrid } from 'lucide-react';
import SubServiceIcon from '../../../../components/SubServiceIcon';

export const revalidate = 60;

export default async function SubCategoryPage({ params }: { params: Promise<{ main: string, sub: string }> }) {
    const { main, sub } = await params;
    const locale = await getLocaleServer();
    
    let subcategory: any = null;
    let products: any[] = [];
    
    try {
        const res = await api.getProductsBySubcategory(sub);
        subcategory = res.subcategory;
        products = res.products;
    } catch {
        notFound();
    }

    // Verify it belongs to the main category
    if (subcategory?.parent?.slug !== main) {
        notFound();
    }

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    <div className="max-w-2xl space-y-6">
                        {/* Breadcrumbs (Light) */}
                        <nav className="flex items-center text-[11px] font-bold text-white/60 uppercase tracking-widest space-x-2">
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href={`/products#catalog`} className="hover:text-white transition-colors">{subcategory?.parent?.name}</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">{subcategory?.name}</span>
                        </nav>

                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl">
                                <SubServiceIcon slug={subcategory?.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                {subcategory?.name}
                            </h1>
                        </div>
                        
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl">
                            {subcategory?.description || (locale === 'en' 
                                ? `Explore our powerful suite of ${subcategory?.name} solutions designed to optimize your workflow and drive business growth.` 
                                : `Jelajahi rangkaian modul dan solusi ${subcategory?.name} kami yang dirancang khusus untuk mengoptimalkan efisiensi dan pertumbuhan bisnis Anda.`)}
                        </p>
                    </div>

                    <div className="hidden md:flex shrink-0">
                        <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
                            <LayoutGrid className="w-16 h-16 text-white/50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. PRODUCTS GRID SECTION */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white dark:bg-glass-bg rounded-3xl p-8 md:p-12 border border-glass-border shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-2xl font-black text-text-main tracking-tight mb-2">Katalog Modul {subcategory?.name}</h2>
                            <p className="text-text-gray font-medium text-sm">Pilih produk spesifik di bawah ini untuk melihat detail fitur dan spesifikasi lengkapnya.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                            <span className="text-xs font-bold text-brand-blue tracking-wide">{products.length} Produk Tersedia</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product: any, i: number) => (
                            <ScrollReveal key={product.slug} animation="fade-up" delay={i * 50}>
                                <SpotlightCard className="h-full flex flex-col border border-glass-border bg-gray-50 dark:bg-brand-bg hover:bg-white dark:hover:bg-glass-bg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group rounded-2xl overflow-hidden">
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-glass-border flex items-center justify-center shrink-0 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors">
                                                <SubServiceIcon slug={product.slug} fallbackCategoryIcon="layers" className="w-6 h-6 text-brand-blue" />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                <ArrowRight className="w-4 h-4 text-text-gray group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-extrabold text-text-main leading-tight group-hover:text-brand-blue transition-colors mb-3">
                                            {product.name}
                                        </h3>
                                        
                                        <p className="text-sm text-text-gray font-medium leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {product.description || `Solusi profesional ${product.name} dari Diggity.`}
                                        </p>

                                        {/* Mock feature points to make it look robust */}
                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-semibold text-text-main">Enterprise Ready</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-semibold text-text-main">Scalable Architecture</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="px-6 py-4 bg-white dark:bg-brand-bg border-t border-glass-border group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                                        <Link
                                            href={`/products/${main}/${sub}/${product.slug}`}
                                            className="flex items-center justify-between w-full text-sm font-bold text-text-main group-hover:text-white transition-colors"
                                        >
                                            {locale === 'en' ? 'Explore Features' : 'Eksplorasi Fitur'} 
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                        
                        {products.length === 0 && (
                            <div className="col-span-full text-center py-20 border-2 border-dashed border-glass-border rounded-2xl bg-brand-bg">
                                <p className="text-text-muted font-bold tracking-widest uppercase">Segera Hadir</p>
                                <p className="text-sm text-text-gray mt-2">Belum ada modul yang dirilis pada kategori ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM INFO */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="inline-block p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 max-w-2xl mx-auto">
                    <h4 className="text-xl font-bold text-text-main mb-3">Tidak menemukan modul yang Anda cari?</h4>
                    <p className="text-sm text-text-gray font-medium mb-6">Kami menyediakan kustomisasi pengembangan perangkat lunak (Custom Development) yang disesuaikan 100% dengan proses bisnis unik Anda.</p>
                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue-dark transition-all">
                        Konsultasi Kebutuhan Custom
                    </Link>
                </div>
            </div>

        </div>
    );
}
