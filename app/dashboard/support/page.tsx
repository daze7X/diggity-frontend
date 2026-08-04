'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { 
    LifeBuoy, 
    Plus, 
    MessageSquare, 
    Clock, 
    AlertCircle, 
    CheckCircle,
    X,
    Loader2
} from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

interface SupportTicket {
    id: number;
    ticket_number: string;
    subject: string;
    category: string;
    status: string;
    priority: string;
    created_at: string;
    updated_at: string;
}

export default function DashboardSupport() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('technical');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchTickets = async () => {
        try {
            const res = await api.getTickets();
            if (res.success && Array.isArray(res.tickets)) {
                setTickets(res.tickets);
            }
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) {
            setError('Semua kolom wajib diisi.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const res = await api.createTicket({
                subject,
                category,
                message
            });

            if (res.success) {
                setSubject('');
                setMessage('');
                setIsOpen(false);
                fetchTickets(); // Refresh list
            } else {
                setError(res.message || 'Gagal membuat tiket bantuan.');
            }
        } catch (err) {
            console.error('Error creating ticket:', err);
            setError('Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
            case 'in_progress':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'resolved':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'closed':
                return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
            case 'medium':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'low':
                return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'technical':
                return 'Technical Support';
            case 'billing':
                return 'Billing & Payment';
            case 'general':
                return 'General Inquiry';
            default:
                return cat;
        }
    };

    const formatRelativeTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6 text-left animate-fade-in relative">
            
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">Tiket Bantuan & Support</h2>
                    <p className="text-xs md:text-sm text-text-muted">Ajukan tiket pertanyaan atau kendala teknis Anda, dan tim kami akan segera merespon.</p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-blue/15 w-full sm:w-auto justify-center cursor-pointer"
                >
                    <Plus className="w-4 h-4" /> Buat Tiket Baru
                </button>
            </div>

            {/* Ticket list container */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
                        <span className="text-xs text-text-muted font-bold font-mono flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-brand-blue" /> Memuat daftar tiket...
                        </span>
                    </div>
                ) : tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <SpotlightCard key={ticket.id} className="p-6 border border-glass-border">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                
                                {/* Info details */}
                                <div className="space-y-2.5 text-left flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400">
                                            {ticket.ticket_number}
                                        </span>
                                        <span className="text-slate-500 text-xs">•</span>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {getCategoryLabel(ticket.category)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-base font-bold text-text-main leading-snug">
                                        {ticket.subject}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-3 pt-1">
                                        {/* Status Badge */}
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border capitalize ${getStatusStyle(ticket.status)}`}>
                                            {ticket.status.replace('_', ' ')}
                                        </span>

                                        {/* Priority Badge */}
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border capitalize ${getPriorityStyle(ticket.priority)}`}>
                                            Urgensi: {ticket.priority}
                                        </span>

                                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Update: {formatRelativeTime(ticket.updated_at)}
                                        </span>
                                    </div>
                                </div>

                                {/* Open Conversation Link */}
                                <div className="shrink-0 w-full md:w-auto text-right">
                                    <Link
                                        href={`/dashboard/support/${ticket.id}`}
                                        className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 w-full md:w-auto cursor-pointer"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" /> Buka Percakapan
                                    </Link>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))
                ) : (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl space-y-4">
                        <LifeBuoy className="w-12 h-12 mx-auto text-brand-blue/30" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-sm">Tidak Ada Tiket Aktif</h4>
                            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                                Anda belum pernah mengajukan tiket bantuan. Jika Anda menemui kendala billing atau teknis, silakan buat tiket baru.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-brand-blue-dark transition-colors cursor-pointer"
                        >
                            Buat Tiket Pertamamu <Plus className="ml-1 w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {/* CREATE TICKET MODAL OVERLAY */}
            {isOpen && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
                    <SpotlightCard className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative">
                        
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-left space-y-1">
                            <h3 className="text-lg font-bold text-white">Buat Tiket Bantuan Baru</h3>
                            <p className="text-xs text-slate-400">Silakan jelaskan kendala atau pertanyaan Anda pada formulir di bawah ini.</p>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold text-left">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleCreateTicket} className="space-y-4 text-left">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Subjek Masalah</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Contoh: Gagal memutar video Modul 2"
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-xl text-xs text-white placeholder-slate-600 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Kategori Kendala</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-xl text-xs text-white outline-none transition-all"
                                >
                                    <option value="technical">Technical Support (Kendala Kelas / Web)</option>
                                    <option value="billing">Billing & Payment (Kendala Pembayaran / Invoices)</option>
                                    <option value="general">General Inquiry (Pertanyaan Umum & Kemitraan)</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Pesan Kronologi</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    placeholder="Jelaskan secara detail langkah-langkah kendala atau pertanyaan yang ingin Anda sampaikan..."
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-xl text-xs text-white placeholder-slate-600 outline-none resize-none transition-all"
                                    required
                                />
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Mengirim...
                                        </>
                                    ) : (
                                        'Kirim Tiket'
                                    )}
                                </button>
                            </div>
                        </form>
                    </SpotlightCard>
                </div>
            )}
        </div>
    );
}
