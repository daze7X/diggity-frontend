'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    Users, Search, Filter, Star, Briefcase, Award, 
    ArrowRight, CheckCircle2, UserCheck, MessageSquare, 
    Sparkles, Globe, ExternalLink, X, ChevronRight, GraduationCap
} from 'lucide-react';

interface Mentor {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    experience: string;
    rating: number;
    studentsCount: number;
    category: 'tech' | 'ai-data' | 'design' | 'business';
    bioEn: string;
    bioId: string;
    skills: string[];
    programs: {
        title: string;
        type: 'Bootcamp' | 'Online Course' | 'Workshop' | 'Seminar';
        slug: string;
    }[];
}

const MENTORS_DATA: Mentor[] = [
    {
        id: 'budi-santoso',
        name: 'Budi Santoso',
        role: 'Principal Software Architect',
        company: 'Ex-Tech Unicorn & Cloud Consultant',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        experience: '9+ Tahun Pengalaman',
        rating: 4.95,
        studentsCount: 1420,
        category: 'tech',
        bioEn: 'Senior architect specializing in distributed cloud infrastructure, microservices, and high-performance Laravel & Node.js backends.',
        bioId: 'Senior software architect dengan spesialisasi arsitektur cloud terdistribusi, microservices, serta backend berkinerja tinggi berbasis Laravel & Node.js.',
        skills: ['Laravel', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis', 'System Design'],
        programs: [
            { title: 'Fullstack Web Developer Bootcamp', type: 'Bootcamp', slug: 'fullstack-web-developer' },
            { title: 'Microservices & Enterprise Architecture', type: 'Workshop', slug: 'microservices-enterprise' }
        ]
    },
    {
        id: 'sarah-wijaya',
        name: 'Sarah Wijaya',
        role: 'Lead UI/UX & Design Strategist',
        company: 'Global Digital Agency',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        experience: '7+ Tahun Pengalaman',
        rating: 4.92,
        studentsCount: 980,
        category: 'design',
        bioEn: 'Design leader passionate about user empathy, design systems, and converting business requirements into world-class interfaces.',
        bioId: 'Design leader berpengalaman dalam membangun design system skala besar, usability research, dan desain antarmuka berbasis empati pengguna.',
        skills: ['Figma', 'Design Systems', 'Usability Testing', 'Prototyping', 'Design Tokens'],
        programs: [
            { title: 'UI/UX Masterclass & Design Systems', type: 'Bootcamp', slug: 'ui-ux-masterclass' },
            { title: 'Figma to Code Workflow', type: 'Workshop', slug: 'figma-to-code' }
        ]
    },
    {
        id: 'ahmad-rizki',
        name: 'Ahmad Rizki, Ph.D.',
        role: 'Lead AI Engineer & Data Scientist',
        company: 'AI Research Institute & Fintech',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        experience: '8+ Tahun Pengalaman',
        rating: 4.98,
        studentsCount: 1850,
        category: 'ai-data',
        bioEn: 'AI specialist leading GenAI research, LLM application engineering, RAG pipelines, and predictive machine learning models.',
        bioId: 'Praktisi AI dan Data Science dengan fokus pada Generative AI, Retrieval-Augmented Generation (RAG), fine-tuning LLM, dan predictive analytics.',
        skills: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'Hugging Face', 'Data Modeling'],
        programs: [
            { title: 'Generative AI & LLM Engineering', type: 'Bootcamp', slug: 'generative-ai-engineering' },
            { title: 'Data Analytics with Python & BI', type: 'Online Course', slug: 'data-analytics-python' }
        ]
    },
    {
        id: 'jessica-lin',
        name: 'Jessica Lin',
        role: 'Head of Growth & Performance Marketing',
        company: 'E-Commerce Growth Lab',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
        experience: '6+ Tahun Pengalaman',
        rating: 4.9,
        studentsCount: 1120,
        category: 'business',
        bioEn: 'Growth marketer managing million-dollar ad spends, conversion rate optimization, and multi-channel acquisition funnels.',
        bioId: 'Growth marketer berpengalaman mengelola kampanye skala jutaan dolar, optimasi conversion rate, serta strategi akuisisi omnichannel.',
        skills: ['Meta Ads', 'Google Ads', 'GA4 Analytics', 'Conversion Rate Optimization', 'SEO Strategy'],
        programs: [
            { title: 'Performance Marketing & Growth Hacking', type: 'Workshop', slug: 'performance-marketing' },
            { title: 'Digital Marketing Fundamentals', type: 'Online Course', slug: 'digital-marketing-fundamentals' }
        ]
    },
    {
        id: 'dimas-prasetyo',
        name: 'Dimas Prasetyo',
        role: 'Staff Frontend Engineer',
        company: 'SaaS Platform Scale-Up',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        experience: '7+ Tahun Pengalaman',
        rating: 4.94,
        studentsCount: 1310,
        category: 'tech',
        bioEn: 'Frontend architect crafting lightning-fast web applications with Next.js App Router, Tailwind CSS, and TypeScript.',
        bioId: 'Frontend engineer dengan spesialisasi Next.js App Router, arsitektur headless, performa web tinggi (Core Web Vitals), dan TypeScript modern.',
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Turbopack', 'Web Performance'],
        programs: [
            { title: 'Modern Next.js & TypeScript Mastery', type: 'Online Course', slug: 'nextjs-typescript-mastery' },
            { title: 'Building Scalable Component Libraries', type: 'Workshop', slug: 'scalable-components' }
        ]
    },
    {
        id: 'ratna-kusuma',
        name: 'Ratna Kusuma',
        role: 'Mobile Engineering Lead',
        company: 'Digital Banking Group',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
        experience: '8+ Tahun Pengalaman',
        rating: 4.91,
        studentsCount: 890,
        category: 'tech',
        bioEn: 'Cross-platform mobile lead building resilient fintech applications with Flutter and native mobile APIs.',
        bioId: 'Mobile engineering lead berpengalaman membangun aplikasi fintech multiplatform aman dan scalable menggunakan Flutter.',
        skills: ['Flutter', 'Dart', 'State Management (BLoC)', 'Firebase', 'CI/CD Mobile'],
        programs: [
            { title: 'Flutter Mobile App Development', type: 'Bootcamp', slug: 'flutter-mobile-bootcamp' }
        ]
    }
];

export default function MentorsPage() {
    const { language: locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeMentorModal, setActiveMentorModal] = useState<Mentor | null>(null);

    const categories = [
        { id: 'all', labelEn: 'All Disciplines', labelId: 'Semua Bidang' },
        { id: 'tech', labelEn: 'Software Engineering', labelId: 'Rekayasa Perangkat Lunak' },
        { id: 'ai-data', labelEn: 'AI & Data Science', labelId: 'AI & Data Science' },
        { id: 'design', labelEn: 'UI/UX & Design', labelId: 'UI/UX & Desain' },
        { id: 'business', labelEn: 'Growth & Marketing', labelId: 'Bisnis & Growth' },
    ];

    const filteredMentors = MENTORS_DATA.filter(mentor => {
        const matchesCategory = selectedCategory === 'all' || mentor.category === selectedCategory;
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-bg-canvas pt-28 pb-20 relative selection:bg-brand-blue/20">
            {/* Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* 01. HERO */}
            <section className="relative pt-8 pb-16 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Learn Directly from ' : 'Belajar Langsung dari '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Industry Leaders.' : 'Praktisi Industri Terpilih.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en'
                            ? 'Every mentor at Diggity Academy is an active practitioner with real-world engineering and product leadership experience.'
                            : 'Setiap mentor di Diggity Academy adalah praktisi aktif yang berpengalaman memimpin proyek teknologi nyata di industri skala nasional hingga global.'}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative mb-8">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-gray">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder={locale === 'en' ? "Search mentor by name, company, or skill..." : "Cari mentor berdasarkan nama, perusahaan, atau keahlian..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-text-main font-medium shadow-sm transition-all"
                        />
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {categories.map((cat) => {
                            const active = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        active
                                            ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105'
                                            : 'bg-white dark:bg-glass-bg text-text-gray hover:text-text-main border border-glass-border'
                                    }`}
                                >
                                    {locale === 'en' ? cat.labelEn : cat.labelId}
                                </button>
                            );
                        })}
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. MENTORS GRID */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                {filteredMentors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMentors.map((mentor, idx) => (
                            <ScrollReveal key={mentor.id} animation="fade-up" delay={idx * 60}>
                                <div 
                                    onClick={() => setActiveMentorModal(mentor)}
                                    className="p-7 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col h-full"
                                >
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 border-2 border-brand-blue/20 shadow-md">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={mentor.avatar}
                                                alt={mentor.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-black text-text-main group-hover:text-brand-blue transition-colors truncate">
                                                {mentor.name}
                                            </h3>
                                            <p className="text-xs font-bold text-brand-blue leading-tight mb-1">
                                                {mentor.role}
                                            </p>
                                            <p className="text-xs text-text-gray truncate">
                                                {mentor.company}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-text-gray font-medium line-clamp-3 mb-5 leading-relaxed">
                                        {locale === 'en' ? mentor.bioEn : mentor.bioId}
                                    </p>

                                    {/* Skills Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {mentor.skills.slice(0, 4).map((skill, i) => (
                                            <span 
                                                key={i}
                                                className="px-2.5 py-1 rounded-lg bg-brand-blue/5 border border-brand-blue/10 text-[10px] font-bold text-brand-blue"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {mentor.skills.length > 4 && (
                                            <span className="px-2 py-1 rounded-lg bg-glass-bg text-[10px] font-bold text-text-gray">
                                                +{mentor.skills.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer Stats & CTA */}
                                    <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-text-main">
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            <span>{mentor.rating}</span>
                                            <span className="text-[10px] text-text-gray font-medium">({mentor.studentsCount} alumni)</span>
                                        </div>
                                        <span className="text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            {locale === 'en' ? 'Profile & Classes' : 'Profil & Kelas'}
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center rounded-3xl bg-white dark:bg-glass-bg border border-glass-border max-w-md mx-auto">
                        <Users className="w-12 h-12 text-text-gray/40 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-text-main mb-2">
                            {locale === 'en' ? 'No mentors found' : 'Tidak ada mentor yang cocok'}
                        </h3>
                        <p className="text-sm text-text-gray mb-6">
                            {locale === 'en' ? 'Try adjusting your search query or discipline filter.' : 'Coba gunakan kata kunci pencarian lain atau pilih kategori Semua Bidang.'}
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-all"
                        >
                            {locale === 'en' ? 'Reset Filter' : 'Reset Filter'}
                        </button>
                    </div>
                )}
            </section>

            {/* 03. CTA BECOME A MENTOR */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal animation="fade-up">
                    <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-blue via-indigo-600 to-brand-blue-dark text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-black uppercase tracking-wider mb-4 border border-white/20">
                                <UserCheck className="w-3.5 h-3.5" />
                                DIGGITY MENTORSHIP ECOSYSTEM
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                                {locale === 'en' ? 'Want to Shape the Next Generation of Tech Talents?' : 'Ingin Membimbing Generasi Baru Talenta Digital?'}
                            </h2>
                            <p className="text-white/85 text-base md:text-lg leading-relaxed">
                                {locale === 'en'
                                    ? 'Join our network of expert instructors, guest speakers, and portfolio reviewers. Enjoy flexible teaching schedules and attractive honorariums.'
                                    : 'Bergabunglah sebagai mentor bootcamp, pembicara seminar, atau reviewer portofolio Diggity. Dapatkan honorarium kompetitif dan jadwal mengajar yang fleksibel.'}
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Link
                                href="/job-connect?tab=mentor"
                                className="px-8 py-4 rounded-2xl bg-white text-brand-blue font-black hover:bg-white/90 hover:scale-[1.02] transition-all shadow-xl text-center"
                            >
                                {locale === 'en' ? 'Apply to Become a Mentor' : 'Gabung Jadi Mentor'}
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold transition-all text-center backdrop-blur-sm"
                            >
                                {locale === 'en' ? 'Consult with Us' : 'Konsultasi Program'}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* MENTOR DETAIL MODAL */}
            {activeMentorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="bg-white dark:bg-[#121623] border border-glass-border rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setActiveMentorModal(null)}
                            className="absolute top-6 right-6 p-2 rounded-xl bg-glass-bg border border-glass-border text-text-gray hover:text-text-main transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 border-2 border-brand-blue/30 shadow-lg">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={activeMentorModal.avatar}
                                    alt={activeMentorModal.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-2xl font-black text-text-main mb-1">
                                    {activeMentorModal.name}
                                </h3>
                                <p className="text-sm font-bold text-brand-blue mb-1">
                                    {activeMentorModal.role}
                                </p>
                                <p className="text-xs text-text-gray mb-3">
                                    {activeMentorModal.company} &bull; {activeMentorModal.experience}
                                </p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">
                                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                                    <span>{activeMentorModal.rating} Rating Kepuasan Alumni</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-black uppercase text-brand-blue tracking-wider mb-2">
                                    {locale === 'en' ? 'About Mentor' : 'Biografi Singkat'}
                                </h4>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    {locale === 'en' ? activeMentorModal.bioEn : activeMentorModal.bioId}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase text-brand-blue tracking-wider mb-2">
                                    {locale === 'en' ? 'Core Expertise' : 'Keahlian Utama'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeMentorModal.skills.map((skill, i) => (
                                        <span 
                                            key={i}
                                            className="px-3 py-1 rounded-xl bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-xs font-bold"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase text-brand-blue tracking-wider mb-2">
                                    {locale === 'en' ? 'Programs & Classes Mentored' : 'Program & Kelas yang Diampu'}
                                </h4>
                                <div className="space-y-2">
                                    {activeMentorModal.programs.map((prog, i) => (
                                        <div 
                                            key={i}
                                            className="p-3.5 rounded-2xl bg-glass-bg border border-glass-border flex items-center justify-between gap-4"
                                        >
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-brand-blue block mb-0.5">
                                                    {prog.type}
                                                </span>
                                                <h5 className="text-sm font-bold text-text-main">
                                                    {prog.title}
                                                </h5>
                                            </div>
                                            <Link
                                                href={`/academy/${prog.type === 'Bootcamp' ? 'bootcamp' : prog.type === 'Workshop' ? 'workshop' : 'online-course'}`}
                                                className="px-3.5 py-1.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors shrink-0"
                                            >
                                                {locale === 'en' ? 'Explore' : 'Lihat Program'}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-glass-border flex items-center justify-end gap-3">
                            <button
                                onClick={() => setActiveMentorModal(null)}
                                className="px-5 py-2.5 rounded-xl bg-glass-bg border border-glass-border text-xs font-bold text-text-gray hover:text-text-main transition-colors"
                            >
                                {locale === 'en' ? 'Close' : 'Tutup'}
                            </button>
                            <Link
                                href="/contact"
                                className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors inline-flex items-center gap-1.5"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                {locale === 'en' ? 'Request Mentoring' : 'Konsultasi Bersama'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
