import React from 'react';

export default function MainCategoryLoading() {
    return (
        <div className="min-h-screen bg-brand-bg pt-28 pb-20 px-6 sm:px-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto mb-8 animate-pulse">
                <div className="flex items-center space-x-2">
                    <div className="w-16 h-3 bg-white/10 rounded" />
                    <div className="w-4 h-3 bg-white/5 rounded" />
                    <div className="w-24 h-3 bg-brand-blue/30 rounded" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-12 animate-pulse">
                <div className="max-w-3xl space-y-4">
                    <div className="w-2/3 h-12 bg-white/10 rounded-xl" />
                    <div className="space-y-2 pt-2">
                        <div className="w-full h-4 bg-white/5 rounded" />
                        <div className="w-4/5 h-4 bg-white/5 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-40 rounded-2xl bg-glass-bg border border-glass-border p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-white/10" />
                                <div className="w-6 h-6 rounded-full bg-white/5" />
                            </div>
                            <div className="space-y-2 mt-4">
                                <div className="w-1/2 h-5 bg-white/10 rounded" />
                                <div className="w-1/3 h-3 bg-white/5 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
