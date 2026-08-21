import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getLocaleServer } from '../../lib/locale-server';

export const metadata: Metadata = {
  title: 'Komunitas Digital Eksklusif - Diggity',
  description: 'Bergabunglah dengan ribuan talenta digital, developer, desainer, dan founder dalam komunitas eksklusif Diggity. Dapatkan akses ke mentor, event, dan peluang karir.',
};
import { 
    Users, 
    ArrowLeft, 
    ArrowRight, 
    MessageSquare, 
    Sparkles, 
    Code, 
    Briefcase, 
    Presentation, 
    Share2, 
    Star 
} from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import { api } from '../../lib/api';

export default async function DigitalCommunityPage() {
    const locale = await getLocaleServer();
    let settings = null;
    try {
        settings = await api.getCompanySettings();
    } catch (e) {
        console.error(e);
    }

    const discordUrl = settings?.discord_url || 'https://discord.gg';
    const telegramUrl = settings?.telegram_url || 'https://t.me';

    const benefits = locale === 'en' ? [
        {
            title: 'Exclusive Job Vacancy Info',
            description: 'Get freelance project, internship, remote work info, and internal job vacancies from Diggity partners before they are published to external job portals.',
            icon: Briefcase
        },
        {
            title: 'Monthly Webinar & Discussion Sessions',
            description: 'Join monthly free live mentoring sharing sessions, coding portfolio reviews, and tech trend (AI/Web/Mobile) reviews with our senior Tech Leads.',
            icon: Presentation
        },
        {
            title: 'Q&A & Debugging Forum',
            description: 'A place to discuss, ask about coding errors, and exchange solutions with fellow developers of various skill levels.',
            icon: Code
        },
        {
            title: 'Professional Network & Partnerships',
            description: 'For those who are tech founders, freelancers, or business owners, here you can collaborate to find clients, partners, or co-founders.',
            icon: Share2
        }
    ] : [
        {
            title: 'Info Lowongan Kerja Eksklusif',
            description: 'Dapatkan info project freelance, magang, remote work, serta lowongan pekerjaan internal partner Diggity sebelum dipublikasikan ke job portal luar.',
            icon: Briefcase
        },
        {
            title: 'Sesi Webinar & Diskusi Bulanan',
            description: 'Ikuti sesi mentoring live sharing, bedah portfolio koding, dan bedah tren teknologi (AI/Web/Mobile) bulanan gratis bersama Tech Lead senior kami.',
            icon: Presentation
        },
        {
            title: 'Forum Tanya Jawab & Debugging',
            description: 'Tempat berdiskusi, bertanya seputar error koding, serta bertukar solusi dengan sesama pengembang (peer developers) dari berbagai level keahlian.',
            icon: Code
        },
        {
            title: 'Jaringan Profesional & Kemitraan',
            description: 'Bagi kawan yang merupakan tech founder, freelancer, atau pemilik bisnis, di sini kawan dapat berkolaborasi menemukan klien, partner, atau co-founder.',
            icon: Share2
        }
    ];

    const testimonials = locale === 'en' ? [
        {
            name: 'Agus Raharjo',
            role: 'Frontend Dev, Surabaya',
            quote: 'Joining Diggity Discord got me my first freelance web project within 2 weeks of networking in the project-match channel!'
        },
        {
            name: 'Dewi Fitriani',
            role: 'UI/UX Designer, Jakarta',
            quote: 'The monthly webinar materials and portfolio sharing sessions are very substantial, critiqued directly by industry practitioners. Very helpful for me to switch careers!'
        },
        {
            name: 'Budi Santoso',
            role: 'Tech Founder, Yogyakarta',
            quote: 'I found a CTO co-founder for my logistics startup through discussions in this community\'s B2B Networking channel. Very active community!'
        }
    ] : [
        {
            name: 'Agus Raharjo',
            role: 'Frontend Dev, Surabaya',
            quote: 'Gabung di Discord Diggity bikin saya dapat project freelance web pertama saya dalam waktu 2 minggu setelah berjejaring di channel project-match!'
        },
        {
            name: 'Dewi Fitriani',
            role: 'UI/UX Designer, Jakarta',
            quote: 'Materi webinar bulanan dan sesi sharing portfolio-nya berbobot sekali, dikritik langsung oleh praktisi industri. Sangat membantu saya switch career!'
        },
        {
            name: 'Budi Santoso',
            role: 'Tech Founder, Yogyakarta',
            quote: 'Saya menemukan CTO co-founder untuk startup logistik saya melalui diskusi di channel B2B Networking komunitas ini. Komunitas yang sangat aktif!'
        }
    ];

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">
                
                {/* Back Button */}
                <div className="flex items-center">
                    <Link 
                        href="/insights"
                        className="inline-flex items-center gap-2 text-xs font-bold text-text-gray hover:text-brand-blue transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        {locale === 'en' ? 'Back to Insights & Education' : 'Kembali ke Wawasan & Edukasi'}
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-text-main leading-tight">
                            {locale === 'en' ? <>Learn, Network, &amp; <span className="text-brand-blue">Grow Together</span></> : <>Belajar, Berjejaring, &amp; <span className="text-brand-blue">Tumbuh Bersama</span></>}
                        </h1>
                        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed">
                            {locale === 'en' ? 'An inclusive collaboration platform for digital talents, students, professional developers, and tech business founders in Indonesia to share knowledge and job opportunities.' : 'Wadah kolaborasi inklusif bagi talenta digital, mahasiswa, pengembang profesional, hingga founder bisnis teknologi di Indonesia untuk saling berbagi ilmu dan peluang kerja.'}
                        </p>
                        
                        {/* Direct CTAs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <a 
                                href={discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl text-xs font-black shadow-lg shadow-[#5865F2]/10 transition-all cursor-pointer"
                            >
                                <MessageSquare className="w-4.5 h-4.5" />
                                {locale === 'en' ? 'Join Community Discord' : 'Gabung Discord Komunitas'}
                            </a>
                            <a 
                                href={telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-main rounded-2xl text-xs font-black transition-all cursor-pointer"
                            >
                                <Users className="w-4.5 h-4.5 text-brand-blue" />
                                {locale === 'en' ? 'Telegram Channel' : 'Saluran Telegram'}
                            </a>
                        </div>
                    </div>

                    {/* Stats & Interactive Panel */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl blur-2xl -z-10" />
                        <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30 rounded-3xl space-y-6">
                            <h3 className="text-lg font-extrabold text-text-main">{locale === 'en' ? 'Start Connecting Today' : 'Mulai Terhubung Hari Ini'}</h3>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' ? 'Thousands of messages sent daily, hundreds of technical questions solved, and dozens of freelance vacancies shared every month by fellow members.' : 'Ribuan pesan terkirim harian, ratusan pertanyaan teknis terpecahkan, serta puluhan lowongan freelance dibagikan setiap bulannya oleh sesama anggota.'}
                            </p>
                            
                            {/* Visual Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border/60">
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">1,500+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'Active Members' : 'Anggota Aktif'}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">12+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'Annual Webinars' : 'Webinar Tahunan'}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">50+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'Bug Solutions / Month' : 'Solusi Bug / Bulan'}</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* Core Benefits */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            {locale === 'en' ? 'What Are the Benefits of Joining?' : 'Apa Saja Keuntungan Bergabung?'}
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            {locale === 'en' ? 'A learning platform with direct support from fellow developers.' : 'Sebuah wadah belajar dengan dukungan langsung dari sesama pengembang.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((b, idx) => {
                            const Icon = b.icon;
                            return (
                                <SpotlightCard key={idx} className="p-6 border border-glass-border rounded-2xl flex items-start gap-4 text-left">
                                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4 className="text-sm font-extrabold text-text-main">{b.title}</h4>
                                        <p className="text-xs text-text-gray leading-relaxed font-medium">
                                            {b.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                {/* Mock Testimonial Grid */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            {locale === 'en' ? 'What They Say About Us' : 'Kata Mereka yang Sudah Bergabung'}
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            {locale === 'en' ? 'Success stories, real collaborations, and new insights gained by community members.' : 'Kisah sukses, kolaborasi nyata, dan wawasan baru yang didapatkan oleh para anggota komunitas.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <SpotlightCard key={idx} className="p-6 border border-glass-border bg-glass-bg/40 rounded-2xl flex flex-col justify-between text-left space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-1 text-brand-blue">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-text-gray leading-relaxed font-medium italic">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-glass-border/30">
                                    <h4 className="text-xs font-black text-text-main">{t.name}</h4>
                                    <span className="text-[10px] text-text-muted font-bold block">{t.role}</span>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
