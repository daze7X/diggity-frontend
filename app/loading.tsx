import React from 'react';

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="space-y-4 max-w-3xl">
                {/* Small category tag skeleton */}
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                {/* Large Title skeleton */}
                <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                {/* Paragraph lines skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
            </div>

            {/* Grid Content Skeleton (Looks like Blog, Services, or Portfolio grids!) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                    <div 
                        key={item} 
                        className="border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white/20 dark:bg-slate-950/20 p-4 space-y-4 shadow-sm"
                    >
                        {/* Image aspect-ratio box skeleton */}
                        <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                        
                        {/* Title and meta lines */}
                        <div className="space-y-2">
                            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
                            <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        </div>
                        
                        {/* Paragraph description lines */}
                        <div className="space-y-1.5">
                            <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                            <div className="h-3.5 w-11/12 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
