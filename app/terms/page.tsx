import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Shield, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan | Diggity',
    description: 'Syarat & Ketentuan Penggunaan Layanan dan Platform IT Diggity.',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <div className="mb-8">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Card Container */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl"></div>

                    <div className="relative space-y-8">
                        {/* Header */}
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 text-center md:text-left">
                            <div className="inline-flex p-3 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue rounded-2xl mb-4">
                                <Scale className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white">
                                Syarat & Ketentuan
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Terakhir Diperbarui: 6 Agustus 2026
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            <p>
                                Dengan mengakses dan menggunakan website serta platform layanan kami di <strong>Diggity</strong>, Anda dianggap telah menyetujui dan terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui salah satu bagian dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan kami.
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-brand-blue" />
                                1. Penggunaan Platform & Layanan
                            </h3>
                            <p>
                                Diggity menyediakan platform untuk pencarian lowongan kerja (Job Connect), pembelian produk digital/Source Code, dan pembelajaran mandiri (LMS Academy). Anda setuju untuk menggunakan platform ini hanya untuk tujuan yang sah, etis, dan tidak melanggar hukum yang berlaku di Republik Indonesia.
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-brand-blue" />
                                2. Akun Pengguna & Keamanan
                            </h3>
                            <p>
                                Untuk mengakses beberapa fitur utama seperti Dashboard produk atau Academy, Anda diharuskan melakukan registrasi akun. Anda bertanggung jawab penuh atas kerahasiaan informasi akun dan kata sandi Anda. Diggity tidak bertanggung jawab atas kerugian akibat penyalahgunaan akun Anda oleh pihak ketiga.
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-brand-blue" />
                                3. Ketentuan Transaksi & Produk Digital
                            </h3>
                            <p>
                                Seluruh pembayaran produk digital dan biaya kursus di platform Diggity diproses melalui sistem gerbang pembayaran terpercaya (Midtrans). 
                            </p>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li>Semua pembelian produk digital bersifat final dan **tidak dapat dikembalikan (non-refundable)** setelah lisensi diterbitkan.</li>
                                <li>Pengguna dilarang mendistribusikan ulang atau menjual kembali source code yang dibeli dari Diggity tanpa izin tertulis dari pihak manajemen.</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-brand-blue" />
                                4. Batasan Tanggung Jawab
                            </h3>
                            <p>
                                Diggity berhak untuk memperbarui, mengubah, atau menghentikan sebagian layanan kami kapan saja tanpa pemberitahuan sebelumnya. Kami tidak menjamin bahwa website kami akan selalu bebas dari gangguan teknis atau error sistem, namun kami akan berupaya semaksimal mungkin untuk meminimalkan kendala tersebut demi kelancaran bisnis kawan.
                            </p>
                        </div>

                        {/* Footer Action */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center">
                            <Link 
                                href="/" 
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/10"
                            >
                                Saya Setuju
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
