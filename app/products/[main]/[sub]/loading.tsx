import React from 'react';

export default function SubCategoryLoading() {
    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* HERO HEADER SKELETON */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    <div className="w-full max-w-3xl space-y-6 animate-pulse">
                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2">
                            <div className="w-16 h-3 bg-white/20 rounded" />
                            <div className="w-4 h-3 bg-white/10 rounded" />
                            <div className="w-20 h-3 bg-white/20 rounded" />
                            <div className="w-4 h-3 bg-white/10 rounded" />
                            <div className="w-24 h-3 bg-white/20 rounded" />
                        </div>

                        {/* Title */}
                        <div className="w-3/4 h-14 bg-white/20 rounded-xl" />
                        
                        {/* Description */}
                        <div className="space-y-3 pt-2">
                            <div className="w-full h-4 bg-white/15 rounded" />
                            <div className="w-5/6 h-4 bg-white/15 rounded" />
                        </div>
                    </div>

                    {/* Hero Icon Skeleton */}
                    <div className="shrink-0 relative items-center justify-center w-48 h-48 md:w-72 md:h-72 animate-pulse mt-8 md:mt-0">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        <div className="absolute inset-4 bg-white/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]" />
                    </div>
                </div>
            </div>

            {/* MARQUEE SKELETON */}
            <div className="border-b border-glass-border bg-gray-50/50 py-8 animate-pulse">
                <div className="max-w-7xl mx-auto px-6 flex space-x-12 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-32 h-10 bg-gray-200 dark:bg-white/5 rounded-lg shrink-0" />
                    ))}
                </div>
            </div>

            {/* PRODUCTS GRID SKELETON */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 mt-16 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[300px] bg-gray-50 dark:bg-brand-bg rounded-2xl border border-glass-border p-6 flex flex-col animate-pulse">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-white/10 mb-4" />
                            <div className="w-3/4 h-6 bg-gray-200 dark:bg-white/10 rounded mb-4" />
                            <div className="space-y-2 mb-6">
                                <div className="w-full h-3 bg-gray-200 dark:bg-white/5 rounded" />
                                <div className="w-full h-3 bg-gray-200 dark:bg-white/5 rounded" />
                                <div className="w-2/3 h-3 bg-gray-200 dark:bg-white/5 rounded" />
                            </div>
                            <div className="mt-auto pt-4 border-t border-glass-border">
                                <div className="w-1/3 h-4 bg-gray-200 dark:bg-white/10 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
