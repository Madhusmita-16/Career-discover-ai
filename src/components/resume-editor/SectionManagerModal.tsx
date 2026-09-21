import React, { useState } from 'react';
import type { SectionConfig, CustomSection } from '../../types/resume';
import { X, ArrowUp, ArrowDown, Eye, EyeOff, Plus, Trash2, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  sectionsConfig: SectionConfig[];
  customSections: CustomSection[];
  onClose: () => void;
  onUpdateSections: (newSections: SectionConfig[], newCustomSections: CustomSection[]) => void;
}

const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Professional Summary', enabled: true, order: 1 },
  { id: 'skills', title: 'Technical Skills', enabled: true, order: 2 },
  { id: 'experience', title: 'Work Experience', enabled: true, order: 3 },
  { id: 'internships', title: 'Internships', enabled: true, order: 4 },
  { id: 'projects', title: 'Technical Projects', enabled: true, order: 5 },
  { id: 'education', title: 'Education', enabled: true, order: 6 },
  { id: 'certifications', title: 'Certifications', enabled: true, order: 7 },
  { id: 'achievements', title: 'Achievements & Honors', enabled: true, order: 8 },
  { id: 'publications', title: 'Publications', enabled: false, order: 9 },
  { id: 'opensource', title: 'Open-Source Contributions', enabled: false, order: 10 },
  { id: 'languages', title: 'Languages', enabled: true, order: 11 }
];

export const SectionManagerModal: React.FC<Props> = ({
  isOpen,
  sectionsConfig = DEFAULT_SECTIONS,
  customSections = [],
  onClose,
  onUpdateSections
}) => {
  const [sections, setSections] = useState<SectionConfig[]>(
    sectionsConfig.length ? sectionsConfig : DEFAULT_SECTIONS
  );
  const [customList, setCustomList] = useState<CustomSection[]>(customSections);
  const [newCustomTitle, setNewCustomTitle] = useState('');
  const [newCustomContent, setNewCustomContent] = useState('');
  const [showAddCustomForm, setShowAddCustomForm] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;
    
    // update order sequence
    const updated = newArr.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSections(updated);
  };

  const handleRename = (id: string, newTitle: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleAddCustom = () => {
    if (!newCustomTitle.trim()) return;
    const newCustom: CustomSection = {
      id: 'custom-' + Date.now(),
      title: newCustomTitle.trim(),
      content: newCustomContent.trim()
    };
    setCustomList([...customList, newCustom]);

    // Also add to section configs
    const newSecConfig: SectionConfig = {
      id: newCustom.id,
      title: newCustom.title,
      enabled: true,
      order: sections.length + 1
    };
    setSections([...sections, newSecConfig]);

    setNewCustomTitle('');
    setNewCustomContent('');
    setShowAddCustomForm(false);
  };

  const handleDeleteCustom = (id: string) => {
    setCustomList(prev => prev.filter(c => c.id !== id));
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = () => {
    onUpdateSections(sections, customList);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '650px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="#2563eb" />
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Manage Resume Sections & Ordering</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* List of Sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>
            Reorder, rename, or toggle visibility for dynamic resume sections. Empty or disabled sections are automatically hidden in final exports.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sections.map((sec, index) => (
              <div 
                key={sec.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  background: sec.enabled ? '#ffffff' : '#f1f5f9',
                  opacity: sec.enabled ? 1 : 0.65
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', width: '20px' }}>
                    {index + 1}.
                  </span>
                  <input 
                    type="text"
                    value={sec.title}
                    onChange={(e) => handleRename(sec.id, e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      outline: 'none',
                      width: '80%'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button 
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    style={{ background: 'transparent', border: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', padding: '4px' }}
                    title="Move Up"
                  >
                    <ArrowUp size={16} color={index === 0 ? '#cbd5e1' : '#475569'} />
                  </button>

                  <button 
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === sections.length - 1}
                    style={{ background: 'transparent', border: 'none', cursor: index === sections.length - 1 ? 'not-allowed' : 'pointer', padding: '4px' }}
                    title="Move Down"
                  >
                    <ArrowDown size={16} color={index === sections.length - 1 ? '#cbd5e1' : '#475569'} />
                  </button>

                  <button 
                    onClick={() => handleToggle(sec.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                    title={sec.enabled ? 'Hide Section' : 'Show Section'}
                  >
                    {sec.enabled ? <Eye size={18} color="#16a34a" /> : <EyeOff size={18} color="#94a3b8" />}
                  </button>

                  {sec.id.startsWith('custom-') && (
                    <button 
                      onClick={() => handleDeleteCustom(sec.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                      title="Delete Custom Section"
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Section Toggle */}
          <div style={{ marginTop: '1.25rem' }}>
            {!showAddCustomForm ? (
              <button 
                onClick={() => setShowAddCustomForm(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-subtle, #f8fafc)',
                  border: '1px dashed #2563eb',
                  color: '#2563eb',
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  justifyContent: 'center',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} /> Add Custom Section
              </button>
            ) : (
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Create Custom Section</h4>
                <input 
                  type="text"
                  placeholder="Section Title (e.g. Volunteer Work)"
                  value={newCustomTitle}
                  onChange={(e) => setNewCustomTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '0.5rem', fontSize: '0.85rem' }}
                />
                <textarea 
                  placeholder="Section Content / Highlights..."
                  value={newCustomContent}
                  onChange={(e) => setNewCustomContent(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '0.75rem', fontSize: '0.85rem', height: '60px' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button className="btn-secondary" onClick={() => setShowAddCustomForm(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleAddCustom}>Add Section</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          background: '#f8fafc'
        }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};
