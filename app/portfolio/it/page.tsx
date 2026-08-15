import React from 'react';
import { api, Category, Portfolio } from '../../../lib/api';
import PortfolioList from '../../../components/PortfolioList';
import { getLocaleServer } from '../../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function ItPortfolioPage() {
    const locale = await getLocaleServer();
    let portfolios: Portfolio[] = [];
    let categories: Category[] = [];

    try {
        const allPortfolios = await api.getPortfolios();
        // Filter only IT portfolios (App Builder Squad & Cloud Service Hub)
        portfolios = allPortfolios.filter(
            (p) => p.category?.slug === 'app-builder-squad' || p.category?.slug === 'cloud-service-hub'
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
        console.error('Error fetching IT portfolios:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* High-tech abstract background spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight pt-2">
                        IT <span className="text-brand-blue">Portfolio</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                        {locale === 'en' 
                            ? 'Explore our custom software systems, mobile apps, ERPs, and cloud architecture case studies.' 
                            : 'Kumpulan solusi rekayasa perangkat lunak, sistem ERP logistik, kecerdasan buatan (AI), dan infrastruktur cloud berkinerja tinggi.'}
                    </p>
                </div>

                {/* Portfolio Filter & Grid List */}
                <PortfolioList portfolios={portfolios} categories={categories} />

            </div>
        </div>
    );
}
