'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Portfolio, Category } from '../lib/api';
import SpotlightCard from './SpotlightCard';
import { Code, ArrowRight, Laptop, Sparkles, Filter, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioListProps {
    portfolios: Portfolio[];
    categories?: Category[];
}

export default function PortfolioList({ portfolios = [], categories = [] }: PortfolioListProps) {
    const { language } = useLanguage();
    const isEn = language === 'en';

    // Grouping filter: 'all' | 'it' | 'marketing'
    const [activeGroup, setActiveGroup] = useState<'all' | 'it' | 'marketing'>('all');
    const [selectedTag, setSelectedTag] = useState<string>('all');

    // Helper to determine group
    const classifyPortfolio = (p: Portfolio): 'it' | 'marketing' => {
        const catName = (p.category?.name || '').toLowerCase();
        const catSlug = (p.category?.slug || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        const techs = (p.technologies || []).join(' ').toLowerCase();

        if (
            catName.includes('brand') || 
            catName.includes('market') || 
            catName.includes('design') || 
            catName.includes('creative') || 
            catName.includes('social') ||
            catSlug.includes('creative') ||
            catSlug.includes('market') ||
            techs.includes('meta ads') ||
            techs.includes('google ads') ||
            techs.includes('seo') ||
            techs.includes('tiktok') ||
            title.includes('marketing') ||
            title.includes('branding')
        ) {
            return 'marketing';
        }
        return 'it';
    };

    // Filter by group first
    const groupFilteredPortfolios = useMemo(() => {
        if (activeGroup === 'all') return portfolios;
        return portfolios.filter(p => classifyPortfolio(p) === activeGroup);
    }, [portfolios, activeGroup]);

    // Available tags for currently selected group
    const availableTags = useMemo(() => {
        const tagsSet = new Set<string>();
        groupFilteredPortfolios.forEach(p => {
            if (p.category?.name) tagsSet.add(p.category.name);
            if (Array.isArray(p.technologies)) {
                p.technologies.forEach(t => tagsSet.add(t));
            }
        });
        return Array.from(tagsSet).slice(0, 8); // Top tags
    }, [groupFilteredPortfolios]);

    // Final filtered list based on tag
    const finalPortfolios = useMemo(() => {
        if (selectedTag === 'all') return groupFilteredPortfolios;
        return groupFilteredPortfolios.filter(p => {
            const matchesCat = p.category?.name?.toLowerCase() === selectedTag.toLowerCase();
            const matchesTech = p.technologies?.some(t => t.toLowerCase() === selectedTag.toLowerCase());
            return matchesCat || matchesTech;
        });
    }, [groupFilteredPortfolios, selectedTag]);

    const handleGroupChange = (group: 'all' | 'it' | 'marketing') => {
        setActiveGroup(group);
        setSelectedTag('all'); // Reset sub-tag
    };

    return (
        <div className="space-y-10">
            {/* 1. Main Division Tabs (IT vs Marketing & Creative) */}
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="inline-flex p-1.5 rounded-2xl bg-neutral-950/5 dark:bg-white/5 border border-glass-border backdrop-blur-md">
                    <button
                        onClick={() => handleGroupChange('all')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeGroup === 'all'
                                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                : 'text-text-gray hover:text-text-main'
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isEn ? 'All Portfolios' : 'Semua Portofolio'}</span>
                    </button>

                    <button
                        onClick={() => handleGroupChange('it')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeGroup === 'it'
                                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                : 'text-text-gray hover:text-text-main'
                        }`}
                    >
                        <Laptop className="w-3.5 h-3.5" />
                        <span>IT Portfolio</span>
                    </button>

                    <button
                        onClick={() => handleGroupChange('marketing')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeGroup === 'marketing'
                                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                : 'text-text-gray hover:text-text-main'
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Marketing & Creative</span>
                    </button>
                </div>

                {/* Subtitle / Scope Pill Indicator */}
                <p className="text-xs text-text-muted text-center max-w-lg">
                    {activeGroup === 'it' && (
                        <span>Website • Mobile App • Software • AI • Cloud • Enterprise Solutions</span>
                    )}
                    {activeGroup === 'marketing' && (
                        <span>Branding • Campaigns • Social Media • Design • Video • Digital Ads</span>
                    )}
                    {activeGroup === 'all' && (
                        <span>{isEn ? 'Browse our verified digital transformation results across all disciplines' : 'Karya transformasi digital dan rekayasa teknologi terverifikasi di seluruh disiplin'}</span>
                    )}
                </p>

                {/* 2. Sub-Category & Tech Tag Pills */}
                {availableTags.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        <button
                            onClick={() => setSelectedTag('all')}
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                                selectedTag === 'all'
                                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-transparent'
                                    : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main'
                            }`}
                        >
                            {isEn ? 'All Tags' : 'Semua Tag'}
                        </button>
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                                    selectedTag.toLowerCase() === tag.toLowerCase()
                                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                                        : 'bg-glass-bg border-glass-border text-text-gray hover:text-text-main hover:border-brand-blue/30'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {finalPortfolios.length > 0 ? (
                    finalPortfolios.map((portfolio, index) => {
                        const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                        const imageUrl = portfolio.image 
                            ? (portfolio.image.startsWith('http') ? portfolio.image : `${storageUrl}/${portfolio.image}`)
                            : null;

                        return (
                            <Link
                                key={portfolio.id}
                                href={`/portfolio/${portfolio.slug}`}
                                className="block text-left group"
                            >
                                <SpotlightCard className="flex flex-col h-full border border-glass-border transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30">
                                    <div className="relative aspect-[16/10] bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={portfolio.title}
                                                fill
                                                priority={index === 0}
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                <Code className="w-10 h-10" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Project Showcase</span>
                                            </div>
                                        )}
                                        {portfolio.category && (
                                            <span className="absolute top-4 left-4 px-2.5 py-1 bg-brand-bg/95 backdrop-blur border border-glass-border rounded-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                                                {portfolio.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs text-text-muted font-bold uppercase tracking-wider">
                                                <span>Client: {portfolio.client || 'N/A'}</span>
                                                <span>{portfolio.duration ? `${portfolio.duration}` : ''}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2">
                                                {portfolio.title}
                                            </h3>
                                            <p className="text-sm text-text-gray line-clamp-2 leading-relaxed">
                                                {portfolio.problem}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-4 border-t border-glass-border group-hover:translate-x-1 transition-transform">
                                            {isEn ? 'Read Case Study' : 'Baca Studi Kasus'}
                                            <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center text-text-muted py-20 bg-neutral-950/5 dark:bg-white/5 rounded-2xl border border-glass-border">
                        {isEn ? 'No portfolio found in this filter.' : 'Belum ada portofolio di filter ini.'}
                    </div>
                )}
            </div>
        </div>
    );
}
