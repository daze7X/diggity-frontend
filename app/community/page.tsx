import React from 'react';
import Link from 'next/link';
import { Users, ArrowLeft } from 'lucide-react';

export default function DigitalCommunityPlaceholder() {
    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 text-left">
            <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-lg">
                    <Users className="w-3.5 h-3.5" /> Diggity Digital Community
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-text-main leading-tight">
                    Komunitas Digital Diggity Segera Hadir!
                </h1>
                <p className="text-sm md:text-base text-text-gray max-w-xl mx-auto leading-relaxed">
                    Wadah berkumpul, berjejaring, dan tumbuh bersama ratusan professional, developer, designer, dan praktisi IT di Indonesia. Persiapkan diri kawan untuk bergabung di Discord & Telegram kami!
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
