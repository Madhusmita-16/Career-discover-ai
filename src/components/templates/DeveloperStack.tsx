import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const DeveloperStack: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Source Sans');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#0284c7';

  return (
    <div 
      className="resume-template developer-stack-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Dev Header with Terminal Aesthetic Badge */}
      <header style={{ borderBottom: '2px solid #0f172a', paddingBottom: '0.75rem', marginBottom: spacing }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a', fontFamily: 'monospace' }}>
              &gt; {p.fullName}
            </h1>
            <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: accent, marginTop: '2px' }}>
              {p.targetTitle}
            </div>
          </div>

          <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', fontSize: fontSizes.meta, fontFamily: 'monospace' }}>
            STATUS: READY_TO_BUILD
          </div>
        </div>

        {/* Links & Contacts Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: fontSizes.meta, marginTop: '0.5rem', fontFamily: 'monospace', color: '#475569' }}>
          {p.github && <span>github: <strong style={{ color: accent }}>{p.github}</strong></span>}
          {p.linkedin && <span>linkedin: <strong>{p.linkedin}</strong></span>}
          {p.email && <span>email: <strong>{p.email}</strong></span>}
          {p.phone && <span>tel: <strong>{p.phone}</strong></span>}
        </div>
      </header>

      {/* Technical Skill Stack Matrix (Prominent Top Position!) */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
            // TECH_STACK_OVERVIEW
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.4rem', fontSize: fontSizes.body }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Tools', 'Concepts'].map(cat => {
              const catSkills = profile.skills.filter(s => s.category === cat);
              if (!catSkills.length) return null;
              return (
                <div key={cat}>
                  <span style={{ fontWeight: 700, color: accent, fontSize: fontSizes.meta, fontFamily: 'monospace' }}>{cat.toUpperCase()}:</span>{' '}
                  <span style={{ fontSize: fontSizes.meta }}>{catSkills.map(s => s.name).join(', ')}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects Section (Prioritized) */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            FEATURED PROJECTS & CODE
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>
                  {proj.title} {proj.githubUrl && <span style={{ fontSize: fontSizes.meta, color: accent, fontWeight: 400 }}>[{proj.githubUrl}]</span>}
                </span>
              </div>

              {proj.techStack && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '3px 0' }}>
                  {proj.techStack.map(t => (
                    <span key={t} style={{ background: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '3px', fontSize: fontSizes.meta, fontFamily: 'monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '2px 0 4px 0' }}>{proj.description}</p>
              {proj.highlights && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: fontSizes.body, color: '#475569' }}>
                  {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            ENGINEERING EXPERIENCE
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} @ <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.4rem' }}>
            EDUCATION & DEGREES
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body }}>
              <span><strong>{edu.degree}</strong> ({edu.fieldOfStudy}) — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
