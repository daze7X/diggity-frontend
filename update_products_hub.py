import sys

def modify():
    content = """import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import { api } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import { Layers, MonitorSmartphone, ArrowRight, ArrowUpRight } from 'lucide-react';
import FaqAccordion from '../../components/FaqAccordion';

export const metadata: Metadata = {
    title: 'Products Hub - Diggity Agency',
    description: 'Jelajahi berbagai katalog produk perangkat lunak bisnis dan aset digital marketplace dari Diggity.',
};

export const revalidate = 60;

export default async function ProductsHubPage() {
    const locale = await getLocaleServer();

    let hierarchy: any[] = [];
    let faqs: any[] = [];
    try {
        const [hierRes, faqsRes] = await Promise.all([
            api.getProductHierarchy(),
            api.getFaqs(),
        ]);
        hierarchy = hierRes || [];
        faqs = faqsRes || [];
    } catch {
        // Fallback
    }

    return (
        <div className="min-h-screen bg-brand-bg pt-28 pb-20 px-6 sm:px-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-16 relative z-10">
                
                {/* 🌟 HERO SECTION 🌟 */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <ScrollReveal>
                        <span className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full inline-block">
                            {locale === 'en' ? 'PRODUCT HUB' : 'KATALOG PRODUK'}
                        </span>
                    </ScrollReveal>
                    
                    <ScrollReveal animation="fade-up" delay={100}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main tracking-tight leading-[1.1]">
                            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">Products</span>
                        </h1>
                    </ScrollReveal>
                    
                    <ScrollReveal animation="fade-up" delay={200}>
                        <p className="text-base md:text-lg text-text-gray leading-relaxed font-medium">
                            {locale === 'en'
                                ? 'Explore our suite of business software and digital marketplace assets designed to accelerate your growth.'
                                : 'Jelajahi rangkaian aplikasi perangkat lunak bisnis dan aset digital marketplace kami yang dirancang untuk mempercepat pertumbuhan Anda.'}
                        </p>
                    </ScrollReveal>
                </div>

                {/* 🌟 MAIN CATEGORIES 🌟 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {hierarchy.map((cat, i) => (
                        <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100}>
                            <Link href={`/products/${cat.slug}`} className="block h-full group">
                                <SpotlightCard className="relative h-full p-8 md:p-12 flex flex-col gap-6 border border-glass-border bg-gradient-to-br from-glass-bg to-brand-blue/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-brand-blue/10">
                                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/20 transition-all duration-500" />
                                    
                                    <div className="flex items-start justify-between">
                                        <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-300">
                                            {cat.slug === 'business-software' ? (
                                                <Layers className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                            ) : (
                                                <MonitorSmartphone className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                            )}
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold border border-brand-blue/20">
                                            {cat.children?.length || 0} Subcategories
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-black text-text-main group-hover:text-brand-blue transition-colors">
                                            {cat.name}
                                        </h2>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">
                                            {cat.slug === 'business-software' 
                                                ? (locale === 'en' ? 'A suite of integrated business applications designed to help you manage end-to-end business operations.' : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.')
                                                : (locale === 'en' ? 'Ready-to-use digital assets and products for designers, developers, creators, and businesses.' : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.')
                                            }
                                        </p>
                                    </div>
                                    
                                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                        {cat.children?.slice(0, 4).map(sub => (
                                            <span key={sub.slug} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-glass-bg border border-glass-border text-text-muted">
                                                {sub.name}
                                            </span>
                                        ))}
                                        {(cat.children?.length || 0) > 4 && (
                                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-glass-bg border border-glass-border text-text-muted">
                                                +{(cat.children?.length || 0) - 4}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-brand-blue">
                                        {locale === 'en' ? 'Explore Category' : 'Jelajahi Kategori'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </ScrollReveal>
                    ))}
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
                <div className="max-w-4xl mx-auto pt-4 border-t border-glass-border">
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
"""
    with open('app/products/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Rewrote app/products/page.tsx")

modify()
