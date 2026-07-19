import React from 'react';
import Link from 'next/link';
import { api, Career } from '../../lib/api';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function CareerPage() {
    let careers: Career[] = [];

    try {
        careers = await api.getCareers();
    } catch (error) {
        console.error('Error fetching careers:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>LOWONGAN PEKERJAAN</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Hub Karir
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Tumbuh dan berkembang bersama tim pemikir kreatif dan software engineer terbaik di Diggity.
                    </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-6">
                    {careers.length > 0 ? (
                        careers.map((job) => (
                            <SpotlightCard
                                key={job.id}
                                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="space-y-4 text-left">
                                    <div className="space-y-1.5">
                                        <span className="inline-block px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold rounded">
                                            {job.department || 'General'}
                                        </span>
                                        <h3 className="text-xl font-bold text-text-main">{job.title}</h3>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
                                        <div className="flex items-center space-x-1.5">
                                            <MapPin className="w-4 h-4 text-brand-blue" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Clock className="w-4 h-4 text-brand-blue" />
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        href={`/career/${job.slug}`}
                                        className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all cursor-pointer group shadow-md shadow-brand-blue/15"
                                    >
                                        Lihat Lowongan
                                        <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </SpotlightCard>
                        ))
                    ) : (
                        <div className="text-center text-text-muted py-20 bg-glass-bg border border-glass-border rounded-2xl">
                            <Briefcase className="w-12 h-12 mx-auto text-brand-blue/30 mb-3" />
                            <p className="text-sm">Saat ini belum ada lowongan kerja aktif. Silakan cek kembali nanti!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
