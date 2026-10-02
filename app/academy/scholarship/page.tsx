'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import { 
    Heart, Globe, Users, Target, CheckCircle2, 
    TrendingUp, Lightbulb, BookOpen, Monitor, 
    Compass, Award, GraduationCap, Briefcase, Building2
} from 'lucide-react';

export default function ScholarshipPage() {
    const { language: locale } = useLanguage();

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
            
            {/* 01. HERO */}
            <section className="relative pt-16 pb-24 px-6 lg:px-8 z-10 text-center max-w-5xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-sm mb-8">
                        <Heart className="w-4 h-4" />
                        CORPORATE SOCIAL RESPONSIBILITY
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-6">
                        {locale === 'en' ? 'Create Impact, Build Talent, ' : 'Ciptakan Dampak, Bangun Talenta, '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-500">
                            {locale === 'en' ? 'Accelerate Digital Transformation.' : 'Percepat Transformasi Digital.'}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        {locale === 'en' 
                            ? 'Realize your company\'s social contribution through CSR programs designed to build digital skills, expand tech access, and create better opportunities for the community.' 
                            : 'Wujudkan kontribusi sosial perusahaan melalui program CSR yang dirancang untuk membangun keterampilan digital, memperluas akses teknologi, dan menciptakan peluang yang lebih baik bagi masyarakat.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="mailto:hello@diggity.com" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all">
                            {locale === 'en' ? 'Consult CSR Program' : 'Konsultasikan Program CSR'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* 02. WHY DIGGITY */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border bg-white/30 dark:bg-black/10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'CSR That Goes Beyond One Event' : 'CSR yang Tidak Berhenti di Satu Kegiatan'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto">
                            {locale === 'en' ? 'Impactful CSR is not just about providing aid, but creating capabilities that continue to grow after the program ends.' : 'Program CSR yang berdampak bukan hanya tentang memberikan bantuan, tetapi tentang menciptakan kemampuan yang dapat terus berkembang setelah program selesai.'}
                        </p>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Monitor, title: 'Technology', desc: 'Memanfaatkan teknologi digital untuk menciptakan solusi yang relevan dan mudah diakses.' },
                            { icon: BookOpen, title: 'Education', desc: 'Membangun pengetahuan dan keterampilan yang dapat digunakan dalam jangka panjang.' },
                            { icon: Award, title: 'Talent Development', desc: 'Mempersiapkan peserta dengan kompetensi yang relevan dengan kebutuhan dunia kerja dan industri.' },
                            { icon: Users, title: 'Community', desc: 'Mendorong kolaborasi dan terbentuknya ekosistem yang dapat berkembang secara mandiri.' }
                        ].map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border h-full hover:border-brand-blue/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                                        <exp.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{exp.title}</h3>
                                    <p className="text-sm text-text-gray font-medium">{exp.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03. COLLABORATION FORMS */}
            <section className="py-24 px-6 relative z-10 bg-brand-blue/5">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'One Goal, Multiple Ways to Impact' : 'Satu Tujuan, Banyak Cara untuk Berdampak'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto">
                            {locale === 'en' ? 'Every company has different CSR needs. DIGGITY provides multiple scalable collaboration models.' : 'Setiap perusahaan memiliki kebutuhan CSR yang berbeda. DIGGITY menyediakan beberapa model kolaborasi yang dapat disesuaikan.'}
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'CSR Education', desc: 'Program edukasi dan peningkatan keterampilan digital untuk sekolah, kampus, maupun masyarakat.' },
                            { title: 'CSR Scholarship', desc: 'Dukungan pembelajaran bagi peserta terpilih melalui akses course, bootcamp, sertifikasi, atau program pengembangan talenta.' },
                            { title: 'CSR Bootcamp', desc: 'Program intensif untuk membangun kompetensi digital dan kesiapan kerja dalam periode tertentu.' },
                            { title: 'CSR Workshop & Seminar', desc: 'Program edukasi berskala pendek yang dapat diselenggarakan secara offline, online, maupun hybrid.' },
                            { title: 'CSR Community Program', desc: 'Program pemberdayaan komunitas yang berorientasi pada peningkatan kapasitas dan kemandirian.' },
                            { title: 'CSR Digitalization', desc: 'Pengembangan solusi digital untuk membantu organisasi, komunitas, sekolah, UMKM, atau kelompok masyarakat.' }
                        ].map((collab, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 transition-all h-full flex flex-col">
                                    <div className="inline-flex px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-4 w-fit">
                                        COLLABORATION
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-3">{collab.title}</h3>
                                    <p className="text-sm text-text-gray font-medium flex-1">{collab.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 04. TARGET & IMPACT */}
            <section className="py-24 px-6 relative z-10 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <ScrollReveal animation="slide-right">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                                {locale === 'en' ? 'Who is this Program For?' : 'Untuk Siapa Program Ini?'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium mb-8">
                                {locale === 'en' ? 'DIGGITY CSR programs can be tailored for various beneficiary groups.' : 'Program CSR DIGGITY dapat dirancang untuk berbagai kelompok penerima manfaat.'}
                            </p>
                            <div className="space-y-4">
                                {[
                                    { title: 'Pelajar & Siswa', desc: 'Mengenalkan keterampilan digital dan teknologi sejak dini.', icon: BookOpen },
                                    { title: 'Mahasiswa', desc: 'Mempersiapkan kompetensi dan portofolio untuk memasuki dunia profesional.', icon: GraduationCap },
                                    { title: 'Fresh Graduate & Job Seeker', desc: 'Meningkatkan kesiapan kerja dan kompetensi digital.', icon: Briefcase },
                                    { title: 'UMKM & Pelaku Usaha', desc: 'Membantu meningkatkan kemampuan bisnis dan pemanfaatan teknologi.', icon: Building2 },
                                    { title: 'Komunitas', desc: 'Membangun kapasitas digital dan memperluas akses terhadap teknologi.', icon: Users }
                                ].map((target, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                                            <target.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main mb-1">{target.title}</h4>
                                            <p className="text-sm text-text-gray">{target.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left">
                            <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                                {locale === 'en' ? 'Impact Framework' : 'Bukan Sekadar Berapa Peserta yang Hadir'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium mb-8">
                                {locale === 'en' ? 'DIGGITY helps companies track program progression across multiple indicators:' : 'Keberhasilan program CSR tidak hanya diukur dari jumlah peserta. DIGGITY membantu perusahaan melihat perkembangan program melalui beberapa indikator:'}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'Reach', desc: 'Berapa banyak penerima manfaat yang berhasil dijangkau.' },
                                    { title: 'Participation', desc: 'Seberapa aktif peserta mengikuti program.' },
                                    { title: 'Learning', desc: 'Seberapa besar peningkatan pengetahuan dan keterampilan peserta.' },
                                    { title: 'Application', desc: 'Seberapa jauh keterampilan diterapkan dalam aktivitas nyata.' },
                                    { title: 'Outcome', desc: 'Perubahan yang terjadi setelah program selesai.' },
                                    { title: 'Sustainability', desc: 'Seberapa besar dampak dapat terus berjalan setelah intervensi program berakhir.' }
                                ].map((impact, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                        <h4 className="font-bold text-text-main mb-2 text-brand-blue">{impact.title}</h4>
                                        <p className="text-sm text-text-gray font-medium">{impact.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 05. CSR JOURNEY */}
            <section className="py-24 px-6 relative z-10 bg-brand-blue/5">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up" className="mb-16 md:text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-6">
                            {locale === 'en' ? 'From Idea to Measurable Impact' : 'Dari Ide Menjadi Dampak yang Terukur'}
                        </h2>
                        <p className="text-lg text-text-gray font-medium max-w-2xl mx-auto">
                            {locale === 'en' ? 'DIGGITY assists companies in running CSR programs end-to-end.' : 'DIGGITY membantu perusahaan menjalankan program CSR secara end-to-end.'}
                        </p>
                    </ScrollReveal>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-glass-border -translate-y-1/2 hidden lg:block"></div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                            {[
                                { step: '01', title: 'Discover', desc: 'Memahami tujuan CSR perusahaan, target penerima, dan permasalahan.' },
                                { step: '02', title: 'Design', desc: 'Menyusun konsep, kurikulum, timeline, indikator, dan mekanisme.' },
                                { step: '03', title: 'Deliver', desc: 'Menjalankan program melalui training, mentoring, atau solusi digital.' },
                                { step: '04', title: 'Measure', desc: 'Mengukur perkembangan peserta melalui indikator yang telah ditentukan.' },
                                { step: '05', title: 'Sustain', desc: 'Membangun keberlanjutan melalui komunitas dan pengembangan lanjutan.' }
                            ].map((step, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="relative">
                                    <div className="bg-brand-blue/5 lg:bg-transparent relative pt-8 lg:pt-0">
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

            {/* CTA */}
            <section className="py-32 px-6 relative z-10 text-center border-t border-glass-border">
                <ScrollReveal animation="fade-up" className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-text-main mb-8">
                        {locale === 'en' ? 'Have a CSR Goal You Want to Achieve?' : 'Punya Tujuan CSR yang Ingin Dicapai?'}
                    </h2>
                    <p className="text-xl text-text-gray font-medium mb-12">
                        {locale === 'en' ? 'Tell us your goals, target beneficiaries, location, or program needs. We will help translate them into relevant, structured programs with measurable impacts.' : 'Ceritakan tujuan, target penerima manfaat, lokasi, maupun kebutuhan program Anda kepada tim DIGGITY. Kami akan membantu menerjemahkannya menjadi program yang relevan, terstruktur, dan dapat diukur dampaknya.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="mailto:hello@diggity.com" className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all text-lg flex items-center justify-center gap-2">
                            <Target className="w-5 h-5" />
                            {locale === 'en' ? 'Consult CSR Program' : 'Konsultasikan Program CSR'}
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
