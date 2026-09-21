import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Layout,
  Briefcase, 
  Calendar, 
  BrainCircuit, 
  BarChart2, 
  MessageSquare, 
  User, 
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

export type TabType = 
  | 'dashboard' 
  | 'jobs' 
  | 'job-analyzer' 
  | 'applications' 
  | 'opportunities' 
  | 'skill-gap' 
  | 'interview-prep' 
  | 'career-chat' 
  | 'profile' 
  | 'editor' 
  | 'templates' 
  | 'diff' 
  | 'versions' 
  | 'agent-monitor' 
  | 'landing';

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenLogoutModal: () => void;
}

export const Sidebar: React.FC<Props> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenLogoutModal
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      className="sidebar-container"
      style={{
        width: collapsed ? '72px' : '240px',
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="sidebar-top" style={{ padding: collapsed ? '1rem 0.5rem' : '1.25rem 1rem' }}>
        {/* Brand Logo Header */}
        <div 
          className="sidebar-brand" 
          onClick={() => handleSelectTab('dashboard')}
          style={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: collapsed ? 0 : '0.65rem'
          }}
        >
          <img 
            src="/careeros-logo.png" 
            alt="CareerDiscoverAI" 
            style={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain', 
              borderRadius: '6px',
              flexShrink: 0 
            }} 
          />
          {!collapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div className="brand-title" style={{ fontSize: '0.98rem', fontWeight: 800 }}>
                CareerDiscover <span style={{ color: 'var(--primary)' }}>AI</span>
              </div>
              <div className="brand-sub" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                Intelligent Career Workspace
              </div>
            </div>
          )}
        </div>

        {/* Navigation Section Groups */}
        <nav className="sidebar-nav">
          {/* GROUP: WORKSPACE */}
          {!collapsed && <div className="nav-group-label">WORKSPACE</div>}

          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleSelectTab('dashboard')}
            title="Overview Dashboard"
          >
            <LayoutDashboard size={18} />
            {!collapsed && <span>Overview</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => handleSelectTab('jobs')}
            title="Jobs Search & Matching"
          >
            <Search size={18} />
            {!collapsed && <span>Jobs</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => handleSelectTab('applications')}
            title="Application Tracker Kanban"
          >
            <Briefcase size={18} />
            {!collapsed && <span>Applications</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => handleSelectTab('editor')}
            title="Resume Studio"
          >
            <FileText size={18} />
            {!collapsed && <span>Resume Studio</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => handleSelectTab('templates')}
            title="20 Unique Resume Templates"
          >
            <Layout size={18} />
            {!collapsed && <span>Template Gallery</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'opportunities' ? 'active' : ''}`}
            onClick={() => handleSelectTab('opportunities')}
            title="Events & Hackathons"
          >
            <Calendar size={18} />
            {!collapsed && <span>Events</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'job-analyzer' ? 'active' : ''}`}
            onClick={() => handleSelectTab('job-analyzer')}
            title="Analyze Job Description"
          >
            <SlidersHorizontal size={18} />
            {!collapsed && <span>Job Analyzer</span>}
          </button>

          {/* GROUP: CAREER AI */}
          {!collapsed && <div className="nav-group-label" style={{ marginTop: '0.75rem' }}>CAREER AI</div>}

          <button 
            className={`nav-item ${activeTab === 'career-chat' ? 'active' : ''}`}
            onClick={() => handleSelectTab('career-chat')}
            title="AI Career Chat Co-Pilot"
          >
            <MessageSquare size={18} />
            {!collapsed && <span>AI Career Chat</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'skill-gap' ? 'active' : ''}`}
            onClick={() => handleSelectTab('skill-gap')}
            title="Skill Gap & Learning Roadmap"
          >
            <BarChart2 size={18} />
            {!collapsed && <span>Skill Gap</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'interview-prep' ? 'active' : ''}`}
            onClick={() => handleSelectTab('interview-prep')}
            title="Interview Coach"
          >
            <BrainCircuit size={18} />
            {!collapsed && <span>Interview Coach</span>}
          </button>

          {/* GROUP: INSIGHTS & SYSTEM */}
          {!collapsed && <div className="nav-group-label" style={{ marginTop: '0.75rem' }}>INSIGHTS</div>}

          <button 
            className={`nav-item ${activeTab === 'agent-monitor' ? 'active' : ''}`}
            onClick={() => handleSelectTab('agent-monitor')}
            title="System Agent Monitor"
          >
            <Activity size={18} />
            {!collapsed && <span>Agent Health</span>}
          </button>

          {/* GROUP: ACCOUNT */}
          {!collapsed && <div className="nav-group-label" style={{ marginTop: '0.75rem' }}>ACCOUNT</div>}

          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleSelectTab('profile')}
            title="Master Candidate Profile"
          >
            <User size={18} />
            {!collapsed && <span>Profile</span>}
          </button>
        </nav>
      </div>

      {/* Sidebar Footer & Separated Logout Action */}
      <div className="sidebar-bottom" style={{ padding: collapsed ? '0.75rem 0.5rem' : '1rem' }}>
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            padding: '0.45rem 0.65rem',
            marginBottom: '0.75rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            cursor: 'pointer'
          }}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {!collapsed && <span>Collapse Sidebar</span>}
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Visually Separated Logout Button */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
          <button
            onClick={onOpenLogoutModal}
            className="nav-item"
            style={{
              color: '#DC2626',
              justifyContent: collapsed ? 'center' : 'flex-start',
              backgroundColor: 'transparent'
            }}
            title="Sign out of CareerDiscoverAI"
          >
            <LogOut size={18} />
            {!collapsed && <span style={{ fontWeight: 600 }}>Sign out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
