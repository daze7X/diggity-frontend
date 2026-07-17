import React from 'react';
import Link from 'next/link';
import { api, Pricing, Faq } from '../../lib/api';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';

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
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Paket Harga
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Investasi transparan untuk akselerasi performa bisnis digital Anda.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricings.length > 0 ? (
                        pricings.map((plan) => (
                            <div
                                key={plan.id}
                                className={`bg-neutral-900 border rounded-3xl p-8 relative flex flex-col justify-between h-full ${
                                    plan.is_popular
                                        ? 'border-amber-500 shadow-xl shadow-amber-500/5'
                                        : 'border-neutral-800'
                                }`}
                            >
                                {plan.is_popular && (
                                    <span className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-amber-500 text-neutral-950 text-xs font-black rounded-full uppercase tracking-wider">
                                        Paling Populer
                                    </span>
                                )}

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-2xl md:text-4xl font-black text-white">
                                                {formatRupiah(plan.price)}
                                            </span>
                                            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                                                / {plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3.5 text-sm">
                                        {plan.features?.map((feature, idx) => (
                                            <li key={idx} className="flex items-start space-x-3 text-neutral-350">
                                                <Check className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href="/#contact"
                                        className={`block w-full py-4 text-center text-sm font-bold rounded-xl transition-all ${
                                            plan.is_popular
                                                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                                                : 'bg-neutral-800 text-white hover:bg-neutral-750'
                                        }`}
                                    >
                                        Pilih Paket
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-neutral-600 py-10">
                            Belum ada paket harga di database.
                        </div>
                    )}
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-4">
                            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Pertanyaan Umum</h2>
                            <h3 className="text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 md:p-8 space-y-3"
                                >
                                    <div className="flex items-start space-x-3 text-white">
                                        <HelpCircle className="w-5.5 h-5.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <h4 className="text-base md:text-lg font-bold leading-snug">{faq.question}</h4>
                                    </div>
                                    <p className="text-sm text-neutral-400 leading-relaxed pl-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
