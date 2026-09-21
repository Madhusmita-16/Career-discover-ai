import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ProjectFirst: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#059669'; // Emerald Teal accent

  return (
    <div 
      className="resume-template project-first-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: accent, marginBottom: '0.4rem' }}>
          {p.targetTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#475569' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.github && <span><strong>GitHub:</strong> {p.github}</span>}
          {p.website && <span><strong>Live Portfolio:</strong> {p.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* PROJECTS FEATURED AT THE VERY TOP */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.75rem' }}>
            🚀 Featured Software Projects & Portfolio
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', borderLeft: `3px solid ${accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: fontSizes.body, fontWeight: 800, color: '#0f172a' }}>
                  {proj.title}
                </span>
                {proj.githubUrl && <span style={{ fontSize: fontSizes.meta, color: accent, fontWeight: 600 }}>{proj.githubUrl}</span>}
              </div>

              {proj.techStack && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '4px 0 6px 0' }}>
                  {proj.techStack.map(t => (
                    <span key={t} style={{ background: '#d1fae5', color: '#065f46', padding: '1px 6px', borderRadius: '3px', fontSize: fontSizes.meta, fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '0 0 4px 0' }}>
                {proj.description}
              </p>

              {proj.highlights && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: fontSizes.body, color: '#475569' }}>
                  {proj.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.5rem' }}>
            Technical Skillset
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.35rem', fontSize: fontSizes.body }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Tools'].map(cat => {
              const list = profile.skills.filter(s => s.category === cat);
              if (!list.length) return null;
              return (
                <div key={cat}>
                  <strong style={{ color: accent }}>{cat}:</strong> {list.map(s => s.name).join(', ')}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Work & Internship Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Experience & Internships
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} — {exp.company}</span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem' }}>
            Education
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
