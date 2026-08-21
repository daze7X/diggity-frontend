import os

files = {
    'products': r'd:\SEMESTER 6\PKL\diggity-frontend\app\products\page.tsx',
    'solutions': r'd:\SEMESTER 6\PKL\diggity-frontend\app\solutions\[slug]\page.tsx'
}

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add getLocaleServer if not exists
    if 'getLocaleServer' not in content:
        content = content.replace('import { api', 'import { getLocaleServer } from \'../../lib/locale-server\';\nimport { api', 1)
        if 'ProductsPage' in content:
            content = content.replace('export default async function ProductsPage({ searchParams }: PageProps) {', 'export default async function ProductsPage({ searchParams }: PageProps) {\n    const locale = await getLocaleServer();', 1)
        elif 'SolutionDetail' in content:
            content = content.replace('export default async function SolutionDetail({ params }: Props) {', 'export default async function SolutionDetail({ params }: Props) {\n    const locale = await getLocaleServer();', 1)

    for old, new in replacements:
        content = content.replace(old, new)

    # Fix the import path for solutions page because it is nested
    if 'solutions' in path and 'from \'../../lib/locale-server\'' in content:
        content = content.replace('from \'../../lib/locale-server\'', 'from \'../../../lib/locale-server\'')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

prod_reps = [
    ('>Menyediakan produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomasi, dan skalabilitas bisnis.<', '>{locale === \'en\' ? \'Providing ready-to-use digital products to increase efficiency, productivity, automation, and business scalability.\' : \'Menyediakan produk digital siap pakai untuk meningkatkan efisiensi, produktivitas, otomasi, dan skalabilitas bisnis.\'}<'),
    ('Semua Produk', '{locale === \'en\' ? \'All Products\' : \'Semua Produk\'}'),
    ('? \'sekali bayar\' : product.billing_period === \'monthly\' ? \'bulan\' : \'tahun\'', '? (locale === \'en\' ? \'one-time\' : \'sekali bayar\') : product.billing_period === \'monthly\' ? (locale === \'en\' ? \'month\' : \'bulan\') : (locale === \'en\' ? \'year\' : \'tahun\')'),
    ('Unduh Instan', '{locale === \'en\' ? \'Instant Download\' : \'Unduh Instan\'}'),
    ('Minta Demo Layanan', '{locale === \'en\' ? \'Request Demo\' : \'Minta Demo Layanan\'}'),
    ('Lihat Detail & Fitur', '{locale === \'en\' ? \'View Details & Features\' : \'Lihat Detail & Fitur\'}'),
    ('title=\"Rekomendasi Utama\"', 'title={locale === \'en\' ? \'Top Recommendation\' : \'Rekomendasi Utama\'}'),
    ('>Produk Belum Tersedia<', '>{locale === \'en\' ? \'Product Not Available\' : \'Produk Belum Tersedia\'}<'),
    ('>Saat ini belum ada produk yang aktif untuk kategori ini. Silakan cek kategori lainnya.<', '>{locale === \'en\' ? \'There are currently no active products for this category. Please check other categories.\' : \'Saat ini belum ada produk yang aktif untuk kategori ini. Silakan cek kategori lainnya.\'}<'),
    ('*Seluruh produk memiliki dukungan pembaruan gratis dan garansi bug-fix standar.', '{locale === \'en\' ? \'*All products include free updates and standard bug-fix warranty.\' : \'*Seluruh produk memiliki dukungan pembaruan gratis dan garansi bug-fix standar.\'}'),
    ('>Butuh Custom Enterprise?<', '>{locale === \'en\' ? \'Need Custom Enterprise?\' : \'Butuh Custom Enterprise?\'}<'),
    ('>Pertanyaan Umum<', '>{locale === \'en\' ? \'General Questions\' : \'Pertanyaan Umum\'}<'),
    ('>Masih punya pertanyaan lain?<', '>{locale === \'en\' ? \'Still have other questions?\' : \'Masih punya pertanyaan lain?\'}<'),
    ('>Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.<', '>{locale === \'en\' ? \'Our team is ready to help find the best digital architecture solution for your business.\' : \'Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.\'}<'),
    ('>Hubungi Tim Kami<', '>{locale === \'en\' ? \'Contact Our Team\' : \'Hubungi Tim Kami\'}<'),
]

fix_file(files['products'], prod_reps)

sol_reps = [
    ('>Kembali ke Layanan<', '>{locale === \'en\' ? \'Back to Services\' : \'Kembali ke Layanan\'}<'),
    ('>Konsultasi Gratis<', '>{locale === \'en\' ? \'Free Consultation\' : \'Konsultasi Gratis\'}<'),
    ('>Lihat Portfolio<', '>{locale === \'en\' ? \'View Portfolio\' : \'Lihat Portfolio\'}<'),
    ('>CARA KERJA KAMI<', '>{locale === \'en\' ? \'HOW WE WORK\' : \'CARA KERJA KAMI\'}<'),
    ('>Proses yang Sederhana & Transparan<', '>{locale === \'en\' ? \'Simple & Transparent Process\' : \'Proses yang Sederhana & Transparan\'}<'),
    ('Diskusi kebutuhan dan tujuan bisnis Anda bersama konsultan kami secara langsung.', '{locale === \'en\' ? \'Discuss your business needs and goals directly with our consultants.\' : \'Diskusi kebutuhan dan tujuan bisnis Anda bersama konsultan kami secara langsung.\'}'),
    ('>Analisis & Proposal<', '>{locale === \'en\' ? \'Analysis & Proposal\' : \'Analisis & Proposal\'}<'),
    ('Tim kami menyusun scope of work, estimasi biaya, dan timeline yang transparan.', '{locale === \'en\' ? \'Our team prepares a transparent scope of work, cost estimate, and timeline.\' : \'Tim kami menyusun scope of work, estimasi biaya, dan timeline yang transparan.\'}'),
    ('>Eksekusi & Produksi<', '>{locale === \'en\' ? \'Execution & Production\' : \'Eksekusi & Produksi\'}<'),
    ('Pengerjaan oleh tim spesialis dengan update progres berkala kepada klien.', '{locale === \'en\' ? \'Execution by our specialist team with regular progress updates to the client.\' : \'Pengerjaan oleh tim spesialis dengan update progres berkala kepada klien.\'}'),
    ('>Serah Terima & Go Live<', '>{locale === \'en\' ? \'Handover & Go Live\' : \'Serah Terima & Go Live\'}<'),
    ('Peluncuran resmi disertai pelatihan penggunaan dan dukungan purna jual.', '{locale === \'en\' ? \'Official launch accompanied by user training and after-sales support.\' : \'Peluncuran resmi disertai pelatihan penggunaan dan dukungan purna jual.\'}'),
    ('>KEUNGGULAN KAMI<', '>{locale === \'en\' ? \'OUR ADVANTAGES\' : \'KEUNGGULAN KAMI\'}<'),
    ('>Mengapa Memilih Diggity?<', '>{locale === \'en\' ? \'Why Choose Diggity?\' : \'Mengapa Memilih Diggity?\'}<'),
    ('>Tim Berpengalaman<', '>{locale === \'en\' ? \'Experienced Team\' : \'Tim Berpengalaman\'}<'),
    ('Didukung oleh praktisi ahli dengan portofolio ratusan proyek sukses di berbagai industri.', '{locale === \'en\' ? \'Supported by expert practitioners with a portfolio of hundreds of successful projects across various industries.\' : \'Didukung oleh praktisi ahli dengan portofolio ratusan proyek sukses di berbagai industri.\'}'),
    ('>Kualitas Terukur<', '>{locale === \'en\' ? \'Measurable Quality\' : \'Kualitas Terukur\'}<'),
    ('Setiap deliverable melalui proses QA ketat sebelum diserahkan ke klien.', '{locale === \'en\' ? \'Every deliverable goes through a strict QA process before being handed over to the client.\' : \'Setiap deliverable melalui proses QA ketat sebelum diserahkan ke klien.\'}'),
    ('>Tepat Waktu<', '>{locale === \'en\' ? \'On Time Delivery\' : \'Tepat Waktu\'}<'),
    ('Komitmen kami pada timeline proyek yang disepakati sejak awal kickoff.', '{locale === \'en\' ? \'Our commitment to the project timeline agreed upon since kickoff.\' : \'Komitmen kami pada timeline proyek yang disepakati sejak awal kickoff.\'}'),
    ('>Dukungan Purna Jual<', '>{locale === \'en\' ? \'After-Sales Support\' : \'Dukungan Purna Jual\'}<'),
    ('Layanan maintenance & support pasca-proyek sesuai kebutuhan bisnis Anda.', '{locale === \'en\' ? \'Maintenance & post-project support services according to your business needs.\' : \'Layanan maintenance & support pasca-proyek sesuai kebutuhan bisnis Anda.\'}'),
    ('>Solusi Inovatif<', '>{locale === \'en\' ? \'Innovative Solutions\' : \'Solusi Inovatif\'}<'),
    ('Menggunakan teknologi terkini yang relevan dan terukur untuk pertumbuhan bisnis.', '{locale === \'en\' ? \'Utilizing the latest relevant and scalable technologies for business growth.\' : \'Menggunakan teknologi terkini yang relevan dan terukur untuk pertumbuhan bisnis.\'}'),
    ('>Komunikasi Transparan<', '>{locale === \'en\' ? \'Transparent Communication\' : \'Komunikasi Transparan\'}<'),
    ('Laporan kemajuan berkala dan konsultasi tanpa batas selama proyek berjalan.', '{locale === \'en\' ? \'Regular progress reports and unlimited consultation throughout the project.\' : \'Laporan kemajuan berkala dan konsultasi tanpa batas selama proyek berjalan.\'}'),
    ('>Mulai Sekarang<', '>{locale === \'en\' ? \'Start Now\' : \'Mulai Sekarang\'}<'),
    ('>Butuh Solusi {service.name}?<', '>{locale === \'en\' ? Need  Solution? : Butuh Solusi ?}<'),
    ('Konsultasikan kebutuhan proyek Anda secara gratis bersama tim konsultan teknis kami. Kami siap membantu menemukan solusi terbaik untuk bisnis Anda.', '{locale === \'en\' ? \'Consult your project needs for free with our technical consultant team. We are ready to help find the best solution for your business.\' : \'Konsultasikan kebutuhan proyek Anda secara gratis bersama tim konsultan teknis kami. Kami siap membantu menemukan solusi terbaik untuk bisnis Anda.\'}'),
    ('Konsultasi 100% Gratis', '{locale === \'en\' ? \'100% Free Consultation\' : \'Konsultasi 100% Gratis\'}'),
    ('Tanpa Komitmen Awal', '{locale === \'en\' ? \'No Initial Commitment\' : \'Tanpa Komitmen Awal\'}'),
    ('Respon Cepat', '{locale === \'en\' ? \'Fast Response\' : \'Respon Cepat\'}'),
    ('>Mulai Diskusi Proyek<', '>{locale === \'en\' ? \'Start Project Discussion\' : \'Mulai Diskusi Proyek\'}<'),
    ('>Chat via WhatsApp<', '>{locale === \'en\' ? \'Chat via WhatsApp\' : \'Chat via WhatsApp\'}<'),
    ('>Penawaran Kustom<', '>{locale === \'en\' ? \'Custom Offer\' : \'Penawaran Kustom\'}<'),
    ('>Cakupan Kerja<', '>{locale === \'en\' ? \'Scope of Work\' : \'Cakupan Kerja\'}<'),
    ('Minta Penawaran', '{locale === \'en\' ? \'Request Quote\' : \'Minta Penawaran\'}'),
    ('>Keunggulan Kami<', '>{locale === \'en\' ? \'Our Advantages\' : \'Keunggulan Kami\'}<'),
]

fix_file(files['solutions'], sol_reps)
print('Done fixing files!')
