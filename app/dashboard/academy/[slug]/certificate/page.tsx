'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Award, Printer, ArrowLeft, ShieldCheck, Download, Loader2 } from 'lucide-react';

interface CertificateData {
    id: number;
    certificate_number: string;
    verification_hash: string;
    issued_at: string;
    course: {
        id: number;
        title: string;
        slug: string;
        instructor_name: string;
        instructor_title: string;
    };
}

export default function CertificatePage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
    const params = use(paramsPromise);
    const { slug } = params;
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [certificate, setCertificate] = useState<CertificateData | null>(null);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push(`/login?redirect=/dashboard/academy/${slug}/certificate`);
            return;
        }

        const fetchCertificate = async () => {
            try {
                const res = await api.getUserCertificates();
                if (res.success && res.certificates) {
                    const cert = res.certificates.find((c: CertificateData) => c.course.slug === slug);
                    if (cert) {
                        setCertificate(cert);
                    } else {
                        // User has no certificate for this course
                        router.push('/dashboard/academy');
                    }
                }
            } catch (err) {
                console.error('Error fetching certificate:', err);
                router.push('/dashboard/academy');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [user, authLoading, slug, router]);

    const handlePrint = () => {
        window.print();
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                <p className="text-slate-400 text-sm">Menyiapkan sertifikat kelulusan Anda...</p>
            </div>
        );
    }

    if (!certificate || !user) {
        return null;
    }

    const verificationUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/verify-certificate/${certificate.verification_hash}` 
        : `https://diggity.id/verify-certificate/${certificate.verification_hash}`;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(verificationUrl)}`;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-900 font-sans print:bg-white print:text-black">
            {/* Top Toolbar (Hidden on print) */}
            <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 sticky top-0 z-50 print:hidden flex items-center justify-between text-slate-200">
                <Link
                    href={`/academy/${slug}/learn`}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali Ke Kelas
                </Link>
                <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                        <ShieldCheck className="w-3.5 h-3.5" /> Sertifikat Resmi
                    </span>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-brand-blue/25"
                    >
                        <Printer className="w-4 h-4" /> Cetak / Simpan PDF
                    </button>
                </div>
            </div>

            {/* Certificate Outer Box */}
            <div className="max-w-6xl mx-auto p-4 md:p-12 print:p-0 flex items-center justify-center min-h-[calc(100vh-73px)] print:min-h-0 print:block">
                
                {/* Certificate Border Frame */}
                <div 
                    id="certificate-container"
                    className="w-full aspect-[1.414/1] max-w-5xl bg-white border-[24px] border-slate-950 relative p-8 md:p-16 flex flex-col justify-between shadow-2xl rounded-sm print:shadow-none print:border-[16px] print:p-10 print:my-0 print:mx-auto overflow-hidden"
                >
                    {/* Background premium patterns */}
                    <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                    
                    {/* Golden/Blue corner flourishes */}
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-amber-500/60 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 border-amber-500/60 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 border-amber-500/60 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-amber-500/60 pointer-events-none" />

                    {/* Top Header Section */}
                    <div className="text-center relative z-10 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl font-black tracking-wider text-slate-950">DIGGITY</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Academy</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-950 tracking-wide uppercase select-none">
                            Sertifikat Kelulusan
                        </h1>
                        <div className="w-32 h-[3px] bg-amber-500 mt-3" />
                    </div>

                    {/* Recipient Section */}
                    <div className="text-center my-6 md:my-10 relative z-10">
                        <p className="text-xs md:text-sm font-serif italic text-slate-500">Dengan bangga mempersembahkan kepada:</p>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-wide mt-3 md:mt-4 font-sans select-all decoration-amber-500 decoration-wavy underline-offset-8">
                            {user.name}
                        </h2>
                        <div className="w-full max-w-lg mx-auto h-[1px] bg-slate-200 mt-4" />
                        <p className="text-xs md:text-sm text-slate-500 mt-4 md:mt-6 leading-relaxed max-w-2xl mx-auto">
                            Atas dedikasi, partisipasi aktif, dan kelulusan luar biasa dalam menyelesaikan seluruh kurikulum materi serta tugas pelatihan tingkat profesional pada kelas:
                        </p>
                        <h3 className="text-lg md:text-2xl font-extrabold text-slate-950 tracking-normal mt-3 select-all">
                            {certificate.course.title}
                        </h3>
                    </div>

                    {/* Bottom Signature, QR Code, Stamp Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 relative z-10">
                        
                        {/* Instructor Signature (Left) */}
                        <div className="text-center min-w-[160px]">
                            {/* Mock Signature text */}
                            <p className="font-serif italic text-lg text-slate-700 select-none pointer-events-none h-8 flex items-end justify-center">
                                {certificate.course.instructor_name.split(' ').map(n => n[0]).join('')}. Signature
                            </p>
                            <div className="w-full h-[1px] bg-slate-300 mt-2" />
                            <p className="text-xs font-bold text-slate-950 mt-1.5">{certificate.course.instructor_name}</p>
                            <p className="text-[10px] text-slate-500">{certificate.course.instructor_title}</p>
                        </div>

                        {/* QR Code & Verify Info (Center) */}
                        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-2.5 rounded-xl print:bg-white print:border-slate-200">
                            {/* QR Code Embed */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={qrCodeUrl} 
                                alt="Verification QR Code" 
                                className="w-16 h-16 pointer-events-none select-none border border-slate-200" 
                            />
                            <div className="text-left text-slate-500">
                                <p className="text-[8px] uppercase tracking-widest text-slate-400">Verifikasi Resmi</p>
                                <p className="text-[9px] font-mono font-bold text-slate-900 mt-0.5">{certificate.certificate_number}</p>
                                <p className="text-[8px] mt-0.5 leading-tight max-w-[130px]">
                                    Scan QR code untuk melihat status kelulusan di portal resmi Diggity.
                                </p>
                            </div>
                        </div>

                        {/* Director / Stamp (Right) */}
                        <div className="text-center min-w-[160px] relative">
                            {/* Mock Corporate Seal / Stamp */}
                            <div className="absolute -top-12 -left-6 w-20 h-20 rounded-full border-4 border-double border-amber-600/35 flex items-center justify-center select-none pointer-events-none rotate-12 flex-col text-[8px] font-black text-amber-600/40 uppercase tracking-wider">
                                <span>DIGGITY</span>
                                <span>ACADEMY</span>
                            </div>
                            
                            {/* Mock Signature text */}
                            <p className="font-serif italic text-lg text-slate-700 select-none pointer-events-none h-8 flex items-end justify-center">
                                Aji Resink. CEO
                            </p>
                            <div className="w-full h-[1px] bg-slate-300 mt-2" />
                            <p className="text-xs font-bold text-slate-950 mt-1.5">Aji Resink Abis</p>
                            <p className="text-[10px] text-slate-500">CEO & Founder, Diggity</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Print Media Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        background-color: white !important;
                        color: black !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }
                    #certificate-container {
                        border-[16px] border-black !important;
                        box-shadow: none !important;
                        width: 297mm !important;
                        height: 210mm !important;
                        padding: 15mm !important;
                        margin: 0 !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
