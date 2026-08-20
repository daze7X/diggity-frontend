'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SpotlightCard from './SpotlightCard';
import { 
    CreditCard, 
    Users, 
    TrendingUp, 
    ShoppingCart, 
    Box, 
    Home as HomeIcon, 
    Cpu, 
    Layers, 
    FileText, 
    UserCheck, 
    Calendar, 
    Activity, 
    HelpCircle, 
    Mail, 
    Bot, 
    MessageSquare, 
    Eye, 
    BarChart, 
    Cloud, 
    HardDrive, 
    Globe, 
    Zap, 
    Layout, 
    Image as ImageIcon, 
    Smartphone, 
    PenTool, 
    Sparkles, 
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

interface ProductItem {
    name: string;
    descId: string;
    descEn: string;
    icon: React.ComponentType<any>;
}

interface HomeProductsProps {
    locale: string;
}

export default function HomeProducts({ locale }: HomeProductsProps) {
    const [activeTab, setActiveTab] = useState<'business' | 'ai' | 'cloud' | 'marketplace'>('business');

    const categories = [
        { id: 'business', nameId: 'Business Software', nameEn: 'Business Software' },
        { id: 'ai', nameId: 'AI Products', nameEn: 'AI Products' },
        { id: 'cloud', nameId: 'Cloud Products', nameEn: 'Cloud Products' },
        { id: 'marketplace', nameId: 'Digital Marketplace', nameEn: 'Digital Marketplace' },
    ];

    const businessProducts: ProductItem[] = [
        { name: 'Diggity Finance', icon: CreditCard, descId: 'Kelola keuangan, pengeluaran, dan laporan laba rugi perusahaan secara real-time.', descEn: 'Manage company finances, expenses, and real-time income statements.' },
        { name: 'Diggity CRM', icon: Users, descId: 'Sistem manajemen hubungan pelanggan untuk meningkatkan penjualan dan loyalitas.', descEn: 'Customer relationship management system to boost sales and loyalty.' },
        { name: 'Diggity Sales', icon: TrendingUp, descId: 'Otomatisasi pipa penjualan, estimasi penawaran, dan pelacakan target.', descEn: 'Automate sales pipeline, quotations, and target tracking.' },
        { name: 'Diggity Purchasing', icon: ShoppingCart, descId: 'Kelola rantai pengadaan, pesanan pembelian, dan audit pemasok.', descEn: 'Manage procurement chain, purchase orders, and supplier audits.' },
        { name: 'Diggity Inventory', icon: Box, descId: 'Pantau stok barang, transfer stok antar gudang secara akurat.', descEn: 'Monitor stock levels, accurate stock transfers between warehouses.' },
        { name: 'Diggity Warehouse', icon: HomeIcon, descId: 'Manajemen tata letak gudang, pengambilan barang, dan logistik pengiriman.', descEn: 'Warehouse layout management, picking, and shipping logistics.' },
        { name: 'Diggity Manufacturing', icon: Cpu, descId: 'Perencanaan produksi (MRP), kelola bill of materials (BOM), dan kapasitas mesin.', descEn: 'Production planning (MRP), bill of materials (BOM), and machine capacity.' },
        { name: 'Diggity Project', icon: Layers, descId: 'Kelola proyek tim, kolaborasi tugas, bagan Gantt, dan lembar waktu.', descEn: 'Manage team projects, task collaboration, Gantt charts, and timesheets.' },
        { name: 'Diggity Commerce', icon: Globe, descId: 'Platform e-commerce B2B/B2C terintegrasi dengan inventaris dan pembayaran.', descEn: 'B2B/B2C e-commerce platform integrated with inventory and payments.' },
        { name: 'Diggity HR', icon: UserCheck, descId: 'Kelola data karyawan, kontrak kerja, cuti, dan administrasi HRD.', descEn: 'Manage employee data, contracts, leave, and HR administration.' },
        { name: 'Diggity Payroll', icon: FileText, descId: 'Sistem slip gaji otomatis, perhitungan PPh 21, dan integrasi bank.', descEn: 'Automated payslip system, tax calculations, and bank integration.' },
        { name: 'Diggity POS', icon: CreditCard, descId: 'Aplikasi kasir digital untuk toko ritel, restoran, dan franchise.', descEn: 'Digital cashier app for retail stores, restaurants, and franchises.' },
        { name: 'Diggity Asset', icon: Activity, descId: 'Audit dan pelacakan aset fisik, depresiasi nilai, dan jadwal pemeliharaan.', descEn: 'Audit and track physical assets, value depreciation, and maintenance.' },
        { name: 'Diggity Helpdesk', icon: HelpCircle, descId: 'Sistem tiket dukungan pelanggan untuk menyelesaikan kendala secara cepat.', descEn: 'Customer support ticketing system to resolve issues rapidly.' },
        { name: 'Diggity E-Office', icon: Mail, descId: 'Persuratan digital, tanda tangan elektronik, dan arsip dokumen resmi.', descEn: 'Digital correspondence, electronic signatures, and official document archives.' }
    ];

    const aiProducts: ProductItem[] = [
        { name: 'Diggity AI Agent', icon: Bot, descId: 'Asisten AI kustom yang terlatih dengan basis pengetahuan internal perusahaan.', descEn: 'Custom AI assistant trained on your company\'s internal knowledge base.' },
        { name: 'Diggity AI Chat', icon: MessageSquare, descId: 'Layanan bot percakapan cerdas untuk otomatisasi CS di WA, Web, dan IG.', descEn: 'Smart chat bot for CS automation on WhatsApp, Web, and Instagram.' },
        { name: 'Diggity AI Vision', icon: Eye, descId: 'Analisis gambar dan video berbasis AI untuk keamanan dan deteksi objek.', descEn: 'AI-based image and video analysis for security and object detection.' },
        { name: 'Diggity AI Analytics', icon: BarChart, descId: 'Prediksi tren bisnis dan analisis big data dengan kecerdasan buatan.', descEn: 'Predict business trends and analyze big data with artificial intelligence.' }
    ];

    const cloudProducts: ProductItem[] = [
        { name: 'Diggity Cloud', icon: Cloud, descId: 'Infrastruktur VPS dan server cloud berkinerja tinggi dengan uptime 99.9%.', descEn: 'High-performance VPS and cloud server infrastructure with 99.9% uptime.' },
        { name: 'Diggity Hosting', icon: HardDrive, descId: 'Shared hosting premium yang cepat dan aman untuk situs bisnis.', descEn: 'Premium shared hosting, fast and secure for business sites.' },
        { name: 'Diggity API', icon: Zap, descId: 'Integrasi gerbang pembayaran, logistik, dan SMS gateway global.', descEn: 'Payment gateway, logistics, and global SMS gateway integration.' },
        { name: 'Diggity Workspace', icon: Mail, descId: 'Kolaborasi email profesional dan penyimpanan berkas cloud aman.', descEn: 'Professional email collaboration and secure cloud file storage.' }
    ];

    const marketplaceProducts: ProductItem[] = [
        { name: 'UI Kit', icon: Layout, descId: 'Paket desain UI modern berbasis Figma untuk percepatan pembuatan aplikasi.', descEn: 'Figma-based modern UI design bundle to accelerate app creation.' },
        { name: 'Website Template', icon: Globe, descId: 'Template web responsif siap pakai dengan performa SEO optimal.', descEn: 'Ready-to-use responsive web templates with optimal SEO performance.' },
        { name: 'Mobile Template', icon: Smartphone, descId: 'Arsitektur kode aplikasi mobile siap pakai (React Native/Flutter).', descEn: 'Ready-to-use mobile app code architecture (React Native/Flutter).' },
        { name: 'Icons', icon: Sparkles, descId: 'Koleksi ribuan ikon kustom beresolusi tinggi untuk berbagai platform.', descEn: 'Collection of thousands of high-resolution custom icons for all platforms.' },
        { name: 'Illustration', icon: ImageIcon, descId: 'Aset gambar ilustrasi vektor unik untuk mempercantik landing page.', descEn: 'Unique vector illustration assets to beautify your landing pages.' },
        { name: 'Digital Assets', icon: PenTool, descId: 'Koleksi materi branding, media kit, dan grafis presentasi profesional.', descEn: 'Bundle of branding materials, media kits, and professional presentation graphics.' },
        { name: 'Plugins', icon: Zap, descId: 'Ekstensi dan add-on siap pakai untuk WordPress, Odoo, dan Shopify.', descEn: 'Ready-to-use extensions and add-ons for WordPress, Odoo, and Shopify.' }
    ];

    const getActiveProducts = () => {
        switch (activeTab) {
            case 'business': return businessProducts;
            case 'ai': return aiProducts;
            case 'cloud': return cloudProducts;
            case 'marketplace': return marketplaceProducts;
            default: return [];
        }
    };

    const activeList = getActiveProducts();

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-glass-border/30 pb-6">
                {categories.map((cat) => {
                    const isActive = activeTab === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id as any)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                                isActive 
                                    ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/15'
                                    : 'bg-glass-bg border-glass-border text-text-gray hover:border-brand-blue/30 hover:text-text-main'
                            }`}
                        >
                            {locale === 'en' ? cat.nameEn : cat.nameId}
                        </button>
                    );
                })}
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeList.map((prod, idx) => {
                    const Icon = prod.icon;
                    return (
                        <SpotlightCard key={idx} className="p-6 text-left flex flex-col justify-between h-full group hover:border-brand-blue/30 transition-all duration-300">
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-base font-extrabold text-text-main">{prod.name}</h4>
                                    <p className="text-xs text-text-gray leading-relaxed line-clamp-3">
                                        {locale === 'en' ? prod.descEn : prod.descId}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-5 mt-4 border-t border-glass-border/30 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider">
                                    {locale === 'en' ? 'Premium Software' : 'Software Unggulan'}
                                </span>
                                <Link 
                                    href={`/products?name=${encodeURIComponent(prod.name)}`} 
                                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-0.5 group/link"
                                >
                                    <span>{locale === 'en' ? 'Learn More' : 'Pelajari Selengkapnya'}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </SpotlightCard>
                    );
                })}
            </div>
        </div>
    );
}
