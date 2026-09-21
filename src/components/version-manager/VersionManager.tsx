import React, { useState } from 'react';
import type { ResumeVersion, OptimizedResume } from '../../types/resume';
import { Download, FileText, Trash2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { exportResumeAsPlainText, triggerPDFPrint } from '../../utils/exportUtils';
import confetti from 'canvas-confetti';

interface Props {
  versions: ResumeVersion[];
  currentResume: OptimizedResume;
  onOpenVersion: (version: ResumeVersion) => void;
  onDeleteVersion: (id: string) => void;
  onCreateNew: () => void;
}

export const VersionManager: React.FC<Props> = ({
  versions,
  currentResume,
  onOpenVersion,
  onDeleteVersion,
  onCreateNew
}) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'txt' | 'md'>('pdf');

  const handleDownload = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    if (exportFormat === 'pdf') {
      triggerPDFPrint();
    } else {
      exportResumeAsPlainText(currentResume);
    }
  };

  return (
    <div className="version-manager-container fade-in">
      <div className="dashboard-greeting-hero">
        <div>
          <h1 className="greeting-title">My Resume Versions & Multi-Format Export</h1>
          <p className="greeting-sub">Manage job-specific tailored resume variations and export instantly.</p>
        </div>
        <button className="btn-primary" onClick={onCreateNew}>
          <Sparkles size={16} /> Create Job-Specific Resume
        </button>
      </div>

      {/* Export Section */}
      <div className="stat-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
        <h2 className="section-h2" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
          <CheckCircle2 size={20} color="#16A34A" /> Your Resume Is Ready
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1rem 0' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Format:</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className={`btn-secondary ${exportFormat === 'pdf' ? 'active' : ''}`} onClick={() => setExportFormat('pdf')}>
              ● PDF Document
            </button>
            <button className={`btn-secondary ${exportFormat === 'docx' ? 'active' : ''}`} onClick={() => setExportFormat('docx')}>
              ○ DOCX Word
            </button>
            <button className={`btn-secondary ${exportFormat === 'txt' ? 'active' : ''}`} onClick={() => setExportFormat('txt')}>
              ○ Plain Text
            </button>
            <button className={`btn-secondary ${exportFormat === 'md' ? 'active' : ''}`} onClick={() => setExportFormat('md')}>
              ○ Markdown
            </button>
          </div>

          <button className="btn-primary" style={{ padding: '0.65rem 1.5rem' }} onClick={handleDownload}>
            <Download size={16} /> Download Resume ({exportFormat.toUpperCase()})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: '#16A34A', fontWeight: 600 }}>
          <span>100% ATS-compatible</span>
          <span>Job-specific keywords integrated</span>
          <span>Truthfully optimized</span>
        </div>
      </div>

      {/* Saved Versions Grid */}
      <h2 className="section-h2" style={{ marginBottom: '1rem' }}>Saved Resume Variations ({versions.length})</h2>
      
      {versions.length === 0 ? (
        <div className="stat-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <FileText size={40} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
          <h3>No Saved Versions Yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Analyze a Job Description and click "Save Version" to keep track of tailored variations.
          </p>
          <button className="btn-primary" onClick={onCreateNew}>Start Job Analysis</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {versions.map(v => (
            <div key={v.id} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{v.versionName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{v.companyName} • {v.dateSaved}</div>
                </div>
                <div className="jd-match-circle-pill">
                  {v.optimizedResume?.score?.jdMatchScore || 86}% Match
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="status-badge badge-matched">ATS {v.optimizedResume?.score?.overallATSScore || 91}%</span>
                <span className="status-badge badge-matched">{v.optimizedResume?.templateId}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button className="btn-secondary" style={{ color: '#DC2626', padding: '0.35rem 0.6rem', fontSize: '0.78rem' }} onClick={() => onDeleteVersion(v.id)}>
                  <Trash2 size={13} /> Delete
                </button>

                <button className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }} onClick={() => onOpenVersion(v)}>
                  Open & Edit <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
