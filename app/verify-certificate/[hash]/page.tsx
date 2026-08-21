'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Award, CheckCircle, AlertTriangle, ShieldCheck, Calendar, User, BookOpen, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CertificateData {
    number: string;
    hash: string;
    issued_at: string;
    recipient_name: string;
    course_title: string;
    course_slug: string;
    instructor_name: string;
    instructor_title: string;
}

export default function VerifyCertificatePage({ params: paramsPromise }: { params: Promise<{ hash: string }> }) {
    const params = use(paramsPromise);
    const { hash } = params;
    const { language: locale } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [certificate, setCertificate] = useState<CertificateData | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!hash) return;
        
        const fetchVerification = async () => {
            try {
                const res = await api.verifyCertificate(hash);
                if (res.success && res.certificate) {
                    setCertificate(res.certificate);
                } else {
                    setError(res.message || (locale === 'en' ? 'Invalid certificate.' : 'Sertifikat tidak valid.'));
                }
            } catch (err: any) {
                console.error(err);
                setError(locale === 'en' ? 'Certificate not found or verification code is invalid.' : 'Sertifikat tidak ditemukan atau kode verifikasi tidak valid.');
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [hash, locale]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-xl z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block text-2xl font-black tracking-wider text-white">
                        DIGGITY<span className="text-brand-blue">.</span>
                    </Link>
                    <p className="text-slate-400 text-xs mt-1">Verification Authority System</p>
                </div>

                {loading ? (
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
                        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 text-sm">{locale === 'en' ? 'Verifying certificate authenticity...' : 'Sedang memverifikasi keabsahan sertifikat...'}</p>
                    </div>
                ) : error || !certificate ? (
                    <div className="bg-slate-900/50 backdrop-blur-md border border-rose-500/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
                        
                        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-6 border border-rose-500/20 animate-pulse">
                            <AlertTriangle className="w-8 h-8" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-3">{locale === 'en' ? 'Invalid Certificate' : 'Sertifikat Tidak Valid'}</h1>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                            {locale === 'en' ? 'Sorry, the certificate verification hash code you entered is not registered or has been archived from Diggity\'s official database system.' : 'Maaf, kode hash verifikasi sertifikat yang Anda masukkan tidak terdaftar atau telah diarsipkan dari sistem database resmi Diggity.'}
                        </p>

                        <div className="space-y-3">
                            <Link
                                href="/"
                                className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors"
                            >
                                {locale === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 backdrop-blur-md border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Premium golden linear top indicator */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
                        
                        {/* Golden Glowing Badge */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/20 text-yellow-500 flex items-center justify-center mx-auto mb-6 border-2 border-yellow-500/30 shadow-xl shadow-yellow-500/10">
                            <ShieldCheck className="w-10 h-10" />
                        </div>

                        <div className="text-center mb-8">
                            <span className="inline-flex items-center gap-1.5 px-3  py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                                <CheckCircle className="w-3.5 h-3.5" /> Verified & Valid
                            </span>
                            <h1 className="text-2xl font-extrabold text-white mt-3">{locale === 'en' ? 'Certificate Verification Successful' : 'Verifikasi Sertifikat Berhasil'}</h1>
                            <p className="text-slate-400 text-xs mt-1">{locale === 'en' ? 'This certificate is officially issued by Diggity Academy.' : 'Sertifikat ini resmi diterbitkan oleh Diggity Academy.'}</p>
                        </div>

                        {/* Certificate Details Card */}
                        <div className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800 space-y-5 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 mt-0.5">
                                    <User className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{locale === 'en' ? 'Recipient Name' : 'Nama Penerima'}</p>
                                    <p className="text-base font-bold text-white mt-0.5">{certificate.recipient_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 mt-0.5">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{locale === 'en' ? 'Class / Program Name' : 'Nama Kelas / Program'}</p>
                                    <p className="text-base font-bold text-white mt-0.5">{certificate.course_title}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 mt-0.5">
                                    <Award className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{locale === 'en' ? 'Certificate Number' : 'Nomor Sertifikat'}</p>
                                    <p className="text-sm font-mono text-amber-400 mt-0.5">{certificate.number}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 mt-0.5">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{locale === 'en' ? 'Date Issued' : 'Tanggal Diterbitkan'}</p>
                                    <p className="text-sm font-bold text-white mt-0.5">
                                        {new Date(certificate.issued_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-400" /> {locale === 'en' ? 'Copied!' : 'Tersalin!'}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" /> {locale === 'en' ? 'Copy Link' : 'Salin Tautan'}
                                    </>
                                )}
                            </button>
                            <Link
                                href={`/academy/${certificate.course_slug}`}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'View Class Details' : 'Lihat Detail Kelas'}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
