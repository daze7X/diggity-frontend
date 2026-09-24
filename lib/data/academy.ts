import { BookOpen, MonitorPlay, Award, Building, Users, PlayCircle, Book, CheckCircle2, LayoutGrid, Brain, Code, Palette, Megaphone, Briefcase, Shield, Layers, MessageSquare, Rocket, Clock, HeartHandshake } from 'lucide-react';

export const ACADEMY_PROGRAMS = [
    {
        id: 'bootcamp',
        title: 'Bootcamp',
        descriptionEn: 'Intensive, project-based training to build structured digital skills.',
        descriptionId: 'Program intensif berbasis praktik untuk membangun skill digital secara terstruktur.',
        icon: Rocket,
    },
    {
        id: 'online-course',
        title: 'Online Course',
        descriptionEn: 'Self-paced learning with flexible materials accessible anytime.',
        descriptionId: 'Belajar mandiri dengan materi yang fleksibel dan dapat diakses kapan saja.',
        icon: MonitorPlay,
    },
    {
        id: 'certification',
        title: 'Professional Certification',
        descriptionEn: 'Competency validation through certification programs and assessments.',
        descriptionId: 'Validasi kompetensi melalui program sertifikasi dan assessment.',
        icon: Award,
    },
    {
        id: 'corporate-training',
        title: 'Corporate Training',
        descriptionEn: 'Customized upskilling and reskilling programs for organizations.',
        descriptionId: 'Program upskilling dan reskilling yang dikustomisasi untuk kebutuhan organisasi.',
        icon: Building,
    },
    {
        id: 'workshop',
        title: 'Workshop',
        descriptionEn: 'Short training focused on practice and mastering specific skills.',
        descriptionId: 'Pelatihan singkat yang fokus pada praktik dan penguasaan skill tertentu.',
        icon: Users,
    },
    {
        id: 'webinar',
        title: 'Webinar',
        descriptionEn: 'Seminars, industry talks, and educational content to broaden insights.',
        descriptionId: 'Seminar, industry talk, dan berbagai konten edukasi untuk memperluas wawasan.',
        icon: PlayCircle,
    },
    {
        id: 'e-book',
        title: 'E-Book',
        descriptionEn: 'Access various e-books, digital guides, and learning modules.',
        descriptionId: 'Akses berbagai e-book, panduan digital, dan modul pembelajaran untuk meningkatkan keterampilan.',
        icon: Book,
    },
    {
        id: 'csr',
        title: 'CSR',
        descriptionEn: 'Corporate training to improve skills and community economic impact.',
        descriptionId: 'Pelatihan perusahaan untuk meningkatkan keterampilan dan dampak ekonomi masyarakat.',
        icon: HeartHandshake,
    },
];

export const ACADEMY_BENEFITS = [
    {
        id: 'expert-mentors',
        titleEn: 'Expert & Industry-Based Mentors',
        titleId: 'Mentor Terbaik dan Berpengalaman',
        descEn: 'Learn with practitioners experienced in the tech industry. Selected based on competence and teaching ability.',
        descId: 'Belajar bersama praktisi yang memiliki pengalaman di industri teknologi. Setiap mentor dipilih berdasarkan kompetensi dan kemampuan mengajar.',
        icon: Award,
    },
    {
        id: 'career-support',
        titleEn: 'Personalized Career Support',
        titleId: 'Panduan Karier yang Personal',
        descEn: 'Our Talent & Career Support team helps you understand career choices, prepare portfolios, and get direction after completing the program.',
        descId: 'Tim Talent & Career Support membantu student memahami pilihan karier, mempersiapkan portfolio, hingga mendapatkan arahan setelah menyelesaikan program.',
        icon: Briefcase,
    },
    {
        id: 'class-manager',
        titleEn: 'Dedicated Class Manager',
        titleId: 'Pendampingan Selama Proses Belajar',
        descEn: 'Every class gets support for administrative and learning needs, feedback, and ensuring a good learning experience.',
        descId: 'Setiap kelas mendapatkan support untuk membantu kebutuhan administratif maupun pembelajaran, menerima feedback, dan memastikan pengalaman belajar berjalan dengan baik.',
        icon: Users,
    },
    {
        id: 'flexible-learning',
        titleEn: 'Flexible Learning Support',
        titleId: 'Kesempatan Mengulang Pembelajaran',
        descEn: 'Students get the opportunity to repeat learning according to program provisions if they need additional time.',
        descId: 'Student dapat memperoleh kesempatan untuk mengulang pembelajaran sesuai dengan ketentuan program apabila membutuhkan waktu tambahan untuk memahami materi.',
        icon: Clock,
    },
    {
        id: 'community',
        titleEn: 'Community & Networking',
        titleId: 'Bangun Networking Bersama Komunitas Diggity',
        descEn: 'Connect with students, alumni, mentors, and other professionals through the Diggity community ecosystem.',
        descId: 'Terhubung dengan student, alumni, mentor, dan profesional lainnya melalui community ecosystem Diggity.',
        icon: MessageSquare,
    },
    {
        id: 'real-project',
        titleEn: 'Real Project & Career Experience',
        titleId: 'Belajar Lewat Project Nyata',
        descEn: 'Students not only learn theory but also work on projects that can be developed into professional portfolios.',
        descId: 'Student tidak hanya mempelajari teori, tetapi juga mengerjakan project yang dapat dikembangkan menjadi portfolio dan pengalaman profesional.',
        icon: Layers,
    },
];

export const LEARNING_PATHS = [
    {
        id: 'ai-data',
        title: 'AI & Data',
        icon: Brain,
        paths: [
            {
                name: 'AI Engineer',
                descEn: 'Learn AI fundamentals, machine learning, model development, up to implementing AI into products.',
                descId: 'Mempelajari fundamental AI, machine learning, model development, AI application, hingga implementasi AI ke dalam produk dan sistem.',
            },
            {
                name: 'GenAI Engineer',
                descEn: 'Focus on Generative AI, LLM, prompt engineering, AI agents, RAG, and AI-based applications.',
                descId: 'Fokus pada Generative AI, LLM, prompt engineering, AI agent, RAG, dan pengembangan aplikasi berbasis AI.',
            },
            {
                name: 'Data Analyst',
                descEn: 'Learn data processing, visualization, dashboards, business intelligence, and data analysis for business needs.',
                descId: 'Mempelajari data processing, data visualization, dashboard, business intelligence, dan analisis data untuk kebutuhan bisnis.',
            },
            {
                name: 'Data Scientist',
                descEn: 'Learn statistics, machine learning, data modeling, predictive analytics, and data science projects.',
                descId: 'Mempelajari statistik, machine learning, data modeling, predictive analytics, dan data science project.',
            },
        ]
    },
    {
        id: 'technology',
        title: 'Technology',
        icon: Code,
        paths: [
            {
                name: 'Front-End Developer',
                descEn: 'HTML, CSS, JavaScript, modern frameworks, responsive design, and interface development.',
                descId: 'HTML, CSS, JavaScript, framework modern, responsive design, dan pengembangan interface.',
            },
            {
                name: 'Back-End Developer',
                descEn: 'Programming, APIs, databases, authentication, server architecture, and backend development.',
                descId: 'Programming, API, database, authentication, server architecture, dan backend development.',
            },
            {
                name: 'Mobile Developer',
                descEn: 'Mobile app development, UI implementation, API integration, databases, and deployment.',
                descId: 'Pengembangan aplikasi mobile, UI implementation, API integration, database, hingga deployment.',
            },
            {
                name: 'DevOps Engineer',
                descEn: 'Version control, CI/CD, containerization, automation, monitoring, and deployment.',
                descId: 'Version control, CI/CD, containerization, automation, monitoring, dan deployment.',
            },
            {
                name: 'Cloud Engineer',
                descEn: 'Cloud infrastructure, networking, storage, security, deployment, and cloud architecture.',
                descId: 'Cloud infrastructure, networking, storage, security, deployment, dan cloud architecture.',
            }
        ]
    },
    {
        id: 'creative',
        title: 'Creative',
        icon: Palette,
        paths: [
            {
                name: 'UI/UX Designer',
                descEn: 'User research, information architecture, wireframing, UI design, prototyping, and design systems.',
                descId: 'User research, information architecture, wireframe, UI design, prototyping, dan design system.',
            },
            {
                name: 'Graphic Designer',
                descEn: 'Design fundamentals, visual identity, layout, typography, illustration, and digital design.',
                descId: 'Design fundamentals, visual identity, layout, typography, illustration, dan digital design.',
            },
            {
                name: 'Motion Designer',
                descEn: 'Motion graphics, animation principles, video compositing, and visual storytelling.',
                descId: 'Motion graphics, animation principles, video compositing, dan visual storytelling.',
            },
            {
                name: '3D Designer',
                descEn: '3D modeling, texturing, lighting, rendering, and 3D visual production.',
                descId: '3D modeling, texturing, lighting, rendering, dan 3D visual production.',
            }
        ]
    },
    {
        id: 'marketing',
        title: 'Marketing',
        icon: Megaphone,
        paths: [
            {
                name: 'Digital Marketing Specialist',
                descEn: 'Digital strategy, content, social media, advertising, analytics, and campaign management.',
                descId: 'Digital strategy, content, social media, advertising, analytics, dan campaign management.',
            },
            {
                name: 'SEO Specialist',
                descEn: 'Keyword research, technical SEO, content optimization, link building, and SEO analytics.',
                descId: 'Keyword research, technical SEO, content optimization, link building, dan SEO analytics.',
            },
            {
                name: 'Performance Marketing Specialist',
                descEn: 'Paid advertising, campaign optimization, conversion tracking, funnels, and performance analytics.',
                descId: 'Paid advertising, campaign optimization, conversion tracking, funnel, dan performance analytics.',
            },
            {
                name: 'Social Media Specialist',
                descEn: 'Content strategy, social media management, community, analytics, and campaign execution.',
                descId: 'Content strategy, social media management, community, analytics, dan campaign execution.',
            }
        ]
    },
    {
        id: 'business',
        title: 'Business',
        icon: Briefcase,
        paths: [
            {
                name: 'Product Manager',
                descEn: 'Product strategy, user research, product roadmap, prioritization, and product development.',
                descId: 'Product strategy, user research, product roadmap, prioritization, dan product development.',
            },
            {
                name: 'Project Manager',
                descEn: 'Project planning, execution, resource management, risk management, and project delivery.',
                descId: 'Project planning, execution, resource management, risk management, dan project delivery.',
            },
            {
                name: 'Business Analyst',
                descEn: 'Business process, requirement analysis, data analysis, documentation, and solution design.',
                descId: 'Business process, requirement analysis, data analysis, documentation, dan solution design.',
            },
            {
                name: 'Digital Transformation Specialist',
                descEn: 'Digital strategy, process transformation, technology adoption, automation, and organizational transformation.',
                descId: 'Digital strategy, process transformation, technology adoption, automation, dan organizational transformation.',
            }
        ]
    },
    {
        id: 'cyber-security',
        title: 'Cyber Security',
        icon: Shield,
        paths: [
            {
                name: 'Cyber Security Fundamentals',
                descEn: 'Fundamental cybersecurity, security awareness, network security, threats, and security practices.',
                descId: 'Fundamental cybersecurity, security awareness, network security, threats, dan security practices.',
            },
            {
                name: 'Security Analyst',
                descEn: 'Security monitoring, threat detection, incident analysis, vulnerability assessment, and security operations.',
                descId: 'Security monitoring, threat detection, incident analysis, vulnerability assessment, dan security operations.',
            },
            {
                name: 'Cloud Security',
                descEn: 'Cloud security architecture, identity & access management, data protection, monitoring, and cloud security practices.',
                descId: 'Cloud security architecture, identity & access management, data protection, monitoring, dan cloud security practices.',
            }
        ]
    }
];

export const ACADEMY_FAQ = [
    {
        questionEn: 'I am still a beginner, can I join the Diggity program?',
        questionId: 'Saya masih pemula, apakah bisa mengikuti program Diggity?',
        answerEn: 'Yes, absolutely! Our Learning Paths are designed from fundamental to professional levels. You can start with our entry-level courses.',
        answerId: 'Sangat bisa! Learning Path kami dirancang dari level fundamental hingga profesional. Anda bisa memulai dari materi dasar yang telah kami siapkan.'
    },
    {
        questionEn: 'What is the difference between Bootcamp and Online Course?',
        questionId: 'Apa perbedaan Bootcamp dan Online Course?',
        answerEn: 'Bootcamps are intensive, cohort-based, and heavily focused on live mentorship and real projects. Online Courses are self-paced and flexible.',
        answerId: 'Bootcamp adalah program intensif berbasis kohort dengan pendampingan mentor langsung dan fokus pada proyek nyata. Online Course dirancang untuk belajar mandiri secara fleksibel.'
    },
    {
        questionEn: 'Will I get a certificate?',
        questionId: 'Apakah mendapatkan sertifikat?',
        answerEn: 'Yes, you will receive a digital certificate of completion for every program, which you can easily add to your LinkedIn profile.',
        answerId: 'Ya, Anda akan mendapatkan sertifikat digital setelah menyelesaikan program yang dapat langsung ditambahkan ke profil LinkedIn Anda.'
    },
    {
        questionEn: 'Are there free classes available?',
        questionId: 'Apakah ada kelas gratis?',
        answerEn: 'Yes, we provide Free Courses, Webinars, and E-Books for you to build your fundamental skills at no cost.',
        answerId: 'Ya, kami menyediakan Free Courses, Webinar, dan E-Book agar Anda dapat membangun skill fundamental tanpa biaya.'
    },
    {
        questionEn: 'Can I consult before choosing a program?',
        questionId: 'Apakah bisa konsultasi sebelum memilih program?',
        answerEn: 'Of course! Our Talent Support team is ready to help you choose the best Learning Path for your career goals.',
        answerId: 'Tentu saja! Tim Talent Support kami siap membantu Anda memilih Learning Path yang paling sesuai dengan tujuan karier Anda.'
    },
    {
        questionEn: 'Are there programs for companies?',
        questionId: 'Apakah tersedia program untuk perusahaan?',
        answerEn: 'Yes, we offer Corporate Solutions including Custom Corporate Training and Capacity Building.',
        answerId: 'Ya, kami menyediakan Corporate Solutions yang mencakup Custom Corporate Training dan Capacity Building untuk tim Anda.'
    },
    {
        questionEn: 'Is there career support included?',
        questionId: 'Apakah ada career support?',
        answerEn: 'Yes, we provide career preparation including CV review, portfolio building, and interview simulations.',
        answerId: 'Ya, kami menyediakan pendampingan karier seperti review CV, pembuatan portfolio, dan simulasi interview.'
    },
];
