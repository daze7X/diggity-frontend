import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { api, Product } from '../../../../../lib/api';
import { getLocaleServer } from '../../../../../lib/locale-server';
import SpotlightCard from '../../../../../components/SpotlightCard';
import ProductPurchaseCTA from '../../../../../components/ProductPurchaseCTA';
import { 
    ArrowLeft, 
    Check, 
    Download, 
    Shield, 
    Info, 
    Layers, 
    Cpu, 
    Sparkles, 
    ArrowUpRight,
    Tag,
    Clock,
    ChevronRight,
    LayoutGrid,
    CheckCircle2
} from 'lucide-react';
import SubServiceIcon from '../../../../../components/SubServiceIcon';

export const revalidate = 60;

interface Props {
    params: Promise<{ main: string; sub: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const product = await api.getProductBySlug(slug);
        return {
            title: `${product.name} | Diggity Products`,
            description: product.description || 'Pelajari selengkapnya tentang produk digital kami di Diggity.',
        };
    } catch {
        return {
            title: 'Detail Produk | Diggity',
        };
    }
}

export default async function ProductDetail({ params }: Props) {
    const locale = await getLocaleServer();
    const { main, sub, slug } = await params;
    let product: Product | null = null;
    let relatedProducts: Product[] = [];

    try {
        product = await api.getProductBySlug(slug);
        const allProducts = await api.getProducts();
        relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 2);
    } catch (error) {
        console.error('Error fetching product detail:', error);
    }

    if (!product) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4 min-h-screen">
                <h1 className="text-2xl font-bold text-text-main">{locale === 'en' ? 'Product Not Found' : 'Produk Tidak Ditemukan'}</h1>
                <Link href="/products" className="text-brand-blue hover:underline">
                    {locale === 'en' ? 'Back to Product Catalog' : 'Kembali ke Katalog Produk'}
                </Link>
            </div>
        );
    }

    const formatPrice = (price: number, period: string) => {
        const formatted = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);

        if (period === 'one_time') {
            return locale === 'en' ? `${formatted} (One-time)` : `${formatted} (Sekali Bayar)`;
        } else if (period === 'monthly') {
            return locale === 'en' ? `${formatted} / month` : `${formatted} / bulan`;
        } else if (period === 'yearly') {
            return locale === 'en' ? `${formatted} / year` : `${formatted} / tahun`;
        }
        return `${formatted} / ${period}`;
    };

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    <div className="max-w-3xl space-y-6">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center flex-wrap text-[11px] font-bold text-white/60 uppercase tracking-widest space-x-2">
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href={`/products#catalog`} className="hover:text-white transition-colors">{(product.category as any)?.parent?.name || main}</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href={`/products/${main}/${sub}`} className="hover:text-white transition-colors">{product.category?.name || sub}</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">{product.name}</span>
                        </nav>

                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl">
                                <SubServiceIcon slug={product.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>
                        </div>
                        
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl">
                            {product.description || (locale === 'en' ? `Professional solution for ${product.name} by Diggity.` : `Solusi profesional ${product.name} dari Diggity.`)}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white/80 pt-2">
                            {product.sku && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <Tag className="w-3.5 h-3.5" /> SKU: {product.sku}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                                <Layers className="w-3.5 h-3.5" /> {locale === 'en' ? 'Version' : 'Versi'}: {product.version}
                            </span>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex shrink-0 relative items-center justify-center w-72 h-72">
                        {/* Glowing Pulse Aura */}
                        <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                        
                        {/* Morphing Blob & Levitation */}
                        <div className="relative w-64 h-64 flex items-center justify-center animate-float">
                            {/* The morphing shape */}
                            <div 
                                className="absolute inset-0 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl overflow-hidden animate-morph-blob" 
                            >
                                {/* Spinning Gradient inside blob */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                            </div>
                            
                            {/* Dynamic Icon */}
                            <div className="relative z-10 flex items-center justify-center drop-shadow-2xl">
                                <SubServiceIcon 
                                    slug={product.slug || ""} 
                                    fallbackCategoryIcon="layers" 
                                    className="w-28 h-28 text-white/80" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Details & Gallery */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Features Card */}
                        <div className="bg-white dark:bg-glass-bg border border-glass-border shadow-xl rounded-3xl p-8 md:p-10">
                            <h2 className="text-2xl font-black text-text-main tracking-tight mb-8">
                                {locale === 'en' ? 'Key Features & Capabilities' : 'Fitur & Kapabilitas Utama'}
                            </h2>
                            
                            {product.features && product.features.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {product.features.map((feature, i) => (
                                        <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-brand-bg/50 border border-glass-border hover:border-brand-blue/30 transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm text-text-main font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-glass-border rounded-2xl bg-gray-50/50 dark:bg-brand-bg/50">
                                    <p className="text-text-muted font-medium">{locale === 'en' ? 'Detailed features are not added for this product yet.' : 'Fitur terperinci belum ditambahkan untuk produk ini.'}</p>
                                </div>
                            )}
                        </div>

                        {/* Gallery Card */}
                        {product.gallery && product.gallery.length > 0 && (
                            <div className="bg-white dark:bg-glass-bg border border-glass-border shadow-xl rounded-3xl p-8 md:p-10">
                                <h2 className="text-2xl font-black text-text-main tracking-tight mb-8">
                                    {locale === 'en' ? 'Product Screenshots' : 'Tangkapan Layar Produk'}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {product.gallery.map((img, i) => {
                                        const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                                        const imageUrl = img.startsWith('http') ? img : `${storageUrl}/${img}`;
                                        return (
                                            <div key={i} className="relative aspect-video rounded-2xl border border-glass-border overflow-hidden bg-gray-100 dark:bg-brand-bg flex items-center justify-center group shadow-md hover:shadow-xl transition-all">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={imageUrl} 
                                                    alt={`${product!.name} Preview ${i + 1}`} 
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Pricing & Action */}
                    <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-32">
                        <SpotlightCard className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-2xl">
                            <div className="space-y-8">
                                <div>
                                    <span className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">
                                        {locale === 'en' ? 'Investment' : 'Investasi'}
                                    </span>
                                    <div className="text-4xl font-black text-brand-blue tracking-tight">
                                        {formatPrice(Number(product.price), product.billing_period)}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-glass-border">
                                    <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Shield className="w-3.5 h-3.5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-text-main block">{locale === 'en' ? 'Warranty Support' : 'Dukungan Garansi'}</span>
                                            <span className="text-xs">{locale === 'en' ? 'Technical support & bug fixes included.' : 'Dukungan teknis & garansi perbaikan bug.'}</span>
                                        </div>
                                    </div>

                                    {product.license_info && (
                                        <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                                                <Info className="w-3.5 h-3.5 text-brand-blue" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-text-main block">{locale === 'en' ? 'Product License' : 'Lisensi Produk'}</span>
                                                <span className="text-xs">{product.license_info}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-glass-border">
                                    <ProductPurchaseCTA
                                        productId={product.id}
                                        productSlug={product.slug}
                                        price={Number(product.price)}
                                        name={product.name}
                                        billingPeriod={product.billing_period}
                                        filePath={product.file_path || null}
                                    />
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="bg-white dark:bg-glass-bg border border-glass-border shadow-xl rounded-3xl p-6">
                                <h4 className="text-[11px] font-black text-text-muted tracking-widest uppercase mb-4">
                                    {locale === 'en' ? 'Other Products' : 'Produk Lainnya'}
                                </h4>
                                <div className="space-y-3">
                                    {relatedProducts.map((p) => (
                                        <Link key={p.id} href={`/products/${main}/${sub}/${p.slug}`} className="block group">
                                            <div className="p-3 rounded-2xl bg-gray-50/50 dark:bg-brand-bg/50 border border-glass-border group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-brand-bg shadow-sm border border-glass-border flex items-center justify-center shrink-0">
                                                        <SubServiceIcon slug={p.slug} fallbackCategoryIcon="layers" className="w-4 h-4 text-text-gray group-hover:text-brand-blue" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors leading-tight">{p.name}</h5>
                                                        <p className="text-[10px] text-text-muted mt-0.5">{p.category?.name || 'Product'}</p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-text-gray group-hover:text-brand-blue transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
