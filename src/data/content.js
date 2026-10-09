export const portfolioData = {
  brand: {
    name: 'UDARA LAKSHAN',
    tag: 'EDITORIAL PORTFOLIO',
    codeSymbol: '</>',
    directorTitle: 'FULL-STACK DEVELOPER • UI/UX DESIGNER • AI ARCHITECT',
  },

  cinematicMeta: {
    filmTitle: 'A DEVELOPER\'S ODYSSEY',
    productionYear: '2024 – 2026',
    status: 'ACTIVE PRODUCTION // AVAILABLE FOR INTERNSHIPS',
    location: 'KANDY, SRI LANKA',
    role: 'FULL-STACK DEVELOPER, UI/UX DESIGNER & AI INTEGRATOR',
  },

  navLinks: [
    { label: 'Identity',       chapterNum: '00', href: '#hero',           icon: 'FiCompass' },
    { label: 'My Journey',     chapterNum: '01', href: '#journey',        icon: 'FiUser' },
    { label: 'My Work',        chapterNum: '02', href: '#portfolio',      icon: 'FiLayers' },
    { label: 'Digital World',  chapterNum: '03', href: '#digital-world',  icon: 'FiGlobe' },
    { label: 'Craftsmanship',  chapterNum: '04', href: '#tech-stack',     icon: 'FiCpu' },
    { label: 'Curiosity',      chapterNum: '05', href: '#curiosity',      icon: 'FiActivity' },
    { label: 'Contact',        chapterNum: '06', href: '#contact',        icon: 'FiMail' },
  ],

  hero: {
    chapterId: 'PROLOGUE',
    chapterTitle: 'ENTER THE WORLD OF INTENTIONAL CODE & DESIGN',
    titlePrefix: "I'm Udara Lakshan,",
    titleSuffix: 'Full-Stack Developer & UI/UX Designer',
    tagline: 'DIRECTING SCALABLE ARCHITECTURE WITH MODERN FULL-STACK, UI/UX & GEMINI AI',
    description:
      'Reading for an HND in Information Technology (GPA 3.67 / 4.0) at SLIATE Kandy. Crafting intuitive digital experiences as a UI/UX Designer and engineering robust end-to-end applications with React.js, Next.js, Node.js, Spring Boot, and Google Gemini AI intelligence.',
    stats: [
      { value: '3.67', label: 'SLIATE Kandy GPA' },
      { value: 'UI/UX & Web', label: 'Design & Code' },
      { value: 'MERN + Next.js', label: 'Full-Stack Stack' },
      { value: 'Gemini AI', label: 'Intelligent Systems' },
    ],
  },

  aboutMe: {
    chapterNum: 'CH 01',
    title: 'THE PROTAGONIST\'S ORIGIN',
    description:
      'HNDIT candidate at SLIATE Kandy with 3.67 GPA. Passionate about engineering high-performance MERN & Spring Boot platforms enhanced by Gemini AI.',
    linkText: 'EXPLORE JOURNEY →',
    href: '#journey',
  },

  myWork: {
    chapterNum: 'CH 02',
    title: 'FEATURED PRODUCTIONS',
    description:
      'Explore AI-powered e-commerce (Shopease-AI), Next.js FinTech accounting (SmartLedger-LK), and Enterprise Java Inventory systems.',
    linkText: 'WATCH PRODUCTIONS →',
    href: '#portfolio',
  },

  followMe: {
    title: 'CONNECT',
    socials: [
      { name: 'GitHub',    url: 'https://github.com/BOZKO-ai',                     icon: 'FaGithub'     },
      { name: 'LinkedIn',  url: 'https://linkedin.com/in/udara-lakshan-50ab43362',  icon: 'FaLinkedinIn' },
    ],
  },

  // ── Technology Reel ────────────────────────────────────────────────────────
  techStack: [
    { name: 'React.js',          category: 'Frontend',   color: '#61DAFB' },
    { name: 'Next.js',           category: 'Full-Stack', color: '#FFFFFF' },
    { name: 'Figma',             category: 'UI/UX Design', color: '#F24E1E' },
    { name: 'UI/UX Design',      category: 'Design',     color: '#A259FF' },
    { name: 'Google Gemini AI',  category: 'AI & ML',    color: '#B8FF00' },
    { name: 'Node.js',           category: 'Backend',    color: '#68A063' },
    { name: 'Express.js',        category: 'Backend',    color: '#E0E0E0' },
    { name: 'Java',              category: 'Backend',    color: '#E76F00' },
    { name: 'Spring Boot',       category: 'Backend',    color: '#6DB33F' },
    { name: 'JavaScript (ES6+)', category: 'Language',   color: '#F7DF1E' },
    { name: 'TypeScript',        category: 'Language',   color: '#3178C6' },
    { name: 'MongoDB',           category: 'Database',   color: '#47A248' },
    { name: 'MySQL',             category: 'Database',   color: '#4479A1' },
    { name: 'Tailwind CSS',      category: 'Styling',    color: '#38BDF8' },
    { name: 'Three.js',          category: '3D Graphics',color: '#B8FF00' },
    { name: 'Git & GitHub',      category: 'DevOps',     color: '#F05032' },
    { name: 'Postman',           category: 'API Testing',color: '#FF6C37' },
    { name: 'Vercel',            category: 'Deployment', color: '#FFFFFF' },
  ],

  // ── Chapter 01: My Journey ─────────────────────────────────────────────────
  about: {
    chapterNum: 'CHAPTER 01',
    chapterTag: 'MY JOURNEY',
    tagline: 'Education & Technical Evolution',
    headline: 'Engineering Digital Systems\nWith Cinematic Precision',
    bio: [
      "I am an enthusiastic Full-Stack Developer currently reading for my Higher National Diploma in Information Technology (HNDIT) at the Sri Lanka Advanced Technological Institute (SLIATE), Kandy, maintaining a distinguished 3.67 / 4.0 GPA.",
      "My development journey is driven by a deep fascination with building software that feels seamless, intelligent, and resilient. From modern MERN and Next.js applications to robust enterprise backends with Java Spring Boot, I blend clean architectural patterns with intuitive UI/UX design.",
      "A defining hallmark of my work is integrating the Google Gemini API to bring adaptive AI capabilities into real-world workflows — transforming traditional web apps into responsive, intelligent software assistants.",
      "Currently seeking a Full-Stack Developer Intern role where I can contribute to high-impact production codebases and solve ambitious software challenges.",
    ],
    education: {
      degree: 'Higher National Diploma in Information Technology (HNDIT)',
      institution: 'Sri Lanka Advanced Technological Institute (SLIATE), Kandy',
      period: '2024 – 2026',
      gpa: 'Academic Distinction • GPA: 3.67 / 4.0',
      highlights: ['Software Engineering Principles', 'Object-Oriented Programming (Java)', 'Relational & NoSQL Database Design', 'Web Application Engineering'],
    },
    skills: [
      { label: 'React.js & Next.js Ecosystem',  level: 92, category: 'Frontend' },
      { label: 'UI/UX Design & Prototyping (Figma)', level: 90, category: 'Design' },
      { label: 'Google Gemini API & AI Prompts',  level: 89, category: 'AI / ML' },
      { label: 'Node.js & Express.js REST APIs', level: 86, category: 'Backend' },
      { label: 'Java & Spring Boot Framework',   level: 82, category: 'Enterprise' },
      { label: 'MongoDB & MySQL / PostgreSQL',   level: 85, category: 'Database' },
      { label: 'Modern CSS & Motion Design',     level: 88, category: 'Design' },
      { label: 'Git, GitHub, Vercel & Postman',  level: 87, category: 'DevOps' },
    ],
    softSkills: [
      'Problem-Solving & Critical Thinking',
      'Teamwork & Agile Collaboration',
      'Effective Technical Communication',
      'Continuous Learning & Curiosity',
      'Clean Code & SDLC Best Practices',
      'Leadership & Initiative'
    ],
    languages: [
      { name: 'English', level: 'Professional Working Proficiency' },
      { name: 'Sinhala', level: 'Native / Bilingual' }
    ],
    stats: [
      { value: '3.67', label: 'SLIATE GPA', sub: 'Top Academic Standing' },
      { value: '3+',   label: 'Major Systems', sub: 'Production Architectures' },
      { value: 'AI',   label: 'Gemini Integrations', sub: 'Smart Recommendation & Support' },
      { value: '2026', label: 'HNDIT Graduate', sub: 'Available for Immediate Roles' },
    ],
    cta: {
      label: 'Download Complete CV (PDF)',
      href: '/Udara_Lakshan_CV.pdf',
      download: true,
    },
  },

  // ── Certifications & Milestones ────────────────────────────────────────────
  certifications: [
    {
      id: 'cert-1',
      title: 'Generative AI & Google Gemini API Integration',
      issuer: 'Google Cloud & AI Communities',
      issueDate: '2024',
      badge: 'AI & Machine Learning Specialization',
      status: 'Verified Credential',
      skills: ['Google Gemini API', 'Prompt Engineering', 'AI Chatbots', 'LLM Integration', 'Intelligent Workflows'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#b8ff00',
      sceneTag: 'MILESTONE 01',
      summary: 'Demonstrated mastery in integrating Google Gemini models for contextual chatbots, product recommendation engines, and automated insights.',
    },
    {
      id: 'cert-2',
      title: 'Higher National Diploma in Information Technology (HNDIT)',
      issuer: 'SLIATE (Sri Lanka Advanced Technological Institute), Kandy',
      issueDate: '2024 – 2026',
      badge: 'Academic Distinction • GPA 3.67 / 4.0',
      status: 'Academic Qualification',
      skills: ['Software Engineering', 'Data Structures & Algorithms', 'OOP in Java', 'Relational Databases', 'Web Development'],
      link: '#about',
      accentColor: '#ffffff',
      sceneTag: 'MILESTONE 02',
      summary: 'Rigorous academic curriculum covering software lifecycle, algorithms, enterprise systems, and distributed database architectures.',
    },
    {
      id: 'cert-3',
      title: 'Full-Stack Web Development (MERN Stack)',
      issuer: 'Advanced Web Engineering Certificate',
      issueDate: '2024',
      badge: 'Full-Stack Web Engineering',
      status: 'Verified Credential',
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication', 'State Management'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#b8ff00',
      sceneTag: 'MILESTONE 03',
      summary: 'End-to-end full-stack web application development including authentication, database indexing, and asynchronous API pipelines.',
    },
    {
      id: 'cert-4',
      title: 'Java Enterprise & Spring Boot Development',
      issuer: 'Java Software Development Certification',
      issueDate: '2024',
      badge: 'Backend & Enterprise Architecture',
      status: 'Verified Credential',
      skills: ['Java SE / EE', 'Spring Boot', 'MVC Architecture', 'MySQL', 'Hibernate / JPA', 'Layered Services'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#38bdf8',
      sceneTag: 'MILESTONE 04',
      summary: 'Architecting scalable enterprise backend services, object-relational mapping, and multi-tiered database operations with Spring Boot.',
    },
  ],

  // ── Chapter 02: My Work ────────────────────────────────────────────────────
  projects: [
    {
      id: 'shopease',
      title: 'Shopease-AI — Intelligent E-Commerce Platform',
      productionNumber: 'PRODUCTION 01',
      category: 'MERN & AI',
      role: 'Full-Stack Engineer & AI Architect',
      image: '/images/projects/shopease.jpg',
      badge: 'HNDIT Final Project • Production Showcase',
      description:
        'A full-stack, AI-powered e-commerce ecosystem built with React.js, Node.js, and MongoDB. Embedded with Google Gemini API to deliver dynamic product recommendations, natural language customer support, and seamless cart operations.',
      keyContributions: [
        'Designed modular React frontend with responsive shopping flows and real-time state management.',
        'Engineered secure Node.js & Express REST API handling authentication, inventory updates, and checkout.',
        'Integrated Google Gemini API to deliver intelligent product suggestions and automated assistant capabilities.',
        'Implemented MongoDB Atlas database schema with optimized indexing for product catalogs.',
      ],
      tags: ['React.js', 'Node.js', 'MongoDB', 'Supabase', 'Tailwind CSS', 'Google Gemini API', 'REST API'],
      gradient: 'linear-gradient(135deg, #0e1207 0%, #1e2908 50%, #b8ff00 100%)',
      accentColor: '#b8ff00',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
    {
      id: 'smartledger',
      title: 'SmartLedger-LK — AI-Driven FinTech Accounting Platform',
      productionNumber: 'PRODUCTION 02',
      category: 'Next.js & FinTech',
      role: 'Full-Stack Developer & AI Specialist',
      image: '/images/projects/smartledger.jpg',
      badge: 'Vercel Deployed • Cloud FinTech Solution',
      description:
        'A modern web-based accounting and ledger platform crafted with Next.js, Node.js, and MongoDB. Leverages Google Gemini AI to analyze transaction records, generate automated financial summaries, and assist with ledger queries.',
      keyContributions: [
        'Built full-stack Next.js web application utilizing server-side rendering for speed and SEO.',
        'Integrated Google Gemini API to analyze ledger entries and generate real-time financial health reports.',
        'Developed robust transaction categorization, double-entry bookkeeping ledgers, and exportable reports.',
        'Deployed production bundle on Vercel with zero downtime continuous delivery pipeline.',
      ],
      tags: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'Google Gemini API', 'Vercel', 'FinTech'],
      gradient: 'linear-gradient(135deg, #081118 0%, #0d2238 50%, #38bdf8 100%)',
      accentColor: '#38bdf8',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
    {
      id: 'inventory-system',
      title: 'Hardware Inventory Management Enterprise System',
      productionNumber: 'PRODUCTION 03',
      category: 'Java & Databases',
      role: 'Backend & Database Engineer (Group Project)',
      image: '/images/projects/inventory.jpg',
      badge: 'SLIATE HNDIT Team Project',
      description:
        'A comprehensive database-driven inventory management desktop application for hardware retail businesses. Built using Java, OOP design patterns, and MySQL relational database to manage stock flow, supplier orders, and billing.',
      keyContributions: [
        'Designed normalized relational database schema in MySQL for fast inventory lookups and low redundancy.',
        'Implemented MVC architecture in Java to separate UI views from transaction processing logic.',
        'Collaborated with a cross-functional team under Agile milestones with thorough integration testing.',
        'Created automated stock alert triggers and generated printable stock audit logs.',
      ],
      tags: ['Java SE', 'MySQL', 'OOP', 'MVC Architecture', 'Relational Database', 'Desktop App'],
      gradient: 'linear-gradient(135deg, #08140e 0%, #102d1d 50%, #34d399 100%)',
      accentColor: '#34d399',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
  ],

  // ── Chapter 04: Craftsmanship & Arsenal ────────────────────────────────────
  skillsMatrix: {
    chapterNum: 'CHAPTER 04',
    title: 'CRAFTSMANSHIP & ARSENAL',
    subtitle: 'TECHNICAL COMPETENCY & SPECIALIZED DISCIPLINES',
    categories: [
      {
        name: 'UI/UX Design & Prototyping',
        icon: 'FiLayout',
        skills: ['Figma Prototyping', 'User Research & Wireframing', 'Design Systems', 'UI/UX Interaction Design', 'Responsive Mobile-First UX', 'Design-to-Code Implementation'],
      },
      {
        name: 'Frontend & Web Engineering',
        icon: 'FiLayout',
        skills: ['React.js 19', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js / WebGL', 'Micro-Animations'],
      },
      {
        name: 'Backend & Cloud Architecture',
        icon: 'FiServer',
        skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'RESTful API Architecture', 'JWT Authentication', 'Vercel Deployment', 'MVC Pattern'],
      },
      {
        name: 'AI Integration & Intelligent Systems',
        icon: 'FiCpu',
        skills: ['Google Gemini API', 'Prompt Engineering', 'AI Chatbot Architecture', 'Financial / E-Commerce AI Workflows', 'LLM Context Management'],
      },
      {
        name: 'Databases & Tooling',
        icon: 'FiDatabase',
        skills: ['MongoDB Atlas', 'MySQL', 'PostgreSQL', 'Git & GitHub', 'Postman API Testing', 'Vite', 'Clean Code & Agile SDLC'],
      },
    ],
  },

  // ── Final Chapter: Contact & Departure ─────────────────────────────────────
  contact: {
    chapterNum: 'FINAL CHAPTER',
    chapterTag: 'CONTACT & DEPARTURE',
    tagline: 'Start The Next Chapter',
    headline: 'Seeking a Full-Stack\nDeveloper or UI/UX Designer?',
    subhead: 'READY TO CONTRIBUTE FROM DAY ONE // KANDY, SRI LANKA // OPEN TO REMOTE & HYBRID',
    description:
      "I am actively looking for an ambitious engineering and design team where I can bring my full-stack engineering, UI/UX design craftsmanship, and Gemini AI expertise to build user-centered, high-performance software products.",
    email: 'udara7355@gmail.com',
    phone: '+94 72 687 0867',
    location: 'Kandy, Sri Lanka (Werellagama, Hedeniya)',
    availability: 'Available for Full-Time / Part-Time Internship Opportunities',
    socials: [
      { name: 'GitHub',    url: 'https://github.com/BOZKO-ai',                     icon: 'FaGithub'     },
      { name: 'LinkedIn',  url: 'https://linkedin.com/in/udara-lakshan-50ab43362',  icon: 'FaLinkedinIn' },
    ],
  },
};
