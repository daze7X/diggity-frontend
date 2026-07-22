'use client';

import React, { useEffect, useState } from 'react';

export default function InteractiveSpotlight() {
    const [position, setPosition] = useState({ x: -1000, y: -1000 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            window.requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
                if (!isVisible) setIsVisible(true);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-500"
            style={{
                background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, var(--spotlight-color) 0%, rgba(30, 64, 175, 0.01) 50%, transparent 100%)`,
            }}
        />
    );
}
