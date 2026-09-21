import type { CandidateProfile } from '../types/resume';

export const initialProfile: CandidateProfile = {
  id: 'prof-default-001',
  personalInfo: {
    fullName: 'Madhusmita S.',
    email: 'madhusmita.dev@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, Karnataka, India',
    linkedin: 'linkedin.com/in/madhusmita-dev',
    github: 'github.com/madhusmita-code',
    website: 'madhusmita-portfolio.vercel.app',
    targetTitle: 'Java Backend & Full Stack Engineer',
    summary: 'Results-driven Software Engineer with 2+ years of hands-on experience developing enterprise Java microservices, RESTful APIs, and modern React web applications. Proven track record in API reliability, cloud deployment, and clean architectural design.'
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Software Engineer',
      company: 'Enterprise Tech Solutions Ltd.',
      location: 'Bangalore, India',
      startDate: '2024-01',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: [
        'Architected high-throughput RESTful microservices using Java 17, Spring Boot, and PostgreSQL, serving 150K+ active daily requests.',
        'Engineered an API contract schema validation framework, reducing runtime contract mismatch bugs by 38%.',
        'Implemented Redis distributed caching layer, reducing database query latencies from 120ms to under 15ms.',
        'Collaborated with cross-functional teams using Agile methodology, conducting weekly code reviews and maintaining 90%+ unit test coverage with JUnit and Mockito.'
      ],
      keyAchievements: [
        'Awarded Star Developer of the Quarter (Q2 2024) for zero-downtime microservices migration.',
        'Reduced backend deployment pipeline execution time by 45% using Docker containerization.'
      ]
    },
    {
      id: 'exp-2',
      jobTitle: 'Software Engineering Intern',
      company: 'CloudScale Innovations Inc.',
      location: 'Bhubaneswar, India',
      startDate: '2023-05',
      endDate: '2023-12',
      isCurrent: false,
      responsibilities: [
        'Built asynchronous notification microservice using Spring Boot and AWS SQS, delivering real-time alert triggers.',
        'Developed interactive analytics web dashboards using React, TypeScript, and Tailwind CSS for cloud monitoring.',
        'Optimized complex SQL join queries and database indexes, improving report generation performance by 30%.'
      ],
      keyAchievements: [
        'Automated database seeding scripts, saving 8 developer hours per sprint.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Odisha University of Technology and Research',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'Bhubaneswar, India',
      startDate: '2020-08',
      endDate: '2024-05',
      gpa: '8.9 / 10.0'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'API Reliability & Contract Validation Platform',
      description: 'Automated API schema contract auditor and SLA health dashboard designed for enterprise microservices.',
      techStack: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'React', 'Docker'],
      githubUrl: 'github.com/madhusmita-code/api-reliability-platform',
      liveUrl: 'api-reliability.demo.com',
      highlights: [
        'Built dynamic OpenAPI JSON schema diff comparator detecting breaking API contract changes in real-time.',
        'Implemented Prometheus metric collection and WebSockets live dashboard streaming for 99.99% uptime tracking.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Women Safety Emergency Alert Engine',
      description: 'Cross-platform emergency response system with real-time GPS tracking and instant multi-channel SOS alerts.',
      techStack: ['Java', 'Android SDK', 'SQLite', 'GPS API', 'SMS Gateway'],
      githubUrl: 'github.com/madhusmita-code/women-safety-app',
      highlights: [
        'Designed offline-first background location logging with low-latency SMS fallback during connection outages.',
        'Implemented interactive canvas map visualizer rendering dynamic emergency safe-zones.'
      ]
    },
    {
      id: 'proj-3',
      title: 'Atmosphere ATM Banking Interface & Audit Vault',
      description: 'Thread-safe ATM simulator supporting multi-account transactions, PIN security, and XML audit logging.',
      techStack: ['Java Core', 'Multithreading', 'XML Parser', 'JUnit 5'],
      githubUrl: 'github.com/madhusmita-code/atm-interface',
      highlights: [
        'Engineered concurrency lock mechanisms preventing race conditions during simultaneous deposit/withdrawal operations.',
        'Achieved 95% test coverage through automated unit tests and mock banking gateway integrations.'
      ]
    },
    {
      id: 'proj-4',
      title: 'College Resource Sharing & Peer Notes Portal',
      description: 'Full-stack platform enabling university students to share, search, and rate academic documentation.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'github.com/madhusmita-code/college-resource-portal',
      highlights: [
        'Integrated fuzzy full-text search engine across 5,000+ uploaded PDF lecture documents.',
        'Built role-based moderation system allowing verified campus representatives to validate notes.'
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Java 17', category: 'Languages', proficiency: 5 },
    { id: 'sk-2', name: 'JavaScript / TypeScript', category: 'Languages', proficiency: 4 },
    { id: 'sk-3', name: 'SQL', category: 'Languages', proficiency: 5 },
    { id: 'sk-4', name: 'HTML5 / CSS3', category: 'Languages', proficiency: 4 },
    { id: 'sk-5', name: 'Spring Boot', category: 'Frameworks', proficiency: 5 },
    { id: 'sk-6', name: 'Spring Security', category: 'Frameworks', proficiency: 4 },
    { id: 'sk-7', name: 'Hibernate / JPA', category: 'Frameworks', proficiency: 4 },
    { id: 'sk-8', name: 'React.js', category: 'Frameworks', proficiency: 4 },
    { id: 'sk-9', name: 'Express / Node.js', category: 'Frameworks', proficiency: 3 },
    { id: 'sk-10', name: 'PostgreSQL', category: 'Databases', proficiency: 5 },
    { id: 'sk-11', name: 'MySQL', category: 'Databases', proficiency: 4 },
    { id: 'sk-12', name: 'Redis', category: 'Databases', proficiency: 4 },
    { id: 'sk-13', name: 'Docker', category: 'Cloud & DevOps', proficiency: 4 },
    { id: 'sk-14', name: 'AWS (EC2, S3, SQS)', category: 'Cloud & DevOps', proficiency: 3 },
    { id: 'sk-15', name: 'Git & GitHub Actions', category: 'Cloud & DevOps', proficiency: 5 },
    { id: 'sk-16', name: 'RESTful API Architecture', category: 'Concepts', proficiency: 5 },
    { id: 'sk-17', name: 'Microservices', category: 'Concepts', proficiency: 4 },
    { id: 'sk-18', name: 'System Design & OOP', category: 'Concepts', proficiency: 4 },
    { id: 'sk-19', name: 'Postman', category: 'Tools', proficiency: 5 },
    { id: 'sk-20', name: 'IntelliJ IDEA & VS Code', category: 'Tools', proficiency: 5 },
    { id: 'sk-21', name: 'Maven', category: 'Tools', proficiency: 4 },
    { id: 'sk-22', name: 'Agile & Code Reviews', category: 'Soft Skills', proficiency: 5 }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2024-03',
      credentialId: 'AWS-DEV-998822'
    },
    {
      id: 'cert-2',
      title: 'Oracle Certified Professional: Java SE 17 Developer',
      issuer: 'Oracle Corporation',
      date: '2023-11',
      credentialId: 'OCP-JAVA-774411'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Finalist - National Cloud & API Security Hackathon 2023',
      description: 'Built automated OpenAPI contract compliance engine out of 250+ competing university teams.'
    },
    {
      id: 'ach-2',
      title: 'LeetCode & HackerRank DSA Specialist',
      description: 'Solved 450+ Data Structures and Algorithm problems with 5-star Java rating.'
    }
  ],
  languages: ['English (Fluent)', 'Hindi (Native)', 'Odia (Native)'],
  dsaProfiles: ['LeetCode: @madhusmita_code', 'HackerRank: @madhu_java']
};
