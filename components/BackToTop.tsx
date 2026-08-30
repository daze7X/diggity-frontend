'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className={`fixed bottom-24 right-6 z-40 p-3.5 rounded-2xl bg-white dark:bg-brand-bg border border-glass-border shadow-xl text-text-gray hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-300 focus:outline-none ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
