import React, { useState, useMemo } from 'react';
import type { ResumeTemplateId, OptimizedResume, CandidateProfile, TemplateMetadata } from '../../types/resume';
import { templatesRegistry } from '../../data/templatesRegistry';
import { TemplateRenderer } from './TemplateRenderer';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Briefcase,
  Layers
} from 'lucide-react';

interface Props {
  currentTemplateId: ResumeTemplateId;
  resume: OptimizedResume;
  profile: CandidateProfile;
  onSelectTemplate: (templateId: ResumeTemplateId) => void;
  onProceedToEditor: () => void;
}

export const TemplateGallery: React.FC<Props> = ({
  currentTemplateId,
  resume,
  profile,
  onSelectTemplate,
  onProceedToEditor
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedExp, setSelectedExp] = useState<string>('All');

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter Logic
  const filteredTemplates = useMemo(() => {
    return templatesRegistry.filter(t => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.recommendedRole.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = 
        selectedRole === 'All' || 
        t.roleCategory === selectedRole ||
        t.recommendedRole.toLowerCase().includes(selectedRole.toLowerCase());

      // Style filter
      const matchesStyle = 
        selectedStyle === 'All' || 
        t.styleCategory === selectedStyle;

      // Experience filter
      const matchesExp = 
        selectedExp === 'All' || 
        t.experienceCategory === selectedExp ||
        t.experienceCategory === 'All Levels';

      return matchesSearch && matchesRole && matchesStyle && matchesExp;
    });
  }, [searchQuery, selectedRole, selectedStyle, selectedExp]);

  const activeFiltersCount = (selectedRole !== 'All' ? 1 : 0) + 
                            (selectedStyle !== 'All' ? 1 : 0) + 
                            (selectedExp !== 'All' ? 1 : 0) + 
                            (searchQuery ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedStyle('All');
    setSelectedExp('All');
  };

  const handleUseTemplate = (templateId: ResumeTemplateId) => {
    onSelectTemplate(templateId);
    onProceedToEditor();
  };

  return (
    <div className="template-gallery-container fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Gallery Hero Banner */}
      <div className="dashboard-greeting-hero" style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
      }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid rgba(96, 165, 250, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>20 Unique Professional ATS Resume Templates</span>
          </div>
          <h1 className="greeting-title" style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', fontWeight: 800, color: '#ffffff' }}>
            Resume & CV Template Library
          </h1>
          <p className="greeting-sub" style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
            Choose from 20 distinct visual identities designed for different industries, roles, and career stages. All 100% ATS-compliant and customizable.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          <button className="btn-primary" onClick={onProceedToEditor} style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
            <span>Open Resume Editor</span>
            <ArrowRight size={18} />
          </button>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Active Template: <strong>{templatesRegistry.find(t => t.id === currentTemplateId)?.name || 'Modern Minimal'}</strong>
          </span>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div style={{
        background: 'var(--bg-card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '14px',
        padding: '1.25rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text"
              placeholder="Search templates, tags, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                border: '1px solid var(--border, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                outline: 'none',
                background: 'var(--bg-subtle, #f8fafc)'
              }}
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--border, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'var(--bg-subtle, #f8fafc)',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Recommended Roles</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full-Stack Developer">Full-Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Product Engineer">Product Engineer</option>
              <option value="Student">Student / Fresher</option>
              <option value="Graduate">Graduate</option>
              <option value="Experienced Professional">Experienced / Executive</option>
            </select>
          </div>

          {/* Style Filter */}
          <div>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--border, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'var(--bg-subtle, #f8fafc)',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Design Styles</option>
              <option value="ATS">ATS Classic & Proof</option>
              <option value="Minimal">Minimal & Clean</option>
              <option value="Modern">Modern Tech</option>
              <option value="Corporate">Corporate & MNC</option>
              <option value="Creative">Creative Tech</option>
              <option value="Executive">Executive & Leadership</option>
              <option value="Technical">Technical & Engineering</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--border, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'var(--bg-subtle, #f8fafc)',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Experience Levels</option>
              <option value="Fresher">Fresher / Graduate</option>
              <option value="0–2 years">0–2 years (Early Career)</option>
              <option value="2–5 years">2–5 years (Mid Level)</option>
              <option value="5+ years">5+ years (Senior / Lead)</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        {activeFiltersCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border, #e2e8f0)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span>Showing <strong>{filteredTemplates.length}</strong> of 20 templates matching active filters</span>
            <button 
              onClick={handleResetFilters}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
            >
              <RotateCcw size={14} /> Clear Filters ({activeFiltersCount})
            </button>
          </div>
        )}
      </div>

      {/* 20 TEMPLATES RESPONSIVE GRID (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
      <div 
        className="templates-responsive-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}
      >
        {filteredTemplates.map(t => {
          const isActive = currentTemplateId === t.id;
          return (
            <div 
              key={t.id} 
              className="template-card-item"
              style={{ 
                background: 'var(--bg-card, #ffffff)',
                border: isActive ? '2px solid #2563eb' : '1px solid var(--border, #e2e8f0)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isActive ? '0 8px 24px rgba(37, 99, 235, 0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    background: isActive ? '#2563eb' : '#0f172a',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {t.number}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main, #0f172a)' }}>
                    {t.name.split('—')[1]?.trim() || t.name}
                  </span>
                </div>

                {t.isRecommended && (
                  <span style={{
                    background: '#dcfce7',
                    color: '#15803d',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    Recommended
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary, #64748b)',
                marginBottom: '0.75rem',
                height: '38px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.4'
              }}>
                {t.shortDescription}
              </p>

              {/* Mini Interactive Thumbnail Preview Frame */}
              <div 
                style={{ 
                  height: '240px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border, #cbd5e1)', 
                  borderRadius: '10px', 
                  background: '#ffffff', 
                  padding: '0.5rem', 
                  zoom: 0.35,
                  position: 'relative',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <TemplateRenderer resume={{ ...resume, templateId: t.id }} profile={profile} />
              </div>

              {/* ATS Indicator & Tags */}
              <div style={{ margin: '0.75rem 0 0.5rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary, #64748b)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={12} /> {t.recommendedRole.split(',')[0]}
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <ShieldCheck size={12} /> {t.atsCompatibilityScore}% ATS
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {t.tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        background: 'var(--bg-subtle, #f1f5f9)',
                        color: 'var(--text-secondary, #475569)',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setPreviewTemplate(t);
                    setIsPreviewOpen(true);
                  }}
                  style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.8rem' }}
                >
                  <Eye size={14} />
                  <span>Preview</span>
                </button>

                <button
                  className={isActive ? 'btn-primary' : 'btn-secondary'}
                  onClick={() => handleUseTemplate(t.id)}
                  style={{ 
                    justifyContent: 'center', 
                    padding: '0.5rem', 
                    fontSize: '0.8rem',
                    background: isActive ? '#2563eb' : undefined,
                    color: isActive ? '#ffffff' : undefined
                  }}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Active</span>
                    </>
                  ) : (
                    <span>Use Template</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <Layers size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>No templates match your filter criteria</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Try clearing some filters or searching for standard keywords like "Java" or "ATS".</p>
          <button className="btn-primary" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Full-Screen Preview Modal */}
      <TemplatePreviewModal 
        template={previewTemplate}
        isOpen={isPreviewOpen}
        resume={resume}
        profile={profile}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewTemplate(null);
        }}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
};
