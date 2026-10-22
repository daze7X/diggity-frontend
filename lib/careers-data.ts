import { Career } from './api';

export const CAREERS_DATABASE: Career[] = [
    {
        id: 1,
        title: 'Full-Stack Web Developer (Next.js & Laravel)',
        slug: 'full-stack-web-developer',
        department: 'Technology',
        type: 'Full-time',
        location: 'Yogyakarta (Hybrid)',
        level: 'Junior–Middle',
        salary_min: 5000000,
        salary_max: 8500000,
        education: 'D3/S1 Teknik Informatika / Terkait',
        closing_date: '15 November 2026',
        status: 'open',
        description: 'Sebagai Full-Stack Developer di Diggity, kamu akan terlibat aktif dalam rekayasa aplikasi web modern skala menengah hingga enterprise. Kamu berkolaborasi langsung dengan Lead Architect untuk merancang arsitektur API yang reliabel, clean code, dan antarmuka interaktif yang cepat.',
        responsibilities: [
            'Mengembangkan fitur baru menggunakan Next.js App Router (TypeScript) dan Laravel 11 REST API.',
            'Mengoptimalkan database query pada PostgreSQL / MySQL dan Redis caching.',
            'Mengimplementasikan integrasi payment gateway, webhook, dan third-party services.',
            'Melakukan unit testing, code review berkala, dan dokumentasi API endpoint.'
        ],
        requirements: [
            'Pengalaman minimal 1-2 tahun dengan ekosistem React/Next.js dan PHP/Laravel.',
            'Pemahaman mendalam tentang state management, RESTful API, dan database relational.',
            'Familiar dengan Git workflow, pull request review, dan best practice clean code.',
            'Mampu berkomunikasi efektif dan bekerja kolaboratif dalam tim agile.'
        ],
        nice_to_have: [
            'Pengalaman dengan Docker container dan automated CI/CD pipeline.',
            'Pemahaman dasar arsitektur Headless CMS atau Microservices.'
        ],
        benefits: [
            'Gaji kompetitif dan evaluasi performa berkala.',
            'Skema kerja fleksibel (Hybrid Yogyakarta).',
            'Tunjangan perangkat kerja dan akses seluruh kelas Diggity Academy.',
            'BPJS Kesehatan & Ketenagakerjaan.'
        ],
        required_skills: ['Next.js', 'React', 'Laravel', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
        is_active: true,
        created_at: '2026-10-10'
    },
    {
        id: 2,
        title: 'UI/UX & Digital Product Designer',
        slug: 'ui-ux-product-designer',
        department: 'Creative & Brand',
        type: 'Full-time',
        location: 'Yogyakarta (Hybrid)',
        level: 'Junior–Middle',
        salary_min: 4500000,
        salary_max: 7500000,
        education: 'D3/S1 Desain Komunikasi Visual / Sistem Informasi',
        closing_date: '30 Oktober 2026',
        status: 'closing_soon',
        description: 'Kami mencari UI/UX & Product Designer yang berorientasi pada pengalaman pengguna dan detail visual tinggi untuk mengembangkan antarmuka SaaS Diggity dan produk klien.',
        responsibilities: [
            'Merancang user journey, wireframe, high-fidelity mockups, dan interactive prototype di Figma.',
            'Membangun serta memelihara Design System terstandarisasi untuk multi-platform.',
            'Melakukan usability testing dan wawancara pengguna untuk memvalidasi fitur baru.',
            'Bekerja erat dengan frontend engineer guna memastikan konsistensi implementasi desain.'
        ],
        requirements: [
            'Portofolio desain UI/UX yang mendemonstrasikan proses problem-solving yang kuat.',
            'Keahlian tinggi dalam menggunakan Figma, auto-layout, component variants, dan tokens.',
            'Pemahaman mengenai prinsip aksesibilitas (WCAG), visual hierarchy, dan micro-interactions.'
        ],
        nice_to_have: [
            'Pemahaman dasar HTML, CSS, dan Tailwind utility classes.',
            'Pengalaman merancang antarmuka dashboard admin enterprise atau SaaS B2B.'
        ],
        benefits: [
            'Fasilitas monitor eksternal dan lisensi Figma Professional.',
            'Mentoring intensif bersama Product Lead.',
            'Work-life balance sehat dan suasana kerja suportif.'
        ],
        required_skills: ['Figma', 'Design System', 'User Research', 'Prototyping', 'Usability Testing'],
        is_active: true,
        created_at: '2026-10-05'
    },
    {
        id: 3,
        title: 'AI Automation & LLM Engineer',
        slug: 'ai-automation-engineer',
        department: 'AI & Data',
        type: 'Contract',
        location: 'Remote (Online)',
        level: 'Middle',
        salary_min: 7000000,
        salary_max: 12000000,
        education: 'S1 Ilmu Komputer / Teknik / Matematika Terapan',
        closing_date: '20 November 2026',
        status: 'open',
        description: 'Mengembangkan agen otomasi cerdas, pipeline RAG (Retrieval-Augmented Generation), dan integrasi API AI untuk produk enterprise Diggity.',
        responsibilities: [
            'Merancang dan mendeploy pipeline RAG menggunakan vector database (Pinecone/pgvector).',
            'Mengembangkan prompt engineering, evaluasi output LLM, dan function calling automation.',
            'Membangun API mikro berbasis Python (FastAPI) yang terintegrasi dengan backend utama.',
            'Memantau token usage, latency, dan reliability performa agen AI di produksi.'
        ],
        requirements: [
            'Pengalaman praktis menggunakan OpenAI / Anthropic / Gemini API dan framework LangChain / LlamaIndex.',
            'Keahlian solid dalam Python, asynchronous programming, dan REST API architecture.',
            'Pemahaman mengenai embedding vectors, chunking strategy, dan semantic search.'
        ],
        benefits: [
            '100% Remote kerja dari mana saja di Indonesia.',
            'Kompensasi berbasis milestone kontrak yang kompetitif.',
            'Akses ke komputasi cloud GPU dan kuota API model mutakhir.'
        ],
        required_skills: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Vector DB', 'RAG'],
        is_active: true,
        created_at: '2026-10-12'
    },
    {
        id: 4,
        title: 'Performance Marketing & Growth Specialist',
        slug: 'performance-marketing-specialist',
        department: 'Growth Marketing',
        type: 'Full-time',
        location: 'Jakarta (On-site)',
        level: 'Middle',
        salary_min: 6000000,
        salary_max: 9500000,
        education: 'D3/S1 Pemasaran / Komunikasi / Manajemen',
        closing_date: '10 November 2026',
        status: 'open',
        description: 'Memimpin perencanaan, eksekusi, dan optimasi kampanye periklanan digital (Meta Ads, Google Ads, TikTok Ads) untuk mendorong akuisisi klien dan penjualan produk Diggity.',
        responsibilities: [
            'Merencanakan alokasi budget iklan bulanan dengan target ROAS dan CAC yang terukur.',
            'Menyiapkan copywriting iklan yang persuasif dan berkoordinasi dengan tim kreatif.',
            'Menganalisis funnel konversi menggunakan Google Analytics 4 dan Server-side Tracking.',
            'Menyusun laporan performa mingguan yang komprehensif bagi jajaran direksi.'
        ],
        requirements: [
            'Pengalaman minimal 2 tahun mengelola ad spend digital dengan rekam jejak terbukti.',
            'Keahlian mendalam dalam Meta Ads Manager, Google Search/Performance Max, dan GA4.',
            'Kemampuan berpikir analitis berbasis angka dan pemahaman sales funnel B2B/B2C.'
        ],
        benefits: [
            'Bonus insentif performa kampanye (achievement bonus).',
            'Tunjangan transportasi dan operasional kantor Jakarta.',
            'Jenjang karier jelas menuju Growth Lead.'
        ],
        required_skills: ['Meta Ads', 'Google Ads', 'GA4', 'Conversion Tracking', 'Copywriting'],
        is_active: true,
        created_at: '2026-10-08'
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
        title: 'Screening CV & Portofolio',
        duration: '1–3 Hari Kerja',
        desc: 'Evaluasi kesesuaian berkas lamaran, proyek yang pernah dibangun, dan relevansi teknis dengan posisi yang dilamar.'
    },
    {
        step: '02',
        title: 'Technical Skill Challenge',
        duration: '3–5 Hari',
        desc: 'Pemberian mini-proyek atau studi kasus teknis take-home untuk menguji clean code, problem solving, dan arsitektur logika Anda.'
    },
    {
        step: '03',
        title: 'Tech Lead & Culture Interview',
        duration: '45–60 Menit',
        desc: 'Sesi diskusi mendalam seputar hasil coding challenge, pengalaman kolaborasi tim, dan kecocokan nilai kerja bersama Tech Lead.'
    },
    {
        step: '04',
        title: 'Offering & Welcoming Session',
        duration: 'Hari H',
        desc: 'Penawaran resmi kompensasi, penandatanganan kontrak kerja, dan orientasi onboarding ke lingkungan kerja Diggity.'
    }
];
