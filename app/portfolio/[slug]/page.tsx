import React from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { 
    ArrowLeft, 
    Calendar, 
    User, 
    Tag, 
    Cpu, 
    AlertCircle, 
    Compass, 
    Settings, 
    CheckCircle2 
} from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function PortfolioDetail({ params }: Props) {
    const { slug } = await params;
    let portfolio = null;

    try {
        portfolio = await api.getPortfolioBySlug(slug);
    } catch (error) {
        console.error('Error fetching portfolio details:', error);
    }

    if (!portfolio) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-white">Studi Kasus Tidak Ditemukan</h1>
                <Link href="/portfolio" className="text-amber-500 hover:underline">
                    Kembali ke Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* Back Button */}
                <Link
                    href="/portfolio"
                    className="inline-flex items-center text-sm font-semibold text-neutral-400 hover:text-amber-500 transition-colors group"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Portfolio
                </Link>

                {/* Hero / Header */}
                <div className="space-y-6">
                    {portfolio.category && (
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            {portfolio.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {portfolio.title}
                    </h1>
                </div>

                {/* Project Metadata Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-900 border border-neutral-850 rounded-2xl text-sm">
                    <div className="space-y-1">
                        <div className="flex items-center text-neutral-500 space-x-1.5 font-bold uppercase tracking-wider text-xxs">
                            <User className="w-3.5 h-3.5 text-amber-500" />
                            <span>Klien</span>
                        </div>
                        <div className="font-semibold text-white">{portfolio.client || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center text-neutral-500 space-x-1.5 font-bold uppercase tracking-wider text-xxs">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            <span>Durasi</span>
                        </div>
                        <div className="font-semibold text-white">{portfolio.duration || 'N/A'}</div>
                    </div>
                    <div className="space-y-1 col-span-2">
                        <div className="flex items-center text-neutral-500 space-x-1.5 font-bold uppercase tracking-wider text-xxs">
                            <Cpu className="w-3.5 h-3.5 text-amber-500" />
                            <span>Teknologi</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {portfolio.technologies?.map((tech: string) => (
                                <span key={tech} className="px-2 py-0.5 bg-neutral-800 rounded text-xs text-neutral-300">
                                    {tech}
                                </span>
                            )) || 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Case Study Sections */}
                <div className="space-y-12 pt-6">
                    {/* 1. Problem */}
                    {portfolio.problem && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-rose-500">
                                <AlertCircle className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-white">Tantangan & Masalah</h2>
                            </div>
                            <p className="text-neutral-450 leading-relaxed pl-9">
                                {portfolio.problem}
                            </p>
                        </div>
                    )}

                    {/* 2. Strategy */}
                    {portfolio.strategy && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-amber-500">
                                <Compass className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-white">Strategi Pendekatan</h2>
                            </div>
                            <p className="text-neutral-450 leading-relaxed pl-9">
                                {portfolio.strategy}
                            </p>
                        </div>
                    )}

                    {/* 3. Execution */}
                    {portfolio.execution && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-blue-500">
                                <Settings className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-white">Eksekusi & Implementasi</h2>
                            </div>
                            <p className="text-neutral-450 leading-relaxed pl-9">
                                {portfolio.execution}
                            </p>
                        </div>
                    )}

                    {/* 4. Result */}
                    {portfolio.result && (
                        <div className="space-y-4 p-8 bg-neutral-900/50 border border-neutral-850 rounded-2xl">
                            <div className="flex items-center space-x-3 text-emerald-500">
                                <CheckCircle2 className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-white">Hasil Akhir & Dampak Bisnis</h2>
                            </div>
                            <p className="text-neutral-300 leading-relaxed pl-9">
                                {portfolio.result}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
