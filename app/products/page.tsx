import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import { api, CategoryHierarchy } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import { Layers, MonitorSmartphone, ArrowRight, Building2, Hexagon, Triangle, Circle, Briefcase, PlayCircle } from 'lucide-react';
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
        <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 selection:bg-brand-blue/20">
            {/* 1. MARKETING HERO SECTION (Landing Page Style) */}
            <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-24 text-center space-y-8">
                {/* Subtle top badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                    </span>
                    {locale === 'en' ? 'Diggity Ecosystem 2.0' : 'Ekosistem Diggity 2.0'}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight leading-[1.1] max-w-4xl mx-auto">
                    {locale === 'en' 
                        ? 'One Digital Ecosystem to Accelerate Your Growth.' 
                        : 'Satu Ekosistem Digital untuk Akselerasi Bisnis Anda.'}
                </h1>
                
                <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed">
                    {locale === 'en'
                        ? 'Explore our enterprise-grade business software and marketplace assets. Designed to transform your workflow from end to end.'
                        : 'Jelajahi rangkaian perangkat lunak bisnis dan aset digital marketplace kami. Dirancang khusus untuk mentransformasi alur kerja Anda dari hulu ke hilir.'}
                </p>

                {/* Primary & Secondary CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-brand-blue-dark hover:shadow-lg hover:shadow-brand-blue/20 transition-all group">
                        {locale === 'en' ? 'Schedule a Demo' : 'Jadwalkan Demo Gratis'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="#catalog" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-text-main border border-glass-border font-bold text-[15px] hover:bg-gray-50 hover:shadow-sm transition-all group">
                        <PlayCircle className="w-4 h-4 mr-2 text-text-gray group-hover:text-brand-blue transition-colors" />
                        {locale === 'en' ? 'View Catalog' : 'Lihat Katalog Produk'}
                    </a>
                </div>
            </div>

            {/* 2. SOCIAL PROOF / TRUST SIGNALS */}
            <div className="border-y border-glass-border bg-white py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-xs font-bold text-text-muted uppercase tracking-widest mb-8">
                        {locale === 'en' ? 'Trusted by innovative companies' : 'Dipercaya oleh perusahaan inovatif terkemuka'}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
                        {/* Dummy Client Logos using Lucide as placeholders */}
                        <div className="flex items-center gap-2"><Hexagon className="w-6 h-6"/> <span className="font-black text-xl tracking-tighter">HEXA</span></div>
                        <div className="flex items-center gap-2"><Building2 className="w-6 h-6"/> <span className="font-black text-xl tracking-tighter">CORP</span></div>
                        <div className="flex items-center gap-2"><Triangle className="w-6 h-6"/> <span className="font-black text-xl tracking-tighter">VERTEX</span></div>
                        <div className="flex items-center gap-2"><Circle className="w-6 h-6"/> <span className="font-black text-xl tracking-tighter">O-TECH</span></div>
                        <div className="flex items-center gap-2"><Briefcase className="w-6 h-6"/> <span className="font-black text-xl tracking-tighter">WORKLY</span></div>
                    </div>
                </div>
            </div>

            {/* 3. CLEAN ENTERPRISE CATALOG SECTION */}
            <div id="catalog" className="max-w-5xl mx-auto px-6 py-24 space-y-24">
                {hierarchy.map((cat, i) => (
                    <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100}>
                        <div className="flex flex-col md:flex-row gap-12 md:gap-16 pt-16 border-t border-glass-border first:border-0 first:pt-0">
                            
                            {/* Left: Meta Info */}
                            <div className="w-full md:w-1/3 shrink-0 space-y-5">
                                <div className="w-12 h-12 rounded-xl bg-white border border-glass-border shadow-sm flex items-center justify-center">
                                    {cat.slug === 'business-software' ? (
                                        <Layers className="w-6 h-6 text-brand-blue" strokeWidth={1.5} />
                                    ) : (
                                        <MonitorSmartphone className="w-6 h-6 text-brand-blue" strokeWidth={1.5} />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-text-main tracking-tight mb-3">
                                        {cat.name}
                                    </h2>
                                    <p className="text-sm text-text-gray font-medium leading-relaxed">
                                        {cat.slug === 'business-software' 
                                            ? (locale === 'en' ? 'A complete suite of tools to manage and scale your business operations from end to end.' : 'Rangkaian alat lengkap untuk mengelola dan mengembangkan operasi bisnis Anda dari hulu ke hilir.')
                                            : cat.slug === 'digital-marketplace'
                                            ? (locale === 'en' ? 'Premium digital assets, templates, and resources for creators and developers.' : 'Aset digital premium, templat, dan sumber daya siap pakai untuk kreator dan developer.')
                                            : (locale === 'en' ? 'Innovative solutions tailored for modern business challenges.' : 'Solusi inovatif yang disesuaikan untuk tantangan bisnis modern.')
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right: Clean List / Grid */}
                            <div className="w-full md:w-2/3">
                                {cat.children && cat.children.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                                        {cat.children.map((sub: any) => (
                                            <Link 
                                                key={sub.slug} 
                                                href={`/products/${cat.slug}/${sub.slug}`} 
                                                className="group flex items-start gap-4 p-4 -ml-4 rounded-2xl hover:bg-white hover:shadow-sm hover:border-glass-border border border-transparent transition-all"
                                            >
                                                <div className="mt-0.5 p-2.5 rounded-lg bg-gray-100 group-hover:bg-brand-blue/10 transition-colors shrink-0">
                                                    <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className="w-5 h-5 text-text-gray group-hover:text-brand-blue transition-colors" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[15px] font-bold text-text-main group-hover:text-brand-blue transition-colors mb-1.5 leading-tight">
                                                        {sub.name}
                                                    </h4>
                                                    <p className="text-[13px] text-text-muted font-medium">
                                                        {sub.products_count || 0} {locale === 'en' ? 'Products' : 'Produk'}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className="px-3 py-1.5 rounded-full bg-white border border-glass-border text-[11px] font-bold text-text-gray tracking-wider uppercase">
                                            {locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}
                                        </span>
                                        <span className="text-sm text-text-muted font-medium">
                                            {locale === 'en' ? 'Features in development' : 'Modul sedang dalam pengembangan'}
                                        </span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* 4. FAQ Section */}
            {faqs.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 py-20 border-t border-glass-border/50">
                    <div className="text-center space-y-4 mb-12">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{locale === 'en' ? 'Support' : 'Bantuan'}</span>
                        <h3 className="text-3xl font-black text-text-main tracking-tight">Frequently Asked Questions</h3>
                    </div>
                    <div className="text-left bg-white p-8 md:p-10 rounded-3xl border border-glass-border shadow-sm">
                        <FaqAccordion faqs={faqs} />
                    </div>
                </div>
            )}
            
            {/* 5. Final CTA */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <SpotlightCard className="p-12 text-center space-y-8 border border-glass-border bg-white rounded-[2rem] shadow-sm">
                    <div className="max-w-lg mx-auto space-y-3">
                        <h4 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'Ready to transform your business?' : 'Siap mentransformasi bisnis Anda?'}
                        </h4>
                        <p className="text-base text-text-gray font-medium leading-relaxed">
                            {locale === 'en' ? 'Talk to our experts and discover how Diggity can help you achieve your goals faster.' : 'Diskusikan kebutuhan Anda dengan ahli kami dan wujudkan arsitektur digital impian Anda.'}
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-white bg-text-main hover:bg-black rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {locale === 'en' ? 'Contact Sales' : 'Hubungi Tim Konsultan'}
                        </Link>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
