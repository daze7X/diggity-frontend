'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    ArrowLeft, Target, Rocket, Lightbulb, 
    Settings, CheckCircle2, TrendingUp, Quote, Building2, Briefcase, Calendar, ChevronRight
} from 'lucide-react';

interface CaseStudyDetail {
    client: string;
    division: 'Solutions' | 'Products' | 'Academy';
    industry: string;
    scale: string;
    scope: string;
    duration: string;
    year: string;
    title: string;
    desc?: string;
    excerpt: string;
    challenge: string[];
    objective: string[];
    approach: string;
    solution: string;
    results: { value: string; label: string }[];
    impact: string;
    takeaways: string[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
}

const CASE_STUDIES_MAP: Record<string, CaseStudyDetail> = {
    'carepro-lead-generation': {
        client: 'CarePro Clinic',
        division: 'Solutions',
        industry: 'Healthcare',
        scale: 'Small and Medium Business',
        scope: 'Digital Marketing & Growth',
        duration: '2 Bulan',
        year: '2026',
        title: 'CarePro Meningkatkan Lead Acquisition 320% melalui Strategi Digital Marketing Terukur',
        excerpt: 'CarePro bekerja sama dengan Diggity untuk membangun corong akuisisi digital yang presisi melalui kombinasi Meta Ads, Google Search Ads, landing page berkecepatan tinggi, dan pelacakan konversi end-to-end.',
        challenge: [
            'Digital acquisition sebelumnya tidak terukur dan rasio konversi klik ke konsultasi sangat rendah.',
            'Targeting audiens terlalu umum sehingga banyak menghabiskan budget iklan pada audiens non-prospektif.',
            'Ketiadaan tracking event server-side menyebabkan kehilangan data atribusi pada platform iOS.'
        ],
        objective: [
            'Meningkatkan perolehan qualified leads konsultasi medis hingga minimal 200%.',
            'Menekan Cost Per Lead (CPL) di bawah Rp15.000 per lead.',
            'Mengintegrasikan sistem CRM WhatsApp untuk follow-up cepat tim reservasi.'
        ],
        approach: 'Kami melakukan restrukturisasi total pada sales funnel, merancang ulang halaman landing page dengan standar Core Web Vitals < 1 detik, serta mengimplementasikan Meta Conversions API dan Google Tag Manager server-side.',
        solution: 'Integrated Performance Marketing & Dynamic Landing Page dengan direct WhatsApp CRM routing.',
        results: [
            { value: '320%', label: 'Kenaikan Qualified Leads' },
            { value: '12.5K+', label: 'Targeted Patient Reach' },
            { value: 'Rp9.590', label: 'Rata-rata Cost per Lead' },
            { value: '4.8x', label: 'Return on Ad Spend (ROAS)' }
        ],
        impact: 'Klinik CarePro memiliki kanal akuisisi pasien baru yang sepenuhnya terdata, stabil, dan siap dinaikkan skala anggarannya secara percaya diri setiap bulan.',
        takeaways: [
            'Data atribusi server-side sangat krusial dalam menghadapi pembatasan privasi browser modern.',
            'Kecepatan loading landing page berbanding lurus dengan efisiensi biaya iklan per konversi.',
            'Integrasi follow-up WhatsApp dalam kurun waktu 5 menit pertama melipatgandakan closing rate.'
        ],
        testimonial: {
            quote: 'Sistem tracking dan campaign yang dirancang Diggity benar-benar mengubah cara kami mengukur investasi pemasaran. Leads yang masuk sangat relevan dengan layanan spesialis kami.',
            author: 'dr. Hendra Pratama',
            role: 'Operational Director, CarePro Clinic'
        }
    },
    'edutech-cloud-migration': {
        client: 'EduTech Nusantara',
        division: 'Solutions',
        industry: 'Education',
        scale: 'Enterprise',
        scope: 'Cloud Architecture & DevOps',
        duration: '3 Bulan',
        year: '2026',
        title: 'Transformasi Infrastruktur Cloud Scalable untuk Ujian Online Serentak 150K Pengguna',
        desc: 'Mengatasi server crash saat jam ujian serentak dengan migrasi ke arsitektur Kubernetes microservices.',
        excerpt: 'Mengatasi server crash saat jam ujian serentak dengan migrasi ke arsitektur Kubernetes microservices dan caching terdistribusi.',
        challenge: [
            'Server monolitik konvensional mengalami crash saat menampung lebih dari 20.000 siswa bersamaan.',
            'Biaya sewa server fisik membengkak namun tidak efisien di luar masa ujian semester.',
            'Latency response API lambat mengakibatkan siswa gagal submit jawaban tepat waktu.'
        ],
        objective: [
            'Mencapai ketersediaan sistem (uptime SLA) 99.98% tanpa toleransi downtime pada hari H ujian.',
            'Mendukung auto-scaling elastis hingga 150.000 concurrent active students.',
            'Optimalisasi efisiensi biaya infrastruktur cloud bulanan minimal 35%.'
        ],
        approach: 'Kami membedah kode backend menjadi microservices terisolasi, mengimplementasikan containerization Docker dengan orkestrasi Kubernetes di AWS, serta menerapkan Redis cluster untuk queueing jawaban ujian.',
        solution: 'Cloud Microservices with Auto-scaling Node Pools & Distributed Caching Layer.',
        results: [
            { value: '99.98%', label: 'Uptime SLA Realized' },
            { value: '150K+', label: 'Concurrent Test Takers' },
            { value: '45%', label: 'Infrastucture Cost Saved' },
            { value: '< 80ms', label: 'Average API Latency' }
        ],
        impact: 'EduTech Nusantara berhasil menyelenggarakan ujian seleksi nasional tanpa satu pun insiden server down, memulihkan reputasi institusi di mata sekolah mitra.',
        takeaways: [
            'Auto-scaling elastis memungkinkan platform hanya membayar kapasitas komputasi sesuai lonjakan beban nyata.',
            'Pemisahan beban baca dan tulis pada database PostgreSQL mencegah query deadlock saat peak traffic.'
        ]
    },
    'diggity-hris-adoption': {
        client: 'PT Logistik Maju Sejahtera',
        division: 'Products',
        industry: 'Logistics & Supply Chain',
        scale: 'Enterprise',
        scope: 'SaaS Business Software Implementation',
        duration: '1 Bulan',
        year: '2026',
        title: 'Otomatisasi Payroll dan Presensi 850 Karyawan Lapangan Menggunakan Diggity HRIS',
        excerpt: 'Implementasi platform Diggity HRIS 2.0 menggantikan pencatatan absensi manual, menekan waktu pemrosesan gaji bulanan dari 5 hari kerja menjadi 2 jam.',
        challenge: [
            'Pencatatan absensi supir dan kurir di 18 cabang masih manual menggunakan kertas dan spreadsheet.',
            'Perhitungan lembur, potongan telat, dan tunjangan operasional sering terjadi salah hitung.',
            'Proses penggajian memakan waktu 5 hari kerja dan menimbulkan antrean komplain karyawan.'
        ],
        objective: [
            'Digitalisasi kehadiran berbasis GPS geofencing & biometrik selfie di aplikasi mobile.',
            'Otomatisasi penghitungan payroll dengan integrasi PPh 21 dan BPJS Ketenagakerjaan.',
            'Pengurangan waktu rekapitulasi data payroll bulanan di bawah 1 hari kerja.'
        ],
        approach: 'Rollout platform Diggity HRIS secara bertahap dalam 3 gelombang cabang, disertai sesi training user-friendly untuk admin HR serta integrasi batch transfer bank.',
        solution: 'Diggity HRIS SaaS Suite dengan modul Smart Attendance, Auto-Payroll, & Employee Portal.',
        results: [
            { value: '96%', label: 'Waktu Rekap Terpangkas' },
            { value: '850+', label: 'Karyawan Aktif Terdata' },
            { value: '0 Error', label: 'Discrepancy Slip Gaji' },
            { value: '2 Jam', label: 'Waktu Finalisasi Payroll' }
        ],
        impact: 'Departemen HR beralih dari tugas administratif berulang menjadi fokus pada retensi talenta dan peningkatan produktivitas logistik lapangan.',
        takeaways: [
            'Adopsi software HR yang sukses bergantung pada kemudahan antarmuka aplikasi di sisi karyawan lapangan.',
            'Otomatisasi kalkulasi pajak dan potongan menjamin kepatuhan hukum tanpa risiko sanksi audit.'
        ]
    },
    'retailos-multistore': {
        client: 'Kopi Kenari Chain',
        division: 'Products',
        industry: 'Food & Beverage',
        scale: 'Startup',
        scope: 'Digital Marketplace & Multi-Outlet POS',
        duration: '1.5 Bulan',
        year: '2026',
        title: 'Sentralisasi Manajemen Inventori 24 Gerai Kafe melalui Diggity POS & Marketplace',
        excerpt: 'Kopi Kenari mengadopsi produk POS multi-outlet Diggity untuk sinkronisasi bahan baku real-time, integrasi QRIS dinamis, dan analitik penjualan otomatis.',
        challenge: [
            'Setiap outlet menggunakan mesin kasir terpisah yang datanya tidak terhubung ke gudang pusat.',
            'Sering terjadi kehabisan biji kopi premium atau susu segar tanpa peringatan stok menipis.',
            'Owner kesulitan memantau laba kotor harian per cabang secara cepat.'
        ],
        objective: [
            'Menghubungkan 24 gerai ke satu cloud database inventori terpusat.',
            'Menerapkan sistem peringatan stok kritis otomatis via dashboard owner.',
            'Memfasilitasi transaksi non-tunai QRIS otomatis tanpa kasir harus input nominal manual.'
        ],
        approach: 'Pemasangan aplikasi Diggity POS di tablet Android setiap gerai dan penyediaan dashboard pemantauan live bagi jajaran manajemen.',
        solution: 'Diggity Cloud POS dengan modul Centralized Inventory & Multi-store Analytics.',
        results: [
            { value: '24', label: 'Gerai Tersinkronisasi' },
            { value: '+28%', label: 'Kenaikan Margin Laba' },
            { value: '-60%', label: 'Penurunan Pemborosan Bahan' },
            { value: 'Real-time', label: 'Visibilitas Transaksi' }
        ],
        impact: 'Manajemen dapat merencanakan pengadaan bahan baku secara presisi berbasis tren penjualan harian tiap gerai.',
        takeaways: [
            'Integrasi inventori real-time mencegah kerugian akibat bahan baku kedaluwarsa.',
            'Pembayaran QRIS instan mempercepat antrean pelanggan di jam sibuk pagi hari.'
        ]
    },
    'academy-alumni-hiring': {
        client: 'Fintech X Nusantara',
        division: 'Academy',
        industry: 'Financial Technology',
        scale: 'Enterprise',
        scope: 'Tech Talent Pipeline & Corporate Placement',
        duration: '4 Bulan',
        year: '2026',
        title: 'Akselerasi Rekrutmen 12 Junior Software Engineer Siap Kerja dari Diggity Academy',
        excerpt: 'Kemitraan khusus penyerapan talenta lulusan Full-Stack Bootcamp Diggity Academy yang telah dibekali standar rekayasa software modern dan etika kerja industri.',
        challenge: [
            'Fintech X kesulitan merekrut software engineer junior yang memiliki pemahaman clean code dan git workflow.',
            'Waktu onboarding developer baru rata-rata memakan waktu 2–3 bulan sebelum dapat berkontribusi.',
            'Tingginya biaya rekrutmen melalui agensi headhunting konvensional.'
        ],
        objective: [
            'Menyaring talenta siap pakai yang memahami arsitektur microservices dan API security.',
            'Memangkas waktu onboarding developer baru di bawah 3 minggu.',
            'Membangun jalur rekrutmen berkelanjutan dengan mitra akademi teknologi.'
        ],
        approach: 'Diggity Academy menyesuaikan silabus final project batch dengan tech stack yang dipakai di Fintech X, dilengkapi review kode mingguan oleh alumni senior.',
        solution: 'Diggity Academy Talent Pipeline & Tailored Capstone Project Mentorship.',
        results: [
            { value: '12 Org', label: 'Lulusan Diterima Kerja' },
            { value: '100%', label: 'Kelulusan Masa Percobaan' },
            { value: '< 14 Hari', label: 'Waktu Onboarding' },
            { value: '4.9/5', label: 'Kepuasan Tech Lead' }
        ],
        impact: 'Fintech X berhasil mempercepat rilis fitur baru pada aplikasi pinjaman digital mereka tanpa terhambat krisis kelangkaan talenta programmer.',
        takeaways: [
            'Kurikulum berbasis proyek industri nyata menghasilkan talenta yang jauh lebih tangguh daripada pembelajaran teori semata.',
            'Simulasi standup meeting dan code review selama bootcamp membuat transisi ke dunia kerja berlangsung mulus.'
        ]
    },
    'smart-desa-governance': {
        client: 'Pemerintah Daerah Jawa Timur',
        division: 'Solutions',
        industry: 'Government',
        scale: 'Enterprise',
        scope: 'E-Government & Public Service Software',
        duration: '5 Bulan',
        year: '2026',
        title: 'Digitalisasi Layanan Administrasi Publik Desa Terpadu Berbasis Web & Mobile',
        excerpt: 'Pembangunan portal layanan surat menyurat dan bansos desa terpadu yang memangkas birokrasi antrean fisik warga hingga 80%.',
        challenge: [
            'Pengurusan surat keterangan domisili dan usaha masih memerlukan kehadiran fisik warga di balai desa.',
            'Data penerima bantuan sosial rawan duplikasi karena tidak adanya validasi NIK otomatis.',
            'Aparatur desa kekurangan perkakas digital yang mudah digunakan oleh seluruh kelompok usia.'
        ],
        objective: [
            'Membangun aplikasi layanan mandiri warga berbasis web responsif dan bot WhatsApp terintegrasi.',
            'Validasi data kependudukan secara otomatis dengan standar keamanan data instansi pemerintah.',
            'Memangkas waktu penerbitan surat dari 3 hari menjadi kurang dari 15 menit.'
        ],
        approach: 'Pengembangan arsitektur terdesentralisasi dengan antarmuka yang sangat sederhana, disertai bimbingan teknis intensif bagi perangkat desa di 42 titik.',
        solution: 'Platform Smart Desa Diggity dengan Modul Pelayanan Mandiri & Validasi Kependudukan.',
        results: [
            { value: '42 Desa', label: 'Wilayah Terintegrasi' },
            { value: '80%', label: 'Penurunan Waktu Antrean' },
            { value: '65K+', label: 'Warga Terlayani' },
            { value: '< 15 Mnt', label: 'Waktu Terbit Surat' }
        ],
        impact: 'Indeks kepuasan masyarakat terhadap layanan kantor desa melonjak dan transparansi data bantuan sosial meningkat signifikan.',
        takeaways: [
            'Desain antarmuka publik harus memprioritaskan kesederhanaan navigasi dan aksesibilitas ramah pengguna lansia.',
            'Pendampingan langsung kepada operator desa menjadi kunci adopsi teknologi sektor publik.'
        ]
    }
};

export default function SuccessStoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { language: locale } = useLanguage();

    const story = CASE_STUDIES_MAP[slug] || CASE_STUDIES_MAP['carepro-lead-generation'];

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-16 overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* 01. BREADCRUMB */}
                <nav className="flex items-center gap-2 text-xs font-bold text-text-gray mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <Link href="/insights" className="hover:text-amber-500 transition-colors">Insights</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <Link href="/insights/success-stories" className="hover:text-amber-500 transition-colors">Success Stories</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <span className="text-amber-500 truncate max-w-[200px]">{story.client}</span>
                </nav>

                {/* 02. HERO SECTION */}
                <ScrollReveal animation="fade-up">
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-black text-2xl text-amber-600 shadow-sm">
                                {story.client.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-black uppercase tracking-wider mb-1">
                                    {story.division} • CASE STUDY
                                </div>
                                <h2 className="text-xl font-black text-text-main">{story.client}</h2>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-text-main mb-6 leading-tight">
                            {story.title}
                        </h1>
                        <p className="text-base md:text-xl text-text-gray font-medium leading-relaxed">
                            {story.excerpt}
                        </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 py-6 border-y border-glass-border">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-text-gray flex items-center gap-1 uppercase tracking-wider">
                                <Building2 className="w-3.5 h-3.5 text-amber-500" /> INDUSTRY
                            </span>
                            <span className="text-sm font-bold text-text-main">{story.industry}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-text-gray flex items-center gap-1 uppercase tracking-wider">
                                <Target className="w-3.5 h-3.5 text-amber-500" /> SCALE
                            </span>
                            <span className="text-sm font-bold text-text-main">{story.scale}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-text-gray flex items-center gap-1 uppercase tracking-wider">
                                <Briefcase className="w-3.5 h-3.5 text-amber-500" /> SCOPE
                            </span>
                            <span className="text-sm font-bold text-text-main">{story.scope}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-text-gray flex items-center gap-1 uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5 text-amber-500" /> DURATION
                            </span>
                            <span className="text-sm font-bold text-text-main">{story.duration}</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* 03. THE CASE DETAILS */}
                <div className="space-y-14">
                    
                    {/* The Challenge */}
                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-2">
                                    <Target className="w-6 h-6 text-red-500" /> Tantangan Klien
                                </h3>
                                <p className="text-xs text-text-gray font-medium">Hambatan yang dihadapi sebelum kerja sama dimulai.</p>
                            </div>
                            <div className="w-full md:w-2/3">
                                <ul className="space-y-3">
                                    {story.challenge.map((c, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                                            <span className="text-text-main font-medium text-sm md:text-base leading-relaxed">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* The Objective */}
                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-2">
                                    <Rocket className="w-6 h-6 text-brand-blue" /> Sasaran Kunci
                                </h3>
                                <p className="text-xs text-text-gray font-medium">Target terukur yang disepakati bersama tim Diggity.</p>
                            </div>
                            <div className="w-full md:w-2/3">
                                <ul className="space-y-3">
                                    {story.objective.map((o, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                                            <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0"></div>
                                            <span className="text-text-main font-medium text-sm md:text-base leading-relaxed">{o}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Approach & Solution */}
                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-6 h-6 text-amber-500" /> Pendekatan &amp; Solusi
                                </h3>
                                <p className="text-xs text-text-gray font-medium">Metodologi eksekusi yang diterapkan Diggity.</p>
                            </div>
                            <div className="w-full md:w-2/3">
                                <p className="text-text-gray font-medium text-base md:text-lg leading-relaxed mb-6">
                                    {story.approach}
                                </p>
                                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                    <h4 className="font-extrabold text-amber-600 mb-1.5 text-xs uppercase tracking-wider">Solusi yang Diimplementasikan:</h4>
                                    <p className="text-text-main font-bold text-base">{story.solution}</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Verifiable Results */}
                    <ScrollReveal animation="fade-up" className="pt-8 border-t border-glass-border">
                        <h3 className="text-2xl md:text-3xl font-black text-text-main flex items-center gap-2 mb-6">
                            <TrendingUp className="w-7 h-7 text-amber-500" /> Hasil &amp; Dampak Terukur
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {story.results.map((res, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border text-center shadow-sm">
                                    <div className="text-2xl md:text-3xl font-black text-amber-500 mb-1">{res.value}</div>
                                    <div className="text-[11px] font-bold text-text-gray uppercase tracking-wider">{res.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white dark:bg-glass-bg rounded-3xl p-6 md:p-8 border border-glass-border">
                            <h4 className="text-lg font-black text-text-main mb-2">Dampak Bisnis (Business Impact)</h4>
                            <p className="text-sm md:text-base text-text-gray font-medium leading-relaxed">{story.impact}</p>
                        </div>
                    </ScrollReveal>

                    {/* Key Takeaways */}
                    <ScrollReveal animation="fade-up">
                        <div className="bg-brand-blue/5 rounded-3xl p-6 md:p-8 border border-brand-blue/20">
                            <h3 className="text-xl md:text-2xl font-black text-text-main mb-4">Pembelajaran Utama (Key Takeaways)</h3>
                            <ul className="space-y-3">
                                {story.takeaways.map((t, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                        <span className="text-text-main font-medium text-sm md:text-base">{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Testimonial if available */}
                    {story.testimonial && (
                        <ScrollReveal animation="fade-up">
                            <div className="text-center py-10 px-6 bg-white dark:bg-glass-bg border border-glass-border rounded-3xl">
                                <Quote className="w-10 h-10 text-amber-500/30 mx-auto mb-4" />
                                <p className="text-lg md:text-xl font-bold text-text-main italic mb-6 max-w-2xl mx-auto leading-relaxed">
                                    &ldquo;{story.testimonial.quote}&rdquo;
                                </p>
                                <div>
                                    <h5 className="font-black text-text-main text-base">{story.testimonial.author}</h5>
                                    <p className="text-xs text-text-gray font-semibold">{story.testimonial.role}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* CTA Navigation */}
                    <ScrollReveal animation="fade-up" className="pt-12 border-t border-glass-border text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main mb-4">
                            Tantangan Bisnis Anda Siap Menjadi Kisah Sukses Berikutnya?
                        </h2>
                        <p className="text-sm md:text-base text-text-gray font-medium mb-8 max-w-xl mx-auto">
                            Diskusikan kebutuhan proyek kustom, adopsi produk digital, atau pelatihan talenta Anda bersama tim konsultan Diggity.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link 
                                href="/contact" 
                                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all text-sm shadow-md"
                            >
                                Konsultasikan Kebutuhan Anda
                            </Link>
                            <Link 
                                href="/insights/success-stories" 
                                className="px-8 py-3.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border hover:border-amber-500/50 text-text-main font-bold transition-all text-sm"
                            >
                                Lihat Kisah Sukses Lainnya
                            </Link>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </div>
    );
}
