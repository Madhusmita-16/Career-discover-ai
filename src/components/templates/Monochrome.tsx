import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const Monochrome: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Inter');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);

  return (
    <div 
      className="resume-template monochrome-root" 
      style={{ 
        fontFamily, 
        color: '#000000', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: '2px solid #000000', paddingBottom: '0.75rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 900, margin: 0, color: '#000000', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '2px 0 0.5rem 0' }}>
          {p.targetTitle}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#000000', fontWeight: 500 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '0.4rem' }}>
            Profile Overview
          </div>
          <p style={{ fontSize: fontSizes.body, color: '#000000', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '0.4rem' }}>
            Technical Capabilities
          </div>
          <div style={{ fontSize: fontSizes.body, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.35rem' }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Concepts', 'Tools'].map(cat => {
              const list = profile.skills.filter(s => s.category === cat);
              if (!list.length) return null;
              return (
                <div key={cat}>
                  <strong>{cat}:</strong> {list.map(s => s.name).join(', ')}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '0.6rem' }}>
            Professional Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} — {exp.company}</span>
                <span style={{ fontSize: fontSizes.meta, fontWeight: 600 }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                </span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#000000' }}>
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Key Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '0.6rem' }}>
            Selected Projects
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 800, fontSize: fontSizes.body }}>{proj.title}</div>
              <p style={{ fontSize: fontSizes.body, color: '#000000', margin: '2px 0' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '0.4rem' }}>
            Education
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body }}>
              <span><strong>{edu.degree}</strong> ({edu.fieldOfStudy}) — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
