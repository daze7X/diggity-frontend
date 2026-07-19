import React from 'react';
import Link from 'next/link';
import { api, Pricing, Faq } from '../../lib/api';
import { Check, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function PricingPage() {
    let pricings: Pricing[] = [];
    let faqs: Faq[] = [];

    try {
        const [pricingsRes, faqsRes] = await Promise.all([
            api.getPricings(),
            api.getFaqs(),
        ]);
        pricings = pricingsRes;
        faqs = faqsRes;
    } catch (error) {
        console.error('Error fetching pricing/faq data:', error);
    }

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>PAKET PRODUKTIF</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Paket Harga
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Investasi transparan untuk akselerasi performa bisnis digital Anda.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricings.length > 0 ? (
                        pricings.map((plan) => (
                            <SpotlightCard
                                key={plan.id}
                                className={`p-8 relative flex flex-col justify-between h-full ${
                                    plan.is_popular
                                        ? 'border-brand-blue bg-brand-blue/5 shadow-xl shadow-brand-blue/10'
                                        : ''
                                }`}
                            >
                                {plan.is_popular && (
                                    <span className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-brand-blue text-white text-xs font-black rounded-full uppercase tracking-wider z-30">
                                        Paling Populer
                                    </span>
                                )}

                                <div className="space-y-6 text-left">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-text-main">{plan.name}</h3>
                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-2xl md:text-4xl font-black text-brand-blue">
                                                {formatRupiah(plan.price)}
                                            </span>
                                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                                                / {plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3.5 text-sm">
                                        {plan.features?.map((feature, idx) => (
                                            <li key={idx} className="flex items-start space-x-3 text-text-gray">
                                                <Check className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href="/#contact"
                                        className={`block w-full py-4 text-center text-sm font-bold rounded-xl transition-all cursor-pointer ${
                                            plan.is_popular
                                                ? 'bg-brand-blue text-white hover:bg-brand-blue-dark'
                                                : 'bg-glass-bg text-text-main border border-glass-border hover:border-brand-blue/40'
                                        }`}
                                    >
                                        Pilih Paket
                                    </Link>
                                </div>
                            </SpotlightCard>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-text-muted py-10">
                            Belum ada paket harga di database.
                        </div>
                    )}
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Pertanyaan Umum</span>
                            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-6 text-left">
                            {faqs.map((faq) => (
                                <SpotlightCard
                                    key={faq.id}
                                    className="p-6 md:p-8 space-y-3"
                                >
                                    <div className="flex items-start space-x-3 text-text-main">
                                        <HelpCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0 mt-0.5" />
                                        <h4 className="text-base md:text-lg font-bold leading-snug">{faq.question}</h4>
                                    </div>
                                    <p className="text-sm text-text-gray leading-relaxed pl-8">
                                        {faq.answer}
                                    </p>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
