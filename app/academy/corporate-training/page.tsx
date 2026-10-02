'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    ArrowRight, Settings, TrendingUp, Users, Award, 
    Target, Monitor, Zap, Briefcase, CheckCircle2, 
    Layers, BookOpen, Presentation, Code, Search, 
    FileText, Lightbulb, PlayCircle, BarChart, ChevronDown,
    Building2, GraduationCap, LineChart, Globe, Shield, MessageSquare
} from 'lucide-react';
import { api } from '../../../lib/api';

const FAQS = [
    {
        q: { en: "Can training programs be customized?", id: "Apakah program training dapat dikustomisasi?" },
        a: { en: "Yes. Curriculum, materials, case studies, duration, format, and output can be tailored to organizational needs.", id: "Ya. Kurikulum, materi, studi kasus, durasi, metode, dan output dapat disesuaikan dengan kebutuhan organisasi." }
    },
    {
        q: { en: "Do you provide online and offline training?", id: "Apakah Diggity menyediakan training online dan offline?" },
        a: { en: "Yes, programs can be conducted online, offline (on-site), or hybrid based on your requirements.", id: "Ya, program dapat dilaksanakan secara online, offline, maupun hybrid sesuai kebutuhan." }
    },
    {
        q: { en: "What is the minimum number of participants?", id: "Berapa jumlah minimum peserta?" },
        a: { en: "Please contact our team to discuss participant requirements for specific formats.", id: "Tentukan berdasarkan kebijakan Diggity. Silakan konsultasikan untuk detail kuota spesifik." }
    },
    {
        q: { en: "Do participants receive certificates?", id: "Apakah peserta mendapatkan sertifikat?" },
        a: { en: "Participants receive Certificates of Training upon completion. BNSP certification is also available for specific programs.", id: "Peserta dapat memperoleh sertifikat pelatihan. Sertifikasi BNSP juga tersedia untuk beberapa skema program." }
    },
    {
        q: { en: "Can we request specialized tools/case studies?", id: "Apakah perusahaan dapat meminta materi/tools khusus?" },
        a: { en: "Absolutely. We build custom curriculum using your company's actual case studies (under NDA) and preferred tech stack.", id: "Bisa, sepanjang data dan informasi telah disepakati dan memenuhi ketentuan kerahasiaan." }
    }
];

const INDUSTRIES = [
    { icon: Building2, en: "Government", id: "Pemerintahan" },
    { icon: GraduationCap, en: "Education", id: "Edukasi" },
    { icon: LineChart, en: "Financial Services", id: "Layanan Keuangan" },
    { icon: Shield, en: "Healthcare", id: "Kesehatan" },
    { icon: Globe, en: "Retail & Commerce", id: "Ritel & E-Commerce" },
    { icon: Settings, en: "Manufacturing", id: "Manufaktur" },
    { icon: Monitor, en: "Technology", id: "Teknologi" },
    { icon: Briefcase, en: "Professional Services", id: "Layanan Profesional" }
];

export default function CorporateTrainingPage() {
    const { language: locale } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-3/4 h-[800px] bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/3 z-0"></div>
                <div className="absolute bottom-0 left-0 w-3/4 h-[600px] bg-indigo-500/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/3 z-0"></div>
            </div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                            {locale === 'en' ? 'DIGGITY CORPORATE TRAINING' : 'DIGGITY CORPORATE TRAINING'}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                            {locale === 'en' ? 'Upskill Your Team. ' : 'Tingkatkan Kompetensi Tim. '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                                {locale === 'en' ? 'Accelerate Transformation.' : 'Percepat Transformasi Bisnis.'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed mb-10 max-w-xl">
                            {locale === 'en' 
                                ? 'Diggity Corporate Training empowers your organization by improving employee competencies through practice-based, industry-relevant curriculum tailored to your business goals.' 
                                : 'Program Corporate Training Diggity dirancang untuk membantu perusahaan meningkatkan kompetensi karyawan melalui pelatihan berbasis praktik, kurikulum relevan industri, dan disesuaikan dengan tujuan bisnis.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#contact" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all text-center">
                                {locale === 'en' ? 'Consult Training Needs' : 'Konsultasikan Kebutuhan Training'}
                            </Link>
                            <Link href="#programs" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all text-center">
                                {locale === 'en' ? 'View Programs' : 'Lihat Program Training'}
                            </Link>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal animation="slide-left" delay={200}>
                        <div className="relative rounded-3xl overflow-hidden border border-glass-border shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent z-10 mix-blend-overlay"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" alt="Corporate Training" className="w-full h-auto object-cover aspect-video" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 02. TRUST & BUSINESS METRICS */}
            <section className="py-12 border-y border-glass-border bg-white/50 dark:bg-black/20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <p className="text-sm font-bold text-text-gray uppercase tracking-widest mb-2">
                            {locale === 'en' ? 'Trusted to Develop Talent & Capabilities' : 'Dipercaya untuk Mengembangkan Talenta & Kapabilitas'}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {[
                            { value: '50+', label: locale === 'en' ? 'Corporate Trainings' : 'Corporate Training' },
                            { value: '1,000+', label: locale === 'en' ? 'Trained Professionals' : 'Peserta Dilatih' },
                            { value: '100+', label: locale === 'en' ? 'Programs & Workshops' : 'Program & Workshop' },
                            { value: '30+', label: locale === 'en' ? 'Subject Matter Experts' : 'Trainer & Expert' }
                        ].map((metric, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-brand-blue mb-2">{metric.value}</div>
                                <div className="text-sm font-bold text-text-gray">{metric.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03. BUSINESS CHALLENGES */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6 leading-tight">
                            {locale === 'en' ? 'Competency Challenges Cannot Be Solved with Generic Training' : 'Tantangan Kompetensi Tidak Bisa Diselesaikan dengan Training Generik'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'Every organization has different needs, skill levels, tools, and business targets. Effective training must be designed based on real work contexts, not just delivering materials.' 
                                : 'Setiap organisasi memiliki kebutuhan, tingkat kemampuan, tools, dan target bisnis yang berbeda. Pelatihan yang efektif harus dirancang berdasarkan konteks pekerjaan nyata, bukan sekadar menyelesaikan materi.'}
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Target, title: 'Skill Gap', en: 'Bridging the gap between team skills and organizational needs.', id: 'Kesenjangan antara kompetensi yang dimiliki tim dan kebutuhan organisasi.' },
                            { icon: Monitor, title: 'Digital Adoption', en: 'Teams need new skills to adopt digital technologies effectively.', id: 'Tim membutuhkan kemampuan baru untuk mengadopsi teknologi digital secara efektif.' },
                            { icon: Zap, title: 'Productivity', en: 'Work processes can be improved via tools, automation, and data.', id: 'Proses kerja masih dapat ditingkatkan melalui automation, data, dan workflow.' },
                            { icon: TrendingUp, title: 'Business Transformation', en: 'Transformation requires human capital capable of driving change.', id: 'Transformasi bisnis membutuhkan SDM yang mampu menjalankan perubahan.' }
                        ].map((card, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="bg-white dark:bg-glass-bg border border-glass-border p-8 rounded-3xl h-full hover:border-brand-blue/30 transition-all">
                                    <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                                        <card.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{card.title}</h3>
                                    <p className="text-text-gray font-medium">{locale === 'en' ? card.en : card.id}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 04. APPROACH */}
            <section className="py-24 px-6 relative z-10 bg-brand-blue/5">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slide-right" className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            Diggity Corporate Training Approach
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl">
                            {locale === 'en' ? 'Our framework ensures Diggity acts as your strategic training partner, not just a seminar vendor.' : 'Framework kami memastikan Diggity bertindak sebagai training partner strategis, bukan sekadar vendor seminar.'}
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { step: '01', title: 'Identify', desc: locale === 'en' ? 'Understand organizational needs, target audience, skill gaps, and business objectives.' : 'Memahami kebutuhan organisasi, target peserta, skill gap, dan business objective.' },
                            { step: '02', title: 'Design', desc: locale === 'en' ? 'Structure learning objectives, curriculum, materials, methods, and assessments.' : 'Menyusun learning objective, kurikulum, materi, metode, dan assessment.' },
                            { step: '03', title: 'Deliver', desc: locale === 'en' ? 'Execute training online, offline, or hybrid with expert practitioners.' : 'Training melalui online, offline, atau hybrid dengan trainer dan practitioner.' },
                            { step: '04', title: 'Practice', desc: locale === 'en' ? 'Participants work on case studies, simulations, or work-relevant projects.' : 'Peserta mengerjakan studi kasus, simulasi, atau project relevan pekerjaan.' },
                            { step: '05', title: 'Evaluate', desc: locale === 'en' ? 'Measure comprehension and participant growth through assessments.' : 'Mengukur pemahaman dan perkembangan peserta melalui assessment.' },
                            { step: '06', title: 'Improve', desc: locale === 'en' ? 'Provide insights and recommendations for continued development.' : 'Memberikan insight dan rekomendasi pengembangan lanjutan.' },
                        ].map((item, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="bg-white dark:bg-black/40 border border-glass-border p-8 rounded-3xl h-full relative overflow-hidden group">
                                    <div className="text-6xl font-black text-brand-blue/5 absolute -top-4 -right-4 group-hover:text-brand-blue/10 transition-colors">{item.step}</div>
                                    <div className="text-brand-blue font-bold mb-2">Step {item.step}</div>
                                    <h3 className="text-2xl font-black text-text-main mb-4">{item.title}</h3>
                                    <p className="text-text-gray font-medium relative z-10">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 05. PROGRAMS (Categories) */}
            <section id="programs" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Choose Programs Suited for Your Team' : 'Pilih Program Sesuai Kebutuhan Tim Anda'}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Digital Technology & Software', desc: locale === 'en' ? 'Enhance team skills in using, building, and managing digital solutions.' : 'Tingkatkan kemampuan tim dalam mengembangkan dan mengelola solusi digital.', tags: ['Web Dev', 'Mobile App', 'UI/UX Design', 'System Integration', 'Software Engineering'] },
                            { title: 'AI, Data & Emerging Tech', desc: locale === 'en' ? 'Help organizations implement AI and data for productivity and decisions.' : 'Membantu organisasi mengimplementasikan AI untuk produktivitas & keputusan.', tags: ['Generative AI', 'Data Analytics', 'Machine Learning', 'Business Intelligence'] },
                            { title: 'Brand, Creative & Digital Exp', desc: locale === 'en' ? 'Develop team capabilities in building impactful visual communications.' : 'Mengembangkan kemampuan membangun komunikasi visual yang efektif.', tags: ['Graphic Design', 'Motion Graphic', 'Creative Strategy', 'Content Creation'] },
                            { title: 'Growth Marketing & Commerce', desc: locale === 'en' ? 'Optimize digital marketing and business growth execution.' : 'Mengoptimalkan pemasaran digital dan pertumbuhan bisnis.', tags: ['Digital Marketing', 'SEO', 'Performance Ads', 'E-Commerce'] },
                            { title: 'Cloud, Infra & Cyber Security', desc: locale === 'en' ? 'Build team competencies in managing secure IT infrastructure.' : 'Membangun kompetensi tim dalam mengelola infrastruktur IT yang aman.', tags: ['Cloud Computing', 'DevOps', 'Cyber Security', 'Network Admin'] },
                            { title: 'Professional & Business Skills', desc: locale === 'en' ? 'Develop professional skills for individual and organizational effectiveness.' : 'Pengembangan kemampuan profesional untuk efektivitas organisasi.', tags: ['Leadership', 'Project Management', 'Digital Workplace', 'Productivity'] },
                        ].map((prog, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 transition-all h-full flex flex-col">
                                    <h3 className="text-2xl font-bold text-text-main mb-3">{prog.title}</h3>
                                    <p className="text-text-gray font-medium mb-6">{prog.desc}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {prog.tags.map((tag, j) => (
                                            <span key={j} className="px-3 py-1 rounded-lg bg-bg-canvas border border-glass-border text-xs font-bold text-text-main">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 06. CUSTOM TRAINING & FORMAT */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-black/5 dark:bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                                {locale === 'en' ? 'Cannot Find the Right Program?' : 'Tidak Menemukan Program yang Tepat?'}
                            </h2>
                            <p className="text-xl text-brand-blue font-bold mb-8">
                                {locale === 'en' ? 'We Can Design Custom Training for Your Organization.' : 'Kami Bisa Merancang Training Sesuai Kebutuhan Organisasi Anda.'}
                            </p>
                            <p className="text-text-gray font-medium mb-8">
                                {locale === 'en' ? 'Diggity helps companies build tailored training programs based on:' : 'Diggity dapat membantu perusahaan menyusun program training berdasarkan:'}
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['Business Objective', 'Target Participants', 'Current Skill Level', 'Tools & Technology', 'Learning Objective', 'Expected Outcome'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-main font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#contact" className="inline-flex px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                                {locale === 'en' ? 'Request Custom Training' : 'Konsultasikan Custom Training'}
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left">
                            <h3 className="text-2xl font-black text-text-main mb-6">
                                {locale === 'en' ? 'Flexible Formats' : 'Fleksibel untuk Kebutuhan Organisasi'}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'On-Site Training', desc: locale === 'en' ? 'Directly at your office or location.' : 'Training langsung di kantor atau lokasi perusahaan.' },
                                    { title: 'Online Training', desc: locale === 'en' ? 'Virtual training accessible from anywhere.' : 'Pelatihan virtual yang dapat diikuti dari berbagai lokasi.' },
                                    { title: 'Hybrid Training', desc: locale === 'en' ? 'Combination of online and offline.' : 'Kombinasi online dan offline untuk peserta tersebar.' },
                                    { title: 'Intensive Workshop', desc: locale === 'en' ? 'Intensive sessions focused on specific topics.' : 'Program intensif dengan fokus pada topik tertentu.' },
                                ].map((fmt, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                        <h4 className="font-bold text-text-main mb-2">{fmt.title}</h4>
                                        <p className="text-sm text-text-gray">{fmt.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 17. CORPORATE TRAINING PROCESS */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Start Training in 5 Steps' : 'Mulai Training dalam 5 Langkah'}
                        </h2>
                    </ScrollReveal>

                    <div className="relative">
                        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-glass-border -translate-x-1/2 hidden md:block"></div>
                        <div className="space-y-12">
                            {[
                                { step: '01', title: 'Konsultasi', desc: 'Ceritakan kebutuhan dan tantangan organisasi Anda.' },
                                { step: '02', title: 'Training Needs Analysis', desc: 'Kami memahami target peserta, kebutuhan skill, dan objective bisnis.' },
                                { step: '03', title: 'Proposal & Curriculum', desc: 'Diggity menyusun rekomendasi program, kurikulum, metode, durasi, dan kebutuhan.' },
                                { step: '04', title: 'Training Delivery', desc: 'Program dilaksanakan sesuai jadwal dengan metode yang telah disepakati.' },
                                { step: '05', title: 'Evaluation & Report', desc: 'Hasil training dievaluasi dan dilaporkan kepada perusahaan.' },
                            ].map((proc, i) => (
                                <ScrollReveal key={i} animation={i % 2 === 0 ? "slide-right" : "slide-left"} className="relative flex flex-col md:flex-row items-center md:even:flex-row-reverse gap-8">
                                    <div className="flex-1 w-full md:text-right md:even:text-left">
                                        <h3 className="text-2xl font-bold text-text-main mb-2">{proc.title}</h3>
                                        <p className="text-text-gray font-medium">{proc.desc}</p>
                                    </div>
                                    <div className="w-16 h-16 shrink-0 rounded-full bg-brand-blue text-white font-black text-xl flex items-center justify-center relative z-10 border-4 border-bg-canvas shadow-xl">
                                        {proc.step}
                                    </div>
                                    <div className="flex-1 w-full hidden md:block"></div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 18. FAQ */}
            <section className="py-24 px-6 relative z-10 bg-white/30 dark:bg-black/10 border-y border-glass-border">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Seputar Corporate Training'}
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div 
                                    className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border cursor-pointer hover:border-brand-blue/50 transition-all"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h3 className="text-lg font-bold text-text-main">{locale === 'en' ? faq.q.en : faq.q.id}</h3>
                                        <ChevronDown className={`w-5 h-5 text-text-gray transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </div>
                                    {openFaq === i && (
                                        <p className="mt-4 text-text-gray font-medium leading-relaxed">
                                            {locale === 'en' ? faq.a.en : faq.a.id}
                                        </p>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 19. FINAL CTA */}
            <section id="contact" className="py-32 px-6 relative z-10 text-center">
                <ScrollReveal animation="fade-up" className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-text-main mb-8">
                        {locale === 'en' ? 'Prepare Your Team for the Next Business Challenge.' : 'Siapkan Tim Anda untuk Tantangan Bisnis Berikutnya.'}
                    </h2>
                    <p className="text-xl text-text-gray font-medium mb-12">
                        {locale === 'en' ? 'Build competencies, increase productivity, and drive organizational transformation through Corporate Training designed for your business needs.' : 'Bangun kompetensi, tingkatkan produktivitas, dan dorong transformasi organisasi melalui Corporate Training yang dirancang sesuai kebutuhan bisnis Anda.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="mailto:hello@diggity.com" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all text-lg flex items-center justify-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            {locale === 'en' ? 'Consult Training Needs' : 'Konsultasikan Kebutuhan Training'}
                        </Link>
                        <Link href="/academy" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all text-lg">
                            {locale === 'en' ? 'Download Program Outline' : 'Download Program Outline'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
