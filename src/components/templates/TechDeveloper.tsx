import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const TechDeveloper: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;

  return (
    <div className="resume-paper tech-developer-paper">
      {/* Header */}
      <header className="tech-header">
        <h1 className="tech-name">{p.fullName}</h1>
        <div className="tech-subtitle">{resume.targetTitle}</div>
        <div className="tech-links">
          <span>{p.email}</span> • <span>{p.phone}</span> • <span>{p.location}</span> • <span>{p.linkedin}</span> • <span>{p.github}</span>
        </div>
      </header>

      {/* Tech Stack First */}
      <section className="tech-section">
        <h2 className="tech-heading">// TECHNICAL STACK & SKILLS</h2>
        <div className="tech-skills-matrix">
          {resume.optimizedSkills.map((group, idx) => (
            <div key={idx} className="tech-skill-row">
              <span className="tech-cat-label">[{group.category}]</span>
              <span className="tech-skills-list">{group.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Summary */}
      <section className="tech-section">
        <h2 className="tech-heading">// OVERVIEW</h2>
        <p className="tech-summary">{resume.summary}</p>
      </section>

      {/* Projects Featured Prominently */}
      <section className="tech-section">
        <h2 className="tech-heading">// KEY TECHNICAL PROJECTS</h2>
        {resume.selectedProjects.map(proj => (
          <div key={proj.id} className="tech-project-card">
            <div className="tech-proj-header">
              <span className="tech-proj-title">{proj.title}</span>
              <span className="tech-stack-tag">Stack: {proj.techStack.join(', ')}</span>
            </div>
            <p className="tech-proj-desc">{proj.description}</p>
            <ul className="tech-bullets">
              {proj.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Work Experience */}
      <section className="tech-section">
        <h2 className="tech-heading">// WORK EXPERIENCE</h2>
        {resume.optimizedExperiences.map(exp => (
          <div key={exp.id} className="tech-exp-card">
            <div className="tech-proj-header">
              <span className="tech-proj-title">{exp.jobTitle} @ {exp.company}</span>
              <span className="tech-date">{exp.startDate} – {exp.endDate} | {exp.location}</span>
            </div>
            <ul className="tech-bullets">
              {exp.responsibilities.map((resp, bIdx) => (
                <li key={bIdx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education & Certs */}
      <section className="tech-section">
        <h2 className="tech-heading">// EDUCATION & CREDENTIALS</h2>
        {resume.education.map(edu => (
          <div key={edu.id} className="tech-edu-row">
            <strong>{edu.degree} ({edu.fieldOfStudy})</strong> — {edu.institution} [{edu.startDate} – {edu.endDate}] {edu.gpa ? `GPA: ${edu.gpa}` : ''}
          </div>
        ))}
        {resume.certifications.map(cert => (
          <div key={cert.id} className="tech-cert-row">
            🏆 <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
          </div>
        ))}
      </section>
    </div>
  );
};
