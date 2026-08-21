'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { User, Mail, KeyRound, Loader2, Save, CheckCircle } from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';

export default function UserProfile() {
    const { user, updateProfile } = useAuth();
    const { language: locale } = useLanguage();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        if (password && password !== passwordConfirmation) {
            setStatus('error');
            setMessage(locale === 'en' ? 'New password confirmation does not match.' : 'Konfirmasi sandi baru tidak cocok.');
            return;
        }

        try {
            await updateProfile(name, email, password || undefined, passwordConfirmation || undefined);
            setStatus('success');
            setMessage(locale === 'en' ? 'Your profile has been successfully updated.' : 'Profil Anda berhasil diperbarui.');
            setPassword('');
            setPasswordConfirmation('');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || (locale === 'en' ? 'Failed to update profile. Please try again.' : 'Gagal memperbarui profil. Silakan coba kembali.'));
        }
    };

    if (!user) return null;

    return (
        <div className="space-y-6 text-left animate-fade-in">
            <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">{locale === 'en' ? 'Profile Settings' : 'Pengaturan Profil'}</h2>
                <p className="text-xs md:text-sm text-text-muted">{locale === 'en' ? 'Manage your account identity details and change your password securely.' : 'Kelola detail identitas akun Anda dan ubah kata sandi secara aman.'}</p>
            </div>

            <SpotlightCard className="p-8 border border-glass-border">
                <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm">
                    
                    {/* Status Feedback */}
                    {status === 'success' && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <p className="text-xs text-rose-500 font-bold">{message}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="font-bold text-text-gray block text-xs">{locale === 'en' ? 'Full Name' : 'Nama Lengkap'}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main"
                                />
                                <User className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="font-bold text-text-gray block text-xs">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main"
                                />
                                <Mail className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-glass-border/40 my-6 pt-4 space-y-4">
                        <div>
                            <h4 className="text-sm font-bold text-text-main">{locale === 'en' ? 'Change Password (Optional)' : 'Ubah Kata Sandi (Opsional)'}</h4>
                            <p className="text-[10px] text-text-muted">{locale === 'en' ? 'Leave blank if you do not want to change your current password.' : 'Biarkan kosong jika Anda tidak ingin mengubah sandi saat ini.'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password Input */}
                            <div className="space-y-1.5">
                                <label className="font-bold text-text-gray block text-xs">{locale === 'en' ? 'New Password' : 'Kata Sandi Baru'}</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={locale === 'en' ? 'Min. 8 characters' : 'Min. 8 karakter'}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main"
                                    />
                                    <KeyRound className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                                </div>
                            </div>

                            {/* Password Confirmation Input */}
                            <div className="space-y-1.5">
                                <label className="font-bold text-text-gray block text-xs">{locale === 'en' ? 'Confirm New Password' : 'Konfirmasi Sandi Baru'}</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        placeholder={locale === 'en' ? 'Repeat new password' : 'Ulangi sandi baru'}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main"
                                    />
                                    <KeyRound className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 text-right">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-6 py-3 bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl text-xs md:text-sm font-bold transition-all shadow-md shadow-brand-blue/15 inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>{locale === 'en' ? 'Saving...' : 'Menyimpan...'}</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{locale === 'en' ? 'Save Changes' : 'Simpan Perubahan'}</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </SpotlightCard>
        </div>
    );
}
