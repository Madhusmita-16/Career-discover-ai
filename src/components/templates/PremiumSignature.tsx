import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const PremiumSignature: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Inter');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#4338ca'; // Luxury Indigo

  // Get initials for Monogram Seal
  const initials = p.fullName
    ? p.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'MS';

  return (
    <div 
      className="resume-template premium-signature-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.5,
        padding: '0.85rem',
        background: '#ffffff'
      }}
    >
      {/* Luxury Monogram Signature Header */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.25rem', 
        borderBottom: `2px solid ${accent}`, 
        paddingBottom: '1rem', 
        marginBottom: spacing 
      }}>
        {/* Monogram Seal */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: accent,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          flexShrink: 0
        }}>
          {initials}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {p.fullName}
          </h1>
          <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: accent, marginTop: '2px', letterSpacing: '0.05em' }}>
            {p.targetTitle}
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: fontSizes.meta, color: '#64748b' }}>
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
            "{p.summary}"
          </p>
        </section>
      )}

      {/* Core Competencies */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '2px' }}>
            Core Expertise & Signature Competencies
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {profile.skills.map(s => (
              <span key={s.id} style={{ background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', padding: '3px 10px', borderRadius: '20px', fontSize: fontSizes.meta, fontWeight: 500 }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #f1f5f9', paddingBottom: '2px', marginBottom: '0.75rem' }}>
            Executive & Technical Experience
          </div>
          {profile.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: fontSizes.body }}>
                <span style={{ color: '#0f172a' }}>{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></span>
                <span style={{ fontSize: fontSizes.meta, color: '#94a3b8' }}>
                  {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: fontSizes.body, color: '#334155' }}>
                {exp.responsibilities.map((r, i) => <li key={i} style={{ marginBottom: '2px' }}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Key Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #f1f5f9', paddingBottom: '2px', marginBottom: '0.6rem' }}>
            Signature Deliverables
          </div>
          {profile.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.65rem' }}>
              <div style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>{proj.title}</div>
              <p style={{ fontSize: fontSizes.body, color: '#334155', margin: '2px 0' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #f1f5f9', paddingBottom: '2px', marginBottom: '0.4rem' }}>
            Education & Credentials
          </div>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fontSizes.body }}>
              <span><strong>{edu.degree}</strong> ({edu.fieldOfStudy}) — {edu.institution}</span>
              <span style={{ fontSize: fontSizes.meta, color: '#94a3b8' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
