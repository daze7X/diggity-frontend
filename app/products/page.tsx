import React from 'react';

import Link from 'next/link';

import { Metadata } from 'next';

import SpotlightCard from '../../components/SpotlightCard';

import ScrollReveal from '../../components/ScrollReveal';

import { api, CategoryHierarchy } from '../../lib/api';

import { getLocaleServer } from '../../lib/locale-server';

import { Layers, MonitorSmartphone, ArrowRight, ArrowUpRight, Store, Bot, Cloud, Sparkles } from 'lucide-react';
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

                
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto mb-20 relative z-10">
                    {hierarchy.map((cat, i) => {
                        const isBusiness = cat.slug === 'business-software';
                        const isMarketplace = cat.slug === 'digital-marketplace';
                        const isAI = cat.slug === 'ai-products';
                        const isCloud = cat.slug === 'cloud-products';

                        let colSpan = "md:col-span-4";
                        if (isBusiness || isMarketplace) colSpan = "md:col-span-8";

                        let bgGradient = "from-glass-bg to-brand-blue/5 border-glass-border";
                        let iconColor = "text-brand-blue";
                        let hoverBorder = "hover:border-brand-blue/30 hover:shadow-brand-blue/10";
                        let MainIcon = Layers;

                        if (isBusiness) {
                            bgGradient = "from-blue-500/10 via-brand-bg to-indigo-500/5 border-blue-500/20";
                            iconColor = "text-blue-500";
                            hoverBorder = "hover:border-blue-500/40 hover:shadow-blue-500/20";
                            MainIcon = Layers;
                        } else if (isMarketplace) {
                            bgGradient = "from-emerald-500/10 via-brand-bg to-teal-500/5 border-emerald-500/20";
                            iconColor = "text-emerald-500";
                            hoverBorder = "hover:border-emerald-500/40 hover:shadow-emerald-500/20";
                            MainIcon = Store;
                        } else if (isAI) {
                            bgGradient = "from-purple-500/10 via-brand-bg to-fuchsia-500/5 border-purple-500/20";
                            iconColor = "text-purple-500";
                            hoverBorder = "hover:border-purple-500/40 hover:shadow-purple-500/20";
                            MainIcon = Bot;
                        } else if (isCloud) {
                            bgGradient = "from-cyan-500/10 via-brand-bg to-sky-500/5 border-cyan-500/20";
                            iconColor = "text-cyan-500";
                            hoverBorder = "hover:border-cyan-500/40 hover:shadow-cyan-500/20";
                            MainIcon = Cloud;
                        }

                        return (
                            <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100} className={colSpan}>
                                <SpotlightCard className={`relative h-full p-8 md:p-10 flex flex-col gap-8 border bg-gradient-to-br ${bgGradient} transition-all duration-500 ${hoverBorder} overflow-hidden group`}>
                                    
                                    {/* Giant Watermark Icon */}
                                    <MainIcon className={`absolute -right-8 -bottom-8 w-64 h-64 opacity-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 ${iconColor} pointer-events-none`} />
                                    
                                    {/* Header */}
                                    <div className="flex flex-col gap-5 relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/60 border border-white flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md group-hover:scale-110 transition-transform duration-500`}>
                                            <MainIcon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-text-main mb-3 tracking-tight">
                                                {cat.name}
                                            </h2>
                                            <p className="text-sm text-text-gray font-medium leading-relaxed max-w-lg">
                                                {cat.slug === 'business-software' 
                                                    ? (locale === 'en' ? 'A suite of integrated business applications designed to help you manage end-to-end business operations.' : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.')
                                                    : cat.slug === 'digital-marketplace'
                                                    ? (locale === 'en' ? 'Ready-to-use digital assets and products for designers, developers, creators, and businesses.' : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.')
                                                    : (locale === 'en' ? 'Innovative digital solutions crafted to elevate your business potential in the modern era.' : 'Solusi digital inovatif yang dirancang khusus untuk meningkatkan potensi bisnis Anda di era modern.')
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content (Subcategories or Coming Soon) */}
                                    <div className="mt-auto relative z-10 pt-6">
                                        {cat.children && cat.children.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {cat.children.map((sub: any) => (
                                                    <Link 
                                                        key={sub.slug} 
                                                        href={`/products/${cat.slug}/${sub.slug}`} 
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-glass-border hover:bg-white hover:shadow-sm transition-all group/sub backdrop-blur-sm"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg bg-white shadow-sm border border-glass-border/50 flex items-center justify-center shrink-0 group-hover/sub:border-${iconColor.split('-')[1]}-500/30 transition-colors`}>
                                                            <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className={`w-4 h-4 ${iconColor} group-hover/sub:scale-110 transition-transform`} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[13px] font-bold text-text-main leading-tight group-hover/sub:text-brand-blue transition-colors">{sub.name}</h4>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-glass-border/80 bg-white/30 backdrop-blur-sm">
                                                <div className="w-8 h-8 rounded-full bg-glass-border flex items-center justify-center shrink-0">
                                                    <Sparkles className="w-4 h-4 text-text-gray/70" />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-text-gray">{locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}</p>
                                                    <p className="text-[11px] text-text-muted mt-0.5">{locale === 'en' ? 'Exclusive features in development' : 'Fitur eksklusif sedang dalam tahap persiapan'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        );
                    })}
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
