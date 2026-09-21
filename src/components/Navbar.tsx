import React from 'react';
import { Sparkles, FileText, BarChart3, Layers, GitCompare, Moon, Sun, Download, RefreshCw } from 'lucide-react';

interface Props {
  activeTab: 'profile' | 'jd' | 'dashboard' | 'preview' | 'diff' | 'versions';
  setActiveTab: (tab: 'profile' | 'jd' | 'dashboard' | 'preview' | 'diff' | 'versions') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  savedVersionsCount: number;
  onQuickAnalyzeSample: () => void;
  onExportPDF: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  savedVersionsCount,
  onQuickAnalyzeSample,
  onExportPDF
}) => {
  return (
    <header className="app-navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-logo" onClick={() => setActiveTab('jd')}>
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-title">ResuMatch AI</span>
            <span className="logo-tagline">ATS & Corporate Resume Intelligence</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-menu">
          <button 
            className={`nav-btn ${activeTab === 'jd' ? 'active' : ''}`}
            onClick={() => setActiveTab('jd')}
          >
            <Sparkles className="btn-icon" />
            <span>1. JD Intelligence</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FileText className="btn-icon" />
            <span>2. Candidate Profile</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="btn-icon" />
            <span>3. ATS Scores & Gap Analysis</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Layers className="btn-icon" />
            <span>4. Resume Templates</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'diff' ? 'active' : ''}`}
            onClick={() => setActiveTab('diff')}
          >
            <GitCompare className="btn-icon" />
            <span>5. Diff Inspector</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'versions' ? 'active' : ''}`}
            onClick={() => setActiveTab('versions')}
          >
            <RefreshCw className="btn-icon" />
            <span>Versions ({savedVersionsCount})</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <button 
            className="quick-sample-btn"
            onClick={onQuickAnalyzeSample}
            title="1-Click Demo with Amazon Senior Java JD"
          >
            <Sparkles size={16} />
            <span>Demo Test Drive</span>
          </button>

          <button 
            className="action-btn pdf-btn"
            onClick={onExportPDF}
            title="Export high-res PDF"
          >
            <Download size={16} />
            <span>PDF Export</span>
          </button>

          <button 
            className="icon-toggle-btn"
            onClick={() => setDarkMode(prev => !prev)}
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
