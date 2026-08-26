import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocaleServer } from '../../../lib/locale-server';
import { api } from '../../../lib/api';
import SpotlightCard from '../../../components/SpotlightCard';
import ScrollReveal from '../../../components/ScrollReveal';
import {
    ArrowLeft,
    ArrowRight,
    Code,
    Cpu,
    Palette,
    TrendingUp,
    Server,
    HelpCircle,
    ShieldCheck,
    CheckCircle2,
    MessageCircle,
    ClipboardList,
    Lightbulb,
    Rocket,
    Users,
    Award,
    Clock,
    Headphones,
    Star,
    Zap,
    ChevronRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Icon Map
───────────────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<any>> = {
    code: Code,
    cpu: Cpu,
    palette: Palette,
    'trending-up': TrendingUp,
    server: Server,
    'help-circle': HelpCircle,
    'shield-check': ShieldCheck,
};

/* ─────────────────────────────────────────────
   Sub-services fallback
───────────────────────────────────────────── */
const subServicesMap: Record<string, string[]> = {
    'technology-solutions': [
        'Website Development (Next.js, React, Laravel)',
        'Mobile Apps Development (iOS & Android Native)',
        'Custom Software & ERP Systems Development',
        'Custom E-Commerce & Retail Platform Engineering',
        'Government Digital Services & Portal Solutions',
        'API Design & Core Systems Integration',
    ],
    'ai-emerging-technology': [
        'Artificial Intelligence & Agent Development',
        'Smart AI Chatbots & Customer Assistants',
        'Machine Learning Models & Integration',
        'Business Intelligence & Big Data Analytics',
        'IoT (Internet of Things) Hardware/Software Solutions',
        'Robotic Process Automation (RPA)',
    ],
    'creative-brand-experience': [
        'Brand Strategy, Naming & Consulting',
        'Corporate Branding & Visual Identity System',
        'UI/UX Design, Figma Wireframing & Prototyping',
        'Professional Photography & High-End Videography',
        'Motion Graphics & 2D/3D Animation Assets',
        'Creative Advertising Campaigns & Collaterals',
    ],
    'growth-marketing': [
        'Search Engine Optimization (SEO) & Audits',
        'Google Ads & Search Engine Marketing (SEM)',
        'Meta Ads (Facebook, Instagram & Audience Network)',
        'TikTok & Social Media Influencer Sourcing',
        'Social Media Management & Organic Growth Strategy',
        'Marketplace Store Optimization & Ads (Shopee/Tokopedia)',
    ],
    'cloud-cyber-security': [
        'Premium Cloud Hosting & Server Provisioning',
        'VPS (Virtual Private Server) Configurations',
        'DevOps Orchestration & Continuous Delivery (CI/CD)',
        'Cyber Security Audits & Compliance Assessment',
        'Penetration Testing & Vulnerability Assessment',
        'Managed Cloud Infrastructure & SLA Support',
    ],
    consulting: [
        'IT Consulting & Technical Feasibility Studies',
        'Corporate Digital Transformation Advisory',
        'Enterprise Software Architecture Design',
        'System Auditing & Technology Maturity Assessment',
    ],
    'digital-skill-lab': [
        'Corporate IT Training & Bootcamps',
        'Figma UI/UX & Design Workshops',
        'Custom Software Development Workshop',
        'Digital Marketing Masterclass & Analytics',
    ],
};

/* ─────────────────────────────────────────────
   Plans fallback
───────────────────────────────────────────── */
interface CustomPlan {
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    isPopular?: boolean;
}

const servicePlansMap: Record<string, CustomPlan[]> = {
    'technology-solutions': [
        {
            name: 'Basic Web & Portal',
            price: 'Mulai Rp 5.000.000',
            period: 'proyek',
            description: 'Ideal untuk pendaratan produk awal, web profil perusahaan (company profile) berkinerja tinggi, dan optimasi SEO.',
            features: [
                'Responsive Design (Desktop & Mobile)',
                'Hingga 5 Halaman Konten Utama',
                'Integrasi WhatsApp & Sosial Media CTA',
                'Analitik Google & Search Console Setup',
                'Panduan Penggunaan Admin Panel',
            ],
        },
        {
            name: 'Custom Web & Mobile App',
            price: 'Mulai Rp 15.000.000',
            period: 'proyek',
            description: 'Ideal untuk bisnis yang membutuhkan portal interaktif khusus, aplikasi e-commerce ritel, atau aplikasi Android & iOS.',
            features: [
                'Desain UI/UX Kustom Eksklusif (Figma)',
                'Aplikasi Mobile Native (iOS & Android)',
                'CMS Manajemen Konten Dinamis',
                'Integrasi Payment Gateway & Kurir Ekspedisi',
                'Keamanan Enkripsi SSL & Sertifikat Keamanan',
            ],
            isPopular: true,
        },
        {
            name: 'Enterprise Custom & ERP',
            price: 'Mulai Rp 45.000.000',
            period: 'proyek',
            description: 'Didesain khusus untuk integrasi skala besar, manajemen rantai pasok (ERP), pergudangan, keuangan, dan kustomisasi kompleks.',
            features: [
                'Arsitektur Multi-Role Access Control (RBAC)',
                'Integrasi Sistem ERP & CRM Dinamis',
                'Sinkronisasi Sistem Warisan & API Pihak Ketiga',
                'Uji Beban Performa & Keamanan Siber Ketat',
                'Dukungan SLA Pemeliharaan 24/7',
            ],
        },
    ],
    'ai-emerging-technology': [
        {
            name: 'AI Assistant Chatbot',
            price: 'Mulai Rp 7.500.000',
            period: 'proyek',
            description: 'Integrasi asisten virtual kecerdasan buatan terlatih untuk melayani tanya jawab pelanggan otomatis selama 24 jam.',
            features: [
                'Integrasi Model OpenAI GPT / Gemini LLM',
                'Custom Knowledge Base (Buku Panduan Bisnis)',
                'Kanal Chat (WhatsApp, Telegram, atau Web)',
                'Sistem Eskalasi ke Admin Manusia',
                'Laporan Riwayat Percakapan Chatbot',
            ],
        },
        {
            name: 'AI Automation Agent',
            price: 'Mulai Rp 20.000.000',
            period: 'proyek',
            description: 'Otomatisasi proses bisnis internal perusahaan (RPA) menggunakan kecerdasan buatan untuk menghemat waktu kerja operasional.',
            features: [
                'Otomatisasi Alur Input Data & Dokumen',
                'Pengenalan Karakter Gambar (AI OCR Engine)',
                'Autopilot Sistem Operasional Harian',
                'Notifikasi Alert & Sinkronisasi DB',
                'Dashboard Efisiensi Kinerja Alur Kerja',
            ],
            isPopular: true,
        },
        {
            name: 'Enterprise AI & BI Models',
            price: 'Mulai Rp 60.000.000',
            period: 'proyek',
            description: 'Pengembangan model mesin pembelajaran kustom, data engineering berskala besar, dan visualisasi analisis bisnis interaktif.',
            features: [
                'Pelatihan Model Machine Learning Kustom',
                'Data Pipeline & Pembersihan Big Data',
                'Prediksi Tren Penjualan & Perilaku Klien',
                'Dashboard Business Intelligence Real-Time',
                'Advisory Keamanan Data & Proteksi Privasi',
            ],
        },
    ],
    'creative-brand-experience': [
        {
            name: 'Brand Identity Essentials',
            price: 'Mulai Rp 3.500.000',
            period: 'proyek',
            description: 'Penyusunan pondasi identitas visual brand yang solid untuk menarik minat pembeli pertama secara konsisten.',
            features: [
                'Desain Logo Utama & Alternatif',
                'Sistem Palet Warna & Tipografi Resmi',
                'Brand Guidelines Book (Panduan Visual)',
                'Desain Kartu Nama & Kop Surat Perusahaan',
                'Aset Media Sosial Awal (Banner & Avatar)',
            ],
        },
        {
            name: 'UI/UX Design Pro',
            price: 'Mulai Rp 10.000.000',
            period: 'proyek',
            description: 'Perancangan desain antarmuka aplikasi web dan mobile yang estetik, intuitif, berorientasi konversi, dan ramah pengguna.',
            features: [
                'Uji Coba Pengalaman Pengguna (UX Research)',
                'Desain Kawat Kasar (Wireframing & Sitemap)',
                'Desain Visual Beresolusi Tinggi (UI Mockup)',
                'Prototipe Interaktif Siap Uji Pengguna',
                'Sistem Desain Komponen Figma Terorganisir',
            ],
            isPopular: true,
        },
        {
            name: 'Full Creative Campaigns',
            price: 'Mulai Rp 25.000.000',
            period: 'proyek',
            description: 'Produksi aset multimedia kreatif tingkat lanjut untuk mendominasi kesadaran publik di berbagai kanal media sosial.',
            features: [
                'Sesi Foto Produk & Profil Korporasi Profesional',
                'Produksi Video Iklan & Company Profile',
                'Aset Motion Graphics & Animasi 2D/3D',
                'Desain Konten Kampanye Iklan Berbayar',
                'Penyusunan Strategi Arah Kreatif (Creative Direction)',
            ],
        },
    ],
    'growth-marketing': [
        {
            name: 'SEO Dominance Essentials',
            price: 'Mulai Rp 4.000.000',
            period: 'bulan',
            description: 'Optimasi mesin pencari organik untuk meningkatkan peringkat website kawan secara dominan di hasil pencarian Google.',
            features: [
                'Riset Kata Kunci & Pemetaan Topik',
                'Audit Teknis SEO & Kecepatan Website',
                'Optimasi Konten On-Page & Copywriting',
                'Laporan Bulanan Peringkat & Lalu Lintas Web',
                'Optimasi Google My Business & SEO Lokal',
            ],
        },
        {
            name: 'Digital Ads & PPC Campaign',
            price: 'Mulai Rp 7.000.000',
            period: 'bulan',
            description: 'Kampanye iklan berbayar dengan target audiens presisi tinggi untuk menghasilkan leads instan dan penjualan secara cepat.',
            features: [
                'Setup Google Search & Display Ads',
                'Manajemen Facebook & Instagram Meta Ads',
                'Optimasi Iklan Video Pendek TikTok Ads',
                'Perancangan Landing Page Khusus Konversi',
                'Retargeting & Uji Coba Variasi Iklan (A/B Testing)',
            ],
            isPopular: true,
        },
        {
            name: 'Total Organic Growth',
            price: 'Mulai Rp 12.000.000',
            period: 'bulan',
            description: 'Manajemen digital marketing komprehensif untuk mendongkrak reputasi brand secara organik dan sistematis.',
            features: [
                'Penyusunan Kalender Konten Media Sosial',
                'Desain Grafis Konten Feed & Reels Kreatif',
                'Outreach Influencer & Content Creator Sourcing',
                'Setup Live Commerce & Penjualan Siaran Langsung',
                'Optimasi Toko Marketplace (Shopee/Tokopedia)',
            ],
        },
    ],
    'cloud-cyber-security': [
        {
            name: 'Cloud Setup & VPS Hosting',
            price: 'Mulai Rp 3.000.000',
            period: 'proyek',
            description: 'Penyusunan arsitektur server cloud yang andal, aman, berbiaya efisien, dan siap menghadapi lonjakan pengunjung.',
            features: [
                'Instalasi Server VPS (AWS, GCP, DigitalOcean)',
                'Migrasi Database Tanpa Downtime Operasional',
                'Setup Nama Domain & DNS Lanjutan',
                'Setup Email Bisnis Resmi Kapasitas Besar',
                'Konfigurasi Firewall & SSL Pengaman Enkripsi',
            ],
        },
        {
            name: 'DevOps & Infrastructure Automation',
            price: 'Mulai Rp 12.000.000',
            period: 'proyek',
            description: 'Otomatisasi deployment kode program untuk mempercepat rilis fitur baru developer secara aman tanpa kendala infrastruktur.',
            features: [
                'Setup Pipeline Otomatisasi (CI/CD)',
                'Orkestrasi Container Docker / Kubernetes',
                'Auto-Scaling Server Sesuai Beban Trafik',
                'Sistem Pemantauan Performa Server Real-Time',
                'Sistem Backup Cadangan Server Otomatis',
            ],
            isPopular: true,
        },
        {
            name: 'Cyber Security Audit & Pentest',
            price: 'Mulai Rp 25.000.000',
            period: 'proyek',
            description: 'Audit pertahanan sistem informasi dan simulasi penyerangan (pentest) untuk menutup kerentanan keamanan siber.',
            features: [
                'Simulasi Penetrasi Keamanan Aplikasi (Pentest)',
                'Pemindaian Celah Kerentanan Sistem (Vulnerability Scan)',
                'Audit Kepatuhan Standardisasi Keamanan Informasi',
                'Laporan Rekomendasi Penambalan Kode Program',
                'Setup Sistem Deteksi Gangguan (IDS/IPS)',
            ],
        },
    ],
    consulting: [
        {
            name: 'Tech Feasibility Study',
            price: 'Mulai Rp 5.000.000',
            period: 'proyek',
            description: 'Studi kelayakan teknis dan analisis kebutuhan arsitektur sebelum perusahaan memulai investasi perangkat lunak baru.',
            features: [
                'Analisis Kebutuhan Sistem & Kelayakan Kode',
                'Rekomendasi Pilihan Teknologi Stack Terbaik',
                'Estimasi Kebutuhan Waktu & Biaya Dev',
                'Analisis Risiko Teknis & Celah Kegagalan',
                'Dokumen Blueprint Spesifikasi Kebutuhan Sistem',
            ],
        },
        {
            name: 'Digital Transformation Advisory',
            price: 'Mulai Rp 15.000.000',
            period: 'proyek',
            description: 'Layanan penasihat transformasi digital untuk modernisasi alur kerja perusahaan konvensional ke ranah digital.',
            features: [
                'Audit Kesiapan Teknologi Internal Perusahaan',
                'Penyusunan Peta Jalan Transformasi Sistem',
                'Rekomendasi Software & Integrasi Cloud',
                'Analisis Efisiensi Biaya Operasional Teknologi',
                'Sesi Pelatihan Adaptasi Perubahan Karyawan',
            ],
            isPopular: true,
        },
        {
            name: 'Enterprise Tech Architecture Advisory',
            price: 'Mulai Rp 35.000.000',
            period: 'proyek',
            description: 'Penasihat arsitektur teknologi berkelanjutan berskala enterprise untuk mendukung keberlanjutan bisnis jangka panjang.',
            features: [
                'Desain Arsitektur Sistem Terdistribusi',
                'Tata Kelola Risiko & Perlindungan Data Korporat',
                'Advisory Pihak Ketiga & Integrasi API Vendor',
                'Pengawasan Rilis Deploy Sistem Berskala Besar',
                'Advisory CTO Independen untuk Board Management',
            ],
        },
    ],
    'digital-skill-lab': [
        {
            name: 'Introductory Session',
            price: 'Mulai Rp 1.500.000',
            period: 'proyek',
            description: 'Sesi pengenalan singkat 1 hari untuk membekali tim Anda dengan pemahaman dasar tool/teknologi spesifik.',
            features: [
                'Durasi 3-4 Jam Sesi Intensif',
                'Sertifikat Keikutsertaan Resmi',
                'Materi & Modul Pelatihan PDF',
                'Q&A Langsung dengan Praktisi Ahli',
                'Maksimal 15 Peserta per Sesi',
            ],
        },
        {
            name: 'Intensive Bootcamp',
            price: 'Mulai Rp 10.000.000',
            period: 'proyek',
            description: 'Program pelatihan mendalam selama 2 minggu untuk integrasi keahlian pemrograman, desain, atau marketing modern.',
            features: [
                'Kurikulum Kustom Sesuai Kebutuhan Bisnis',
                'Sesi Praktik Kerja Nyata / Hands-on Lab',
                'Evaluasi Kompetensi Individu Peserta',
                'Sertifikat Kelulusan Resmi Digital Specialist',
                'Maksimal 30 Peserta per Kelas',
            ],
            isPopular: true,
        },
        {
            name: 'Custom Enterprise Syllabus',
            price: 'Hubungi Kami',
            period: 'proyek',
            description: 'Program pelatihan kustom jangka panjang dengan kurikulum berskala besar yang dirancang khusus untuk divisi IT enterprise.',
            features: [
                'Penyusunan Silabus Khusus oleh Tech Lead',
                'Pelatihan Skala Divisi & Uji Kompetensi Lanjut',
                'Studi Kasus Arsitektur Software Perusahaan',
                'Pendampingan Pasca-Pelatihan Selama 30 Hari',
                'Kuota Peserta Tidak Terbatas',
            ],
        },
    ],
};

/* ─────────────────────────────────────────────
   Why Choose Us
───────────────────────────────────────────── */
const whyChooseUs = (locale: string) => [
    {
        icon: Users,
        title: locale === 'en' ? 'Experienced Team' : 'Tim Berpengalaman',
        desc: locale === 'en'
            ? 'Supported by expert practitioners with a portfolio of hundreds of successful projects across various industries.'
            : 'Didukung oleh praktisi ahli dengan portofolio ratusan proyek sukses di berbagai industri.',
        gradient: 'from-blue-500/20 to-indigo-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        icon: Award,
        title: locale === 'en' ? 'Measurable Quality' : 'Kualitas Terukur',
        desc: locale === 'en'
            ? 'Every deliverable goes through a strict QA process before being handed over to the client.'
            : 'Setiap deliverable melalui proses QA ketat sebelum diserahkan ke klien.',
        gradient: 'from-emerald-500/20 to-teal-500/10',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
        icon: Clock,
        title: locale === 'en' ? 'On Time' : 'Tepat Waktu',
        desc: locale === 'en'
            ? 'Our commitment to the project timeline agreed upon since kickoff.'
            : 'Komitmen kami pada timeline proyek yang disepakati sejak awal kickoff.',
        gradient: 'from-amber-500/20 to-orange-500/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
        icon: Headphones,
        title: locale === 'en' ? 'After-Sales Support' : 'Dukungan Purna Jual',
        desc: locale === 'en'
            ? 'Maintenance & post-project support services according to your business needs.'
            : 'Layanan maintenance & support pasca-proyek sesuai kebutuhan bisnis Anda.',
        gradient: 'from-violet-500/20 to-purple-500/10',
        iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
        icon: Lightbulb,
        title: locale === 'en' ? 'Innovative Solutions' : 'Solusi Inovatif',
        desc: locale === 'en'
            ? 'Utilizing the latest relevant and scalable technologies for business growth.'
            : 'Menggunakan teknologi terkini yang relevan dan terukur untuk pertumbuhan bisnis.',
        gradient: 'from-rose-500/20 to-pink-500/10',
        iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
        icon: MessageCircle,
        title: locale === 'en' ? 'Transparent Communication' : 'Komunikasi Transparan',
        desc: locale === 'en'
            ? 'Regular progress reports and unlimited consultation throughout the project.'
            : 'Laporan kemajuan berkala dan konsultasi tanpa batas selama proyek berjalan.',
        gradient: 'from-sky-500/20 to-cyan-500/10',
        iconColor: 'text-sky-600 dark:text-sky-400',
    },
];

/* ─────────────────────────────────────────────
   Workflow Steps
───────────────────────────────────────────── */
const workflowSteps = (locale: string) => [
    {
        step: '01',
        icon: MessageCircle,
        title: locale === 'en' ? 'Free Consultation' : 'Konsultasi Gratis',
        desc: locale === 'en'
            ? 'Discuss your business needs and goals directly with our consultants.'
            : 'Diskusi kebutuhan dan tujuan bisnis Anda bersama konsultan kami secara langsung.',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
        step: '02',
        icon: ClipboardList,
        title: locale === 'en' ? 'Analysis & Proposal' : 'Analisis & Proposal',
        desc: locale === 'en'
            ? 'Our team prepares a transparent scope of work, cost estimate, and timeline.'
            : 'Tim kami menyusun scope of work, estimasi biaya, dan timeline yang transparan.',
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
        step: '03',
        icon: Lightbulb,
        title: locale === 'en' ? 'Execution & Production' : 'Eksekusi & Produksi',
        desc: locale === 'en'
            ? 'Execution by our specialist team with regular progress updates to the client.'
            : 'Pengerjaan oleh tim spesialis dengan update progres berkala kepada klien.',
        color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
        step: '04',
        icon: Rocket,
        title: locale === 'en' ? 'Handover & Go Live' : 'Serah Terima & Go Live',
        desc: locale === 'en'
            ? 'Official launch accompanied by user training and after-sales support.'
            : 'Peluncuran resmi disertai pelatihan penggunaan dan dukungan purna jual.',
        color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
];

/* ─────────────────────────────────────────────
   Section Header component (reusable)
───────────────────────────────────────────── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand-blue/50 rounded-full" />
                <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">{label}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight leading-tight">{title}</h2>
            {subtitle && (
                <p className="text-text-gray text-base font-medium max-w-xl leading-relaxed">{subtitle}</p>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const revalidate = 60;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const service = await api.getServiceBySlug(slug);
        return {
            title: `${service.name} | Diggity Service`,
            description: service.description || 'Pelajari selengkapnya tentang layanan profesional kami di Diggity.',
        };
    } catch {
        return { title: 'Layanan Profesional | Diggity' };
    }
}

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
export default async function ServiceDetail({ params }: Props) {
    const locale = await getLocaleServer();
    const { slug } = await params;
    let service = null;

    try {
        service = await api.getServiceBySlug(slug);
    } catch {
        try {
            const allServices = await api.getServices();
            const fallbackService = allServices.find((s) => s.category?.slug === slug);
            if (fallbackService) service = await api.getServiceBySlug(fallbackService.slug);
        } catch (fallbackError) {
            console.error('Error in category fallback lookup:', fallbackError);
        }
    }

    if (!service) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Layanan Tidak Ditemukan</h1>
                <Link href="/solutions" className="text-brand-blue hover:underline">
                    {locale === 'en' ? 'Back to Services' : 'Kembali ke Layanan'}
                </Link>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon || 'code'] || Code;

    const subServices =
        service.sub_services && service.sub_services.length > 0
            ? service.sub_services
            : subServicesMap[slug] || [];

    const mappedContactService = service.name;

    const plans =
        service.plans && service.plans.length > 0
            ? service.plans
            : servicePlansMap[slug] || [];

    const defaultStats = [
        { label: 'Proyek Selesai', value: '200+', icon: Zap },
        { label: 'Klien Aktif', value: '50+', icon: Users },
        { label: 'Rata-rata Rating', value: '4.9', icon: Star },
        { label: 'Tahun Berpengalaman', value: '5+', icon: Award },
    ];
    const stats =
        service.stats && service.stats.length > 0
            ? service.stats.map((s: any, i: number) => ({ ...s, icon: defaultStats[i]?.icon || Zap }))
            : defaultStats;

    const defaultTechStack = ['Next.js', 'React', 'Laravel', 'Node.js', 'AWS', 'Docker'];
    const techStack =
        service.tech_stack && service.tech_stack.length > 0
            ? service.tech_stack
            : defaultTechStack;

    const workflow = workflowSteps(locale);
    const advantages = whyChooseUs(locale);

    return (
        <div className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[700px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 translate-y-1/4" />

            <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-24">

                {/* Back Button */}
                <Link
                    href="/solutions"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {locale === 'en' ? 'Back to Services' : 'Kembali ke Layanan'}
                </Link>

                {/* ════════════════════════════════
                    01. HERO SECTION
                ════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: text */}
                    <ScrollReveal animation="fade-up" delay={0}>
                        <div className="space-y-7">
                            {/* Large icon circle */}
                            <div className="w-20 h-20 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shadow-lg shadow-brand-blue/10">
                                <IconComponent className="w-10 h-10 text-brand-blue" strokeWidth={1.5} />
                            </div>

                            {/* Category label — styled text only, no capsule */}
                            {service.category && (
                                <p className="text-sm font-extrabold text-brand-blue uppercase tracking-[0.15em]">
                                    {service.category.name}
                                </p>
                            )}

                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight leading-[1.0]">
                                    {service.name}
                                </h1>
                                {/* Gradient underline accent */}
                                <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-brand-blue to-indigo-500" />
                            </div>

                            <p className="text-text-gray text-base md:text-lg leading-relaxed font-medium max-w-lg">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-3 pt-1">
                                <a
                                    href={`https://wa.me/6285157303035?text=${encodeURIComponent(
                                        `Halo Diggity, saya ingin konsultasi mengenai layanan ${service.name}.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/25 group"
                                >
                                    {locale === 'en' ? 'Free Consultation' : 'Konsultasi Gratis'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                                <Link
                                    href="/portfolio"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-glass-bg hover:bg-glass-bg/80 text-text-main text-sm font-bold rounded-xl border border-glass-border transition-all"
                                >
                                    {locale === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: upgraded stats card */}
                    <ScrollReveal animation="fade-up" delay={150}>
                        <SpotlightCard className="p-8 space-y-7">
                            {/* Stats grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat: { label: string; value: string; icon: React.ComponentType<any> }, i: number) => {
                                    const StatIcon = stat.icon || Zap;
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 text-center"
                                        >
                                            <StatIcon className="w-5 h-5 text-brand-blue" />
                                            <p className="text-3xl font-black text-text-main leading-none">{stat.value}</p>
                                            <p className="text-[11px] font-semibold text-text-muted leading-tight">{stat.label}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Tech stack */}
                            <div className="border-t border-glass-border/40 pt-6 space-y-3">
                                <p className="text-[11px] uppercase font-bold tracking-[0.18em] text-text-muted">
                                    {locale === 'en' ? 'Powered by' : 'Didukung Teknologi'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-[11px] font-bold bg-glass-bg border border-glass-border rounded-lg text-text-gray hover:border-brand-blue/30 hover:text-brand-blue transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </ScrollReveal>
                </div>

                {/* ════════════════════════════════
                    02. SCOPE OF SERVICE
                ════════════════════════════════ */}
                {subServices.length > 0 && (
                    <ScrollReveal animation="fade-up" delay={0}>
                        <div className="space-y-10">
                            <SectionHeader
                                label={locale === 'en' ? 'Our Scope' : 'Cakupan Kami'}
                                title={locale === 'en' ? 'What Do We Do?' : 'Apa Saja yang Kami Kerjakan?'}
                                subtitle={locale === 'en'
                                    ? 'Every sub-service is handled by experienced specialists with international quality standards.'
                                    : 'Setiap sub-layanan dikerjakan oleh tim spesialis berpengalaman dengan standar kualitas internasional.'}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {subServices.map((sub: string, i: number) => (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 60}>
                                        <SpotlightCard className="p-5 flex items-start gap-4 hover:border-brand-blue/30 transition-colors h-full">
                                            <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4.5 h-4.5" />
                                            </div>
                                            <span className="text-sm font-semibold text-text-main leading-snug pt-1.5">
                                                {sub}
                                            </span>
                                        </SpotlightCard>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* ════════════════════════════════
                    03. WORKFLOW STEPS
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up" delay={0}>
                    <div className="space-y-10">
                        <SectionHeader
                            label={locale === 'en' ? 'How We Work' : 'Cara Kerja Kami'}
                            title={locale === 'en' ? 'Simple & Transparent Process' : 'Proses yang Sederhana & Transparan'}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                            {workflow.map((wf, i) => {
                                const WfIcon = wf.icon;
                                return (
                                    <div key={i} className="relative">
                                        <ScrollReveal animation="fade-up" delay={i * 80}>
                                            <SpotlightCard className="p-6 space-y-5 h-full">
                                                {/* Step number — large decorative */}
                                                <span className="absolute top-4 right-5 text-5xl font-black text-brand-blue/8 select-none leading-none pointer-events-none">
                                                    {wf.step}
                                                </span>

                                                <div className={`w-12 h-12 rounded-2xl ${wf.color} flex items-center justify-center`}>
                                                    <WfIcon className="w-6 h-6" strokeWidth={1.5} />
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="text-base font-extrabold text-text-main">{wf.title}</h4>
                                                    <p className="text-sm text-text-gray leading-relaxed font-medium">{wf.desc}</p>
                                                </div>
                                            </SpotlightCard>
                                        </ScrollReveal>

                                        {/* Connector arrow between steps (desktop only) */}
                                        {i < workflow.length - 1 && (
                                            <div className="hidden lg:flex absolute top-10 -right-3 z-20 items-center justify-center w-6 h-6 rounded-full bg-brand-bg border border-glass-border">
                                                <ChevronRight className="w-3 h-3 text-brand-blue" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ════════════════════════════════
                    04. PRICING PACKAGES
                ════════════════════════════════ */}
                {plans.length > 0 && (
                    <ScrollReveal animation="fade-up" delay={0}>
                        <div className="space-y-10">
                            <SectionHeader
                                label={locale === 'en' ? 'Investment' : 'Investasi'}
                                title={locale === 'en' ? 'Service Packages & Estimation' : 'Estimasi Investasi & Paket Layanan'}
                                subtitle={locale === 'en'
                                    ? 'All prices are initial estimates. The final offer will be tailored to the specific needs of your project.'
                                    : 'Semua harga bersifat estimasi awal. Penawaran final disesuaikan dengan kebutuhan spesifik proyek Anda.'}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                                {plans.map((plan: CustomPlan, idx: number) => {
                                    const scaleText =
                                        idx === 0
                                            ? locale === 'en' ? 'Startup / SME Scale' : 'Skala Startup / UMKM'
                                            : idx === 1
                                            ? locale === 'en' ? 'Growing Business Scale' : 'Skala Bisnis Berkembang'
                                            : locale === 'en' ? 'Corporate & Enterprise Scale' : 'Skala Korporat & Enterprise';

                                    const whatsappMsg = `Halo Diggity, saya tertarik dengan paket ${plan.name} untuk layanan ${service.name}. Bisa tolong jelaskan detail lebih lanjut?`;
                                    const whatsappUrl = `https://wa.me/6285157303035?text=${encodeURIComponent(whatsappMsg)}`;

                                    if (plan.isPopular) {
                                        return (
                                            <div key={idx} className="relative flex flex-col">
                                                {/* Popular badge floating above */}
                                                <div className="flex justify-center mb-0">
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-gradient-to-r from-brand-blue to-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-blue/30">
                                                        <Star className="w-3 h-3 fill-white" />
                                                        {locale === 'en' ? 'Most Popular' : 'Paling Populer'}
                                                    </span>
                                                </div>
                                                {/* Popular card — gradient background */}
                                                <div className="relative flex flex-col flex-1 rounded-b-2xl rounded-tr-2xl overflow-hidden border border-brand-blue/30 shadow-2xl shadow-brand-blue/15">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-blue-700 to-indigo-700 -z-10" />
                                                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 0%, transparent 60%)' }} />
                                                    <div className="p-6 flex flex-col flex-1 space-y-5">
                                                        <div className="space-y-1">
                                                            <h4 className="text-base font-extrabold text-white">{plan.name}</h4>
                                                            <p className="text-[11px] text-white/70 font-medium leading-relaxed">{plan.description}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-black text-white">{locale === 'en' ? 'Custom Offer' : 'Penawaran Kustom'}</p>
                                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">{scaleText}</p>
                                                        </div>
                                                        <div className="border-t border-white/15 pt-4 space-y-2.5 flex-1">
                                                            <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">
                                                                {locale === 'en' ? 'Scope of Work' : 'Cakupan Kerja'}
                                                            </span>
                                                            <ul className="space-y-2">
                                                                {plan.features.map((feature, fIdx) => (
                                                                    <li key={fIdx} className="flex items-start gap-2 text-[12px] text-white/85">
                                                                        <CheckCircle2 className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5" />
                                                                        <span className="font-medium leading-snug">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <a
                                                            href={whatsappUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-white text-brand-blue hover:bg-white/90 transition-all shadow-md"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            {locale === 'en' ? 'Request Quote' : 'Minta Penawaran'}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                                            <SpotlightCard className="p-6 flex flex-col h-full space-y-5">
                                                <div className="space-y-1">
                                                    <h4 className="text-base font-extrabold text-text-main">{plan.name}</h4>
                                                    <p className="text-[11px] text-text-gray font-medium leading-relaxed">{plan.description}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xl font-black text-text-main">{locale === 'en' ? 'Custom Offer' : 'Penawaran Kustom'}</p>
                                                    <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mt-0.5">{scaleText}</p>
                                                </div>
                                                <div className="border-t border-glass-border/40 pt-4 space-y-2.5 flex-1">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                                                        {locale === 'en' ? 'Scope of Work' : 'Cakupan Kerja'}
                                                    </span>
                                                    <ul className="space-y-2">
                                                        {plan.features.map((feature, fIdx) => (
                                                            <li key={fIdx} className="flex items-start gap-2 text-[12px] text-text-gray">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                                                                <span className="font-medium leading-snug">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <a
                                                    href={whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-auto w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-glass-bg hover:bg-glass-bg/80 text-text-main border border-glass-border transition-all"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                    {locale === 'en' ? 'Request Quote' : 'Minta Penawaran'}
                                                </a>
                                            </SpotlightCard>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* ════════════════════════════════
                    05. WHY CHOOSE US
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up" delay={0}>
                    <div className="space-y-10">
                        <SectionHeader
                            label={locale === 'en' ? 'Our Advantages' : 'Keunggulan Kami'}
                            title={locale === 'en' ? 'Why Choose Diggity?' : 'Mengapa Memilih Diggity?'}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {advantages.map((item, i) => {
                                const ItemIcon = item.icon;
                                return (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 70}>
                                        <SpotlightCard className="p-7 space-y-4 hover:border-brand-blue/30 transition-colors h-full">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center border border-white/10`}>
                                                <ItemIcon className={`w-7 h-7 ${item.iconColor}`} strokeWidth={1.5} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <h4 className="text-base font-extrabold text-text-main">{item.title}</h4>
                                                <p className="text-sm text-text-gray leading-relaxed font-medium">{item.desc}</p>
                                            </div>
                                        </SpotlightCard>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ════════════════════════════════
                    06. CTA SECTION
                ════════════════════════════════ */}
                <ScrollReveal animation="fade-up" delay={0}>
                    <div className="relative overflow-hidden rounded-3xl border border-brand-blue/20 shadow-2xl shadow-brand-blue/10">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-blue-700 to-indigo-700 -z-10" />
                        {/* Decorative rings */}
                        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
                        <div className="topographic-bg !opacity-10" />

                        <div className="relative z-10 p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
                            {/* Text */}
                            <div className="space-y-4 text-left max-w-xl">
                                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                    {locale === 'en'
                                        ? `Need ${service.name} Solution?`
                                        : `Butuh Solusi ${service.name}?`}
                                </h3>
                                <p className="text-white/75 text-base leading-relaxed font-medium">
                                    {locale === 'en'
                                        ? 'Consult your project needs for free with our technical consultant team. We are ready to help find the best solution for your business.'
                                        : 'Konsultasikan kebutuhan proyek Anda secara gratis bersama tim konsultan teknis kami. Kami siap membantu menemukan solusi terbaik untuk bisnis Anda.'}
                                </p>
                                {/* Trust points */}
                                <div className="flex flex-wrap gap-4 pt-1">
                                    {[
                                        locale === 'en' ? '100% Free Consultation' : 'Konsultasi 100% Gratis',
                                        locale === 'en' ? 'No Initial Commitment' : 'Tanpa Komitmen Awal',
                                        (locale === 'en' ? 'Fast Response' : 'Respon Cepat') + ' ≤ 1 Jam',
                                    ].map((point) => (
                                        <div key={point} className="flex items-center gap-1.5 text-[12px] font-semibold text-white/70">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white/60" />
                                            {point}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
                                <Link
                                    href={`/contact?service=${encodeURIComponent(mappedContactService)}`}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-brand-blue bg-white hover:bg-white/90 rounded-xl transition-all shadow-lg shadow-black/20 group"
                                >
                                    {locale === 'en' ? 'Start Project Discussion' : 'Mulai Diskusi Proyek'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <a
                                    href={`https://wa.me/6285157303035?text=${encodeURIComponent(
                                        `Halo Diggity, saya tertarik dengan layanan ${service.name}. Bisa bantu saya?`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {locale === 'en' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </div>
    );
}
