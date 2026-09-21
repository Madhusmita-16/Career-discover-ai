import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const AchievementFocused: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#b91c1c'; // Impact Red / Crimson Accent

  return (
    <div 
      className="resume-template achievement-focused-root" 
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
        <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: accent, marginTop: '2px' }}>
          {p.targetTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#64748b', marginTop: '4px' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </header>

      {/* HIGHLIGHTED METRICS / ACHIEVEMENT STRIP NEAR TOP */}
      {profile.achievements && profile.achievements.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#fef2f2', padding: '0.75rem', borderRadius: '6px', borderLeft: `4px solid ${accent}` }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            🏆 Key Measurable Accomplishments & Metric Highlights
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: fontSizes.body }}>
            {profile.achievements.map(a => (
              <div key={a.id} style={{ background: '#ffffff', padding: '0.4rem', borderRadius: '4px', border: '1px solid #fecaca' }}>
                <strong style={{ color: accent, display: 'block' }}>{a.title}</strong>
                <span style={{ fontSize: fontSizes.meta, color: '#475569' }}>{a.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Work Experience with Metric Highlights */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Results & Impact-Driven Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{r}</li>
                ))}
              </ul>
              {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                <div style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '4px', marginTop: '4px', fontSize: fontSizes.meta, borderLeft: `2px solid ${accent}` }}>
                  <strong style={{ color: accent }}>Key Result: </strong>{exp.keyAchievements.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem' }}>
            Technical Capabilities
          </div>
          <div style={{ fontSize: fontSizes.body, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.35rem' }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps'].map(cat => {
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

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem' }}>
            Education & Academic Impact
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
