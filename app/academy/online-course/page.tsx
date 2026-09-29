'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, PlayCircle, Clock, Award, MessageSquare, 
    MonitorSmartphone, Star, Search, Filter, BookOpen,
    Code2, LayoutTemplate, Megaphone, Cloud, Briefcase, Play, PenTool,
    CheckCircle2, Flame, Tag, ChevronRight, Zap
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function OnlineCourseLandingPage() {
    const { language: locale } = useLanguage();
    const [courses, setCourses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState('all');

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await api.getAcademyCourses();
                // Filter only 'online_course'
                setCourses(data.filter((c: any) => c.type === 'online_course'));
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

    const categories = ['all', ...Array.from(new Set(courses.map(c => c.category?.slug).filter(Boolean)))];
    
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || course.category?.slug === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-[0.03] z-0 pointer-events-none"></div>

            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue mb-8">
                    <PlayCircle className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wide uppercase">
                        {locale === 'en' ? 'Online Course' : 'Kelas Online'}
                    </span>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Discover Your Next Skill.' : 'Belajar Skill Baru,'} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">
                            {locale === 'en' ? 'Anytime. Anywhere.' : 'Kapan Saja. Dari Mana Saja.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Master relevant digital skills through practical, structured online courses guided by experienced mentors.' 
                            : 'Kuasai skill digital yang relevan melalui kelas online praktis, terstruktur, dan dibimbing oleh mentor berpengalaman.'}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="#browse" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue/90 hover:scale-105 transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2">
                        {locale === 'en' ? 'Explore All Courses' : 'Jelajahi Semua Kelas'}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="#free" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-glass-border text-text-main font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center">
                        {locale === 'en' ? 'View Free Courses' : 'Lihat Kelas Gratis'}
                    </Link>
                </ScrollReveal>
            </section>

            {/* 02. POPULAR CATEGORIES */}
            <section className="py-20 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-12">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            {locale === 'en' ? 'Learn the Skills You Need' : 'Pelajari Skill yang Kamu Butuhkan'}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Code2, title: 'Technology & Software', desc: 'Website, Mobile App, Programming' },
                            { icon: Cloud, title: 'AI & Data', desc: 'Machine Learning, Data Analytics, Gen AI' },
                            { icon: PenTool, title: 'Creative & Design', desc: 'Graphic Design, UI/UX, Video' },
                            { icon: Megaphone, title: 'Marketing & Growth', desc: 'Digital Marketing, SEO, Ads' },
                            { icon: LayoutTemplate, title: 'Cloud & Cyber Security', desc: 'Cloud, DevOps, Infrastructure' },
                            { icon: Briefcase, title: 'Business & Professional', desc: 'Business, Management, Product' },
                        ].map((cat, i) => {
                            const Icon = cat.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                    <div className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 hover:-translate-y-1 transition-all flex items-start gap-4 shadow-sm hover:shadow-md cursor-pointer group">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main mb-1 group-hover:text-brand-blue transition-colors">{cat.title}</h4>
                                            <p className="text-xs text-text-gray font-medium">{cat.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 03. POPULAR TOOLS & TECHNOLOGIES */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/3">
                            <ScrollReveal animation="slide-right">
                                <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight mb-4">
                                    {locale === 'en' ? 'Learn Industry-Standard Tools' : 'Belajar Tools yang Digunakan Industri'}
                                </h2>
                                <p className="text-text-gray font-medium mb-8">
                                    {locale === 'en' ? 'Master the specific technologies demanded by top companies.' : 'Kuasai teknologi spesifik yang paling dicari oleh perusahaan top.'}
                                </p>
                                <button className="px-6 py-3 bg-white dark:bg-white/5 border border-glass-border text-text-main font-bold rounded-xl hover:border-brand-blue/30 transition-all flex items-center gap-2 text-sm">
                                    {locale === 'en' ? 'Explore by Technology' : 'Eksplorasi Berdasarkan Teknologi'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </ScrollReveal>
                        </div>
                        <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {['React', 'Laravel', 'Next.js', 'Flutter', 'Python', 'Figma', 'WordPress', 'Power BI'].map((tool, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                    <div className="p-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border text-center font-bold text-text-main hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                                        {tool}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 05. PROMO / SPECIAL OFFER */}
            <section className="py-12 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="rounded-[2rem] bg-gradient-to-r from-orange-500 to-red-500 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold mb-4 uppercase tracking-wider">
                                    <Flame className="w-4 h-4 text-yellow-300" />
                                    Weekend Learning Sale
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                                    {locale === 'en' ? 'New Skills, Lighter Investment.' : 'Skill Baru, Investasi yang Lebih Ringan.'}
                                </h2>
                                <p className="text-white/90 font-medium text-lg">
                                    {locale === 'en' ? 'Discount up to 50% for selected premium courses.' : 'Diskon hingga 50% untuk kelas premium pilihan.'}
                                </p>
                            </div>
                            <div className="relative z-10 shrink-0">
                                <Link href="#browse" className="px-8 py-4 bg-white text-red-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl flex items-center gap-2">
                                    <Tag className="w-5 h-5" />
                                    {locale === 'en' ? 'View Promo Classes' : 'Lihat Kelas Promo'}
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 06. BROWSE KELAS (CATALOG & FILTER) */}
            <section id="browse" className="py-24 px-6 relative z-10 bg-gray-50/50 dark:bg-black/10 border-t border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right" className="max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                                {locale === 'en' ? 'Find the Class That Fits Your Goals' : 'Temukan Kelas yang Sesuai dengan Tujuanmu'}
                            </h2>
                        </ScrollReveal>
                        
                        <ScrollReveal animation="slide-left" className="relative w-full md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-text-gray" />
                            </div>
                            <input 
                                type="text"
                                placeholder={locale === 'en' ? "Search class, skill, or technology..." : "Cari kelas, skill, atau teknologi..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-medium text-text-main shadow-sm"
                            />
                        </ScrollReveal>
                    </div>

                    <ScrollReveal animation="fade-up" className="flex flex-wrap items-center gap-3 mb-10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-glass-bg border border-glass-border rounded-xl text-text-main font-bold text-sm">
                            <Filter className="w-4 h-4" />
                            Filter
                        </div>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all capitalize border ${activeCategory === cat ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20' : 'bg-white dark:bg-glass-bg text-text-gray border-glass-border hover:border-brand-blue/30 hover:text-brand-blue'}`}
                            >
                                {cat === 'all' ? (locale === 'en' ? 'All Classes' : 'Semua Kelas') : cat.replace(/-/g, ' ')}
                            </button>
                        ))}
                    </ScrollReveal>

                    {/* 07. CLASS CARD */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course: any, idx: number) => (
                                <ScrollReveal key={course.id} animation="fade-up" delay={(idx % 3) * 100}>
                                    <Link href={`/academy/course/${course.slug}`} className="block h-full group">
                                        <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300 flex flex-col h-full relative">
                                            {/* Badge */}
                                            {course.badge && (
                                                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500 text-white text-[10px] font-black tracking-widest uppercase rounded-lg shadow-lg">
                                                    {course.badge}
                                                </div>
                                            )}
                                            {/* Thumbnail */}
                                            <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={course.thumbnail ? (course.thumbnail.startsWith('http') ? course.thumbnail : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${course.thumbnail}`) : '/images/saas_hero.jpg'} 
                                                    alt={course.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                <div className="absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 bg-black/30 backdrop-blur-md rounded-md">
                                                    {course.category?.name || 'Category'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-text-gray font-medium mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                {/* Metadata */}
                                                <div className="flex items-center gap-3 text-[11px] font-bold text-text-gray uppercase tracking-wider mb-6">
                                                    <span>Beg / Int</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration || '6 Hours'}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-orange-500"><Star className="w-3 h-3 fill-current" /> {course.rating || '4.9'}</span>
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                                                    <div>
                                                        {course.original_price && (
                                                            <span className="text-xs text-text-gray line-through block mb-0.5">{formatIDR(course.original_price)}</span>
                                                        )}
                                                        <span className="text-lg font-black text-brand-blue">{formatIDR(course.price) || 'N/A'}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-text-main group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                        <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                            <BookOpen className="w-12 h-12 mx-auto text-text-gray mb-4 opacity-50" />
                            <p className="text-lg font-bold text-text-main">
                                {locale === 'en' ? 'No courses found.' : 'Tidak ada kelas yang ditemukan.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* 08 & 09. LEARNING EXPERIENCE & PROJECT-BASED */}
            <section className="py-24 px-6 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2 space-y-10">
                        <ScrollReveal animation="slide-right">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Learning Experience</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                                {locale === 'en' ? 'Learn in a More Practical Way' : 'Belajar dengan Cara yang Lebih Praktis'}
                            </h2>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {[
                                { title: 'Video Learning', desc: 'Materi dapat dipelajari sesuai ritme masing-masing.', icon: Play },
                                { title: 'Hands-on Practice', desc: 'Tidak hanya menonton. Peserta langsung mempraktikkan materi.', icon: PenTool },
                                { title: 'Learning Resources', desc: 'Template, source code, worksheet, atau resources pendukung.', icon: BookOpen },
                                { title: 'Lifetime Access', desc: 'Materi dapat diakses selamanya (lifetime access).', icon: Clock },
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} className="flex gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-text-main">{item.title}</h4>
                                            <p className="text-text-gray font-medium">{item.desc}</p>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2">
                        <ScrollReveal animation="slide-left" className="h-full">
                            <SpotlightCard className="p-8 md:p-12 bg-white dark:bg-glass-bg border border-glass-border rounded-[3rem] shadow-xl relative overflow-hidden">
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none"></div>
                                <h3 className="text-2xl font-black text-text-main mb-8 text-center">Project-Based Learning Journey</h3>
                                
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-glass-border before:to-transparent">
                                    {[
                                        { title: 'Learn', desc: 'Pahami konsep & teori.' },
                                        { title: 'Practice', desc: 'Coba melalui assignment.' },
                                        { title: 'Build', desc: 'Bangun project akhir.' },
                                        { title: 'Showcase', desc: 'Tampilkan sebagai portfolio.' }
                                    ].map((step, i) => (
                                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-bg-canvas bg-brand-blue text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                <span className="font-bold text-sm">{i + 1}</span>
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-glass-border">
                                                <h4 className="font-bold text-text-main text-lg mb-1">{step.title}</h4>
                                                <p className="text-sm text-text-gray font-medium">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 11 & 12. TESTIMONIALS & LEARNING PATH */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/50 dark:bg-black/20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-2/3">
                        <ScrollReveal animation="fade-up" className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Student Testimonials' : 'Apa Kata Mereka?'}
                            </h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[1, 2].map((_, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i*100}>
                                    <div className="p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl shadow-sm">
                                        <div className="flex gap-1 mb-4 text-orange-400">
                                            {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <p className="text-text-main font-medium italic mb-6 text-sm leading-relaxed">
                                            "Materinya sangat terstruktur dan mudah diikuti. Berkat kelas ini saya berhasil membangun website pertama saya dan memahaminya dari dasar!"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">A</div>
                                            <div>
                                                <h4 className="font-bold text-text-main text-sm">Alumni {i+1}</h4>
                                                <p className="text-xs text-text-gray">Web Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-1/3">
                        <ScrollReveal animation="slide-left" className="h-full">
                            <div className="p-8 bg-brand-blue rounded-[2.5rem] text-white h-full flex flex-col justify-center relative overflow-hidden shadow-xl">
                                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/20 blur-3xl rounded-full"></div>
                                <h3 className="text-2xl font-black mb-4 relative z-10">Bingung Mulai dari Mana?</h3>
                                <p className="font-medium text-white/90 mb-8 relative z-10 text-sm">
                                    Jangan asal ambil kelas. Ikuti Learning Path terstruktur kami untuk membangun kompetensi secara bertahap dari fundamental.
                                </p>
                                <Link href="/academy" className="mt-auto px-6 py-3 bg-white text-brand-blue font-bold rounded-xl text-center hover:bg-gray-50 transition-colors relative z-10">
                                    Lihat Learning Path
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 13. FREE CLASSES */}
            <section id="free" className="py-24 px-6 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                            {locale === 'en' ? 'Start Learning for Free' : 'Mulai Belajar Gratis'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' ? 'Try our free mini-courses to build your fundamentals.' : 'Coba kelas mini gratis kami untuk membangun fundamentalmu.'}
                        </p>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {['Introduction to AI', 'HTML & CSS Fundamental', 'Excel Fundamental'].map((title, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i*100}>
                                <div className="p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl hover:border-brand-blue/30 transition-all text-left group cursor-pointer shadow-sm hover:shadow-md">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-text-main mb-1 group-hover:text-brand-blue transition-colors">{title}</h4>
                                    <p className="text-xs text-text-gray font-medium mb-4">Free Access</p>
                                    <div className="flex items-center gap-1 text-sm font-bold text-brand-blue">
                                        Mulai Belajar <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 14. FAQ & 15. FINAL CTA */}
            <section className="py-24 px-6 relative z-10 bg-bg-canvas border-t border-glass-border">
                <div className="max-w-4xl mx-auto mb-32">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                            {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Ditanyakan'}
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {[
                            'Apakah kelas bisa diakses kapan saja?',
                            'Apakah mendapatkan sertifikat?',
                            'Apakah ada tugas dan project?',
                            'Apakah kelas bisa diakses melalui HP?',
                            'Apa perbedaan Kelas Online dengan Bootcamp?'
                        ].map((q, idx) => (
                            <ScrollReveal key={idx} animation="fade-up" delay={idx * 50}>
                                <details className="group bg-white dark:bg-glass-bg border border-glass-border rounded-2xl [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300">
                                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors hover:text-brand-blue">
                                        <span className="text-lg">{q}</span>
                                        <span className="shrink-0 rounded-full bg-gray-50 dark:bg-white/5 p-2 transition duration-300 group-open:-rotate-180">
                                            <ChevronRight className="w-5 h-5" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-text-gray font-medium leading-relaxed">
                                        Untuk kelas online, Anda dapat belajar secara mandiri (self-paced) kapanpun Anda mau dengan akses seumur hidup setelah pembelian. Berbeda dengan Bootcamp yang sifatnya intensif dengan jadwal mentoring khusus.
                                    </div>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="bg-gradient-to-br from-brand-blue to-cyan-500 rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-20 mix-blend-overlay"></div>
                            
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                                    {locale === 'en' ? 'New Skills Can Start Today.' : 'Skill Baru Bisa Dimulai Hari Ini.'}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">
                                    {locale === 'en' 
                                        ? 'Choose the class that fits your goals and start learning at your own pace.' 
                                        : 'Pilih kelas yang sesuai dengan tujuanmu dan mulai belajar dengan ritmemu sendiri.'}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="#browse" className="px-10 py-5 bg-white text-brand-blue font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                        {locale === 'en' ? 'Explore All Classes' : 'Jelajahi Semua Kelas'}
                                    </Link>
                                    <Link href="#free" className="px-10 py-5 bg-black/20 text-white border border-white/30 font-bold rounded-2xl hover:bg-black/30 transition-colors backdrop-blur-sm">
                                        {locale === 'en' ? 'Start Free Classes' : 'Mulai dari Kelas Gratis'}
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
