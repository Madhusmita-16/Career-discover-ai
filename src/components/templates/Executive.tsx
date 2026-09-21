import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const Executive: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Georgia');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#1e293b';

  return (
    <div 
      className="resume-template executive-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.5,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Executive Header */}
      <header style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#0f172a', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {p.targetTitle || 'Senior Technology Executive & Engineering Director'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: fontSizes.meta, color: '#64748b' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '0.4rem' }}>
            Executive Profile
          </div>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0, textAlign: 'justify', lineHeight: 1.6 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Core Leadership & Technical Competencies Matrix */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#f8fafc', padding: '0.75rem', borderTop: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '0.5rem' }}>
            Core Leadership & Strategic Competencies
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center', fontSize: fontSizes.meta, color: '#334155', fontWeight: 600 }}>
            {profile.skills.slice(0, 9).map(s => (
              <div key={s.id} style={{ background: '#ffffff', padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                {s.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Career Accomplishments */}
      {profile.achievements && profile.achievements.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #0f172a', paddingBottom: '2px', marginBottom: '0.5rem' }}>
            Key Career Milestones & Impact
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: fontSizes.body, color: '#334155' }}>
            {profile.achievements.map(a => (
              <li key={a.id} style={{ marginBottom: '3px' }}>
                <strong>{a.title}</strong> — {a.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Executive Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #0f172a', paddingBottom: '2px', marginBottom: '0.6rem' }}>
            Professional Leadership Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body }}>
                <span style={{ color: '#0f172a' }}>{exp.jobTitle} | <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                </span>
              </div>
              <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => <li key={i} style={{ marginBottom: '2px' }}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education & Credentials */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #0f172a', paddingBottom: '2px', marginBottom: '0.4rem' }}>
            Education & Executive Credentials
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body }}>
              <span><strong>{edu.degree} in {edu.fieldOfStudy}</strong> — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
