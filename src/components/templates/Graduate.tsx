import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const Graduate: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#4f46e5'; // Indigo / Violet Accent

  return (
    <div 
      className="resume-template graduate-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ textTransform: 'none', borderBottom: `2px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: accent, margin: '2px 0 0.5rem 0' }}>
          {p.targetTitle || 'Computer Science Graduate & Software Engineer'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#64748b' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.github && <span>github: {p.github}</span>}
          {p.linkedin && <span>linkedin: {p.linkedin}</span>}
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

      {/* EDUCATION PROMINENTLY AT TOP FOR GRADUATES */}
      {profile.education && profile.education.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', borderLeft: `3px solid ${accent}` }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            🎓 Education & Academic Background
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{edu.degree} in {edu.fieldOfStudy}</span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#475569' }}>
                {edu.institution} | {edu.location} {edu.gpa && <span>• <strong>GPA: {edu.gpa}</strong></span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.5rem' }}>
            Technical Core Competencies
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.35rem', fontSize: fontSizes.body }}>
            {['Languages', 'Frameworks', 'Databases', 'Tools', 'Concepts'].map(cat => {
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

      {/* Capstone Projects & Academic Work */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Capstone Projects & Academic Engineering
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{proj.title}</span>
                {proj.techStack && <span style={{ fontSize: fontSizes.meta, color: accent }}>[{proj.techStack.join(', ')}]</span>}
              </div>
              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '2px 0' }}>{proj.description}</p>
              {proj.highlights && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: fontSizes.body, color: '#475569' }}>
                  {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Internships & Early Career Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Internship Experience
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

      {/* Certifications & Achievements */}
      {(profile.certifications?.length || profile.achievements?.length) ? (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem' }}>
            Certifications & Honours
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: fontSizes.body, color: '#334155' }}>
            {profile.certifications?.map(c => (
              <li key={c.id}><strong>{c.title}</strong> — {c.issuer} ({formatDate(c.date)})</li>
            ))}
            {profile.achievements?.map(a => (
              <li key={a.id}><strong>{a.title}</strong>: {a.description}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};
