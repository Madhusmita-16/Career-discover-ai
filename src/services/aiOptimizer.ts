import type { CandidateProfile, JobDescriptionData, MatchAnalysis, WorkExperience, SkillCategoryGroup, OptimizedResume, ResumeTemplateId, Project } from '../types/resume';
import { calculateATSScores } from './atsEngine';

export function generateTargetedSummary(profile: CandidateProfile, jd: JobDescriptionData): string {
  const targetTitle = jd?.jobTitle || profile?.personalInfo?.targetTitle || 'Software Engineer';
  const company = jd?.companyName && jd.companyName !== 'Target Employer' ? ` targeted for ${jd.companyName}` : '';
  
  const skills = profile?.skills || [];
  const topLanguages = skills.filter(s => s.category === 'Languages').map(s => s.name).slice(0, 3).join(', ') || 'Java, SQL';
  const topFrameworks = skills.filter(s => s.category === 'Frameworks').map(s => s.name).slice(0, 3).join(', ') || 'Spring Boot, React';

  return `Results-driven ${targetTitle} with 2+ years of enterprise experience building scalable microservices, RESTful APIs, and responsive cloud applications${company}. Expert in ${topLanguages}, ${topFrameworks}, and database query optimization. Recognized for engineering API reliability frameworks, delivering 99.9% uptime, and conducting rigorous code reviews in Agile environments.`;
}

export function optimizeExperienceBullets(experiences: WorkExperience[], jd: JobDescriptionData): WorkExperience[] {
  const jdKeywordsLower = ((jd?.rawText || '') + ' ' + (jd?.jobTitle || '')).toLowerCase();
  
  return (experiences || []).map(exp => {
    const responsibilities = exp?.responsibilities || [];
    const optimizedResp = responsibilities.map(resp => {
      let bullet = resp;

      if (bullet.startsWith('Developed')) {
        bullet = bullet.replace(/^Developed/, 'Engineered');
      } else if (bullet.startsWith('Built')) {
        bullet = bullet.replace(/^Built/, 'Architected and deployed');
      } else if (bullet.startsWith('Worked on')) {
        bullet = bullet.replace(/^Worked on/, 'Spearheaded development of');
      }

      if (jdKeywordsLower.includes('microservices') && !bullet.toLowerCase().includes('microservices')) {
        if (bullet.includes('RESTful APIs')) {
          bullet = bullet.replace('RESTful APIs', 'RESTful microservices and API endpoints');
        }
      }

      if (jdKeywordsLower.includes('agile') && !bullet.toLowerCase().includes('agile')) {
        if (bullet.includes('cross-functional teams')) {
          bullet = bullet.replace('cross-functional teams', 'cross-functional Agile engineering teams');
        }
      }

      return bullet;
    });

    return {
      ...exp,
      responsibilities: optimizedResp
    };
  });
}

export function optimizeSkillGroups(profile: CandidateProfile, jd: JobDescriptionData): SkillCategoryGroup[] {
  const jdTextLower = (jd?.rawText || '').toLowerCase();

  const categoriesMap: Record<string, string[]> = {
    'Languages': [],
    'Frameworks': [],
    'Databases': [],
    'Cloud & DevOps': [],
    'Concepts': [],
    'Tools': []
  };

  (profile?.skills || []).forEach(skill => {
    const categoryKey = categoriesMap[skill.category] ? skill.category : 'Tools';
    categoriesMap[categoryKey].push(skill.name);
  });

  Object.keys(categoriesMap).forEach(cat => {
    categoriesMap[cat].sort((a, b) => {
      const aInJd = jdTextLower.includes(a.toLowerCase()) ? 1 : 0;
      const bInJd = jdTextLower.includes(b.toLowerCase()) ? 1 : 0;
      return bInJd - aInJd;
    });
  });

  const result: SkillCategoryGroup[] = [];
  if (categoriesMap['Languages'].length) result.push({ category: 'Languages', skills: categoriesMap['Languages'] });
  if (categoriesMap['Frameworks'].length) result.push({ category: 'Frameworks', skills: categoriesMap['Frameworks'] });
  if (categoriesMap['Databases'].length) result.push({ category: 'Databases', skills: categoriesMap['Databases'] });
  if (categoriesMap['Cloud & DevOps'].length) result.push({ category: 'Cloud & DevOps', skills: categoriesMap['Cloud & DevOps'] });
  if (categoriesMap['Concepts'].length) result.push({ category: 'Concepts', skills: categoriesMap['Concepts'] });
  if (categoriesMap['Tools'].length) result.push({ category: 'Tools', skills: categoriesMap['Tools'] });

  return result;
}

export function generateOptimizedResume(
  profile: CandidateProfile,
  jd: JobDescriptionData,
  matchAnalysis: MatchAnalysis,
  templateId: ResumeTemplateId = 'modern-minimal'
): OptimizedResume {
  const summary = generateTargetedSummary(profile, jd);
  const optimizedExperiences = optimizeExperienceBullets(profile?.experiences || [], jd);
  const optimizedSkills = optimizeSkillGroups(profile, jd);

  const selectedProjects: Project[] = (profile?.projects || []).filter(p => matchAnalysis?.selectedProjectIds?.includes(p.id));

  const tempResume: Partial<OptimizedResume> = {
    targetTitle: jd?.jobTitle || 'Software Engineer',
    summary,
    optimizedExperiences,
    selectedProjects: selectedProjects.length > 0 ? selectedProjects : (profile?.projects || []).slice(0, 3),
    optimizedSkills,
    education: profile?.education || [],
    certifications: profile?.certifications || []
  };

  const scores = calculateATSScores(tempResume as OptimizedResume, profile, jd, matchAnalysis);

  return {
    id: `opt-res-${Date.now()}`,
    candidateProfileId: profile?.id || 'prof-001',
    targetJdId: jd?.id || 'jd-001',
    targetTitle: jd?.jobTitle || 'Software Engineer',
    summary,
    optimizedExperiences,
    selectedProjects: selectedProjects.length > 0 ? selectedProjects : (profile?.projects || []).slice(0, 3),
    optimizedSkills,
    certifications: profile?.certifications || [],
    education: profile?.education || [],
    templateId,
    customSettings: {
      primaryColor: '#0f766e',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      spacing: 'normal',
      showIcons: true,
      sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']
    },
    score: scores,
    createdAt: new Date().toISOString()
  };
}
