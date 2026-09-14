'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketplaceSearchBar({ locale, initialQuery = '' }: { locale: string, initialQuery?: string }) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setQuery(initialQuery);
        // If initialQuery changes, it means the server responded with the new results.
        if (initialQuery) {
            const resultsEl = document.getElementById('search-results-section');
            if (resultsEl) {
                resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [initialQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            startTransition(() => {
                router.push('/products/digital-marketplace');
            });
            return;
        }

        startTransition(() => {
            router.push(`/products/digital-marketplace?q=${encodeURIComponent(query)}`);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-full p-2 focus-within:ring-2 focus-within:ring-brand-blue transition-all shadow-2xl relative z-30">
            <div className="pl-4 pr-2 text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input 
                type="text" 
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === 'en' ? 'Search website templates, UI kits, 3D assets...' : 'Cari template website, UI kit, aset 3D...'}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50 text-sm md:text-base py-3"
            />
            <button 
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-full transition-colors shadow-lg shadow-brand-blue/30 whitespace-nowrap flex items-center justify-center min-w-[120px]"
            >
                {isPending ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    locale === 'en' ? 'Search' : 'Cari'
                )}
            </button>
        </form>
    );
}
