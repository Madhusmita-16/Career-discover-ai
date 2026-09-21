import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { GitCompare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  profile: CandidateProfile;
  resume: OptimizedResume;
  onProceedToTemplates: () => void;
}

export const DiffViewer: React.FC<Props> = ({ profile, resume, onProceedToTemplates }) => {
  return (
    <div className="diff-viewer-container fade-in">
      {/* Hero Header */}
      <div className="diff-hero">
        <div>
          <div className="hero-badge"><GitCompare size={16} /> Module 6 — Side-by-Side Diff Inspector</div>
          <h1 className="hero-title">Master Profile vs AI Optimized Resume Diff</h1>
          <p className="hero-subtitle">
            Compare changes made by the AI Engine to tailor your resume for <strong>{resume.targetTitle}</strong>.
          </p>
        </div>
        <button className="primary-action-btn" onClick={onProceedToTemplates}>
          <span>Render in Corporate Templates</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Summary Comparison Card */}
      <div className="diff-card">
        <h2 className="diff-card-title"><Sparkles size={18} /> Professional Summary Transformation</h2>
        <div className="diff-columns-grid">
          <div className="diff-col col-original">
            <div className="col-header">Original Master Summary</div>
            <div className="col-body">{profile.personalInfo.summary}</div>
          </div>
          <div className="diff-col col-optimized">
            <div className="col-header">AI Job-Tailored Summary</div>
            <div className="col-body">{resume.summary}</div>
          </div>
        </div>
      </div>

      {/* Work Experience Bullets Comparison */}
      <div className="diff-card">
        <h2 className="diff-card-title"><Sparkles size={18} /> Experience Action Verbs & Keyword Optimization</h2>
        <div className="diff-columns-grid">
          <div className="diff-col col-original">
            <div className="col-header">Original Experience Responsibilities</div>
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="diff-exp-group">
                <strong>{exp.jobTitle} @ {exp.company}</strong>
                <ul>
                  {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="diff-col col-optimized">
            <div className="col-header">Optimized Action Verbs & Metrics</div>
            {resume.optimizedExperiences.map((exp) => (
              <div key={exp.id} className="diff-exp-group">
                <strong>{exp.jobTitle} @ {exp.company}</strong>
                <ul>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="diff-highlight-bullet">
                      <CheckCircle2 size={14} className="icon-green" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligent Project Selection Comparison */}
      <div className="diff-card">
        <h2 className="diff-card-title"><Sparkles size={18} /> Intelligent Project Selection ({resume.selectedProjects.length} Selected out of {profile.projects.length})</h2>
        <div className="diff-columns-grid">
          <div className="diff-col col-original">
            <div className="col-header">All Candidate Projects Pool ({profile.projects.length})</div>
            {profile.projects.map(p => (
              <div key={p.id} className="diff-proj-item">
                <strong>{p.title}</strong>
                <div>Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>

          <div className="diff-col col-optimized">
            <div className="col-header">Prioritized Projects for {resume.targetTitle}</div>
            {resume.selectedProjects.map(p => (
              <div key={p.id} className="diff-proj-item proj-selected">
                <span className="badge-selected">Selected</span>
                <strong>{p.title}</strong>
                <div>Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
