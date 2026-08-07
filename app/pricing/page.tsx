'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api, Pricing } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { Check, HelpCircle, Loader2 } from 'lucide-react';

export default function PricingPage() {
    const { t } = useLanguage();
    const [pricings, setPricings] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [whatsappNumber, setWhatsappNumber] = useState('6285157303035'); // Default fallback
    const [activeFilter, setActiveFilter] = useState<'all' | 'recurring' | 'project'>('all');

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch pricings and company settings in parallel
                const [pricingData, settings] = await Promise.all([
                    api.getPricings(),
                    api.getCompanySettings().catch(() => null)
                ]);
                
                setPricings(pricingData);
                
                if (settings?.whatsapp) {
                    // Normalize whatsapp number format
                    let num = settings.whatsapp.replace(/[^0-9]/g, '');
                    if (num.startsWith('0')) {
                        num = '62' + num.slice(1);
                    }
                    setWhatsappNumber(num);
                }
            } catch (err) {
                console.error('[Pricing Page] Failed to fetch packages:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Format price in IDR currency
    const formatPrice = (price: string | number) => {
        const num = Number(price);
        if (!isNaN(num) && String(price).trim() !== '') {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(num);
        }
        return price; // Fallback jika teks kustom seperti "Hubungi Kami"
    };

    // Filter pricing based on period
    const filteredPricings = pricings.filter(plan => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'recurring') {
            return plan.period === 'month' || plan.period === 'year';
        }
        if (activeFilter === 'project') {
            return plan.period === 'project';
        }
        return true;
    });

    const getPeriodText = (period: string) => {
        switch (period) {
            case 'month':
                return `/${t('pricing.period_month')}`;
            case 'year':
                return `/${t('pricing.period_year')}`;
            case 'project':
                return `/${t('pricing.period_project')}`;
            default:
                return `/${t('pricing.period_one_time')}`;
        }
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden min-h-screen">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="container max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        {t('pricing.title')}
                    </h1>
                    <p className="text-text-gray max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
                        {t('pricing.subtitle')}
                    </p>
                </div>

                {/* Filters / Segmented Tabs */}
                {!loading && pricings.length > 0 && (
                    <div className="flex justify-center">
                        <div className="inline-flex bg-glass-bg border border-glass-border/60 p-1.5 rounded-2xl backdrop-blur-md">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    activeFilter === 'all'
                                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                Semua Paket
                            </button>
                            <button
                                onClick={() => setActiveFilter('recurring')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    activeFilter === 'recurring'
                                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                Berlangganan (SaaS)
                            </button>
                            <button
                                onClick={() => setActiveFilter('project')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    activeFilter === 'project'
                                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                Per Proyek
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
                        <p className="text-sm font-semibold text-text-gray">Memuat daftar paket harga...</p>
                    </div>
                )}

                {/* Grid Pricing Cards */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                        {filteredPricings.map((plan) => {
                            const isNumeric = !isNaN(Number(plan.price));
                            const whatsappMsg = t('pricing.whatsapp_msg').replace('[PLAN_NAME]', encodeURIComponent(plan.name));
                            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

                            return (
                                <SpotlightCard
                                    key={plan.id}
                                    className={`relative flex flex-col justify-between rounded-3xl border h-full transition-all duration-300 ${
                                        plan.is_popular
                                            ? 'border-brand-blue bg-glass-bg shadow-xl shadow-brand-blue/5 scale-[1.02] md:scale-[1.03] z-10 pt-14 pb-8 px-8'
                                            : 'border-glass-border bg-glass-bg/60 p-8'
                                    }`}
                                >
                                    {/* Popular Badge */}
                                    {plan.is_popular && (
                                        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand-blue/25">
                                            {t('pricing.popular')}
                                        </div>
                                    )}

                                    {/* Plan Title and Price */}
                                    <div className="space-y-6">
                                        <div className="space-y-2 text-left">
                                            <h3 className="text-xl font-black text-text-main">{plan.name}</h3>
                                            {plan.description && (
                                                <p className="text-xs text-text-gray leading-relaxed font-medium">
                                                    {plan.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-baseline text-left">
                                            <span className="text-3xl md:text-4xl font-black tracking-tight text-text-main">
                                                {formatPrice(plan.price)}
                                            </span>
                                            {isNumeric && (
                                                <span className="text-xs font-semibold text-text-gray ml-1">
                                                    {getPeriodText(plan.period)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Features List */}
                                        <div className="border-t border-glass-border/60 pt-6 space-y-4 text-left">
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                                                Fitur & Layanan Utama
                                            </span>
                                            {Array.isArray(plan.features) && plan.features.length > 0 ? (
                                                <ul className="space-y-3.5 list-none m-0 p-0">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start space-x-2.5 text-xs text-text-gray leading-relaxed">
                                                            <div className="p-0.5 bg-brand-blue/10 border border-brand-blue/20 rounded-md shrink-0 text-brand-blue mt-0.5">
                                                                <Check className="w-3.5 h-3.5" />
                                                            </div>
                                                            <span className="font-medium">
                                                                {typeof feature === 'object' && feature !== null ? (feature as any).feature : String(feature)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="flex items-center space-x-2 text-text-gray text-xs py-2 bg-glass-bg border border-glass-border/40 rounded-xl px-4">
                                                    <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                                                    <span>Hubungi admin untuk kustomisasi modul dan spesifikasi.</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-8">
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-2xl text-xs font-bold transition-all ${
                                                plan.is_popular
                                                    ? 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/20'
                                                    : 'bg-glass-bg hover:bg-glass-bg-hover text-text-main border border-glass-border/80'
                                            }`}
                                        >
                                            {isNumeric ? t('pricing.choose') : t('pricing.contact_us')}
                                        </a>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
