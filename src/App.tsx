import { useState, useEffect, useMemo } from 'react';
import { Sidebar, type TabType } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Login } from './components/auth/Login';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProfileBuilder } from './components/profile/ProfileBuilder';
import { JobAnalyzerHero } from './components/jd-analyzer/JobAnalyzerHero';
import { MatchingDashboard } from './components/matching/MatchingDashboard';
import { ResumeEditorWorkspace } from './components/resume-editor/ResumeEditorWorkspace';
import { TemplateGallery } from './components/templates/TemplateGallery';
import { DiffViewer } from './components/diff-viewer/DiffViewer';
import { VersionManager } from './components/version-manager/VersionManager';

// CareerOS AI Feature Views
import { JobDiscoveryHub } from './components/jobs/JobDiscoveryHub';
import { ApplicationTrackerView } from './components/applications/ApplicationTrackerView';
import { OpportunitiesHub } from './components/opportunities/OpportunitiesHub';
import { SkillGapView } from './components/skill-gap/SkillGapView';
import { InterviewPrepView } from './components/interview/InterviewPrepView';
import { AICareerChatPanel } from './components/chat/AICareerChatPanel';
import { AgentMonitorView } from './components/admin/AgentMonitorView';

// Modals
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { LogoutModal } from './components/auth/LogoutModal';

import type { 
  CandidateProfile, 
  JobDescriptionData, 
  MatchAnalysis, 
  OptimizedResume, 
  ResumeTemplateId, 
  ResumeVersion,
  JobListing 
} from './types/resume';
import { getCandidateProfile, saveCandidateProfile, getSavedVersions, deleteResumeVersion } from './services/storageService';
import { parseJobDescription } from './services/jdIntelligence';
import { sampleJDs } from './data/sampleJDs';
import { mockJobListings } from './services/jobDiscoveryAgent';
import { analyzeMatch } from './services/matchingEngine';
import { generateOptimizedResume } from './services/aiOptimizer';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [templateId, setTemplateId] = useState<ResumeTemplateId>('modern-minimal');
  const [primaryColor] = useState<string>('#2563EB');

  // Modal States
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isAIChatDrawerOpen, setIsAIChatDrawerOpen] = useState<boolean>(false);

  // Core Data States
  const [profile, setProfile] = useState<CandidateProfile>(() => getCandidateProfile());
  const [currentJd, setCurrentJd] = useState<JobDescriptionData>(() => parseJobDescription(sampleJDs[0].text, sampleJDs[0].title));
  const [savedVersions, setSavedVersions] = useState<ResumeVersion[]>(() => getSavedVersions());

  // Derived Optimization & Match States
  const matchAnalysis = useMemo<MatchAnalysis>(() => {
    return analyzeMatch(profile, currentJd);
  }, [profile, currentJd]);

  const optimizedResume = useMemo<OptimizedResume>(() => {
    const base = generateOptimizedResume(profile, currentJd, matchAnalysis, templateId);
    return {
      ...base,
      customSettings: {
        ...base.customSettings,
        primaryColor: primaryColor || '#2563EB'
      }
    };
  }, [profile, currentJd, matchAnalysis, templateId, primaryColor]);

  // Sync theme attribute to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handlers
  const handleSaveProfile = (updatedProfile: CandidateProfile) => {
    setProfile(updatedProfile);
    saveCandidateProfile(updatedProfile);
  };

  const handleAnalyzeJd = (newJd: JobDescriptionData) => {
    setCurrentJd(newJd);
  };

  const handleSelectJobForAnalysis = (job: JobListing) => {
    const parsed = parseJobDescription(job.description, job.title);
    parsed.companyName = job.company;
    parsed.location = job.location;
    setCurrentJd(parsed);
  };

  const handleSelectTemplate = (newTemplateId: ResumeTemplateId) => {
    setTemplateId(newTemplateId);
  };

  const handleDeleteVersion = (versionId: string) => {
    const updated = deleteResumeVersion(versionId);
    setSavedVersions(updated);
  };

  const handleOpenVersion = (version: ResumeVersion) => {
    const parsedJd = parseJobDescription(version.jdText, version.targetRole);
    setCurrentJd(parsedJd);
    setTemplateId(version.optimizedResume.templateId || 'modern-minimal');
    setActiveTab('editor');
  };

  const handleAcceptAISuggestion = (newBullet: string) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, idx) => 
        idx === 0 
          ? { ...exp, responsibilities: [newBullet, ...exp.responsibilities.slice(1)] }
          : exp
      )
    }));
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-layout-shell">
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="workspace-wrapper">
        <Header 
          userName={profile.personalInfo.fullName || 'Madhusmita Mishra'}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onCreateNewResume={() => setActiveTab('job-analyzer')}
          onToggleLandingMode={() => setActiveTab('landing')}
        />

        <main className="workspace-content">
          {activeTab === 'landing' && (
            <LandingPage onStartBuilding={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              userName={profile.personalInfo.fullName || 'Madhu'}
              savedVersions={savedVersions}
              recommendedJob={mockJobListings[0]}
              onCreateNewResume={() => setActiveTab('job-analyzer')}
              onOpenVersion={handleOpenVersion}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
              onSelectJobForAnalysis={handleSelectJobForAnalysis}
            />
          )}

          {activeTab === 'jobs' && (
            <JobDiscoveryHub 
              profile={profile}
              onSelectJobForAnalysis={handleSelectJobForAnalysis}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
            />
          )}

          {activeTab === 'job-analyzer' && (
            <JobAnalyzerHero 
              currentJd={currentJd}
              onAnalyzeJd={handleAnalyzeJd}
              onProceedToMatching={() => setActiveTab('matching' as TabType)}
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationTrackerView 
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesHub />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapView 
              profile={profile}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
            />
          )}

          {activeTab === 'interview-prep' && (
            <InterviewPrepView 
              profile={profile}
              currentJd={currentJd}
            />
          )}

          {activeTab === 'career-chat' && (
            <AICareerChatPanel 
              profile={profile}
              currentJd={currentJd}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileBuilder 
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'matching' as TabType && (
            <MatchingDashboard 
              match={matchAnalysis}
              scores={{ 
                overallATSScore: 85, 
                jdMatchScore: 90, 
                keywordCoverageScore: 88, 
                readabilityScore: 95, 
                experienceRelevanceScore: 92, 
                auditLogs: [] 
              }}
              onProceedToEditor={() => setActiveTab('editor')}
            />
          )}

          {activeTab === 'editor' && (
            <ResumeEditorWorkspace 
              resume={optimizedResume}
              profile={profile}
              onAcceptSuggestion={handleAcceptAISuggestion}
              onUpdateTemplate={handleSelectTemplate}
            />
          )}

          {activeTab === 'templates' && (
            <TemplateGallery 
              currentTemplateId={templateId}
              resume={optimizedResume}
              profile={profile}
              onSelectTemplate={handleSelectTemplate}
              onProceedToEditor={() => setActiveTab('editor')}
            />
          )}

          {activeTab === 'diff' && (
            <DiffViewer 
              profile={profile}
              resume={optimizedResume}
              onProceedToEditor={() => setActiveTab('editor')}
            />
          )}

          {activeTab === 'versions' && (
            <VersionManager 
              versions={savedVersions}
              currentResume={optimizedResume}
              onOpenVersion={handleOpenVersion}
              onDeleteVersion={handleDeleteVersion}
              onCreateNew={() => setActiveTab('job-analyzer')}
            />
          )}

          {activeTab === 'agent-monitor' && (
            <AgentMonitorView />
          )}
        </main>
      </div>

      {/* Floating Career AI Drawer */}
      {isAIChatDrawerOpen && (
        <AICareerChatPanel 
          profile={profile}
          currentJd={currentJd}
          isDrawer={true}
          onCloseDrawer={() => setIsAIChatDrawerOpen(false)}
        />
      )}

      {/* Floating Right 3D Bot Avatar (No background, pure bot avatar) */}
      <button
        onClick={() => setIsAIChatDrawerOpen(!isAIChatDrawerOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '28px',
          zIndex: 85,
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className="group hover:scale-110 active:scale-95"
        title="Career AI Co-Pilot — Click to open chat"
      >
        <img
          src="/career-ai-bot.png"
          alt="Career AI Bot"
          style={{
            width: '84px',
            height: '84px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 22px rgba(37, 99, 235, 0.45))',
            transition: 'filter 0.25s ease'
          }}
        />
      </button>

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPaletteModal 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={() => setIsAuthenticated(false)}
      />
    </div>
  );
}

export default App;
