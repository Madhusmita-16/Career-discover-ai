import type { CandidateProfile, JobDescriptionData, MatchAnalysis, SkillMatchResult, SkillCategory, Project } from '../types/resume';

const RELATED_SKILLS_MAP: Record<string, string[]> = {
  'Spring Boot': ['Spring Security', 'Spring MVC', 'Java', 'Microservices'],
  'React.js': ['JavaScript', 'TypeScript', 'HTML5 / CSS3', 'Next.js'],
  'PostgreSQL': ['SQL', 'MySQL', 'Relational Databases', 'Database Design'],
  'Docker': ['Containerization', 'Kubernetes', 'CI/CD', 'AWS'],
  'AWS': ['Cloud Platforms', 'EC2', 'S3', 'Cloud Infrastructure'],
  'RESTful APIs': ['Web Services', 'API Design', 'JSON', 'Postman'],
  'Microservices': ['System Design', 'Distributed Systems', 'RESTful APIs']
};

export function analyzeMatch(profile: CandidateProfile, jd: JobDescriptionData): MatchAnalysis {
  const profileSkills = profile?.skills || [];
  const profileProjects = profile?.projects || [];

  const profileSkillNames = profileSkills.map(s => (s?.name || '').toLowerCase());
  const profileTechStackInProjects = profileProjects.flatMap(p => (p?.techStack || []).map(t => t.toLowerCase()));
  const allProfileTech = Array.from(new Set([...profileSkillNames, ...profileTechStackInProjects]));

  const extracted = jd?.extractedKeywords;
  const jdKeywords = [
    ...(extracted?.languages || []),
    ...(extracted?.frameworks || []),
    ...(extracted?.architecture || []),
    ...(extracted?.apis || []),
    ...(extracted?.tools || [])
  ];

  const uniqueJdKeywords = Array.from(new Set(jdKeywords));

  const skillMatches: SkillMatchResult[] = [];
  let matchedCount = 0;
  let transferableCount = 0;
  let missingCount = 0;
  const missingSkills: string[] = [];

  uniqueJdKeywords.forEach(req => {
    if (!req) return;
    const reqLower = req.toLowerCase();
    
    // Direct match
    const isDirectMatch = allProfileTech.some(tech => tech.includes(reqLower) || reqLower.includes(tech));

    if (isDirectMatch) {
      matchedCount++;
      skillMatches.push({
        skillName: req,
        category: getCategoryForSkill(req),
        status: 'matched',
        matchedWith: req,
        note: 'Direct skill match verified in profile'
      });
      return;
    }

    // Transferable match
    let transferableMatch: string | undefined = undefined;
    for (const [key, related] of Object.entries(RELATED_SKILLS_MAP)) {
      if (key.toLowerCase() === reqLower || related.some(r => r.toLowerCase() === reqLower)) {
        const found = allProfileTech.find(t => t.includes(key.toLowerCase()) || related.some(r => t.includes(r.toLowerCase())));
        if (found) {
          transferableMatch = found;
          break;
        }
      }
    }

    if (transferableMatch) {
      transferableCount++;
      skillMatches.push({
        skillName: req,
        category: getCategoryForSkill(req),
        status: 'transferable',
        matchedWith: transferableMatch,
        note: `Transferable skill matched via candidate experience in ${transferableMatch}`
      });
    } else {
      missingCount++;
      missingSkills.push(req);
      skillMatches.push({
        skillName: req,
        category: getCategoryForSkill(req),
        status: 'missing',
        note: 'Not listed in candidate profile. Highlighted in Gap Analysis for learning.'
      });
    }
  });

  const totalRequirements = uniqueJdKeywords.length || 1;
  const matchPercentage = Math.round(((matchedCount + (transferableCount * 0.5)) / totalRequirements) * 100);

  // Rank candidate projects by tech stack overlap with JD
  const selectedProjectIds = rankProjects(profileProjects, jd);

  // Key recommendations
  const keyRecommendations: string[] = [];
  if (missingSkills.length > 0) {
    keyRecommendations.push(`Target JD requests skills (${missingSkills.slice(0, 3).join(', ')}) not found in your profile. Review Gap Analysis.`);
  }
  if (matchedCount > 0) {
    keyRecommendations.push(`Emphasized ${matchedCount} verified core skills matching the target ${jd?.jobTitle || 'Software Engineer'} position.`);
  }
  keyRecommendations.push(`Auto-selected top 3 most relevant projects (${selectedProjectIds.length} projects prioritized).`);

  return {
    jobTitle: jd?.jobTitle || 'Software Engineer',
    totalRequirements,
    matchedCount,
    transferableCount,
    missingCount,
    matchPercentage: Math.min(98, Math.max(45, matchPercentage)),
    skillMatches,
    selectedProjectIds,
    missingSkills,
    keyRecommendations
  };
}

function getCategoryForSkill(skill: string): SkillCategory {
  const lower = (skill || '').toLowerCase();
  if (['java', 'javascript', 'typescript', 'python', 'sql', 'html', 'css', 'c++'].some(l => lower.includes(l))) return 'Languages';
  if (['spring', 'react', 'node', 'express', 'hibernate', 'jpa', 'next'].some(f => lower.includes(f))) return 'Frameworks';
  if (['postgres', 'mysql', 'redis', 'mongo', 'sqlite'].some(d => lower.includes(d))) return 'Databases';
  if (['docker', 'aws', 'kubernetes', 'git', 'ci/cd', 'jenkins', 'maven'].some(c => lower.includes(c))) return 'Cloud & DevOps';
  if (['microservices', 'rest', 'system design', 'oop', 'solid'].some(c => lower.includes(c))) return 'Concepts';
  return 'Tools';
}

export function rankProjects(projects: Project[], jd: JobDescriptionData): string[] {
  const jdTextLower = ((jd?.rawText || '') + ' ' + (jd?.jobTitle || '')).toLowerCase();

  const scoredProjects = (projects || []).map(proj => {
    let score = 0;
    
    (proj?.techStack || []).forEach(tech => {
      if (jdTextLower.includes(tech.toLowerCase())) {
        score += 3;
      }
    });

    const highlightsText = (proj?.highlights || []).join(' ');
    const projContent = ((proj?.title || '') + ' ' + (proj?.description || '') + ' ' + highlightsText).toLowerCase();
    if (jdTextLower.includes('backend') && projContent.includes('backend')) score += 4;
    if (jdTextLower.includes('api') && projContent.includes('api')) score += 3;
    if (jdTextLower.includes('full stack') && projContent.includes('react')) score += 3;
    if (jdTextLower.includes('microservices') && projContent.includes('microservices')) score += 4;

    return { id: proj.id, score };
  });

  scoredProjects.sort((a, b) => b.score - a.score);

  return scoredProjects.slice(0, 3).map(p => p.id);
}
