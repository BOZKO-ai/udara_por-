export const portfolioData = {
  brand: {
    name: 'UDARA LAKSHAN',
    codeSymbol: '</>'
  },

  navLinks: [
    { label: 'Home',           href: '#hero',           icon: 'FiHome' },
    { label: 'About',          href: '#about',          icon: 'FiUser' },
    { label: 'Tech Stack',     href: '#tech-stack',     icon: 'FiCpu' },
    { label: 'Certifications', href: '#certifications', icon: 'FiAward' },
    { label: 'Portfolio',      href: '#portfolio',      icon: 'FiLayers' },
    { label: 'Contact',        href: '#contact',        icon: 'FiMail' },
  ],

  hero: {
    titlePrefix: "I'm Udara, a",
    titleSuffix: 'Full-Stack Developer',
    description:
      'Full-stack developer with an HND in Information Technology (GPA 3.67 / 4.0) who builds and deploys complete web applications with React.js, Next.js, Node.js, Spring Boot and MongoDB / MySQL. Integrating Google Gemini API to deliver AI-powered solutions.',
  },

  aboutMe: {
    title: 'ABOUT ME',
    description:
      'HNDIT candidate at SLIATE Kandy with 3.67 GPA. Experienced in developing full-stack MERN & Spring Boot platforms with Google Gemini AI integration.',
    linkText: 'MORE ABOUT ME →',
    href: '#about',
  },

  myWork: {
    title: 'FEATURED WORK',
    description:
      'Explore AI-powered e-commerce (Shopease), Next.js accounting (SmartLedger-LK), and Java inventory systems.',
    linkText: 'EXPLORE PROJECTS →',
    href: '#portfolio',
  },

  followMe: {
    title: 'CONNECT',
    socials: [
      { name: 'GitHub',    url: 'https://github.com/BOZKO-ai',                    icon: 'FaGithub'     },
      { name: 'LinkedIn',  url: 'https://linkedin.com/in/udara-lakshan-50ab43362', icon: 'FaLinkedinIn' },
    ],
  },

  // ── Tech Stack for Continuous Marquee ──────────────────────────────────────
  techStack: [
    { name: 'React.js',          category: 'Frontend',   color: '#61DAFB' },
    { name: 'Next.js',           category: 'Full-Stack', color: '#FFFFFF' },
    { name: 'Google Gemini AI',  category: 'AI & ML',    color: '#00F2FE' },
    { name: 'Node.js',           category: 'Backend',    color: '#68A063' },
    { name: 'Express.js',        category: 'Backend',    color: '#E0E0E0' },
    { name: 'Java',              category: 'Backend',    color: '#E76F00' },
    { name: 'Spring Boot',       category: 'Backend',    color: '#6DB33F' },
    { name: 'JavaScript (ES6+)', category: 'Language',   color: '#F7DF1E' },
    { name: 'TypeScript',        category: 'Language',   color: '#3178C6' },
    { name: 'MongoDB',           category: 'Database',   color: '#47A248' },
    { name: 'MySQL',             category: 'Database',   color: '#4479A1' },
    { name: 'Tailwind CSS',      category: 'Styling',    color: '#38BDF8' },
    { name: 'Three.js',          category: '3D Graphics',color: '#00F2FE' },
    { name: 'Git & GitHub',      category: 'DevOps',     color: '#F05032' },
    { name: 'Postman',           category: 'API Testing',color: '#FF6C37' },
    { name: 'Vercel',            category: 'Deployment', color: '#FFFFFF' },
  ],

  // ── About ───────────────────────────────────────────────────────────────────
  about: {
    tagline: 'About Me',
    headline: 'Building Intelligent\nFull-Stack Software',
    bio: [
      "I am an enthusiastic Full-Stack Developer currently reading for my Higher National Diploma in Information Technology (HNDIT) at the Sri Lanka Advanced Technological Institute (SLIATE), Kandy, maintaining a 3.67 / 4.0 GPA.",
      "I build and deploy complete, robust web applications using React.js, Next.js, Node.js, Spring Boot, and MongoDB / MySQL. I have integrated the Google Gemini API into multiple projects to deliver AI-driven features like automated customer assistants and intelligent financial insights.",
      "I am actively seeking a Full-Stack Developer Intern role where I can grow my skills and contribute to real-world, high-impact software products.",
    ],
    education: {
      degree: 'Higher National Diploma in Information Technology (HNDIT)',
      institution: 'Sri Lanka Advanced Technological Institute (SLIATE), Kandy',
      period: '2024 – 2026',
      gpa: 'GPA: 3.67 / 4.0',
    },
    skills: [
      { label: 'React.js & Next.js',            level: 90 },
      { label: 'Node.js & Express.js',          level: 86 },
      { label: 'Google Gemini API Integration', level: 88 },
      { label: 'Java & Spring Boot',            level: 80 },
      { label: 'MongoDB & MySQL / PostgreSQL',  level: 84 },
      { label: 'Tailwind CSS & UI/UX Design',   level: 85 },
      { label: 'Git, GitHub, Vercel & Postman', level: 85 },
    ],
    softSkills: [
      'Teamwork & Collaboration',
      'Leadership',
      'Effective Communication',
      'Problem Solving',
      'Critical Thinking',
      'Agile / SDLC'
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Sinhala', level: 'Native / Fluent' }
    ],
    stats: [
      { value: '3.67', label: 'SLIATE GPA' },
      { value: '3+',   label: 'Completed Projects' },
      { value: 'AI',   label: 'Gemini Integration' },
      { value: '2026', label: 'HNDIT Graduate' },
    ],
    cta: {
      label: 'Download CV (PDF)',
      href: '/Udara_Lakshan_CV.pdf',
      download: true,
    },
  },

  // ── Certifications & Credentials ──────────────────────────────────────────
  certifications: [
    {
      id: 'cert-1',
      title: 'Generative AI & Google Gemini API Integration',
      issuer: 'Google Cloud & AI Communities',
      issueDate: '2024',
      badge: 'AI & Machine Learning',
      status: 'Verified Credential',
      skills: ['Google Gemini API', 'Prompt Engineering', 'AI Chatbots', 'LLM Integration'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#00f2fe',
    },
    {
      id: 'cert-2',
      title: 'Higher National Diploma in Information Technology (HNDIT)',
      issuer: 'SLIATE (Sri Lanka Advanced Technological Institute)',
      issueDate: '2024 – 2026',
      badge: 'Academic Distinction • GPA 3.67',
      status: 'Academic Qualification',
      skills: ['Software Engineering', 'Data Structures', 'OOP in Java', 'Relational Databases', 'Web Development'],
      link: '#about',
      accentColor: '#0a63ff',
    },
    {
      id: 'cert-3',
      title: 'Full-Stack Web Development (MERN Stack)',
      issuer: 'Advanced Web Engineering Certificate',
      issueDate: '2024',
      badge: 'Full-Stack Specialization',
      status: 'Verified Credential',
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#38ef7d',
    },
    {
      id: 'cert-4',
      title: 'Java Enterprise & Spring Boot Development',
      issuer: 'Java Software Development Certification',
      issueDate: '2024',
      badge: 'Backend Architecture',
      status: 'Verified Credential',
      skills: ['Java SE / EE', 'Spring Boot', 'MVC Pattern', 'MySQL', 'Hibernate / JPA'],
      link: 'https://github.com/BOZKO-ai',
      accentColor: '#f59e0b',
    },
  ],

  // ── Portfolio / Projects ──────────────────────────────────────────────────────
  projects: [
    {
      id: 'shopease',
      title: 'Shopease – AI-Powered E-Commerce',
      category: 'MERN & AI',
      image: '/images/projects/shopease.jpg',
      description:
        'HNDIT Final Project: Full-stack e-commerce platform built with React.js, Node.js, and MongoDB. Integrated Google Gemini API for personalized product recommendations and an automated customer assistant.',
      tags: ['React.js', 'Node.js', 'MongoDB', 'Supabase', 'Tailwind CSS', 'Google Gemini API'],
      gradient: 'linear-gradient(135deg, #0a63ff 0%, #4facfe 100%)',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
    {
      id: 'smartledger',
      title: 'SmartLedger-LK – AI Accounting Platform',
      category: 'Next.js & FinTech',
      image: '/images/projects/smartledger.jpg',
      description:
        'Web-based accounting platform for transaction tracking and financial record management. Integrated Google Gemini API for AI-assisted accounting support and automated financial insights; deployed on Vercel.',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Google Gemini API', 'Vercel'],
      gradient: 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
    {
      id: 'inventory-system',
      title: 'Hardware Inventory Management System',
      category: 'Java & Databases',
      image: '/images/projects/inventory.jpg',
      description:
        'Database-driven system to manage stock, suppliers, and inventory records. Designed database and built desktop software using Java and MySQL through collaborative team development and testing.',
      tags: ['Java', 'MySQL', 'OOP', 'MVC Architecture', 'Database Design'],
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      link: 'https://github.com/BOZKO-ai',
      repo: 'https://github.com/BOZKO-ai',
    },
  ],

  // ── Contact ───────────────────────────────────────────────────────────────────
  contact: {
    tagline: "Let's Connect",
    headline: 'Looking for an Intern\nFull-Stack Developer?',
    description:
      "I'm eager to join an innovative team as a Full-Stack Developer Intern. Whether you have an open position, a collaboration opportunity, or just want to discuss software and AI, feel free to reach out!",
    email: 'udara7355@gmail.com',
    phone: '+94 72 687 0867',
    location: 'Kandy, Sri Lanka (Werellagama, Hedeniya)',
    socials: [
      { name: 'GitHub',    url: 'https://github.com/BOZKO-ai',                    icon: 'FaGithub'     },
      { name: 'LinkedIn',  url: 'https://linkedin.com/in/udara-lakshan-50ab43362', icon: 'FaLinkedinIn' },
    ],
  },
};
