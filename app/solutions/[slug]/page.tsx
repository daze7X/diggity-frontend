import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { api } from '../../../lib/api';
import SpotlightCard from '../../../components/SpotlightCard';
import { 
    ArrowLeft, 
    Code, 
    Cpu, 
    Palette, 
    TrendingUp, 
    Server, 
    HelpCircle, 
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
    code: Code,
    cpu: Cpu,
    palette: Palette,
    'trending-up': TrendingUp,
    server: Server,
    'help-circle': HelpCircle,
    'shield-check': ShieldCheck,
};

// Sub-services lists mapped from Business Pillars Diggity Spec
const subServicesMap: Record<string, string[]> = {
    'technology-solutions': [
        'Website Development (Next.js, React, Laravel)',
        'Mobile Apps Development (iOS & Android Native)',
        'Custom Software & ERP Systems Development',
        'Custom E-Commerce & Retail Platform Engineering',
        'Government Digital Services & Portal Solutions',
        'API Design & Core Systems Integration'
    ],
    'ai-emerging-technology': [
        'Artificial Intelligence & Agent Development',
        'Smart AI Chatbots & Customer Assistants',
        'Machine Learning Models & Integration',
        'Business Intelligence & Big Data Analytics',
        'IoT (Internet of Things) Hardware/Software Solutions',
        'Robotic Process Automation (RPA)'
    ],
    'creative-brand-experience': [
        'Brand Strategy, Naming & Consulting',
        'Corporate Branding & Visual Identity System',
        'UI/UX Design, Figma Wireframing & Prototyping',
        'Professional Photography & High-End Videography',
        'Motion Graphics & 2D/3D Animation Assets',
        'Creative Advertising Campaigns & Collaterals'
    ],
    'growth-marketing': [
        'Search Engine Optimization (SEO) & Audits',
        'Google Ads & Search Engine Marketing (SEM)',
        'Meta Ads (Facebook, Instagram & Audience Network)',
        'TikTok & Social Media Influencer Sourcing',
        'Social Media Management & Organic Growth Strategy',
        'Marketplace Store Optimization & Ads (Shopee/Tokopedia)'
    ],
    'cloud-cyber-security': [
        'Premium Cloud Hosting & Server Provisioning',
        'VPS (Virtual Private Server) Configurations',
        'DevOps Orchestration & Continuous Delivery (CI/CD)',
        'Cyber Security Audits & Compliance Assessment',
        'Penetration Testing & Vulnerability Assessment',
        'Managed Cloud Infrastructure & SLA Support'
    ],
    'consulting': [
        'IT Consulting & Technical Feasibility Studies',
        'Corporate Digital Transformation Advisory',
        'Enterprise Software Architecture Design',
        'System Auditing & Technology Maturity Assessment'
    ]
};

interface CustomPlan {
    name: string;
    price: string;
    period: string;
    description: string;
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
                'Panduan Penggunaan Admin Panel'
            ]
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
                'Keamanan Enkripsi SSL & Sertifikat Keamanan'
            ],
            isPopular: true
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
                'Dukungan SLA Pemeliharaan 24/7'
            ]
        }
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
                'Laporan Riwayat Percakapan Chatbot'
            ]
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
                'Dashboard Efisiensi Kinerja Alur Kerja'
            ],
            isPopular: true
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
                'Advisory Keamanan Data & Proteksi Privasi'
            ]
        }
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
                'Aset Media Sosial Awal (Banner & Avatar)'
            ]
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
                'Sistem Desain Komponen Figma Terorganisir'
            ],
            isPopular: true
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
                'Penyusunan Strategi Arah Kreatif (Creative Direction)'
            ]
        }
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
                'Optimasi Google My Business & SEO Lokal'
            ]
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
                'Retargeting & Uji Coba Variasi Iklan (A/B Testing)'
            ],
            isPopular: true
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
                'Optimasi Toko Marketplace (Shopee/Tokopedia)'
            ]
        }
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
                'Konfigurasi Firewall & SSL Pengaman Enkripsi'
            ]
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
                'Sistem Backup Cadangan Server Otomatis'
            ],
            isPopular: true
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
                'Setup Sistem Deteksi Gangguan (IDS/IPS)'
            ]
        }
    ],
    'consulting': [
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
                'Dokumen Blueprint Spesifikasi Kebutuhan Sistem'
            ]
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
                'Sesi Pelatihan Adaptasi Perubahan Karyawan'
            ],
            isPopular: true
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
                'Advisory CTO Independen untuk Board Management'
            ]
        }
    ]
};

export const revalidate = 60; // ISR cache data for 60 seconds

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
        return {
            title: 'Layanan Profesional | Diggity',
        };
    }
}

export default async function ServiceDetail({ params }: Props) {
    const { slug } = await params;
    let service = null;

    try {
        service = await api.getServiceBySlug(slug);
    } catch (error) {
        console.warn('Direct service lookup failed, trying category fallback for slug:', slug);
        try {
            const allServices = await api.getServices();
            const fallbackService = allServices.find(
                (s) => s.category?.slug === slug
            );
            if (fallbackService) {
                service = await api.getServiceBySlug(fallbackService.slug);
            }
        } catch (fallbackError) {
            console.error('Error in category fallback lookup:', fallbackError);
        }
    }

    if (!service) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Layanan Tidak Ditemukan</h1>
                <Link href="/solutions" className="text-brand-blue hover:underline">
                    Kembali ke Layanan
                </Link>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon || 'code'] || Code;
    
    // Gunakan sub_services dinamis dari database jika tersedia, jika tidak gunakan fallback statis
    const subServices = (service.sub_services && service.sub_services.length > 0)
        ? service.sub_services
        : (subServicesMap[slug] || []);
        
    const mappedContactService = service.name;
    
    // Gunakan plans dinamis dari database jika tersedia, jika tidak gunakan fallback statis
    const plans = (service.plans && service.plans.length > 0)
        ? service.plans
        : (servicePlansMap[slug] || []);

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
                {/* Back Button */}
                <Link
                    href="/solutions"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Layanan
                </Link>

                {/* Main Service Card */}
                <SpotlightCard className="p-8 md:p-12 text-left border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <IconComponent className="w-8 h-8" />
                            </div>
                            <div>
                                {service.category && (
                                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block mb-0.5">
                                        {service.category.name}
                                    </span>
                                )}
                                <h1 className="text-2xl md:text-4xl font-black text-text-main tracking-tight leading-tight">
                                    {service.name}
                                </h1>
                            </div>
                        </div>

                        <p className="text-text-gray text-base md:text-lg leading-relaxed font-medium">
                            {service.description}
                        </p>
                    </div>
                </SpotlightCard>

                {/* Sub Services & Features Grid */}
                {subServices.length > 0 && (
                    <div className="space-y-6 text-left">
                        <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">
                            Cakupan Layanan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subServices.map((sub, i) => (
                                <SpotlightCard key={i} className="p-5 flex items-center space-x-3.5 border border-glass-border">
                                    <div className="w-8.5 h-8.5 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold text-text-main leading-snug">
                                        {sub}
                                    </span>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}

                {/* Estimasi Investasi & Paket Layanan (B2B Plans Specific to Service) */}
                {plans.length > 0 && (
                    <div className="space-y-6 text-left pt-6">
                        <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">
                            Estimasi Investasi &amp; Paket Layanan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                            {plans.map((plan, idx) => {
                                const scaleText = idx === 0 
                                    ? 'Skala Proyek Kecil / Startup' 
                                    : idx === 1 
                                    ? 'Skala Bisnis Berkembang' 
                                    : 'Skala Korporat & Enterprise';

                                const whatsappMsg = `Halo Diggity, saya tertarik dengan paket [PLAN_NAME] untuk layanan [SERVICE_NAME]. Bisa tolong jelaskan detail lebih lanjut?`
                                    .replace('[PLAN_NAME]', plan.name)
                                    .replace('[SERVICE_NAME]', service.name);
                                const whatsappUrl = `https://wa.me/6285157303035?text=${encodeURIComponent(whatsappMsg)}`;

                                return (
                                    <SpotlightCard
                                        key={idx}
                                        className={`relative p-6 flex flex-col justify-between rounded-2xl border h-full transition-all duration-300 ${
                                            plan.isPopular
                                                ? 'border-brand-blue bg-glass-bg shadow-lg shadow-brand-blue/5 scale-[1.01] z-10'
                                                : 'border-glass-border bg-glass-bg/60'
                                        }`}
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h4 className="text-sm font-extrabold text-text-main leading-tight">{plan.name}</h4>
                                                    {plan.isPopular && (
                                                        <span className="px-2 py-0.5 bg-brand-blue/15 border border-brand-blue/25 text-brand-blue text-[8px] font-bold uppercase tracking-wider rounded-md shrink-0">
                                                            Rekomendasi
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-text-gray font-medium leading-relaxed">
                                                    {plan.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-col space-y-1">
                                                <span className="text-base font-black tracking-tight text-text-main">
                                                    Penawaran Kustom
                                                </span>
                                                <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider">
                                                    {scaleText}
                                                </span>
                                            </div>

                                            {/* Features list */}
                                            <div className="border-t border-glass-border/40 pt-4 space-y-2.5">
                                                <span className="text-[9px] uppercase font-bold tracking-wider text-text-muted block">
                                                    Cakupan Kerja
                                                </span>
                                                <ul className="space-y-2 list-none m-0 p-0">
                                                    {plan.features.map((feature, fIdx) => (
                                                        <li key={fIdx} className="flex items-start space-x-1.5 text-[11px] text-text-gray">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                                                            <span className="font-medium leading-snug">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                                                    plan.isPopular
                                                        ? 'bg-brand-blue hover:bg-brand-blue-dark text-white'
                                                        : 'bg-glass-bg hover:bg-glass-bg-hover text-text-main border border-glass-border/80'
                                                }`}
                                            >
                                                Minta Penawaran
                                            </a>
                                        </div>
                                    </SpotlightCard>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CTA Card */}
                <SpotlightCard className="p-8 md:p-10 text-center space-y-6 border border-glass-border bg-gradient-to-b from-brand-blue/5 to-transparent relative overflow-hidden">
                    <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
                    <div className="max-w-xl mx-auto space-y-3 relative z-10">
                        <h3 className="text-xl md:text-2xl font-black text-text-main tracking-tight">
                            Butuh Solusi {service.name}?
                        </h3>
                        <p className="text-sm text-text-gray leading-relaxed font-medium">
                            Konsultasikan rencana proyek Anda bersama tim konsultan teknis kami sekarang secara gratis.
                        </p>
                    </div>
                    <div className="pt-2 relative z-10">
                        <Link
                            href={`/contact?service=${encodeURIComponent(mappedContactService)}`}
                            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors shadow-lg shadow-brand-blue/15 group"
                        >
                            Mulai Diskusi Proyek
                            <ArrowLeft className="ml-2 w-4.5 h-4.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
