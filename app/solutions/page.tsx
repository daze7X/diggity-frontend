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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    
                    {/* Card 1: App Builder Squad */}
                    <Link href="/solutions/technology-solutions" className="md:col-span-2 group block cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                        <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px] text-left relative overflow-hidden border border-glass-border h-full group-hover:border-brand-blue/30">
                            <div className="space-y-4 z-10">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">
                                    APP BUILDER SQUAD
                                </span>
                                <h3 className="text-2xl font-bold text-text-main group-hover:text-brand-blue transition-colors">Rekayasa Perangkat Lunak</h3>
                                <p className="text-sm text-text-gray leading-relaxed max-w-md">
                                    Membangun produk digital berspesifikasi tinggi dengan arsitektur kode sumber bersih, cepat, terukur, dan aman.
                                </p>
                                <ul className="text-xs text-text-gray grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 list-none font-medium">
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Website & Web Apps (Next.js / React)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Mobile Apps (iOS & Android Native)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Custom Software & ERP Systems</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>UI/UX Figma Design & Wireframing</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Interactive Tech Badge stack */}
                            <div className="pt-6 border-t border-glass-border/60 z-10 mt-4">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block mb-3">Teknologi Utama</span>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-glass-bg border border-glass-border rounded-md text-[10px] font-mono font-bold text-text-main">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>

                    {/* Card 2: Brand Growth Division */}
                    <Link href="/solutions/growth-marketing" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                        <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px] text-left border border-glass-border h-full group-hover:border-brand-blue/30">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">
                                    BRAND GROWTH DIVISION
                                </span>
                                <h3 className="text-xl font-bold text-text-main group-hover:text-brand-blue transition-colors">Optimasi & Pemasaran</h3>
                                <p className="text-xs text-text-gray leading-relaxed">
                                    Mengakselerasi jangkauan brand secara terarah untuk mendominasi peringkat pencarian organik dan melipatgandakan tingkat konversi penjualan.
                                </p>
                                <ul className="text-[11px] text-text-gray space-y-2 list-none font-medium">
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Search Engine Optimization (SEO)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Google Ads & PPC Campaigns</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Social Media Marketing & Strategy</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Visual Growth Metric mock */}
                            <div className="p-4 bg-neutral-950/10 dark:bg-neutral-950/20 border border-glass-border rounded-xl space-y-2 mt-4">
                                <div className="flex items-center justify-between text-[10px] font-bold text-text-muted">
                                    <span>PERFORMA KLIEN</span>
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-lg font-black text-text-main">+310%</div>
                                        <div className="text-[9px] text-text-gray font-semibold">Trafik Organik</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-black text-emerald-500">4.8%</div>
                                        <div className="text-[9px] text-text-gray font-semibold">Conversion Rate</div>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>

                    {/* Card 3: Cloud Service Hub */}
                    <Link href="/solutions/cloud-cyber-security" className="group block cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                        <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px] text-left border border-glass-border h-full group-hover:border-brand-blue/30">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">
                                    CLOUD SERVICE HUB
                                </span>
                                <h3 className="text-xl font-bold text-text-main group-hover:text-brand-blue transition-colors">Infrastruktur & Cloud</h3>
                                <p className="text-xs text-text-gray leading-relaxed">
                                    Penyediaan arsitektur cloud server tangguh berkecepatan tinggi yang aman dari serangan siber, dipantau penuh 24/7.
                                </p>
                                <ul className="text-[11px] text-text-gray space-y-2 list-none font-medium">
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Premium VPS & Dedicated Hosting</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Cloudflare CDN & SSL Integration</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Business Domain & Secure Mail</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Visual Server Status Cluster mock */}
                            <div className="p-4 bg-neutral-950/10 dark:bg-neutral-950/20 border border-glass-border rounded-xl space-y-2.5 mt-4">
                                <div className="flex items-center justify-between text-[10px] font-bold text-text-muted">
                                    <span>INFRASTRUCTURE STATUS</span>
                                    <Cloud className="w-3.5 h-3.5 text-brand-blue" />
                                </div>
                                <div className="space-y-1.5 text-[9px] font-mono">
                                    <div className="flex justify-between items-center">
                                        <span className="text-text-gray">sg-primary-node:</span>
                                        <span className="text-emerald-500 font-bold flex items-center space-x-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span>ONLINE</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-text-gray">hk-backup-node:</span>
                                        <span className="text-emerald-500 font-bold flex items-center space-x-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span>STANDBY</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>

                    {/* Card 4: Digital Skill Lab */}
                    <Link href="/solutions/digital-skill-lab" className="md:col-span-2 group block cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                        <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px] text-left border border-glass-border h-full group-hover:border-brand-blue/30">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">
                                    DIGITAL SKILL LAB
                                </span>
                                <h3 className="text-2xl font-bold text-text-main group-hover:text-brand-blue transition-colors">Pelatihan & Edukasi Digital</h3>
                                <p className="text-sm text-text-gray leading-relaxed max-w-md">
                                    Meningkatkan kompetensi teknis tim internal perusahaan Anda agar siap bersaing di tengah pesatnya perkembangan transformasi teknologi digital.
                                </p>
                                <ul className="text-xs text-text-gray grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 list-none font-medium">
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Corporate IT Training & Bootcamps</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Figma UI/UX & Design Workshops</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Custom Software Development Workshop</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>Digital Marketing Masterclass & Analytics</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Accreditation and Cert mock */}
                            <div className="pt-6 border-t border-glass-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block mb-1">Kurikulum Standar Industri</span>
                                    <p className="text-[11px] text-text-gray font-medium">Sertifikat kelayakan kompetensi digital resmi pasca-pelatihan.</p>
                                </div>
                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-brand-blue/5 border border-brand-blue/15 rounded-lg text-brand-blue text-[10px] font-bold">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Certified Digital Specialist</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>
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
