import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { api, Product } from '../../../lib/api';
import SpotlightCard from '../../../components/SpotlightCard';
import ProductPurchaseCTA from '../../../components/ProductPurchaseCTA';
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
    Clock
} from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
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
    const { slug } = await params;
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
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Produk Tidak Ditemukan</h1>
                <Link href="/products" className="text-brand-blue hover:underline">
                    Kembali ke Katalog Produk
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
            return `${formatted} (Sekali Bayar)`;
        } else if (period === 'monthly') {
            return `${formatted} / bulan`;
        } else if (period === 'yearly') {
            return `${formatted} / tahun`;
        }
        return `${formatted} / ${period}`;
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background decoration spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* Back Button */}
                <Link
                    href="/products"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Produk
                </Link>

                {/* Main Product Frame */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Info & Description (Spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <SpotlightCard className="p-8 md:p-10 text-left border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    {product.category && (
                                        <span className="px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/15 text-[10px] font-black text-brand-blue uppercase tracking-widest rounded-md inline-block">
                                            {product.category.name}
                                        </span>
                                    )}
                                    <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight pt-2">
                                        {product.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-xs text-text-muted font-medium pt-1">
                                        {product.sku && <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-brand-blue" /> SKU: {product.sku}</span>}
                                        <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-brand-blue" /> Versi: {product.version}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-blue" /> Update Terbaru: Aktif</span>
                                    </div>
                                </div>

                                <div className="border-t border-glass-border/40 my-6" />

                                <div className="space-y-4">
                                    <h2 className="text-lg font-bold text-text-main">Deskripsi Produk</h2>
                                    <p className="text-text-gray text-base leading-relaxed font-medium">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Features Checkbox Grid */}
                        <SpotlightCard className="p-8 text-left border border-glass-border">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-text-main">Fitur Unggulan</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.features?.map((feature, i) => (
                                        <div key={i} className="flex items-start space-x-3 text-text-gray font-medium">
                                            <div className="w-5 h-5 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Gallery / Screenshot Placeholders */}
                        {product.gallery && product.gallery.length > 0 && (
                            <div className="space-y-6 text-left">
                                <h3 className="text-lg font-bold text-text-main">Preview & Screenshots</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.gallery.map((img, i) => {
                                        const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                                        const imageUrl = img.startsWith('http') ? img : `${storageUrl}/${img}`;
                                        return (
                                            <div key={i} className="relative aspect-video rounded-xl border border-glass-border overflow-hidden bg-glass-bg flex items-center justify-center group">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={imageUrl} 
                                                    alt={`${product.name} Preview ${i + 1}`} 
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Pricing, Licensing, & CTAs */}
                    <div className="space-y-6">
                        
                        {/* Transaction Card */}
                        <SpotlightCard className="p-8 text-left border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Investasi</span>
                                    <div className="text-3xl font-black text-brand-blue">
                                        {formatPrice(product.price, product.billing_period)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 text-xs text-text-gray font-medium">
                                        <Shield className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-text-main block">Dukungan Garansi</span>
                                            Dukungan teknis dan garansi perbaikan bug gratis.
                                        </div>
                                    </div>

                                    {product.license_info && (
                                        <div className="flex items-start space-x-3 text-xs text-text-gray font-medium">
                                            <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-bold text-text-main block">Lisensi Produk</span>
                                                {product.license_info}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-glass-border/40 my-4" />

                                <div className="space-y-3">
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

                        {/* Related Products list */}
                        {relatedProducts.length > 0 && (
                            <div className="space-y-4 text-left">
                                <h4 className="text-sm font-bold text-text-main tracking-wider uppercase">Produk Lainnya</h4>
                                <div className="space-y-3">
                                    {relatedProducts.map((p) => (
                                        <Link key={p.id} href={`/products/${p.slug}`} className="block group">
                                            <SpotlightCard className="p-4 border border-glass-border hover:border-brand-blue/30 transition-all flex justify-between items-center">
                                                <div>
                                                    <span className="text-xs font-bold text-text-main group-hover:text-brand-blue transition-colors block">{p.name}</span>
                                                    <span className="text-[10px] text-text-muted">{p.category?.name || 'Produk'}</span>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-blue transition-colors" />
                                            </SpotlightCard>
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
