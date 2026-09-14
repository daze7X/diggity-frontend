'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import ProductCard from './ProductCard';

export default function MarketplaceSearchResults({ searchQuery, mainCat, locale }: { searchQuery: string, mainCat: any, locale: string }) {
    const [results, setResults] = useState<any[]>([]);
    const [debugInfo, setDebugInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);

        const fetchResults = async () => {
            try {
                // Try global search (Client-side, just like SearchOverlay)
                const res = await api.searchGlobal(searchQuery).catch(() => ({ products: [] }));
                if (!active) return;

                let allProducts = (res as any).products || [];
                
                // FALLBACK: If global search returned nothing (e.g. because backend only searches name/desc and not category name)
                // Fetch ALL products in this main category and filter them locally.
                if (allProducts.length === 0) {
                    allProducts = await api.getProducts({ category: mainCat.slug }).catch(() => []);
                }

                const childIds = mainCat.children?.map((c: any) => c.id) || [];
                
                // Filter by category to ensure we only show items belonging to this marketplace
                let filtered = allProducts.filter((p: any) => 
                    p.category_id === mainCat.id || 
                    p.category?.id === mainCat.id || 
                    childIds.includes(p.category_id) || 
                    childIds.includes(p.category?.id) || 
                    p.category?.slug === mainCat.slug ||
                    p.category?.parent_id === mainCat.id
                );

                // DEEP SEARCH FRONTEND FILTER
                // Search by product name, description, AND category name!
                const lowerQuery = searchQuery.toLowerCase();
                let finalFiltered = filtered.filter((p: any) => {
                    const matchName = p.name.toLowerCase().includes(lowerQuery);
                    const matchDesc = p.description && p.description.toLowerCase().includes(lowerQuery);
                    const matchCat = p.category && p.category.name && p.category.name.toLowerCase().includes(lowerQuery);
                    return matchName || matchDesc || matchCat;
                });
                
                // If the user's query exactly matched a category but no products were found, 
                // just show all products in that category.
                if (finalFiltered.length === 0 && filtered.length > 0) {
                    // check if the mainCat itself or its children match the query
                    const catMatchesQuery = childIds.some((id: any) => {
                        const child = mainCat.children.find((c: any) => c.id === id);
                        return child && child.name.toLowerCase().includes(lowerQuery);
                    });
                    if (catMatchesQuery) {
                        finalFiltered = filtered.filter((p: any) => {
                            return p.category && p.category.name && p.category.name.toLowerCase().includes(lowerQuery);
                        });
                    }
                }

                setDebugInfo({
                    allProductsCount: allProducts.length,
                    mainCatId: mainCat.id,
                    childIds: childIds,
                    allCategoriesFound: allProducts.map((p: any) => p.category_id),
                    filteredCount: filtered.length,
                    finalFilteredCount: finalFiltered.length
                });

                setResults(finalFiltered);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchResults();

        return () => { active = false; };
    }, [searchQuery, mainCat]);

    if (loading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <svg className="animate-spin h-10 w-10 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-text-gray">{locale === 'en' ? 'Searching assets...' : 'Mencari aset...'}</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="text-center py-24 bg-glass-bg border border-glass-border rounded-3xl">
                <h3 className="text-xl font-bold text-text-main mb-2">
                    {locale === 'en' ? 'Oops, no results found' : 'Oops, tidak ada hasil'}
                </h3>
                <p className="text-text-gray">
                    {locale === 'en' ? 'Try using different keywords.' : 'Coba gunakan kata kunci lain.'}
                </p>
                {/* Debug info invisible to normal users, but visible in DOM or subtle */}
                <div className="mt-8 p-4 bg-black/5 rounded-lg text-xs text-left max-w-lg mx-auto overflow-auto opacity-50">
                    <p>Debug Info:</p>
                    <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
            ))}
        </div>
    );
}
