import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';
import ScrollReveal from '../../components/ScrollReveal';
import SpotlightCard from '../../components/SpotlightCard';
import { ACADEMY_PROGRAMS } from '../../lib/data/academy';
import { ArrowRight } from 'lucide-react';

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
                        <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full blur-sm animate-pulse"></div>
                        <div className="absolute inset-4 bg-gradient-to-tr from-blue-500/20 to-white/10 rounded-full backdrop-blur-3xl border border-white/20 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-30 mix-blend-overlay"></div>
                            {/* Inner abstract geometric shapes as placeholder for illustration */}
                            <div className="w-3/4 h-3/4 bg-white/10 rounded-3xl rotate-12 backdrop-blur-md border border-white/20"></div>
                            <div className="absolute w-1/2 h-1/2 bg-blue-400/20 rounded-full -rotate-12 blur-xl"></div>
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

        </div>
    );
}
