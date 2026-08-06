'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface PortfolioGalleryProps {
    images?: string[];
    coverImage?: string;
    title: string;
}

export default function PortfolioGallery({ images, coverImage, title }: PortfolioGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

    // Combine gallery images or fall back to cover image
    const slideImages = images && images.length > 0 
        ? images 
        : coverImage 
        ? [coverImage] 
        : [];

    // Auto-slide every 5 seconds (only if multiple images)
    useEffect(() => {
        if (slideImages.length <= 1 || isLightboxOpen) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slideImages.length, isLightboxOpen]);

    if (slideImages.length === 0) return null;

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev + 1) % slideImages.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Showcase Panel */}
            <div 
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-glass-border/40 shadow-xl group cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
            >
                {/* Images Container */}
                {slideImages.map((img, idx) => (
                    <div
                        key={img}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            idx === activeIndex 
                                ? 'opacity-100 scale-100 pointer-events-auto' 
                                : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                    >
                        <Image
                            src={`${storageUrl}/${img}`}
                            alt={`${title} - Slide ${idx + 1}`}
                            fill
                            priority={idx === 0}
                            className="object-cover"
                        />
                    </div>
                ))}

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Navigation Buttons (Only if > 1 slide) */}
                {slideImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10 hover:scale-105 cursor-pointer z-20"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10 hover:scale-105 cursor-pointer z-20"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Top Right Counter Indicator */}
                {slideImages.length > 1 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-bold border border-white/10 z-20">
                        {activeIndex + 1} / {slideImages.length}
                    </div>
                )}

                {/* Bottom Left Maximize Icon */}
                <div className="absolute bottom-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-lg text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Maximize2 className="w-4 h-4" />
                </div>
            </div>

            {/* Carousel Thumbnails / Dots Indicator (Only if > 1 slide) */}
            {slideImages.length > 1 && (
                <div className="flex items-center justify-center space-x-2 pt-2">
                    {slideImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === activeIndex 
                                    ? 'w-8 bg-brand-blue' 
                                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox / Fullscreen Image Overlay */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 transition-all"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 cursor-pointer transition-transform hover:scale-105 z-30"
                        aria-label="Close Lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Left/Right controls in Lightbox */}
                    {slideImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 cursor-pointer z-30"
                                aria-label="Previous Image"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 cursor-pointer z-30"
                                aria-label="Next Image"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* Active Lightbox Image */}
                    <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
                        <Image
                            src={`${storageUrl}/${slideImages[activeIndex]}`}
                            alt={`${title} - Lightbox Image`}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Bottom Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1.5 bg-neutral-900/80 rounded-full border border-white/10">
                        {activeIndex + 1} / {slideImages.length} &bull; {title}
                    </div>
                </div>
            )}
        </div>
    );
}
