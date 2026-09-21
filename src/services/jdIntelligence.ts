import type { JobDescriptionData, CategorizedKeywords } from '../types/resume';

const DICTIONARY = {
  languages: [
    'java', 'java 17', 'javascript', 'typescript', 'python', 'sql', 'c++', 'c#', 'go', 'golang',
    'html', 'html5', 'css', 'css3', 'bash', 'shell'
  ],
  frameworks: [
    'spring boot', 'spring security', 'spring cloud', 'spring mvc', 'hibernate', 'jpa',
    'react', 'react.js', 'reactjs', 'node.js', 'nodejs', 'express', 'express.js', 'next.js',
    'vue', 'angular', 'django', 'flask', 'tailwind', 'bootstrap'
  ],
  architecture: [
    'microservices', 'microservices architecture', 'monolith', 'event-driven',
    'serverless', 'system design', 'distributed systems', 'oop', 'solid principles',
    'mvc', 'pub/sub', 'rest api', 'restful apis', 'graphql', 'websockets'
  ],
  apis: [
    'rest api', 'restful api', 'restful apis', 'json', 'openapi', 'swagger', 'jwt', 'oauth2',
    'grpc', 'soap', 'postman'
  ],
  tools: [
    'docker', 'kubernetes', 'aws', 'ec2', 's3', 'sqs', 'sns', 'lambda', 'gcp', 'azure',
    'git', 'github', 'github actions', 'jenkins', 'ci/cd', 'maven', 'gradle', 'junit', 'mockito',
    'jira', 'confluence', 'prometheus', 'grafana'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'redis', 'mongodb', 'sqlite', 'oracle', 'dynamodb'
  ],
  actionVerbs: [
    'develop', 'architect', 'design', 'build', 'implement', 'optimize', 'engineer',
    'deploy', 'maintain', 'integrate', 'collaborate', 'lead', 'refactor', 'test',
    'automate', 'scale', 'enhance', 'conduct'
  ],
  softSkills: [
    'agile', 'scrum', 'problem-solving', 'communication', 'teamwork', 'collaboration',
    'code review', 'analytical skills', 'critical thinking', 'leadership', 'time management'
  ]
};

export function cleanJDText(text: string): string {
  if (!text) return '';
  // Strip HTML tags if present
  let cleaned = text.replace(/<[^>]*>?/gm, ' ');
  // Strip duplicate whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

export function extractJobInformation(jdText: string): {
  jobTitle: string;
  companyName: string;
  experienceRequired: string;
} {
  const clean = cleanJDText(jdText);
  
  // Extract Job Title
  let jobTitle = 'Software Engineer';
  const titleMatch = clean.match(/(?:Job Title|Role|Position)\s*:\s*([^\n\r.]+)/i) ||
                     clean.match(/(Senior Java Backend Engineer|Full Stack Engineer|Java Developer|React Developer|Software Development Engineer|SDE \d|Backend Developer|Software Engineer)/i);
  if (titleMatch) {
    jobTitle = titleMatch[1].trim();
  }

  // Extract Company
  let companyName = 'Target Employer';
  const companyMatch = clean.match(/(?:Company|At|Join)\s*:\s*([^\n\r.]+)/i);
  if (companyMatch) {
    companyName = companyMatch[1].trim();
  }

  // Extract Experience
  let experienceRequired = '0-3 years';
  const expMatch = clean.match(/(\d+[-–]\d+\s*(?:years?|yrs?))/i) || clean.match(/(\d+\+\s*(?:years?|yrs?))/i);
  if (expMatch) {
    experienceRequired = expMatch[1].trim();
  }

  return { jobTitle, companyName, experienceRequired };
}

function safeMatchKeyword(text: string, keyword: string): boolean {
  if (!keyword || !text) return false;
  if (keyword === 'c++' || keyword === 'c#') {
    const escaped = keyword.replace(/\+/g, '\\+').replace(/#/g, '\\#');
    try {
      const regex = new RegExp(`(?:^|\\s|\\/|,|\\()${escaped}(?:$|\\s|\\/|,|\\)|\\.)`, 'i');
      return regex.test(text) || text.includes(keyword);
    } catch {
      return text.includes(keyword);
    }
  }
  
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  } catch {
    return text.includes(keyword);
  }
}

export function extractCategorizedKeywords(jdText: string): CategorizedKeywords {
  const textLower = (jdText || '').toLowerCase();

  const findMatches = (list: string[]) => {
    return list.filter(item => safeMatchKeyword(textLower, item)).map(word => {
      // Capitalize properly
      if (word === 'java 17') return 'Java 17';
      if (word === 'spring boot') return 'Spring Boot';
      if (word === 'react' || word === 'react.js' || word === 'reactjs') return 'React.js';
      if (word === 'rest api' || word === 'restful apis' || word === 'restful api') return 'RESTful APIs';
      if (word === 'postgresql' || word === 'postgres') return 'PostgreSQL';
      if (word === 'node.js' || word === 'nodejs') return 'Node.js';
      if (word === 'aws') return 'AWS';
      if (word === 'docker') return 'Docker';
      if (word === 'sql') return 'SQL';
      if (word === 'c++') return 'C++';
      if (word === 'c#') return 'C#';
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  };

  const languages = Array.from(new Set(findMatches(DICTIONARY.languages)));
  const frameworks = Array.from(new Set(findMatches(DICTIONARY.frameworks)));
  const architecture = Array.from(new Set(findMatches(DICTIONARY.architecture)));
  const apis = Array.from(new Set(findMatches(DICTIONARY.apis)));
  const tools = Array.from(new Set([...findMatches(DICTIONARY.tools), ...findMatches(DICTIONARY.databases)]));
  const actionVerbs = Array.from(new Set(findMatches(DICTIONARY.actionVerbs)));
  const softSkills = Array.from(new Set(findMatches(DICTIONARY.softSkills)));
  
  // Extract domain specific keywords
  const domainTerms = ['Backend Systems', 'Cloud Infrastructure', 'API Reliability', 'Data Modeling', 'Enterprise Security']
    .filter(term => textLower.includes(term.toLowerCase()) || languages.length > 0);

  return {
    languages,
    frameworks,
    architecture,
    apis,
    tools,
    actionVerbs,
    domainTerms,
    softSkills
  };
}

export function extractResponsibilitiesAndQualifications(jdText: string): {
  responsibilities: string[];
  qualifications: string[];
} {
  const lines = (jdText || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const responsibilities: string[] = [];
  const qualifications: string[] = [];

  let mode: 'none' | 'resp' | 'qual' = 'none';

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (lower.includes('responsibilities') || lower.includes('what you will do') || lower.includes('role overview')) {
      mode = 'resp';
      return;
    }
    if (lower.includes('qualifications') || lower.includes('requirements') || lower.includes('what we look for') || lower.includes('skills required')) {
      mode = 'qual';
      return;
    }

    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*') || /^\d+\./.test(line)) {
      const bullet = line.replace(/^[-•*\d.]+\s*/, '').trim();
      if (bullet.length > 10) {
        if (mode === 'resp') responsibilities.push(bullet);
        else if (mode === 'qual') qualifications.push(bullet);
        else responsibilities.push(bullet); // fallback
      }
    }
  });

  return {
    responsibilities: responsibilities.length > 0 ? responsibilities : [
      'Design and maintain scalable microservices and RESTful API endpoints.',
      'Optimize database queries and implement distributed caching mechanisms.',
      'Collaborate with team members using Agile practices and conduct code reviews.'
    ],
    qualifications: qualifications.length > 0 ? qualifications : [
      'Bachelor degree in Computer Science, IT, or related technical field.',
      '1+ years of experience with Java, Spring Boot, and SQL databases.',
      'Strong understanding of software design patterns and version control (Git).'
    ]
  };
}

export function parseJobDescription(rawText: string, customTitle?: string): JobDescriptionData {
  const cleanText = cleanJDText(rawText);
  const extractedInfo = extractJobInformation(cleanText);
  const extractedKeywords = extractCategorizedKeywords(cleanText);
  const { responsibilities, qualifications } = extractResponsibilitiesAndQualifications(cleanText);

  return {
    id: `jd-${Date.now()}`,
    jobTitle: customTitle || extractedInfo.jobTitle,
    companyName: extractedInfo.companyName,
    experienceRequired: extractedInfo.experienceRequired,
    rawText,
    cleanText,
    extractedKeywords,
    responsibilities,
    qualifications
  };
}
