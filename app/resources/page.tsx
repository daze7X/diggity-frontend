import React from 'react';
import Link from 'next/link';
import { Download, ArrowLeft } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export default function FreeResourcesPlaceholder() {
    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 text-left">
            <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-lg">
                    <Download className="w-3.5 h-3.5 animate-bounce" /> Free Digital Resources
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-text-main leading-tight">
                    Resource Gratis Sedang Disiapkan kawan!
                </h1>
                <p className="text-sm md:text-base text-text-gray max-w-xl mx-auto leading-relaxed">
                    Kami sedang menyusun berkas, panduan (PDF), checklist audit IT, serta template UI Figma berkualitas tinggi untuk membantu akselerasi bisnis kawan. Tunggu kejutannya!
                </p>
                <div className="pt-4">
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Wawasan & Edukasi
                    </Link>
                </div>
            </div>
        </div>
    );
}
