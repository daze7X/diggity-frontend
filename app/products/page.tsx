import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { api, Product, Faq } from '../../lib/api';
import { Check, ArrowRight, Shield, Download, ArrowUpRight, ThumbsUp } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import FaqAccordion from '../../components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Katalog Produk Digital & Solusi Bisnis - Diggity',
  description: 'Jelajahi berbagai produk digital unggulan dari Diggity, mulai dari Business Software, AI Products, hingga Cloud Platform untuk menumbuhkan bisnis Anda secara terstruktur.',
};

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
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
            {/* Background decorative spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight pt-2">
                        Products
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                        Menyediakan produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomasi, dan skalabilitas bisnis.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Link 
                        href="/products" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${!category ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:bg-glass-bg/80'}`}
                    >
                        Semua Produk
                    </Link>
                    <Link 
                        href="/products?category=business-software" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${category === 'business-software' ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:bg-glass-bg/80'}`}
                    >
                        Business Software
                    </Link>
                    <Link 
                        href="/products?category=ai-products" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${category === 'ai-products' ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:bg-glass-bg/80'}`}
                    >
                        AI Products
                    </Link>
                    <Link 
                        href="/products?category=cloud-products" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${category === 'cloud-products' ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:bg-glass-bg/80'}`}
                    >
                        Cloud Products
                    </Link>
                    <Link 
                        href="/products?category=digital-marketplace" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${category === 'digital-marketplace' ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:bg-glass-bg/80'}`}
                    >
                        Digital Marketplace
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 ${
                                        product.is_popular
                                            ? 'scale-100 md:scale-[1.02] z-10'
                                            : ''
                                    }`}
                                >
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
                                                    / {product.billing_period === 'one_time' ? 'sekali bayar' : product.billing_period === 'monthly' ? 'bulan' : 'tahun'}
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
                                                <Download className="w-4 h-4 mr-2" /> Unduh Instan
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/contact?product=${encodeURIComponent(product.name)}`}
                                                className="flex items-center justify-center w-full py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5"
                                            >
                                                Minta Demo Layanan <ArrowUpRight className="w-4 h-4 ml-1.5" />
                                            </Link>
                                        )}
                                        
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark inline-flex items-center group"
                                        >
                                            Lihat Detail & Fitur <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                                {product.is_popular && (
                                    <span 
                                        className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/30 border border-white/20 hover:scale-115 transition-transform cursor-help z-30" 
                                        title="Rekomendasi Utama"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                    </span>
                                )}
                            </div>
                        ))
                        ) : (
                            <div className="col-span-full text-center text-text-muted py-24 bg-glass-bg border border-glass-border rounded-3xl backdrop-blur-sm">
                                <Download className="w-16 h-16 mx-auto text-brand-blue/30 mb-4" />
                                <h3 className="text-xl font-bold text-text-main mb-2">Produk Belum Tersedia</h3>
                                <p className="text-sm">Saat ini belum ada produk yang aktif untuk kategori ini. Silakan cek kategori lainnya.</p>
                            </div>
                        )}
                    </div>

                    {/* Footnote */}
                    <div className="text-center text-xs text-text-muted font-medium pt-4">
                        *Seluruh produk memiliki dukungan pembaruan gratis dan garansi bug-fix standar.{' '}
                        <Link href="/contact" className="text-brand-blue font-bold hover:underline inline-flex items-center">
                            Butuh Custom Enterprise? <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Pertanyaan Umum</span>
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
                                Masih punya pertanyaan lain?
                            </h4>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.
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
