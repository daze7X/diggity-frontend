'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
    LayoutDashboard, 
    User, 
    ShieldAlert, 
    BookOpen, 
    ShoppingCart, 
    LogOut, 
    Loader2,
    Lock,
    LifeBuoy
} from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                    <span className="text-sm text-text-muted font-bold font-mono">Memuat Sesi...</span>
                </div>
            </div>
        );
    }

    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Profil Saya', path: '/dashboard/profile', icon: User },
        { name: 'Lisensi & Unduhan', path: '/dashboard/products', icon: Lock },
        { name: 'Kelas Saya', path: '/dashboard/academy', icon: BookOpen },
        { name: 'Riwayat Pesanan', path: '/dashboard/orders', icon: ShoppingCart },
        { name: 'Tiket Bantuan', path: '/dashboard/support', icon: LifeBuoy },
    ];

    const handleLogout = async () => {
        if (confirm('Apakah Anda yakin ingin keluar dari akun Anda?')) {
            await logout();
            router.push('/login');
        }
    };

    return (
        <div className="relative min-h-screen pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Sidebar navigation */}
                    <div className="lg:col-span-1">
                        <SpotlightCard className="p-6 border border-glass-border bg-glass-bg text-left space-y-6">
                            
                            {/* User Welcome Block */}
                            <div className="space-y-1 pb-4 border-b border-glass-border/40">
                                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block">Dashboard Portal</span>
                                <h3 className="text-base font-bold text-text-main leading-tight line-clamp-1">{user.name}</h3>
                                <span className="text-[10px] text-text-muted font-mono leading-none block overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</span>
                            </div>

                            {/* Sidebar Links */}
                            <nav className="flex flex-col space-y-1.5">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
                                                active
                                                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15'
                                                    : 'text-text-gray hover:bg-glass-bg/60 hover:text-brand-blue'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-rose-500 hover:bg-rose-500/5 transition-colors cursor-pointer text-left"
                                >
                                    <LogOut className="w-4 h-4 shrink-0" />
                                    <span>Keluar Akun</span>
                                </button>
                            </nav>
                        </SpotlightCard>
                    </div>

                    {/* Main content display */}
                    <div className="lg:col-span-3 min-h-[400px]">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}
