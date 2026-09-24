'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, BookOpen, Briefcase, Users, LayoutTemplate, 
    MonitorPlay, FileCode2, MessagesSquare, Trophy, 
    Target, Code2, Star, Clock, Network, HeadphonesIcon, GraduationCap, CheckCircle2
} from 'lucide-react';

export default function BootcampLandingPage() {
    const { language: locale } = useLanguage();
    const [courses, setCourses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { api } = await import('../../../lib/api');
                const data = await api.getAcademyCourses();
                setCourses(data.filter(c => c.type === 'bootcamp'));
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const formatIDR = (val: any) => {
        if (!val) return null;
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val));
    };

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
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
                            <p className="text-text-gray">{locale === 'en' ? 'Loading bootcamps...' : 'Memuat bootcamp...'}</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-text-gray">{locale === 'en' ? 'No bootcamps available right now.' : 'Belum ada bootcamp yang tersedia.'}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((bootcamp, i) => (
                                <ScrollReveal key={bootcamp.id || i} animation="fade-up" delay={i * 100}>
                                    <SpotlightCard className="p-1 bg-white dark:bg-glass-bg border border-glass-border rounded-[2rem] h-full flex flex-col hover:border-brand-blue/50 transition-colors group">
                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-6 w-max">
                                                <Star className="w-3 h-3 fill-current" /> {bootcamp.badge || 'Project-Based'}
                                            </div>
                                            <h3 className="text-2xl font-black text-text-main mb-3 group-hover:text-brand-blue transition-colors">{bootcamp.title}</h3>
                                            <p className="text-sm text-text-gray font-medium mb-6 flex-grow">{bootcamp.description}</p>
                                            
                                            <div className="space-y-4 mb-8">
                                                <div>
                                                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-2">Syllabus Overview</span>
                                                    <div className="text-xs text-text-main leading-relaxed">
                                                        {bootcamp.syllabus?.substring(0, 100) || 'Module 1: Introduction\nModule 2: Practice'}...
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass-border">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Mentor</span>
                                                        <span className="text-xs font-semibold text-text-main">{bootcamp.instructor_name || 'Diggity Team'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Price</span>
                                                        <span className="text-xs font-semibold text-brand-blue">{formatIDR(bootcamp.price) || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Duration</span>
                                                    <span className="text-xs font-semibold text-text-main flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {bootcamp.duration || '12 Weeks'}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link href={`/academy/course/${bootcamp.slug}`} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                                                {locale === 'en' ? 'View Program' : 'Lihat Program'}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </SpotlightCard>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
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

            {/* =========================================
                FASE 3: INSIDE THE BOOTCAMP
            ========================================= */}
            <section className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Inside The Bootcamp</span>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'Not Just Learning. You Will Build.' : 'Bukan Cuma Belajar. Kamu Akan Mengerjakan.'}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Live Class', desc: locale === 'en' ? 'Interactive learning sessions with expert mentors.' : 'Pembelajaran interaktif bersama mentor.', icon: MonitorPlay },
                            { title: 'Hands-on Practice', desc: locale === 'en' ? 'Direct practice using industry-standard tools.' : 'Latihan langsung menggunakan tools industri.', icon: Code2 },
                            { title: 'Assignment', desc: locale === 'en' ? 'Tasks designed to test your understanding.' : 'Tugas untuk menguji pemahaman.', icon: LayoutTemplate },
                            { title: 'Case Study', desc: locale === 'en' ? 'Solve problems based on real-world cases.' : 'Menyelesaikan masalah berdasarkan kasus nyata.', icon: Target },
                            { title: 'Final Project', desc: locale === 'en' ? 'Build a comprehensive project as your portfolio.' : 'Membangun project sebagai portfolio.', icon: Briefcase },
                            { title: 'Mentoring Session', desc: locale === 'en' ? '1-on-1 consultation and detailed feedback.' : 'Sesi konsultasi dan feedback mendetail.', icon: Users },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <div className="p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl flex flex-col items-start hover:border-brand-blue/30 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-main mb-2">{item.title}</h3>
                                        <p className="text-sm text-text-gray">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: FINAL PROJECT & PORTFOLIO
            ========================================= */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-end mb-16">
                        <ScrollReveal animation="slide-right" className="lg:w-2/3">
                            <span className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-2 block">Final Project</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'Bring Home Skills, Not Just Certificates.' : 'Pulang Bawa Skill, Bukan Cuma Sertifikat.'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium">
                                {locale === 'en' 
                                    ? 'Throughout the program, you will work on projects designed to strengthen your abilities and build a professional portfolio.' 
                                    : 'Selama mengikuti program, peserta mengerjakan project yang dirancang untuk memperkuat kemampuan sekaligus membangun portfolio profesional.'}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="lg:w-1/3 flex justify-start lg:justify-end">
                            <Link href="#" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blue/80 transition-colors">
                                {locale === 'en' ? 'View All Portfolios' : 'Lihat Semua Portfolio'} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="group rounded-3xl overflow-hidden border border-glass-border bg-white dark:bg-glass-bg hover:border-brand-blue/50 transition-colors shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            <Code2 className="w-12 h-12 opacity-20" />
                                            <span className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-widest opacity-50">Project 0{i}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-text-main mb-2">E-Commerce Dashboard App</h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-gray">Role:</span>
                                                <span className="font-semibold text-text-main">Full-Stack Developer</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-gray">Tools:</span>
                                                <span className="font-semibold text-text-main">React, Node.js, PostgreSQL</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-gray">Hasil:</span>
                                                <span className="font-semibold text-brand-blue">Live Web App</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: MENTOR
            ========================================= */}
            <section className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 items-end mb-16">
                        <ScrollReveal animation="slide-right" className="lg:w-2/3">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Expert Mentors</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Learn Directly from Practitioners' : 'Belajar Langsung dari Praktisi'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left" className="lg:w-1/3 flex justify-start lg:justify-end">
                            <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-text-main font-bold hover:border-brand-blue/50 transition-all">
                                {locale === 'en' ? 'View All Mentors' : 'Lihat Semua Mentor'}
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Budi Santoso', role: 'Senior Software Engineer', company: 'Tech Unicorn ID', exp: '8+ Years' },
                            { name: 'Sarah Wijaya', role: 'Lead Product Designer', company: 'Global Agency', exp: '6+ Years' },
                            { name: 'Ahmad Rizki', role: 'Data Scientist', company: 'Fintech Startup', exp: '5+ Years' },
                            { name: 'Jessica Lin', role: 'Digital Marketing Lead', company: 'E-Commerce Giant', exp: '7+ Years' },
                        ].map((mentor, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl hover:border-brand-blue/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                                    <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mb-6 overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            <Users className="w-8 h-8 opacity-50" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-text-main mb-1 group-hover:text-brand-blue transition-colors">{mentor.name}</h3>
                                    <p className="text-sm font-semibold text-brand-blue mb-1">{mentor.role}</p>
                                    <p className="text-xs text-text-gray font-medium mb-4">{mentor.company}</p>
                                    
                                    <div className="pt-4 border-t border-glass-border">
                                        <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-2">Experience</span>
                                        <span className="text-sm font-semibold text-text-main">{mentor.exp}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 4: ALUMNI / STUDENT STORIES
            ========================================= */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Student Stories</span>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'They Started Here' : 'Mereka Mulai dari Sini'}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { quote: 'Materi sangat terstruktur dan mentor benar-benar membimbing sampai paham. Final project-nya sangat membantu saya mendapat pekerjaan baru.', name: 'Rina S.', role: 'Junior Data Analyst', bootcamp: 'Bootcamp Data Analytics' },
                            { quote: 'Dari nol belajar coding, sekarang bisa bikin full-stack app sendiri. Sangat recommended buat career switcher!', name: 'Dimas A.', role: 'Frontend Developer', bootcamp: 'Bootcamp Full-Stack Web' },
                            { quote: 'Career support-nya luar biasa! CV saya di-review total dan diajari cara nego gaji saat interview.', name: 'Nadia P.', role: 'UI/UX Designer', bootcamp: 'Bootcamp UI/UX Design' },
                        ].map((testimonial, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl relative shadow-sm hover:shadow-xl transition-shadow h-full flex flex-col justify-between">
                                    <div>
                                        <div className="text-5xl font-serif text-brand-blue/20 absolute top-4 left-6">"</div>
                                        <p className="text-text-gray font-medium italic mb-6 relative z-10 pt-4 leading-relaxed">"{testimonial.quote}"</p>
                                    </div>
                                    <div className="flex items-center gap-4 border-t border-glass-border pt-6 mt-auto">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-lg shrink-0">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main">{testimonial.name}</h4>
                                            <p className="text-xs text-text-gray font-medium">{testimonial.role}</p>
                                            <p className="text-[10px] font-bold text-brand-blue mt-1 uppercase tracking-wider">{testimonial.bootcamp}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 4: CAREER SUPPORT & LEARNING FORMAT
            ========================================= */}
            <section className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Career Support */}
                    <div>
                        <ScrollReveal animation="fade-up" className="mb-12">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Career Support</span>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight mb-4">
                                {locale === 'en' ? 'We Help Prepare Your Next Step' : 'Kami Membantumu Mempersiapkan Langkah Berikutnya'}
                            </h2>
                        </ScrollReveal>

                        <div className="space-y-4">
                            {[
                                { title: 'CV Review', desc: 'Review CV agar lebih relevan dengan target role.' },
                                { title: 'Portfolio Review', desc: 'Feedback terhadap project dan portfolio.' },
                                { title: 'LinkedIn Optimization', desc: 'Membantu membangun professional presence.' },
                                { title: 'Interview Preparation', desc: 'Simulasi dan persiapan interview.' },
                                { title: 'Career Consultation', desc: 'Diskusi mengenai career path dan target role.' },
                                { title: 'Job Opportunity', desc: 'Informasi peluang kerja dari network partner (jika tersedia).' },
                            ].map((support, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                    <div className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border shadow-sm hover:border-brand-blue/30 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main text-lg mb-1">{support.title}</h4>
                                            <p className="text-sm text-text-gray font-medium">{support.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Learning Format */}
                    <div>
                        <ScrollReveal animation="fade-up" className="mb-12">
                            <span className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-2 block">Learning Format</span>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight mb-4">
                                {locale === 'en' ? 'Choose The Way You Learn' : 'Pilih Cara Belajar yang Sesuai dengan Ritmemu'}
                            </h2>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {[
                                { title: 'Online', desc: 'Belajar dari mana saja dengan sesi live dan learning platform.', icon: MonitorPlay },
                                { title: 'Offline', desc: 'Belajar langsung tatap muka bersama mentor dan peserta lainnya.', icon: Users },
                                { title: 'Private / Corporate', desc: 'Program khusus dan eksklusif untuk individu, kelompok, atau perusahaan.', icon: Briefcase },
                            ].map((format, i) => {
                                const Icon = format.icon;
                                return (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                        <div className="p-8 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm hover:shadow-lg transition-shadow group">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-text-main mb-2">{format.title}</h4>
                                                <p className="text-sm text-text-gray font-medium">{format.desc}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 4: FAQ & FINAL CTA
            ========================================= */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-3xl mx-auto mb-32">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <span className="text-sm font-bold text-text-gray uppercase tracking-widest mb-2 block">FAQ</span>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {[
                            'Apakah saya harus punya basic sebelumnya?',
                            'Siapa yang cocok mengikuti Bootcamp Diggity?',
                            'Berapa lama durasi bootcamp?',
                            'Apakah tersedia online dan offline?',
                            'Apakah bisa mengikuti sambil bekerja/kuliah?',
                            'Apakah tersedia cicilan atau pembayaran bertahap?'
                        ].map((q, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                <details className="group p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl cursor-pointer shadow-sm hover:border-brand-blue/50 transition-colors">
                                    <summary className="font-bold text-lg text-text-main list-none flex justify-between items-center">
                                        {q}
                                        <span className="text-brand-blue group-open:rotate-180 transition-transform duration-300">▼</span>
                                    </summary>
                                    <p className="text-text-gray mt-4 pt-4 border-t border-glass-border font-medium leading-relaxed">
                                        Tentu saja! Program kami dirancang agar dapat diakses sesuai dengan ketentuan dari masing-masing jenis program dan level kompetensinya. Untuk informasi lebih spesifik, silakan pilih program yang Anda inginkan dan berkonsultasi langsung dengan tim Diggity Academy.
                                    </p>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-brand-blue to-purple-600 text-center relative overflow-hidden shadow-2xl">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                            
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">
                                    {locale === 'en' ? 'Ready to Upgrade Skills and Take the Next Step?' : 'Siap Upgrade Skill dan Mulai Langkah Berikutnya?'}
                                </h2>
                                <p className="text-lg md:text-xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto">
                                    {locale === 'en' 
                                        ? 'Choose the program that fits your goals or consult with the Diggity Academy team first.' 
                                        : 'Pilih program yang sesuai dengan tujuanmu atau konsultasikan terlebih dahulu dengan tim Diggity Academy.'}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="#programs" className="px-8 py-4 bg-white text-brand-blue font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                        {locale === 'en' ? 'View All Bootcamps' : 'Lihat Semua Bootcamp'}
                                    </Link>
                                    <Link href="/contact" className="px-8 py-4 bg-black/20 text-white border border-white/30 font-bold rounded-2xl hover:bg-black/30 transition-colors backdrop-blur-sm">
                                        {locale === 'en' ? 'Program Consultation' : 'Konsultasi Program'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
}
