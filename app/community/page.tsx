import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getLocaleServer } from '../../lib/locale-server';
import { api } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    Users, ArrowLeft, ArrowRight, MessageSquare, Sparkles, Code, 
    Briefcase, Presentation, Share2, Star, CheckCircle2, 
    Layers, Terminal, Compass, ShieldCheck, Flame
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Komunitas Digital Eksklusif - Diggity',
  description: 'Bergabunglah dengan ribuan talenta digital, developer, desainer, dan tech founder dalam komunitas inklusif Diggity. Dapatkan akses ke seminar bulanan, mentor, dan peluang karier.',
};

export default async function DigitalCommunityPage() {
    const locale = await getLocaleServer();
    let settings = null;
    try {
        settings = await api.getCompanySettings();
    } catch (e) {
        console.error('Failed to load company settings for community:', e);
    }

    const discordUrl = settings?.discord_url || 'https://discord.gg/diggity';
    const telegramUrl = settings?.telegram_url || 'https://t.me/diggitycommunity';

    // 5 Interest Guilds
    const interestGuilds = [
        {
            title: 'Web & Mobile Engineering',
            desc: locale === 'en' 
                ? 'Modern fullstack frameworks, Next.js, Laravel API, Flutter, and cross-platform architecture.' 
                : 'Diskusi rekayasa web dan mobile modern: Next.js, Laravel API, Flutter, dan performa aplikasi.',
            icon: Code,
            tags: ['Next.js', 'Laravel', 'Flutter', 'TypeScript']
        },
        {
            title: 'AI & Data Science',
            desc: locale === 'en' 
                ? 'Applied generative AI, LLM prompting, Python analytics, and computer vision pipelines.' 
                : 'Eksplorasi kecerdasan buatan terapan, integrasi LLM API, Python data processing, dan visualisasi data.',
            icon: Terminal,
            tags: ['Generative AI', 'Python', 'LLM', 'Data Ops']
        },
        {
            title: 'UI/UX & Product Design',
            desc: locale === 'en' 
                ? 'Design systems, prototyping in Figma, heuristic evaluation, and product usability research.' 
                : 'Standar design system, prototyping di Figma, riset pengalaman pengguna, dan bedah layout.',
            icon: Layers,
            tags: ['Figma', 'Design System', 'UX Research', 'UI Polish']
        },
        {
            title: 'Cloud, DevOps & Security',
            desc: locale === 'en' 
                ? 'CI/CD automation, Docker containers, Kubernetes orchestration, server security, and ISO compliance.' 
                : 'Otomatisasi CI/CD, manajemen server Docker/Kubernetes, keamanan cloud, dan standar ISO.',
            icon: ShieldCheck,
            tags: ['Docker', 'DevOps', 'AWS', 'Security']
        },
        {
            title: 'Career & Freelance Hub',
            desc: locale === 'en' 
                ? 'CV reviews, mock technical interviews, remote freelancing tips, and direct recruiter match.' 
                : 'Review CV & portofolio koding, simulasi wawancara teknis, tips remote work, dan referral lowongan.',
            icon: Briefcase,
            tags: ['Remote Work', 'Interview', 'Portofolio', 'Freelance']
        }
    ];

    // Regular Programs (Strictly Seminar, NO Webinar)
    const communityPrograms = [
        {
            badge: locale === 'en' ? 'MONTHLY EVENT' : 'AGENDA BULANAN',
            title: locale === 'en' ? 'Monthly Tech & Industry Seminar' : 'Seminar Teknologi & Industri Bulanan',
            desc: locale === 'en' 
                ? 'Deep-dive session with senior practitioners discussing real tech stacks, AI implementation, and product architecture.' 
                : 'Sesi kupas tuntas bersama praktisi senior industri membahas studi kasus arsitektur sistem, implementasi AI, dan tren produk terkini.',
            icon: Presentation,
            schedule: locale === 'en' ? 'Every 3rd Saturday' : 'Setiap Sabtu ke-3'
        },
        {
            badge: locale === 'en' ? 'WEEKLY LAB' : 'AGENDA MINGGUAN',
            title: locale === 'en' ? 'Code & Portfolio Review Jam' : 'Sesi Bedah Kode & Portofolio Karya',
            desc: locale === 'en' 
                ? 'Get your GitHub repositories and design showcases reviewed directly by Diggity Lead Engineers.' 
                : 'Dapatkan masukan langsung dari Tech Lead Diggity untuk menyempurnakan struktur repository GitHub dan showcase desain Anda.',
            icon: Code,
            schedule: locale === 'en' ? 'Weekly Live Discord' : 'Mingguan via Live Discord'
        },
        {
            badge: locale === 'en' ? 'INTERACTIVE' : 'FORUM TERBUKA',
            title: locale === 'en' ? 'Ask Me Anything (AMA) with Tech Leads' : 'Diskusi Santai AMA (Ask Me Anything)',
            desc: locale === 'en' 
                ? 'Direct informal Q&A session covering technical roadblocks, freelance rate negotiation, and career switching tips.' 
                : 'Ruang tanya jawab bebas seputar solusi error koding, negosiasi rate freelance, hingga tips transisi karier ke dunia teknologi.',
            icon: MessageSquare,
            schedule: locale === 'en' ? 'Bi-weekly Evening' : 'Dua Mingguan Malam'
        },
        {
            badge: locale === 'en' ? 'SPECIAL CHALLENGE' : 'KOMPETISI MINI',
            title: locale === 'en' ? 'Community Hack Jam & Showcase' : 'Mini Hack Jam & Showcase Solusi',
            desc: locale === 'en' 
                ? 'Build small prototype solutions collaboratively in 48 hours with mentorship and digital asset awards.' 
                : 'Tantangan membangun prototipe solusi mini secara tim dalam 48 jam dengan bimbingan mentor dan apresiasi lisensi produk.',
            icon: Flame,
            schedule: locale === 'en' ? 'Quarterly' : 'Per Kuartal (3 Bulan Sekali)'
        }
    ];

    // Key Benefits
    const benefits = [
        {
            title: locale === 'en' ? 'Exclusive Vacancy & Project Access' : 'Akses Awal Info Lowongan & Proyek',
            desc: locale === 'en' 
                ? 'Receive early notifications for freelance gigs, client contract sub-projects, and internal openings before external job boards.' 
                : 'Menerima informasi proyek freelance, subkontrak klien Diggity, serta lowongan magang internal sebelum dirilis ke portal eksternal.',
            icon: Briefcase
        },
        {
            title: locale === 'en' ? 'Peer-to-Peer Debugging & Support' : 'Forum Bantuan Debugging & Solusi Error',
            desc: locale === 'en' 
                ? 'An active peer group where developers help troubleshoot syntax blockers, build errors, and architecture questions.' 
                : 'Ruang diskusi aktif di mana anggota saling membantu menuntaskan error koding, konfigurasi framework, hingga arsitektur database.',
            icon: Terminal
        },
        {
            title: locale === 'en' ? 'Official Seminar Certificates' : 'Sertifikat Seminar Komunitas',
            desc: locale === 'en' 
                ? 'Verified digital attendance certificates for all monthly industry seminars to enrich your LinkedIn and professional resume.' 
                : 'Sertifikat kehadiran terverifikasi untuk setiap seminar bulanan yang dapat dilampirkan pada profil LinkedIn dan berkas portofolio.',
            icon: Presentation
        },
        {
            title: locale === 'en' ? 'Co-Founder & Partner Matchmaking' : 'Jejaring Kemitraan & Teman Proyek',
            desc: locale === 'en' 
                ? 'Connect with potential startup co-founders, freelance partners, and agencies looking to collaborate on digital ventures.' 
                : 'Temukan mitra co-founder, partner pengerjaan proyek klien, atau agensi yang membuka kolaborasi pengembangan produk digital.',
            icon: Share2
        }
    ];

    // Participation steps
    const steps = [
        {
            number: '01',
            title: locale === 'en' ? 'Choose Your Platform' : 'Pilih Kanal Diskusi',
            desc: locale === 'en' 
                ? 'Join our Discord server for structured code channels or Telegram for fast announcements and casual chats.' 
                : 'Masuk ke server Discord Diggity untuk ruang diskusi terstruktur per topik, atau saluran Telegram untuk kabar kilat.'
        },
        {
            number: '02',
            title: locale === 'en' ? 'Select Interest Roles' : 'Pilih Role Bidang Minat',
            desc: locale === 'en' 
                ? 'Take role badges (Web, AI, UI/UX, Cloud, or Freelance) in the welcome channel to access dedicated guild discussions.' 
                : 'Ambil badge role minatmu di channel orientasi agar dapat langsung berinteraksi dengan komunitas yang sesuai minatmu.'
        },
        {
            number: '03',
            title: locale === 'en' ? 'Engage, Learn, & Collaborate' : 'Mulai Belajar & Berkolaborasi',
            desc: locale === 'en' 
                ? 'Participate in monthly seminars, ask troubleshooting questions, share your side-projects, and discover opportunities.' 
                : 'Hadiri seminar bulanan, ajukan pertanyaan saat mendapati blocker koding, bagikan karyamu, dan raih peluang baru.'
        }
    ];

    const testimonials = [
        {
            name: 'Agus Raharjo',
            role: 'Frontend Developer, Surabaya',
            quote: locale === 'en' 
                ? 'Joining the Diggity Discord helped me land my first enterprise freelance web contract within 2 weeks of networking in the project-match channel!' 
                : 'Gabung di Discord Diggity membuat saya mendapatkan kontrak project freelance web pertama saya hanya dalam 2 minggu setelah aktif berjejaring di channel project-match!'
        },
        {
            name: 'Dewi Fitriani',
            role: 'UI/UX Designer, Jakarta',
            quote: locale === 'en' 
                ? 'The monthly seminar topics and live portfolio review sessions are extremely insightful. Critiques from senior tech leads were key to my successful career switch!' 
                : 'Materi seminar bulanan dan sesi sharing portofolio sangat berbobot. Evaluasi langsung dari Tech Lead senior menjadi kunci utama saya berhasil beralih karier ke bidang UI/UX!'
        },
        {
            name: 'Budi Santoso',
            role: 'Tech Startup Founder, Yogyakarta',
            quote: locale === 'en' 
                ? 'I met my current CTO co-founder through discussions in this community. The technical depth and collaborative mindset here are top notch.' 
                : 'Saya menemukan CTO co-founder untuk startup logistik saya melalui diskusi di channel B2B Networking komunitas ini. Komunitas yang sangat aktif dan suportif!'
        }
    ];

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left bg-bg-canvas">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Back Button */}
                <div className="flex items-center">
                    <Link 
                        href="/insights"
                        className="inline-flex items-center gap-2 text-xs font-bold text-text-gray hover:text-brand-blue transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        {locale === 'en' ? 'Back to Insights Hub' : 'Kembali ke Pusat Wawasan'}
                    </Link>
                </div>

                {/* 01. HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-black uppercase tracking-widest">
                            <Users className="w-3.5 h-3.5" />
                            {locale === 'en' ? 'DIGGITY DIGITAL COMMUNITY' : 'KOMUNITAS DIGITAL RESMI DIGGITY'}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-[1.1]">
                            {locale === 'en' ? (
                                <>Belajar, Berjejaring, &amp; <span className="text-brand-blue">Tumbuh Bersama</span></>
                            ) : (
                                <>Wadah Talenta Digital untuk <span className="text-brand-blue">Kolaborasi &amp; Bertumbuh</span></>
                            )}
                        </h1>

                        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl">
                            {locale === 'en' 
                                ? 'An inclusive ecosystem connecting developers, designers, data enthusiasts, and tech founders across Indonesia to exchange real technical insights, solve errors, and unlock careers.' 
                                : 'Ekosistem inklusif yang menghubungkan para pengembang software, desainer produk, data enthusiast, dan founder startup di Indonesia untuk bertukar wawasan teknis riil, memecahkan error, dan membuka peluang karier.'}
                        </p>
                        
                        {/* Direct CTAs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-lg">
                            <a 
                                href={discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2.5 p-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl text-xs font-black shadow-lg shadow-[#5865F2]/15 transition-all cursor-pointer"
                            >
                                <MessageSquare className="w-4.5 h-4.5" />
                                {locale === 'en' ? 'Join Discord Server' : 'Gabung Server Discord'}
                            </a>
                            <a 
                                href={telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2.5 p-4 bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/50 text-text-main rounded-2xl text-xs font-black transition-all cursor-pointer shadow-sm"
                            >
                                <Users className="w-4.5 h-4.5 text-brand-blue" />
                                {locale === 'en' ? 'Telegram Channel' : 'Saluran Telegram'}
                            </a>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="lg:col-span-5">
                        <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl space-y-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-brand-blue" />
                                <h3 className="text-lg font-black text-text-main">
                                    {locale === 'en' ? 'Community Activity' : 'Aktivitas Komunitas'}
                                </h3>
                            </div>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' 
                                    ? 'Daily discussions, weekly code troubleshooting, and monthly industry seminars directly guided by Diggity technical mentors.' 
                                    : 'Diskusi harian yang hidup, sesi pemecahan masalah koding mingguan, dan seminar teknologi bulanan yang dipandu langsung oleh para Tech Lead Diggity.'}
                            </p>
                            
                            {/* Visual Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border">
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">1,800+</span>
                                    <span className="text-[10px] uppercase font-bold text-text-gray tracking-wider block">
                                        {locale === 'en' ? 'Active Members' : 'Anggota Aktif'}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">12+</span>
                                    <span className="text-[10px] uppercase font-bold text-text-gray tracking-wider block">
                                        {locale === 'en' ? 'Annual Seminars' : 'Seminar Tahunan'}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">100%</span>
                                    <span className="text-[10px] uppercase font-bold text-text-gray tracking-wider block">
                                        {locale === 'en' ? 'Free Access' : 'Akses Gratis'}
                                    </span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* 02. BIDANG MINAT (INTEREST GUILDS) */}
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                            {locale === 'en' ? 'CHANNELS & GUILDS' : 'RUANG DISKUSI & BIDANG MINAT'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-text-main">
                            {locale === 'en' ? 'Specialized Topics Tailored for Your Passion' : 'Fokus Pembahasan Sesuai Minatmu'}
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'Choose your channels in Discord and collaborate with peers who share identical technical challenges.' 
                                : 'Pilih ruang diskusi sesuai keahlianmu dan berdiskusilah dengan kawan yang menghadapi tantangan teknologi serupa.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interestGuilds.map((guild, idx) => {
                            const Icon = guild.icon;
                            return (
                                <SpotlightCard key={idx} className="p-6 border border-glass-border bg-white dark:bg-glass-bg rounded-2xl flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-extrabold text-text-main">{guild.title}</h3>
                                        <p className="text-xs text-text-gray leading-relaxed font-medium">
                                            {guild.desc}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-glass-border">
                                        {guild.tags.map((t, tIdx) => (
                                            <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-black/30 text-[10px] font-bold text-text-gray">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                {/* 03. PROGRAM KEGIATAN KOMUNITAS (STRICTLY SEMINAR) */}
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                            {locale === 'en' ? 'ROUTINE ACTIVITIES' : 'PROGRAM & JADWAL KEGIATAN'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-text-main">
                            {locale === 'en' ? 'Regular Learning & Networking Sessions' : 'Agenda Belajar & Pertemuan Rutin'}
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            {locale === 'en' 
                                ? 'Interactive events scheduled monthly and weekly to keep your skills sharp and current.' 
                                : 'Rangkaian kegiatan terstruktur bulanan dan mingguan untuk menjaga pembaruan kompetensimu.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {communityPrograms.map((prog, idx) => {
                            const Icon = prog.icon;
                            return (
                                <SpotlightCard key={idx} className="p-6 md:p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl flex flex-col justify-between shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-black text-[10px] tracking-wider uppercase">
                                                {prog.badge}
                                            </span>
                                            <span className="text-xs font-bold text-text-gray">
                                                {prog.schedule}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-text-main mb-2">{prog.title}</h3>
                                                <p className="text-xs md:text-sm text-text-gray leading-relaxed font-medium">
                                                    {prog.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                {/* 04. BENEFIT ANGGOTA */}
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                            {locale === 'en' ? 'MEMBER PERKS' : 'MANFAAT BERGABUNG'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-text-main">
                            {locale === 'en' ? 'Why Join the Diggity Community?' : 'Apa yang Akan Kamu Dapatkan?'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((b, idx) => {
                            const Icon = b.icon;
                            return (
                                <SpotlightCard key={idx} className="p-6 border border-glass-border bg-white dark:bg-glass-bg rounded-2xl flex items-start gap-4 text-left">
                                    <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4 className="text-sm md:text-base font-extrabold text-text-main">{b.title}</h4>
                                        <p className="text-xs md:text-sm text-text-gray leading-relaxed font-medium">
                                            {b.desc}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                {/* 05. CARA BERPARTISIPASI (3 LANGKAH) */}
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                            {locale === 'en' ? 'GET STARTED' : 'ALUR & CARA BERGABUNG'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-text-main">
                            {locale === 'en' ? '3 Simple Steps to Get Connected' : '3 Langkah Mudah Memulai'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((s, idx) => (
                            <SpotlightCard key={idx} className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl relative overflow-hidden">
                                <div className="text-4xl font-black text-brand-blue/20 mb-4">{s.number}</div>
                                <h3 className="text-lg font-black text-text-main mb-2">{s.title}</h3>
                                <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed">
                                    {s.desc}
                                </p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* 06. TESTIMONI ANGGOTA */}
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                            {locale === 'en' ? 'COMMUNITY VOICES' : 'KATA MEREKA'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-text-main">
                            {locale === 'en' ? 'Real Stories from Active Members' : 'Cerita Kawan yang Telah Terhubung'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <SpotlightCard key={idx} className="p-6 md:p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl flex flex-col justify-between text-left space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xs md:text-sm text-text-gray leading-relaxed font-medium italic">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-glass-border">
                                    <h4 className="text-sm font-extrabold text-text-main">{t.name}</h4>
                                    <span className="text-xs text-text-gray font-medium block">{t.role}</span>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* 07. FINAL CTA */}
                <div className="bg-gradient-to-br from-brand-blue/10 via-indigo-500/5 to-purple-500/10 rounded-3xl p-8 md:p-14 text-center border border-brand-blue/20">
                    <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4 tracking-tight">
                        {locale === 'en' ? 'Ready to Expand Your Tech Circle?' : 'Siap Menemukan Rekan Belajar & Kolaborasimu?'}
                    </h2>
                    <p className="text-sm md:text-base text-text-gray font-medium mb-8 max-w-xl mx-auto leading-relaxed">
                        {locale === 'en'
                            ? 'Free registration, open collaboration, and direct access to active developers across Indonesia.'
                            : 'Pendaftaran 100% gratis, terbuka untuk semua jenjang keahlian, dan terkoneksi langsung dengan mentor industri.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                        <a 
                            href={discordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {locale === 'en' ? 'Join Discord Community' : 'Gabung Komunitas Discord'}
                        </a>
                        <a 
                            href={telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue text-text-main font-bold rounded-xl text-xs transition-all cursor-pointer"
                        >
                            <Users className="w-4 h-4 text-brand-blue" />
                            {locale === 'en' ? 'Open Telegram Channel' : 'Buka Channel Telegram'}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
