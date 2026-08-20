'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
    duration?: number;
    delay?: number;
    threshold?: number;
}

export default function ScrollReveal({
    children,
    className = '',
    animation = 'fade-up',
    duration = 700,
    delay = 0,
    threshold = 0.1,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(currentRef);
                }
            },
            {
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [threshold]);

    const getInitialStyle = () => {
        switch (animation) {
            case 'fade-up':
                return { opacity: 0, transform: 'translateY(40px)' };
            case 'fade-in':
                return { opacity: 0 };
            case 'slide-left':
                return { opacity: 0, transform: 'translateX(40px)' };
            case 'slide-right':
                return { opacity: 0, transform: 'translateX(-40px)' };
            default:
                return { opacity: 0 };
        }
    };

    const getFinalStyle = () => {
        return { opacity: 1, transform: 'translate(0, 0)' };
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...(isVisible ? getFinalStyle() : getInitialStyle()),
                transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
}
