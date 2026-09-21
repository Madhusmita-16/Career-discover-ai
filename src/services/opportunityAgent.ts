import type { OpportunityEvent } from '../types/resume';

export const mockOpportunities: OpportunityEvent[] = [
  {
    id: 'opp-1',
    title: 'Smart India Hackathon 2026',
    organizer: 'Ministry of Education & AICTE',
    category: 'hackathon',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bangalore / Nationwide',
    workMode: 'Hybrid',
    prize: '₹1,00,000 Cash Prize',
    eligibility: 'Engineering & College Students (B.Tech, MCA)',
    skills: ['Java', 'Spring Boot', 'React', 'AI/ML', 'IoT'],
    url: 'https://sih.gov.in',
    isRegistered: false
  },
  {
    id: 'opp-2',
    title: 'AWS Community Day India',
    organizer: 'AWS User Group India',
    category: 'conference',
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bangalore',
    workMode: 'On-site',
    prize: 'Free Certification Vouchers + Networking',
    eligibility: 'Open to all developers and students',
    skills: ['AWS', 'Cloud', 'Serverless', 'Docker'],
    url: 'https://awscommunity.day/india',
    isRegistered: true
  },
  {
    id: 'opp-3',
    title: 'Google AI Agentic Developer Hackathon',
    organizer: 'Google Cloud Developer Community',
    category: 'hackathon',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Remote',
    workMode: 'Remote',
    prize: '$10,000 Cloud Credits + Swag',
    eligibility: 'Global developers and students',
    skills: ['Python', 'LLM', 'RAG', 'FastAPI', 'React'],
    url: 'https://devpost.com/hackathons/google-ai-agents',
    isRegistered: false
  },
  {
    id: 'opp-4',
    title: 'Java Developer National hiring Sprint',
    organizer: 'TechHire Network',
    category: 'hiring_event',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Remote / Bangalore',
    workMode: 'Remote',
    prize: 'Direct Interview Rounds with 15+ Tech Firms',
    eligibility: '0-3 years experience, B.Tech / MCA',
    skills: ['Java', 'Spring Boot', 'SQL', 'Data Structures'],
    url: 'https://techhire.in/events/java-sprint',
    isRegistered: true
  }
];

export function getRemainingDays(deadlineStr: string): number {
  const diff = new Date(deadlineStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
