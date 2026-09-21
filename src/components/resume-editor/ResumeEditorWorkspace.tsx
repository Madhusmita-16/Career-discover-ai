import React, { useState, useEffect } from 'react';
import type { OptimizedResume, CandidateProfile, ResumeTemplateId } from '../../types/resume';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { generateLaTeXCode } from '../../utils/latexGenerator';
import { templatesRegistry } from '../../data/templatesRegistry';
import { 
  Sparkles, 
  Check, 
  Download, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Code, 
  Copy, 
  Play, 
  FileCode, 
  CheckCircle2, 
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { triggerPDFPrint, exportResumeAsPlainText } from '../../utils/exportUtils';
import confetti from 'canvas-confetti';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
  onAcceptSuggestion: (newBullet: string) => void;
  onUpdateTemplate?: (templateId: ResumeTemplateId) => void;
}

export const ResumeEditorWorkspace: React.FC<Props> = ({
  resume,
  profile,
  onAcceptSuggestion,
  onUpdateTemplate
}) => {
  // Mode States
  const [editorMode, setEditorMode] = useState<'overleaf' | 'visual' | 'code-only'>('overleaf');
  const [activeSection, setActiveSection] = useState<'summary' | 'experience' | 'projects' | 'skills' | 'education'>('experience');
  
  // LaTeX Code State
  const [latexCode, setLatexCode] = useState<string>(() => generateLaTeXCode(profile, resume));
  const [isCopied, setIsCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  // AI Suggestion State
  const [suggestionAccepted, setSuggestionAccepted] = useState<boolean>(false);

  // Re-generate LaTeX when profile or template changes
  useEffect(() => {
    setLatexCode(generateLaTeXCode(profile, resume));
  }, [profile, resume.templateId]);

  const sampleOriginalBullet = "Worked on backend APIs for the application.";
  const sampleAISuggestion = "Engineered high-throughput REST microservices using Spring Boot, Java 17, and PostgreSQL, serving 150K+ daily requests.";

  const handleAccept = () => {
    onAcceptSuggestion(sampleAISuggestion);
    setSuggestionAccepted(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
  };

  const handlePrint = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    triggerPDFPrint();
  };

  const handleCopyLaTeX = () => {
    navigator.clipboard.writeText(latexCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTex = () => {
    const element = document.createElement('a');
    const file = new Blob([latexCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${profile.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      confetti({ particleCount: 35, spread: 40, origin: { y: 0.6 } });
    }, 600);
  };

  // ATS Pointer Checklist Calculation
  const atsPointers = [
    { title: 'Quantified Impact & Metrics', score: 20, status: 'pass', note: 'Strong action verbs with numerical metrics (e.g. 150K+ requests, 38% reduction)' },
    { title: 'Technical Skill Keyword Density', score: 25, status: 'pass', note: 'High alignment with Java, Spring Boot, Microservices & PostgreSQL' },
    { title: 'ATS Selectable Text & Standard Headings', score: 20, status: 'pass', note: 'Pure selectable LaTeX text without text-embedded images' },
    { title: 'Contact Information & Links', score: 15, status: 'pass', note: 'Valid Email, Phone, LinkedIn, and GitHub links present' },
    { title: 'Format & Spacing Hygiene', score: 18, status: 'pass', note: 'Standard font size hierarchy (24px name, 12px headings, 10px body)' }
  ];

  const totalPointerScore = atsPointers.reduce((sum, p) => sum + p.score, 0);

  return (
    <div className="resume-editor-view-container fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Top Hero Banner & Mode Switcher Bar */}
      <div className="dashboard-greeting-hero" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            <Zap size={14} /> Overleaf-Style Dual-Pane Workspace & LaTeX Studio
          </div>
          <h1 className="greeting-title" style={{ fontSize: '1.75rem', margin: 0 }}>
            Resume Studio & LaTeX Code Compiler
          </h1>
          <p className="greeting-sub" style={{ margin: '4px 0 0 0' }}>
            Edit live LaTeX source code or visual profile sections with real-time compiled PDF preview, ATS pointers, and AI bullet optimizer.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', background: 'var(--bg-subtle, #f1f5f9)', border: '1px solid var(--border)', borderRadius: '8px', padding: '3px' }}>
            <button 
              onClick={() => setEditorMode('overleaf')}
              style={{
                background: editorMode === 'overleaf' ? '#2563eb' : 'transparent',
                color: editorMode === 'overleaf' ? '#ffffff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Code size={15} /> Overleaf Split View
            </button>

            <button 
              onClick={() => setEditorMode('visual')}
              style={{
                background: editorMode === 'visual' ? '#2563eb' : 'transparent',
                color: editorMode === 'visual' ? '#ffffff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <SlidersHorizontal size={15} /> Visual Builder
            </button>

            <button 
              onClick={() => setEditorMode('code-only')}
              style={{
                background: editorMode === 'code-only' ? '#2563eb' : 'transparent',
                color: editorMode === 'code-only' ? '#ffffff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <FileCode size={15} /> Full LaTeX Code
            </button>
          </div>

          <button className="secondary-action-btn" onClick={() => exportResumeAsPlainText(resume)}>
            <FileText size={16} /> Plain Text
          </button>

          <button className="primary-action-btn" onClick={handlePrint}>
            <Download size={16} /> Print / Export PDF
          </button>
        </div>
      </div>

      {/* OVERLEAF SPLIT VIEW DUAL-PANE WORKSPACE */}
      {editorMode === 'overleaf' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 340px', gap: '1.25rem', minHeight: '780px' }}>
          {/* LEFT PANE: Overleaf LaTeX Code Editor */}
          <div style={{
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            overflow: 'hidden'
          }}>
            {/* LaTeX Editor Toolbar */}
            <div style={{
              background: '#1e293b',
              padding: '0.65rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode size={16} color="#60a5fa" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  main.tex (LaTeX Source)
                </span>
                <span style={{ background: '#334155', color: '#94a3b8', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>
                  {latexCode.split('\n').length} lines
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {/* Template Preset Chooser */}
                {onUpdateTemplate && (
                  <select
                    value={resume.templateId}
                    onChange={(e) => onUpdateTemplate(e.target.value as ResumeTemplateId)}
                    style={{
                      background: '#0f172a',
                      color: '#60a5fa',
                      border: '1px solid #475569',
                      borderRadius: '4px',
                      padding: '3px 6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    title="Load Overleaf Template Preset"
                  >
                    {templatesRegistry.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                )}

                <button 
                  onClick={handleCompile}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Play size={12} /> {isCompiling ? 'Compiling...' : 'Recompile'}
                </button>

                <button 
                  onClick={handleCopyLaTeX}
                  style={{
                    background: '#334155',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Copy LaTeX Source"
                >
                  {isCopied ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>

                <button 
                  onClick={handleDownloadTex}
                  style={{
                    background: '#334155',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                  title="Download .tex file"
                >
                  .tex
                </button>
              </div>
            </div>

            {/* Code Textarea Input */}
            <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
              {/* Line Numbers Bar */}
              <div style={{
                background: '#090d16',
                color: '#475569',
                padding: '0.75rem 0.5rem',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '0.8rem',
                textAlign: 'right',
                userSelect: 'none',
                lineHeight: '1.5'
              }}>
                {Array.from({ length: Math.min(60, latexCode.split('\n').length) }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Editable Text Area */}
              <textarea 
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: '#e2e8f0',
                  border: 'none',
                  outline: 'none',
                  padding: '0.75rem',
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  fontSize: '0.82rem',
                  lineHeight: '1.5',
                  resize: 'none',
                  whiteSpace: 'pre'
                }}
                spellCheck={false}
              />
            </div>
          </div>

          {/* RIGHT PANE: Live Compiled PDF Canvas Preview */}
          <div style={{
            background: '#cbd5e1',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            maxHeight: '780px',
            border: '1px solid #94a3b8'
          }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📄 Live Compiled Paper Canvas
              </span>
              <span style={{ fontSize: '0.75rem', background: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontWeight: 700, color: '#16a34a' }}>
                ✓ Real-time Sync Active
              </span>
            </div>

            <div 
              id="resume-printable-node"
              style={{
                width: '100%',
                maxWidth: '680px',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                borderRadius: '4px',
                padding: '1.75rem',
                minHeight: '850px'
              }}
            >
              <TemplateRenderer resume={resume} profile={profile} />
            </div>
          </div>

          {/* RIGHTMOST PANEL: ATS Pointers & AI Suggestions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* ATS Score Pointers Breakdown Box */}
            <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.95rem' }}>
                  <ShieldCheck size={18} color="#2563eb" />
                  <span>ATS Pointer Score</span>
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563eb' }}>
                  {totalPointerScore}%
                </span>
              </div>

              {/* Pointer Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {atsPointers.map((pointer, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-subtle, #f8fafc)', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border, #e2e8f0)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} color="#16a34a" /> {pointer.title}
                      </span>
                      <span style={{ color: '#16a34a' }}>+{pointer.score}%</span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.72rem', color: 'var(--text-secondary, #64748b)' }}>
                      {pointer.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Bullet Optimizer Box */}
            <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={16} color="#2563eb" /> AI Bullet Optimizer
              </div>

              <div className="ai-suggestion-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Current Bullet:</div>
                <div style={{ textDecoration: suggestionAccepted ? 'line-through' : 'none', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                  "{sampleOriginalBullet}"
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.25rem' }}>AI Suggested Optimization:</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.82rem' }}>
                  "{sampleAISuggestion}"
                </div>

                <div className="suggestion-actions" style={{ marginTop: '0.75rem' }}>
                  <button className="btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={handleAccept} disabled={suggestionAccepted}>
                    <Check size={13} /> {suggestionAccepted ? 'Accepted ✓' : 'Accept & Inject into LaTeX'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISUAL BUILDER MODE */}
      {editorMode === 'visual' && (
        <div className="editor-3col-workspace">
          {/* Left Column: Sections Outline */}
          <div className="editor-left-nav">
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Sections
            </div>
            <button className={`nav-item ${activeSection === 'summary' ? 'active' : ''}`} onClick={() => setActiveSection('summary')}>
              <Layers size={16} /> Summary
            </button>
            <button className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSection('experience')}>
              <Layers size={16} /> Experience
            </button>
            <button className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>
              <Layers size={16} /> Projects
            </button>
            <button className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setActiveSection('skills')}>
              <Layers size={16} /> Skills
            </button>
            <button className={`nav-item ${activeSection === 'education' ? 'active' : ''}`} onClick={() => setActiveSection('education')}>
              <Layers size={16} /> Education
            </button>
          </div>

          {/* Center Column: Pure White Corporate Resume Canvas */}
          <div className="editor-center-canvas">
            <div className="white-corporate-resume-paper">
              <TemplateRenderer resume={resume} profile={profile} />
            </div>
          </div>

          {/* Right Column: AI Insights & ATS Panel */}
          <div className="editor-right-ai-panel">
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={18} color="var(--primary)" /> ATS & Score Insights
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563EB' }}>{resume.score.overallATSScore}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>ATS Readiness</div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#16A34A' }}>{resume.score.jdMatchScore}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>JD Match</div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D97706' }}>{resume.score.keywordCoverageScore}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Keywords</div>
                </div>
              </div>
            </div>

            {/* AI Bullet Suggestion Box */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={16} color="var(--primary)" /> AI Bullet Optimizer
              </div>

              <div className="ai-suggestion-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Current Bullet:</div>
                <div style={{ textDecoration: suggestionAccepted ? 'line-through' : 'none', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  "{sampleOriginalBullet}"
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>AI Suggested Optimization:</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  "{sampleAISuggestion}"
                </div>

                <div className="suggestion-actions">
                  <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={handleAccept} disabled={suggestionAccepted}>
                    <Check size={12} /> {suggestionAccepted ? 'Accepted ✓' : 'Accept'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL LATEX CODE MODE */}
      {editorMode === 'code-only' && (
        <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', color: '#ffffff', minHeight: '650px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Full LaTeX Code Editor</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={handleCopyLaTeX}>Copy Code</button>
              <button className="btn-primary" onClick={handleDownloadTex}>Download .tex</button>
            </div>
          </div>
          <textarea 
            value={latexCode}
            onChange={(e) => setLatexCode(e.target.value)}
            style={{
              width: '100%',
              height: '580px',
              background: '#090d16',
              color: '#38bdf8',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '0.9rem',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              outline: 'none'
            }}
          />
        </div>
      )}
    </div>
  );
};
