'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    Brain, Code, Palette, Megaphone, CheckCircle2, 
    ArrowRight, Clock, Award, Target, Compass, Sparkles, 
    Briefcase, MessageSquare, BookOpen, ChevronRight, UserCheck
} from 'lucide-react';
import { LEARNING_PATHS } from '../../../lib/data/academy';

interface PathDetail {
    id: string;
    domainId: string;
    title: string;
    role: string;
    duration: string;
    level: string;
    targetOutcomeEn: string;
    targetOutcomeId: string;
    milestones: {
        phase: string;
        title: string;
        skills: string[];
    }[];
    relatedCourses: {
        title: string;
        type: string;
        link: string;
    }[];
}

const DETAILED_PATHS: PathDetail[] = [
    {
        id: 'front-end-engineer',
        domainId: 'technology',
        title: 'Front-End Engineer Track',
        role: 'Modern Web Front-End Developer',
        duration: '12 - 16 Minggu',
        level: 'Pemula hingga Mahir',
        targetOutcomeEn: 'Capable of designing and building responsive, high-performance web applications with Next.js, TypeScript, and modern headless CMS.',
        targetOutcomeId: 'Mampu merancang dan mengembangkan aplikasi web interaktif, responsif, dan berkinerja tinggi menggunakan Next.js, TypeScript, Tailwind CSS, dan Headless CMS.',
        milestones: [
            {
                phase: 'Tahap 1',
                title: 'Modern Web Fundamentals',
                skills: ['HTML5 Semantic & SEO', 'Modern CSS & Tailwind', 'JavaScript ES6+ & Async/Await', 'Git & GitHub Collaboration']
            },
            {
                phase: 'Tahap 2',
                title: 'React & Component Architecture',
                skills: ['React Hooks & State Management', 'Component-Driven Design', 'TypeScript Integration', 'API Data Fetching & SWR/TanStack']
            },
            {
                phase: 'Tahap 3',
                title: 'Next.js App Router & Production Deployment',
                skills: ['Next.js 16 Server Components', 'Headless CMS Architecture', 'Core Web Vitals Optimization', 'Vercel / Cloud CI/CD Deployment']
            }
        ],
        relatedCourses: [
            { title: 'Fullstack Web Developer Bootcamp', type: 'Bootcamp', link: '/academy/bootcamp' },
            { title: 'Modern Next.js & TypeScript Mastery', type: 'Online Course', link: '/academy/online-course' }
        ]
    },
    {
        id: 'back-end-architect',
        domainId: 'technology',
        title: 'Back-End & Cloud Engineer Track',
        role: 'Back-End Software Engineer',
        duration: '14 - 18 Minggu',
        level: 'Menengah hingga Lanjutan',
        targetOutcomeEn: 'Expertise in building scalable RESTful APIs, distributed microservices, secure authentication, and relational database systems.',
        targetOutcomeId: 'Menguasai perancangan RESTful API scalable, microservices, autentikasi multi-tenant, optimasi database relasional, dan server deployment.',
        milestones: [
            {
                phase: 'Tahap 1',
                title: 'Backend Core & Database Architecture',
                skills: ['PHP 8.3 & Laravel 11 / Node.js', 'PostgreSQL Schema & Indexing', 'ORM & Transaction Management', 'REST API Best Practices']
            },
            {
                phase: 'Tahap 2',
                title: 'Security, Auth & Integrations',
                skills: ['OAuth2 & Sanctum / JWT', 'Payment Gateway Integration', 'Message Queue & Redis Caching', 'Background Job Workers']
            },
            {
                phase: 'Tahap 3',
                title: 'Docker, Microservices & Cloud Ops',
                skills: ['Containerization with Docker', 'System Architecture & Scalability', 'Automated Unit/Integration Testing', 'Linux Server Maintenance']
            }
        ],
        relatedCourses: [
            { title: 'Fullstack Web Developer Bootcamp', type: 'Bootcamp', link: '/academy/bootcamp' },
            { title: 'Laravel 11 & API Engineering Masterclass', type: 'Online Course', link: '/academy/online-course' }
        ]
    },
    {
        id: 'ai-genai-engineer',
        domainId: 'ai-data',
        title: 'Generative AI & LLM Engineer Track',
        role: 'AI Solutions & RAG Engineer',
        duration: '12 - 16 Minggu',
        level: 'Menengah',
        targetOutcomeEn: 'Build production-ready AI applications, conversational agents, custom RAG pipelines, and automated LLM workflows.',
        targetOutcomeId: 'Mampu membangun aplikasi berbasis AI riil, chatbot conversational cerdas, custom RAG pipelines menggunakan vector database, dan otomatisasi workflow LLM.',
        milestones: [
            {
                phase: 'Tahap 1',
                title: 'Python & AI Foundations',
                skills: ['Advanced Python Programming', 'Data Manipulation with Pandas/NumPy', 'OpenAI & Claude API SDKs', 'Prompt Engineering Techniques']
            },
            {
                phase: 'Tahap 2',
                title: 'Vector DBs & RAG Architecture',
                skills: ['Embeddings & Semantic Search', 'Pinecone & Chroma Vector Stores', 'LangChain & LlamaIndex Frameworks', 'Context Retrieval Optimization']
            },
            {
                phase: 'Tahap 3',
                title: 'Autonomous Agents & Production Deploy',
                skills: ['Multi-Agent Systems & Tool Calling', 'Local Model Inference (Ollama)', 'FastAPI Microservice Deployment', 'Monitoring & Evaluation (LangSmith)']
            }
        ],
        relatedCourses: [
            { title: 'Generative AI & LLM Engineering Bootcamp', type: 'Bootcamp', link: '/academy/bootcamp' },
            { title: 'Hands-on Prompt Engineering Workshop', type: 'Workshop', link: '/academy/workshop' }
        ]
    },
    {
        id: 'data-analyst-bi',
        domainId: 'ai-data',
        title: 'Data Analyst & Business Intelligence Track',
        role: 'Business Intelligence & Data Analyst',
        duration: '10 - 14 Minggu',
        level: 'Pemula hingga Menengah',
        targetOutcomeEn: 'Transform raw corporate data into interactive dashboards, statistical insights, and actionable business intelligence.',
        targetOutcomeId: 'Mengubah data mentah organisasi menjadi dashboard eksekutif interaktif, analisis tren statistik, dan rekomendasi bisnis bernilai tinggi.',
        milestones: [
            {
                phase: 'Tahap 1',
                title: 'Data Cleansing & SQL Mastery',
                skills: ['Advanced SQL Queries & Window Functions', 'Data Wrangling in Excel & Google Sheets', 'Relational Data Modeling', 'Data Quality Assurance']
            },
            {
                phase: 'Tahap 2',
                title: 'Python for Exploratory Data Analysis',
                skills: ['Python Data Processing (Pandas)', 'Data Visualization (Matplotlib/Seaborn)', 'Statistical Hypothesis Testing', 'Cohort & Retention Analysis']
            },
            {
                phase: 'Tahap 3',
                title: 'Executive Dashboards & BI Strategy',
                skills: ['Power BI & Tableau Dashboard Design', 'DAX Formulas & KPI Metrics', 'Automated Data Pipeline Sync', 'Executive Storytelling & Presentation']
            }
        ],
        relatedCourses: [
            { title: 'Data Analytics with Python & BI', type: 'Online Course', link: '/academy/online-course' },
            { title: 'Executive BI Dashboard Workshop', type: 'Workshop', link: '/academy/workshop' }
        ]
    },
    {
        id: 'ui-ux-product-designer',
        domainId: 'design',
        title: 'UI/UX & Product Design Track',
        role: 'Product Designer & UX Strategist',
        duration: '10 - 14 Minggu',
        level: 'Pemula hingga Mahir',
        targetOutcomeEn: 'Design delightful, accessible user journeys, end-to-end design systems in Figma, and validated interactive prototypes.',
        targetOutcomeId: 'Merancang perjalanan pengguna intuitif, riset kegunaan berbasis data, design system komprehensif di Figma, dan prototype interaktif tervalidasi.',
        milestones: [
            {
                phase: 'Tahap 1',
                title: 'User Research & Information Architecture',
                skills: ['User Interviews & Personas', 'Journey Mapping & Wireframing', 'Information Architecture', 'Usability Heuristics & WCAG']
            },
            {
                phase: 'Tahap 2',
                title: 'UI Design & Advanced Figma',
                skills: ['Figma Auto Layout & Components', 'Design System Architecture', 'Typography, Grid & Color Theory', 'Micro-interactions & Prototyping']
            },
            {
                phase: 'Tahap 3',
                title: 'Usability Testing & Developer Handoff',
                skills: ['Unmoderated & Moderated Usability Tests', 'Design Tokens & Dev Handoff Specs', 'Conversion-Centered Design', 'Case Study Portfolio Building']
            }
        ],
        relatedCourses: [
            { title: 'UI/UX Masterclass & Design Systems', type: 'Bootcamp', link: '/academy/bootcamp' },
            { title: 'Figma to Code Workflow Workshop', type: 'Workshop', link: '/academy/workshop' }
        ]
    }
];

export default function LearningPathsPage() {
    const { language: locale } = useLanguage();
    const [activeDomain, setActiveDomain] = useState<string>('all');

    const domains = [
        { id: 'all', titleEn: 'All Career Paths', titleId: 'Semua Jalur Karier', icon: Compass },
        { id: 'technology', titleEn: 'Software Engineering', titleId: 'Software Engineering', icon: Code },
        { id: 'ai-data', titleEn: 'AI & Data Science', titleId: 'AI & Data Science', icon: Brain },
        { id: 'design', titleEn: 'UI/UX Design', titleId: 'Desain UI/UX', icon: Palette },
    ];

    const filteredPaths = activeDomain === 'all'
        ? DETAILED_PATHS
        : DETAILED_PATHS.filter(p => p.domainId === activeDomain);

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
                        {locale === 'en' ? 'Structured Roadmaps to ' : 'Jalur Belajar Terstruktur Menuju '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Industry Competency.' : 'Kompetensi Siap Kerja.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en'
                            ? 'Dont waste time guessing what to learn next. Follow our step-by-step learning paths crafted by senior practitioners to reach job-ready competency.'
                            : 'Jangan bingung memulai dari mana. Ikuti kurikulum langkah-demi-langkah yang dirancang oleh praktisi senior untuk mencapai kompetensi riil berstandar industri.'}
                    </p>

                    {/* Domain Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {domains.map((dom) => {
                            const Icon = dom.icon;
                            const active = activeDomain === dom.id;
                            return (
                                <button
                                    key={dom.id}
                                    onClick={() => setActiveDomain(dom.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                                        active
                                            ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/25 scale-105'
                                            : 'bg-white dark:bg-glass-bg text-text-gray hover:text-text-main border border-glass-border hover:border-brand-blue/30'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-brand-blue'}`} />
                                    {locale === 'en' ? dom.titleEn : dom.titleId}
                                </button>
                            );
                        })}
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. PATHS ACCORDION / CARDS */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 mb-24">
                {filteredPaths.map((path, idx) => (
                    <ScrollReveal key={path.id} animation="fade-up" delay={idx * 50}>
                        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border shadow-sm hover:border-brand-blue/40 transition-all">
                            {/* Header Info */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-glass-border">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-black uppercase tracking-wider">
                                            {path.role}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-text-gray">
                                            <Clock className="w-3.5 h-3.5 text-brand-blue" />
                                            {path.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-text-gray">
                                            <Target className="w-3.5 h-3.5 text-indigo-500" />
                                            {path.level}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-text-main">
                                        {path.title}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <Link
                                        href="/contact"
                                        className="px-5 py-3 rounded-xl bg-glass-bg border border-glass-border text-xs font-bold text-text-main hover:border-brand-blue/50 transition-colors"
                                    >
                                        {locale === 'en' ? 'Consult Path' : 'Konsultasi Jalur Ini'}
                                    </Link>
                                    <Link
                                        href="/academy/online-course"
                                        className="px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-all shadow-md shadow-brand-blue/20"
                                    >
                                        {locale === 'en' ? 'Browse Classes' : 'Eksplorasi Kelas'}
                                    </Link>
                                </div>
                            </div>

                            {/* Target Competency */}
                            <div className="py-6">
                                <h3 className="text-xs font-black uppercase text-brand-blue tracking-wider mb-2">
                                    {locale === 'en' ? 'Target Competency & Industry Outcome' : 'Target Kompetensi & Hasil Belajar'}
                                </h3>
                                <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium">
                                    {locale === 'en' ? path.targetOutcomeEn : path.targetOutcomeId}
                                </p>
                            </div>

                            {/* Milestones Road */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-6">
                                {path.milestones.map((m, mIdx) => (
                                    <div 
                                        key={mIdx}
                                        className="p-5 rounded-2xl bg-glass-bg/60 border border-glass-border relative overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-brand-blue/10">
                                                {m.phase}
                                            </span>
                                            <span className="text-xs font-bold text-text-gray">Step 0{mIdx + 1}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-text-main mb-3">
                                            {m.title}
                                        </h4>
                                        <div className="space-y-1.5">
                                            {m.skills.map((skill, sIdx) => (
                                                <div key={sIdx} className="flex items-start gap-2 text-xs font-medium text-text-gray">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recommended Courses Banner */}
                            <div className="pt-6 border-t border-glass-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-blue/5 -mx-8 -mb-8 p-6 md:px-10 rounded-b-3xl">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-text-main">
                                        {locale === 'en' ? 'Recommended Program:' : 'Program Terkait:'}
                                    </span>
                                    {path.relatedCourses.map((rc, rIdx) => (
                                        <Link 
                                            key={rIdx}
                                            href={rc.link}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-black/30 border border-glass-border text-xs font-bold text-brand-blue hover:underline"
                                        >
                                            <span className="text-[10px] text-text-gray font-normal">[{rc.type}]</span>
                                            {rc.title}
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/academy/mentors"
                                    className="text-xs font-bold text-text-gray hover:text-brand-blue flex items-center gap-1 shrink-0"
                                >
                                    <UserCheck className="w-3.5 h-3.5 text-brand-blue" />
                                    {locale === 'en' ? 'Meet track mentors' : 'Lihat mentor jalur ini'}
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </section>

            {/* 03. FOOTER CTA */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal animation="fade-up">
                    <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-blue to-indigo-700 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl relative z-10">
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">
                                {locale === 'en' ? 'Need Guidance Choosing the Right Path?' : 'Bingung Memilih Jalur Karier yang Paling Pas?'}
                            </h2>
                            <p className="text-white/85 text-sm md:text-base leading-relaxed">
                                {locale === 'en'
                                    ? 'Talk with our curriculum advisors to evaluate your current background and map out the ideal learning track.'
                                    : 'Konsultasikan latar belakang dan target karier Anda dengan tim kurikulum Diggity secara gratis.'}
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-2xl bg-white text-brand-blue font-black hover:bg-white/90 hover:scale-[1.02] transition-all shadow-xl shrink-0"
                        >
                            {locale === 'en' ? 'Schedule Free Consultation' : 'Konsultasi Gratis Sekarang'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
