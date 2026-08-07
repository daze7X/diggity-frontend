import React from 'react';

export default function ProductDetailLoading() {
    return (
        <div className="min-h-screen py-28 md:py-36 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Back Button Skeleton */}
                <div className="inline-flex items-center space-x-2 mb-8 animate-pulse">
                    <div className="w-5 h-5 bg-text-muted/15 rounded-full" />
                    <div className="w-24 h-4 bg-text-muted/15 rounded" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left Column: Product Details Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Metadata Skeleton */}
                        <div className="space-y-4 animate-pulse">
                            <div className="w-28 h-5 bg-brand-blue/20 rounded-full" />
                            <div className="w-3/4 h-12 bg-text-main/10 rounded-xl" />
                            <div className="w-20 h-5 bg-text-muted/15 rounded" />
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-3 animate-pulse">
                            <div className="w-full h-4 bg-text-muted/10 rounded" />
                            <div className="w-full h-4 bg-text-muted/10 rounded" />
                            <div className="w-4/5 h-4 bg-text-muted/10 rounded" />
                        </div>

                        {/* Features List Cards Skeleton */}
                        <div className="space-y-6 animate-pulse">
                            <div className="w-48 h-6 bg-text-main/10 rounded-md" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="p-4 bg-glass-bg border border-glass-border/30 rounded-xl flex items-start space-x-3">
                                        <div className="w-5 h-5 bg-brand-blue/20 rounded-full shrink-0" />
                                        <div className="w-full h-4 bg-text-muted/10 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Pricing Card Skeleton */}
                    <div className="lg:col-span-1 animate-pulse">
                        <div className="bg-glass-bg/60 backdrop-blur-md border border-glass-border/40 rounded-3xl p-8 space-y-6">
                            <div className="space-y-2">
                                <div className="w-20 h-4 bg-text-muted/15 rounded" />
                                <div className="w-44 h-10 bg-text-main/15 rounded-xl" />
                                <div className="w-32 h-4 bg-text-muted/15 rounded" />
                            </div>

                            <div className="w-full h-12 bg-brand-blue/20 rounded-2xl" />

                            <div className="border-t border-glass-border/30 pt-6 space-y-4">
                                <div className="w-24 h-4 bg-text-main/10 rounded" />
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-brand-blue/15 rounded" />
                                            <div className="w-2/3 h-3 bg-text-muted/10 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
