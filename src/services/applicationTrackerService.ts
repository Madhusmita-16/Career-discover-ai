import type { ApplicationItem, ApplicationStatus } from '../types/resume';

const STORAGE_KEY = 'careeros_applications';

export const initialApplications: ApplicationItem[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Software Engineer - Java Backend',
    company: 'TechCorp India',
    location: 'Bangalore',
    status: 'interview',
    dateSaved: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    dateApplied: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    dateUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    resumeVersionId: 'v-java-backend',
    notes: 'Round 1 Technical Interview scheduled for tomorrow.',
    interviewDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 94
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Full Stack Engineer (React + Spring)',
    company: 'CloudSphere',
    location: 'Remote',
    status: 'applied',
    dateSaved: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    dateApplied: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    dateUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    resumeVersionId: 'v-fullstack',
    matchScore: 88
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'AI Application Developer',
    company: 'NexusAI Labs',
    location: 'Hyderabad',
    status: 'ready',
    dateSaved: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dateUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resumeVersionId: 'v-ai-dev',
    matchScore: 91
  },
  {
    id: 'app-4',
    jobId: 'job-5',
    jobTitle: 'Backend Developer',
    company: 'DataPulse',
    location: 'Bhubaneswar',
    status: 'offer',
    dateSaved: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    dateApplied: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    dateUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    salaryOffered: '₹9.5 LPA',
    matchScore: 96
  },
  {
    id: 'app-5',
    jobId: 'job-4',
    jobTitle: 'Junior DevOps Engineer',
    company: 'InfraScale',
    location: 'Pune',
    status: 'saved',
    dateSaved: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dateUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 78
  }
];

export function getStoredApplications(): ApplicationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load applications', e);
  }
  return initialApplications;
}

export function saveStoredApplications(apps: ApplicationItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (e) {
    console.error('Failed to save applications', e);
  }
}

export function updateApplicationStatus(appId: string, status: ApplicationStatus): ApplicationItem[] {
  const current = getStoredApplications();
  const updated = current.map(a => {
    if (a.id === appId) {
      return {
        ...a,
        status,
        dateUpdated: new Date().toISOString(),
        dateApplied: status === 'applied' && !a.dateApplied ? new Date().toISOString() : a.dateApplied
      };
    }
    return a;
  });
  saveStoredApplications(updated);
  return updated;
}

export function getApplicationStats(apps: ApplicationItem[]) {
  const total = apps.length;
  const applied = apps.filter(a => ['applied', 'assessment', 'interview', 'final', 'offer'].includes(a.status)).length;
  const interviews = apps.filter(a => ['interview', 'final'].includes(a.status)).length;
  const offers = apps.filter(a => a.status === 'offer').length;
  const responseRate = applied > 0 ? Math.round(((interviews + offers) / applied) * 100) : 0;

  return {
    total,
    applied,
    interviews,
    offers,
    responseRate
  };
}
