import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Course } from '../../lib/api';
import { BookOpen, Clock, Award, Check, Sparkles } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import { getLocaleServer } from '../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AcademyPage({ searchParams }: PageProps) {
    const locale = await getLocaleServer();
    let courses: Course[] = [];
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

    try {
        courses = await api.getCourses(category);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }

    const formatPrice = (price: number) => {
        if (price === 0) return 'Gratis / Free';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-glass-border pb-12 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight pt-2">
                        Diggity <span className="text-brand-blue">Academy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' ? 'Developing individual and organizational competencies through education, training, certification, and learning ecosystems.' : 'Mengembangkan kompetensi individu dan organisasi melalui pendidikan, pelatihan, sertifikasi, dan learning ecosystem.'}
                    </p>
                </div>

                {/* Course Grid */}
                <div className="space-y-6">
                    <div className="text-left">
                        <h2 className="text-xl font-extrabold text-text-main tracking-tight">{locale === 'en' ? 'Popular Course Catalog' : 'Katalog Kelas Populer'}</h2>
                        <p className="text-sm text-text-muted">{locale === 'en' ? 'Access comprehensive curricula, video guides, and official competency certificates.' : 'Akses kurikulum komprehensif, video panduan, dan sertifikat resmi kompetensi.'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <SpotlightCard
                                    key={course.id}
                                    className="p-6 relative flex flex-col justify-between h-full border border-glass-border bg-glass-bg transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30"
                                >
                                    <div className="space-y-4 text-left">
                                        {/* Image Cover Placeholder */}
                                        <div className="relative aspect-video rounded-xl bg-neutral-900 border border-glass-border/40 overflow-hidden flex items-center justify-center">
                                            {course.image ? (
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${course.image}`}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="text-text-muted/40 font-bold flex flex-col items-center gap-2">
                                                    <BookOpen className="w-8 h-8 text-brand-blue/40" />
                                                    <span className="text-[10px] uppercase tracking-wider">{locale === 'en' ? 'Academy Module' : 'Modul Academy'}</span>
                                                </div>
                                            )}
                                            {course.category && (
                                                <span className="absolute top-3 left-3 px-2 py-0.5 bg-brand-bg/95 backdrop-blur border border-glass-border rounded-md text-[9px] font-bold uppercase tracking-wider text-brand-blue">
                                                    {course.category.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-text-main hover:text-brand-blue transition-colors line-clamp-1">
                                                <Link href={`/academy/${course.slug}`}>{course.title}</Link>
                                            </h3>
                                            <p className="text-xs text-text-gray line-clamp-2 leading-relaxed">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* Instructor & Syllabus Meta */}
                                        <div className="pt-2 border-t border-glass-border/40 text-[11px] text-text-gray space-y-1">
                                            {course.instructor_name && (
                                                <div>
                                                    <span className="text-text-muted">{locale === 'en' ? 'Instructor:' : 'Instruktur:'}</span> <strong className="text-text-main">{course.instructor_name}</strong> {course.instructor_title && `(${course.instructor_title})`}
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-1.5 text-brand-blue font-bold">
                                                <Award className="w-3.5 h-3.5" />
                                                <span>{locale === 'en' ? 'Official Competency Certificate' : 'Sertifikat Resmi Kompetensi'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 text-left space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-text-muted uppercase">{locale === 'en' ? 'Class Investment' : 'Investasi Kelas'}</span>
                                            <span className="text-base font-black text-brand-blue">{formatPrice(course.price)}</span>
                                        </div>

                                        <Link
                                            href={`/academy/${course.slug}`}
                                            className="block w-full py-3 text-center text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/15"
                                        >
                                            {locale === 'en' ? 'View Class Syllabus' : 'Lihat Silabus Kelas'}
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-text-muted py-20 bg-glass-bg border border-glass-border rounded-2xl">
                                <BookOpen className="w-12 h-12 mx-auto text-brand-blue/30 mb-3" />
                                <p className="text-sm">{locale === 'en' ? 'Currently there are no active training classes. Please come back later!' : 'Saat ini belum ada kelas pelatihan aktif. Silakan kembali beberapa saat lagi!'}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
