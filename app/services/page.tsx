import React from 'react';
import Link from 'next/link';
import { api, Service } from '../../lib/api';
import { 
    Code, 
    Smartphone, 
    Palette, 
    Search, 
    TrendingUp, 
    Server, 
    GraduationCap,
    ArrowRight,
    Terminal,
    Target,
    Layers,
    Cpu
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
    code: Code,
    smartphone: Smartphone,
    palette: Palette,
    search: Search,
    'trending-up': TrendingUp,
    server: Server,
    'graduation-cap': GraduationCap,
};

const categoryIcons: Record<string, React.ComponentType<any>> = {
    'App Builder Squad': Terminal,
    'Brand Growth Division': Target,
    'Cloud Service Hub': Cpu,
    'Digital Skill Lab': Layers,
};

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function Services() {
    let services: Service[] = [];
    const groupedServices: Record<string, Service[]> = {};

    try {
        services = await api.getServices();
        
        // Group services by category name
        services.forEach((service) => {
            const catName = service.category?.name || 'Layanan Lain';
            if (!groupedServices[catName]) {
                groupedServices[catName] = [];
            }
            groupedServices[catName].push(service);
        });
    } catch (error) {
        console.error('Error fetching services:', error);
    }

    const divisionsOrder = [
        'App Builder Squad',
        'Brand Growth Division',
        'Cloud Service Hub',
        'Digital Skill Lab',
    ];

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Layanan & Divisi
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Keahlian terspesialisasi yang dirancang untuk mempercepat transformasi digital bisnis Anda.
                    </p>
                </div>

                {/* Services Groups */}
                <div className="space-y-20">
                    {divisionsOrder.map((divName) => {
                        const divisionServices = groupedServices[divName] || [];
                        const DivIcon = categoryIcons[divName] || Terminal;

                        if (divisionServices.length === 0) return null;

                        return (
                            <section
                                key={divName}
                                className="bg-neutral-900/30 border border-neutral-900 rounded-3xl p-8 md:p-12 space-y-8 scroll-mt-24"
                            >
                                {/* Division Title */}
                                <div className="flex items-center space-x-4 border-b border-neutral-850 pb-6">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <DivIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white">{divName}</h2>
                                        <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mt-0.5">Divisi Khusus Diggity</p>
                                    </div>
                                </div>

                                {/* Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {divisionServices.map((service) => {
                                        const ServiceIcon = iconMap[service.icon || 'code'] || Code;
                                        return (
                                            <div
                                                key={service.id}
                                                className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:border-neutral-750 transition-colors"
                                            >
                                                <div className="space-y-4">
                                                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500">
                                                        <ServiceIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h3 className="text-lg font-bold text-white">{service.name}</h3>
                                                        <p className="text-sm text-neutral-550 leading-relaxed">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-neutral-950 space-y-6 max-w-4xl mx-auto shadow-2xl shadow-amber-500/10">
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                        Punya Kebutuhan Digital yang Spesifik?
                    </h3>
                    <p className="text-base md:text-lg font-medium text-neutral-900 max-w-2xl mx-auto">
                        Konsultasikan proyek Anda dengan arsitek IT dan tim marketing senior kami hari ini. Dapatkan estimasi anggaran dan roadmap pengerjaan gratis.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center px-8 py-4 bg-neutral-950 text-white font-bold rounded-xl hover:bg-neutral-900 transition-colors group"
                        >
                            Hubungi Pakar Kami
                            <ArrowRight className="ml-2 w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
