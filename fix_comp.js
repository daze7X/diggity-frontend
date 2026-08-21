const fs = require('fs');

function fixFile(filepath, replacements) {
    let content = fs.readFileSync(filepath, 'utf-8');
    for (const [oldStr, newStr] of replacements) {
        content = content.replace(oldStr, newStr);
    }
    fs.writeFileSync(filepath, content, 'utf-8');
}

fixFile('components/ProductPurchaseCTA.tsx', [
    ["alert('Pembayaran gagal.');", "alert(language === 'en' ? 'Payment failed.' : 'Pembayaran gagal.');"],
    ["alert('Anda menutup popup pembayaran sebelum menyelesaikan transaksi.');", "alert(language === 'en' ? 'You closed the payment popup before completing the transaction.' : 'Anda menutup popup pembayaran sebelum menyelesaikan transaksi.');"],
    ["alert(res.message || 'Gagal memproses pesanan.');", "alert(res.message || (language === 'en' ? 'Failed to process order.' : 'Gagal memproses pesanan.'));"],
    ["alert(err.message || 'Terjadi kesalahan sistem saat checkout.');", "alert(err.message || (language === 'en' ? 'System error occurred during checkout.' : 'Terjadi kesalahan sistem saat checkout.'));"],
    ["const whatsappMsg = \Halo Diggity, saya tertarik dengan produk \. Apakah saya bisa meminta demo layanan atau berkonsultasi mengenai produk ini? Terima kasih!\;", "const whatsappMsg = language === 'en' ? \Hello Diggity, I am interested in the product \. Can I request a demo or consult about this product? Thank you!\ : \Halo Diggity, saya tertarik dengan produk \. Apakah saya bisa meminta demo layanan atau berkonsultasi mengenai produk ini? Terima kasih!\;"]
]);

fixFile('components/SearchOverlay.tsx', [
    ['placeholder="Cari layanan, produk, atau wawasan..."', "placeholder={language === 'en' ? 'Search services, products, or insights...' : 'Cari layanan, produk, atau wawasan...'}"]
]);

fixFile('components/TalentRegistrationForm.tsx', [
    ["Registrasi Berhasil!", "{language === 'en' ? 'Registration Successful!' : 'Registrasi Berhasil!'}"],
    ["Terima kasih telah mendaftarkan diri Anda di jaringan talenta Diggity. Tim kami akan meninjau kualifikasi dan menghubungi Anda jika ada proyek yang sesuai.", "{language === 'en' ? 'Thank you for registering in the Diggity talent network. Our team will review your qualifications and contact you if there is a suitable project.' : 'Terima kasih telah mendaftarkan diri Anda di jaringan talenta Diggity. Tim kami akan meninjau kualifikasi dan menghubungi Anda jika ada proyek yang sesuai.'}"],
    ["Gabung Jaringan Talenta", "{language === 'en' ? 'Join Talent Network' : 'Gabung Jaringan Talenta'}"],
    ["Daftarkan diri Anda sebagai talenta lepas individu atau tim khusus untuk proyek kemitraan Diggity.", "{language === 'en' ? 'Register yourself as a freelance individual or specialized team for Diggity partnership projects.' : 'Daftarkan diri Anda sebagai talenta lepas individu atau tim khusus untuk proyek kemitraan Diggity.'}"],
    ['placeholder="Masukkan nama Anda"', "placeholder={language === 'en' ? 'Enter your name' : 'Masukkan nama Anda'}"],
    ['placeholder="Misal: Frontend Developer, UI/UX Designer"', "placeholder={language === 'en' ? 'e.g. Frontend Developer, UI/UX Designer' : 'Misal: Frontend Developer, UI/UX Designer'}"],
    ['placeholder="https://github.com/... atau tautan portofolio online lainnya"', "placeholder={language === 'en' ? 'https://github.com/... or other online portfolio link' : 'https://github.com/... atau tautan portofolio online lainnya'}"],
    ['placeholder="Jelaskan secara singkat mengenai spesialisasi dan latar belakang proyek Anda."', "placeholder={language === 'en' ? 'Briefly describe your specialization and project background.' : 'Jelaskan secara singkat mengenai spesialisasi dan latar belakang proyek Anda.'}"],
    ["Kirim Pendaftaran Profil", "{language === 'en' ? 'Submit Profile Registration' : 'Kirim Pendaftaran Profil'}"]
]);

fixFile('components/WhatsAppButton.tsx', [
    ["'Halo Diggity, saya tertarik untuk berkonsultasi mengenai proyek digital perusahaan kami.'", "language === 'en' ? 'Hello Diggity, I am interested in consulting about our company digital project.' : 'Halo Diggity, saya tertarik untuk berkonsultasi mengenai proyek digital perusahaan kami.'"]
]);

console.log('Done!');
