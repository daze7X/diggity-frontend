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
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight">
                        {locale === 'en' ? (
                            <>Our <span className="text-brand-blue">Portfolio</span></>
                        ) : (
                            <>Portfolio <span className="text-brand-blue">Kami</span></>
                        )}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' 
                            ? 'A collection of our finest work and successful case studies of digital transformation.' 
                            : 'Kumpulan karya terbaik dan studi kasus sukses dari transformasi digital klien kami.'}
                    </p>
                </div>

                {/* Portfolio Filter & Grid List */}
                <PortfolioList portfolios={portfolios} categories={categories} />

            </div>
        </div>
    );
}
