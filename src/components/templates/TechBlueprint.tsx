import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const TechBlueprint: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Aptos');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#0369a1'; // Technical Blueprint Cyan/Slate

  return (
    <div 
      className="resume-template tech-blueprint-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff',
        border: '1px solid #cbd5e1'
      }}
    >
      {/* Blueprint Grid Header Header */}
      <header style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
        <div style={{ fontSize: fontSizes.meta, color: accent, fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          // SYSTEM SPECIFICATION ARCHITECTURE
        </div>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a', textTransform: 'uppercase' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: accent, marginBottom: '0.5rem' }}>
          ROLE: {p.targetTitle}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.35rem', fontSize: fontSizes.meta, color: '#475569', background: '#f8fafc', padding: '0.4rem', border: '1px dashed #94a3b8' }}>
          <div><strong>EMAIL:</strong> {p.email}</div>
          <div><strong>TEL:</strong> {p.phone}</div>
          <div><strong>LOC:</strong> {p.location}</div>
          <div><strong>NET:</strong> {p.github}</div>
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, fontFamily: 'monospace', marginBottom: '0.2rem' }}>
            [SECTION // EXECUTIVE_OVERVIEW]
          </div>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0, paddingLeft: '0.5rem', borderLeft: `2px solid ${accent}` }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Skills Grid */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, fontFamily: 'monospace', marginBottom: '0.4rem' }}>
            [SECTION // TECHNICAL_COMPONENTS]
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: fontSizes.body }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps'].map(cat => {
              const list = profile.skills.filter(s => s.category === cat);
              if (!list.length) return null;
              return (
                <div key={cat} style={{ border: '1px solid #e2e8f0', padding: '0.4rem' }}>
                  <strong style={{ color: accent, fontFamily: 'monospace' }}>[{cat.toUpperCase()}]:</strong> {list.map(s => s.name).join(', ')}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, fontFamily: 'monospace', marginBottom: '0.5rem' }}>
            [SECTION // CAREER_EXECUTION_LOG]
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem', borderLeft: '2px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} &lt;{exp.company}&gt;</span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b', fontFamily: 'monospace' }}>
                  {formatDate(exp.startDate)} -&gt; {exp.isCurrent ? 'NOW' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, fontFamily: 'monospace', marginBottom: '0.4rem' }}>
            [SECTION // SYSTEM_PROJECTS]
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
              <div style={{ fontWeight: 700, fontSize: fontSizes.body }}>{proj.title}</div>
              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '2px 0' }}>{proj.description}</p>
              {proj.techStack && <div style={{ fontSize: fontSizes.meta, color: accent, fontFamily: 'monospace' }}>STACK: {proj.techStack.join(' | ')}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, fontFamily: 'monospace', marginBottom: '0.3rem' }}>
            [SECTION // ACADEMIC_CREDENTIALS]
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body }}>
              <span><strong>{edu.degree}</strong> ({edu.fieldOfStudy}) — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta, color: '#64748b', fontFamily: 'monospace' }}>{formatDate(edu.startDate)} -&gt; {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
