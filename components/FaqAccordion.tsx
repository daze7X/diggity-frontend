'use client';

import React, { useState } from 'react';
import { Faq } from '../lib/api';
import SpotlightCard from './SpotlightCard';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqAccordionProps {
    faqs: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-4 text-left">
            {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                    <SpotlightCard
                        key={faq.id}
                        className="p-6 md:p-8 cursor-pointer select-none transition-all duration-300 border border-glass-border hover:border-brand-blue/30"
                        onClick={() => toggleFaq(faq.id)}
                    >
                        <div className="flex items-center justify-between space-x-3 text-text-main">
                            <div className="flex items-start space-x-3">
                                <HelpCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0 mt-0.5" />
                                <h4 className="text-base md:text-lg font-bold leading-snug">{faq.question}</h4>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-blue' : ''}`} />
                        </div>
                        <div 
                            className={`grid transition-all duration-300 ease-in-out ${
                                isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                            }`}
                        >
                            <div className="overflow-hidden">
                                <p className="text-sm text-text-gray leading-relaxed pl-8">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>
                );
            })}
        </div>
    );
}
