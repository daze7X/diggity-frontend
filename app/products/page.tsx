import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import { api, Product, Faq } from '../../lib/api';
import { Check, ArrowRight, Shield, Download, ArrowUpRight, ThumbsUp, Briefcase, Bot, Cloud, ShoppingBag, Box, Users, Star, ArrowLeft } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import FaqAccordion from '../../components/FaqAccordion';
import ScrollReveal from '../../components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Katalog Produk Digital & Solusi Bisnis - Diggity',
  description: 'Jelajahi berbagai produk digital unggulan dari Diggity, mulai dari Business Software, AI Products, hingga Cloud Platform untuk menumbuhkan bisnis Anda secara terstruktur.',
};

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PRODUCT_CATEGORIES = [
    {
        id: 'business-software',
        name: 'Business Software',
        descEn: 'ERP, CRM, and management tools to streamline your daily operations.',
        descId: 'Sistem ERP, CRM, dan manajemen terintegrasi untuk menyederhanakan operasional harian.',
        icon: Briefcase,
        gradient: 'from-blue-500/10 to-indigo-500/5',
        textGradient: 'from-blue-500 to-indigo-500',
        bgGlow: 'bg-blue-500/15',
        accentText: 'text-blue-500',
        accentBg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glowColor: 'bg-blue-500/10',
    },
    {
        id: 'ai-products',
        name: 'AI Products',
        descEn: 'Ready-to-use AI agents and automation tools for your business.',
        descId: 'Agen AI siap pakai dan tools otomatisasi cerdas untuk menumbuhkan bisnis Anda.',
        icon: Bot,
        gradient: 'from-violet-500/10 to-purple-500/5',
        textGradient: 'from-violet-500 to-purple-500',
        bgGlow: 'bg-violet-500/15',
        accentText: 'text-violet-500',
        accentBg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
        glowColor: 'bg-violet-500/10',
    },
    {
        id: 'cloud-products',
        name: 'Cloud Products',
        descEn: 'Scalable cloud infrastructure, hosting, and SaaS platforms.',
        descId: 'Infrastruktur cloud yang scalable, layanan hosting, dan platform SaaS.',
        icon: Cloud,
        gradient: 'from-cyan-500/10 to-sky-500/5',
        textGradient: 'from-cyan-500 to-sky-500',
        bgGlow: 'bg-cyan-500/15',
        accentText: 'text-cyan-500',
        accentBg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        glowColor: 'bg-cyan-500/10',
    },
    {
        id: 'digital-marketplace',
        name: 'Digital Marketplace',
        descEn: 'Premium templates, UI kits, and digital assets for creators.',
        descId: 'Template premium, UI kits, dan aset digital berkualitas tinggi untuk para kreator.',
        icon: ShoppingBag,
        gradient: 'from-pink-500/10 to-rose-500/5',
        textGradient: 'from-pink-500 to-rose-500',
        bgGlow: 'bg-pink-500/15',
        accentText: 'text-pink-500',
        accentBg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
        glowColor: 'bg-pink-500/10',
    }
];

export default async function ProductsPage({ searchParams }: PageProps) {
    const locale = await getLocaleServer();
    let allProducts: Product[] = [];
    let faqs: Faq[] = [];
    
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

    try {
        const [productsRes, faqsRes] = await Promise.all([
            api.getProducts(), // Fetch all to count them
            api.getFaqs(),
        ]);
        allProducts = productsRes.sort((a, b) => Number(a.price) - Number(b.price));
        faqs = faqsRes;
    } catch (error) {
        console.error('Error fetching products/faq data:', error);
    }

    const displayedProducts = category 
        ? allProducts.filter(p => p.category?.slug === category)
        : allProducts;
        
    const featuredProducts = allProducts.filter(p => p.is_popular).slice(0, 3);

    const formatPrice = (price: number, period: string) => {
        const formatted = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);

        if (period === 'one_time') return `${formatted} (Sekali Bayar)`;
        if (period === 'monthly') return `${formatted} / bulan`;
        if (period === 'yearly') return `${formatted} / tahun`;
        return `${formatted} / ${period}`;
    };

    const stats = [
        { icon: Users,    val: '500+', labelEn: 'Active Users', labelId: 'Pengguna Aktif' },
        { icon: Box,      val: `${allProducts.length || 15}+`,  labelEn: 'Products', labelId: 'Total Produk' },
        { icon: Star,     val: '4',  labelEn: 'Categories', labelId: 'Kategori' },
        { icon: Shield,   val: '99%',   labelEn: 'Uptime', labelId: 'Uptime' },
    ];
    
    const activeCategoryConfig = PRODUCT_CATEGORIES.find(c => c.id === category);

    // Dynamic grid classes to center items if there are less than 3
    const itemsToDisplay = category ? displayedProducts : featuredProducts;
    const itemsCount = itemsToDisplay.length;
    let gridContainerClass = "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto";
    
    if (itemsCount === 1) {
        gridContainerClass = "grid-cols-1 max-w-md mx-auto";
    } else if (itemsCount === 2) {
        gridContainerClass = "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    }

    return (
        <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">
                
                {/* ═══ HERO SECTION ═══ */}
                {!category ? (
                    <ScrollReveal animation="fade-up">
                        <div className="text-center space-y-8 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                    <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                        {locale === 'en' ? 'Digital Assets & Tools' : 'Aset & Tools Digital'}
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
                                        ? 'Providing ready-to-use digital products to enhance business efficiency, productivity, automation, and scalability.'
                                        : 'Menyediakan produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomasi, dan skalabilitas bisnis.'}
                                </p>
                            </div>

                            {/* Stats bar */}
                            <div className="inline-flex flex-wrap items-center justify-center gap-0 divide-x divide-glass-border bg-glass-bg border border-glass-border rounded-2xl px-2">
                                {stats.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-2.5 px-5 py-3">
                                            <Icon className="w-4 h-4 text-brand-blue" />
                                            <div>
                                                <div className="text-lg font-black text-text-main leading-none">{s.val}</div>
                                                <div className="text-[10px] text-text-muted font-semibold mt-0.5">
                                                    {locale === 'en' ? s.labelEn : s.labelId}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal animation="fade-up">
                        <div className="relative text-center space-y-6 max-w-3xl mx-auto pb-6">
                            {/* Glowing Background Blob specific to the category */}
                            {activeCategoryConfig && (
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] ${activeCategoryConfig.bgGlow} rounded-full blur-[100px] pointer-events-none -z-10`} />
                            )}
                            
                            <Link href="/products" className="inline-flex items-center text-xs font-bold text-text-gray hover:text-brand-blue transition-colors bg-glass-bg border border-glass-border px-3 py-1.5 rounded-lg mb-4 hover:-translate-y-0.5 shadow-sm">
                                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> {locale === 'en' ? 'Back to All Products' : 'Kembali ke Semua Produk'}
                            </Link>
                            
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl ${activeCategoryConfig?.accentBg || 'bg-brand-blue/10'} flex items-center justify-center shadow-lg`}>
                                    {activeCategoryConfig ? <activeCategoryConfig.icon className={`w-8 h-8 ${activeCategoryConfig.accentText}`} strokeWidth={1.5} /> : <Box className="w-8 h-8 text-brand-blue" />}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeCategoryConfig?.textGradient || 'from-brand-blue to-indigo-500'}`}>
                                        {activeCategoryConfig?.name || 'Category Products'}
                                    </span>
                                </h1>
                                <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl">
                                    {locale === 'en' ? activeCategoryConfig?.descEn : activeCategoryConfig?.descId}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* ═══ CATEGORY CARDS GRID (Only show if no category is selected) ═══ */}
                {!category && (
                    <div className="space-y-5">
                        <ScrollReveal animation="fade-up">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                    {locale === 'en' ? 'Browse by Category' : 'Telusuri per Kategori'}
                                </span>
                                <div className="flex-1 h-px bg-glass-border rounded-full" />
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                            {PRODUCT_CATEGORIES.map((cat, i) => {
                                const CatIcon = cat.icon;
                                const prodCount = allProducts.filter(p => p.category?.slug === cat.id).length;

                                return (
                                    <ScrollReveal key={cat.id} animation="fade-up" delay={i * 60}>
                                        <Link href={`/products?category=${cat.id}`} className="block h-full group">
                                            <SpotlightCard className={`relative h-full p-7 flex flex-col gap-5 border ${cat.border} bg-gradient-to-br ${cat.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                                <div className={`absolute -top-6 -right-6 w-24 h-24 ${cat.glowColor} rounded-full blur-2xl pointer-events-none`} />

                                                <div className="flex items-start justify-between gap-3">
                                                    <div className={`w-12 h-12 rounded-2xl ${cat.accentBg} flex items-center justify-center shrink-0`}>
                                                        <CatIcon className={`w-6 h-6 ${cat.accentText}`} strokeWidth={1.5} />
                                                    </div>
                                                    <div className={`px-2.5 py-1 rounded-full ${cat.accentBg} border ${cat.border} text-[10px] font-black ${cat.accentText}`}>
                                                        {prodCount} PRODUCTS
                                                    </div>
                                                </div>

                                                <div className="space-y-2 flex-1">
                                                    <h3 className="text-xl font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                                        {cat.name}
                                                    </h3>
                                                    <p className="text-xs text-text-gray font-medium leading-relaxed">
                                                        {locale === 'en' ? cat.descEn : cat.descId}
                                                    </p>
                                                </div>

                                                <div className={`pt-4 border-t border-glass-border/40 text-xs font-bold ${cat.accentText} flex items-center group-hover:underline`}>
                                                    {locale === 'en' ? 'View products' : 'Lihat produk'}
                                                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </SpotlightCard>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ═══ PRODUCTS GRID ═══ */}
                <div className="space-y-6 pt-8 relative">
                    {/* Add a subtle divider if in category view */}
                    {category && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
                    )}

                    {!category && featuredProducts.length > 0 && (
                        <ScrollReveal animation="fade-up">
                            <div className="flex items-center gap-4 pb-6">
                                <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                    {locale === 'en' ? 'Featured Products' : 'Produk Unggulan'}
                                </span>
                                <div className="flex-1 h-px bg-glass-border rounded-full" />
                            </div>
                        </ScrollReveal>
                    )}

                    <div className={`grid gap-8 items-stretch ${gridContainerClass}`}>
                        {itemsToDisplay.length > 0 ? (
                            itemsToDisplay.map((product, idx) => (
                                <ScrollReveal key={product.id} animation="fade-up" delay={idx * 50} className={`group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 ${product.is_popular ? 'scale-100 md:scale-[1.02] z-10' : ''}`}>
                                    <SpotlightCard
                                        className={`p-8 relative flex flex-col justify-between h-full border transition-all duration-300 group-hover:shadow-2xl group-hover:border-brand-blue/40 ${
                                            product.is_popular
                                                ? 'border-brand-blue/80 dark:border-brand-blue/60 bg-brand-blue/5 shadow-xl shadow-brand-blue/15'
                                                : 'border-glass-border bg-glass-bg'
                                        }`}
                                    >
                                        <div className="space-y-6 text-left">
                                        <div className="space-y-2">
                                            {product.category && (
                                                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-bold text-text-main hover:text-brand-blue transition-colors">
                                                <Link href={`/products/${product.slug}`}>{product.name}</Link>
                                            </h3>
                                            <p className="text-xs text-text-gray line-clamp-3 leading-relaxed min-h-[54px]">
                                                {product.description}
                                            </p>
                                            <div className="flex items-baseline gap-1 pt-3 flex-wrap">
                                                <span className="text-2xl font-black text-brand-blue whitespace-nowrap">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                    }).format(product.price)}
                                                </span>
                                                <span className="text-xs text-text-muted font-bold lowercase whitespace-nowrap">
                                                    / {product.billing_period === 'one_time' ? (locale === 'en' ? 'one-time' : 'sekali bayar') : product.billing_period === 'monthly' ? (locale === 'en' ? 'month' : 'bulan') : (locale === 'en' ? 'year' : 'tahun')}
                                                </span>
                                            </div>
                                            {product.sku && (
                                                <div className="text-[10px] text-text-muted font-mono pt-1">
                                                    SKU: {product.sku} | Versi: {product.version}
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-glass-border/60 my-4" />

                                        <ul className="space-y-4 text-xs pb-4">
                                            {product.features?.map((feature, idx) => (
                                                <li key={idx} className="flex items-start space-x-3 text-text-gray font-medium">
                                                    <Check className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                                                    <span className="leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-6 border-t border-glass-border/30 space-y-4 flex flex-col items-center">
                                        {product.billing_period === 'one_time' && product.file_path ? (
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="flex items-center justify-center w-full py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                                            >
                                                <Download className="w-4 h-4 mr-2" /> {locale === 'en' ? 'Instant Download' : 'Unduh Instan'}
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/contact?product=${encodeURIComponent(product.name)}`}
                                                className="flex items-center justify-center w-full py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5"
                                            >
                                                {locale === 'en' ? 'Request Demo' : 'Minta Demo Layanan'} <ArrowUpRight className="w-4 h-4 ml-1.5" />
                                            </Link>
                                        )}
                                        
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark inline-flex items-center group"
                                        >
                                            {locale === 'en' ? 'View Details & Features' : 'Lihat Detail & Fitur'} <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                    </SpotlightCard>
                                    {product.is_popular && (
                                        <span 
                                            className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/30 border border-white/20 hover:scale-115 transition-transform cursor-help z-30" 
                                            title={locale === 'en' ? 'Top Recommendation' : 'Rekomendasi Utama'}
                                        >
                                            <ThumbsUp className="w-4 h-4" />
                                        </span>
                                    )}
                                </ScrollReveal>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-text-muted py-24 bg-glass-bg border border-glass-border rounded-3xl backdrop-blur-sm">
                                <Download className="w-16 h-16 mx-auto text-brand-blue/30 mb-4" />
                                <h3 className="text-xl font-bold text-text-main mb-2">{locale === 'en' ? 'Product Not Available' : 'Produk Belum Tersedia'}</h3>
                                <p className="text-sm">{locale === 'en' ? 'There are currently no active products for this category. Please check other categories.' : 'Saat ini belum ada produk yang aktif untuk kategori ini. Silakan cek kategori lainnya.'}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* View All Button if not filtering */}
                    {!category && allProducts.length > featuredProducts.length && (
                        <div className="text-center pt-10 pb-4">
                            <Link href="/products?category=business-software" className="inline-flex items-center px-6 py-3 text-sm font-bold text-text-gray bg-glass-bg border border-glass-border hover:border-brand-blue hover:text-brand-blue rounded-xl transition-colors">
                                {locale === 'en' ? 'Browse All Categories' : 'Telusuri Semua Kategori'} <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {/* Footnote */}
                    <div className="text-center text-xs text-text-muted font-medium pt-4">
                        {locale === 'en' ? '*All products include free updates and standard bug-fix warranty.' : '*Seluruh produk memiliki dukungan pembaruan gratis dan garansi bug-fix standar.'}{' '}
                        <Link href="/contact" className="text-brand-blue font-bold hover:underline inline-flex items-center">
                            Butuh Custom Enterprise? <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto pt-10 border-t border-glass-border/50">
                        <div className="text-center space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{locale === 'en' ? 'General Questions' : 'Pertanyaan Umum'}</span>
                            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-6 text-left">
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </div>
                )}

                {/* Footer Closing CTA Section */}
                <div className="max-w-4xl mx-auto pt-12 border-t border-glass-border">
                    <SpotlightCard className="p-10 text-center space-y-6 border border-glass-border bg-gradient-to-b from-glass-bg/40 to-glass-bg/25">
                        <div className="max-w-md mx-auto space-y-2">
                            <h4 className="text-xl md:text-2xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Still have questions?' : 'Masih punya pertanyaan lain?'}
                            </h4>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en' ? 'Our team is ready to help find the best digital architecture solution for your business.' : 'Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.'}
                            </p>
                        </div>
                        <div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-md shadow-brand-blue/15"
                            >
                                Hubungi Tim Kami
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>

            </div>
        </div>
    );
}
