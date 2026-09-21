import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ATSClassic: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);

  return (
    <div 
      className="resume-template ats-classic-root" 
      style={{ 
        fontFamily, 
        color: '#111827', 
        lineHeight: 1.4,
        padding: '0.5rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: spacing, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 700, margin: '0 0 0.25rem 0', color: '#111827', letterSpacing: '-0.02em' }}>
          {p.fullName}
        </h1>
        <p style={{ fontSize: fontSizes.headline, fontWeight: 600, color: '#374151', margin: '0 0 0.5rem 0' }}>
          {p.targetTitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: fontSizes.meta, color: '#4b5563' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
          {p.website && <span>• {p.website}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: fontSizes.body, color: '#374151', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Technical Skills
          </h2>
          <div style={{ fontSize: fontSizes.body, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.35rem' }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Concepts', 'Tools'].map(cat => {
              const catSkills = profile.skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} style={{ fontSize: fontSizes.body }}>
                  <strong>{cat}:</strong> {catSkills.map(s => s.name).join(', ')}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Work Experience
          </h2>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} — {exp.company}</span>
                <span style={{ fontSize: fontSizes.meta, color: '#4b5563', fontWeight: 500 }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                </span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#374151' }}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Key Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Technical Projects
          </h2>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: fontSizes.body }}>
                <strong>{proj.title}</strong>
                {proj.techStack && (
                  <span style={{ fontSize: fontSizes.meta, color: '#4b5563' }}>
                    [{proj.techStack.join(', ')}]
                  </span>
                )}
              </div>
              <p style={{ fontSize: fontSizes.body, color: '#374151', margin: '2px 0 2px 0' }}>
                {proj.description}
              </p>
              {proj.highlights && (
                <ul style={{ margin: '2px 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#374151' }}>
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Education
          </h2>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body, marginBottom: '0.25rem' }}>
              <div>
                <strong>{edu.degree} in {edu.fieldOfStudy}</strong> — {edu.institution}
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#4b5563' }}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)} | {edu.gpa ? `GPA: ${edu.gpa}` : edu.location}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Achievements */}
      {(profile.certifications?.length || profile.achievements?.length) ? (
        <section>
          <h2 style={{ fontSize: fontSizes.heading, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111827', paddingBottom: '2px', margin: '0 0 0.5rem 0' }}>
            Certifications & Accomplishments
          </h2>
          <ul style={{ margin: '0 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#374151' }}>
            {profile.certifications?.map(c => (
              <li key={c.id}>
                <strong>{c.title}</strong> — {c.issuer} ({formatDate(c.date)})
              </li>
            ))}
            {profile.achievements?.map(a => (
              <li key={a.id}>
                <strong>{a.title}</strong>: {a.description}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};
