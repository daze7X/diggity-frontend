import re
import os

path = os.path.join('app', 'solutions', '[slug]', 'page.tsx')
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

replacements = [
    (r'>\s*Kembali ke Layanan\s*<', r'>{locale === "en" ? "Back to Services" : "Kembali ke Layanan"}<'),
    (r'>\s*Konsultasi Gratis\s*<', r'>{locale === "en" ? "Free Consultation" : "Konsultasi Gratis"}<'),
    (r'>\s*Lihat Portfolio\s*<', r'>{locale === "en" ? "View Portfolio" : "Lihat Portfolio"}<'),
    (r'>Cakupan Kami<', r'>{locale === "en" ? "Our Scope" : "Cakupan Kami"}<'),
    (r'>\s*Apa Saja yang Kami Kerjakan\?\s*<', r'>{locale === "en" ? "What Do We Do?" : "Apa Saja yang Kami Kerjakan?"}<'),
    (r'>\s*Setiap sub-layanan dikerjakan oleh tim spesialis berpengalaman dengan standar kualitas internasional\.\s*<', r'>{locale === "en" ? "Every sub-service is handled by experienced specialists with international quality standards." : "Setiap sub-layanan dikerjakan oleh tim spesialis berpengalaman dengan standar kualitas internasional."}<'),
    (r'>\s*Cara Kerja Kami\s*<', r'>{locale === "en" ? "How We Work" : "Cara Kerja Kami"}<'),
    (r'>\s*Proses yang Sederhana & Transparan\s*<', r'>{locale === "en" ? "Simple & Transparent Process" : "Proses yang Sederhana & Transparan"}<'),
    (r'>\s*Investasi\s*<', r'>{locale === "en" ? "Investment" : "Investasi"}<'),
    (r'>\s*Estimasi Investasi & Paket Layanan\s*<', r'>{locale === "en" ? "Investment Estimation & Service Packages" : "Estimasi Investasi & Paket Layanan"}<'),
    (r'>\s*Semua harga bersifat estimasi awal\. Penawaran final disesuaikan dengan kebutuhan spesifik proyek Anda\.\s*<', r'>{locale === "en" ? "All prices are initial estimates. The final offer will be tailored to the specific needs of your project." : "Semua harga bersifat estimasi awal. Penawaran final disesuaikan dengan kebutuhan spesifik proyek Anda."}<'),
    (r'>Paling Populer<', r'>{locale === "en" ? "Most Popular" : "Paling Populer"}<'),
    (r'>\s*Mengapa Memilih Diggity\?\s*<', r'>{locale === "en" ? "Why Choose Diggity?" : "Mengapa Memilih Diggity?"}<'),
    (r'>\s*Butuh Solusi \{service\.name\}\?\s*<', r'>{locale === "en" ? Need  Solution? : Butuh Solusi ?}<'),
    (r'>\s*Mulai Diskusi Proyek\s*<', r'>{locale === "en" ? "Start Project Discussion" : "Mulai Diskusi Proyek"}<'),
    (r'>\s*Chat via WhatsApp\s*<', r'>{locale === "en" ? "Chat via WhatsApp" : "Chat via WhatsApp"}<')
]

for old, new in replacements:
    c = re.sub(old, lambda m, n=new: n, c)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed successfully')
