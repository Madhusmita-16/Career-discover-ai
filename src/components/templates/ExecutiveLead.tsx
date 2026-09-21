import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ExecutiveLead: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;

  return (
    <div className="resume-paper executive-lead-paper">
      <header className="exec-header">
        <h1 className="exec-name">{p.fullName.toUpperCase()}</h1>
        <div className="exec-title">{resume.targetTitle}</div>
        <div className="exec-contact">{p.email} | {p.phone} | {p.location} | {p.linkedin}</div>
      </header>

      <section className="exec-section">
        <h2 className="exec-heading">EXECUTIVE SUMMARY</h2>
        <p className="exec-summary">{resume.summary}</p>
      </section>

      <section className="exec-section">
        <h2 className="exec-heading">CORE EXPERTISE & COMPETENCIES</h2>
        <div className="exec-skills-grid">
          {resume.optimizedSkills.map((group, idx) => (
            <div key={idx} className="exec-skill-box">
              <strong>{group.category}:</strong> {group.skills.join(', ')}
            </div>
          ))}
        </div>
      </section>

      <section className="exec-section">
        <h2 className="exec-heading">PROFESSIONAL EXPERIENCE</h2>
        {resume.optimizedExperiences.map(exp => (
          <div key={exp.id} className="exec-exp-block">
            <div className="exec-exp-top">
              <span className="exec-job">{exp.jobTitle}</span>
              <span className="exec-comp">{exp.company} — {exp.location}</span>
              <span className="exec-date">{exp.startDate} – {exp.endDate}</span>
            </div>
            <ul className="exec-bullets">
              {exp.responsibilities.map((resp, bIdx) => (
                <li key={bIdx}>{resp}</li>
              ))}
              {exp.keyAchievements?.map((ach, aIdx) => (
                <li key={`ach-${aIdx}`} className="exec-ach">
                  <strong>Leadership Highlight:</strong> {ach}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="exec-section">
        <h2 className="exec-heading">PROJECT & PRODUCT INITIATIVES</h2>
        {resume.selectedProjects.map(proj => (
          <div key={proj.id} className="exec-proj-block">
            <div className="exec-proj-title">
              {proj.title} <span className="exec-tech">({proj.techStack.join(', ')})</span>
            </div>
            <p className="exec-proj-desc">{proj.description}</p>
          </div>
        ))}
      </section>

      <section className="exec-section">
        <h2 className="exec-heading">EDUCATION & ACCREDITATIONS</h2>
        {resume.education.map(edu => (
          <div key={edu.id} className="exec-edu">
            {edu.degree} in {edu.fieldOfStudy} — {edu.institution} ({edu.startDate} – {edu.endDate})
          </div>
        ))}
        {resume.certifications.map(cert => (
          <div key={cert.id} className="exec-edu">
            {cert.title} — {cert.issuer} ({cert.date})
          </div>
        ))}
      </section>
    </div>
  );
};
