import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../../../../lib/api';
import { getLocaleServer } from '../../../../lib/locale-server';
import ScrollReveal from '../../../../components/ScrollReveal';
import SpotlightCard from '../../../../components/SpotlightCard';
import { ArrowRight, CheckCircle2, ChevronRight, LayoutGrid } from 'lucide-react';
import SubServiceIcon from '../../../../components/SubServiceIcon';
import HomeTestimonials from '../../../../components/HomeTestimonials';
import FaqAccordion from '../../../../components/FaqAccordion';
import ProductCard from '../../../../components/products/ProductCard';

export const revalidate = 60;

export default async function SubCategoryPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ main: string, sub: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { main, sub } = await params;
    const resolvedParams = await searchParams;
    const locale = await getLocaleServer();
    
        let subcategory: any = null;
    let products: any[] = [];
    let settings: any = null;
    let testimonials: any[] = [];
    let faqs: any[] = [];
    let pagination: any = null;
    
    // Parse filters for digital marketplace
    const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined;
    const filter = typeof resolvedParams.filter === 'string' ? resolvedParams.filter : undefined;
    const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
    const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;

        // Helper to safely build query strings
    const buildQuery = (updates: Record<string, string>) => {
        const params = new URLSearchParams();
        Object.entries(resolvedParams).forEach(([k, v]) => {
            if (typeof v === 'string') params.set(k, v);
        });
        Object.entries(updates).forEach(([k, v]) => {
            if (v === null) params.delete(k);
            else params.set(k, v);
        });
        return params.toString();
    };

    try {
        const [res, settingsRes, testiRes, faqRes] = await Promise.all([
            api.getProductsBySubcategory(sub, { search, filter, sort, page }),
            api.getCompanySettings(),
            api.getTestimonials(),
            api.getFaqs()
        ]);
        subcategory = res.subcategory;
        products = res.products;
        pagination = pagination;
        settings = settingsRes;
        testimonials = testiRes;
        faqs = faqRes;
    } catch {
        notFound();
    }

    // Verify it belongs to the main category
    if (subcategory?.parent?.slug !== main) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-bg-canvas flex flex-col relative overflow-hidden">
            {/* Background Base */}
            <div className="absolute inset-0 bg-bg-canvas -z-10" />

            {/* HERO SECTION */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Abstract Blobs (Hidden in Dark Mode for cleaner look) */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 dark:hidden" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 dark:hidden" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    <div className="max-w-2xl space-y-6">
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

                    <div className="flex shrink-0 relative items-center justify-center w-48 h-48 md:w-72 md:h-72 mt-8 md:mt-0 self-center md:self-auto">
                        {/* Glowing Pulse Aura */}
                        <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                        
                        {/* Morphing Blob & Levitation */}
                        <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center animate-float">
                            {/* The morphing shape */}
                            <div 
                                className="absolute inset-0 bg-white/10 border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob" 
                            >
                                {/* Spinning Gradient inside blob */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                            </div>
                            
                            {/* Dynamic Icon */}
                            <div className="relative z-10 flex items-center justify-center drop-shadow-2xl">
                                <SubServiceIcon 
                                    slug={subcategory?.slug || ""} 
                                    fallbackCategoryIcon="layers" 
                                    className="w-16 h-16 md:w-28 md:h-28 text-white/80" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1.5 CLIENT LOGOS (Dynamic Marquee) */}
            <div className="border-b border-glass-border bg-gray-50/50 dark:bg-brand-bg/50 py-8 overflow-hidden relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold text-text-muted mb-6 uppercase tracking-widest">
                        {locale === 'en' ? 'Trusted by forward-thinking businesses' : 'Telah dipercaya oleh +500 klien lintas industri'}
                    </p>
                    
                    <div className="relative flex overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-brand-bg to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-brand-bg to-transparent z-10 pointer-events-none" />
                        
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

            {/* 2. PRODUCTS GRID SECTION */}
            <div className="max-w-7xl mx-auto px-6 py-20 relative z-20">
                <div className="bg-white dark:bg-glass-bg rounded-3xl p-8 md:p-12 border border-glass-border shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-2xl font-black text-text-main tracking-tight mb-2">{locale === 'en' ? `Module Catalog ${subcategory?.name}` : `Katalog Modul ${subcategory?.name}`}</h2>
                            <p className="text-text-gray font-medium text-sm">{locale === 'en' ? 'Select a specific product below to view its full features and specifications.' : 'Pilih produk spesifik di bawah ini untuk melihat detail fitur dan spesifikasi lengkapnya.'}</p>
                        </div>
                    </div>

                                                                                {main === 'digital-marketplace' && (
                        <div className="mb-8 space-y-4">
                            {/* Search Form */}
                            <form action={`/products/${main}/${sub}`} method="GET" className="relative flex w-full md:w-1/2">
                                {filter && <input type="hidden" name="filter" value={filter} />}
                                {sort && <input type="hidden" name="sort" value={sort} />}
                                <input 
                                    type="text" 
                                    name="search" 
                                    defaultValue={search || ''} 
                                    placeholder="Search products..." 
                                    className="w-full pl-4 pr-12 py-3 bg-glass-bg border border-glass-border rounded-xl focus:outline-none focus:border-brand-blue/50 text-text-main placeholder:text-text-muted"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </form>

                                                        <div className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-glass-border gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <Link href={`/products/${main}/${sub}?${buildQuery({ filter: null as any, page: '1' })}`} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${!filter ? 'bg-brand-blue text-white' : 'bg-glass-bg text-text-gray hover:bg-glass-border'}`}>All Products</Link>
                                    <Link href={`/products/${main}/${sub}?${buildQuery({ filter: 'free', page: '1' })}`} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${filter === 'free' ? 'bg-brand-blue text-white' : 'bg-glass-bg text-text-gray hover:bg-glass-border'}`}>Free</Link>
                                    <Link href={`/products/${main}/${sub}?${buildQuery({ filter: 'paid', page: '1' })}`} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${filter === 'paid' ? 'bg-brand-blue text-white' : 'bg-glass-bg text-text-gray hover:bg-glass-border'}`}>Paid</Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-text-muted shrink-0">Sort:</span>
                                    <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
                                        <Link href={`/products/${main}/${sub}?${buildQuery({ sort: 'latest', page: '1' })}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${(!sort || sort === 'latest') ? 'bg-brand-blue/10 text-brand-blue' : 'text-text-gray hover:bg-glass-bg'}`}>Latest</Link>
                                        <Link href={`/products/${main}/${sub}?${buildQuery({ sort: 'oldest', page: '1' })}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${sort === 'oldest' ? 'bg-brand-blue/10 text-brand-blue' : 'text-text-gray hover:bg-glass-bg'}`}>Oldest</Link>
                                        <Link href={`/products/${main}/${sub}?${buildQuery({ sort: 'popular', page: '1' })}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${sort === 'popular' ? 'bg-brand-blue/10 text-brand-blue' : 'text-text-gray hover:bg-glass-bg'}`}>Most Popular</Link>
                                        <Link href={`/products/${main}/${sub}?${buildQuery({ sort: 'price_asc', page: '1' })}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${sort === 'price_asc' ? 'bg-brand-blue/10 text-brand-blue' : 'text-text-gray hover:bg-glass-bg'}`}>Price: Low to High</Link>
                                        <Link href={`/products/${main}/${sub}?${buildQuery({ sort: 'price_desc', page: '1' })}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${sort === 'price_desc' ? 'bg-brand-blue/10 text-brand-blue' : 'text-text-gray hover:bg-glass-bg'}`}>Price: High to Low</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: any, i: number) => (
                            <ScrollReveal key={product.slug} animation="fade-up" delay={i * 50}>
                                {main === 'digital-marketplace' ? (
                                    <div className="h-full">
                                        <ProductCard product={product} locale={locale} />
                                    </div>
                                ) : (
                                    <SpotlightCard className="h-full border border-glass-border bg-gray-50 dark:bg-brand-bg hover:bg-white dark:hover:bg-glass-bg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group rounded-2xl overflow-hidden">
                                        <Link href={`/products/${main}/${sub}/${product.slug}`} className="flex flex-col h-full w-full outline-none">
                                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                                <div className="flex items-start justify-between gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-bg/50 shadow-sm border border-glass-border flex items-center justify-center shrink-0 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors">
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
                                            
                                            <div className="px-6 py-4 bg-white dark:bg-brand-bg border-t border-glass-border group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors flex items-center justify-between w-full text-sm font-bold text-text-main group-hover:text-white">
                                                <span>{locale === 'en' ? 'Explore Features' : 'Eksplorasi Fitur'}</span> 
                                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                            </div>
                                        </Link>
                                    </SpotlightCard>
                                )}
                            </ScrollReveal>
                        ))}
                                                {products.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 border border-glass-border rounded-3xl bg-glass-bg/50 backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="w-20 h-20 mb-6 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 shadow-[0_0_30px_rgba(24,115,232,0.15)] transition-transform duration-500 group-hover:scale-110">
                                    <svg className="w-10 h-10 text-brand-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-text-main mb-2 tracking-tight uppercase">
                                    {locale === 'en' ? 'NO PRODUCTS FOUND' : 'PRODUK TIDAK DITEMUKAN'}
                                </h3>
                                <p className="text-text-gray text-center text-sm font-medium max-w-md">
                                    {locale === 'en' ? 'Try changing your filters or search keywords.' : 'Coba ubah filter atau kata kunci pencarian Anda.'}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination */}
                                        {pagination && pagination.last_page > 1 && (
                        <div className="flex justify-center mt-12 gap-2">
                            {pagination.current_page > 1 && (
                                <Link href={`/products/${main}/${sub}?${buildQuery({ page: (pagination.current_page - 1).toString() })}`} className="px-4 py-2 border border-glass-border rounded-lg bg-glass-bg text-text-main font-bold hover:bg-glass-border">
                                    Prev
                                </Link>
                            )}
                            <div className="px-4 py-2 border border-glass-border rounded-lg bg-white dark:bg-glass-bg text-text-main font-bold">
                                {pagination.current_page} / {pagination.last_page}
                            </div>
                            {pagination.current_page < pagination.last_page && (
                                <Link href={`/products/${main}/${sub}?${buildQuery({ page: (pagination.current_page + 1).toString() })}`} className="px-4 py-2 border border-glass-border rounded-lg bg-glass-bg text-text-main font-bold hover:bg-glass-border">
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 3. TESTIMONIALS */}
            {testimonials && testimonials.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-20">
                    <div className="text-center space-y-4 mb-12">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {locale === 'en' ? 'Client Validation' : 'Validasi Klien'}
                        </span>
                        <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? `What they say about ${subcategory?.name}` : `Kata mereka tentang modul ${subcategory?.name}`}
                        </h2>
                    </div>
                    <HomeTestimonials testimonials={testimonials} locale={locale} />
                </div>
            )}

            {/* 4. FAQ SECTION */}
            {faqs && faqs.length > 0 && (
                <div className="bg-gray-50/50 dark:bg-transparent border-y border-glass-border mt-12 mb-12 relative z-10">
                    <div className="max-w-4xl mx-auto px-6 py-20">
                        <div className="text-center space-y-4 mb-12">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">FAQ</span>
                            <h2 className="text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Seputar Produk'}
                            </h2>
                        </div>
                        <div className="text-left bg-white dark:bg-glass-bg p-8 md:p-10 rounded-3xl border border-glass-border shadow-sm">
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </div>
                </div>
            )}

            {/* 5. BOTTOM INFO */}
            <div className="max-w-7xl mx-auto px-6 py-12 text-center relative z-20">
                <div className="inline-block p-10 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 max-w-2xl mx-auto">
                    <h4 className="text-2xl font-black text-text-main mb-4">Tidak menemukan modul yang Anda cari?</h4>
                    <p className="text-sm text-text-gray font-medium mb-8 leading-relaxed">Kami menyediakan kustomisasi pengembangan perangkat lunak (Custom Development) yang disesuaikan 100% dengan proses bisnis unik Anda. Diskusikan dengan tim ahil kami.</p>
                    <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue-dark transition-all hover:shadow-lg hover:-translate-y-0.5">
                        Konsultasi Kebutuhan Custom
                    </Link>
                </div>
            </div>

        </div>
    );
}
