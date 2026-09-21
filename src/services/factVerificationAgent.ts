import type { CandidateProfile, FactProvenance } from '../types/resume';

export function verifyResumeFacts(
  claims: string[],
  profile: CandidateProfile
): { provenances: FactProvenance[]; isValid: boolean; unverifiedCount: number } {
  const provenances: FactProvenance[] = claims.map((claim, idx) => {
    const claimLower = claim.toLowerCase();
    
    let matchedSource = '';
    const foundProject = profile.projects.find(p => p.techStack.some(t => claimLower.includes(t.toLowerCase())));
    if (foundProject) {
      matchedSource = `Project: ${foundProject.title}`;
    } else {
      const foundExp = profile.experiences.find(e => e.responsibilities.some(r => claimLower.includes(r.toLowerCase().slice(0, 15))));
      if (foundExp) {
        matchedSource = `Experience: ${foundExp.company} (${foundExp.jobTitle})`;
      } else {
        const foundSkill = profile.skills.find(s => claimLower.includes(s.name.toLowerCase()));
        if (foundSkill) {
          matchedSource = `Verified Skill: ${foundSkill.name}`;
        }
      }
    }

    const isVerified = Boolean(matchedSource);
    return {
      id: `prov-${idx}`,
      claim,
      isVerified,
      evidenceSource: matchedSource || 'Unverified - Needs evidence in Profile',
      status: isVerified ? 'verified' : 'unverified',
      notes: isVerified ? 'Verified against Candidate Master Profile' : 'Flagged: Ensure evidence exists before including in final PDF export'
    };
  });

  const unverifiedCount = provenances.filter(p => !p.isVerified).length;
  return {
    provenances,
    isValid: unverifiedCount === 0,
    unverifiedCount
  };
}
