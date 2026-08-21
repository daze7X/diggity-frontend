import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { api, Course } from '../../../lib/api';
import SpotlightCard from '../../../components/SpotlightCard';
import EnrollmentCTA from '../../../components/EnrollmentCTA';
import { getLocaleServer } from '../../../lib/locale-server';
import { 
    ArrowLeft, 
    BookOpen, 
    Clock, 
    User, 
    PlayCircle, 
    FileText, 
    Award, 
    Calendar,
    GraduationCap,
    CheckCircle2
} from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const course = await api.getCourseBySlug(slug);
        return {
            title: `${course.title} | Diggity Academy`,
            description: course.description || 'Tingkatkan keahlian digital Anda bersama kelas interaktif di Diggity Academy.',
        };
    } catch {
        return {
            title: 'Detail Kelas | Diggity Academy',
        };
    }
}

export default async function CourseDetail({ params }: Props) {
    const locale = await getLocaleServer();
    const { slug } = await params;
    let course: Course | null = null;

    try {
        course = await api.getCourseBySlug(slug);
    } catch (error) {
        console.error('Error fetching course detail:', error);
    }

    if (!course) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">{locale === 'en' ? 'Class Not Found' : 'Kelas Tidak Ditemukan'}</h1>
                <Link href="/academy" className="text-brand-blue hover:underline">
                    {locale === 'en' ? 'Back to Academy Classes' : 'Kembali ke Kelas Academy'}
                </Link>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        if (price === 0) return 'Gratis / Free';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Calculate total lessons and total duration
    let totalLessons = 0;
    let totalMinutes = 0;
    if (course.modules) {
        course.modules.forEach((mod) => {
            if (mod.lessons) {
                totalLessons += mod.lessons.length;
                mod.lessons.forEach((les) => {
                    totalMinutes += les.duration_minutes || 0;
                });
            }
        });
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* Back Button */}
                <Link
                    href="/academy"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {locale === 'en' ? 'Back to Academy' : 'Kembali ke Academy'}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Details & Syllabus (Spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-8 text-left">
                        {/* Course Hero/Header Card */}
                        <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    {course.category && (
                                        <span className="px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/15 text-[10px] font-black text-brand-blue uppercase tracking-widest rounded-md inline-block">
                                            {course.category.name}
                                        </span>
                                    )}
                                    <h1 className="text-2xl md:text-4xl font-black text-text-main tracking-tight leading-tight pt-1">
                                        {course.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-xs text-text-muted font-medium pt-1">
                                        <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-brand-blue" /> {course.modules?.length || 0} {locale === 'en' ? 'Modules' : 'Modul'}</span>
                                        <span className="flex items-center gap-1.5"><PlayCircle className="w-3.5 h-3.5 text-brand-blue" /> {totalLessons} {locale === 'en' ? 'Class Sessions' : 'Sesi Kelas'}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-blue" /> {totalMinutes} {locale === 'en' ? 'Learning Minutes' : 'Menit Pembelajaran'}</span>
                                    </div>
                                </div>

                                <div className="border-t border-glass-border/40 my-6" />

                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-text-main">{locale === 'en' ? 'Class Summary' : 'Ringkasan Kelas'}</h3>
                                    <p className="text-text-gray text-sm md:text-base leading-relaxed font-medium">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Modules & Lessons Accordion List */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-extrabold text-text-main tracking-tight">{locale === 'en' ? 'Syllabus & Class Curriculum' : 'Silabus & Kurikulum Kelas'}</h3>
                            {course.modules && course.modules.length > 0 ? (
                                course.modules.map((mod, idx) => (
                                    <SpotlightCard key={mod.id} className="p-6 border border-glass-border bg-glass-bg/40 text-left">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] font-bold text-brand-blue uppercase block mb-1">{locale === 'en' ? 'Module' : 'Modul'} {idx + 1}</span>
                                                    <h4 className="text-base font-bold text-text-main leading-snug">{mod.title}</h4>
                                                    {mod.description && <p className="text-xs text-text-muted pt-1">{mod.description}</p>}
                                                </div>
                                                <span className="text-[10px] bg-brand-blue/5 border border-brand-blue/15 text-brand-blue font-bold px-2 py-0.5 rounded-md shrink-0">
                                                    {mod.lessons?.length || 0} {locale === 'en' ? 'Sessions' : 'Sesi'}
                                                </span>
                                            </div>

                                            {mod.lessons && mod.lessons.length > 0 && (
                                                <div className="border-t border-glass-border/40 pt-4 space-y-3">
                                                    {mod.lessons.map((les, lidx) => (
                                                        <div key={les.id} className="flex justify-between items-center text-xs text-text-gray font-medium py-1.5 border-b border-glass-border/20 last:border-b-0">
                                                            <div className="flex items-center space-x-2.5">
                                                                {les.content_type === 'video' ? (
                                                                    <PlayCircle className="w-4 h-4 text-brand-blue shrink-0" />
                                                                ) : (
                                                                    <FileText className="w-4 h-4 text-brand-blue shrink-0" />
                                                                )}
                                                                <span>{idx + 1}.{lidx + 1} {les.title}</span>
                                                            </div>
                                                            <span className="text-[10px] text-text-muted font-mono shrink-0">
                                                                {les.duration_minutes}m
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </SpotlightCard>
                                ))
                            ) : (
                                <div className="text-center py-6 text-text-muted text-xs bg-glass-bg border border-glass-border rounded-xl">
                                    {locale === 'en' ? 'The syllabus for this class is being prepared.' : 'Silabus untuk kelas ini sedang dalam penyusunan.'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Pricing & Enrollment */}
                    <div className="space-y-6">
                        
                        {/* Instructor Details Card */}
                        {course.instructor_name && (
                            <SpotlightCard className="p-6 border border-glass-border text-left">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-wider block">{locale === 'en' ? 'Main Instructor' : 'Instruktur Utama'}</span>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue font-bold text-sm">
                                            {course.instructor_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-text-main">{course.instructor_name}</h4>
                                            {course.instructor_title && <p className="text-[10px] text-text-gray font-semibold">{course.instructor_title}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        )}

                        {/* Transaction Card */}
                        <SpotlightCard className="p-8 text-left border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">{locale === 'en' ? 'Class Investment' : 'Investasi Kelas'}</span>
                                    <div className="text-3xl font-black text-brand-blue">
                                        {formatPrice(course.price)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 text-xs text-text-gray font-medium">
                                        <Award className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-text-main block">{locale === 'en' ? 'Eligibility Certificate' : 'Sertifikat Kelayakan'}</span>
                                            {locale === 'en' ? 'Get an official industry-standard IT competency certificate post-training.' : 'Dapatkan sertifikat resmi kompetensi IT berstandar industri pasca-pelatihan.'}
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 text-xs text-text-gray font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-text-main block">{locale === 'en' ? 'Lifetime Access' : 'Akses Selamanya'}</span>
                                            {locale === 'en' ? 'Access learning materials and curriculum updates indefinitely.' : 'Akses materi pembelajaran dan pembaruan kurikulum tanpa batas waktu.'}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-glass-border/40 my-4" />

                                <div>
                                    <EnrollmentCTA
                                        courseId={course.id}
                                        courseSlug={course.slug}
                                        price={Number(course.price)}
                                        title={course.title}
                                    />
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                </div>

            </div>
        </div>
    );
}
