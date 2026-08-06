'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Portfolio } from '../lib/api';
import SpotlightCard from './SpotlightCard';
import { Code, ArrowRight } from 'lucide-react';

interface HomePortfoliosProps {
    portfolios: Portfolio[];
}

export default function HomePortfolios({ portfolios }: HomePortfoliosProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolios.length > 0 ? (
                portfolios.map((portfolio, index) => (
                    <Link
                        key={portfolio.id}
                        href={`/portfolio/${portfolio.slug}`}
                        className="block group text-left"
                    >
                        <SpotlightCard className="flex flex-col h-full border border-glass-border transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30">
                            <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                {portfolio.image ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.image}`}
                                        alt={portfolio.title}
                                        fill
                                        priority={index === 0}
                                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                        <Code className="w-10 h-10" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Project Showcase</span>
                                    </div>
                                )}
                                {portfolio.category && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-bg/90 backdrop-blur border border-glass-border rounded-full text-xs font-bold text-brand-blue">
                                        {portfolio.category.name}
                                    </span>
                                )}
                            </div>
                            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                <div className="space-y-2">
                                    <h4 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                        {portfolio.title}
                                    </h4>
                                    <p className="text-sm text-text-gray line-clamp-2 leading-relaxed">
                                        {portfolio.problem}
                                    </p>
                                </div>
                                <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-2 group-hover:translate-x-1 transition-transform border-t border-glass-border">
                                    Baca Studi Kasus
                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center text-text-muted py-10">
                    Belum ada data portofolio di database.
                </div>
            )}
        </div>
    );
}
