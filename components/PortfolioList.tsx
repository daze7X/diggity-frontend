'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Portfolio, Category } from '../lib/api';
import { Code, ArrowRight } from 'lucide-react';

interface PortfolioListProps {
    portfolios: Portfolio[];
    categories: Category[];
}

export default function PortfolioList({ portfolios, categories }: PortfolioListProps) {
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
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all border ${
                        activeCategory === 'All'
                            ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                    }`}
                >
                    Semua
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`px-5 py-2 text-sm font-semibold rounded-full transition-all border ${
                            activeCategory === cat.name
                                ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((portfolio) => (
                        <Link
                            key={portfolio.id}
                            href={`/portfolio/${portfolio.slug}`}
                            className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full"
                        >
                            <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center border-b border-neutral-800">
                                {portfolio.image ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.image}`}
                                        alt={portfolio.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-2 text-neutral-600">
                                        <Code className="w-10 h-10" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Project Showcase</span>
                                    </div>
                                )}
                                {portfolio.category && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-full text-xs font-bold text-amber-500">
                                        {portfolio.category.name}
                                    </span>
                                )}
                            </div>
                            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs text-neutral-500 font-bold uppercase tracking-wider">
                                        <span>Client: {portfolio.client || 'N/A'}</span>
                                        <span>Durasi: {portfolio.duration || 'N/A'}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
                                        {portfolio.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                                        {portfolio.problem}
                                    </p>
                                </div>
                                <div className="flex items-center text-xs font-bold text-amber-500 uppercase tracking-widest pt-4 border-t border-neutral-850 group-hover:translate-x-1 transition-transform">
                                    Baca Studi Kasus
                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-neutral-600 py-20">
                        Belum ada portofolio di kategori ini.
                    </div>
                )}
            </div>
        </div>
    );
}
