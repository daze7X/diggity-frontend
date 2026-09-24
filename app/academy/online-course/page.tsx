'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, PlayCircle, Clock, Award, MessageSquare, 
    MonitorSmartphone, Star, Search, Filter, BookOpen 
} from 'lucide-react';

export default function OnlineCourseLandingPage() {
    const { language: locale } = useLanguage();

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden">
            
            {/* =========================================
                FASE 1: HERO SECTION
            ========================================= */}
            <section className="relative pt-20 pb-32 px-6 lg:px-8 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
                    <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-[0.03]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <ScrollReveal animation="fade-up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue mb-8">
                        <PlayCircle className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-wide uppercase">
                            {locale === 'en' ? 'Diggity Online Courses' : 'Diggity Online Course'}
                        </span>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={100} className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-8">
                            {locale === 'en' 
                                ? 'Master New Skills.' 
                                : 'Tingkatkan Skillmu.'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-400 to-purple-500">
                                {locale === 'en' ? 'Anytime, Anywhere.' : 'Kapan Saja, Dari Mana Saja.'}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-gray font-medium mb-12 leading-relaxed">
                            {locale === 'en'
                                ? 'Learn highly demanded digital skills directly from industry practitioners with high-quality video content tailored to your pace.'
                                : 'Pelajari skill digital in-demand langsung dari praktisi industri melalui materi video berkualitas yang bisa diakses seumur hidup.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#courses" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 group">
                                {locale === 'en' ? 'Explore Courses' : 'Eksplorasi Kelas'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#benefits" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-glass-bg border border-glass-border text-text-main font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center">
                                {locale === 'en' ? 'Learn More' : 'Pelajari Lebih Lanjut'}
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Stats */}
                    <ScrollReveal animation="fade-up" delay={200} className="mt-20 pt-10 border-t border-glass-border grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { value: '50+', labelEn: 'Premium Courses', labelId: 'Kelas Premium' },
                            { value: '15k+', labelEn: 'Active Students', labelId: 'Siswa Aktif' },
                            { value: '4.8/5', labelEn: 'Average Rating', labelId: 'Rata-rata Rating' },
                            { value: '24/7', labelEn: 'Lifetime Access', labelId: 'Akses Seumur Hidup' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <h4 className="text-3xl md:text-4xl font-black text-text-main mb-2">{stat.value}</h4>
                                <p className="text-sm font-semibold text-text-gray">{locale === 'en' ? stat.labelEn : stat.labelId}</p>
                            </div>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* =========================================
                FASE 1: WHY ONLINE COURSE (BENEFITS)
            ========================================= */}
            <section id="benefits" className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <ScrollReveal animation="fade-up">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Why Choose Us</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'Learn at Your Own Pace' : 'Belajar dengan Ritmemu Sendiri'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium">
                                {locale === 'en'
                                    ? 'Our online courses are designed for maximum flexibility without compromising learning quality.'
                                    : 'Online course kami didesain untuk fleksibilitas maksimal tanpa mengorbankan kualitas pembelajaran.'}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                icon: Clock, 
                                titleEn: 'Self-Paced Learning', 
                                titleId: 'Belajar Fleksibel', 
                                descEn: 'Learn whenever you have time, no rigid schedules to follow.', 
                                descId: 'Belajar kapan saja tanpa terikat jadwal kelas yang kaku.' 
                            },
                            { 
                                icon: MonitorSmartphone, 
                                titleEn: 'Lifetime Access', 
                                titleId: 'Akses Seumur Hidup', 
                                descEn: 'Pay once and access the materials and future updates forever.', 
                                descId: 'Bayar sekali, nikmati akses materi & update seumur hidup.' 
                            },
                            { 
                                icon: Award, 
                                titleEn: 'Official Certificate', 
                                titleId: 'Sertifikat Resmi', 
                                descEn: 'Get a certificate of completion to boost your professional profile.', 
                                descId: 'Dapatkan sertifikat penyelesaian untuk menunjang kariermu.' 
                            },
                            { 
                                icon: MessageSquare, 
                                titleEn: 'Community Forum', 
                                titleId: 'Forum Diskusi', 
                                descEn: 'Connect with mentors and peers in our dedicated community.', 
                                descId: 'Terhubung dengan mentor dan sesama siswa di forum komunitas.' 
                            },
                        ].map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 transition-all rounded-3xl text-center group shadow-sm hover:shadow-xl hover:-translate-y-1">
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-8 h-8" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-main mb-3">{locale === 'en' ? benefit.titleEn : benefit.titleId}</h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">{locale === 'en' ? benefit.descEn : benefit.descId}</p>
                                    </SpotlightCard>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
}
