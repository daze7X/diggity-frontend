'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Clock, ShieldAlert } from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';

interface OrderItem {
    id: number;
    purchasable_type: string;
    price: string;
    product?: {
        name: string;
    };
    course?: {
        title: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    total_amount: string;
    status: string;
    payment_method: string;
    payment_status: string;
    created_at: string;
    items?: OrderItem[];
}

export default function UserOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const headers: HeadersInit = token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
                
                const res = await fetch(`${API_URL}/user/orders`, { headers });
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setOrders(data);
                }
            } catch (err) {
                console.error('Failed to load user orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [API_URL]);

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseFloat(price));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6 text-left animate-fade-in">
            <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">Riwayat Transaksi</h2>
                <p className="text-xs md:text-sm text-text-muted">Pantau status transaksi masuk dan metode pembayaran yang Anda lakukan.</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
                        <span className="text-xs text-text-muted font-bold font-mono">Memuat pesanan...</span>
                    </div>
                ) : orders.length > 0 ? (
                    orders.map((order) => {
                        const isPaid = order.payment_status === 'paid';
                        const isPending = order.payment_status === 'pending';
                        
                        return (
                            <SpotlightCard key={order.id} className="p-6 md:p-8 border border-glass-border text-left">
                                <div className="space-y-4">
                                    
                                    {/* Order Meta Header */}
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-glass-border/30 pb-3 gap-2 text-xs md:text-sm">
                                        <div>
                                            <span className="text-text-muted">No. Pesanan:</span>{' '}
                                            <strong className="text-brand-blue font-mono font-bold uppercase tracking-wider">{order.order_number}</strong>
                                        </div>
                                        <div className="text-text-muted font-medium">
                                            Tanggal: {formatDate(order.created_at)}
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-2">
                                        {order.items?.map((item) => {
                                            const itemName = item.product?.name || item.course?.title || 'Produk Digital';
                                            return (
                                                <div key={item.id} className="flex justify-between items-center text-xs md:text-sm text-text-gray font-medium">
                                                    <span>{itemName}</span>
                                                    <span>{formatPrice(item.price)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Total and Badges Footer */}
                                    <div className="border-t border-glass-border/30 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-center space-x-4">
                                            {/* Payment status badge */}
                                            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider">
                                                {isPaid ? (
                                                    <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md flex items-center gap-1">
                                                        <ShieldCheck className="w-3.5 h-3.5" /> Lunas
                                                    </span>
                                                ) : isPending ? (
                                                    <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-md flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" /> Pending
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-md flex items-center gap-1">
                                                        <ShieldAlert className="w-3.5 h-3.5" /> Gagal
                                                    </span>
                                                )}
                                            </div>

                                            {/* Payment method */}
                                            <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider">
                                                Metode: <strong className="text-text-main">{order.payment_method}</strong>
                                            </div>
                                        </div>

                                        {/* Total amount */}
                                        <div className="text-right">
                                            <span className="text-[10px] text-text-muted uppercase font-bold block">Total Bayar</span>
                                            <span className="text-lg font-black text-brand-blue">{formatPrice(order.total_amount)}</span>
                                        </div>
                                    </div>

                                </div>
                            </SpotlightCard>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl space-y-4">
                        <ShoppingBag className="w-12 h-12 mx-auto text-brand-blue/30" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-sm">Belum Ada Transaksi</h4>
                            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                                Riwayat transaksi pesanan Anda akan muncul di halaman ini setelah melakukan pembelian produk atau kelas.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
