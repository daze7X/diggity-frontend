'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Briefcase, MapPin, Clock, GraduationCap, DollarSign, 
    CheckCircle2, ArrowRight, ArrowLeft 
} from 'lucide-react';

export default function JobDetailPage({ params }: { params: { slug: string } }) {
    const { language: locale } = useLanguage();

    // Dummy Data - To be fetched from API based on slug
    const job = {
        title: 'Full-Stack Developer',
        company: 'CV Sinergi Cita Digital — Diggity',
        postedAt: '3 hari yang lalu',
        deadline: '02 Oktober 2026',
        type: 'Full-time',
        workPreference: 'Hybrid',
        level: 'Junior–Middle',
        salary: 'Rp4.000.000 – Rp7.000.000 / bulan',
        department: 'Technology',
        location: 'Yogyakarta',
        education: 'D3/S1',
        overview: 'Sebagai Full-Stack Developer di Diggity, kamu akan terlibat dalam pengembangan berbagai solusi digital untuk kebutuhan bisnis, organisasi, dan produk digital. Kamu akan bekerja bersama tim lintas fungsi untuk menerjemahkan kebutuhan pengguna dan bisnis menjadi aplikasi yang scalable, reliable, dan mudah digunakan.',
        responsibilities: [
            'Mengembangkan dan memelihara aplikasi web dan sistem digital Diggity maupun client.',
            'Membangun fitur baru berdasarkan kebutuhan produk dan pengguna.',
            'Mengembangkan REST API dan melakukan integrasi dengan layanan pihak ketiga.',
            'Melakukan debugging, testing, dan optimasi aplikasi.',
            'Berkolaborasi dengan UI/UX Designer, Product/Project Manager, dan developer lainnya.',
            'Melakukan code review dan menjaga kualitas kode.'
        ],
        requirements: [
            'Pendidikan minimal D3/S1 Teknik Informatika, Sistem Informasi, Ilmu Komputer, atau bidang terkait.',
            'Memahami konsep pemrograman dan software development.',
            'Memiliki pengalaman menggunakan Laravel/PHP.',
            'Memahami JavaScript dan frontend development (khususnya React/Next.js).',
            'Memahami database relational seperti MySQL/PostgreSQL.',
            'Memahami Git dan version control.',
            'Mampu bekerja secara mandiri maupun bersama tim.'
        ],
        niceToHave: [
            'Pengalaman dengan Docker & CI/CD.',
            'Pengalaman mendeploy aplikasi ke Cloud (AWS/DigitalOcean).',
            'Pernah mengembangkan SaaS atau produk digital.'
        ],
        benefits: [
            'Real Project Experience: Terlibat dalam proyek digital nyata.',
            'Learning & Development: Kesempatan mengikuti knowledge sharing.',
            'Flexible Work Arrangement: Pola kerja disesuaikan (Hybrid).',
            'Professional Environment: Lingkungan kerja kolaboratif.'
        ]
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-bold text-text-gray hover:text-brand-blue transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Careers
                </Link>

                {/* 1. HEADER LOWONGAN */}
                <ScrollReveal animation="fade-up">
                    <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-8 md:p-10 mb-8 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-text-main mb-3 leading-tight">{job.title}</h1>
                                <p className="text-lg font-bold text-text-gray mb-2">{job.company}</p>
                                <p className="text-sm text-text-gray font-medium">Dibuat pada {job.postedAt} • Ditutup pada {job.deadline}</p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
                                <Briefcase className="w-8 h-8 text-brand-blue" />
                            </div>
                        </div>

                        {/* Info Chips */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8 border-t border-glass-border">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-gray uppercase mb-1">Jenis Pekerjaan</span>
                                <span className="text-sm font-bold text-text-main flex items-center gap-2"><Clock className="w-4 h-4 text-brand-blue" /> {job.type}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-gray uppercase mb-1">Preferensi Kerja</span>
                                <span className="text-sm font-bold text-text-main flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-blue" /> {job.workPreference}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-gray uppercase mb-1">Level</span>
                                <span className="text-sm font-bold text-text-main flex items-center gap-2"><Briefcase className="w-4 h-4 text-brand-blue" /> {job.level}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-gray uppercase mb-1">Pendidikan Min</span>
                                <span className="text-sm font-bold text-text-main flex items-center gap-2"><GraduationCap className="w-4 h-4 text-brand-blue" /> {job.education}</span>
                            </div>
                            <div className="flex flex-col col-span-2">
                                <span className="text-xs font-bold text-text-gray uppercase mb-1">Gaji</span>
                                <span className="text-sm font-bold text-text-main flex items-center gap-2"><DollarSign className="w-4 h-4 text-brand-blue" /> {job.salary}</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* 2. DESKRIPSI PEKERJAAN */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 space-y-12">
                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-4">Overview</h2>
                            <p className="text-text-gray font-medium leading-relaxed">{job.overview}</p>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-4">Responsibilities</h2>
                            <ul className="space-y-3">
                                {job.responsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                        <span className="text-text-gray font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-4">Requirements</h2>
                            <ul className="space-y-3">
                                {job.requirements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span className="text-text-gray font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-4">Nice to Have</h2>
                            <ul className="space-y-3">
                                {job.niceToHave.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-text-gray font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up">
                            <h2 className="text-2xl font-black text-text-main mb-4">What You&apos;ll Get</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {job.benefits.map((item, i) => {
                                    const [title, desc] = item.split(': ');
                                    return (
                                        <div key={i} className="p-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                            <h4 className="font-bold text-text-main text-sm mb-1">{title}</h4>
                                            <p className="text-xs text-text-gray font-medium">{desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* STICKY SIDEBAR CTA */}
                    <div className="w-full lg:w-1/3">
                        <ScrollReveal animation="slide-left" className="sticky top-24">
                            <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-6 md:p-8 text-center shadow-lg">
                                <h3 className="text-xl font-black text-text-main mb-3">Tertarik bergabung dengan Diggity?</h3>
                                <p className="text-sm text-text-gray font-medium mb-6">
                                    Kirimkan CV dan portfolio terbaikmu dan mulai perjalanan karier bersama kami.
                                </p>
                                <button className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-colors flex items-center justify-center gap-2 mb-4">
                                    Lamar Sekarang <ArrowRight className="w-4 h-4" />
                                </button>
                                <p className="text-xs text-text-gray">
                                    Punya pertanyaan? <Link href="mailto:careers@diggity.com" className="text-brand-blue hover:underline">Hubungi Tim Talent</Link>
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
