import React, { useState } from 'react';
import type { OptimizedResume, CandidateProfile, ResumeTemplateId, SectionConfig, CustomSection } from '../../types/resume';
import { templatesRegistry } from '../../data/templatesRegistry';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { SectionManagerModal } from '../resume-editor/SectionManagerModal';
import { triggerPDFPrint, exportResumeAsPlainText } from '../../utils/exportUtils';
import { 
  Download, 
  FileText, 
  Layout, 
  Palette, 
  Save, 
  Type, 
  Maximize2, 
  Smartphone, 
  Monitor, 
  Layers, 
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
  onUpdateTemplate: (templateId: ResumeTemplateId) => void;
  onUpdatePrimaryColor: (color: string) => void;
  onSaveVersion: () => void;
  onUpdateSettings?: (newSettings: any) => void;
}

export const ResumePreview: React.FC<Props> = ({
  resume,
  profile,
  onUpdateTemplate,
  onUpdatePrimaryColor,
  onSaveVersion,
  onUpdateSettings
}) => {
  // Customization & View States
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSectionManagerOpen, setIsSectionManagerOpen] = useState(false);
  const [customHex, setCustomHex] = useState(resume.customSettings?.primaryColor || '#2563eb');

  const settings = resume.customSettings || {
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal',
    showIcons: true
  };

  // 10 Curated Palettes
  const colorPalettes = [
    { name: 'Classic Black', hex: '#111827' },
    { name: 'Navy Blue', hex: '#1e3a8a' },
    { name: 'Corporate Blue', hex: '#2563eb' },
    { name: 'Slate', hex: '#334155' },
    { name: 'Charcoal', hex: '#1f2937' },
    { name: 'Deep Green', hex: '#065f46' },
    { name: 'Burgundy', hex: '#831843' },
    { name: 'Teal', hex: '#0f766e' },
    { name: 'Indigo', hex: '#4338ca' },
    { name: 'Minimal Gray', hex: '#4b5563' }
  ];

  // 8 Supported Fonts
  const supportedFonts = [
    'Inter', 'Arial', 'Calibri', 'Aptos', 'Helvetica', 'Georgia', 'Source Sans', 'Roboto'
  ];

  const handleExportPDF = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    triggerPDFPrint();
  };

  const handleFontChange = (fontFamily: string) => {
    if (onUpdateSettings) {
      onUpdateSettings({ ...settings, fontFamily });
    }
  };

  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    if (onUpdateSettings) {
      onUpdateSettings({ ...settings, fontSize });
    }
  };

  const handleSpacingChange = (spacing: 'compact' | 'normal' | 'spacious') => {
    if (onUpdateSettings) {
      onUpdateSettings({ ...settings, spacing });
    }
  };

  const handleUpdateSections = (sectionsConfig: SectionConfig[], customSections: CustomSection[]) => {
    if (onUpdateSettings) {
      onUpdateSettings({ ...settings, sectionsConfig, customSections });
    }
  };

  return (
    <div className="resume-preview-container fade-in">
      {/* Top Toolbar */}
      <div className="preview-toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="toolbar-left">
          <div className="toolbar-title-group">
            <Layout size={20} className="icon-green" />
            <div>
              <h2 className="toolbar-title">
                Template Preview ({templatesRegistry.find(t => t.id === resume.templateId)?.name || '02 — MODERN MINIMAL'})
              </h2>
              <p className="toolbar-subtitle">
                Target Role: <strong>{resume.targetTitle}</strong> | ATS Score: <span className="score-badge-inline">{resume.score?.overallATSScore || 98}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="toolbar-right">
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-subtle, #f1f5f9)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2px' }}>
            <button 
              onClick={() => setViewMode('desktop')}
              style={{
                background: viewMode === 'desktop' ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: viewMode === 'desktop' ? '#2563eb' : '#64748b'
              }}
            >
              <Monitor size={14} /> Desktop
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              style={{
                background: viewMode === 'mobile' ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: viewMode === 'mobile' ? '#2563eb' : '#64748b'
              }}
            >
              <Smartphone size={14} /> Mobile
            </button>
          </div>

          <button className="secondary-action-btn" onClick={() => setIsSectionManagerOpen(true)}>
            <Layers size={16} /> Reorder / Manage Sections
          </button>

          <button className="secondary-action-btn" onClick={() => exportResumeAsPlainText(resume)}>
            <FileText size={16} /> Plain Text
          </button>

          <button className="secondary-action-btn" onClick={onSaveVersion}>
            <Save size={16} /> Save Version
          </button>

          <button className="primary-action-btn" onClick={handleExportPDF}>
            <Download size={16} /> PDF Export / Print
          </button>
        </div>
      </div>

      {/* Expanded Customization Control Panel Bar */}
      <div className="template-controls-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', padding: '1rem', background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '1.25rem' }}>
        {/* Template Quick Dropdown Switcher */}
        <div className="control-group">
          <span className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}>
            <Layout size={14} /> Template:
          </span>
          <select
            value={resume.templateId}
            onChange={(e) => onUpdateTemplate(e.target.value as ResumeTemplateId)}
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--border, #cbd5e1)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'var(--bg-subtle, #f8fafc)',
              cursor: 'pointer'
            }}
          >
            {templatesRegistry.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Font Family Switcher */}
        <div className="control-group">
          <span className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}>
            <Type size={14} /> Font Family:
          </span>
          <select
            value={settings.fontFamily || 'Inter'}
            onChange={(e) => handleFontChange(e.target.value)}
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--border, #cbd5e1)',
              fontSize: '0.85rem',
              background: 'var(--bg-subtle, #f8fafc)',
              cursor: 'pointer'
            }}
          >
            {supportedFonts.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Font Size Scale */}
        <div className="control-group">
          <span className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}>
            <Maximize2 size={14} /> Size:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['small', 'medium', 'large'] as const).map(size => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  background: (settings.fontSize || 'medium') === size ? '#2563eb' : 'transparent',
                  color: (settings.fontSize || 'medium') === size ? '#ffffff' : 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing Scale */}
        <div className="control-group">
          <span className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}>
            <Sliders size={14} /> Spacing:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['compact', 'normal', 'spacious'] as const).map(sp => (
              <button
                key={sp}
                onClick={() => handleSpacingChange(sp)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  background: (settings.spacing || 'normal') === sp ? '#2563eb' : 'transparent',
                  color: (settings.spacing || 'normal') === sp ? '#ffffff' : 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Professional Color Palettes + Custom Picker */}
        <div className="control-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}>
            <Palette size={14} /> Accent Color:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {colorPalettes.map(p => (
              <button
                key={p.hex}
                title={p.name}
                onClick={() => onUpdatePrimaryColor(p.hex)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: p.hex,
                  border: (settings.primaryColor || '#2563eb') === p.hex ? '2px solid #ffffff' : 'none',
                  boxShadow: (settings.primaryColor || '#2563eb') === p.hex ? '0 0 0 2px #2563eb' : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
              />
            ))}
            
            {/* Custom Color Input */}
            <input 
              type="color"
              value={customHex}
              onChange={(e) => {
                setCustomHex(e.target.value);
                onUpdatePrimaryColor(e.target.value);
              }}
              style={{ width: '24px', height: '24px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              title="Custom Hex Color Picker"
            />
          </div>
        </div>
      </div>

      {/* Main Canvas Paper View (Supports Desktop or Scaled Mobile View) */}
      <div 
        className="paper-canvas-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 1rem',
          background: '#f1f5f9',
          borderRadius: '12px',
          minHeight: '600px'
        }}
      >
        <div 
          className="printable-canvas-area" 
          id="resume-printable-node"
          style={{
            width: '100%',
            maxWidth: viewMode === 'mobile' ? '375px' : '820px',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            borderRadius: '4px',
            padding: viewMode === 'mobile' ? '1rem' : '2.25rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <TemplateRenderer resume={resume} profile={profile} />
        </div>
      </div>

      {/* Section Manager Modal */}
      <SectionManagerModal 
        isOpen={isSectionManagerOpen}
        sectionsConfig={settings.sectionsConfig || []}
        customSections={settings.customSections || []}
        onClose={() => setIsSectionManagerOpen(false)}
        onUpdateSections={handleUpdateSections}
      />
    </div>
  );
};
