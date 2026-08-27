import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { api, Course, Faq } from '../../lib/api';
import { BookOpen, Clock, Award, Check, Sparkles, GraduationCap, Building, MonitorPlay, Book, ArrowLeft, ArrowRight, Users, PlayCircle, Briefcase } from 'lucide-react';
import FaqAccordion from '../../components/FaqAccordion';
import SpotlightCard from '../../components/SpotlightCard';
import ScrollReveal from '../../components/ScrollReveal';
import { getLocaleServer } from '../../lib/locale-server';

export const metadata: Metadata = {
    title: 'Academy & Training - Diggity',
    description: 'Tingkatkan skill digital Anda dengan kurikulum komprehensif, sertifikasi resmi, dan instruktur profesional di Diggity Academy.',
};

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ACADEMY_CATEGORIES = [
    {
        id: 'coding-bootcamps',
        name: 'Coding Bootcamps',
        descEn: 'Intensive coding bootcamps with industry-standard certification.',
        descId: 'Bootcamp coding intensif dengan sertifikasi standar industri.',
        icon: GraduationCap,
        gradient: 'from-blue-500/10 to-indigo-500/5',
        accentText: 'text-blue-500',
        accentBg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glowColor: 'bg-blue-500/10',
    },
    {
        id: 'corporate-it-training',
        name: 'Corporate IT Training',
        descEn: 'In-house customized tech training and upskilling for companies.',
        descId: 'Pelatihan teknologi in-house dan upskilling khusus untuk perusahaan.',
        icon: Building,
        gradient: 'from-violet-500/10 to-purple-500/5',
        accentText: 'text-violet-500',
        accentBg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
        glowColor: 'bg-violet-500/10',
    },
    {
        id: 'self-paced-e-courses',
        name: 'Self-Paced E-Courses',
        descEn: 'Self-paced coding courses with quizzes and assessments.',
        descId: 'Kursus mandiri (e-learning) dengan video materi, kuis, dan penilaian kompetensi.',
        icon: MonitorPlay,
        gradient: 'from-cyan-500/10 to-sky-500/5',
        accentText: 'text-cyan-500',
        accentBg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        glowColor: 'bg-cyan-500/10',
    },
    {
        id: 'digital-e-books',
        name: 'Digital E-Books',
        descEn: 'Download free programming guides and software engineering ebooks.',
        descId: 'Unduh panduan pemrograman gratis dan modul e-book software engineering.',
        icon: Book,
        gradient: 'from-pink-500/10 to-rose-500/5',
        accentText: 'text-pink-500',
        accentBg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
        glowColor: 'bg-pink-500/10',
    }
];

export default async function AcademyPage({ searchParams }: PageProps) {
    const locale = await getLocaleServer();
    let allCourses: Course[] = [];
    let faqs: Faq[] = [];
    
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

    try {
        const [coursesRes, faqsRes] = await Promise.all([
            api.getCourses(),
            api.getFaqs()
        ]);
        allCourses = coursesRes;
        faqs = faqsRes;
    } catch (error) {
        console.error('Error fetching academy data:', error);
    }

    const displayedCourses = category 
        ? allCourses.filter(c => c.category?.slug === category)
        : allCourses;
        
    const featuredCourses = allCourses.slice(0, 3); // Just pick first 3 as featured if no specific logic exists

    const formatPrice = (price: number) => {
        if (price === 0) return locale === 'en' ? 'Gratis / Free' : 'Gratis';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const stats = [
        { icon: Users,    val: '10K+', labelEn: 'Students', labelId: 'Siswa Bergabung' },
        { icon: BookOpen, val: `${allCourses.length || 20}+`,  labelEn: 'Courses', labelId: 'Total Kelas' },
        { icon: Award,    val: '100%',  labelEn: 'Certified', labelId: 'Tersertifikasi' },
        { icon: PlayCircle, val: '24/7',   labelEn: 'Access', labelId: 'Akses Penuh' },
    ];
    
    const BENEFITS = [
        {
            icon: Users,
            titleEn: '1-on-1 Mentoring',
            titleId: 'Mentoring 1-on-1',
            descEn: 'Personalized guidance from experienced industry professionals.',
            descId: 'Bimbingan personal langsung dari praktisi industri berpengalaman.'
        },
        {
            icon: Award,
            titleEn: 'Official Certificate',
            titleId: 'Sertifikat Resmi',
            descEn: 'Industry-recognized certification upon completion.',
            descId: 'Sertifikasi standar industri yang diakui setelah kelulusan.'
        },
        {
            icon: Briefcase,
            titleEn: 'Job Connect',
            titleId: 'Disalurkan Kerja',
            descEn: 'Direct access to our hiring partners and job placements.',
            descId: 'Akses langsung ke mitra perusahaan kami untuk penyaluran kerja.'
        },
        {
            icon: Clock,
            titleEn: 'Lifetime Access',
            titleId: 'Akses Selamanya',
            descEn: 'Keep all course materials and future updates forever.',
            descId: 'Akses penuh ke seluruh materi dan pembaruannya seumur hidup.'
        }
    ];
    
    const activeCategoryConfig = ACADEMY_CATEGORIES.find(c => c.id === category);

    return (
        <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">
                
                {/* ═══ HERO SECTION ═══ */}
                {!category ? (
                    <ScrollReveal animation="fade-up">
                        <div className="text-center space-y-8 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                    <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">
                                        {locale === 'en' ? 'Learn & Empower' : 'Belajar & Tumbuh Bersama'}
                                    </span>
                                    <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-[0.95]">
                                    Diggity <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">Academy</span>
                                </h1>
                                <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                                    {locale === 'en'
                                        ? 'Developing individual and organizational competencies through education, training, certification, and learning ecosystems.'
                                        : 'Mengembangkan kompetensi individu dan organisasi melalui pendidikan, pelatihan, sertifikasi, dan learning ecosystem terintegrasi.'}
                                </p>
                            </div>

                            {/* Stats bar */}
                            <div className="inline-flex flex-wrap items-center justify-center gap-0 divide-x divide-glass-border bg-glass-bg border border-glass-border rounded-2xl px-2">
                                {stats.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-2.5 px-5 py-3">
                                            <Icon className="w-4 h-4 text-brand-blue" />
                                            <div>
                                                <div className="text-lg font-black text-text-main leading-none">{s.val}</div>
                                                <div className="text-[10px] text-text-muted font-semibold mt-0.5">
                                                    {locale === 'en' ? s.labelEn : s.labelId}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal animation="fade-up">
                        <div className="text-center space-y-6 max-w-3xl mx-auto">
                            <Link href="/academy" className="inline-flex items-center text-xs font-bold text-text-gray hover:text-brand-blue transition-colors bg-glass-bg border border-glass-border px-3 py-1.5 rounded-lg mb-4">
                                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> {locale === 'en' ? 'Back to All Programs' : 'Kembali ke Semua Program'}
                            </Link>
                            <div className="flex items-center justify-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl ${activeCategoryConfig?.accentBg || 'bg-brand-blue/10'} flex items-center justify-center`}>
                                    {activeCategoryConfig ? <activeCategoryConfig.icon className={`w-6 h-6 ${activeCategoryConfig.accentText}`} /> : <BookOpen className="w-6 h-6 text-brand-blue" />}
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main">
                                {activeCategoryConfig?.name || 'Academy Programs'}
                            </h1>
                            <p className="text-base text-text-gray font-medium">
                                {locale === 'en' ? activeCategoryConfig?.descEn : activeCategoryConfig?.descId}
                            </p>
                        </div>
                    </ScrollReveal>
                )}

                {/* ═══ CATEGORY CARDS GRID (Only show if no category is selected) ═══ */}
                {!category && (
                    <div className="space-y-5">
                        <ScrollReveal animation="fade-up">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                    {locale === 'en' ? 'Learning Programs' : 'Program Pembelajaran'}
                                </span>
                                <div className="flex-1 h-px bg-glass-border rounded-full" />
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                            {ACADEMY_CATEGORIES.map((cat, i) => {
                                const CatIcon = cat.icon;
                                const courseCount = allCourses.filter(c => c.category?.slug === cat.id).length;

                                return (
                                    <ScrollReveal key={cat.id} animation="fade-up" delay={i * 60}>
                                        <Link href={`/academy?category=${cat.id}`} className="block h-full group">
                                            <SpotlightCard className={`relative h-full p-7 flex flex-col gap-5 border ${cat.border} bg-gradient-to-br ${cat.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                                <div className={`absolute -top-6 -right-6 w-24 h-24 ${cat.glowColor} rounded-full blur-2xl pointer-events-none`} />

                                                <div className="flex items-start justify-between gap-3">
                                                    <div className={`w-12 h-12 rounded-2xl ${cat.accentBg} flex items-center justify-center shrink-0`}>
                                                        <CatIcon className={`w-6 h-6 ${cat.accentText}`} strokeWidth={1.5} />
                                                    </div>
                                                    <div className={`px-2.5 py-1 rounded-full ${cat.accentBg} border ${cat.border} text-[10px] font-black ${cat.accentText}`}>
                                                        {courseCount} {locale === 'en' ? 'MODULES' : 'MODUL'}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 flex-1">
                                                    <h3 className="text-xl font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                                        {cat.name}
                                                    </h3>
                                                    <p className="text-xs text-text-gray font-medium leading-relaxed">
                                                        {locale === 'en' ? cat.descEn : cat.descId}
                                                    </p>
                                                </div>

                                                <div className={`pt-4 border-t border-glass-border/40 text-xs font-bold ${cat.accentText} flex items-center group-hover:underline`}>
                                                    {locale === 'en' ? 'View programs' : 'Lihat program'}
                                                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </SpotlightCard>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ═══ COURSES GRID ═══ */}
                <div className="space-y-6 pt-8">
                    {!category && featuredCourses.length > 0 && (
                        <ScrollReveal animation="fade-up">
                            <div className="flex items-center gap-4 pb-6">
                                <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                    {locale === 'en' ? 'Popular Classes' : 'Kelas Populer'}
                                </span>
                                <div className="flex-1 h-px bg-glass-border rounded-full" />
                            </div>
                        </ScrollReveal>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                        {(category ? displayedCourses : featuredCourses).length > 0 ? (
                            (category ? displayedCourses : featuredCourses).map((course, idx) => (
                                <ScrollReveal key={course.id} animation="fade-up" delay={idx * 50} className="group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2">
                                    <SpotlightCard
                                        className="p-6 relative flex flex-col justify-between h-full border border-glass-border bg-glass-bg transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/30"
                                    >
                                        <div className="space-y-4 text-left">
                                            {/* Image Cover */}
                                            <div className="relative aspect-video rounded-xl bg-neutral-900 border border-glass-border/40 overflow-hidden flex items-center justify-center group-hover:border-brand-blue/30 transition-colors">
                                                {course.image ? (
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${course.image}`}
                                                        alt={course.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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

                                            {/* Meta */}
                                            <div className="pt-2 border-t border-glass-border/40 text-[11px] text-text-gray space-y-1">
                                                {course.instructor_name && (
                                                    <div>
                                                        <span className="text-text-muted">{locale === 'en' ? 'Instructor:' : 'Instruktur:'}</span> <strong className="text-text-main">{course.instructor_name}</strong> {course.instructor_title && `(${course.instructor_title})`}
                                                    </div>
                                                )}
                                                <div className="flex items-center space-x-1.5 text-brand-blue font-bold pt-1">
                                                    <Award className="w-3.5 h-3.5" />
                                                    <span>{locale === 'en' ? 'Official Certificate' : 'Sertifikat Resmi'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 text-left space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-text-muted uppercase">{locale === 'en' ? 'Investment' : 'Investasi'}</span>
                                                <span className="text-base font-black text-brand-blue">{formatPrice(course.price)}</span>
                                            </div>

                                            <Link
                                                href={`/academy/${course.slug}`}
                                                className="block w-full py-3 text-center text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/15"
                                            >
                                                {locale === 'en' ? 'View Syllabus' : 'Lihat Silabus'}
                                            </Link>
                                        </div>
                                    </SpotlightCard>
                                </ScrollReveal>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-text-muted py-24 bg-glass-bg border border-glass-border rounded-3xl backdrop-blur-sm">
                                <BookOpen className="w-16 h-16 mx-auto text-brand-blue/30 mb-4" />
                                <h3 className="text-xl font-bold text-text-main mb-2">{locale === 'en' ? 'No Programs Available' : 'Program Belum Tersedia'}</h3>
                                <p className="text-sm">{locale === 'en' ? 'There are currently no active programs for this category.' : 'Saat ini belum ada program yang aktif untuk kategori ini. Silakan cek kategori lainnya.'}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* View All Button */}
                    {!category && allCourses.length > featuredCourses.length && (
                        <div className="text-center pt-10 pb-4">
                            <Link href="/academy?category=self-paced-e-courses" className="inline-flex items-center px-6 py-3 text-sm font-bold text-text-gray bg-glass-bg border border-glass-border hover:border-brand-blue hover:text-brand-blue rounded-xl transition-colors">
                                {locale === 'en' ? 'Browse All Courses' : 'Telusuri Semua Modul'} <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* ═══ WHY CHOOSE US ═══ */}
                <div className="pt-8 pb-4">
                    <div className="text-center space-y-4 mb-12">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{locale === 'en' ? 'Why Choose Us' : 'Keunggulan Kami'}</span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Learn from the Best' : 'Belajar dari yang Terbaik'}
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {BENEFITS.map((benefit, idx) => (
                            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} className="h-full">
                                <div className="p-6 bg-glass-bg border border-glass-border rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-brand-blue/30 hover:bg-glass-bg/80 hover:-translate-y-1 transition-all h-full">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <benefit.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-extrabold text-text-main">
                                        {locale === 'en' ? benefit.titleEn : benefit.titleId}
                                    </h4>
                                    <p className="text-xs text-text-gray leading-relaxed">
                                        {locale === 'en' ? benefit.descEn : benefit.descId}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <div className="space-y-12 max-w-4xl mx-auto pt-12 border-t border-glass-border/40">
                        <div className="text-center space-y-4">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{locale === 'en' ? 'General Questions' : 'Pertanyaan Umum'}</span>
                            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-6 text-left">
                            <FaqAccordion faqs={faqs} />
                        </div>
                    </div>
                )}

                {/* Closing CTA */}
                <div className="max-w-4xl mx-auto pt-16 border-t border-glass-border/40">
                    <SpotlightCard className="p-10 text-center space-y-6 border border-glass-border bg-gradient-to-b from-glass-bg/40 to-glass-bg/25">
                        <div className="max-w-md mx-auto space-y-2">
                            <h4 className="text-xl md:text-2xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Corporate Training Needs?' : 'Butuh Pelatihan Untuk Perusahaan?'}
                            </h4>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en' ? 'Our team can design custom bootcamp and training curricula tailored to your company needs.' : 'Tim kami dapat merancang kurikulum bootcamp dan pelatihan khusus (in-house) yang disesuaikan dengan kebutuhan perusahaan Anda.'}
                            </p>
                        </div>
                        <div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-md shadow-brand-blue/15"
                            >
                                Konsultasikan Sekarang
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>

            </div>
        </div>
    );
}
