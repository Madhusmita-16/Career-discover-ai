import React, { useState, useEffect } from 'react';
import { Search, Briefcase, FileText, Calendar, Building2, Sparkles, X, ArrowRight } from 'lucide-react';
import type { TabType } from '../layout/Sidebar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
}

export const CommandPaletteModal: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { title: 'Search Java Developer Jobs', tab: 'jobs' as TabType, icon: Briefcase, category: 'Jobs' },
    { title: 'Analyze Job URL or Description', tab: 'job-analyzer' as TabType, icon: FileText, category: 'Tools' },
    { title: 'Open Resume Studio & ATS Templates', tab: 'editor' as TabType, icon: FileText, category: 'Resume' },
    { title: 'Ask Career AI Co-Pilot', tab: 'career-chat' as TabType, icon: Sparkles, category: 'AI' },
    { title: 'Browse Hackathons & Conferences', tab: 'opportunities' as TabType, icon: Calendar, category: 'Events' },
    { title: 'View Target Companies', tab: 'dashboard' as TabType, icon: Building2, category: 'Companies' },
  ];

  const filtered = query.trim() === ''
    ? quickActions
    : quickActions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(9, 9, 11, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh'
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '740px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text"
            placeholder="Type a command or search jobs, companies, skills, events..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              padding: 0
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Nothing matched this search. Your filters might be feeling ambitious.
            </div>
          ) : (
            filtered.map((action, idx) => {
              const IconComp = action.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    onNavigate(action.tab);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '0.4rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-main)',
                      color: 'var(--primary)'
                    }}>
                      <IconComp size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {action.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Category: {action.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div style={{
          padding: '0.65rem 1.25rem',
          backgroundColor: 'var(--bg-main)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Press ESC to close</span>
          <span>CareerDiscoverAI Quick Command</span>
        </div>
      </div>
    </div>
  );
};
