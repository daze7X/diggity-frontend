import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Shield, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { getLocaleServer } from '../../lib/locale-server';

export const metadata: Metadata = {
    title: 'Terms of Service | Diggity',
    description: 'Terms of Service and Usage of Diggity IT Platform.',
};

export default async function TermsOfService() {
    const locale = await getLocaleServer();
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
                        {locale === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
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
                                {locale === 'en' ? 'Terms of Service' : 'Syarat & Ketentuan'}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                {locale === 'en' ? 'Last Updated: August 6, 2026' : 'Terakhir Diperbarui: 6 Agustus 2026'}
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            <p>
                                {locale === 'en' ? 'By accessing and using our website and service platform at ' : 'Dengan mengakses dan menggunakan website serta platform layanan kami di '}<strong>Diggity</strong>{locale === 'en' ? ', you are deemed to have agreed to and are bound by the following Terms and Conditions. If you do not agree to any part of these terms, please do not continue to use our services.' : ', Anda dianggap telah menyetujui dan terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui salah satu bagian dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan kami.'}
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-brand-blue" />
                                {locale === 'en' ? '1. Platform & Service Usage' : '1. Penggunaan Platform & Layanan'}
                            </h3>
                            <p>
                                {locale === 'en' ? 'Diggity provides a platform for job searching (Job Connect), digital products/Source Code purchasing, and independent learning (LMS Academy). You agree to use this platform only for lawful, ethical purposes, and not to violate applicable laws in the Republic of Indonesia.' : 'Diggity menyediakan platform untuk pencarian lowongan kerja (Job Connect), pembelian produk digital/Source Code, dan pembelajaran mandiri (LMS Academy). Anda setuju untuk menggunakan platform ini hanya untuk tujuan yang sah, etis, dan tidak melanggar hukum yang berlaku di Republik Indonesia.'}
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-brand-blue" />
                                {locale === 'en' ? '2. User Account & Security' : '2. Akun Pengguna & Keamanan'}
                            </h3>
                            <p>
                                {locale === 'en' ? 'To access some main features like the Product Dashboard or Academy, you are required to register an account. You are fully responsible for the confidentiality of your account information and password. Diggity is not responsible for losses due to the misuse of your account by third parties.' : 'Untuk mengakses beberapa fitur utama seperti Dashboard produk atau Academy, Anda diharuskan melakukan registrasi akun. Anda bertanggung jawab penuh atas kerahasiaan informasi akun dan kata sandi Anda. Diggity tidak bertanggung jawab atas kerugian akibat penyalahgunaan akun Anda oleh pihak ketiga.'}
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-brand-blue" />
                                {locale === 'en' ? '3. Transactions & Digital Products Terms' : '3. Ketentuan Transaksi & Produk Digital'}
                            </h3>
                            <p>
                                {locale === 'en' ? 'All digital product payments and course fees on the Diggity platform are processed through a trusted payment gateway system (Midtrans).' : 'Seluruh pembayaran produk digital dan biaya kursus di platform Diggity diproses melalui sistem gerbang pembayaran terpercaya (Midtrans).'} 
                            </p>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li>{locale === 'en' ? 'All digital product purchases are final and **non-refundable** after the license is issued.' : 'Semua pembelian produk digital bersifat final dan **tidak dapat dikembalikan (non-refundable)** setelah lisensi diterbitkan.'}</li>
                                <li>{locale === 'en' ? 'Users are prohibited from redistributing or reselling source codes purchased from Diggity without written permission from management.' : 'Pengguna dilarang mendistribusikan ulang atau menjual kembali source code yang dibeli dari Diggity tanpa izin tertulis dari pihak manajemen.'}</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-brand-blue" />
                                {locale === 'en' ? '4. Limitation of Liability' : '4. Batasan Tanggung Jawab'}
                            </h3>
                            <p>
                                {locale === 'en' ? 'Diggity reserves the right to update, modify, or discontinue any part of our services at any time without prior notice. We do not guarantee that our website will always be free from technical disruptions or system errors, but we will make every effort to minimize these issues for the smooth running of your business.' : 'Diggity berhak untuk memperbarui, mengubah, atau menghentikan sebagian layanan kami kapan saja tanpa pemberitahuan sebelumnya. Kami tidak menjamin bahwa website kami akan selalu bebas dari gangguan teknis atau error sistem, namun kami akan berupaya semaksimal mungkin untuk meminimalkan kendala tersebut demi kelancaran bisnis kawan.'}
                            </p>
                        </div>

                        {/* Footer Action */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center">
                            <Link 
                                href="/" 
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/10"
                            >
                                {locale === 'en' ? 'I Agree' : 'Saya Setuju'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
