import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import { api, Product, Faq } from '../../lib/api';
import {
    Check, ArrowRight, Shield, Download, ArrowUpRight,
    Star, Zap, Package, ShoppingBag, ChevronRight,
    Code2, Bot, Cloud, Store, LayoutGrid
} from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import FaqAccordion from '../../components/FaqAccordion';

export const metadata: Metadata = {
    title: 'Katalog Produk Digital & Solusi Bisnis - Diggity',
    description: 'Jelajahi berbagai produk digital unggulan dari Diggity, mulai dari Business Software, AI Products, hingga Cloud Platform untuk menumbuhkan bisnis Anda secara terstruktur.',
};

export const revalidate = 60;

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Category meta config
const CATEGORY_META: Record<string, { icon: any; gradient: string; accentText: string; accentBg: string; border: string }> = {
    'business-software': {
        icon: Code2,
        gradient: 'from-blue-500/15 to-indigo-500/5',
        accentText: 'text-blue-600 dark:text-blue-400',
        accentBg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
    },
    'ai-products': {
        icon: Bot,
        gradient: 'from-violet-500/15 to-purple-500/5',
        accentText: 'text-violet-600 dark:text-violet-400',
        accentBg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
    },
    'cloud-products': {
        icon: Cloud,
        gradient: 'from-cyan-500/15 to-sky-500/5',
        accentText: 'text-cyan-600 dark:text-cyan-400',
        accentBg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
    },
    'digital-marketplace': {
        icon: Store,
        gradient: 'from-emerald-500/15 to-teal-500/5',
        accentText: 'text-emerald-600 dark:text-emerald-400',
        accentBg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
    },
};

const DEFAULT_META = {
    icon: Package,
    gradient: 'from-brand-blue/15 to-indigo-500/5',
    accentText: 'text-brand-blue',
    accentBg: 'bg-brand-blue/10',
    border: 'border-brand-blue/30',
};

const CATEGORIES = [
    { slug: null, label: 'All Products', labelId: 'Semua Produk', icon: LayoutGrid },
    { slug: 'business-software', label: 'Business Software', labelId: 'Business Software', icon: Code2 },
    { slug: 'ai-products', label: 'AI Products', labelId: 'AI Products', icon: Bot },
    { slug: 'cloud-products', label: 'Cloud Products', labelId: 'Cloud Products', icon: Cloud },
    { slug: 'digital-marketplace', label: 'Digital Marketplace', labelId: 'Digital Marketplace', icon: Store },
];

export default async function ProductsPage({ searchParams }: PageProps) {
    const locale = await getLocaleServer();
    let products: Product[] = [];
    let faqs: Faq[] = [];

    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

    try {
        const [productsRes, faqsRes] = await Promise.all([
            api.getProducts(category),
            api.getFaqs(),
        ]);
        products = productsRes.sort((a, b) => Number(a.price) - Number(b.price));
        faqs = faqsRes;
    } catch (error) {
        console.error('Error fetching products/faq data:', error);
    }

    const popularProduct = products.find(p => p.is_popular);
    const otherProducts = products.filter(p => !p.is_popular);

    const getCategoryMeta = (product: Product) => {
        const catSlug = product.category?.name
            ?.toLowerCase().replace(/\s+/g, '-') ?? '';
        return CATEGORY_META[catSlug] ?? DEFAULT_META;
    };

    const formatPeriod = (period: string) => {
        if (period === 'one_time') return locale === 'en' ? 'one-time' : 'sekali bayar';
        if (period === 'monthly') return locale === 'en' ? 'mo' : 'bln';
        return locale === 'en' ? 'yr' : 'thn';
    };

    return (
        <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2" />

            <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-20">

                {/* ═══════════════════════════
                    HERO
                ═══════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                    {locale === 'en' ? 'Digital Product Catalog' : 'Katalog Produk Digital'}
                                </span>
                                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-[0.95]">
                                {locale === 'en' ? (
                                    <>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">Products</span></>
                                ) : (
                                    <>Produk <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">Kami</span></>
                                )}
                            </h1>
                            <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                                {locale === 'en'
                                    ? 'Ready-to-use digital products to enhance business efficiency, productivity, automation, and scalability.'
                                    : 'Produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomasi, dan skalabilitas bisnis Anda.'}
                            </p>
                        </div>

                        {/* Stats bar */}
                        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-glass-border">
                            {[
                                { val: `${products.length || '10'}+`, label: locale === 'en' ? 'Products' : 'Produk' },
                                { val: '200+', label: locale === 'en' ? 'Clients' : 'Pengguna' },
                                { val: '4.9★', label: locale === 'en' ? 'Rating' : 'Rating' },
                                { val: '100%', label: locale === 'en' ? 'Supported' : 'Bergaransi' },
                            ].map((s, i) => (
                                <div key={i} className="px-5 py-2 flex flex-col items-center">
                                    <span className="text-xl font-black text-text-main">{s.val}</span>
                                    <span className="text-[11px] text-text-muted font-semibold">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ═══════════════════════════
                    CATEGORY FILTER TABS
                ═══════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => {
                            const isActive = cat.slug === null ? !category : category === cat.slug;
                            const CatIcon = cat.icon;
                            return (
                                <Link
                                    key={cat.slug ?? 'all'}
                                    href={cat.slug ? `/products?category=${cat.slug}` : '/products'}
                                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                                        isActive
                                            ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/25'
                                            : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:border-brand-blue/30'
                                    }`}
                                >
                                    <CatIcon className="w-3.5 h-3.5" />
                                    {locale === 'en' ? cat.label : cat.labelId}
                                </Link>
                            );
                        })}
                    </div>
                </ScrollReveal>

                {/* ═══════════════════════════
                    PRODUCTS CATALOG
                ═══════════════════════════ */}
                {products.length > 0 ? (
                    <div className="space-y-6">

                        {/* FEATURED / POPULAR PRODUCT */}
                        {popularProduct && (
                            <ScrollReveal animation="fade-up">
                                <div className="relative overflow-hidden rounded-3xl border border-brand-blue/25 bg-gradient-to-r from-[#0a192f] via-[#0d2040] to-[#091525]">
                                    {/* Background blobs */}
                                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
                                    {/* Featured badge */}
                                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-[11px] font-black text-yellow-400 uppercase tracking-wider">
                                            {locale === 'en' ? 'Best Seller' : 'Terlaris'}
                                        </span>
                                    </div>
                                    <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                        {/* Left: Info */}
                                        <div className="space-y-5">
                                            <div className="space-y-1">
                                                {popularProduct.category && (
                                                    <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] block">
                                                        {popularProduct.category.name}
                                                    </span>
                                                )}
                                                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                                                    {popularProduct.name}
                                                </h2>
                                                <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium pt-1">
                                                    {popularProduct.description}
                                                </p>
                                            </div>
                                            {/* Price */}
                                            <div className="flex items-baseline gap-2 pt-1">
                                                <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(popularProduct.price)}
                                                </span>
                                                <span className="text-sm text-white/40 font-bold">
                                                    / {formatPeriod(popularProduct.billing_period)}
                                                </span>
                                            </div>
                                            {/* CTAs */}
                                            <div className="flex flex-wrap gap-3 pt-2">
                                                {popularProduct.billing_period === 'one_time' && popularProduct.file_path ? (
                                                    <Link
                                                        href={`/products/${popularProduct.slug}`}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/30"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        {locale === 'en' ? 'Instant Download' : 'Unduh Instan'}
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={`/contact?product=${encodeURIComponent(popularProduct.name)}`}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/30"
                                                    >
                                                        <Zap className="w-4 h-4" />
                                                        {locale === 'en' ? 'Request Demo' : 'Minta Demo'}
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/products/${popularProduct.slug}`}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold rounded-xl text-sm transition-all"
                                                >
                                                    {locale === 'en' ? 'View Details' : 'Lihat Detail'}
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                        {/* Right: Features */}
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                                            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">
                                                {locale === 'en' ? 'What\'s Included' : 'Yang Didapatkan'}
                                            </p>
                                            {popularProduct.features?.slice(0, 6).map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-blue-400" />
                                                    </div>
                                                    <span className="text-sm text-white/70 font-medium leading-relaxed">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* OTHER PRODUCTS GRID */}
                        {otherProducts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {otherProducts.map((product, i) => {
                                    const meta = getCategoryMeta(product);
                                    const CatIcon = meta.icon;
                                    return (
                                        <ScrollReveal key={product.id} animation="fade-up" delay={i * 60}>
                                            <SpotlightCard className={`group relative flex flex-col h-full p-0 overflow-hidden border ${meta.border} bg-gradient-to-br ${meta.gradient}`}>
                                                {/* Card header strip */}
                                                <div className="p-6 pb-4 space-y-3 border-b border-white/5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className={`w-10 h-10 rounded-xl ${meta.accentBg} flex items-center justify-center shrink-0`}>
                                                            <CatIcon className={`w-5 h-5 ${meta.accentText}`} strokeWidth={1.5} />
                                                        </div>
                                                        {product.category && (
                                                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${meta.accentText} px-2 py-1 rounded-lg ${meta.accentBg} shrink-0`}>
                                                                {product.category.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-base font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-snug">
                                                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                                                        </h3>
                                                        <p className="text-xs text-text-gray line-clamp-2 leading-relaxed font-medium">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                    {/* Price */}
                                                    <div className="flex items-baseline gap-1.5 pt-1">
                                                        <span className={`text-xl font-black ${meta.accentText}`}>
                                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                                                        </span>
                                                        <span className="text-xs text-text-muted font-bold">
                                                            / {formatPeriod(product.billing_period)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Features */}
                                                <div className="flex-1 px-6 py-4 space-y-2">
                                                    {product.features?.slice(0, 4).map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-2.5">
                                                            <Check className={`w-3.5 h-3.5 ${meta.accentText} shrink-0 mt-0.5`} />
                                                            <span className="text-xs text-text-gray font-medium leading-relaxed">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Footer CTAs */}
                                                <div className="px-6 pb-6 pt-3 border-t border-white/5 space-y-2.5">
                                                    {product.billing_period === 'one_time' && product.file_path ? (
                                                        <Link
                                                            href={`/products/${product.slug}`}
                                                            className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all gap-2"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            {locale === 'en' ? 'Instant Download' : 'Unduh Instan'}
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={`/contact?product=${encodeURIComponent(product.name)}`}
                                                            className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all gap-2"
                                                        >
                                                            {locale === 'en' ? 'Request Demo' : 'Minta Demo'}
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        className={`flex items-center justify-center w-full text-xs font-bold ${meta.accentText} gap-1 hover:underline`}
                                                    >
                                                        {locale === 'en' ? 'View Details & Features' : 'Lihat Detail & Fitur'}
                                                        <ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </SpotlightCard>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        )}

                        {/* If no popular, show all in grid */}
                        {!popularProduct && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {products.map((product, i) => {
                                    const meta = getCategoryMeta(product);
                                    const CatIcon = meta.icon;
                                    return (
                                        <ScrollReveal key={product.id} animation="fade-up" delay={i * 60}>
                                            <SpotlightCard className={`group relative flex flex-col h-full p-0 overflow-hidden border ${meta.border} bg-gradient-to-br ${meta.gradient}`}>
                                                <div className="p-6 pb-4 space-y-3 border-b border-white/5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className={`w-10 h-10 rounded-xl ${meta.accentBg} flex items-center justify-center shrink-0`}>
                                                            <CatIcon className={`w-5 h-5 ${meta.accentText}`} strokeWidth={1.5} />
                                                        </div>
                                                        {product.category && (
                                                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${meta.accentText} px-2 py-1 rounded-lg ${meta.accentBg} shrink-0`}>
                                                                {product.category.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-base font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-snug">
                                                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                                                        </h3>
                                                        <p className="text-xs text-text-gray line-clamp-2 leading-relaxed font-medium">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-baseline gap-1.5 pt-1">
                                                        <span className={`text-xl font-black ${meta.accentText}`}>
                                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                                                        </span>
                                                        <span className="text-xs text-text-muted font-bold">
                                                            / {formatPeriod(product.billing_period)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 px-6 py-4 space-y-2">
                                                    {product.features?.slice(0, 4).map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-2.5">
                                                            <Check className={`w-3.5 h-3.5 ${meta.accentText} shrink-0 mt-0.5`} />
                                                            <span className="text-xs text-text-gray font-medium leading-relaxed">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="px-6 pb-6 pt-3 border-t border-white/5 space-y-2.5">
                                                    {product.billing_period === 'one_time' && product.file_path ? (
                                                        <Link href={`/products/${product.slug}`} className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all gap-2">
                                                            <Download className="w-4 h-4" />{locale === 'en' ? 'Instant Download' : 'Unduh Instan'}
                                                        </Link>
                                                    ) : (
                                                        <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all gap-2">
                                                            {locale === 'en' ? 'Request Demo' : 'Minta Demo'}<ArrowUpRight className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    <Link href={`/products/${product.slug}`} className={`flex items-center justify-center w-full text-xs font-bold ${meta.accentText} gap-1 hover:underline`}>
                                                        {locale === 'en' ? 'View Details & Features' : 'Lihat Detail & Fitur'}<ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </SpotlightCard>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        )}

                        {/* Footnote */}
                        <ScrollReveal animation="fade-up">
                            <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-4 border-t border-glass-border text-xs text-text-muted font-medium">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-brand-blue" />
                                    <span>
                                        {locale === 'en'
                                            ? '*All products include free updates and standard bug-fix warranty.'
                                            : '*Seluruh produk memiliki dukungan pembaruan gratis dan garansi bug-fix standar.'}
                                    </span>
                                </div>
                                <Link href="/contact" className="text-brand-blue font-bold hover:underline inline-flex items-center gap-1">
                                    {locale === 'en' ? 'Need Custom Enterprise?' : 'Butuh Custom Enterprise?'}
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                ) : (
                    <ScrollReveal animation="fade-up">
                        <div className="text-center text-text-muted py-24 bg-glass-bg border border-glass-border rounded-3xl">
                            <ShoppingBag className="w-16 h-16 mx-auto text-brand-blue/30 mb-4" />
                            <h3 className="text-xl font-bold text-text-main mb-2">
                                {locale === 'en' ? 'Product Not Available' : 'Produk Belum Tersedia'}
                            </h3>
                            <p className="text-sm">
                                {locale === 'en'
                                    ? 'There are currently no active products for this category.'
                                    : 'Saat ini belum ada produk aktif untuk kategori ini.'}
                            </p>
                        </div>
                    </ScrollReveal>
                )}

                {/* ═══════════════════════════
                    FAQ SECTION
                ═══════════════════════════ */}
                {faqs.length > 0 && (
                    <ScrollReveal animation="fade-up">
                        <div className="space-y-10 max-w-4xl mx-auto">
                            <div className="text-center space-y-3">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                    <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                        {locale === 'en' ? 'General Questions' : 'Pertanyaan Umum'}
                                    </span>
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                    Frequently Asked Questions
                                </h3>
                            </div>
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </ScrollReveal>
                )}

                {/* ═══════════════════════════
                    CLOSING CTA
                ═══════════════════════════ */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className="relative overflow-hidden p-10 md:p-14 text-center space-y-6 border border-glass-border">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-3 max-w-lg mx-auto">
                            <h4 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Still have questions?' : 'Masih punya pertanyaan?'}
                            </h4>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'Our team is ready to help find the best digital solution for your business.'
                                    : 'Tim kami siap membantu menemukan solusi digital terbaik untuk bisnis Anda.'}
                            </p>
                        </div>
                        <div className="relative z-10">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Contact Our Team' : 'Hubungi Tim Kami'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

            </div>
        </div>
    );
}
