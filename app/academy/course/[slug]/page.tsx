'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    PlayCircle, Star, Users, Clock, BookOpen, CheckCircle2, 
    Award, MonitorSmartphone, ChevronDown, ChevronRight, MessageSquare
} from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
    const { language: locale } = useLanguage();
    const [activeModule, setActiveModule] = useState<number | null>(0);

    // Mock data based on the brief
    const course = {
        titleEn: 'Mastering React & Next.js 14: From Zero to Hero',
        titleId: 'Mastering React & Next.js 14: Dari Pemula Hingga Mahir',
        descEn: 'Learn modern web development using React, Next.js App Router, Tailwind CSS, and Server Actions to build production-ready applications.',
        descId: 'Pelajari web development modern menggunakan React, Next.js App Router, Tailwind CSS, dan Server Actions untuk membangun aplikasi production-ready.',
        category: 'Programming',
        badge: 'Best Seller',
        rating: 4.9,
        reviews: 1250,
        students: 4500,
        duration: '24.5 Hours',
        modules: 12,
        price: 'Rp 499.000',
        originalPrice: 'Rp 899.000',
        mentor: {
            name: 'Budi Santoso',
            role: 'Senior Frontend Engineer @ TechCorp',
            bioEn: 'Budi has over 8 years of experience building scalable web applications. He is passionate about teaching and has helped thousands of students transition into tech.',
            bioId: 'Budi memiliki lebih dari 8 tahun pengalaman membangun aplikasi web skala besar. Ia sangat menyukai mengajar dan telah membantu ribuan siswa beralih ke industri teknologi.'
        }
    };

    const syllabus = [
        { title: 'Module 1: Introduction to Modern React', lessons: 5, duration: '1h 30m' },
        { title: 'Module 2: Hooks & State Management', lessons: 8, duration: '2h 15m' },
        { title: 'Module 3: Next.js 14 App Router Basics', lessons: 10, duration: '3h 45m' },
        { title: 'Module 4: Data Fetching & Server Actions', lessons: 7, duration: '2h 50m' },
        { title: 'Module 5: Final Project (E-Commerce Clone)', lessons: 12, duration: '5h 20m' },
    ];

    const toggleModule = (idx: number) => {
        setActiveModule(activeModule === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-bg-canvas pb-24">
            
            {/* =========================================
                HEADER SECTION (Dark Theme)
            ========================================= */}
            <section className="bg-brand-bg pt-32 pb-16 px-6 relative border-b border-white/10">
                <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
                        <Link href="/academy" className="hover:text-brand-blue transition-colors">Academy</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/academy/online-course" className="hover:text-brand-blue transition-colors">Courses</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-200">{course.category}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            {course.badge && (
                                <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded-lg shadow-sm uppercase tracking-wider mb-6">
                                    {course.badge}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                                {locale === 'en' ? course.titleEn : course.titleId}
                            </h1>
                            <p className="text-lg text-gray-300 font-medium mb-8 leading-relaxed">
                                {locale === 'en' ? course.descEn : course.descId}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-bold text-white">{course.rating}</span>
                                    <span className="text-gray-400">({course.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <span>{course.students} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                MAIN CONTENT & SIDEBAR
            ========================================= */}
            <section className="px-6 relative z-20 -mt-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-8 space-y-16 pt-16">
                        
                        {/* What You'll Learn */}
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-6">
                                {locale === 'en' ? "What you'll learn" : "Apa yang akan Anda pelajari"}
                            </h2>
                            <div className="p-8 bg-gray-50 dark:bg-glass-bg border border-glass-border rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Build production-ready React applications',
                                    'Master Next.js 14 App Router & Server Actions',
                                    'Implement responsive designs with Tailwind CSS',
                                    'Handle complex state and API data fetching',
                                    'Optimize web performance and SEO',
                                    'Deploy applications to Vercel'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-text-gray">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Syllabus */}
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-6">
                                {locale === 'en' ? "Course Syllabus" : "Silabus Kelas"}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-text-gray font-medium mb-6">
                                <span>{course.modules} Modules</span>
                                <span>•</span>
                                <span>{course.duration} Total Length</span>
                            </div>
                            
                            <div className="space-y-4">
                                {syllabus.map((mod, idx) => (
                                    <div key={idx} className="border border-glass-border bg-white dark:bg-glass-bg rounded-2xl overflow-hidden transition-colors">
                                        <button 
                                            onClick={() => toggleModule(idx)}
                                            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeModule === idx ? 'bg-brand-blue text-white' : 'bg-gray-100 dark:bg-white/10 text-text-gray'}`}>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeModule === idx ? 'rotate-180' : ''}`} />
                                                </div>
                                                <span className="font-bold text-text-main">{mod.title}</span>
                                            </div>
                                            <div className="text-xs text-text-gray font-medium hidden md:block">
                                                {mod.lessons} lessons • {mod.duration}
                                            </div>
                                        </button>
                                        
                                        {activeModule === idx && (
                                            <div className="px-6 pb-6 pt-2 border-t border-glass-border">
                                                <div className="space-y-3">
                                                    {[...Array(mod.lessons)].map((_, lessonIdx) => (
                                                        <div key={lessonIdx} className="flex items-center justify-between py-2 text-sm group cursor-pointer">
                                                            <div className="flex items-center gap-3 text-text-gray group-hover:text-brand-blue transition-colors">
                                                                <PlayCircle className="w-4 h-4" />
                                                                <span className="font-medium">Video Lesson {lessonIdx + 1}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">10:00</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Mentor */}
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-6">
                                {locale === 'en' ? "Meet Your Mentor" : "Kenalan dengan Mentor"}
                            </h2>
                            <div className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-24 h-24 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black text-3xl shrink-0">
                                    {course.mentor.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-main mb-1">{course.mentor.name}</h3>
                                    <p className="text-sm text-brand-blue font-bold mb-4">{course.mentor.role}</p>
                                    <p className="text-text-gray font-medium leading-relaxed">
                                        {locale === 'en' ? course.mentor.bioEn : course.mentor.bioId}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT SIDEBAR (Sticky Pricing Card) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <ScrollReveal animation="slide-up">
                                <div className="bg-white dark:bg-brand-bg border border-glass-border rounded-3xl overflow-hidden shadow-2xl">
                                    {/* Video Preview Mock */}
                                    <div className="w-full aspect-video bg-slate-800 relative group cursor-pointer flex items-center justify-center">
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                            <PlayCircle className="w-8 h-8 text-white fill-white" />
                                        </div>
                                        <span className="absolute bottom-4 text-white font-bold z-10 text-sm">Preview Course</span>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-end gap-3 mb-6">
                                            <span className="text-3xl font-black text-text-main">{course.price}</span>
                                            <span className="text-lg text-text-gray line-through mb-1">{course.originalPrice}</span>
                                        </div>

                                        <button className="w-full py-4 bg-brand-blue text-white font-black rounded-2xl hover:bg-brand-blue-dark transition-all shadow-lg shadow-brand-blue/20 mb-4">
                                            {locale === 'en' ? 'Enroll Now' : 'Daftar Sekarang'}
                                        </button>
                                        <p className="text-center text-xs text-text-gray font-medium mb-8">
                                            {locale === 'en' ? '30-Day Money-Back Guarantee' : 'Garansi 30 Hari Uang Kembali'}
                                        </p>

                                        <h4 className="font-bold text-text-main mb-4">
                                            {locale === 'en' ? 'This course includes:' : 'Yang akan Anda dapatkan:'}
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { icon: PlayCircle, text: `${course.duration} on-demand video` },
                                                { icon: BookOpen, text: 'Downloadable resources & slides' },
                                                { icon: MonitorSmartphone, text: 'Access on mobile and desktop' },
                                                { icon: Award, text: 'Official Certificate of completion' },
                                                { icon: MessageSquare, text: 'Access to community forum' },
                                            ].map((item, idx) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div key={idx} className="flex items-center gap-3 text-sm font-medium text-text-gray">
                                                        <Icon className="w-4 h-4 text-text-main opacity-50" />
                                                        <span>{item.text}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
