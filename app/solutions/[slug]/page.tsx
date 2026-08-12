import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { api } from '../../../lib/api';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowLeft, 
    Code, 
    Cpu, 
    Palette, 
    TrendingUp, 
    Server, 
    HelpCircle, 
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
    code: Code,
    cpu: Cpu,
    palette: Palette,
    'trending-up': TrendingUp,
    server: Server,
    'help-circle': HelpCircle,
    'shield-check': ShieldCheck,
};

// Sub-services lists mapped from Business Pillars Diggity Spec
const subServicesMap: Record<string, string[]> = {
    'technology-solutions': [
        'Website Development (Next.js, React, Laravel)',
        'Mobile Apps Development (iOS & Android Native)',
        'Custom Software & ERP Systems Development',
        'Custom E-Commerce & Retail Platform Engineering',
        'Government Digital Services & Portal Solutions',
        'API Design & Core Systems Integration'
    ],
    'ai-emerging-technology': [
        'Artificial Intelligence & Agent Development',
        'Smart AI Chatbots & Customer Assistants',
        'Machine Learning Models & Integration',
        'Business Intelligence & Big Data Analytics',
        'IoT (Internet of Things) Hardware/Software Solutions',
        'Robotic Process Automation (RPA)'
    ],
    'creative-brand-experience': [
        'Brand Strategy, Naming & Consulting',
        'Corporate Branding & Visual Identity System',
        'UI/UX Design, Figma Wireframing & Prototyping',
        'Professional Photography & High-End Videography',
        'Motion Graphics & 2D/3D Animation Assets',
        'Creative Advertising Campaigns & Collaterals'
    ],
    'growth-marketing': [
        'Search Engine Optimization (SEO) & Audits',
        'Google Ads & Search Engine Marketing (SEM)',
        'Meta Ads (Facebook, Instagram & Audience Network)',
        'TikTok & Social Media Influencer Sourcing',
        'Social Media Management & Organic Growth Strategy',
        'Marketplace Store Optimization & Ads (Shopee/Tokopedia)'
    ],
    'cloud-cyber-security': [
        'Premium Cloud Hosting & Server Provisioning',
        'VPS (Virtual Private Server) Configurations',
        'DevOps Orchestration & Continuous Delivery (CI/CD)',
        'Cyber Security Audits & Compliance Assessment',
        'Penetration Testing & Vulnerability Assessment',
        'Managed Cloud Infrastructure & SLA Support'
    ],
    'consulting': [
        'IT Consulting & Technical Feasibility Studies',
        'Corporate Digital Transformation Advisory',
        'Enterprise Software Architecture Design',
        'System Auditing & Technology Maturity Assessment'
    ]
};

export const revalidate = 60; // ISR cache data for 60 seconds

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const service = await api.getServiceBySlug(slug);
        return {
            title: `${service.name} | Diggity Service`,
            description: service.description || 'Pelajari selengkapnya tentang layanan profesional kami di Diggity.',
        };
    } catch {
        return {
            title: 'Layanan Profesional | Diggity',
        };
    }
}

export default async function ServiceDetail({ params }: Props) {
    const { slug } = await params;
    let service = null;

    try {
        service = await api.getServiceBySlug(slug);
    } catch (error) {
        console.warn('Direct service lookup failed, trying category fallback for slug:', slug);
        try {
            const allServices = await api.getServices();
            const fallbackService = allServices.find(
                (s) => s.category?.slug === slug
            );
            if (fallbackService) {
                service = await api.getServiceBySlug(fallbackService.slug);
            }
        } catch (fallbackError) {
            console.error('Error in category fallback lookup:', fallbackError);
        }
    }

    if (!service) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Layanan Tidak Ditemukan</h1>
                <Link href="/solutions" className="text-brand-blue hover:underline">
                    Kembali ke Layanan
                </Link>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon || 'code'] || Code;
    const subServices = subServicesMap[slug] || [];
    const mappedContactService = service.name;

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
                {/* Back Button */}
                <Link
                    href="/solutions"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Layanan
                </Link>

                {/* Main Service Card */}
                <SpotlightCard className="p-8 md:p-12 text-left border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <IconComponent className="w-8 h-8" />
                            </div>
                            <div>
                                {service.category && (
                                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block mb-0.5">
                                        {service.category.name}
                                    </span>
                                )}
                                <h1 className="text-2xl md:text-4xl font-black text-text-main tracking-tight leading-tight">
                                    {service.name}
                                </h1>
                            </div>
                        </div>

                        <p className="text-text-gray text-base md:text-lg leading-relaxed font-medium">
                            {service.description}
                        </p>
                    </div>
                </SpotlightCard>

                {/* Sub Services & Features Grid */}
                {subServices.length > 0 && (
                    <div className="space-y-6 text-left">
                        <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">
                            Cakupan Layanan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subServices.map((sub, i) => (
                                <SpotlightCard key={i} className="p-5 flex items-center space-x-3.5 border border-glass-border">
                                    <div className="w-8.5 h-8.5 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold text-text-main leading-snug">
                                        {sub}
                                    </span>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Card */}
                <SpotlightCard className="p-8 md:p-10 text-center space-y-6 border border-glass-border bg-gradient-to-b from-brand-blue/5 to-transparent relative overflow-hidden">
                    <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
                    <div className="max-w-xl mx-auto space-y-3 relative z-10">
                        <h3 className="text-xl md:text-2xl font-black text-text-main tracking-tight">
                            Butuh Solusi {service.name}?
                        </h3>
                        <p className="text-sm text-text-gray leading-relaxed font-medium">
                            Konsultasikan rencana proyek Anda bersama tim konsultan teknis kami sekarang secara gratis.
                        </p>
                    </div>
                    <div className="pt-2 relative z-10">
                        <Link
                            href={`/contact?service=${encodeURIComponent(mappedContactService)}`}
                            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15 group"
                        >
                            Mulai Diskusi Proyek
                            <ArrowLeft className="ml-2 w-4.5 h-4.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
