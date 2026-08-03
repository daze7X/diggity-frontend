import React from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';
import JobApplicationForm from '../../../components/JobApplicationForm';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function JobDetail({ params }: Props) {
    const { slug } = await params;
    let job = null;

    try {
        job = await api.getJobConnectBySlug(slug);
    } catch (error) {
        console.error('Error fetching job details:', error);
    }

    if (!job) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Lowongan Kerja Tidak Ditemukan</h1>
                <Link href="/job-connect" className="text-brand-blue hover:underline">
                    Kembali ke Job Connect
                </Link>
            </div>
        );
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-8">
                
                {/* Back Button */}
                <Link
                    href="/job-connect"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Job Connect
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Job Details Card */}
                    <div className="lg:col-span-2 space-y-8 text-left">
                        <div className="space-y-4">
                            <span className="inline-block px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded uppercase tracking-wider">
                                {job.department || 'General'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                                {job.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-text-gray pt-2">
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

                        {/* Job Description */}
                        <div className="space-y-4 border-t border-glass-border pt-8">
                            <h3 className="text-xl font-bold text-text-main">Deskripsi Pekerjaan</h3>
                            <div 
                                className="prose dark:prose-invert prose-sm text-text-gray leading-relaxed space-y-3"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>

                        {/* Job Requirements */}
                        {job.requirements && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-text-main">Persyaratan Kualifikasi</h3>
                                <div 
                                    className="prose dark:prose-invert prose-sm text-text-gray leading-relaxed space-y-3"
                                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Apply Form Column */}
                    <div className="lg:col-span-1 lg:sticky lg:top-32">
                        <JobApplicationForm careerId={job.id} />
                    </div>

                </div>

            </div>
        </div>
    );
}
