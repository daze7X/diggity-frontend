import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { getLocaleServer } from '../../../lib/locale-server';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { ChevronRight, ArrowRight } from 'lucide-react';
import SubServiceIcon from '../../../components/SubServiceIcon';

export const revalidate = 60;

export default async function MainCategoryPage({ params }: { params: { main: string } }) {
    const locale = await getLocaleServer();
    const hierarchy = await api.getProductHierarchy().catch(() => []);
    
    const mainCat = hierarchy.find(c => c.slug === params.main);
    
    if (!mainCat) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 text-black bg-white">
                <h1>DEBUG INFO</h1>
                <p>Params Main: {params.main}</p>
                <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
                <textarea className="w-full h-96 mt-4 p-4 border text-black" readOnly value={JSON.stringify(hierarchy, null, 2)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-bg pt-28 pb-20 px-6 sm:px-12 relative overflow-hidden">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto mb-8 relative z-10">
                <nav className="flex text-xs font-semibold text-text-muted space-x-2">
                    <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-brand-blue">{mainCat.name}</span>
                </nav>
            </div>

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                
                <div className="max-w-3xl space-y-4">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-[1.1]">
                            {mainCat.name}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={100}>
                        <p className="text-base text-text-gray font-medium leading-relaxed">
                            {mainCat.slug === 'business-software'
                                ? 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.'
                                : 'Katalog produk dan aset digital siap pakai yang dapat digunakan oleh designer, developer, creator, maupun bisnis.'}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mainCat.children?.map((sub, i) => (
                        <ScrollReveal key={sub.slug} animation="fade-up" delay={i * 50}>
                            <Link href={`/products/${mainCat.slug}/${sub.slug}`} className="block h-full group">
                                <SpotlightCard className="h-full p-6 flex flex-col gap-4 border border-glass-border bg-glass-bg transition-all hover:bg-glass-bg/80 hover:border-brand-blue/30 group-hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue" />
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <h3 className="text-lg font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                            {sub.name}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium">
                                            {sub.products_count || 0} {locale === 'en' ? 'Products' : 'Produk'}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-glass-border/50 flex items-center justify-between text-xs font-bold text-text-muted group-hover:text-brand-blue transition-colors">
                                        {locale === 'en' ? 'View Products' : 'Lihat Produk'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </div>
    );
}
