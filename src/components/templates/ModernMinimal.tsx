import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ModernMinimal: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#0f172a';

  return (
    <div 
      className="resume-template modern-minimal-root" 
      style={{ 
        fontFamily, 
        color: '#1e293b', 
        lineHeight: 1.5,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 300, margin: '0 0 0.25rem 0', color: accent, letterSpacing: '-0.03em' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          {p.targetTitle}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: fontSizes.meta, color: '#64748b' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github && <span>{p.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0, fontStyle: 'normal', lineHeight: 1.6 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            Core Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {profile.skills.map(s => (
              <span key={s.id} style={{ background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: fontSizes.meta }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: fontSizes.body, fontWeight: 600, color: '#0f172a' }}>{exp.jobTitle}</span>
                <span style={{ fontSize: fontSizes.meta, color: '#94a3b8' }}>{formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <div style={{ fontSize: fontSizes.meta, color: accent, fontWeight: 500, marginBottom: '0.4rem' }}>
                {exp.company} • {exp.location}
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: fontSizes.body, color: '#475569' }}>
                {exp.responsibilities.map((r, i) => (
                  <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            Projects
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: fontSizes.body, fontWeight: 600, color: '#0f172a' }}>{proj.title}</span>
                {proj.techStack && <span style={{ fontSize: fontSizes.meta, color: '#94a3b8' }}>{proj.techStack.slice(0,4).join(', ')}</span>}
              </div>
              <p style={{ fontSize: fontSizes.body, color: '#475569', margin: '2px 0 4px 0' }}>{proj.description}</p>
              {proj.highlights && (
                <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: fontSizes.body, color: '#475569' }}>
                  {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            Education & Qualifications
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body, marginBottom: '0.4rem' }}>
              <div>
                <strong style={{ color: '#0f172a' }}>{edu.degree}</strong>, {edu.fieldOfStudy} — {edu.institution}
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#94a3b8' }}>
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
