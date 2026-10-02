'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Award, CheckCircle2, Search, Target, Briefcase,
    ShieldCheck, Building2, Presentation, Clock, BookOpen,
    Users, FileText, BarChart, ChevronDown, Check, X, Medal, Shield
} from 'lucide-react';
import { api } from '../../../lib/api';

const FAQS = [
    {
        q: { en: "What is BNSP certification?", id: "Apa itu sertifikasi BNSP?" },
        a: { en: "BNSP certification is a formal recognition of individual competency in a specific field, issued by the Indonesian Professional Certification Authority (BNSP).", id: "Sertifikasi BNSP adalah pengakuan formal atas kompetensi individu di bidang tertentu, dikeluarkan oleh Badan Nasional Sertifikasi Profesi (BNSP)." }
    },
    {
        q: { en: "Do I have to take training before certification?", id: "Apakah harus mengikuti training sebelum sertifikasi?" },
        a: { en: "Not always. If you already have the required experience and portfolio, you can proceed directly to the assessment. However, training is recommended for preparation.", id: "Tidak selalu. Jika Anda sudah memiliki pengalaman dan portofolio yang memadai, Anda bisa langsung mengikuti asesmen. Namun, training disarankan untuk persiapan." }
    },
    {
        q: { en: "What are the requirements for certification?", id: "Apa saja persyaratan sertifikasi?" },
        a: { en: "Requirements vary by scheme but generally include an ID card, CV, educational certificates, proof of experience, and a portfolio relevant to the scheme.", id: "Persyaratan bervariasi sesuai skema, namun umumnya meliputi KTP, CV, ijazah terakhir, bukti pengalaman kerja, dan portofolio relevan." }
    },
    {
        q: { en: "How long does the certification process take?", id: "Berapa lama proses asesmen?" },
        a: { en: "The assessment process usually takes 1 to 2 days, depending on the scheme and the number of participants.", id: "Proses asesmen (uji kompetensi) biasanya memakan waktu 1 hingga 2 hari, tergantung skema dan jumlah peserta." }
    },
    {
        q: { en: "How long is the certificate valid?", id: "Berapa lama masa berlaku sertifikat?" },
        a: { en: "BNSP certificates are typically valid for 3 years. After that, they must be renewed through a verification process.", id: "Sertifikat BNSP umumnya berlaku selama 3 tahun. Setelah itu, sertifikat harus diperpanjang melalui proses verifikasi." }
    }
];

export default function CertificationPage() {
    const { language: locale } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            {/* Background */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 max-w-7xl mx-auto text-center">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                        <Award className="w-4 h-4" />
                        PROFESSIONAL CERTIFICATION
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Validate Your Skills. ' : 'Validasi Kompetensi. '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Earn Recognized Certifications.' : 'Raih Sertifikasi Profesional.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Enhance professional credibility through certification preparation and assessment, including BNSP certifications for various expertise fields.' 
                            : 'Tingkatkan kredibilitas profesional melalui pelatihan persiapan dan sertifikasi kompetensi, termasuk program sertifikasi BNSP.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#programs" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'View Certification Programs' : 'Lihat Program Sertifikasi'}
                        </Link>
                        <Link href="#contact" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all">
                            {locale === 'en' ? 'Consult Certification' : 'Konsultasi Sertifikasi'}
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-glass-border max-w-4xl mx-auto">
                    {[
                        { value: '50+', label: locale === 'en' ? 'Certification Schemes' : 'Skema Sertifikasi' },
                        { value: '500+', label: locale === 'en' ? 'Certified Alumni' : 'Peserta Tersertifikasi' },
                        { value: '15+', label: locale === 'en' ? 'Institution Partners' : 'Mitra Institusi' },
                        { value: '100%', label: locale === 'en' ? 'Industry Recognized' : 'Diakui Industri' }
                    ].map((metric, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div className="text-3xl md:text-4xl font-black text-text-main mb-1">{metric.value}</div>
                            <div className="text-sm font-bold text-text-gray">{metric.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* 03 & 04. BNSP CERTIFICATION SCHEMES */}
            <section id="programs" className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue mb-6">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'Find the Right BNSP Scheme' : 'Temukan Skema Sertifikasi BNSP'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto">
                            {locale === 'en' 
                                ? 'Validate your competency through official schemes provided by licensed Professional Certification Institutions (LSP BNSP).' 
                                : 'Validasi kompetensimu melalui sertifikasi yang diselenggarakan berdasarkan skema dari LSP berlisensi BNSP.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Digital Marketing', desc: 'Validasi kompetensi dalam merencanakan, menjalankan, dan mengevaluasi aktivitas digital marketing.', level: 'Sesuai Skema', method: 'Online / Offline' },
                            { title: 'Web Developer', desc: 'Sertifikasi kompetensi pengembangan aplikasi berbasis web modern.', level: 'Sesuai Skema', method: 'Online / Offline' },
                            { title: 'Graphic Designer', desc: 'Sertifikasi kompetensi desain grafis berdasarkan unit kompetensi standar BNSP.', level: 'Sesuai Skema', method: 'Offline' },
                            { title: 'Social Media Marketing', desc: 'Validasi kompetensi dalam pengelolaan pemasaran melalui platform media sosial.', level: 'Sesuai Skema', method: 'Online / Offline' },
                            { title: 'Content Creator', desc: 'Sertifikasi kompetensi produksi dan pengelolaan konten digital kreatif.', level: 'Sesuai Skema', method: 'Online / Offline' },
                            { title: 'IT Project Manager', desc: 'Validasi kompetensi pengelolaan proyek teknologi informasi.', level: 'Sesuai Skema', method: 'Online / Offline' },
                        ].map((scheme, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 transition-all h-full flex flex-col">
                                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold mb-4 w-fit">
                                        BNSP Certification
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{scheme.title}</h3>
                                    <p className="text-text-gray font-medium mb-6 text-sm flex-1">{scheme.desc}</p>
                                    <div className="space-y-2 pt-4 border-t border-glass-border">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-gray">Level:</span>
                                            <span className="font-bold text-text-main">{scheme.level}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-gray">Metode:</span>
                                            <span className="font-bold text-text-main">{scheme.method}</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 08. CERTIFICATION JOURNEY */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="mb-16 md:text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? '5 Steps to Certification' : '5 Langkah Menuju Sertifikasi'}
                        </h2>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-glass-border -translate-y-1/2 hidden lg:block"></div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                            {[
                                { step: '01', title: 'Choose', desc: 'Pilih bidang dan skema sertifikasi.' },
                                { step: '02', title: 'Check', desc: 'Pastikan memenuhi persyaratan skema.' },
                                { step: '03', title: 'Prepare', desc: 'Ikuti training dan persiapan asesmen.' },
                                { step: '04', title: 'Assess', desc: 'Ikuti uji kompetensi bersama asesor.' },
                                { step: '05', title: 'Certify', desc: 'Dapatkan sertifikat kompetensi resmi.' }
                            ].map((step, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="relative">
                                    <div className="bg-bg-canvas lg:bg-transparent relative pt-8 lg:pt-0">
                                        <div className="w-16 h-16 rounded-full bg-brand-blue text-white font-black text-xl flex items-center justify-center mb-6 lg:mx-auto relative z-10 border-4 border-bg-canvas lg:shadow-xl">
                                            {step.step}
                                        </div>
                                        <div className="lg:text-center bg-white dark:bg-glass-bg border border-glass-border p-6 rounded-2xl">
                                            <h3 className="font-bold text-text-main mb-2">{step.title}</h3>
                                            <p className="text-sm text-text-gray">{step.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. CERTIFICATION VS TRAINING CERTIFICATE */}
            <section className="py-24 px-6 relative z-10 bg-brand-blue/5">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            Certification vs Training Certificate
                        </h2>
                        <p className="text-lg text-text-gray font-medium">
                            {locale === 'en' ? 'Understand the difference before you choose.' : 'Pahami perbedaannya sebelum Anda memilih.'}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up">
                        <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden">
                            <div className="grid grid-cols-3 bg-slate-50 dark:bg-black/40 border-b border-glass-border">
                                <div className="p-6 font-bold text-text-gray">Aspek</div>
                                <div className="p-6 font-black text-text-main border-l border-glass-border">Sertifikat Pelatihan</div>
                                <div className="p-6 font-black text-brand-blue border-l border-glass-border">Sertifikasi Kompetensi</div>
                            </div>
                            {[
                                ['Tujuan', 'Bukti mengikuti pelatihan', 'Validasi kompetensi (BNSP)'],
                                ['Proses', 'Mengikuti Training', 'Uji Kompetensi / Asesmen'],
                                ['Assessment', 'Tidak selalu ada', 'Wajib dan terstandarisasi'],
                                ['Penerbit', 'Penyelenggara training', 'Lembaga sertifikasi profesi (LSP)'],
                                ['Bukti', 'Terbatas pada kehadiran', 'Berdasarkan bukti unjuk kerja']
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-3 border-b border-glass-border last:border-b-0 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className="p-6 font-bold text-text-gray flex items-center">{row[0]}</div>
                                    <div className="p-6 text-text-main border-l border-glass-border flex items-center gap-3">
                                        <X className="w-5 h-5 text-red-400 shrink-0 hidden sm:block" /> {row[1]}
                                    </div>
                                    <div className="p-6 font-bold text-brand-blue border-l border-glass-border flex items-center gap-3 bg-brand-blue/5">
                                        <Check className="w-5 h-5 text-brand-blue shrink-0 hidden sm:block" /> {row[2]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 14. FAQ */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            FAQ
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

            {/* 15. FINAL CTA */}
            <section id="contact" className="py-32 px-6 relative z-10 text-center">
                <ScrollReveal animation="fade-up" className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-text-main mb-8">
                        {locale === 'en' ? 'Ready to Validate Your Skills?' : 'Siap Memvalidasi Kompetensimu?'}
                    </h2>
                    <p className="text-xl text-text-gray font-medium mb-12">
                        {locale === 'en' ? 'Choose the certification program that fits your professional goals.' : 'Pilih program sertifikasi yang sesuai dengan bidang dan tujuan profesionalmu.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="#programs" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all text-lg">
                            {locale === 'en' ? 'View Programs' : 'Lihat Program Sertifikasi'}
                        </Link>
                        <Link href="mailto:hello@diggity.com" className="px-8 py-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main font-bold transition-all text-lg">
                            {locale === 'en' ? 'Consult with Diggity' : 'Konsultasi dengan Diggity'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
