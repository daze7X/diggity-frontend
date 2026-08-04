'use client';

import React, { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { 
    LifeBuoy, 
    ArrowLeft, 
    Send, 
    Clock, 
    AlertCircle, 
    User, 
    Loader2,
    Calendar,
    Tag,
    AlertTriangle
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

interface SupportMessage {
    id: number;
    user_id: number;
    message: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        role: string;
    };
}

export default function TicketDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { id } = params;
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [ticket, setTicket] = useState<SupportTicket | null>(null);
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const fetchTicketDetails = async () => {
        try {
            const res = await api.getTicketDetails(id);
            if (res.success && res.ticket) {
                setTicket(res.ticket);
                setMessages(res.messages || []);
            } else {
                router.push('/dashboard/support');
            }
        } catch (err) {
            console.error('Failed to fetch ticket details:', err);
            router.push('/dashboard/support');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }

        fetchTicketDetails();
    }, [user, authLoading, id, router]);

    // Auto scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || submitting) return;

        setSubmitting(true);
        setError('');

        try {
            const res = await api.replyTicket(id, replyText);
            if (res.success && res.sent_message) {
                setMessages(prev => [...prev, res.sent_message]);
                setReplyText('');
                
                // Update ticket status dynamically if it was updated
                if (res.ticket) {
                    setTicket(res.ticket);
                }
            } else {
                setError(res.message || 'Gagal mengirim balasan.');
            }
        } catch (err) {
            console.error('Failed to send reply:', err);
            setError('Terjadi kesalahan koneksi saat mengirim pesan.');
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatMessageTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center bg-glass-bg border border-glass-border rounded-2xl">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                    <span className="text-xs text-text-muted font-bold font-mono">Memuat riwayat chat...</span>
                </div>
            </div>
        );
    }

    if (!ticket || !user) return null;

    const isClosedOrResolved = ['resolved', 'closed'].includes(ticket.status);

    return (
        <div className="space-y-6 text-left animate-fade-in flex flex-col min-h-[500px]">
            
            {/* Back link */}
            <div>
                <Link
                    href="/dashboard/support"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-bold hover:underline mb-1"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Tiket
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* Left Side: Ticket Metadata Info Card */}
                <div className="lg:col-span-1 h-full">
                    <SpotlightCard className="p-6 border border-glass-border space-y-5 h-full flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block font-mono">
                                    {ticket.ticket_number}
                                </span>
                                <h3 className="text-base font-bold text-text-main leading-snug">{ticket.subject}</h3>
                            </div>

                            <div className="w-full h-[1px] bg-glass-border/30" />

                            <div className="space-y-3.5">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Kategori</p>
                                        <p className="text-xs font-semibold text-slate-300 mt-0.5">{getCategoryLabel(ticket.category)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Dibuat Pada</p>
                                        <p className="text-xs font-semibold text-slate-300 mt-0.5">{formatDate(ticket.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Badges at bottom */}
                        <div className="space-y-2.5 pt-4 border-t border-glass-border/30">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Status Tiket:</span>
                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border capitalize ${getStatusStyle(ticket.status)}`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Tingkat Urgensi:</span>
                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border capitalize ${getPriorityStyle(ticket.priority)}`}>
                                    {ticket.priority}
                                </span>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>

                {/* Right Side: Chat Thread Conversation */}
                <div className="lg:col-span-2 flex flex-col justify-between border border-glass-border bg-glass-bg/50 rounded-2xl overflow-hidden min-h-[400px]">
                    
                    {/* Chat Bubble Thread Area */}
                    <div className="p-4 md:p-6 overflow-y-auto max-h-[350px] min-h-[280px] space-y-4 custom-scrollbar">
                        {messages.length > 0 ? (
                            messages.map((msg) => {
                                const isMe = msg.user_id === user.id;
                                const isAgent = msg.user?.role && ['admin', 'super_admin', 'superadmin', 'support_agent', 'support'].includes(msg.user.role);
                                
                                return (
                                    <div 
                                        key={msg.id}
                                        className={`flex flex-col max-w-[85%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                                    >
                                        {/* Sender Name */}
                                        <span className="text-[10px] text-slate-500 mb-1 flex items-center gap-1 font-semibold">
                                            {isMe ? 'Saya' : msg.user?.name || 'Support Agent'}
                                            {isAgent && (
                                                <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-black rounded uppercase tracking-wider">
                                                    SUPPORT AGENT
                                                </span>
                                            )}
                                        </span>

                                        {/* Message Bubble */}
                                        <div 
                                            className={`p-3.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line text-left shadow-sm ${
                                                isMe 
                                                    ? 'bg-brand-blue text-white rounded-tr-none' 
                                                    : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                                            }`}
                                        >
                                            {msg.message}
                                        </div>

                                        {/* Timestamp */}
                                        <span className="text-[9px] text-slate-600 mt-1 flex items-center gap-1">
                                            <Clock className="w-2.5 h-2.5" /> {formatMessageTime(msg.created_at)}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-10 text-slate-500 text-xs">
                                Belum ada percakapan.
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Reply Area */}
                    <div className="p-4 border-t border-glass-border bg-slate-950/40">
                        {isClosedOrResolved && (
                            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-semibold text-left mb-3">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>
                                    Tiket ini sudah ditandai **Resolved/Closed**. Mengirim pesan balasan baru otomatis akan **membuka kembali** tiket ini.
                                </span>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold text-left mb-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSendReply} className="flex gap-3">
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Ketik balasan pesan bantuan Anda di sini..."
                                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-850 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-xl text-xs text-white placeholder-slate-600 outline-none transition-all"
                                required
                            />
                            <button
                                type="submit"
                                disabled={submitting || !replyText.trim()}
                                className="p-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl transition-all shadow-md shadow-brand-blue/15 flex items-center justify-center shrink-0 disabled:opacity-40 disabled:hover:bg-brand-blue cursor-pointer"
                            >
                                {submitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    );
}
