import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ProfessionalTimeline: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#2563eb';

  return (
    <div 
      className="resume-template professional-timeline-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: accent, marginBottom: '0.4rem' }}>
          {p.targetTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: fontSizes.meta, color: '#64748b' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
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

      {/* Skills Pill Row */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            Technical Proficiency
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {profile.skills.map(s => (
              <span key={s.id} style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '12px', fontSize: fontSizes.meta, fontWeight: 500 }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Vertical Career Timeline Section */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Career Experience & Progression
          </div>

          <div style={{ position: 'relative', paddingLeft: '1.25rem', borderLeft: `2px solid ${accent}` }}>
            {profile.experiences.map((exp) => (
              <div key={exp.id} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                {/* Timeline Circle Node */}
                <div style={{
                  position: 'absolute',
                  left: '-1.65rem',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: accent,
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 0 2px ' + accent
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>
                    {exp.jobTitle} <span style={{ color: accent }}>@ {exp.company}</span>
                  </span>
                  <span style={{ fontSize: fontSizes.meta, color: '#64748b', fontWeight: 600 }}>
                    {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                  </span>
                </div>

                <ul style={{ margin: '0.3rem 0 0 1.1rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Project Milestones
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 700, fontSize: fontSizes.body }}>{proj.title}</div>
              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '2px 0' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            Education & Degrees
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
