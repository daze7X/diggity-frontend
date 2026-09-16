'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function CategorySidebar({ 
    childrenCategories, 
    locale 
}: { 
    childrenCategories: any[], 
    locale: string 
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const activeTypes = searchParams.get('types')?.split(',') || [];

    const toggleType = (slug: string) => {
        const newTypes = [...activeTypes];
        if (newTypes.includes(slug)) {
            newTypes.splice(newTypes.indexOf(slug), 1);
        } else {
            newTypes.push(slug);
        }
        
        const params = new URLSearchParams(searchParams.toString());
        if (newTypes.length > 0) {
            params.set('types', newTypes.join(','));
        } else {
            params.delete('types');
        }
        
        // Reset page to 1 when filtering
        params.delete('page');
        
        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    if (!childrenCategories || childrenCategories.length === 0) return null;

    return (
        <div className="bg-glass-bg border border-glass-border rounded-3xl p-6 sticky top-32 mb-8">
            <h3 className="text-lg font-black text-text-main mb-6">
                {locale === 'en' ? 'Category' : 'Category'}
            </h3>
            
            <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={"w-5 h-5 rounded-md border flex items-center justify-center transition-colors " + (activeTypes.length === 0 ? 'bg-brand-blue border-brand-blue' : 'border-glass-border bg-transparent group-hover:border-brand-blue/50')}>
                        {activeTypes.length === 0 && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <span className={"text-sm font-bold " + (activeTypes.length === 0 ? 'text-text-main' : 'text-text-gray group-hover:text-text-main transition-colors')}>
                        All
                    </span>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={activeTypes.length === 0}
                        onChange={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete('types');
                            params.delete('page');
                            router.push(pathname + '?' + params.toString(), { scroll: false });
                        }}
                    />
                </label>

                {childrenCategories.map(cat => (
                    <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                        <div className={"w-5 h-5 rounded-md border flex items-center justify-center transition-colors " + (activeTypes.includes(cat.slug) ? 'bg-brand-blue border-brand-blue' : 'border-glass-border bg-transparent group-hover:border-brand-blue/50')}>
                            {activeTypes.includes(cat.slug) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <span className={"text-sm font-bold " + (activeTypes.includes(cat.slug) ? 'text-text-main' : 'text-text-gray group-hover:text-text-main transition-colors')}>
                            {cat.name}
                        </span>
                        <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={activeTypes.includes(cat.slug)}
                            onChange={() => toggleType(cat.slug)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}
