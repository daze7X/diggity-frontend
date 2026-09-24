'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, BookOpen, Briefcase, Users, LayoutTemplate, 
    MonitorPlay, FileCode2, MessagesSquare, Trophy, 
    Target, Code2, Star, Clock, Network, HeadphonesIcon, GraduationCap
} from 'lucide-react';

export default function BootcampLandingPage() {
    const { language: locale } = useLanguage();

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* =========================================
                FASE 1: HERO - CAREER TRANSFORMATION
            ========================================= */}
            <section className="relative pt-12 pb-24 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Copy */}
                    <div className="w-full lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left">
                        <ScrollReveal animation="fade-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                                </span>
                                {locale === 'en' ? 'Intensive Bootcamp Program' : 'Program Bootcamp Intensif'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1]">
                                {locale === 'en' ? 'Build Skills.' : 'Bangun Skill.'}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">
                                    {locale === 'en' ? 'Build Portfolio.' : 'Bangun Portofolio.'}
                                </span>{' '}
                                <br />
                                {locale === 'en' ? 'Prepare Your Career.' : 'Siapkan Kariermu.'}
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={100}>
                            <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {locale === 'en' 
                                    ? 'An intensive bootcamp program to help you master industry-relevant skills through structured learning, experienced mentors, real-world projects, and career support.' 
                                    : 'Program bootcamp intensif untuk membantumu menguasai skill yang relevan dengan kebutuhan industri melalui pembelajaran terstruktur, mentor berpengalaman, project nyata, dan career support.'}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={200} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="#programs" className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue/90 hover:scale-105 transition-all shadow-xl shadow-brand-blue/20">
                                {locale === 'en' ? 'View Bootcamp Programs' : 'Lihat Program Bootcamp'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/5 border border-glass-border text-text-main font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                                {locale === 'en' ? 'Program Consultation' : 'Konsultasi Program'}
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* Right Visual */}
                    <div className="w-full lg:w-1/2 relative">
                        <ScrollReveal animation="slide-left" delay={300}>
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden border border-glass-border shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent z-10 mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden">
                                    <div className="absolute w-[150%] h-[150%] bg-[url('/img/grid.svg')] opacity-20 animate-[spin_60s_linear_infinite]"></div>
                                    <Code2 className="w-32 h-32 text-brand-blue/50" />
                                </div>

                                <div className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <MonitorPlay className="w-5 h-5 text-cyan-400" />
                                    Online & Offline
                                </div>
                                <div className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <Briefcase className="w-5 h-5 text-purple-400" />
                                    Career Transformation
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 1: WHY DIGGITY BOOTCAMP
            ========================================= */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/50 dark:bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Why Diggity Bootcamp</span>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'More Than Just Finishing a Class.' : 'Belajar Bukan Sekadar Selesai Kelas.'}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: LayoutTemplate,
                                title: 'Industry-Oriented Curriculum',
                                desc: locale === 'en' ? 'Materials are structured based on the needs of the job market and industry trends.' : 'Materi disusun berdasarkan kebutuhan dunia kerja dan perkembangan industri.'
                            },
                            {
                                icon: Users,
                                title: 'Expert Mentors',
                                desc: locale === 'en' ? 'Learn alongside practitioners and professionals who understand real-world challenges.' : 'Belajar bersama praktisi dan profesional yang memahami real-world challenges.'
                            },
                            {
                                icon: FileCode2,
                                title: 'Project-Based Learning',
                                desc: locale === 'en' ? 'Not just theory. Students work on projects that can be added to their portfolio.' : 'Tidak hanya teori. Peserta mengerjakan project yang dapat menjadi bagian dari portfolio.'
                            },
                            {
                                icon: Briefcase,
                                title: 'Career Preparation',
                                desc: locale === 'en' ? 'Students receive mentoring for CVs, portfolios, interviews, and job market readiness.' : 'Peserta mendapatkan pendampingan untuk CV, portfolio, interview, dan persiapan memasuki dunia kerja.'
                            },
                            {
                                icon: MonitorPlay,
                                title: 'Flexible Learning',
                                desc: locale === 'en' ? 'Available in online, offline, weekday, weekend, or customized formats based on the program.' : 'Tersedia pilihan pembelajaran online, offline, weekday, weekend, atau format tertentu sesuai program.'
                            },
                            {
                                icon: Trophy,
                                title: 'Certificate & Portfolio',
                                desc: locale === 'en' ? 'Students earn proof of program completion and project results to support their professional journey.' : 'Peserta memperoleh bukti penyelesaian program dan hasil project yang dapat digunakan untuk mendukung perjalanan profesional.'
                            }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <SpotlightCard className="p-8 bg-white dark:bg-glass-bg border border-glass-border h-full hover:border-brand-blue/30 transition-colors">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-main mb-3">{item.title}</h3>
                                        <p className="text-text-gray font-medium leading-relaxed">{item.desc}</p>
                                    </SpotlightCard>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 1: LEARNING EXPERIENCE
            ========================================= */}
            <section className="py-24 px-6 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-2 block">Learning Experience</span>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'From Learning to Ready to Work' : 'Dari Belajar sampai Siap Berkarya'}
                        </h2>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-8 left-0 w-full h-1 bg-glass-border hidden lg:block z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
                            {[
                                { step: '01', title: 'Learn', icon: BookOpen, desc: locale === 'en' ? 'Master fundamentals and core skills.' : 'Pelajari fundamental dan skill utama.', color: 'from-blue-500 to-cyan-500' },
                                { step: '02', title: 'Practice', icon: Target, desc: locale === 'en' ? 'Practice through tasks and case studies.' : 'Latihan melalui tugas dan studi kasus.', color: 'from-cyan-500 to-teal-500' },
                                { step: '03', title: 'Build', icon: FileCode2, desc: locale === 'en' ? 'Work on real-world projects.' : 'Kerjakan real-world project.', color: 'from-teal-500 to-green-500' },
                                { step: '04', title: 'Review', icon: MessagesSquare, desc: locale === 'en' ? 'Get feedback from expert mentors.' : 'Mendapatkan feedback dari mentor.', color: 'from-green-500 to-yellow-500' },
                                { step: '05', title: 'Showcase', icon: Trophy, desc: locale === 'en' ? 'Build a portfolio from learning outcomes.' : 'Bangun portfolio dari hasil pembelajaran.', color: 'from-yellow-500 to-orange-500' },
                                { step: '06', title: 'Prepare', icon: Briefcase, desc: locale === 'en' ? 'Prepare CV, interview, or career path.' : 'Persiapan CV, interview, freelance, atau career path.', color: 'from-orange-500 to-red-500' },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="relative flex flex-col items-center text-center group">
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} p-[2px] mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="w-full h-full bg-white dark:bg-bg-canvas rounded-full flex items-center justify-center relative">
                                                <Icon className="w-6 h-6 text-text-main" />
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-text-main text-bg-canvas text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-bg-canvas">
                                                    {item.step}
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-black text-text-main mb-2">{item.title}</h4>
                                        <p className="text-sm text-text-gray font-medium">{item.desc}</p>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 2: PROGRAM BOOTCAMP (CATALOG)
            ========================================= */}
            <section id="programs" className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                            {locale === 'en' ? 'Find the Right Bootcamp for Your Goals' : 'Temukan Bootcamp yang Sesuai dengan Tujuanmu'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' ? 'Choose a program based on your field, skill level, and career objectives.' : 'Pilih program berdasarkan bidang, level kemampuan, dan tujuan kariermu.'}
                        </p>
                    </ScrollReveal>

                    {/* Filter (Visual Mockup for Handover) */}
                    <ScrollReveal animation="fade-up" delay={100} className="flex flex-wrap items-center justify-center gap-4 mb-16">
                        {['Semua Bidang', 'Technology', 'AI & Data', 'Business & Marketing', 'Creative & Design', 'Cyber Security'].map((filter, i) => (
                            <button key={i} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-text-main hover:border-brand-blue/50'}`}>
                                {filter}
                            </button>
                        ))}
                    </ScrollReveal>

                    {/* Bootcamp Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        {[
                            {
                                title: 'Full-Stack Web Development',
                                desc: 'Belajar membangun aplikasi web dari frontend hingga backend melalui project-based learning.',
                                skills: ['HTML', 'CSS', 'JavaScript', 'React', 'API', 'Database'],
                                level: 'Beginner → Intermediate',
                                format: 'Online / Offline',
                                duration: '12 Weeks'
                            },
                            {
                                title: 'UI/UX Design Masterclass',
                                desc: 'Kuasai fundamental riset pengguna, wireframing, prototyping, hingga design system menggunakan Figma.',
                                skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design System'],
                                level: 'Beginner',
                                format: 'Online',
                                duration: '8 Weeks'
                            },
                            {
                                title: 'Data Analytics & Visualization',
                                desc: 'Olah data mentah menjadi insight berharga untuk bisnis menggunakan Python, SQL, dan PowerBI.',
                                skills: ['Python', 'SQL', 'Data Viz', 'PowerBI', 'Statistics'],
                                level: 'Intermediate',
                                format: 'Hybrid',
                                duration: '10 Weeks'
                            }
                        ].map((bootcamp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <SpotlightCard className="p-1 bg-white dark:bg-glass-bg border border-glass-border rounded-[2rem] h-full flex flex-col hover:border-brand-blue/50 transition-colors group">
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-6 w-max">
                                            <Star className="w-3 h-3 fill-current" /> Project-Based
                                        </div>
                                        <h3 className="text-2xl font-black text-text-main mb-3 group-hover:text-brand-blue transition-colors">{bootcamp.title}</h3>
                                        <p className="text-sm text-text-gray font-medium mb-6 flex-grow">{bootcamp.desc}</p>
                                        
                                        <div className="space-y-4 mb-8">
                                            <div>
                                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-2">Skills You Will Learn</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {bootcamp.skills.map((skill, j) => (
                                                        <span key={j} className="text-xs px-2 py-1 bg-slate-100 dark:bg-white/5 text-text-main rounded-md border border-glass-border">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass-border">
                                                <div>
                                                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Level</span>
                                                    <span className="text-xs font-semibold text-text-main">{bootcamp.level}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Format</span>
                                                    <span className="text-xs font-semibold text-text-main">{bootcamp.format}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Duration</span>
                                                <span className="text-xs font-semibold text-text-main flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {bootcamp.duration}
                                                </span>
                                            </div>
                                        </div>

                                        <Link href="#" className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                                            {locale === 'en' ? 'View Program' : 'Lihat Program'}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 2: WHAT YOU WILL GET
            ========================================= */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/3">
                        <ScrollReveal animation="slide-right">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Value & Benefits</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'What You Will Get?' : 'Apa yang Kamu Dapatkan?'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium mb-8">
                                {locale === 'en' 
                                    ? 'A comprehensive learning ecosystem designed to ensure you graduate with real skills and a solid portfolio.' 
                                    : 'Ekosistem belajar komprehensif yang dirancang untuk memastikan kamu lulus dengan skill nyata dan portfolio yang solid.'}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="w-full lg:w-2/3">
                        <ScrollReveal animation="slide-left" delay={100}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'Structured Curriculum', desc: 'Kurikulum terstruktur dari fundamental hingga advanced.', icon: LayoutTemplate },
                                    { title: 'Expert Mentor', desc: 'Dibimbing oleh praktisi dan profesional industri.', icon: Users },
                                    { title: 'Real Projects', desc: 'Mengerjakan project yang relevan dengan industri nyata.', icon: Code2 },
                                    { title: 'Portfolio Building', desc: 'Hasil project dapat dikembangkan menjadi portfolio.', icon: Briefcase },
                                    { title: 'Career Support', desc: 'CV, LinkedIn, interview & career preparation.', icon: Target },
                                    { title: 'Networking', desc: 'Terhubung dengan mentor dan peserta lainnya.', icon: Network },
                                    { title: 'Certificate', desc: 'Sertifikat kelulusan penyelesaian program.', icon: GraduationCap },
                                    { title: 'Learning Support', desc: 'Dukungan penuh selama proses pembelajaran.', icon: HeadphonesIcon },
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="p-6 bg-white dark:bg-white/5 border border-glass-border rounded-2xl flex gap-4 hover:border-brand-blue/30 transition-colors">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text-main mb-1">{item.title}</h4>
                                                <p className="text-sm text-text-gray leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

        </div>
    );
}
