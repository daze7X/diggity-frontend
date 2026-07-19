'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCoords({ x, y });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl bg-glass-bg border border-glass-border transition-all duration-300 hover:border-brand-blue/30 group ${className}`}
            style={{
                boxShadow: 'var(--card-inset), var(--card-shadow)',
                ...props.style
            }}
            {...props}
        >
            {/* Grain Noise Overlay */}
            <div className="grain-noise pointer-events-none" />
            
            {/* Spotlight radial gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, var(--accent-glow), transparent 40%)`,
                }}
            />
            
            {/* Content Container */}
            <div className="relative z-20 w-full h-full">
                {children}
            </div>
        </div>
    );
}
