import type { CandidateProfile, JobDescriptionData, ChatMessage } from '../types/resume';

export function getRAGAnswer(
  query: string,
  profile: CandidateProfile,
  currentJd?: JobDescriptionData
): ChatMessage {
  const q = query.toLowerCase();
  const userName = profile.personalInfo.fullName || 'Candidate';
  const skillsList = profile.skills.map(s => s.name).join(', ');

  let responseText = '';
  let references: string[] = [];

  if (q.includes('apply') || q.includes('eligible') || q.includes('match')) {
    if (currentJd) {
      const matched = currentJd.extractedKeywords.languages.concat(currentJd.extractedKeywords.frameworks)
        .filter(k => profile.skills.some(s => s.name.toLowerCase() === k.toLowerCase()));
      const missing = currentJd.extractedKeywords.languages.concat(currentJd.extractedKeywords.frameworks)
        .filter(k => !profile.skills.some(s => s.name.toLowerCase() === k.toLowerCase()));

      responseText = `Based on your profile knowledge base:
- Target Role: ${currentJd.jobTitle}
- Verified Skills Match: ${matched.length} key requirements (${matched.slice(0, 5).join(', ')})
- Key Missing Skills: ${missing.length ? missing.slice(0, 3).join(', ') : 'None critical'}

Recommendation: YES! Your profile matches ${Math.round((matched.length / Math.max(1, matched.length + missing.length)) * 100)}% of the core tech requirements. Apply with your Java & React tailored resume version.`;
      references = [`Profile: ${userName}`, `Job: ${currentJd.jobTitle}`];
    } else {
      responseText = `You are highly eligible for Java Backend, Full Stack (React + Spring Boot), and REST API developer roles. Verified skills: ${skillsList}.`;
      references = [`Candidate Profile Knowledge Base`];
    }
  } else if (q.includes('gap') || q.includes('learn') || q.includes('missing')) {
    responseText = `According to current market demand for your target roles (Software Engineer / Backend Developer):
1. **AWS Cloud Fundamentals**: High demand in 74% of postings. Recommended: AWS EC2, S3, IAM.
2. **Docker Containers**: High demand. You have project experience with Docker compose.
3. **Kubernetes**: Preferred for Senior roles, but keep as 'Learning' rather than fabricating on resume.`;
    references = [`Market Skill Graph`, `Candidate Profile`];
  } else if (q.includes('resume') || q.includes('project') || q.includes('ats')) {
    responseText = `Your master profile contains ${profile.projects.length} verified projects (${profile.projects.map(p => p.title).join(', ')}). 
For ATS optimization:
- Emphasize quantifiable metrics in bullet points (e.g. "improved query speed by 35%").
- Never fabricate skills like AWS or Kubernetes if unverified in your profile evidence.
- Maintain single-column ATS classic layout.`;
    references = [`Resume Intelligence Graph`, `ATS Optimization Engine`];
  } else if (q.includes('interview') || q.includes('prep') || q.includes('question')) {
    responseText = `Top expected technical interview questions for your background:
1. "Explain Spring Boot Dependency Injection and Bean Lifecycle."
2. "How do you optimize SQL query execution plans in PostgreSQL?"
3. "Walk me through how you built ${profile.projects[0]?.title || 'your LMS project'}."`;
    references = [`Interview Knowledge Base`, `Project Evidence`];
  } else {
    responseText = `Hello ${userName}! I am your CareerOS AI assistant. I have indexed your candidate profile (${profile.skills.length} skills, ${profile.projects.length} projects) and target job market listings. Ask me about job eligibility, ATS resume optimization, skill gaps, or interview prep!`;
    references = [`Career RAG Index`];
  }

  return {
    id: `chat-${Date.now()}`,
    sender: 'assistant',
    text: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    references
  };
}
