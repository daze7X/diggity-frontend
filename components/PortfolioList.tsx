'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Portfolio, Category } from '../lib/api';
import SpotlightCard from './SpotlightCard';
import { Code, ArrowRight } from 'lucide-react';

interface PortfolioListProps {
    portfolios: Portfolio[];
    categories: Category[];
}

export default function PortfolioList({ portfolios, categories }: PortfolioListProps) {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((portfolio, index) => {
                        const isWide = index % 3 === 0;
                        return (
                            <div
                                key={portfolio.id}
                                onClick={() => setSelectedProject(portfolio)}
                                className={`cursor-pointer text-left group ${
                                    isWide ? 'md:col-span-2' : 'md:col-span-1'
                                }`}
                            >
                                <SpotlightCard className="flex flex-col h-full border border-glass-border transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30">
                                    <div className="relative aspect-[16/10] bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                        {portfolio.image ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${portfolio.image}`}
                                                alt={portfolio.title}
                                                fill
                                                unoptimized
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
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center text-text-muted py-20">
                        Belum ada portofolio di kategori ini.
                    </div>
                )}
            </div>

            {/* Case Study Modal Overlay */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <div 
                        className="bg-brand-bg/90 border border-glass-border rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative text-text-main"
                        style={{ boxShadow: 'var(--card-inset), var(--card-shadow)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute right-4 top-4 text-2xl text-text-main hover:text-brand-blue cursor-pointer"
                        >
                            &times;
                        </button>
                        
                        <div className="space-y-6 text-left">
                            <div>
                                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block mb-2">
                                    Studi Kasus
                                </span>
                                <h3 className="text-2xl font-black text-text-main leading-tight">
                                    {selectedProject.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-xs text-text-muted mt-2 border-b border-glass-border pb-3">
                                    <span><strong>Client:</strong> {selectedProject.client || 'N/A'}</span>
                                    <span>•</span>
                                    <span><strong>Durasi:</strong> {selectedProject.duration || 'N/A'}</span>
                                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                                        <>
                                            <span>•</span>
                                            <span><strong>Tech:</strong> {selectedProject.technologies.join(', ')}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">1. Problem (Masalah)</h4>
                                    <p className="text-text-gray">{selectedProject.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">2. Strategy (Strategi)</h4>
                                    <p className="text-text-gray">{selectedProject.strategy || selectedProject.solution || 'Merancang ulang arsitektur digital dan optimasi alur transaksi secara menyeluruh.'}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">3. Execution (Eksekusi)</h4>
                                    <p className="text-text-gray">{selectedProject.execution || 'Mengimplementasikan teknologi Next.js, meminimalkan javascript bundle, dan integrasi API yang seamless.'}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">4. Result (Hasil Proyek)</h4>
                                    <p className="text-text-main font-semibold">{selectedProject.result || 'Performa kecepatan loading meningkat pesat dan konversi penjualan naik signifikan.'}</p>
                                </div>
                                
                                {selectedProject.solution && (
                                    <div className="p-4 bg-brand-blue/5 border-l-4 border-brand-blue rounded-r-lg mt-4">
                                        <p className="italic text-text-main font-medium">
                                            &ldquo;{selectedProject.solution}&rdquo;
                                        </p>
                                    </div>
                                )}

                                {selectedProject.testimonial && (
                                    <div className="mt-6 pt-4 border-t border-glass-border space-y-3">
                                        <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider">Umpan Balik Klien</h4>
                                        <div className="bg-glass-bg border border-glass-border rounded-xl p-4 relative overflow-hidden">
                                            <div className="space-y-4">
                                                {/* Stars */}
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(selectedProject.testimonial.rating || 5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-3 h-3 fill-current text-yellow-500"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-xs italic text-text-main leading-relaxed">
                                                    &ldquo;{selectedProject.testimonial.review || selectedProject.testimonial.message}&rdquo;
                                                </p>
                                                <div className="text-[10px] text-text-muted font-bold">
                                                    {selectedProject.testimonial.client_name || selectedProject.testimonial.name} &bull; {selectedProject.testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
