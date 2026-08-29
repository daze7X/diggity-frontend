import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '../../../../lib/api';
import { getLocaleServer } from '../../../../lib/locale-server';
import ScrollReveal from '../../../../components/ScrollReveal';
import SpotlightCard from '../../../../components/SpotlightCard';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import SubServiceIcon from '../../../../components/SubServiceIcon';

export const revalidate = 60;

export default async function SubCategoryPage({ params }: { params: { main: string, sub: string } }) {
    const locale = await getLocaleServer();
    
    let subcategory = null;
    let products = [];
    
    try {
        const res = await api.getProductsBySubcategory(params.sub);
        subcategory = res.subcategory;
        products = res.products;
    } catch {
        notFound();
    }

    // Verify it belongs to the main category
    if (subcategory?.parent?.slug !== params.main) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-brand-bg pt-28 pb-20 px-6 sm:px-12 relative overflow-hidden">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto mb-8 relative z-10">
                <nav className="flex text-xs font-semibold text-text-muted space-x-2">
                    <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
                    <span>/</span>
                    <Link href={`/products/${params.main}`} className="hover:text-brand-blue transition-colors">{subcategory?.parent?.name}</Link>
                    <span>/</span>
                    <span className="text-brand-blue">{subcategory?.name}</span>
                </nav>
            </div>

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                
                <div className="max-w-3xl space-y-4">
                    <ScrollReveal>
                        <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6">
                            <SubServiceIcon slug={subcategory?.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-[1.1]">
                            {subcategory?.name}
                        </h1>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: any, i: number) => (
                        <ScrollReveal key={product.slug} animation="fade-up" delay={i * 50}>
                            <SpotlightCard className="h-full p-6 md:p-8 flex flex-col gap-6 border border-glass-border bg-glass-bg transition-all hover:-translate-y-1 relative group">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-xl font-extrabold text-text-main leading-tight group-hover:text-brand-blue transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-text-gray font-medium leading-relaxed line-clamp-3">
                                        {product.description}
                                    </p>
                                </div>
                                
                                <div className="pt-6 border-t border-glass-border/30 mt-auto">
                                    <Link
                                        href={`/products/${params.main}/${params.sub}/${product.slug}`}
                                        className="flex items-center justify-center w-full py-3 text-sm font-bold text-brand-blue bg-brand-blue/10 hover:bg-brand-blue hover:text-white rounded-xl transition-all"
                                    >
                                        {locale === 'en' ? 'View Details' : 'Lihat Detail'} <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </Link>
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    ))}
                    
                    {products.length === 0 && (
                        <div className="col-span-full text-center py-20 border border-glass-border rounded-3xl bg-glass-bg/50">
                            <p className="text-text-muted font-medium">Belum ada produk di kategori ini.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
