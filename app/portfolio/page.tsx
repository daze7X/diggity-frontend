import React from 'react';
import { api, Category, Portfolio } from '../../lib/api';
import PortfolioList from '../../components/PortfolioList';
import { getLocaleServer } from '../../lib/locale-server';

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
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        {locale === 'en' ? 'Our Portfolio' : 'Portfolio Kami'}
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
