'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { api, Product, Pricing } from '../lib/api';
import { Download, Loader2, ArrowUpRight, Shield, Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
    product: Product;
    locale: string;
}

function formatPrice(price: number, period: string) {
    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    if (period === 'monthly') return `${formatted}/mo`;
    if (period === 'yearly') return `${formatted}/yr`;
    return formatted;
}

export default function ProductPricingWidget({ product, locale }: Props) {
    const { language } = useLanguage();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const pricings = (product.pricings || []).filter(p => p.pricing_status === 'active' || p.pricing_status === 'promotional');
    
    // Select first pricing by default if available
    const searchParams = useSearchParams();
    const [selectedPricing, setSelectedPricing] = useState<Pricing | null>(() => {
        const idFromUrl = searchParams.get('pricing_id');
        if (idFromUrl) {
            const found = pricings.find(p => p.id.toString() === idFromUrl);
            if (found) return found;
        }
        return pricings.length > 0 ? pricings[0] : null;
    });

    const [hasLicense, setHasLicense] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Current effective price
    let effectivePrice = Number(product.price);
    let effectivePeriod = product.billing_period;
    let isFree = effectivePrice === 0;

    if (selectedPricing) {
        effectivePrice = selectedPricing.sale_price && selectedPricing.sale_price > 0 
            ? Number(selectedPricing.sale_price) 
            : Number(selectedPricing.numeric_price || 0);
        effectivePeriod = selectedPricing.period;
        isFree = effectivePrice === 0;
    }

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
                    // Consider it licensed if they have an active license for this product
                    const activeLic = data.some(
                        (l: any) => l.product_id === product.id && l.status === 'active'
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
    }, [user, product.id]);

    const handleCheckout = async () => {
        if (!user) {
            const target = selectedPricing ? `/products/${product.slug}?pricing_id=${selectedPricing.id}` : `/products/${product.slug}`;
            router.push(`/login?redirect=${encodeURIComponent(target)}`);
            return;
        }

        if (hasLicense) {
            router.push('/dashboard/products');
            return;
        }

        if (selectedPricing?.is_enterprise || selectedPricing?.contact_sales || selectedPricing?.pricing_type === 'custom') {
            const whatsappMsg = `Halo Diggity, saya tertarik dengan paket ${selectedPricing.name} untuk produk ${product.name}. Mohon info lebih lanjut.`;
            window.open(`https://wa.me/6285157303035?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
            return;
        }

        setSubmitting(true);
        try {
            const res = await api.checkout({
                purchasable_type: 'product',
                purchasable_id: product.id,
                pricing_id: selectedPricing ? selectedPricing.id : undefined,
            });

            if (res.success) {
                if (res.is_free) {
                    router.push('/dashboard/orders?payment=success');
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
                            setToastMessage(language === 'en' ? 'Payment failed.' : 'Pembayaran gagal.');
                        },
                        onClose: () => {
                            setToastMessage(language === 'en' ? 'Transaction closed.' : 'Transaksi ditutup.');
                        },
                    });
                } else {
                    window.location.href = redirectUrl;
                }
            } else {
                setToastMessage(res.message || (locale === 'en' ? 'Failed to process order.' : 'Gagal memproses pesanan.'));
            }
        } catch (err: any) {
            setToastMessage(err.message || (locale === 'en' ? 'A system error occurred.' : 'Terjadi kesalahan sistem.'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDownload = async () => {
        if (!user) {
            const target = selectedPricing ? `/products/${product.slug}?pricing_id=${selectedPricing.id}` : `/products/${product.slug}`;
            router.push(`/login?redirect=${encodeURIComponent(target)}`);
            return;
        }

        setSubmitting(true);
        setToastMessage(null);
        try {
            const ext = product.file_path?.split('.').pop() || 'zip';
            const safeName = product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            await api.downloadProduct(product.id, safeName + '.' + ext);
            setToastMessage(locale === 'en' ? 'Download started.' : 'Download berhasil dimulai.');
        } catch (err: any) {
            setToastMessage(err.message || (locale === 'en' ? 'Download failed.' : 'Gagal mengunduh file.'));
        } finally {
            setSubmitting(false);
        }
    };

    const isDigitalDownload = effectivePeriod === 'one_time' && product.file_path;
    const isCustom = selectedPricing?.is_enterprise || selectedPricing?.contact_sales || selectedPricing?.pricing_type === 'custom';

    // RENDER CTA BUTTON
    const renderCTA = () => {
        if (authLoading || loading) {
            return (
                <button disabled className="w-full py-4 bg-slate-700/30 text-text-muted border border-glass-border rounded-xl text-sm font-bold flex items-center justify-center gap-1.5">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                    <span>{locale === 'en' ? 'Checking License...' : 'Memeriksa Kepemilikan...'}</span>
                </button>
            );
        }

        if (isCustom) {
            return (
                <button onClick={handleCheckout} className="flex items-center justify-center gap-1.5 w-full py-4 text-center text-sm font-bold text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 rounded-xl transition-all shadow-md cursor-pointer">
                    {selectedPricing?.cta_text || 'Contact Sales'} <ArrowUpRight className="w-4 h-4" />
                </button>
            );
        }

        if (!isDigitalDownload && !selectedPricing) {
            const whatsappMsg = `Halo Diggity, saya tertarik dengan produk ${product.name}.`;
            return (
                <a href={`https://wa.me/6285157303035?text=${encodeURIComponent(whatsappMsg)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 w-full py-4 text-center text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md">
                    {locale === 'en' ? 'Request Demo' : 'Minta Demo Layanan'} <ArrowUpRight className="w-4 h-4" />
                </a>
            );
        }

        let btnClass = 'bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/15';
        let btnText = selectedPricing?.cta_text || (isFree ? (locale === 'en' ? 'Download Free' : 'Unduh Gratis') : (locale === 'en' ? 'Buy & Download' : 'Beli & Unduh Instan'));
        
        if (hasLicense || isFree) {
            btnClass = 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/15';
            btnText = hasLicense ? (locale === 'en' ? 'My Files & License' : 'Unduh File & Lisensi Saya') : btnText;
        }

        if (selectedPricing?.is_free_trial) {
            btnText = selectedPricing?.cta_text || 'Start Free Trial';
        }

        return (
            <button
                onClick={isFree || hasLicense ? handleDownload : handleCheckout}
                disabled={submitting}
                className={`flex items-center justify-center gap-1.5 w-full py-4 text-center text-sm font-bold text-white rounded-xl transition-all shadow-md cursor-pointer ${btnClass}`}
            >
                {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>{locale === 'en' ? 'Processing...' : 'Memproses...'}</span></>
                ) : (
                    <><Download className="w-4 h-4" /><span>{btnText}</span></>
                )}
            </button>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <span className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">
                    {locale === 'en' ? 'Investment' : 'Investasi'}
                </span>
                
                {selectedPricing && selectedPricing.original_price && selectedPricing.original_price > effectivePrice && (
                    <div className="text-sm text-text-muted line-through mb-1">
                        {formatPrice(Number(selectedPricing.original_price), effectivePeriod)}
                    </div>
                )}
                
                <div className="text-4xl font-black text-brand-blue tracking-tight flex items-center gap-3">
                    {selectedPricing?.price && isNaN(Number(selectedPricing.price)) ? (
                        <span>{selectedPricing.price}</span>
                    ) : (
                        <span>{formatPrice(effectivePrice, effectivePeriod)}</span>
                    )}
                    {selectedPricing?.discount_percentage && selectedPricing.discount_percentage > 0 && (
                        <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md font-bold">
                            Save {selectedPricing.discount_percentage}%
                        </span>
                    )}
                </div>
            </div>

            {pricings.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-glass-border">
                    <span className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">
                        {locale === 'en' ? 'Select License / Plan' : 'Pilih Paket / Lisensi'}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                        {pricings.map(pricing => (
                            <button
                                key={pricing.id}
                                onClick={() => setSelectedPricing(pricing)}
                                className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                                    selectedPricing?.id === pricing.id
                                        ? 'border-brand-blue bg-brand-blue/5'
                                        : 'border-glass-border bg-transparent hover:border-brand-blue/30'
                                }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className={`font-bold text-sm ${selectedPricing?.id === pricing.id ? 'text-brand-blue' : 'text-text-main'}`}>
                                        {pricing.name}
                                    </span>
                                    {pricing.pricing_label && (
                                        <span className="text-[10px] bg-brand-blue text-white px-2 py-0.5 rounded-full font-bold">
                                            {pricing.pricing_label}
                                        </span>
                                    )}
                                </div>
                                {pricing.description && (
                                    <span className="text-xs text-text-muted mt-1">{pricing.description}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-4 pt-4 border-t border-glass-border">
                {selectedPricing && selectedPricing.features && selectedPricing.features.length > 0 ? (
                    <div className="space-y-2 mb-4">
                        <span className="font-bold text-text-main block text-sm mb-3">{locale === 'en' ? `Included in ${selectedPricing.name}:` : `Termasuk dalam ${selectedPricing.name}:`}</span>
                        {selectedPricing.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-text-gray">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                                <span>{feat}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                            <div>
                                <span className="font-bold text-text-main block">{locale === 'en' ? 'Warranty Support' : 'Dukungan Garansi'}</span>
                                <span className="text-xs">{locale === 'en' ? 'Technical support & bug fixes included.' : 'Dukungan teknis & garansi perbaikan bug.'}</span>
                            </div>
                        </div>

                        {product.license_info && (
                            <div className="flex items-start space-x-3 text-sm text-text-gray font-medium">
                                <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                                    <Info className="w-3.5 h-3.5 text-brand-blue" />
                                </div>
                                <div>
                                    <span className="font-bold text-text-main block">{locale === 'en' ? 'Product License' : 'Lisensi Produk'}</span>
                                    <span className="text-xs">{selectedPricing?.license_type ? selectedPricing.license_type : product.license_info}</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="pt-4 border-t border-glass-border flex flex-col gap-3">
                {toastMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold flex items-start justify-between gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
                        <span className="mt-0.5">{toastMessage}</span>
                        <button onClick={() => setToastMessage(null)} className="text-red-400 hover:text-red-500 p-1 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors shrink-0">?</button>
                    </div>
                )}
                {renderCTA()}
            </div>
        </div>
    );
}
