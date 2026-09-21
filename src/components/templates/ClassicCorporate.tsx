import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const ClassicCorporate: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;

  return (
    <div className="resume-paper classic-corporate-paper">
      {/* Header */}
      <header className="classic-header">
        <h1 className="classic-name">{p.fullName}</h1>
        <div className="classic-contact">
          <span>{p.location}</span> | <span>{p.phone}</span> | <span>{p.email}</span>
          <br />
          <span>{p.linkedin}</span> | <span>{p.github}</span>
        </div>
      </header>

      <hr className="classic-divider" />

      {/* Target Title / Summary */}
      <section className="classic-section">
        <h2 className="classic-title">{resume.targetTitle.toUpperCase()}</h2>
        <p className="classic-summary">{resume.summary}</p>
      </section>

      {/* Skills Matrix */}
      <section className="classic-section">
        <h3 className="classic-heading">TECHNICAL SKILLS</h3>
        <div className="classic-skills-list">
          {resume.optimizedSkills.map((group, idx) => (
            <div key={idx} className="classic-skill-row">
              <strong>{group.category}:</strong> {group.skills.join(', ')}
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="classic-section">
        <h3 className="classic-heading">PROFESSIONAL EXPERIENCE</h3>
        {resume.optimizedExperiences.map(exp => (
          <div key={exp.id} className="classic-item">
            <div className="classic-item-header">
              <span className="classic-item-title">{exp.jobTitle} — <em>{exp.company}</em></span>
              <span className="classic-item-date">{exp.startDate} – {exp.endDate} | {exp.location}</span>
            </div>
            <ul className="classic-bullets">
              {exp.responsibilities.map((resp, bIdx) => (
                <li key={bIdx}>{resp}</li>
              ))}
              {exp.keyAchievements?.map((ach, aIdx) => (
                <li key={`ach-${aIdx}`} className="classic-ach-bullet">
                  <strong>Key Achievement:</strong> {ach}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Selected Projects */}
      <section className="classic-section">
        <h3 className="classic-heading">FEATURED PROJECTS</h3>
        {resume.selectedProjects.map(proj => (
          <div key={proj.id} className="classic-item">
            <div className="classic-item-header">
              <span className="classic-item-title">
                {proj.title} 
                <span className="classic-tech"> [{proj.techStack.join(', ')}]</span>
              </span>
              {proj.githubUrl && <span className="classic-item-date">{proj.githubUrl}</span>}
            </div>
            <p className="classic-proj-desc">{proj.description}</p>
            <ul className="classic-bullets">
              {proj.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="classic-section">
        <h3 className="classic-heading">EDUCATION</h3>
        {resume.education.map(edu => (
          <div key={edu.id} className="classic-item">
            <div className="classic-item-header">
              <span className="classic-item-title">{edu.degree} in {edu.fieldOfStudy}</span>
              <span className="classic-item-date">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="classic-subtext">{edu.institution}, {edu.location} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
          </div>
        ))}
      </section>

      {/* Certifications & Achievements */}
      {resume.certifications.length > 0 && (
        <section className="classic-section">
          <h3 className="classic-heading">CERTIFICATIONS & ACHIEVEMENTS</h3>
          <ul className="classic-bullets">
            {resume.certifications.map(cert => (
              <li key={cert.id}>
                <strong>{cert.title}</strong> — {cert.issuer} ({cert.date}) {cert.credentialId ? `[ID: ${cert.credentialId}]` : ''}
              </li>
            ))}
            {profile.achievements.map(ach => (
              <li key={ach.id}>
                <strong>{ach.title}:</strong> {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
