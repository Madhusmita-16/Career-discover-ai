import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const CreativeTech: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily || 'Inter');
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#0d9488'; // Teal Creative Accent

  return (
    <div 
      className="resume-template creative-tech-root" 
      style={{ 
        fontFamily, 
        color: '#0f172a', 
        lineHeight: 1.5,
        padding: '0.75rem',
        background: '#ffffff'
      }}
    >
      {/* Creative Header Banner with Subtle Accent Box */}
      <header style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        color: '#ffffff', 
        padding: '1.25rem', 
        borderRadius: '8px', 
        marginBottom: spacing,
        borderLeft: `6px solid ${accent}`
      }}>
        <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
          {p.fullName}
        </h1>
        <div style={{ fontSize: fontSizes.headline, fontWeight: 600, color: '#2dd4bf', marginTop: '4px' }}>
          {p.targetTitle || 'Frontend Engineer & Creative Technologist'}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: fontSizes.meta, color: '#94a3b8', marginTop: '0.75rem' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.website && <span style={{ color: '#2dd4bf', fontWeight: 600 }}>• {p.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {p.summary && (
        <section style={{ marginBottom: spacing }}>
          <p style={{ fontSize: fontSizes.body, color: '#334155', margin: 0, lineHeight: 1.6 }}>
            {p.summary}
          </p>
        </section>
      )}

      {/* Featured Projects Highlight Cards */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
            🎨 Creative Engineering Projects & UI Demos
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {profile.projects.map(proj => (
              <div key={proj.id} style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: fontSizes.body, color: '#0f172a' }}>{proj.title}</div>
                <p style={{ fontSize: fontSizes.meta, color: '#475569', margin: '3px 0' }}>{proj.description}</p>
                {proj.techStack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                    {proj.techStack.map(t => (
                      <span key={t} style={{ background: '#ccfbf1', color: '#0f766e', padding: '1px 5px', borderRadius: '3px', fontSize: '8px', fontWeight: 600 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            Technical & Creative Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {profile.skills.map(s => (
              <span key={s.id} style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: '4px', fontSize: fontSizes.meta }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Professional Experience
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

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.4rem' }}>
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
  );
};
