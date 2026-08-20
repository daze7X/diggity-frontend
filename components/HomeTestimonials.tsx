'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface Testimonial {
    id: number;
    client_name?: string;
    name?: string;
    company: string;
    review?: string;
    message?: string;
    rating: number;
    avatar?: string;
}

interface HomeTestimonialsProps {
    testimonials: Testimonial[];
    locale: string;
}

export default function HomeTestimonials({ testimonials, locale }: HomeTestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!testimonials || testimonials.length === 0) return null;

    const fallbackAvatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const active = testimonials[currentIndex];
    const name = active.client_name || active.name || 'Client';
    const reviewText = active.review || active.message || '';
    const rating = active.rating || 5;

    return (
        <div className="max-w-3xl mx-auto space-y-8 relative">
            <div className="relative overflow-hidden min-h-[220px]">
                <SpotlightCard className="p-8 md:p-10 space-y-6 flex flex-col justify-between text-left h-full border border-glass-border">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-1 text-brand-blue">
                            {[...Array(rating)].map((_, i) => (
                                <Star key={i} className="w-4.5 h-4.5 fill-brand-blue stroke-brand-blue" />
                            ))}
                        </div>
                        <p className="text-base md:text-lg italic text-text-gray leading-relaxed font-medium">
                            &ldquo;{reviewText}&rdquo;
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-glass-border">
                        <div className="flex items-center space-x-3.5">
                            <div className="relative w-11 h-11 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue text-sm overflow-hidden border border-glass-border">
                                {active.avatar ? (
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${active.avatar}`}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Image 
                                        src={fallbackAvatars[currentIndex % fallbackAvatars.length]}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <h5 className="text-sm md:text-base font-extrabold text-text-main">{name}</h5>
                                <p className="text-xs text-text-muted">{active.company}</p>
                            </div>
                        </div>

                        {/* Slide Navigation Buttons inside Card */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={prevSlide}
                                className="p-2 rounded-lg bg-glass-bg border border-glass-border text-text-gray hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer"
                                aria-label="Previous Testimonial"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-2 rounded-lg bg-glass-bg border border-glass-border text-text-gray hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer"
                                aria-label="Next Testimonial"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </SpotlightCard>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center items-center space-x-1.5 pt-2">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentIndex === idx ? 'w-6 bg-brand-blue' : 'w-2 bg-glass-border/70 hover:bg-glass-border'
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
