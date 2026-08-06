import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Lock, Eye, FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kebijakan Privasi | Diggity',
    description: 'Kebijakan Privasi Layanan dan Penggunaan Data Pengguna Diggity.',
};

export default function PrivacyPolicy() {
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
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white">
                                Kebijakan Privasi
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Terakhir Diperbarui: 6 Agustus 2026
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            <p>
                                Selamat datang di <strong>Diggity</strong>. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan membagikan informasi Anda saat Anda menggunakan website, layanan IT, LMS Academy, maupun fitur rekrutmen kami.
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-brand-blue" />
                                1. Informasi yang Kami Kumpulkan
                            </h3>
                            <p>
                                Kami mengumpulkan informasi yang Anda berikan secara sukarela saat mengisi formulir lamaran kerja, mendaftar ke kursus Academy, membeli produk digital, atau menghubungi tim dukungan kami. Informasi ini meliputi:
                            </p>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li><strong>Data Identitas:</strong> Nama lengkap, alamat email, nomor telepon, dan nomor WhatsApp.</li>
                                <li><strong>Data Lamaran Kerja (Job Connect):</strong> Berkas Curriculum Vitae (CV) dalam format PDF yang Anda unggah secara aman.</li>
                                <li><strong>Data Transaksi:</strong> Informasi pesanan dan status pembayaran (yang diproses secara aman melalui gerbang pembayaran Midtrans).</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-brand-blue" />
                                2. Bagaimana Kami Melindungi Data Anda
                            </h3>
                            <p>
                                Keamanan data Anda adalah prioritas utama kami. 
                                Dokumen sensitif seperti CV pelamar kerja disimpan di dalam media penyimpanan awan privat (Private Cloud Storage) yang tidak dapat diakses langsung secara publik. Hanya administrator resmi Diggity yang memiliki akses terotentikasi untuk meninjau berkas CV kawan demi keperluan seleksi kerja.
                            </p>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-brand-blue" />
                                3. Penggunaan Informasi
                            </h3>
                            <p>
                                Informasi yang kami kumpulkan digunakan untuk:
                            </p>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li>Memproses lamaran pekerjaan Anda dan membagikannya secara selektif dengan mitra vendor IT kami.</li>
                                <li>Mengirimkan konfirmasi pesanan, memproses transaksi digital, dan membagikan lisensi produk digital Anda.</li>
                                <li>Memberikan pembaruan status kelulusan materi atau penerbitan sertifikat digital di LMS Academy kami.</li>
                                <li>Mengoptimalkan kualitas tampilan website kami menggunakan alat pelacak perilaku anonim (seperti Google Analytics).</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-950 dark:text-white pt-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-brand-blue" />
                                4. Hubungi Kami
                            </h3>
                            <p>
                                Jika Anda memiliki pertanyaan atau kekhawatiran tentang bagaimana kami mengelola data pribadi Anda, kawan dapat menghubungi kami melalui halaman kontak utama kami atau mengirimkan email dukungan ke tim administrasi kami.
                            </p>
                        </div>

                        {/* Footer Action */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center">
                            <Link 
                                href="/" 
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/10"
                            >
                                Saya Mengerti
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
