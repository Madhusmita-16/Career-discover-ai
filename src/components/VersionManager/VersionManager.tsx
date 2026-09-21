import React from 'react';
import type { ResumeVersion } from '../../types/resume';
import { RefreshCw, Trash2, ArrowRight, Calendar, Briefcase, Award } from 'lucide-react';

interface Props {
  versions: ResumeVersion[];
  onLoadVersion: (version: ResumeVersion) => void;
  onDeleteVersion: (versionId: string) => void;
  onProceedToJd: () => void;
}

export const VersionManager: React.FC<Props> = ({
  versions,
  onLoadVersion,
  onDeleteVersion,
  onProceedToJd
}) => {
  return (
    <div className="version-manager-container fade-in">
      <div className="version-hero">
        <div>
          <div className="hero-badge"><RefreshCw size={16} /> Saved Resume Versions</div>
          <h1 className="hero-title">Job-Specific Resume Application History</h1>
          <p className="hero-subtitle">
            Manage your tailored resume variations (e.g. Amazon Java Backend, TCS Full Stack, Startup React Developer).
          </p>
        </div>
        <button className="primary-action-btn" onClick={onProceedToJd}>
          <span>Create New Tailored Resume</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {versions.length === 0 ? (
        <div className="empty-versions-card">
          <RefreshCw size={48} className="empty-icon" />
          <h3>No Saved Resume Versions Yet</h3>
          <p>Analyze a Job Description and click "Save Version" in the Preview tab to store tailored resumes here.</p>
          <button className="primary-action-btn" onClick={onProceedToJd}>Start Job Analysis</button>
        </div>
      ) : (
        <div className="versions-grid">
          {versions.map(v => (
            <div key={v.id} className="version-card">
              <div className="version-card-header">
                <div>
                  <h3 className="version-name">{v.versionName}</h3>
                  <div className="version-role"><Briefcase size={14} /> {v.targetRole}</div>
                </div>
                <div className="score-badge-circle">{v.optimizedResume.score.overallATSScore}%</div>
              </div>

              <div className="version-card-body">
                <div className="version-meta"><Calendar size={14} /> Saved on: {v.dateSaved}</div>
                <div className="version-meta"><Award size={14} /> Template: {v.optimizedResume.templateId}</div>
                <p className="version-summary">{v.optimizedResume.summary}</p>
              </div>

              <div className="version-card-footer">
                <button className="delete-icon-btn" onClick={() => onDeleteVersion(v.id)}>
                  <Trash2 size={16} /> Delete
                </button>
                <button className="primary-action-btn" onClick={() => onLoadVersion(v)}>
                  Load Version <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
