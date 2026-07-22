import React from 'react';
import Link from 'next/link';
import { api, Pricing, Faq } from '../../lib/api';
import { Check, ArrowRight } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import FaqAccordion from '../../components/FaqAccordion';

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
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Paket Harga
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Investasi transparan untuk akselerasi performa bisnis digital Anda.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {pricings.length > 0 ? (
                            pricings.map((plan) => (
                                <SpotlightCard
                                    key={plan.id}
                                    className={`p-8 relative flex flex-col justify-between h-full border transition-all duration-300 ${
                                        plan.is_popular
                                            ? 'border-brand-blue/80 dark:border-brand-blue/60 bg-brand-blue/5 shadow-2xl shadow-brand-blue/15 scale-100 md:scale-[1.02] z-10'
                                            : 'border-glass-border bg-glass-bg'
                                    }`}
                                >
                                    {plan.is_popular && (
                                        <span className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-brand-blue text-white text-xs font-black rounded-full uppercase tracking-wider z-30 shadow-md">
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
                                            {plan.name.toLowerCase().includes('enterprise') && (
                                                <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-0.5 rounded inline-block mt-2">
                                                    Paling Cocok untuk Scale-Up & Enterprise
                                                </p>
                                            )}
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
                                                    ? 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-md shadow-brand-blue/20'
                                                    : 'bg-glass-bg text-text-main border border-slate-300 dark:border-glass-border hover:border-brand-blue/50 hover:bg-brand-blue/5'
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

                    {/* Footnote Pricing */}
                    <div className="text-center text-xs text-text-muted font-medium pt-8">
                        *Harga belum termasuk PPN. Membutuhkan scope atau kapasitas khusus?{' '}
                        <Link href="/contact" className="text-brand-blue font-bold hover:underline inline-flex items-center">
                            Konsultasi Kustom <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Pertanyaan Umum</span>
                            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-6 text-left">
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </div>
                )}

                {/* 3. Footer Closing CTA Section */}
                <div className="max-w-4xl mx-auto pt-12 border-t border-glass-border">
                    <SpotlightCard className="p-10 text-center space-y-6 border border-glass-border bg-gradient-to-b from-glass-bg/40 to-glass-bg/25">
                        <div className="max-w-md mx-auto space-y-2">
                            <h4 className="text-xl md:text-2xl font-black text-text-main tracking-tight">
                                Masih punya pertanyaan lain?
                            </h4>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.
                            </p>
                        </div>
                        <div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-md shadow-brand-blue/15"
                            >
                                Hubungi Tim Kami
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>

            </div>
        </div>
    );
}
