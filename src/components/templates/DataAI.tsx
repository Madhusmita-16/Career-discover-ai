import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { getFontFamilyCSS, getFontSizeClass, getSpacingPx, formatDate } from './templateHelpers';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const DataAI: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const settings = resume.customSettings || {};
  const fontFamily = getFontFamilyCSS(settings.fontFamily);
  const fontSizes = getFontSizeClass(settings.fontSize);
  const spacing = getSpacingPx(settings.spacing);
  const accent = settings.primaryColor || '#7c3aed'; // Violet / AI Purple

  return (
    <div 
      className="resume-template data-ai-root" 
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, color: '#0f172a' }}>
              {p.fullName}
            </h1>
            <div style={{ fontSize: fontSizes.headline, fontWeight: 700, color: accent, marginTop: '2px' }}>
              {p.targetTitle || 'AI/ML Engineer & Data Scientist'}
            </div>
          </div>
          <div style={{ background: '#f5f3ff', color: accent, padding: '4px 10px', borderRadius: '4px', fontSize: fontSizes.meta, fontWeight: 700 }}>
            AI / ML SPECIALIST
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: fontSizes.meta, color: '#64748b', marginTop: '0.5rem' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.github && <span>github: {p.github}</span>}
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

      {/* AI & Data Skill Stack Categorization (5 Category Matrix) */}
      {profile.skills && profile.skills.length > 0 && (
        <section style={{ marginBottom: spacing, background: '#faf5ff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e9d5ff' }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            🧠 AI, ML & Data Engineering Capabilities
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.4rem', fontSize: fontSizes.body }}>
            <div><strong style={{ color: accent }}>Programming:</strong> Python, R, SQL, Java</div>
            <div><strong style={{ color: accent }}>ML & AI:</strong> PyTorch, TensorFlow, LLMs, Scikit-Learn</div>
            <div><strong style={{ color: accent }}>Data Pipelines:</strong> Spark, Pandas, PostgreSQL, Redis</div>
            <div><strong style={{ color: accent }}>Cloud & MLOps:</strong> AWS, Docker, MLflow, Kubernetes</div>
            <div><strong style={{ color: accent }}>Tools & APIs:</strong> Postman, Git, Jupyter, REST</div>
          </div>
        </section>
      )}

      {/* AI Projects & Research Work */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            🤖 Machine Learning & Data Projects
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

      {/* Experience */}
      {profile.experiences && profile.experiences.length > 0 && (
        <section style={{ marginBottom: spacing }}>
          <div style={{ fontSize: fontSizes.heading, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '0.6rem' }}>
            Data Science & Engineering Experience
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
