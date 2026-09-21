import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const JavaBackend: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Roboto');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#1e3a8a'; // Dark Navy/Blue Accent

  return (
    <div 
      className="resume-template java-backend-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: `3px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: accent, letterSpacing: '-0.02em' }}>
              {p.fullName}
            </h1>
            <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: '#475569', margin: '2px 0 0 0' }}>
              {p.targetTitle || 'Java & Microservices Backend Engineer'}
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: fontSizes.meta, color: '#475569' }}>
            {p.location && <div>{p.location}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.email && <div>{p.email}</div>}
            {p.github && <div style={{ color: accent, fontWeight: 600 }}>{p.github}</div>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
            Backend Architecture Summary
          </div>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Backend Tech Stack (Highlight Grid) */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', borderLeft: `4px solid ${accent}` }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            Core Backend Stack & Infrastructure
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.4rem', fontSize: fontSizes.body }}>
            <div><strong style={{ color: accent }}>Backend Languages:</strong> Java 17/11, SQL, TypeScript</div>
            <div><strong style={{ color: accent }}>Frameworks:</strong> Spring Boot, Spring Security, Hibernate</div>
            <div><strong style={{ color: accent }}>Databases & Caching:</strong> PostgreSQL, MySQL, Redis</div>
            <div><strong style={{ color: accent }}>Architecture & Cloud:</strong> Microservices, REST APIs, Docker, AWS</div>
          </div>
        </section>
      )}

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
            Backend Development Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body }}>
                <span style={{ color: '#0f172a' }}>{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
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

      {/* Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
            System Architecture & Projects
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body }}>
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

      {/* Education & Certs */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Education & Certifications
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body, marginBottom: '0.25rem' }}>
              <span><strong>{edu.degree} in {edu.fieldOfStudy}</strong> — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
          {profile.certifications?.map(c => (
            <div key={c.id} style={{ fontSize: fontSizes.body, marginTop: '2px' }}>
              • <strong>{c.title}</strong> — {c.issuer} ({formatDate(c.date)})
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
