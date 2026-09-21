import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const FresherGraduate: React.FC<Props> = ({ resume, profile }) => {
  const p = profile.personalInfo;

  return (
    <div className="resume-paper fresher-graduate-paper">
      <header className="fresher-header">
        <h1 className="fresher-name">{p.fullName}</h1>
        <div className="fresher-title">{resume.targetTitle}</div>
        <div className="fresher-contact">
          {p.email} | {p.phone} | {p.location} | {p.github} | {p.linkedin}
        </div>
      </header>

      <section className="fresher-section">
        <h2 className="fresher-heading">CAREER OBJECTIVE</h2>
        <p className="fresher-summary">{resume.summary}</p>
      </section>

      {/* Education First for Freshers */}
      <section className="fresher-section">
        <h2 className="fresher-heading">ACADEMIC QUALIFICATIONS</h2>
        {resume.education.map(edu => (
          <div key={edu.id} className="fresher-edu-card">
            <div className="fresher-edu-main">
              <span className="fresher-degree">{edu.degree} — {edu.fieldOfStudy}</span>
              <span className="fresher-date">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="fresher-sub">{edu.institution}, {edu.location} | GPA: <strong>{edu.gpa || 'N/A'}</strong></div>
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section className="fresher-section">
        <h2 className="fresher-heading">TECHNICAL & SOFT SKILLS</h2>
        <div className="fresher-skills-grid">
          {resume.optimizedSkills.map((group, idx) => (
            <div key={idx} className="fresher-skill-item">
              <strong>{group.category}:</strong> {group.skills.join(', ')}
            </div>
          ))}
        </div>
      </section>

      {/* Key Projects */}
      <section className="fresher-section">
        <h2 className="fresher-heading">CAPSTONE & ACADEMIC PROJECTS</h2>
        {resume.selectedProjects.map(proj => (
          <div key={proj.id} className="fresher-proj-card">
            <div className="fresher-proj-header">
              <span className="fresher-proj-title">{proj.title}</span>
              <span className="fresher-tech">[{proj.techStack.join(', ')}]</span>
            </div>
            <p className="fresher-desc">{proj.description}</p>
            <ul className="fresher-bullets">
              {proj.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Work / Internship Experience */}
      {resume.optimizedExperiences.length > 0 && (
        <section className="fresher-section">
          <h2 className="fresher-heading">INTERNSHIPS & PRACTICAL EXPERIENCE</h2>
          {resume.optimizedExperiences.map(exp => (
            <div key={exp.id} className="fresher-exp-card">
              <div className="fresher-proj-header">
                <span className="fresher-proj-title">{exp.jobTitle} @ {exp.company}</span>
                <span className="fresher-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul className="fresher-bullets">
                {exp.responsibilities.map((resp, bIdx) => (
                  <li key={bIdx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Achievements */}
      <section className="fresher-section">
        <h2 className="fresher-heading">HONORS, CERTIFICATIONS & DSA</h2>
        <ul className="fresher-bullets">
          {resume.certifications.map(cert => (
            <li key={cert.id}>
              🏆 <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
            </li>
          ))}
          {profile.achievements.map(ach => (
            <li key={ach.id}>
              ⭐ <strong>{ach.title}:</strong> {ach.description}
            </li>
          ))}
          {profile.dsaProfiles?.map((dsa, dIdx) => (
            <li key={`dsa-${dIdx}`}>⚡ <strong>DSA Profile:</strong> {dsa}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
