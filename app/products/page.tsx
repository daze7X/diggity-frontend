import React from 'react';

import Link from 'next/link';

import { Metadata } from 'next';

import SpotlightCard from '../../components/SpotlightCard';

import ScrollReveal from '../../components/ScrollReveal';

import { api, CategoryHierarchy } from '../../lib/api';

import { getLocaleServer } from '../../lib/locale-server';

import { Layers, MonitorSmartphone, ArrowRight, ArrowUpRight } from 'lucide-react';
import SubServiceIcon from '../../components/SubServiceIcon';

import FaqAccordion from '../../components/FaqAccordion';



export const metadata: Metadata = {

    title: 'Products Hub - Diggity Agency',

    description: 'Jelajahi berbagai katalog produk perangkat lunak bisnis dan aset digital marketplace dari Diggity.',

};



export const revalidate = 60;



export default async function ProductsHubPage() {

    const locale = await getLocaleServer();



    let hierarchy: CategoryHierarchy[] = [];

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

                
                <div className="flex flex-col gap-8 max-w-5xl mx-auto mb-16">
                    {hierarchy.map((cat, i) => (
                        <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100}>
                            <SpotlightCard className="relative p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 border border-glass-border bg-gradient-to-br from-glass-bg to-brand-blue/5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/10">
                                
                                {/* Left Side: Category Info */}
                                <div className="w-full lg:w-[35%] flex flex-col items-start gap-4 shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                                        {cat.slug === 'business-software' ? (
                                            <Layers className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
                                        ) : (
                                            <MonitorSmartphone className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-black text-text-main">
                                            {cat.name}
                                        </h2>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">
                                            {cat.slug === 'business-software' 
                                                ? (locale === 'en' ? 'A suite of integrated business applications designed to help you manage end-to-end business operations.' : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.')
                                                : cat.slug === 'digital-marketplace'
                                                ? (locale === 'en' ? 'Ready-to-use digital assets and products for designers, developers, creators, and businesses.' : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.')
                                                : (locale === 'en' ? 'Innovative digital solutions crafted to elevate your business potential in the modern era.' : 'Solusi digital inovatif yang dirancang khusus untuk meningkatkan potensi bisnis Anda di era modern.')
                                            }
                                        </p>
                                    </div>
                                    
                                    <Link href={`/products/${cat.slug}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-dark transition-colors group">
                                        {locale === 'en' ? 'Explore Category' : 'Jelajahi Kategori'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                    </Link>
                                </div>
                                
                                {/* Right Side: Subcategories Grid */}
                                <div className="w-full lg:w-[65%]">
                                    {cat.children && cat.children.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            {cat.children.map((sub: any) => (
                                                <Link 
                                                    key={sub.slug} 
                                                    href={`/products/${cat.slug}/${sub.slug}`} 
                                                    className="flex items-start gap-3 p-4 rounded-xl bg-white/40 border border-glass-border/50 hover:bg-white hover:border-brand-blue/30 hover:shadow-md transition-all group/sub"
                                                >
                                                    <div className="mt-0.5 shrink-0">
                                                        <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue/70 group-hover/sub:text-brand-blue transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[13px] font-bold text-text-main group-hover/sub:text-brand-blue transition-colors mb-1 leading-tight">
                                                            {sub.name}
                                                        </h4>
                                                        <p className="text-[11px] text-text-gray font-medium">
                                                            {sub.products_count || 0} {locale === 'en' ? 'Products' : 'Produk'}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="h-full min-h-[160px] w-full flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-glass-border bg-glass-bg/30 text-center">
                                             <div className="w-10 h-10 rounded-full bg-glass-border/50 flex items-center justify-center mb-3">
                                                <Layers className="w-5 h-5 text-text-gray/50" />
                                             </div>
                                             <p className="text-sm text-text-gray font-bold">
                                                {locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}
                                             </p>
                                             <p className="text-xs text-text-muted mt-1 max-w-[250px]">
                                                {locale === 'en' ? 'New products are being prepared for this category.' : 'Produk-produk baru sedang disiapkan untuk kategori ini.'}
                                             </p>
                                        </div>
                                    )}
                                </div>

                            </SpotlightCard>
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
