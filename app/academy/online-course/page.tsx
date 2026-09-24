'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowRight, PlayCircle, Clock, Award, MessageSquare, 
    MonitorSmartphone, Star, Search, Filter, BookOpen, Users
} from 'lucide-react';

export default function OnlineCourseLandingPage() {
    const { language: locale } = useLanguage();
    const [courses, setCourses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { api } = await import('../../../lib/api');
                const data = await api.getAcademyCourses();
                setCourses(data.filter(c => c.type === 'online_course' || c.type === null));
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
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden">
            
            {/* =========================================
                FASE 1: HERO SECTION
            ========================================= */}
            <section className="relative pt-20 pb-32 px-6 lg:px-8 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
                    <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-[0.03]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <ScrollReveal animation="fade-up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue mb-8">
                        <PlayCircle className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-wide uppercase">
                            {locale === 'en' ? 'Diggity Online Courses' : 'Diggity Online Course'}
                        </span>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={100} className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tight leading-[1.1] mb-8">
                            {locale === 'en' 
                                ? 'Master New Skills.' 
                                : 'Tingkatkan Skillmu.'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-400 to-purple-500">
                                {locale === 'en' ? 'Anytime, Anywhere.' : 'Kapan Saja, Dari Mana Saja.'}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-gray font-medium mb-12 leading-relaxed">
                            {locale === 'en'
                                ? 'Learn highly demanded digital skills directly from industry practitioners with high-quality video content tailored to your pace.'
                                : 'Pelajari skill digital in-demand langsung dari praktisi industri melalui materi video berkualitas yang bisa diakses seumur hidup.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#courses" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 group">
                                {locale === 'en' ? 'Explore Courses' : 'Eksplorasi Kelas'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#benefits" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-glass-bg border border-glass-border text-text-main font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center">
                                {locale === 'en' ? 'Learn More' : 'Pelajari Lebih Lanjut'}
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Stats */}
                    <ScrollReveal animation="fade-up" delay={200} className="mt-20 pt-10 border-t border-glass-border grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { value: '50+', labelEn: 'Premium Courses', labelId: 'Kelas Premium' },
                            { value: '15k+', labelEn: 'Active Students', labelId: 'Siswa Aktif' },
                            { value: '4.8/5', labelEn: 'Average Rating', labelId: 'Rata-rata Rating' },
                            { value: '24/7', labelEn: 'Lifetime Access', labelId: 'Akses Seumur Hidup' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <h4 className="text-3xl md:text-4xl font-black text-text-main mb-2">{stat.value}</h4>
                                <p className="text-sm font-semibold text-text-gray">{locale === 'en' ? stat.labelEn : stat.labelId}</p>
                            </div>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* =========================================
                FASE 1: WHY ONLINE COURSE (BENEFITS)
            ========================================= */}
            <section id="benefits" className="py-24 px-6 relative z-10 bg-white/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <ScrollReveal animation="fade-up">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Why Choose Us</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'Learn at Your Own Pace' : 'Belajar dengan Ritmemu Sendiri'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium">
                                {locale === 'en'
                                    ? 'Our online courses are designed for maximum flexibility without compromising learning quality.'
                                    : 'Online course kami didesain untuk fleksibilitas maksimal tanpa mengorbankan kualitas pembelajaran.'}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                icon: Clock, 
                                titleEn: 'Self-Paced Learning', 
                                titleId: 'Belajar Fleksibel', 
                                descEn: 'Learn whenever you have time, no rigid schedules to follow.', 
                                descId: 'Belajar kapan saja tanpa terikat jadwal kelas yang kaku.' 
                            },
                            { 
                                icon: MonitorSmartphone, 
                                titleEn: 'Lifetime Access', 
                                titleId: 'Akses Seumur Hidup', 
                                descEn: 'Pay once and access the materials and future updates forever.', 
                                descId: 'Bayar sekali, nikmati akses materi & update seumur hidup.' 
                            },
                            { 
                                icon: Award, 
                                titleEn: 'Official Certificate', 
                                titleId: 'Sertifikat Resmi', 
                                descEn: 'Get a certificate of completion to boost your professional profile.', 
                                descId: 'Dapatkan sertifikat penyelesaian untuk menunjang kariermu.' 
                            },
                            { 
                                icon: MessageSquare, 
                                titleEn: 'Community Forum', 
                                titleId: 'Forum Diskusi', 
                                descEn: 'Connect with mentors and peers in our dedicated community.', 
                                descId: 'Terhubung dengan mentor dan sesama siswa di forum komunitas.' 
                            },
                        ].map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <SpotlightCard className="p-8 h-full bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 transition-all rounded-3xl text-center group shadow-sm hover:shadow-xl hover:-translate-y-1">
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-8 h-8" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-main mb-3">{locale === 'en' ? benefit.titleEn : benefit.titleId}</h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">{locale === 'en' ? benefit.descEn : benefit.descId}</p>
                                    </SpotlightCard>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 2: COURSE CATALOG & FILTERS
            ========================================= */}
            <section id="courses" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <ScrollReveal animation="slide-right" className="max-w-2xl">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Premium Catalog</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Explore Our Courses' : 'Eksplorasi Katalog Kelas'}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal animation="slide-left">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-gray" />
                                <input 
                                    type="text" 
                                    placeholder={locale === 'en' ? 'Search courses...' : 'Cari kelas...'}
                                    className="w-full md:w-72 pl-12 pr-4 py-3 bg-white dark:bg-glass-bg border border-glass-border rounded-xl focus:outline-none focus:border-brand-blue/50 transition-colors text-text-main placeholder:text-text-gray/50"
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Filters */}
                    <ScrollReveal animation="fade-up" className="flex items-center gap-4 overflow-x-auto hide-scrollbar mb-12 pb-2">
                        {['All Categories', 'Programming', 'UI/UX Design', 'Digital Marketing', 'Data Science', 'Business'].map((cat, i) => (
                            <button 
                                key={i}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                                    i === 0 
                                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                                    : 'bg-white dark:bg-glass-bg border border-glass-border text-text-gray hover:text-text-main hover:border-brand-blue/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </ScrollReveal>

                    {/* Course Grid */}
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
                            <p className="text-text-gray">{locale === 'en' ? 'Loading courses...' : 'Memuat kelas...'}</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-text-gray">{locale === 'en' ? 'No courses available right now.' : 'Belum ada kelas yang tersedia.'}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course, i) => (
                                <ScrollReveal key={course.id || i} animation="fade-up" delay={i * 50}>
                                    <Link href={`/academy/course/${course.slug}`} className="block h-full">
                                        <div className="group bg-white dark:bg-glass-bg border border-glass-border rounded-3xl overflow-hidden hover:border-brand-blue/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col h-full cursor-pointer">
                                            {/* Thumbnail */}
                                            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                                {course.image ? (
                                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                                                        <BookOpen className="w-12 h-12 opacity-20" />
                                                    </div>
                                                )}
                                                {course.badge && (
                                                    <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded-lg shadow-sm">
                                                        {course.badge}
                                                    </div>
                                                )}
                                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-lg flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    {course.rating || '0.0'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <span className="text-xs font-bold text-brand-blue tracking-wider uppercase mb-2 block">{course.category?.name || 'Uncategorized'}</span>
                                                <h3 className="text-lg font-bold text-text-main mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-text-gray font-medium mb-6">by {course.instructor_name || 'Diggity Team'}</p>
                                                
                                                <div className="mt-auto border-t border-glass-border pt-4 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        {course.original_price && (
                                                            <span className="text-xs text-text-gray line-through decoration-red-500/50">{formatIDR(course.original_price)}</span>
                                                        )}
                                                        <span className="text-lg font-black text-text-main">{formatIDR(course.price)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-text-gray font-medium bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                                        <Users className="w-3 h-3" />
                                                        {course.total_students || 0}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <ScrollReveal animation="fade-up">
                            <button className="px-8 py-4 bg-white dark:bg-glass-bg border border-glass-border text-brand-blue font-bold rounded-2xl hover:bg-brand-blue hover:text-white transition-all inline-flex items-center gap-2 group shadow-sm hover:shadow-xl">
                                {locale === 'en' ? 'Load More Courses' : 'Muat Lebih Banyak Kelas'}
                                <Search className="w-4 h-4" />
                            </button>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: TESTIMONIALS
            ========================================= */}
            <section className="py-24 px-6 relative z-10 bg-gray-50/50 dark:bg-black/20 border-y border-glass-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <ScrollReveal animation="fade-up">
                            <span className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2 block">Success Stories</span>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-6">
                                {locale === 'en' ? 'Loved by Thousands' : 'Dipercaya Ribuan Siswa'}
                            </h2>
                            <p className="text-lg text-text-gray font-medium">
                                {locale === 'en'
                                    ? 'Hear what our students have to say about their learning experience with Diggity.'
                                    : 'Dengarkan apa kata mereka yang sudah merasakan pengalaman belajar di Diggity.'}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Reza Pahlevi",
                                role: "Frontend Developer",
                                quote: locale === 'en' ? "The React course is incredibly detailed. The self-paced format allowed me to study after work." : "Materi kelas React-nya sangat daging. Format self-paced bikin saya bisa belajar santai sepulang kerja.",
                            },
                            {
                                name: "Dina Mariana",
                                role: "UI/UX Designer",
                                quote: locale === 'en' ? "Amazing value for money! I got lifetime access to materials that keep getting updated." : "Harga terjangkau untuk akses seumur hidup! Materinya juga sering di-update ngikutin tren.",
                            },
                            {
                                name: "Kelvin Wijaya",
                                role: "Digital Marketer",
                                quote: locale === 'en' ? "The community forum is highly active. Every time I get stuck, the mentors are there to help." : "Forum diskusinya sangat aktif. Tiap kali stuck ngerjain project, mentor selalu responsif membantu.",
                            }
                        ].map((alumni, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div className="p-8 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl h-full flex flex-col justify-between hover:-translate-y-1 transition-transform shadow-sm hover:shadow-xl hover:shadow-brand-blue/5">
                                    <div>
                                        <div className="flex gap-1 mb-6 text-orange-400">
                                            {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                                        </div>
                                        <p className="text-text-main font-medium leading-relaxed mb-8 italic">
                                            "{alumni.quote}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xl">
                                            {alumni.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main">{alumni.name}</h4>
                                            <p className="text-sm text-text-gray font-medium">{alumni.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: FAQ
            ========================================= */}
            <section className="py-24 px-6 relative z-10 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                            {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {[
                            {
                                qEn: 'How long do I have access to the course?',
                                qId: 'Berapa lama batas waktu akses kelasnya?',
                                aEn: 'You get lifetime access! Once you purchase a course, you can watch it anytime without expiration.',
                                aId: 'Anda mendapatkan akses seumur hidup (lifetime). Sekali bayar, kelas bisa diakses kapanpun tanpa batas waktu.'
                            },
                            {
                                qEn: 'Will I get a certificate?',
                                qId: 'Apakah saya akan mendapatkan sertifikat?',
                                aEn: 'Yes, you will receive an official Certificate of Completion once you finish all materials and quizzes.',
                                aId: 'Ya, Anda akan mendapatkan Sertifikat Penyelesaian resmi setelah menyelesaikan semua materi dan kuis.'
                            },
                            {
                                qEn: 'Can I ask questions if I do not understand?',
                                qId: 'Apakah bisa bertanya jika ada materi yang kurang paham?',
                                aEn: 'Absolutely. We provide a dedicated community forum where you can ask mentors and other students.',
                                aId: 'Sangat bisa. Kami menyediakan forum diskusi khusus di mana Anda bisa bertanya kepada mentor maupun siswa lain.'
                            },
                            {
                                qEn: 'Is there a refund policy?',
                                qId: 'Apakah ada garansi uang kembali?',
                                aEn: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with the course content.',
                                aId: 'Ya, kami memberikan garansi 100% uang kembali dalam 7 hari jika Anda merasa materi kelas tidak sesuai harapan.'
                            }
                        ].map((faq, idx) => (
                            <ScrollReveal key={idx} animation="fade-up" delay={idx * 50}>
                                <details className="group bg-white dark:bg-glass-bg border border-glass-border rounded-2xl [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300">
                                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors hover:text-brand-blue">
                                        <span className="text-lg">{locale === 'en' ? faq.qEn : faq.qId}</span>
                                        <span className="shrink-0 rounded-full bg-gray-50 dark:bg-white/5 p-2 transition duration-300 group-open:-rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-text-gray font-medium leading-relaxed">
                                        {locale === 'en' ? faq.aEn : faq.aId}
                                    </div>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                FASE 3: FINAL CTA
            ========================================= */}
            <section className="pb-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="bg-gradient-to-br from-brand-blue to-cyan-500 rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden border border-white/20 shadow-2xl">
                            {/* Decorative background patterns */}
                            <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none"></div>
                            
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                                    {locale === 'en' ? 'Start Upskilling Today!' : 'Mulai Upgrade Skillmu Hari Ini!'}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">
                                    {locale === 'en' 
                                        ? 'Join thousands of professionals who have advanced their careers with our premium courses.' 
                                        : 'Bergabunglah dengan ribuan profesional yang telah memajukan karier mereka dengan kelas premium kami.'}
                                </p>
                                
                                <div className="flex justify-center">
                                    <Link href="#courses" scroll={false} className="px-10 py-5 bg-white text-brand-blue font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                                        {locale === 'en' ? 'Browse All Courses' : 'Lihat Semua Kelas'}
                                        <ArrowRight className="w-5 h-5" />
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
