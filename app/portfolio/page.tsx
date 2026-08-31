import React from 'react';
import { Metadata } from 'next';
import { api, Category, Portfolio } from '../../lib/api';
import PortfolioList from '../../components/PortfolioList';
import { getLocaleServer } from '../../lib/locale-server';

export const metadata: Metadata = {
  title: 'Success Stories & Portofolio Karya - Diggity',
  description: 'Lihat studi kasus dan kisah sukses dari berbagai perusahaan yang telah mempercayakan transformasi digital mereka kepada Diggity.',
};

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function PortfolioPage() {
    const locale = await getLocaleServer();
    let portfolios: Portfolio[] = [];
    let categories: Category[] = [];

    try {
        portfolios = await api.getPortfolios();
        
        // Extract unique categories from portfolios
        const categoriesMap: Record<string, Category> = {};
        portfolios.forEach((p) => {
            if (p.category) {
                categoriesMap[p.category.name] = p.category;
            }
        });
        categories = Object.values(categoriesMap);
    } catch (error) {
        console.error('Error fetching portfolios:', error);
    }

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    
                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>
                    
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-6 inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                        {locale === 'en' ? 'Success Stories' : 'Kisah Sukses'}
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                        {locale === 'en' ? (
                            <>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Portfolio</span></>
                        ) : (
                            <>Portofolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Karya</span></>
                        )}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        {locale === 'en' 
                            ? 'A collection of our finest work and successful case studies of digital transformation.' 
                            : 'Kumpulan karya terbaik dan studi kasus sukses dari transformasi digital klien kami.'}
                    </p>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Overlapping) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-24">
                <div className="bg-gray-50/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-10 shadow-2xl">
                    {/* Portfolio Filter & Grid List */}
                    <PortfolioList portfolios={portfolios} categories={categories} />
                </div>
            </div>
        </div>
    );
}
