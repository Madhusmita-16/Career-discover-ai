import type { JobListing, JobFilterState, CandidateProfile } from '../types/resume';

export const mockJobListings: JobListing[] = [
  {
    id: 'job-1',
    title: 'Software Engineer - Java Backend',
    company: 'TechCorp India',
    location: 'Bangalore',
    workMode: 'Hybrid',
    experienceMin: 0,
    experienceMax: 2,
    salaryRange: '₹8 - 14 LPA',
    skills: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'Docker'],
    requiredSkills: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL'],
    preferredSkills: ['Docker', 'AWS', 'Microservices'],
    education: ['B.Tech', 'B.E.', 'MCA'],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'greenhouse',
    url: 'https://boards.greenhouse.io/techcorp/jobs/48201',
    description: 'We are seeking a high-performing Software Engineer to join our core backend engineering group. You will build resilient microservices using Java 17 and Spring Boot.',
    applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'job-2',
    title: 'Full Stack Engineer (React + Spring)',
    company: 'CloudSphere',
    location: 'Remote',
    workMode: 'Remote',
    experienceMin: 0,
    experienceMax: 2,
    salaryRange: '₹10 - 18 LPA',
    skills: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Tailwind CSS', 'SQL'],
    requiredSkills: ['Java', 'React', 'Spring Boot', 'TypeScript'],
    preferredSkills: ['PostgreSQL', 'AWS', 'GraphQL'],
    education: ['B.Tech', 'B.Sc Computer Science'],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'lever',
    url: 'https://jobs.lever.co/cloudsphere/7721-fullstack',
    description: 'CloudSphere is building next-gen SaaS tools. Looking for a full stack engineer with expertise in React frontend and Spring Boot microservices.'
  },
  {
    id: 'job-3',
    title: 'AI Application Developer',
    company: 'NexusAI Labs',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    experienceMin: 1,
    experienceMax: 3,
    salaryRange: '₹12 - 20 LPA',
    skills: ['Python', 'FastAPI', 'LangChain', 'React', 'RAG', 'VectorDB'],
    requiredSkills: ['Python', 'FastAPI', 'React'],
    preferredSkills: ['LangChain', 'PostgreSQL', 'Docker', 'AWS'],
    education: ['B.Tech', 'M.Tech'],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'company_career_page',
    url: 'https://nexusai.io/careers/ai-dev',
    description: 'Build enterprise LLM workflows, RAG agents, and intelligent chatbots with Python, FastAPI, and React.'
  },
  {
    id: 'job-4',
    title: 'Junior DevOps & Cloud Engineer',
    company: 'InfraScale',
    location: 'Pune',
    workMode: 'On-site',
    experienceMin: 0,
    experienceMax: 1,
    salaryRange: '₹7 - 11 LPA',
    skills: ['Docker', 'AWS', 'Linux', 'Python', 'Git', 'CI/CD'],
    requiredSkills: ['Docker', 'AWS', 'Linux'],
    preferredSkills: ['Kubernetes', 'Terraform', 'Bash'],
    education: ['B.Tech', 'BCA', 'MCA'],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'authorized_api',
    url: 'https://infrascale.com/jobs/devops-jr',
    description: 'Deploy cloud infrastructure, configure CI/CD pipelines on AWS, and manage Docker container deployments.'
  },
  {
    id: 'job-5',
    title: 'Backend Developer - Node.js / Java',
    company: 'DataPulse',
    location: 'Bhubaneswar',
    workMode: 'Hybrid',
    experienceMin: 0,
    experienceMax: 2,
    salaryRange: '₹6 - 10 LPA',
    skills: ['Java', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    requiredSkills: ['Java', 'REST API', 'SQL'],
    preferredSkills: ['Node.js', 'Docker'],
    education: ['B.Tech', 'B.E.'],
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'company_career_page',
    url: 'https://datapulse.in/careers/backend',
    description: 'Design efficient API endpoints and handle relational database queries for enterprise web applications.'
  }
];

export function filterJobs(jobs: JobListing[], filters: JobFilterState): JobListing[] {
  return jobs.filter(job => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    if (filters.location && filters.location !== 'all') {
      if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }

    if (filters.workMode && filters.workMode !== 'all') {
      if (job.workMode !== filters.workMode) return false;
    }

    if (filters.experience && filters.experience !== 'all') {
      if (filters.experience === '0-1' && job.experienceMin > 1) return false;
      if (filters.experience === '1-2' && (job.experienceMin > 2 || job.experienceMax < 1)) return false;
      if (filters.experience === '2-3' && (job.experienceMin > 3 || job.experienceMax < 2)) return false;
      if (filters.experience === '3-5' && job.experienceMin > 5) return false;
    }

    if (filters.jobAge && filters.jobAge !== 'all') {
      const ageDays = (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24);
      if (ageDays > parseInt(filters.jobAge, 10)) return false;
    }

    if (filters.skills.length > 0) {
      const hasSkillMatch = filters.skills.some(s => 
        job.skills.some(js => js.toLowerCase() === s.toLowerCase())
      );
      if (!hasSkillMatch) return false;
    }

    return true;
  });
}

export function calculateJobMatch(job: JobListing, profile: CandidateProfile): number {
  const userSkills = profile.skills.map(s => s.name.toLowerCase());
  if (!userSkills.length || !job.requiredSkills.length) return 70;

  let matchedReq = 0;
  job.requiredSkills.forEach(req => {
    if (userSkills.some(us => us.includes(req.toLowerCase()) || req.toLowerCase().includes(us))) {
      matchedReq += 1;
    }
  });

  const reqScore = (matchedReq / job.requiredSkills.length) * 70;
  
  let matchedPref = 0;
  if (job.preferredSkills.length) {
    job.preferredSkills.forEach(pref => {
      if (userSkills.some(us => us.includes(pref.toLowerCase()))) matchedPref += 1;
    });
  }
  const prefScore = job.preferredSkills.length ? (matchedPref / job.preferredSkills.length) * 30 : 20;

  return Math.min(98, Math.max(50, Math.round(reqScore + prefScore)));
}
