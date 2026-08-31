'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Portfolio, Category } from '../lib/api';
import SpotlightCard from './SpotlightCard';
import { Code, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioListProps {
    portfolios: Portfolio[];
    categories: Category[];
}

export default function PortfolioList({ portfolios, categories }: PortfolioListProps) {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const filteredPortfolios = activeCategory === 'All'
        ? portfolios
        : portfolios.filter((p) => p.category?.name === activeCategory);

    return (
        <div className="space-y-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all border backdrop-blur-md cursor-pointer ${
                        activeCategory === 'All'
                            ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/15'
                            : 'bg-glass-bg text-text-gray border-glass-border hover:text-brand-blue hover:border-brand-blue/30'
                    }`}
                >
                    Semua
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`px-5 py-2 text-sm font-semibold rounded-full transition-all border backdrop-blur-md cursor-pointer ${
                            activeCategory === cat.name
                                ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/15'
                                : 'bg-glass-bg text-text-gray border-glass-border hover:text-brand-blue hover:border-brand-blue/30'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((portfolio, index) => {
                        return (
                            <Link
                                key={portfolio.id}
                                href={`/portfolio/${portfolio.slug}`}
                                className="block text-left group"
                            >
                                <SpotlightCard className="flex flex-col h-full border border-glass-border transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30">
                                    <div className="relative aspect-[16/10] bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                        {portfolio.image ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.image}`}
                                                alt={portfolio.title}
                                                fill
                                                priority={index === 0}
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                <Code className="w-10 h-10" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Project Showcase</span>
                                            </div>
                                        )}
                                        {portfolio.category && (
                                            <span className="absolute top-4 left-4 px-2.5 py-1 bg-brand-bg/95 backdrop-blur border border-glass-border rounded-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                                                {portfolio.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs text-text-muted font-bold uppercase tracking-wider">
                                                <span>Client: {portfolio.client || 'N/A'}</span>
                                                <span>Durasi: {portfolio.duration || 'N/A'}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                                {portfolio.title}
                                            </h3>
                                            <p className="text-sm text-text-gray line-clamp-2 leading-relaxed">
                                                {portfolio.problem}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-4 border-t border-glass-border group-hover:translate-x-1 transition-transform">
                                            Baca Studi Kasus
                                            <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center text-text-muted py-20">
                        Belum ada portofolio di kategori ini.
                    </div>
                )}
            </div>
        </div>
    );
}
