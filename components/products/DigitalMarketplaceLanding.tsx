import React from 'react';
import Link from 'next/link';
import { api, CategoryHierarchy } from '../../lib/api';
import ScrollReveal from '../ScrollReveal';
import SpotlightCard from '../SpotlightCard';
import SubServiceIcon from '../SubServiceIcon';
import ProductCard from './ProductCard';
import { Search, ArrowRight, Star, Clock, Zap, Crown } from 'lucide-react';
import { getLocaleServer } from '../../lib/locale-server';

interface Props {
    mainCat: CategoryHierarchy;
}

export default async function DigitalMarketplaceLanding({ mainCat }: Props) {
    const locale = await getLocaleServer();
    // Fetch products in parallel for different merchandising sections
    const [featured, latest, free, premium] = await Promise.all([
        api.getProducts({ category: mainCat.slug, is_popular: true, limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, sort: 'latest', limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, filter: 'free', limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, filter: 'premium', limit: 4 }).catch(() => []),
    ]);

    return (
        <div className="min-h-screen bg-bg-canvas relative overflow-hidden">
            {/* HERO SECTION WITH SEARCH */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                            Digital Marketplace
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
                            Katalog aset digital premium siap pakai untuk mempercepat project desain, pengembangan web, dan kebutuhan konten Anda.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className="pt-4 max-w-2xl mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="w-6 h-6 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Cari template website, UI kit, aset 3D..." 
                                className="w-full py-5 pl-14 pr-6 bg-white dark:bg-glass-bg border-2 border-transparent dark:border-glass-border rounded-full shadow-2xl focus:outline-none focus:border-brand-blue/50 text-text-main placeholder:text-text-muted text-lg transition-all"
                            />
                            <button className="absolute inset-y-2 right-2 px-6 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-full transition-colors">
                                Cari
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
                {/* Soft Blue Bleed Downwards (Hidden in Dark Mode) */}
                <div className="w-full h-24 bg-gradient-to-b from-brand-blue to-transparent dark:hidden pointer-events-none -mb-24 absolute bottom-0 left-0 right-0 z-0" />
            </div>

            {/* CATEGORIES GRID */}
            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-wrap gap-4 justify-center">
                    {mainCat.children?.map((sub, i) => (
                        <ScrollReveal key={sub.slug} animation="fade-up" delay={i * 50}>
                            <Link href={`/products/digital-marketplace/${sub.slug}`} className="group flex items-center gap-3 px-6 py-4 bg-glass-bg border border-glass-border rounded-2xl hover:border-brand-blue/30 hover:bg-glass-bg/80 transition-all hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="image" className="w-5 h-5 text-brand-blue" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-text-main group-hover:text-brand-blue transition-colors text-sm">{sub.name}</h3>
                                    <p className="text-[11px] text-text-gray font-medium">{sub.products_count || 0} Aset</p>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* MERCHANDISING SECTIONS */}
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
                
                {/* FEATURED ASSETS */}
                {featured.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-brand-blue fill-brand-blue" />
                                    <h2 className="text-2xl font-black text-text-main">Aset Pilihan (Featured)</h2>
                                </div>
                                <p className="text-text-gray font-medium text-sm">Aset digital terbaik yang direkomendasikan oleh tim kurator kami.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featured.map(product => (
                                <ProductCard key={product.id} product={product} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                {/* LATEST ASSETS */}
                {latest.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-brand-blue" />
                                    <h2 className="text-2xl font-black text-text-main">Baru Ditambahkan</h2>
                                </div>
                                <p className="text-text-gray font-medium text-sm">Eksplorasi aset terbaru yang baru saja dirilis ke marketplace.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latest.map(product => (
                                <ProductCard key={product.id} product={product} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* FREE ASSETS */}
                    {free.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6 border-b border-glass-border pb-4">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-green-500" />
                                    <h2 className="text-xl font-bold text-text-main">{locale === 'en' ? 'Free Assets (Freebies)' : 'Aset Gratis (Freebies)'}</h2>
                                </div>
                                <Link href="#" className="text-xs font-bold text-brand-blue hover:underline">Lihat Semua</Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {free.slice(0, 2).map(product => (
                                    <ProductCard key={product.id} product={product} locale={locale} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* PREMIUM ASSETS */}
                    {premium.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6 border-b border-glass-border pb-4">
                                <div className="flex items-center gap-2">
                                    <Crown className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-xl font-bold text-text-main">Aset Premium</h2>
                                </div>
                                <Link href="#" className="text-xs font-bold text-brand-blue hover:underline">Lihat Semua</Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {premium.slice(0, 2).map(product => (
                                    <ProductCard key={product.id} product={product} locale={locale} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="bg-glass-bg border-t border-glass-border py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-text-main">FAQ Marketplace</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">Bagaimana sistem lisensi aset di sini?</h3>
                            <p className="text-sm text-text-gray leading-relaxed">Sebagian besar aset memiliki Lisensi Standar untuk penggunaan komersial tunggal. Tersedia juga Lisensi Diperpanjang (Extended) jika Anda membutuhkan hak pakai tak terbatas.</p>
                        </div>
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">Apakah saya mendapatkan file mentah (source code/source file)?</h3>
                            <p className="text-sm text-text-gray leading-relaxed">Ya, setiap pembelian aset premium mencakup file sumber asli (misalnya .fig, .psd, .zip kode Next.js) berserta dokumentasi lengkapnya.</p>
                        </div>
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">Apakah ada update gratis untuk aset yang sudah dibeli?</h3>
                            <p className="text-sm text-text-gray leading-relaxed">Ya, Anda berhak menerima pembaruan versi secara gratis seumur hidup melalui halaman "My Downloads" di akun Anda.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}