'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import SpotlightCard from '../components/SpotlightCard';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Diggity Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
      <SpotlightCard className="max-w-2xl w-full p-10 md:p-14 text-center space-y-8 border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10">
        <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <AlertTriangle className="w-10 h-10 text-rose-500" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
            Terjadi Kesalahan Sistem
          </h2>
          <p className="text-text-gray max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Maaf, kami mengalami kendala teknis saat memuat halaman ini. Tim kami telah menerima laporan otomatis dan sedang menanganinya.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-500/25 hover:-translate-y-0.5"
          >
            <RefreshCcw className="w-4 h-4" /> Muat Ulang Halaman
          </button>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-glass-border hover:border-slate-400 text-text-main font-bold rounded-xl transition-all hover:bg-white/10"
          >
            <Home className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
}
