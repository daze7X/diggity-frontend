import React from 'react';
import Link from 'next/link';
import { api, CategoryHierarchy } from '../../lib/api';
import ScrollReveal from '../ScrollReveal';
import SpotlightCard from '../SpotlightCard';
import SubServiceIcon from '../SubServiceIcon';
import ProductCard from './ProductCard';
import MarketplaceSearchBar from './MarketplaceSearchBar';
import MarketplaceSearchResults from './MarketplaceSearchResults';
import { Search, ArrowRight, Star, Clock, Zap, Crown } from 'lucide-react';
import { getLocaleServer } from '../../lib/locale-server';

interface Props {
    mainCat: CategoryHierarchy;
}

interface DMLandingProps extends Props { searchQuery?: string; }
export default async function DigitalMarketplaceLanding({ mainCat, searchQuery }: DMLandingProps) {
    const locale = await getLocaleServer();
    // Fetch products in parallel for different merchandising sections
    
    let searchResultsRaw: any[] = [];
    if (searchQuery) {
        // Try the global search which is proven to work in production
        const globalRes = await api.searchGlobal(searchQuery).catch(() => null);
        if (globalRes && (globalRes as any).products) {
            searchResultsRaw = (globalRes as any).products;
        } else {
            // Fallback
            searchResultsRaw = await api.getProducts({ search: searchQuery }).catch(() => []);
        }
    }
    const childIds = mainCat.children?.map(c => c.id) || [];
    const searchResults = searchResultsRaw.filter((p: any) => 
        p.category?.id === mainCat.id || 
        childIds.includes(p.category?.id) || 
        p.category?.slug === mainCat.slug
    );
    // As a final safety net, if backend ignored the search param, filter locally too:
    const lowerQuery = (searchQuery || '').toLowerCase();
    const finalSearchResults = searchResults.filter((p: any) => 
        p.name.toLowerCase().includes(lowerQuery) || 
        (p.description && p.description.toLowerCase().includes(lowerQuery))
    );

    const [featured, latest, free, premium] = await Promise.all([
        api.getProducts({ category: mainCat.slug, is_popular: true, limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, sort: 'latest', limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, filter: 'free', limit: 4 }).catch(() => []),
        api.getProducts({ category: mainCat.slug, filter: 'premium', limit: 4 }).catch(() => []),
    ]);

    return (
        <div className="min-h-screen bg-bg-canvas relative overflow-hidden">
            {/* HERO SECTION - SHAYNA KIT STYLE */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-32 px-6 overflow-hidden border-b border-glass-border">
                

                {/* Animated Background Blobs (Huge Purple/Blue Orbs) */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-60 mix-blend-screen transform-gpu overflow-hidden" style={{ willChange: "transform" }}>
                    <div className="absolute left-0 top-0 w-[800px] h-[800px] bg-blue-600 rounded-full animate-morph-blob mix-blend-screen -translate-x-1/2 -translate-y-1/4 opacity-50" />
                    <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-purple-600 rounded-full animate-morph-blob-fast mix-blend-screen translate-x-1/3 translate-y-1/4 opacity-50" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 mt-10">
                    <ScrollReveal>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                            Digital Marketplace
                        </h1>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={100}>
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
                            {locale === 'en'
                                ? 'Premium digital asset catalog ready to use to accelerate your design projects, web development, and content needs.'
                                : 'Katalog aset digital premium siap pakai untuk mempercepat project desain, pengembangan web, dan kebutuhan konten Anda.'}
                        </p>
                    </ScrollReveal>

                    {/* Search Bar */}
                    <ScrollReveal delay={200} className="max-w-2xl mx-auto pt-6">
                        <MarketplaceSearchBar locale={locale} initialQuery={searchQuery} />
                    </ScrollReveal>
                </div>
            </div>

            {/* QUICK CATEGORY CARDS (Overlapping Hero) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 mb-24">
                <div className="flex flex-wrap lg:flex-nowrap gap-4 justify-center">
                    {mainCat.children?.map((sub, i) => (
                        <ScrollReveal key={sub.slug} animation="fade-up" delay={i * 50} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-auto lg:flex-1">
                            <Link href={`/products/digital-marketplace/${sub.slug}`} className="group flex flex-col items-center text-center gap-3 px-4 py-6 bg-glass-bg border border-glass-border rounded-3xl hover:border-brand-blue/40 transition-all hover:-translate-y-2 hover:shadow-xl shadow-md h-full backdrop-blur-md">
                                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="image" className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-main group-hover:text-brand-blue transition-colors text-sm mb-1">{sub.name}</h3>
                                    <p className="text-[11px] text-text-muted font-bold tracking-wider uppercase bg-brand-blue/5 px-2 py-0.5 rounded-full inline-block">
                                        {sub.products_count || 0} Aset
                                    </p>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

                        {/* SEARCH RESULTS SECTION */}
            {searchQuery && (
                <div id="search-results-section" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-text-main">
                            {locale === 'en' ? 'Search Results for' : 'Hasil Pencarian untuk'} "{searchQuery}"
                        </h2>
                        
                    </div>
                    {finalSearchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {finalSearchResults.map(product => (
                                <ProductCard key={product.id} product={product} locale={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-glass-bg border border-glass-border rounded-3xl">
                            <h3 className="text-xl font-bold text-text-main mb-2">Oops, tidak ada hasil</h3>
                            <p className="text-text-gray">Coba gunakan kata kunci lain.</p>
                        </div>
                    )}
                </div>
            )}

            {/* MERCHANDISING SECTIONS */}
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
                {!searchQuery && (
                    <>
                
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
                    </>
                )}
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