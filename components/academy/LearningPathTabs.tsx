'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LEARNING_PATHS } from '../../lib/data/academy';

interface Props {
    locale: string;
}

export default function LearningPathTabs({ locale }: Props) {
    const [activeTab, setActiveTab] = useState(LEARNING_PATHS[0].id);

    const activeCategory = LEARNING_PATHS.find(c => c.id === activeTab);

    return (
        <div className="w-full">
            {/* Tabs Header */}
            <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 pb-4 border-b border-glass-border">
                {LEARNING_PATHS.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeTab === category.id;
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap font-bold transition-all ${
                                isActive 
                                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-105' 
                                    : 'bg-glass-bg text-text-gray hover:text-text-main hover:bg-glass-border'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-brand-blue'}`} />
                            {category.title}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
                {activeCategory?.paths.map((path, idx) => {
                    // Fallback slug generation if path.id doesn't exist
                    const slug = (path as any).id || path.name.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <Link href={`/academy/path/${slug}`} key={idx} className="block h-full">
                            <div className="p-8 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl hover:border-brand-blue/30 transition-all group hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1 h-full">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="text-2xl font-black text-text-main group-hover:text-brand-blue transition-colors">
                                        {path.name}
                                    </h3>
                                    <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex shrink-0 items-center justify-center text-brand-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-base text-text-gray font-medium leading-relaxed">
                                    {locale === 'en' ? path.descEn : path.descId}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
                <button className="px-8 py-4 bg-white dark:bg-glass-bg border border-glass-border text-brand-blue font-bold rounded-2xl hover:bg-brand-blue hover:text-white transition-all inline-flex items-center gap-2 group shadow-sm hover:shadow-xl">
                    {locale === 'en' ? 'Explore Full Curriculums' : 'Eksplorasi Kurikulum Lengkap'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
