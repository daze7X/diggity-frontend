'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, PlayCircle, Sparkles, CheckCircle } from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';

interface Enrollment {
    id: number;
    enrolled_at: string;
    status: string;
    completed_at: string | null;
    course?: {
        title: string;
        slug: string;
        description: string;
        image: string | null;
        category?: {
            name: string;
        };
    };
    progress_trackings?: Array<{
        lesson_id: number;
        is_completed: boolean;
    }>;
}

export default function UserAcademy() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const headers: HeadersInit = token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
                
                const res = await fetch(`${API_URL}/user/courses`, { headers });
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setEnrollments(data);
                }
            } catch (err) {
                console.error('Failed to fetch enrollments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [API_URL]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Helper to estimate progress (just placeholder or relative calculations)
    const getProgressPercentage = (enrollment: Enrollment) => {
        const trackings = enrollment.progress_trackings || [];
        if (trackings.length === 0) return 0;
        const completed = trackings.filter(t => t.is_completed).length;
        return Math.round((completed / trackings.length) * 100);
    };

    return (
        <div className="space-y-6 text-left animate-fade-in">
            <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">Kelas Pembelajaran Saya</h2>
                <p className="text-xs md:text-sm text-text-muted">Akses kurikulum kelas Anda, pelajari materi video, dan pantau progres pembelajaran Anda.</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
                        <span className="text-xs text-text-muted font-bold font-mono">Memuat kelas...</span>
                    </div>
                ) : enrollments.length > 0 ? (
                    enrollments.map((enr) => {
                        const course = enr.course;
                        const progress = getProgressPercentage(enr);
                        
                        return (
                            <SpotlightCard key={enr.id} className="p-6 md:p-8 border border-glass-border">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    
                                    {/* Left Side: Course Info */}
                                    <div className="space-y-3 text-left max-w-xl">
                                        <div className="space-y-2">
                                            {course?.category && (
                                                <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {course.category.name}
                                                </span>
                                            )}
                                            <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                {course?.title || 'Kelas Pelatihan'}
                                            </h3>
                                            {course?.description && (
                                                <p className="text-xs text-text-gray line-clamp-2 leading-relaxed">
                                                    {course.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1.5 pt-2">
                                            <div className="flex justify-between items-center text-[10px] md:text-xs font-semibold text-text-muted">
                                                <span>Progres Belajar</span>
                                                <span>{progress}% Selesai</span>
                                            </div>
                                            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-brand-blue h-full transition-all duration-500 rounded-full" 
                                                    style={{ width: `${progress}%` }} 
                                                />
                                            </div>
                                        </div>

                                        <div className="text-[10px] text-text-muted font-medium">
                                            Terdaftar Pada: {formatDate(enr.enrolled_at)}
                                        </div>
                                    </div>

                                    {/* Right Side: Learn action button */}
                                    <div className="shrink-0 w-full md:w-auto text-right">
                                        {course?.slug ? (
                                            <Link
                                                href={`/academy/${course.slug}`}
                                                className="flex items-center justify-center gap-1.5 px-6 py-3 bg-brand-blue text-white hover:bg-brand-blue-dark rounded-xl text-xs md:text-sm font-bold transition-all shadow-md shadow-brand-blue/15 w-full md:w-auto cursor-pointer"
                                            >
                                                <PlayCircle className="w-4 h-4" /> Masuk Kelas Belajar
                                            </Link>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex items-center justify-center gap-1.5 px-6 py-3 bg-slate-700/30 text-text-muted border border-glass-border rounded-xl text-xs md:text-sm font-bold w-full md:w-auto cursor-not-allowed"
                                            >
                                                Akses Belum Aktif
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </SpotlightCard>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl space-y-4">
                        <GraduationCap className="w-12 h-12 mx-auto text-brand-blue/30" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-sm">Belum Terdaftar di Kelas</h4>
                            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                                Anda belum terdaftar di kelas pelatihan IT atau UI/UX manapun. Silakan lihat katalog kelas Academy kami.
                            </p>
                        </div>
                        <Link
                            href="/academy"
                            className="inline-flex items-center px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-brand-blue-dark transition-colors"
                        >
                            Daftar Kelas Baru <Sparkles className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
