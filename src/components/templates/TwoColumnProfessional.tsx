import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const TwoColumnProfessional: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#1e3a8a';

  return (
    <div 
      className="resume-template two-column-prof-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Full Width Top Header */}
      <header style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: accent }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: '#475569', margin: '2px 0 0 0' }}>
          {p.targetTitle}
        </div>
      </header>

      {/* Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '32% 65%', gap: '3%', alignItems: 'start' }}>
        {/* LEFT COLUMN: Contact, Skills, Certifications, Languages */}
        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
          {/* Contact Information */}
          <div style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
              Contact
            </div>
            <div style={{ fontSize: fontSizes.meta, color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {p.email && <div><strong>Email:</strong> {p.email}</div>}
              {p.phone && <div><strong>Phone:</strong> {p.phone}</div>}
              {p.location && <div><strong>Location:</strong> {p.location}</div>}
              {p.linkedin && <div><strong>LinkedIn:</strong> {p.linkedin}</div>}
              {p.github && <div><strong>GitHub:</strong> {p.github}</div>}
            </div>
          </div>

          {/* Technical Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div style={{ marginBottom: spacing }}>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
                Skills & Tech
              </div>
              <div style={{ fontSize: fontSizes.meta, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'Tools'].map(cat => {
                  const list = profile.skills.filter(s => s.category === cat);
                  if (!list.length) return null;
                  return (
                    <div key={cat}>
                      <strong style={{ color: accent, display: 'block' }}>{cat}:</strong>
                      <span style={{ color: '#475569' }}>{list.map(s => s.name).join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <div style={{ marginBottom: spacing }}>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
                Certifications
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#334155' }}>
                {profile.certifications.map(c => (
                  <div key={c.id} style={{ marginBottom: '4px' }}>
                    <strong>{c.title}</strong> — {c.issuer}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <div>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
                Languages
              </div>
              <div style={{ fontSize: fontSizes.meta, color: '#475569' }}>
                {profile.languages.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Summary, Experience, Projects, Education */}
        <div>
          {/* Summary */}
          {p.summary && (
            <section style={{ marginBottom: spacing }}>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
                Professional Summary
              </div>
              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
                {p.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {profile.experiences && profile.experiences.length > 0 && (
            <section style={{ marginBottom: spacing }}>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.5rem' }}>
                Work Experience
              </div>
              {profile.experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>
                    {exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span>
                  </div>
                  <div style={{ fontSize: fontSizes.meta, color: '#64748b', marginBottom: '4px' }}>
                    {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} | {exp.location}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: fontSizes.body, color: '#334155' }}>
                    {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <section style={{ marginBottom: spacing }}>
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.5rem' }}>
                Key Projects
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
              <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '0.4rem' }}>
                Education
              </div>
              {profile.education.map(edu => (
                <div key={edu.id} style={{ fontSize: fontSizes.body, marginBottom: '0.25rem' }}>
                  <strong>{edu.degree} in {edu.fieldOfStudy}</strong>
                  <div style={{ fontSize: fontSizes.meta, color: '#64748b' }}>
                    {edu.institution} | {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
