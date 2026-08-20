import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
      <SpotlightCard className="max-w-2xl w-full p-10 md:p-14 text-center space-y-8 border-glass-border bg-glass-bg">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black text-brand-blue tracking-tighter drop-shadow-md">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-text-gray max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau memang tidak pernah ada di server kami. Mari kita kembali ke jalur yang benar.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <Link 
            href="/products" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-glass-border hover:border-brand-blue/30 text-text-main font-bold rounded-xl transition-all hover:bg-white/10"
          >
            <Search className="w-4 h-4" /> Telusuri Produk
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
}
