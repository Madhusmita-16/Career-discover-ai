import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ConsultingPro: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Calibri');
  const fontSizes = getFontSizeClass('small'); // Compact layout
  const accent = settings.primaryColor || '#334155'; // Dark Slate Accent

  return (
    <div 
      className="resume-template consulting-pro-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.35,
        padding: '0.4rem',
        background: '#ffffff'
      }}
    >
      {/* Compact Header */}
      <header style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.4rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: accent, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {p.fullName}
          </h1>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
            {p.targetTitle || 'Enterprise Technology Consultant'}
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '8.5px', color: '#475569' }}>
          <div>{p.email} | {p.phone}</div>
          <div>{p.location} | {p.linkedin}</div>
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '2px' }}>
            Executive Summary
          </div>
          <p style={{ fontSize: fontSizes.body, color: '#1e293b', margin: 0 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Skills Matrix */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '2px' }}>
            Core Enterprise Competencies
          </div>
          <div style={{ fontSize: fontSizes.body, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }}>
            {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Concepts', 'Tools'].map(cat => {
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

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '3px' }}>
            Professional & Consulting Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                <span>{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                </span>
              </div>
              <ul style={{ margin: '2px 0 0 1rem', padding: 0, fontSize: fontSizes.body, color: '#1e293b' }}>
                {exp.responsibilities.map((r, i) => <li key={i} style={{ marginBottom: '1px' }}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Key Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '3px' }}>
            Selected Enterprise Deliverables
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.35rem' }}>
              <div style={{ fontWeight: 700, fontSize: fontSizes.body }}>{proj.title}</div>
              <p style={{ fontSize: fontSizes.body, color: '#1e293b', margin: '1px 0' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '2px' }}>
            Education & Certifications
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
