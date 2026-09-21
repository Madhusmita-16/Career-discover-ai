import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ModernSplit: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#0284c7';

  return (
    <div 
      className="resume-template modern-split-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.45,
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        minHeight: '100%',
        background: '#ffffff'
      }}
    >
      {/* SHADED LEFT SIDEBAR ZONE */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRight: '1px solid #e2e8f0' }}>
        {/* Contact Zone */}
        <div style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            Contact Info
          </div>
          <div style={{ fontSize: fontSizes.meta, color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {p.email && <div><strong>Email:</strong> {p.email}</div>}
            {p.phone && <div><strong>Phone:</strong> {p.phone}</div>}
            {p.location && <div><strong>Location:</strong> {p.location}</div>}
            {p.linkedin && <div><strong>LinkedIn:</strong> {p.linkedin}</div>}
            {p.github && <div><strong>GitHub:</strong> {p.github}</div>}
          </div>
        </div>

        {/* Technical Skills Sidebar */}
        {profile.skills && profile.skills.length > 0 && (
          <div style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Skills & Tech
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {profile.skills.map(s => (
                <span key={s.id} style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '4px', fontSize: fontSizes.meta }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Sidebar */}
        {profile.certifications && profile.certifications.length > 0 && (
          <div style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
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
      </div>

      {/* RIGHT MAIN BODY ZONE */}
      <div style={{ padding: '1.25rem' }}>
        {/* Name & Headline Header */}
        <header style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.75rem', marginBottom: spacing }}>
          <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a' }}>
            {p.fullName}
          </h1>
          <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: accent, marginTop: '2px' }}>
            {p.targetTitle}
          </div>
        </header>

        {/* Professional Summary */}
        {p.summary && (
          <section style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
              Professional Summary
            </div>
            <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0 }}>
              {p.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {profile.experiences && profile.experiences.length > 0 && (
          <section style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '0.6rem' }}>
              Work Experience
            </div>
            {profile.experiences.map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: fontSizes.body }}>
                  <span>{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></span>
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

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <section style={{ marginBottom: spacing }}>
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '0.6rem' }}>
              Projects
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
            <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '0.4rem' }}>
              Education
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
    </div>
  );
};
