const fs = require('fs');
let code = fs.readFileSync('components/ProductPurchaseCTA.tsx', 'utf8');

code = code.replace(
  'const [submitting, setSubmitting] = useState(false);',
  'const [submitting, setSubmitting] = useState(false);\n    const [toastMessage, setToastMessage] = useState<string | null>(null);'
);

code = code.replace(
  /alert\(language === 'en' \? 'Payment failed\.' : 'Pembayaran gagal\.'\);/g,
  "setToastMessage(language === 'en' ? 'Payment failed.' : 'Pembayaran gagal.');"
);
code = code.replace(
  /alert\(language === 'en' \? 'You closed the payment popup before completing the transaction\.' : 'Anda menutup popup pembayaran sebelum menyelesaikan transaksi\.'\);/g,
  "setToastMessage(language === 'en' ? 'You closed the payment popup before completing the transaction.' : 'Anda menutup popup pembayaran sebelum menyelesaikan transaksi.');"
);
code = code.replace(
  /alert\(res\.message \|\| \(language === 'en' \? 'Failed to process order\.' : 'Gagal memproses pesanan\.'\)\);/g,
  "setToastMessage(res.message || (language === 'en' ? 'Failed to process order.' : 'Gagal memproses pesanan.'));"
);
code = code.replace(
  /alert\(err\.message \|\| \(language === 'en' \? 'System error occurred during checkout\.' : 'Terjadi kesalahan sistem saat checkout\.'\)\);/g,
  "setToastMessage(err.message || (language === 'en' ? 'System error occurred during checkout.' : 'Terjadi kesalahan sistem saat checkout.'));"
);

const oldReturn =     return (
        <button;

const newReturn =     return (
        <div className="flex flex-col gap-3">
            {toastMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold flex items-start justify-between gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <span className="mt-0.5">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="text-red-400 hover:text-red-500 p-1 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors shrink-0">✕</button>
                </div>
            )}
            <button;

code = code.replace(oldReturn, newReturn);

const oldEnd =         </button>
    );
};

const newEnd =         </button>
        </div>
    );
};

code = code.replace(oldEnd, newEnd);

fs.writeFileSync('components/ProductPurchaseCTA.tsx', code);
