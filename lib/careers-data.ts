import { Career } from './api';

export const CAREERS_DATABASE: Career[] = [
    {
        id: 1,
        title: 'Full-Stack Developer',
        slug: 'full-stack-developer',
        department: 'Technology',
        type: 'Full-time',
        location: 'Yogyakarta / Hybrid',
        level: 'Junior–Middle',
        salary_min: 4000000,
        salary_max: 7000000,
        education: 'D3/S1 Teknik Informatika / Terkait',
        closing_date: '02 Oktober 2026',
        status: 'open',
        description: 'Sebagai Full-Stack Developer di Diggity, kamu akan terlibat dalam pengembangan berbagai solusi digital untuk kebutuhan bisnis, organisasi, dan produk digital. Kamu akan bekerja bersama tim lintas fungsi untuk menerjemahkan kebutuhan pengguna dan bisnis menjadi aplikasi yang scalable, reliable, dan mudah digunakan.',
        responsibilities: [
            'Mengembangkan dan memelihara aplikasi web dan sistem digital Diggity maupun client.',
            'Membangun fitur baru berdasarkan kebutuhan produk dan pengguna.',
            'Mengembangkan REST API dan melakukan integrasi dengan layanan pihak ketiga.',
            'Melakukan debugging, testing, dan optimasi aplikasi.',
            'Berkolaborasi dengan UI/UX Designer, Product/Project Manager, dan developer lainnya.',
            'Melakukan code review dan menjaga kualitas kode.',
            'Membantu melakukan deployment dan maintenance aplikasi.',
            'Mendokumentasikan proses dan hasil pengembangan.',
            'Mengikuti perkembangan teknologi dan menerapkannya apabila relevan dengan kebutuhan proyek.'
        ],
        requirements: [
            'Pendidikan minimal D3/S1 Teknik Informatika, Sistem Informasi, Ilmu Komputer, atau bidang terkait.',
            'Memahami konsep pemrograman dan software development.',
            'Memiliki pengalaman menggunakan Laravel/PHP.',
            'Memahami JavaScript dan frontend development (React / Next.js).',
            'Memahami database relational seperti MySQL/PostgreSQL.',
            'Memahami REST API dan integrasi web service.',
            'Memahami Git dan version control workflow.',
            'Mampu melakukan troubleshooting dan debugging aplikasi.',
            'Mampu bekerja secara mandiri maupun bersama tim.',
            'Memiliki kemampuan komunikasi yang baik dan kemauan belajar tinggi.',
            'Memiliki portfolio/project yang dapat ditunjukkan menjadi nilai tambah.'
        ],
        nice_to_have: [
            'React / Vue / Next.js',
            'Docker & Containerization',
            'Linux Environment & Bash',
            'CI/CD Pipeline Automation',
            'Cloud deployment (AWS / DigitalOcean / Vercel)',
            'Redis In-memory Caching',
            'Automated testing (Pest / PHPUnit / Jest)',
            'Pengalaman mengembangkan SaaS atau produk digital'
        ],
        benefits: [
            'Real Project Experience: Terlibat langsung dalam proyek digital nyata, bukan sekadar latihan.',
            'Learning & Development: Akses learning session, workshop, mentoring, dan library resource.',
            'Cross-functional Experience: Kolaborasi tim tech, AI, creative, marketing, dan business.',
            'Career Growth: Kesempatan berkembang sesuai kompetensi, ownership, dan kontribusi nyata.',
            'Flexible Work Arrangement: Pola kerja hybrid yang seimbang dan adaptif.',
            'Professional Environment: Lingkungan kerja yang mendorong continuous improvement.',
            'Certificate & Official Recognition: Pengakuan portofolio resmi industri.',
            'Opportunity to Grow with Diggity: Jalur prioritas rekrutmen permanen untuk kontributor unggul.'
        ],
        required_skills: ['Laravel', 'PHP', 'JavaScript', 'React', 'MySQL', 'REST API', 'Git'],
        is_active: true,
        created_at: '2026-10-10'
    },
    {
        id: 2,
        title: 'UI/UX Designer',
        slug: 'ui-ux-designer',
        department: 'Creative & Brand',
        type: 'Full-time',
        location: 'Yogyakarta / Hybrid',
        level: 'Junior–Middle',
        salary_min: 4000000,
        salary_max: 7000000,
        education: 'D3/S1 DKV / Sistem Informasi / Terkait',
        closing_date: '02 Oktober 2026',
        status: 'closing_soon',
        description: 'Kami mencari UI/UX Designer yang berorientasi pada kepuasan pengguna dan detail estetika tinggi untuk merancang pengalaman antarmuka digital yang intuitif bagi platform Diggity dan klien enterprise kami.',
        responsibilities: [
            'Merancang user journey, user flow, sitemap, wireframe, dan prototype interaktif di Figma.',
            'Membangun, memelihara, dan mendokumentasikan Design System berskala multi-platform.',
            'Melakukan user research kualitatif, wawancara kandidat pengguna, dan usability testing.',
            'Bekerja erat dengan Frontend Engineer untuk memastikan presisi implementasi komponen visual.',
            'Menyiapkan aset visual, micro-interactions, dan panduan desain bagi tim pengembang.'
        ],
        requirements: [
            'Portofolio desain UI/UX komprehensif yang memperlihatkan alur pemecahan masalah (case study).',
            'Kemahiran tinggi dalam Figma (Auto-layout, Components, Variants, Design Tokens, Variables).',
            'Pemahaman mendalam tentang standar aksesibilitas (WCAG), hierarki visual, dan tipografi digital.',
            'Kemampuan komunikasi visual yang jelas dan artikulatif saat presentasi konsep desain.',
            'Terbuka terhadap masukan, cepat beradaptasi, dan senang bereksperimen dengan tren UI modern.'
        ],
        nice_to_have: [
            'Pemahaman dasar HTML, CSS, dan Tailwind CSS tokens.',
            'Pengalaman mendesain SaaS B2B, dashboard analitik kompleks, atau sistem mobile native.',
            'Keahlian motion design (Lottie / After Effects / Rive).'
        ],
        benefits: [
            'Fasilitas monitor eksternal dan lisensi resmi Figma Professional.',
            'Mentoring intensif bersama Lead Designer & Product Architect.',
            'Eksposur menangani proyek desain korporat nasional dan ekosistem startup.',
            'Kultur kerja suportif dengan work-life balance yang sehat.'
        ],
        required_skills: ['Figma', 'UI Design', 'UX Research', 'Design System', 'Prototyping', 'Wireframing'],
        is_active: true,
        created_at: '2026-10-05'
    },
    {
        id: 3,
        title: 'Digital Marketing Specialist',
        slug: 'digital-marketing-specialist',
        department: 'Growth Marketing',
        type: 'Full-time',
        location: 'Remote / Hybrid',
        level: 'Junior–Middle',
        salary_min: 4500000,
        salary_max: 8000000,
        education: 'D3/S1 Pemasaran / Komunikasi / Manajemen / Terkait',
        closing_date: '02 Oktober 2026',
        status: 'open',
        description: 'Memimpin perencanaan, aktivasi, dan optimasi kampanye periklanan digital multi-channel guna mengakselerasi brand awareness serta akuisisi audiens pada ekosistem Diggity Academy dan layanan digital B2B.',
        responsibilities: [
            'Merancang dan mengeksekusi paid advertising campaign di Meta Ads, Google Ads, dan TikTok Ads.',
            'Menyusun strategi SEO on-page & off-page untuk meningkatkan traffic organik portal wawasan Diggity.',
            'Melakukan monitoring metrik akuisisi (CTR, CAC, ROAS, LTV) menggunakan Google Analytics 4 (GA4).',
            'Menyusun copy iklan persuasif dan berkolaborasi bersama tim kreatif untuk visual asset.',
            'Menyajikan laporan performa mingguan berbasis data dan rekomendasi optimasi berkelanjutan.'
        ],
        requirements: [
            'Pengalaman minimal 1-2 tahun mengelola kampanye paid advertising dengan portfolio performa nyata.',
            'Keahlian praktis Meta Business Manager, Google Ads (Search, Display, PMax), dan GA4.',
            'Pemahaman kuat mengenai customer journey, conversion funnel, dan A/B testing.',
            'Kemampuan analisa data kuantitatif serta copywriting persuasif berbahasa Indonesia & Inggris.'
        ],
        nice_to_have: [
            'Sertifikasi Google Ads / Meta Certified Media Buying Professional.',
            'Pengalaman mengelola kampanye produk edukasi (EdTech) atau software B2B.',
            'Keahlian otomasi CRM (Email Marketing, WhatsApp Business API).'
        ],
        benefits: [
            'Insentif berbasis performa target kampanye (Performance Bonus).',
            'Skema kerja fleksibel (Remote / Hybrid) dengan jam kerja terukur.',
            'Budget bulanan untuk riset tools marketing premium.',
            'Akses penuh ke semua masterclass Growth & Digital Marketing di Diggity Academy.'
        ],
        required_skills: ['Meta Ads', 'Google Ads', 'SEO', 'Analytics', 'Conversion Tracking', 'Copywriting'],
        is_active: true,
        created_at: '2026-10-08'
    },
    {
        id: 4,
        title: 'AI & Automation Specialist',
        slug: 'ai-automation-specialist',
        department: 'AI & Emerging Technology',
        type: 'Project-based / Full-time',
        location: 'Remote / Hybrid',
        level: 'Middle',
        salary_min: 6500000,
        salary_max: 12000000,
        education: 'S1 Ilmu Komputer / Teknik / Terkait',
        closing_date: '02 Oktober 2026',
        status: 'open',
        description: 'Mengembangkan workflow otomasi cerdas, implementasi Generative AI, dan integrasi pipeline Large Language Model (LLM) untuk mentransformasi proses bisnis internal Diggity dan klien perusahaan kami.',
        responsibilities: [
            'Merancang arsitektur agen AI mandiri dan alur otomatisasi menggunakan n8n, Make, dan script Python.',
            'Mengintegrasikan API Foundation Model (OpenAI, Claude, Gemini) ke dalam software aplikasi web Diggity.',
            'Membangun pipeline RAG (Retrieval-Augmented Generation) dengan vector database (pgvector / Pinecone).',
            'Melakukan evaluasi output AI, prompt optimization, dan penjagaan guardrails keamanan data.',
            'Berkolaborasi dengan tim software engineer untuk pengemasan AI service yang handal dan low-latency.'
        ],
        requirements: [
            'Pengalaman hands-on mengembangkan aplikasi berbasis Generative AI dan API LLM.',
            'Keahlian solid dalam Python, REST API development, dan async workflow integration.',
            'Penguasaan teknik Prompt Engineering, Function Calling, dan RAG architecture.',
            'Familiar dengan konsep vector embeddings, tokenomics, dan latency optimization.',
            'Kemampuan problem-solving tinggi dan orientasi kuat terhadap otomasi proses riil.'
        ],
        nice_to_have: [
            'Pengalaman dengan framework LangChain / LlamaIndex.',
            'Pemahaman deployment model open-source (Ollama / vLLM / HuggingFace).',
            'Pengalaman orkestrasi di cloud server Linux.'
        ],
        benefits: [
            'Komputasi GPU cloud dan kuota credit API model AI terdepan.',
            'Skema kerja 100% remote atau hybrid dengan fleksibilitas tinggi.',
            'Kompensasi menarik berbasis milestone proyek & kepemilikan hasil inovasi.',
            'Menjadi pionir dalam squad AI & Emerging Technology di ekosistem Diggity.'
        ],
        required_skills: ['Generative AI', 'AI Automation', 'Prompt Engineering', 'API Integration', 'Python', 'Vector DB'],
        is_active: true,
        created_at: '2026-10-12'
    },
    {
        id: 5,
        title: 'Frontend React & Tailwind Intern',
        slug: 'frontend-react-intern',
        department: 'Technology',
        type: 'Internship',
        location: 'Remote (Online)',
        level: 'Junior',
        salary_min: 1500000,
        salary_max: 2500000,
        education: 'Mahasiswa Aktif Semester 5-8 / Fresh Graduate',
        closing_date: '25 Oktober 2026',
        status: 'closing_soon',
        description: 'Program magang intensif 3-6 bulan untuk mengasah kemampuan frontend engineering dalam proyek riil bersama para mentor senior Diggity.',
        responsibilities: [
            'Mengonversi desain Figma menjadi komponen React yang rapi dan responsif.',
            'Membantu integrasi REST API dan handling data fetching.',
            'Mempelajari standar git workflow, code linting, dan performa web modern.'
        ],
        requirements: [
            'Memahami dasar HTML, CSS, JavaScript, dan konsep React component.',
            'Familiar dengan styling menggunakan Tailwind CSS.',
            'Memiliki kemauan belajar tinggi, proaktif bertanya, dan bertanggung jawab terhadap deadline tugas.'
        ],
        benefits: [
            'Uang saku bulanan dan sertifikat magang resmi industri.',
            'Mentoring 1-on-1 langsung bersama Tech Lead.',
            'Peluang besar direkrut sebagai Full-time Junior Developer setelah lulus.'
        ],
        required_skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'Responsive Design'],
        is_active: true,
        created_at: '2026-10-15'
    },
    {
        id: 6,
        title: 'DevOps & Cloud Infrastructure Engineer',
        slug: 'devops-cloud-engineer',
        department: 'Cloud & Cyber Security',
        type: 'Full-time',
        location: 'Remote (Online)',
        level: 'Senior',
        salary_min: 10000000,
        salary_max: 16000000,
        education: 'S1 Teknik Informatika / Sistem Komputer',
        closing_date: '05 Oktober 2026',
        status: 'closed',
        description: 'Bertanggung jawab atas orkestrasi infrastruktur server cloud, otomatisasi CI/CD pipeline, keamanan jaringan, dan ketersediaan sistem 99.9% uptime.',
        responsibilities: [
            'Mengelola klaster Kubernetes, Docker container, dan load balancer di AWS/GCP.',
            'Membangun pipeline CI/CD menggunakan GitHub Actions untuk auto-deploy multi-environment.',
            'Menjaga kepatuhan standar keamanan data ISO 27001 dan audit penetrasi berkala.'
        ],
        requirements: [
            'Pengalaman 3+ tahun dalam bidang DevOps, Cloud Engineering, atau Linux System Administration.',
            'Sertifikasi cloud (AWS Certified Solutions Architect atau CKA Kubernetes) menjadi nilai plus kuat.'
        ],
        benefits: [
            'Kompensasi level senior dengan tunjangan komprehensif.',
            '100% Remote dengan jam kerja fleksibel.',
            'Budget tahunan untuk sertifikasi dan kursus internasional.'
        ],
        required_skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
        is_active: false,
        created_at: '2026-09-15'
    }
];

export const HIRING_PROCESS = [
    {
        step: '01',
        title: 'Apply',
        subtitle: 'Kirim Lamaran',
        duration: 'Hari ke-1',
        desc: 'Kirim CV, portfolio, dan informasi yang dibutuhkan melalui posisi yang tersedia di portal karier.'
    },
    {
        step: '02',
        title: 'CV & Portfolio Review',
        subtitle: 'Peninjauan Berkas',
        duration: '1–2 Hari Kerja',
        desc: 'Tim Diggity mempelajari pengalaman, kompetensi teknis, dan portofolio hasil pekerjaan Anda secara seksama.'
    },
    {
        step: '03',
        title: 'Interview',
        subtitle: 'Wawancara Eksplorasi',
        duration: '45–60 Menit',
        desc: 'Kenali Diggity lebih dekat dan diskusikan pengalaman, cara kerja tim, serta ekspektasi mutual kedua pihak.'
    },
    {
        step: '04',
        title: 'Assessment',
        subtitle: 'Uji Kompetensi Teknis',
        duration: '2–4 Hari',
        desc: 'Untuk posisi tertentu, kandidat dapat mengikuti technical test, mini case study, atau code/portfolio review.'
    },
    {
        step: '05',
        title: 'Final Interview',
        subtitle: 'Wawancara Tim & User',
        duration: '30–45 Menit',
        desc: 'Diskusi lebih mendalam bersama pimpinan divisi mengenai role, keselarasan visi, ekspektasi, dan cara kerja tim.'
    },
    {
        step: '06',
        title: 'Join Diggity',
        subtitle: 'Onboarding & Penyambutan',
        duration: 'Hari H',
        desc: 'Penyampaian offering letter resmi, penandatanganan kesepakatan, dan sambutan hangat bergabung ke ekosistem Diggity! 🚀'
    }
];

export const CULTURE_VALUES = [
    {
        number: '01',
        title: 'Curious',
        desc: 'Selalu ingin tahu, haus belajar, dan gemar mengeksplorasi hal-hal serta teknologi baru tanpa takut salah.'
    },
    {
        number: '02',
        title: 'Collaborative',
        desc: 'Percaya bahwa solusi digital terbaik lahir dari kolaborasi terbuka lintas fungsi dan saling mendukung.'
    },
    {
        number: '03',
        title: 'Adaptive',
        desc: 'Cepat beradaptasi dengan perkembangan teknologi mutakhir, dinamika pasar, dan perubahan kebutuhan bisnis.'
    },
    {
        number: '04',
        title: 'Accountable',
        desc: 'Berani mengambil ownership penuh dan bertanggung jawab penuh terhadap standar kualitas pekerjaan serta hasil.'
    },
    {
        number: '05',
        title: 'Impact-Driven',
        desc: 'Fokus pada penciptaan value nyata dan dampak berkelanjutan bagi pengguna, bukan sekadar menyelesaikan checklist task.'
    },
    {
        number: '06',
        title: 'Human-Centered',
        desc: 'Teknologi diciptakan untuk mempermudah dan memberdayakan manusia, bukan sebaliknya.'
    }
];

export const WHY_DIGGITY_POINTS = [
    {
        icon: 'Rocket',
        title: 'Work on Real Projects',
        desc: 'Terlibat langsung dalam proyek dan produk digital yang digunakan secara nyata oleh bisnis, organisasi, institusi, maupun masyarakat luas.'
    },
    {
        icon: 'BookOpen',
        title: 'Keep Learning',
        desc: 'Belajar bukan sekadar benefit tambahan, melainkan cara kami bekerja. Eksplorasi tools baru dan upgrade skill menjadi denyut nadi harian.'
    },
    {
        icon: 'Users',
        title: 'Collaborative Environment',
        desc: 'Bekerja bersama tim lintas disiplin: developer, designer, marketer, strategist, cloud engineer, AI specialist, hingga business consultant.'
    },
    {
        icon: 'TrendingUp',
        title: 'Room to Grow',
        desc: 'Kami membuka ruang seluas-luasnya bagi setiap individu untuk berkembang secara profesional, mengambil ownership inisiatif, dan memimpin.'
    },
    {
        icon: 'Target',
        title: 'Build Something Meaningful',
        desc: 'Bukan sekadar koding atau mengerjakan tiket, melainkan memahami akar masalah klien dan ikut merancang solusi bernilai tinggi.'
    },
    {
        icon: 'Globe',
        title: 'Flexible & Future-Oriented',
        desc: 'Membangun cara kerja yang adaptif, hybrid/remote-friendly, menghargai otonomi, dan selaras dengan perubahan dunia kerja modern.'
    }
];

export const EVP_MATRIX = [
    { area: 'Learning', offer: 'Learning resources, mentoring intensif 1-on-1 & forum knowledge sharing mingguan.' },
    { area: 'Career', offer: 'Career development terstruktur & peluang promosi berdasarkan kontribusi obyektif.' },
    { area: 'Experience', offer: 'Real-world enterprise projects & eksposur kerja lintas fungsi lintas industri.' },
    { area: 'Community', offer: 'Collaborative digital ecosystem yang inklusif, suportif, dan berpikiran maju.' },
    { area: 'Flexibility', offer: 'Flexible work arrangement (Hybrid / Remote) sesuai kebutuhan role dan kenyamanan kerja.' },
    { area: 'Impact', offer: 'Kesempatan nyata membangun solusi digital yang digunakan oleh ribuan pengguna.' },
    { area: 'Recognition', offer: 'Apresiasi kompetitif terhadap kontribusi, achievement, dan pencapaian tim.' },
    { area: 'Well-being', offer: 'Lingkungan kerja yang sehat, saling menghargai batasan waktu, dan suportif.' }
];

export const CAREER_DEVELOPMENT_AREAS = [
    { title: 'Learning', desc: 'Akses knowledge sharing, workshop internal, mentoring langsung bersama lead, dan library edukasi premium.' },
    { title: 'Experience', desc: 'Terlibat dalam berbagai proyek multidisiplin dan lintas industri untuk memperluas portofolio pengalaman.' },
    { title: 'Ownership', desc: 'Diberikan otonomi serta ruang untuk mengambil tanggung jawab penuh dan memimpin inisiatif produk.' },
    { title: 'Career Path', desc: 'Bangun perjalanan karier yang jelas berdasarkan kompetensi teknis, kontribusi nyata, dan aspirasi profesional.' },
    { title: 'Internal Mobility', desc: 'Kesempatan untuk mengeksplorasi peran baru atau lintas divisi di dalam ekosistem digital Diggity.' }
];

export const CAREER_GROWTH_TRACK = [
    { level: 'Intern / Trainee', desc: 'Fondasi teknis & asistensi proyek riil' },
    { level: 'Junior', desc: 'Eksekusi task terarah & penguasaan standar kode' },
    { level: 'Middle / Specialist', desc: 'Otonomi pengerjaan fitur & integrasi sistem' },
    { level: 'Senior / Expert', desc: 'Arsitektur solusi, code review & problem solving kompleks' },
    { level: 'Lead', desc: 'Manajemen sprint teknis & bimbingan tim engineer' },
    { level: 'Manager / Head', desc: 'Strategi departemen, alokasi kapabilitas & business alignment' }
];
