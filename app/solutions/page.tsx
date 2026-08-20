import React from 'react';
import Link from 'next/link';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    Code, 
    Terminal, 
    Activity, 
    Database, 
    GraduationCap, 
    ArrowRight, 
    Layers, 
    Cpu, 
    ShieldCheck,
    Cloud,
    TrendingUp,
    Check,
    HelpCircle
} from 'lucide-react';
import { api, Pricing } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';
import ScrollReveal from '../../components/ScrollReveal';

const planInfoMap: Record<string, { main: { id: string; en: string }; sub: { id: string; en: string } }> = {
    'Starter Pack': {
        main: { id: 'UMKM & Startup', en: 'SMEs & Startups' },
        sub: { id: 'Untuk proyek skala kecil / validasi ide', en: 'For small scale projects & MVP validation' }
    },
    'Business Pro': {
        main: { id: 'Bisnis Berkembang', en: 'Growing Business' },
        sub: { id: 'Untuk skala menengah & pertumbuhan berkelanjutan', en: 'For medium scale & sustainable growth' }
    },
    'Enterprise Custom': {
        main: { id: 'Korporat & Enterprise', en: 'Corporates & Enterprise' },
        sub: { id: 'Untuk sistem kustom dengan kompleksitas tinggi', en: 'For custom systems with high complexity' }
    }
};

export const revalidate = 60; // Cache page for 60 seconds (ISR)

export default async function SolutionsPage() {
    const locale = await getLocaleServer();
    let pricings: Pricing[] = [];
    let settings = null;

    try {
        const [pricingData, companySettings] = await Promise.all([
            api.getPricings(),
            api.getCompanySettings().catch(() => null)
        ]);
        pricings = pricingData;
        settings = companySettings;
    } catch (err) {
        console.error('Failed to load data for solutions page:', err);
    }

    const phone = settings?.whatsapp || "6285157303035";

    const techStack = [
        'Next.js', 'React', 'TypeScript', 'TailwindCSS', 
        'Laravel', 'Node.js', 'PostgreSQL', 'Docker'
    ];

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <section className="container max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pb-6 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight pt-2">
                        Our <span className="text-brand-blue">Solutions</span>
                    </h1>
                    <p className="text-text-gray max-w-2xl mx-auto font-medium text-sm md:text-base leading-relaxed">
                        Membantu perusahaan membangun, mengembangkan, dan mentransformasi bisnis melalui teknologi, kreativitas, marketing, dan consulting.
                    </p>
                </div>

                {/* Dynamic Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    
                    {/* Card 1: App Builder Squad */}
                    <ScrollReveal animation="fade-up" delay={100}>
                        <Link href="/solutions/technology-solutions" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                            <SpotlightCard className="p-10 flex flex-col justify-between min-h-[380px] text-left border border-glass-border h-full group-hover:border-brand-blue/40 shadow-xl shadow-brand-blue/5">
                                <div className="space-y-6 z-10">
                                    <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                                        <Code className="w-4 h-4 text-brand-blue" />
                                        <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">APP BUILDER SQUAD</span>
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">Rekayasa Perangkat Lunak</h3>
                                    <p className="text-base text-text-gray leading-relaxed font-medium">
                                        Membangun produk digital berspesifikasi tinggi dengan arsitektur kode sumber bersih, cepat, terukur, dan aman (Web, Mobile & Enterprise ERP).
                                    </p>
                                    
                                    <ul className="text-sm text-text-gray space-y-3 pt-2 font-medium">
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Website & Mobile Apps (Native)</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Custom Software & ERP Systems</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-8 mt-auto flex items-center text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                    Pelajari Selengkapnya <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>

                    {/* Card 2: Brand Growth Division */}
                    <ScrollReveal animation="fade-up" delay={200}>
                        <Link href="/solutions/growth-marketing" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                            <SpotlightCard className="p-10 flex flex-col justify-between min-h-[380px] text-left border border-glass-border h-full group-hover:border-brand-blue/40 shadow-xl shadow-brand-blue/5">
                                <div className="space-y-6 z-10">
                                    <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                                        <TrendingUp className="w-4 h-4 text-brand-blue" />
                                        <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">BRAND GROWTH DIVISION</span>
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">Optimasi & Pemasaran</h3>
                                    <p className="text-base text-text-gray leading-relaxed font-medium">
                                        Mengakselerasi jangkauan brand secara terarah untuk mendominasi peringkat pencarian organik dan melipatgandakan konversi penjualan.
                                    </p>
                                    
                                    <ul className="text-sm text-text-gray space-y-3 pt-2 font-medium">
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Search Engine Optimization (SEO)</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Google Ads & Social Media Campaigns</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-8 mt-auto flex items-center text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                    Pelajari Selengkapnya <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>

                    {/* Card 3: Cloud & Security Hub */}
                    <ScrollReveal animation="fade-up" delay={100}>
                        <Link href="/solutions/cloud-cyber-security" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                            <SpotlightCard className="p-10 flex flex-col justify-between min-h-[380px] text-left border border-glass-border h-full group-hover:border-brand-blue/40 shadow-xl shadow-brand-blue/5">
                                <div className="space-y-6 z-10">
                                    <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                                        <Cloud className="w-4 h-4 text-brand-blue" />
                                        <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">CLOUD SERVICE HUB</span>
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">Infrastruktur & Cloud</h3>
                                    <p className="text-base text-text-gray leading-relaxed font-medium">
                                        Penyediaan arsitektur cloud server tangguh, orkestrasi DevOps berkelanjutan, dan audit keamanan berlapis tingkat enterprise.
                                    </p>
                                    
                                    <ul className="text-sm text-text-gray space-y-3 pt-2 font-medium">
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Premium Cloud Hosting & VPS</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Cyber Security & Penetration Testing</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-8 mt-auto flex items-center text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                    Pelajari Selengkapnya <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>

                    {/* Card 4: Digital Skill Lab */}
                    <ScrollReveal animation="fade-up" delay={200}>
                        <Link href="/solutions/digital-skill-lab" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                            <SpotlightCard className="p-10 flex flex-col justify-between min-h-[380px] text-left border border-glass-border h-full group-hover:border-brand-blue/40 shadow-xl shadow-brand-blue/5">
                                <div className="space-y-6 z-10">
                                    <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                                        <GraduationCap className="w-4 h-4 text-brand-blue" />
                                        <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">DIGITAL SKILL LAB</span>
                                    </div>
                                    
                                    <h3 className="text-3xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">Pelatihan & Edukasi Digital</h3>
                                    <p className="text-base text-text-gray leading-relaxed font-medium">
                                        Meningkatkan kompetensi teknis tim internal perusahaan Anda agar siap bersaing di tengah pesatnya perkembangan transformasi digital.
                                    </p>
                                    
                                    <ul className="text-sm text-text-gray space-y-3 pt-2 font-medium">
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Corporate IT Training & Bootcamps</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 text-brand-blue" />
                                            <span>Digital Marketing & UI/UX Masterclass</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-8 mt-auto flex items-center text-brand-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                    Pelajari Selengkapnya <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>
                </div>


                {/* Call-to-Action (CTA) Section */}
                <div className="max-w-5xl mx-auto pt-12">
                    <SpotlightCard className="p-10 text-center space-y-6 relative overflow-hidden border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                        {/* Glow decorative backdrop inside card */}
                        <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none -z-10" />
                        
                        <div className="max-w-xl mx-auto space-y-3">
                            <h3 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                Siap Mewujudkan Rencana Digital Anda?
                            </h3>
                            <p className="text-sm text-text-gray leading-relaxed font-medium">
                                Hubungi konsultan Diggity hari ini untuk menganalisis kebutuhan teknis, arsitektur sistem, dan perancangan strategi optimasi bisnis Anda secara gratis.
                            </p>
                        </div>
                        
                        <div className="pt-2">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15 group"
                            >
                                Mulai Konsultasi Gratis
                                <ArrowRight className="ml-2 w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>

            </section>
        </div>
    );
}
