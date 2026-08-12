'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Download, Loader2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
    productId: number;
    productSlug: string;
    price: number;
    name: string;
    billingPeriod: string;
    filePath: string | null;
}

export default function ProductPurchaseCTA({ productId, productSlug, price, name, billingPeriod, filePath }: Props) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [hasLicense, setHasLicense] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const checkLicenseStatus = async () => {
            if (!user) {
                setHasLicense(false);
                setLoading(false);
                return;
            }

            try {
                const data = await api.getUserProducts();
                if (Array.isArray(data)) {
                    const activeLic = data.some(
                        (l: any) => l.product_id === productId && l.status === 'active'
                    );
                    setHasLicense(activeLic);
                }
            } catch (err) {
                console.error('Failed to verify license:', err);
            } finally {
                setLoading(false);
            }
        };

        checkLicenseStatus();
    }, [user, productId]);

    const handleCheckout = async () => {
        if (!user) {
            router.push(`/login?redirect=/products/${productSlug}`);
            return;
        }

        if (hasLicense) {
            router.push('/dashboard/products');
            return;
        }

        setSubmitting(true);
        try {
            const res = await api.checkout({
                purchasable_type: 'product',
                purchasable_id: productId,
            });

            if (res.success) {
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
                    window.location.href = redirectUrl;
                }
            } else {
                alert(res.message || 'Gagal memproses pesanan.');
            }
        } catch (err: any) {
            alert(err.message || 'Terjadi kesalahan sistem saat checkout.');
        } finally {
            setSubmitting(false);
        }
    };

    const isDigitalDownload = billingPeriod === 'one_time' && filePath;

    if (!isDigitalDownload) {
        const whatsappMsg = `Halo Diggity, saya tertarik dengan produk ${name}. Apakah saya bisa meminta demo layanan atau berkonsultasi mengenai produk ini? Terima kasih!`;
        const whatsappUrl = `https://wa.me/6285157303035?text=${encodeURIComponent(whatsappMsg)}`;

        return (
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-4 text-center text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/15 cursor-pointer"
            >
                Minta Demo Layanan <ArrowUpRight className="w-4 h-4" />
            </a>
        );
    }

    if (authLoading || loading) {
        return (
            <button
                disabled
                className="w-full py-4 bg-slate-700/30 text-text-muted border border-glass-border rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
            >
                <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                <span>Memeriksa Kepemilikan...</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleCheckout}
            disabled={submitting}
            className={`flex items-center justify-center gap-1.5 w-full py-4 text-center text-sm font-bold text-white rounded-xl transition-all shadow-md cursor-pointer ${
                hasLicense
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/15'
                    : 'bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/15'
            }`}
        >
            {submitting ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menghubungkan ke Midtrans...</span>
                </>
            ) : hasLicense ? (
                <>
                    <Download className="w-4 h-4" />
                    <span>Unduh File & Lisensi Saya</span>
                </>
            ) : (
                <>
                    <Download className="w-4 h-4" />
                    <span>Beli & Unduh Instan</span>
                </>
            )}
        </button>
    );
}
