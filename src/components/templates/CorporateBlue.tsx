import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const CorporateBlue: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Calibri');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#1e3a8a'; // Corporate Navy Blue

  return (
    <div 
      className="resume-template corporate-blue-root" 
      style={{ 
        fontFamily, 
        color: '#1e293b', 
        lineHeight: 1.45,
        padding: '0.5rem',
        background: '#ffffff'
      }}
    >
      {/* Corporate Navy Header Bar */}
      <header style={{ 
        background: accent, 
        color: '#ffffff', 
        padding: '1.25rem 1.5rem', 
        borderRadius: '4px',
        marginBottom: spacing
      }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 700, margin: '0 0 0.25rem 0', color: '#ffffff' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          {p.targetTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#e0f2fe' }}>
          {p.email && <span>Email: {p.email}</span>}
          {p.phone && <span>Phone: {p.phone}</span>}
          {p.location && <span>Location: {p.location}</span>}
          {p.linkedin && <span>LinkedIn: {p.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', margin: '0 0 0.4rem 0', textTransform: 'uppercase' }}>
            Executive Summary
          </h2>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
            Professional Experience
          </h2>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>
                <span>{exp.jobTitle} | <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b', fontWeight: 600 }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                </span>
              </div>
              <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Core Competencies & Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
            Technical & Enterprise Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: fontSizes.body }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps'].map(cat => {
              const list = profile.skills.filter(s => s.category === cat);
              if (!list.length) return null;
              return (
                <div key={cat} style={{ background: '#f8fafc', padding: '0.4rem 0.6rem', borderLeft: `3px solid ${accent}`, borderRadius: '2px' }}>
                  <strong style={{ color: accent }}>{cat}:</strong> {list.map(s => s.name).join(', ')}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
            Enterprise Projects
          </h2>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>
                {proj.title} {proj.techStack && <span style={{ fontWeight: 400, color: '#64748b', fontSize: fontSizes.meta }}>({proj.techStack.join(', ')})</span>}
              </div>
              <p style={{ margin: '2px 0', fontSize: fontSizes.body, color: '#334155' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education & Credentials */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
            Education & Qualifications
          </h2>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body, marginBottom: '0.25rem' }}>
              <div>
                <strong>{edu.degree} — {edu.fieldOfStudy}</strong>, {edu.institution}
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
