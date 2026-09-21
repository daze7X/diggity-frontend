import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import ScrollReveal from '../../components/ScrollReveal';
import SpotlightCard from '../../components/SpotlightCard';
import { ACADEMY_PROGRAMS, ACADEMY_BENEFITS } from '../../lib/data/academy';
import { ArrowRight, PlayCircle, BookOpen, Book, CheckCircle2 } from 'lucide-react';
import LearningPathTabs from '../../components/academy/LearningPathTabs';

export const metadata: Metadata = {
    title: 'Academy & Training - Diggity',
    description: 'Tingkatkan skill digital Anda dengan kurikulum komprehensif, sertifikasi resmi, dan instruktur profesional di Diggity Academy.',
};

export const revalidate = 60;

export default async function AcademyPage() {
    const locale = await getLocaleServer();

    return (
        <div className="min-h-screen bg-bg-canvas relative pb-20 selection:bg-brand-blue/20 flex flex-col overflow-x-hidden">
            
            {/* =========================================
                FASE 2: HERO SECTION
            ========================================= */}
            <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 px-6 overflow-hidden bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border">
                {/* Glowing orbs & Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="max-w-2xl space-y-8 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-xs font-bold text-white tracking-widest uppercase">Diggity Academy</span>
                        </div>
                        
                        {/* Heading */}
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                            {locale === 'en' ? (
                                <>Learn. Practice.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Become Professional.</span></>
                            ) : (
                                <>Belajar. Praktik.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Jadi Profesional.</span></>
                            )}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {locale === 'en'
                                ? 'Learn industry-relevant digital skills with expert mentors, practical curriculum, and a learning ecosystem that supports your journey from learning to professional growth.'
                                : 'Belajar skill digital yang relevan dengan kebutuhan industri bersama mentor berpengalaman, kurikulum berbasis praktik, dan ekosistem pembelajaran yang mendukung perjalananmu dari belajar hingga berkembang secara profesional.'}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link href="#learning-paths" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                                {locale === 'en' ? 'Explore Learning Paths' : 'Eksplorasi Jalur Belajar'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#corporate-solutions" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md flex items-center justify-center gap-2">
                                {locale === 'en' ? 'For Business' : 'Untuk Perusahaan'}
                            </Link>
                        </div>
                    </div>
                    
                    {/* Visual / Image */}
                    <div className="hidden lg:block relative w-full max-w-lg aspect-square">
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes morphBlob {
                                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                            }
                            .animate-morph-blob {
                                animation: morphBlob 12s ease-in-out infinite;
                            }
                            .animate-morph-blob-fast {
                                animation: morphBlob 8s ease-in-out infinite reverse;
                            }
                        `}} />
                        
                        {/* Glowing backdrop matching the blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-cyan-400 blur-2xl opacity-30 animate-morph-blob-fast scale-105 pointer-events-none" />
                        
                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Academy Training"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 2: LEARNING PROGRAMS
            ========================================= */}
            <section className="py-24 px-6 relative z-10 -mt-12">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                            {locale === 'en' ? 'Start Learning New Skills, from Beginner to Expert.' : 'Mulai Belajar Skill Baru, dari Awam sampai Mahir.'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'Find the learning program that matches your goals, skill level, and the field you want to develop.' 
                                : 'Temukan program pembelajaran yang sesuai dengan tujuan, level kemampuan, dan bidang yang ingin kamu kembangkan.'}
                        </p>
                    </ScrollReveal>

                    {/* Program Grid (4 cols) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ACADEMY_PROGRAMS.map((program, idx) => {
                            const Icon = program.icon;
                            return (
                                <ScrollReveal key={program.id} animation="fade-up" delay={idx * 50}>
                                    <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 transition-all group rounded-3xl flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform mb-6">
                                            <Icon className="w-7 h-7" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-black text-text-main mb-3 leading-tight group-hover:text-brand-blue transition-colors">
                                            {program.title}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">
                                            {locale === 'en' ? program.descriptionEn : program.descriptionId}
                                        </p>
                                    </SpotlightCard>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: WHY DIGGITY ACADEMY
            ========================================= */}
            <section className="py-24 px-6 relative z-10 bg-gray-50/50 dark:bg-brand-bg/50 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                            {locale === 'en' ? 'More Than Just Classes.' : 'Berbeda dari yang Lain, Belajar di Diggity Lebih dari Sekadar Kelas.'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'We build a learning experience that connects mentors, practice, community, and career development in one ecosystem.' 
                                : 'Kami membangun pengalaman belajar yang menghubungkan mentor, pembelajaran, praktik, komunitas, dan pengembangan karier dalam satu ekosistem.'}
                        </p>
                    </ScrollReveal>

                    {/* Benefits Grid (3x2) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ACADEMY_BENEFITS.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={benefit.id} animation="fade-up" delay={idx * 50}>
                                    <div className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border rounded-3xl hover:-translate-y-1 transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-blue/5">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-main mb-3">
                                            {locale === 'en' ? benefit.titleEn : benefit.titleId}
                                        </h3>
                                        <p className="text-sm text-text-gray leading-relaxed font-medium">
                                            {locale === 'en' ? benefit.descEn : benefit.descId}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: FREE LEARNING
            ========================================= */}
            <section className="py-24 px-6 relative z-10 overflow-hidden">
                {/* Background decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
                        <ScrollReveal animation="slide-right" className="max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest">Free Learning</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'Strengthen Fundamental Skills, For Free.' : 'Perkuat Fundamental Skills, Gratis.'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium">
                                {locale === 'en' 
                                    ? 'Start your learning journey at no cost through various free classes and educational materials.' 
                                    : 'Mulai perjalanan belajar tanpa biaya melalui berbagai kelas dan materi edukasi yang dapat diakses secara gratis.'}
                            </p>
                        </ScrollReveal>
                        
                        <ScrollReveal animation="slide-left" className="shrink-0">
                            <Link href="#learning-paths" className="px-6 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue-dark transition-colors inline-flex items-center gap-2 group">
                                {locale === 'en' ? 'Start for Free' : 'Mulai Gratis'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* Free Content Grid (3 cols) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Free Courses */}
                        <ScrollReveal animation="fade-up" delay={0}>
                            <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border rounded-3xl group cursor-pointer hover:border-brand-blue/30">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-brand-blue transition-colors">
                                    {locale === 'en' ? 'Free Courses' : 'Free Courses'}
                                </h3>
                                <p className="text-sm text-text-gray font-medium">
                                    {locale === 'en' ? 'Learn basic programming, design, and business concepts.' : 'Pelajari konsep dasar programming, desain, dan bisnis.'}
                                </p>
                            </SpotlightCard>
                        </ScrollReveal>

                        {/* Free Webinar */}
                        <ScrollReveal animation="fade-up" delay={100}>
                            <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border rounded-3xl group cursor-pointer hover:border-brand-blue/30">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <PlayCircle className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-brand-blue transition-colors">
                                    {locale === 'en' ? 'Free Webinar' : 'Free Webinar'}
                                </h3>
                                <p className="text-sm text-text-gray font-medium">
                                    {locale === 'en' ? 'Live sessions with experts discussing industry trends.' : 'Sesi interaktif bersama praktisi membahas tren industri.'}
                                </p>
                            </SpotlightCard>
                        </ScrollReveal>

                        {/* Free E-Books */}
                        <ScrollReveal animation="fade-up" delay={200}>
                            <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border rounded-3xl group cursor-pointer hover:border-brand-blue/30">
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Book className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-brand-blue transition-colors">
                                    {locale === 'en' ? 'Free E-Books' : 'Free E-Books'}
                                </h3>
                                <p className="text-sm text-text-gray font-medium">
                                    {locale === 'en' ? 'Download comprehensive guides and study materials.' : 'Unduh panduan lengkap dan materi pembelajaran digital.'}
                                </p>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 4: LEARNING PATH
            ========================================= */}
            <section id="learning-paths" className="py-24 px-6 relative z-10 bg-gray-50/50 dark:bg-brand-bg/50 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                            {locale === 'en' ? 'Choose Your Learning Path' : 'Pilih Jalur Karier & Belajarmu'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'Diggity Academy curriculum is designed to help you build competencies step-by-step, from fundamentals to being ready for the professional world.' 
                                : 'Kurikulum Diggity Academy dirancang untuk membantu kamu membangun kompetensi secara bertahap, dari fundamental hingga siap menerapkan skill di dunia profesional.'}
                        </p>
                    </ScrollReveal>

                    {/* Learning Path Interactive Tabs */}
                    <ScrollReveal animation="fade-up" delay={100}>
                        <LearningPathTabs locale={locale} />
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
}
