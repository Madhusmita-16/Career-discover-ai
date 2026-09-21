import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ModernCorporate: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;
  const primaryColor = resume.customSettings?.primaryColor || '#0f766e';

  return (
    <div className="resume-paper modern-corporate-paper">
      {/* Top Header Banner */}
      <header className="modern-header" style={{ borderBottomColor: primaryColor }}>
        <div className="modern-header-main">
          <h1 className="modern-name" style={{ color: primaryColor }}>{p.fullName}</h1>
          <div className="modern-target-role">{resume.targetTitle}</div>
        </div>
        <div className="modern-contact-grid">
          <div>📧 {p.email}</div>
          <div>📱 {p.phone}</div>
          <div>📍 {p.location}</div>
          <div>🔗 {p.linkedin}</div>
          <div>💻 {p.github}</div>
        </div>
      </header>

      {/* Summary */}
      <section className="modern-section">
        <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
          PROFESSIONAL SUMMARY
        </h2>
        <p className="modern-summary">{resume.summary}</p>
      </section>

      {/* Skills Matrix */}
      <section className="modern-section">
        <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
          CORE COMPETENCIES & TECHNICAL SKILLS
        </h2>
        <div className="modern-skills-grid">
          {resume.optimizedSkills.map((group, idx) => (
            <div key={idx} className="modern-skill-card">
              <span className="modern-skill-cat" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                {group.category}
              </span>
              <span className="modern-skill-tags">{group.skills.join(' • ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="modern-section">
        <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
          WORK EXPERIENCE
        </h2>
        {resume.optimizedExperiences.map(exp => (
          <div key={exp.id} className="modern-exp-block">
            <div className="modern-exp-header">
              <div>
                <span className="modern-exp-title">{exp.jobTitle}</span>
                <span className="modern-exp-company"> @ {exp.company}</span>
              </div>
              <span className="modern-exp-date">{exp.startDate} – {exp.endDate} | {exp.location}</span>
            </div>
            <ul className="modern-bullets">
              {exp.responsibilities.map((resp, bIdx) => (
                <li key={bIdx}>{resp}</li>
              ))}
              {exp.keyAchievements?.map((ach, aIdx) => (
                <li key={`ach-${aIdx}`} className="modern-ach-item">
                  <strong style={{ color: primaryColor }}>★ Key Achievement:</strong> {ach}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Selected Projects */}
      <section className="modern-section">
        <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
          FEATURED PROJECTS
        </h2>
        {resume.selectedProjects.map(proj => (
          <div key={proj.id} className="modern-proj-block">
            <div className="modern-exp-header">
              <span className="modern-exp-title">{proj.title}</span>
              <span className="modern-tech-badge">{proj.techStack.join(' • ')}</span>
            </div>
            <p className="modern-proj-desc">{proj.description}</p>
            <ul className="modern-bullets">
              {proj.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education & Certifications */}
      <div className="modern-two-col">
        <section className="modern-section">
          <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
            EDUCATION
          </h2>
          {resume.education.map(edu => (
            <div key={edu.id} className="modern-edu-item">
              <div className="modern-edu-degree">{edu.degree} in {edu.fieldOfStudy}</div>
              <div className="modern-edu-sub">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
              {edu.gpa && <div className="modern-edu-gpa">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>

        {resume.certifications.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-heading" style={{ color: primaryColor, borderColor: primaryColor }}>
              CERTIFICATIONS
            </h2>
            {resume.certifications.map(cert => (
              <div key={cert.id} className="modern-cert-item">
                <div className="modern-cert-title">{cert.title}</div>
                <div className="modern-cert-sub">{cert.issuer} | {cert.date}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
