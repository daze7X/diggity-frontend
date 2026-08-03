import React from 'react';
import Link from 'next/link';
import { api, Career } from '../../lib/api';
import { Briefcase, MapPin, Clock, ArrowRight, UserPlus } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import TalentRegistrationForm from '../../components/TalentRegistrationForm';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function JobConnectPage() {
    let careers: Career[] = [];

    try {
        careers = await api.getJobConnect();
    } catch (error) {
        console.error('Error fetching careers:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-glass-border pb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Job Connect
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Temukan karir impian Anda atau bergabunglah dalam kemitraan jaringan talenta global Diggity.
                    </p>
                    <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Kami menjembatani talenta IT digital profesional terbaik dengan proyek-proyek berskala global. Jelajahi lowongan aktif kami atau daftarkan profil portofolio Anda langsung ke database pencarian talenta kami.
                    </p>
                </div>

                {/* Main Content Grid: Listings & Registry Form */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    
                    {/* Left/Main Column: Vacancies (Spans 3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="text-left">
                            <h2 className="text-xl font-extrabold text-text-main tracking-tight flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-brand-blue" /> Posisi Terbuka / Lowongan Aktif
                            </h2>
                            <p className="text-xs text-text-muted">Lamar langsung posisi tetap atau kontrak yang saat ini tersedia.</p>
                        </div>

                        <div className="space-y-4">
                            {careers.length > 0 ? (
                                careers.map((job) => (
                                    <Link
                                        key={job.id}
                                        href={`/job-connect/${job.slug}`}
                                        className="group block cursor-pointer"
                                    >
                                        <SpotlightCard
                                            className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-glass-border hover:border-brand-blue/30 transition-all duration-300 hover:scale-[1.01]"
                                        >
                                            <div className="space-y-3.5 text-left">
                                                <div className="space-y-2">
                                                    <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                        {job.department || 'General'}
                                                    </span>
                                                    <h3 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors leading-snug">
                                                        {job.title}
                                                    </h3>
                                                </div>
                                                
                                                <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-text-muted">
                                                    <div className="flex items-center space-x-1.5">
                                                        <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1.5">
                                                        <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                                                        <span>{job.type}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest self-start sm:self-center shrink-0 border-b border-transparent group-hover:translate-x-1 transition-transform">
                                                Lihat Lowongan
                                                <ArrowRight className="ml-1.5 w-4 h-4" />
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center text-text-muted py-20 bg-glass-bg border border-glass-border rounded-2xl">
                                    <Briefcase className="w-12 h-12 mx-auto text-brand-blue/30 mb-3" />
                                    <p className="text-sm">Saat ini belum ada lowongan kerja aktif. Silakan daftarkan profil Anda di formulir jaringan talenta kami!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Talent Submission Form (Spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="text-left">
                            <h2 className="text-xl font-extrabold text-text-main tracking-tight flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-brand-blue" /> Registrasi Jaringan Talenta
                            </h2>
                            <p className="text-xs text-text-muted">Bergabunglah ke dalam database vendor dan profesional IT kami.</p>
                        </div>
                        <TalentRegistrationForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
