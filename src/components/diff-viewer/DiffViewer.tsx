import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';
import { GitCompare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  profile: CandidateProfile;
  resume: OptimizedResume;
  onProceedToEditor: () => void;
}

export const DiffViewer: React.FC<Props> = ({ profile, resume, onProceedToEditor }) => {
  return (
    <div className="diff-viewer-container fade-in">
      {/* Header */}
      <div className="dashboard-greeting-hero">
        <div>
          <h1 className="greeting-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GitCompare size={24} color="var(--primary)" /> Side-by-Side Diff Viewer
          </h1>
          <p className="greeting-sub">
            Comparing Master Profile vs AI Job-Optimized Resume with inline highlights.
          </p>
        </div>
        <button className="btn-primary" onClick={onProceedToEditor}>
          <span>Open Workspace</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Diff Columns Container */}
      <div className="stat-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Master Profile Left Column */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', paddingBottom: '0.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--border)' }}>
              MASTER PROFILE
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Professional Summary</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                {profile.personalInfo.summary}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Experience Bullets</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                {profile.experiences[0]?.responsibilities.map((r, i) => (
                  <div key={i} style={{ marginBottom: '0.35rem' }}>• {r}</div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Optimized Resume Right Column */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary)', paddingBottom: '0.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary)' }}>
              AI OPTIMIZED RESUME
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                Professional Summary <span className="status-badge badge-matched" style={{ fontSize: '0.7rem' }}>Added Target Title</span>
              </div>
              <div className="diff-modified" style={{ fontSize: '0.85rem', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                {resume.summary}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                Optimized Action Verbs & Metrics <span className="status-badge badge-matched" style={{ fontSize: '0.7rem' }}>STAR Format</span>
              </div>
              <div style={{ fontSize: '0.83rem', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                {resume.optimizedExperiences[0]?.responsibilities.map((r, i) => (
                  <div key={i} className="diff-added" style={{ marginBottom: '0.4rem' }}>
                    <CheckCircle2 size={13} color="#16A34A" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
