'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { PlayCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
    courseId: number;
    courseSlug: string;
    price: number;
    title: string;
}

export default function EnrollmentCTA({ courseId, courseSlug, price, title }: Props) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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
                            alert('Pembayaran gagal.');
                        },
                        onClose: () => {
                            alert('Anda menutup popup pembayaran sebelum menyelesaikan transaksi.');
                        },
                    });
                } else {
                    // Fallback to mock simulator URL or sandbox redirect
                    window.location.href = redirectUrl;
                }
            } else {
                alert(res.message || 'Gagal membuat invoice pembayaran.');
            }
        } catch (err: any) {
            alert(err.message || 'Terjadi kesalahan sistem saat melakukan checkout.');
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
    );
}
