import type { CandidateProfile, ResumeVersion, OptimizedResume } from '../types/resume';
import { initialProfile } from '../data/initialProfile';

const PROFILE_KEY = 'ai_resume_maker_candidate_profile_v1';
const VERSIONS_KEY = 'ai_resume_maker_saved_versions_v1';

export function getCandidateProfile(): CandidateProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
        return {
          ...initialProfile,
          ...parsed,
          personalInfo: {
            ...initialProfile.personalInfo,
            ...(parsed.personalInfo || {})
          },
          experiences: Array.isArray(parsed.experiences)
            ? parsed.experiences 
            : initialProfile.experiences,
          education: Array.isArray(parsed.education)
            ? parsed.education 
            : initialProfile.education,
          projects: Array.isArray(parsed.projects)
            ? parsed.projects 
            : initialProfile.projects,
          skills: Array.isArray(parsed.skills)
            ? parsed.skills 
            : initialProfile.skills,
          certifications: Array.isArray(parsed.certifications) 
            ? parsed.certifications 
            : initialProfile.certifications,
          achievements: Array.isArray(parsed.achievements) 
            ? parsed.achievements 
            : initialProfile.achievements
        };
      }
    }
  } catch (e) {
    console.error('Failed to parse candidate profile from LocalStorage', e);
  }
  return initialProfile;
}

export function saveCandidateProfile(profile: CandidateProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save candidate profile', e);
  }
}

export function getSavedVersions(): ResumeVersion[] {
  try {
    const data = localStorage.getItem(VERSIONS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to get saved resume versions', e);
  }
  return [];
}

export function saveResumeVersion(
  optimizedResume: OptimizedResume,
  versionName: string,
  companyName: string,
  jdText: string
): ResumeVersion {
  const versions = getSavedVersions();
  
  const newVersion: ResumeVersion = {
    id: `ver-${Date.now()}`,
    versionName: versionName || `${optimizedResume.targetTitle} (${companyName || 'Corporate'})`,
    targetRole: optimizedResume.targetTitle,
    companyName: companyName || 'Corporate',
    dateSaved: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    optimizedResume,
    jdText
  };

  const updated = [newVersion, ...versions];
  try {
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save resume version', e);
  }
  return newVersion;
}

export function deleteResumeVersion(versionId: string): ResumeVersion[] {
  const versions = getSavedVersions();
  const filtered = versions.filter(v => v.id !== versionId);
  try {
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete resume version', e);
  }
  return filtered;
}

export function exportProfileJSON(profile: CandidateProfile): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `candidate_profile_${profile.personalInfo.fullName.replace(/\s+/g, '_')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
