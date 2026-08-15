import React from 'react';
import { api, Category, Portfolio } from '../../../lib/api';
import PortfolioList from '../../../components/PortfolioList';
import { getLocaleServer } from '../../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function MarketingPortfolioPage() {
    const locale = await getLocaleServer();
    let portfolios: Portfolio[] = [];
    let categories: Category[] = [];

    try {
        const allPortfolios = await api.getPortfolios();
        // Filter only Marketing portfolios (Brand Growth Division)
        portfolios = allPortfolios.filter(
            (p) => p.category?.slug === 'brand-growth-division'
        );
        
        // Extract unique categories from filtered portfolios
        const categoriesMap: Record<string, Category> = {};
        portfolios.forEach((p) => {
            if (p.category) {
                categoriesMap[p.category.name] = p.category;
            }
        });
        categories = Object.values(categoriesMap);
    } catch (error) {
        console.error('Error fetching Marketing portfolios:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Warm creative background spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight pt-2">
                        Marketing &amp; Creative <span className="text-brand-blue">Portfolio</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                        {locale === 'en' 
                            ? 'Discover our high-conversion marketing campaigns, brand visual identities, and social media success stories.' 
                            : 'Kumpulan kampanye iklan berbayar (Meta/Google Ads), penyusunan identitas visual brand, desain grafis, dan manajemen media sosial terarah.'}
                    </p>
                </div>

                {/* Portfolio Filter & Grid List */}
                <PortfolioList portfolios={portfolios} categories={categories} />

            </div>
        </div>
    );
}
