'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    Clock, ChevronRight, Calendar, User, Tag, ArrowRight, Share2, 
    ArrowLeft, CheckCircle2, Sparkles, Building2, Briefcase, ExternalLink
} from 'lucide-react';

interface NewsDetailData {
    title: string;
    category: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    keyHighlights: { label: string; value: string }[];
    bodyHtml: {
        intro: string;
        sections: { heading: string; text: string; list?: string[] }[];
        quote?: { text: string; author: string };
    };
}

const NEWS_DATA_MAP: Record<string, NewsDetailData> = {
    'partnership-global-ai-leader': {
        title: 'Diggity Gandeng Mitra AI Global untuk Akselerasi Transformasi Industri',
        category: 'Partnership',
        excerpt: 'Diggity memperluas ekosistem kolaborasi strategis dengan penyedia platform kecerdasan buatan global guna menghadirkan solusi otomatisasi tingkat lanjut bagi klien korporasi di Indonesia.',
        author: 'Diggity Editorial Team',
        date: '28 September 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop',
        tags: ['Partnership', 'AI Innovation', 'Enterprise', 'Digital Transformation'],
        keyHighlights: [
            { label: 'Mitra Kolaborasi', value: 'Global AI Infrastructure Provider' },
            { label: 'Fokus Inisiatif', value: 'Enterprise LLM & Workflow Automation' },
            { label: 'Target Implementasi', value: 'Sektor Keuangan, Retail, dan Manufaktur' },
            { label: 'Jangka Waktu', value: 'Kemitraan Multitahun (2026-2029)' }
        ],
        bodyHtml: {
            intro: 'CV Diggity hari ini secara resmi menandatangani nota kesepahaman (MoU) kemitraan strategis dengan penyedia infrastruktur kecerdasan buatan terkemuka skala global. Kerja sama ini bertujuan mempercepat adopsi teknologi otomatisasi cerdas bagi pelaku bisnis di kawasan Asia Tenggara, khususnya Indonesia.',
            sections: [
                {
                    heading: 'Latar Belakang & Urgensi Kemitraan',
                    text: 'Tingginya permintaan pasar enterprise terhadap solusi enterprise search, intelligent data extraction, dan customer interaction berbasis AI mendorong Diggity untuk memperkuat kapabilitas rekayasa teknologinya.',
                    list: [
                        'Kebutuhan integrasi model bahasa besar (LLM) yang aman dan tersertifikasi ISO.',
                        'Penyederhanaan alur kerja operasional dari hitungan hari menjadi hitungan menit.',
                        'Penyediaan infrastruktur cloud komputasi berlatensi rendah untuk klien domestik.'
                    ]
                },
                {
                    heading: 'Program Bersama & Dampak Bisnis',
                    text: 'Melalui kolaborasi ini, Diggity akan menggabungkan modul Business Software miliknya dengan mesin analitik AI pihak mitra. Klien Diggity akan mendapatkan akses awal (early access) ke fitur otomasi prediktif dan laporan analitik mendalam.',
                }
            ],
            quote: {
                text: 'Kemitraan ini menegaskan posisi Diggity bukan sekadar software house konvensional, melainkan katalis transformasi digital yang memampukan bisnis beroperasi lebih cepat dan presisi.',
                author: 'M. Iqbal Hadiwibowo — Managing Director Diggity'
            }
        }
    },
    'peluncuran-diggity-hris-2': {
        title: 'Peluncuran Diggity HRIS 2.0 dengan Dukungan Otomasi AI Terpadu',
        category: 'Products',
        excerpt: 'Generasi terbaru platform Diggity HRIS resmi diluncurkan dengan penambahan fitur AI smart attendance, payroll otomatis, dan analitik produktivitas karyawan.',
        author: 'Product Engineering Team',
        date: '25 September 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        tags: ['Products', 'SaaS', 'HR Tech', 'Artificial Intelligence'],
        keyHighlights: [
            { label: 'Produk', value: 'Diggity HRIS 2.0 (SaaS Cloud)' },
            { label: 'Fitur Utama', value: 'Geofencing, Auto-Payroll, Smart KPI' },
            { label: 'Kapasitas', value: 'Scalable hingga 10.000+ Karyawan' },
            { label: 'Model Lisensi', value: 'Berlangganan Fleksibel (Monthly / Annual)' }
        ],
        bodyHtml: {
            intro: 'Setelah melalui serangkaian pengujian beta bersama 15 perusahaan percontohan, tim riset dan pengembangan software Diggity resmi meluncurkan Diggity HRIS versi 2.0. Pembaruan ini menitikberatkan pada efisiensi departemen Human Capital dan penghitungan payroll tanpa friksi.',
            sections: [
                {
                    heading: 'Inovasi Fitur Generasi 2.0',
                    text: 'Diggity HRIS 2.0 menyematkan algoritma pendeteksi anomali absensi otomatis yang mencegah fraud lokasi dan waktu kehadiran, terintegrasi langsung dengan modul PPh 21 dan BPJS Ketenagakerjaan.',
                    list: [
                        'Kalkulasi payroll sekali klik dengan slip gaji terenkripsi otomatis dikirim ke email karyawan.',
                        'Dashboard interaktif untuk memonitor beban kerja dan retensi talent secara real-time.',
                        'Self-service portal berbasis Progressive Web App (PWA) yang ringan diakses lewat smartphone.'
                    ]
                }
            ]
        }
    },
    'academy-batch-baru-bootcamp': {
        title: 'Diggity Academy Buka Pendaftaran Batch Baru Full-Stack & AI Bootcamp',
        category: 'Academy',
        excerpt: 'Kurikulum intensif 16 minggu dirancang bersama para Tech Lead praktisi industri untuk mempersiapkan talenta digital Indonesia siap kerja.',
        author: 'Diggity Academy',
        date: '20 September 2026',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
        tags: ['Academy', 'Bootcamp', 'Talent Development', 'FullStack'],
        keyHighlights: [
            { label: 'Program', value: 'Intensive Full-Stack & Applied AI' },
            { label: 'Durasi Belajar', value: '16 Minggu (Hybrid Weekend & Night)' },
            { label: 'Fasilitas', value: 'Mentoring 1-on-1 & Job Connect Access' },
            { label: 'Peluang Karier', value: 'Penyaluran ke Partner Network Diggity' }
        ],
        bodyHtml: {
            intro: 'Diggity Academy resmi membuka gelombang registrasi untuk program Bootcamp Unggulan periode Q4 2026. Program ini dirancang khusus bagi mahasiswa tingkat akhir, fresh graduate, maupun profesional yang ingin beralih karir ke dunia rekayasa perangkat lunak modern.',
            sections: [
                {
                    heading: 'Kurikulum Berbasis Kasus Industri Nyata',
                    text: 'Peserta tidak hanya mempelajari dasar sintaks, tetapi langsung mempraktikkan arsitektur modern seperti Next.js, Laravel API, PostgreSQL, containerization Docker, hingga integrasi model kecerdasan buatan.',
                    list: [
                        'Pengerjaan proyek riil portofolio siap presentasi kepada calon employer.',
                        'Sesi bedah portofolio dan simulasi interview teknis oleh Lead Developer.',
                        'Akses gratis ke repository komponen internal dan komunitas Discord eksklusif.'
                    ]
                }
            ]
        }
    },
    'sertifikasi-iso-27001': {
        title: 'Pencapaian: Diggity Resmi Raih Sertifikasi Keamanan Informasi ISO 27001:2022',
        category: 'Achievement',
        excerpt: 'Langkah nyata Diggity dalam menjamin standar keamanan data dan kerahasiaan informasi kelas dunia untuk seluruh produk dan layanan klien.',
        author: 'Corporate Governance',
        date: '15 September 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
        tags: ['ISO 27001', 'Security', 'Compliance', 'Enterprise Trust'],
        keyHighlights: [
            { label: 'Sertifikasi', value: 'ISO/IEC 27001:2022' },
            { label: 'Ruang Lingkup', value: 'Software Engineering, Cloud SaaS, & Data Ops' },
            { label: 'Badan Audit', value: 'Lembaga Sertifikasi Terakreditasi Internasional' },
            { label: 'Validitas', value: 'Siklus 3 Tahun dengan Surveillance Tahunan' }
        ],
        bodyHtml: {
            intro: 'Sebagai bukti komitmen terhadap integritas data dan keamanan siber, Diggity berhasil meraih akreditasi sertifikasi ISO/IEC 27001:2022 untuk Sistem Manajemen Keamanan Informasi (SMKI).',
            sections: [
                {
                    heading: 'Jaminan Keamanan untuk Klien Enterprise',
                    text: 'Audit ketat mencakup kontrol akses aplikasi, enkripsi database, prosedur tanggap insiden siber, serta manajemen kontinuitas bisnis (Business Continuity Plan).'
                }
            ]
        }
    }
};

const DEFAULT_NEWS: NewsDetailData = {
    title: 'Pembaruan Ekosistem Digital dan Layanan Berkelanjutan Diggity',
    category: 'Company',
    excerpt: 'Simak langkah terbaru Diggity dalam mengembangkan platform teknologi, kemitraan strategis, dan program pemberdayaan talenta digital di Indonesia.',
    author: 'Diggity Communications',
    date: '10 September 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Diggity', 'Updates', 'Technology', 'Innovation'],
    keyHighlights: [
        { label: 'Kategori Berita', value: 'Corporate & Technology Update' },
        { label: 'Penerbit', value: 'Diggity Media & Communications' },
        { label: 'Akses Informasi', value: 'Publik & Terbuka' },
        { label: 'Verifikasi', value: 'Diterbitkan Resmi oleh Direksi' }
    ],
    bodyHtml: {
        intro: 'Diggity terus berkomitmen menghadirkan solusi teknologi mutakhir yang mendukung skalabilitas bisnis, efisiensi operasional organisasi, dan pertumbuhan karier talenta digital di seluruh Indonesia.',
        sections: [
            {
                heading: 'Fokus Pengembangan Berkelanjutan',
                text: 'Melalui integrasi divisi IT Solutions, Digital Products, Diggity Academy, dan Career Network, kami memastikan setiap klien dan talenta mendapatkan ekosistem digital yang lengkap, adaptif, dan siap menghadapi tren masa depan.'
            }
        ]
    }
};

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { language: locale } = useLanguage();

    const news = NEWS_DATA_MAP[slug] || {
        ...DEFAULT_NEWS,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-16 overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* 01. BREADCRUMB */}
                <nav className="flex items-center gap-2 text-xs font-bold text-text-gray mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <Link href="/insights" className="hover:text-indigo-500 transition-colors">Insights</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <Link href="/insights/news" className="hover:text-indigo-500 transition-colors">News</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <span className="text-indigo-500 truncate max-w-[200px]">{news.category}</span>
                </nav>

                {/* 02. JUDUL BERITA */}
                <ScrollReveal animation="fade-up" className="mb-6">
                    <div className="inline-flex px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-black text-xs uppercase tracking-widest mb-4">
                        {news.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-text-main leading-tight mb-6">
                        {news.title}
                    </h1>
                    <p className="text-base md:text-xl text-text-gray font-medium leading-relaxed mb-6">
                        {news.excerpt}
                    </p>
                    
                    {/* 03. METADATA BERITA */}
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-semibold text-text-gray pb-6 border-b border-glass-border">
                        <div className="flex items-center gap-1.5 text-text-main">
                            <User className="w-4 h-4 text-indigo-500" />
                            {news.author}
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            {news.date}
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-glass-border"></div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            {news.readTime}
                        </div>
                    </div>
                </ScrollReveal>

                {/* 04. GAMBAR UTAMA BERITA */}
                <ScrollReveal animation="fade-up" className="mb-10">
                    <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </ScrollReveal>

                {/* 05. HIGHLIGHT / KEY INFORMATION BOX */}
                {news.keyHighlights && news.keyHighlights.length > 0 && (
                    <ScrollReveal animation="fade-up" className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                            <h3 className="text-xs font-black text-text-gray uppercase tracking-widest">
                                {locale === 'en' ? 'KEY HIGHLIGHTS & SUMMARY' : 'POIN UTAMA & INFORMASI PENTING'}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {news.keyHighlights.map((hl, idx) => (
                                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border/50">
                                    <div className="text-[11px] font-bold text-text-gray uppercase tracking-wider mb-1">{hl.label}</div>
                                    <div className="text-sm font-bold text-text-main">{hl.value}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* 06. ISI BERITA LENGKAP */}
                <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-text-gray prose-p:leading-relaxed mb-12">
                    <p className="text-lg font-medium text-text-main leading-relaxed">
                        {news.bodyHtml.intro}
                    </p>

                    {news.bodyHtml.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="my-8">
                            <h2 className="text-2xl font-black text-text-main mb-4">{sec.heading}</h2>
                            <p className="text-text-gray mb-4">{sec.text}</p>
                            {sec.list && (
                                <ul className="space-y-2 my-4 pl-0 list-none">
                                    {sec.list.map((item, lIdx) => (
                                        <li key={lIdx} className="flex items-start gap-3 text-sm md:text-base text-text-main font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {news.bodyHtml.quote && (
                        <blockquote className="my-8 p-6 rounded-2xl bg-indigo-500/5 border-l-4 border-indigo-500 not-italic">
                            <p className="text-base md:text-lg font-bold text-text-main mb-2">
                                &ldquo;{news.bodyHtml.quote.text}&rdquo;
                            </p>
                            <cite className="text-xs font-bold text-indigo-600 block">
                                — {news.bodyHtml.quote.author}
                            </cite>
                        </blockquote>
                    )}
                </article>

                {/* 07. TAG TOPIK */}
                <div className="pt-6 pb-10 border-t border-glass-border flex flex-wrap items-center gap-2 mb-12">
                    <Tag className="w-4 h-4 text-text-gray mr-2" />
                    {news.tags.map((tag, tIdx) => (
                        <Link 
                            key={tIdx} 
                            href={`/insights/news?search=${encodeURIComponent(tag)}`}
                            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-gray hover:text-indigo-500 hover:border-indigo-500/40 transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>

                {/* 08. BERITA TERKAIT / NAVIGASI KEMBALI */}
                <div className="mb-14 flex items-center justify-between">
                    <Link 
                        href="/insights/news" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-text-gray hover:text-indigo-500 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {locale === 'en' ? 'Back to All News' : 'Kembali ke Seluruh Berita'}
                    </Link>
                    <Link 
                        href="/insights" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                        {locale === 'en' ? 'Insights Hub' : 'Pusat Wawasan'}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 09. CTA LAYANAN DIGGITY (SOLUTIONS, PRODUCTS, ACADEMY, CAREER) */}
                <ScrollReveal animation="fade-up" className="border-t border-glass-border pt-12">
                    <div className="bg-gradient-to-br from-indigo-500/10 via-brand-blue/5 to-purple-500/10 rounded-3xl p-8 md:p-12 text-center border border-indigo-500/20">
                        <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 block mb-2">
                            {locale === 'en' ? 'DIGGITY ECOSYSTEM' : 'EKOSISTEM LAYANAN DIGGITY'}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-text-main mb-4">
                            {locale === 'en' ? 'Ready to Scale with Diggity?' : 'Siap Bertransformasi Bersama Diggity?'}
                        </h3>
                        <p className="text-text-gray text-sm md:text-base font-medium mb-8 max-w-xl mx-auto leading-relaxed">
                            {locale === 'en'
                                ? 'Accelerate your digital transformation through our custom software solutions, ready-to-use SaaS products, certified academy programs, or professional career network.'
                                : 'Akselerasikan pertumbuhan digital bisnis Anda lewat solusi software kustom, produk SaaS siap pakai, program pelatihan Academy tersertifikasi, atau jejaring karier profesional.'}
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                            <Link 
                                href="/solutions" 
                                className="px-4 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-indigo-500/50 text-text-main font-bold text-xs transition-all hover:shadow-md flex flex-col items-center justify-center gap-1"
                            >
                                <span className="font-extrabold text-sm text-indigo-600">Solutions</span>
                                <span className="text-[10px] text-text-gray">Layanan IT Kustom</span>
                            </Link>
                            <Link 
                                href="/products" 
                                className="px-4 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-indigo-500/50 text-text-main font-bold text-xs transition-all hover:shadow-md flex flex-col items-center justify-center gap-1"
                            >
                                <span className="font-extrabold text-sm text-indigo-600">Products</span>
                                <span className="text-[10px] text-text-gray">SaaS &amp; Templates</span>
                            </Link>
                            <Link 
                                href="/academy" 
                                className="px-4 py-3 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-indigo-500/50 text-text-main font-bold text-xs transition-all hover:shadow-md flex flex-col items-center justify-center gap-1"
                            >
                                <span className="font-extrabold text-sm text-indigo-600">Academy</span>
                                <span className="text-[10px] text-text-gray">Bootcamp &amp; Belajar</span>
                            </Link>
                            <Link 
                                href="/job-connect" 
                                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md flex flex-col items-center justify-center gap-1"
                            >
                                <span className="font-extrabold text-sm">Career</span>
                                <span className="text-[10px] text-indigo-200">Loker &amp; Talent</span>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </div>
    );
}
