import React from 'react';
import type { TemplateMetadata, OptimizedResume, CandidateProfile } from '../../types/resume';
import { TemplateRenderer } from './TemplateRenderer';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  template: TemplateMetadata | null;
  isOpen: boolean;
  resume: OptimizedResume;
  profile: CandidateProfile;
  onClose: () => void;
  onUseTemplate: (templateId: TemplateMetadata['id']) => void;
}

export const TemplatePreviewModal: React.FC<Props> = ({
  template,
  isOpen,
  resume,
  profile,
  onClose,
  onUseTemplate
}) => {
  if (!isOpen || !template) return null;

  return (
    <div className="modal-overlay fade-in" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="modal-content" style={{
        background: 'var(--bg-card, #ffffff)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border, #e2e8f0)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border, #e2e8f0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-subtle, #f8fafc)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: 'var(--primary, #2563eb)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {template.number}
              </span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{template.name}</h3>
              {template.isRecommended && (
                <span style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  Recommended
                </span>
              )}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary, #64748b)' }}>
              {template.shortDescription}
            </p>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              color: 'var(--text-secondary, #64748b)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Full Paper Preview */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          background: '#f1f5f9',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            padding: '2rem'
          }}>
            <TemplateRenderer resume={{ ...resume, templateId: template.id }} profile={profile} />
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border, #e2e8f0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-subtle, #f8fafc)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
            <ShieldCheck size={18} color="#16a34a" />
            <span><strong>{template.atsCompatibilityScore}% ATS Score</strong> • Optimized for recruiters</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              className="btn-primary" 
              onClick={() => {
                onUseTemplate(template.id);
                onClose();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Use This Template</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
