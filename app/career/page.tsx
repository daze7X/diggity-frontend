import React from 'react';
import Link from 'next/link';
import { api, Career } from '../../lib/api';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function CareerPage() {
    let careers: Career[] = [];

    try {
        careers = await api.getCareers();
    } catch (error) {
        console.error('Error fetching careers:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Hub Karir
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Tumbuh dan berkembang bersama tim pemikir kreatif dan software engineer terbaik di Diggity.
                    </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-6">
                    {careers.length > 0 ? (
                        careers.map((job) => (
                            <div
                                key={job.id}
                                className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neutral-700 transition-colors"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-500 text-xs font-bold rounded">
                                            {job.department || 'General'}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
                                        <div className="flex items-center space-x-1.5">
                                            <MapPin className="w-4 h-4 text-amber-500" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Clock className="w-4 h-4 text-amber-500" />
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        href={`/career/${job.slug}`}
                                        className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 text-sm font-bold text-neutral-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-colors group"
                                    >
                                        Lihat Lowongan
                                        <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-neutral-600 py-20 bg-neutral-900/40 border border-neutral-850 rounded-2xl">
                            <Briefcase className="w-12 h-12 mx-auto text-neutral-800 mb-3" />
                            <p className="text-sm">Saat ini belum ada lowongan kerja aktif. Silakan cek kembali nanti!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
