'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { PlayCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
    courseId: number;
    courseSlug: string;
    price: number;
    title: string;
}

export default function EnrollmentCTA({ courseId, courseSlug, price, title }: Props) {
    const { language } = useLanguage();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const checkEnrollmentStatus = async () => {
            if (!user) {
                setEnrolled(false);
                setLoading(false);
                return;
            }

            try {
                const data = await api.getUserCourses();
                if (Array.isArray(data)) {
                    const isEnrolled = data.some(
                        (e: any) => e.course_id === courseId && (e.status === 'active' || e.status === 'completed')
                    );
                    setEnrolled(isEnrolled);
                }
            } catch (err) {
                console.error('Failed to verify enrollment:', err);
            } finally {
                setLoading(false);
            }
        };

        checkEnrollmentStatus();
    }, [user, courseId]);

    const handleAction = async () => {
        if (!user) {
            router.push(`/login?redirect=/academy/${courseSlug}`);
            return;
        }

        if (enrolled) {
            router.push(`/academy/${courseSlug}/learn`);
            return;
        }

        // Trigger checkout
        setSubmitting(true);
        try {
            const res = await api.checkout({
                purchasable_type: 'course',
                purchasable_id: courseId,
            });

            if (res.success) {
                if (res.is_free) {
                    router.push('/dashboard/academy');
                    return;
                }
                
                const snapToken = res.snap_token;
                const redirectUrl = res.redirect_url;

                if ((window as any).snap) {
                    (window as any).snap.pay(snapToken, {
                        onSuccess: () => {
                            router.push('/dashboard/orders?payment=success');
                        },
                        onPending: () => {
                            router.push('/dashboard/orders?payment=pending');
                        },
                        onError: () => {
                            setToastMessage(language === 'en' ? 'Payment failed or encountered an error.' : 'Pembayaran gagal atau terjadi kesalahan.');
                        },
                        onClose: () => {
                            setToastMessage(language === 'en' ? 'Payment cancelled. You closed the popup.' : 'Pembayaran dibatalkan. Anda menutup popup pembayaran.');
                        },
                    });
                } else {
                    window.location.href = redirectUrl;
                }
            } else {
                setToastMessage(res.message || (language === 'en' ? 'Failed to process enrollment.' : 'Gagal memproses pendaftaran.'));
            }
        } catch (err: any) {
            setToastMessage(err.message || (language === 'en' ? 'System error occurred during checkout.' : 'Terjadi kesalahan sistem saat checkout.'));
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <button
                disabled
                className="w-full py-4 bg-slate-700/30 text-text-muted border border-glass-border rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
            >
                <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                <span>Memeriksa Akses...</span>
            </button>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {toastMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold flex items-start justify-between gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <span className="mt-0.5">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="text-red-400 hover:text-red-500 p-1 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors shrink-0">✕</button>
                </div>
            )}
            <button
                onClick={handleAction}
                disabled={submitting}
                className={`w-full py-4 text-center text-sm font-bold text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    enrolled
                        ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/15'
                        : 'bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/15'
                }`}
            >
                {submitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mempersiapkan Pembayaran...</span>
                    </>
                ) : enrolled ? (
                    <>
                        <PlayCircle className="w-4 h-4" />
                        <span>Masuk Kelas Belajar</span>
                    </>
                ) : (
                    <>
                        <span>{price === 0 ? 'Daftar Kelas Gratis' : 'Daftar & Beli Kelas'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    );
}
