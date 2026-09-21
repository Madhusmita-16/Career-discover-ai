import React, { useState } from 'react';
import type { JobDescriptionData } from '../../types/resume';
import { sampleJDs, type SampleJD } from '../../data/sampleJDs';
import { parseJobDescription } from '../../services/jdIntelligence';
import { Sparkles, Link, Upload, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  currentJd: JobDescriptionData;
  onAnalyzeJd: (jd: JobDescriptionData) => void;
  onProceedToMatching: () => void;
}

export const JobAnalyzerHero: React.FC<Props> = ({ currentJd, onAnalyzeJd, onProceedToMatching }) => {
  const [inputMode, setInputMode] = useState<'paste' | 'url' | 'upload'>('paste');
  const [rawText, setRawText] = useState<string>(currentJd.rawText || sampleJDs[0].text);
  const [urlInput, setUrlInput] = useState<string>('https://careers.amazon.com/jobs/2049182/senior-java-backend-engineer');
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleRunAnalysis = (textToParse: string, titleOverride?: string) => {
    const parsed = parseJobDescription(textToParse, titleOverride);
    onAnalyzeJd(parsed);
  };

  const handleSelectSample = (sample: SampleJD) => {
    setRawText(sample.text);
    handleRunAnalysis(sample.text, sample.title);
  };

  const handleSimulateUrlFetch = () => {
    if (!urlInput.trim()) return;
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
      const sample = sampleJDs.find(s => s.id === 'jd-java-backend') || sampleJDs[0];
      setRawText(sample.text);
      handleRunAnalysis(sample.text, sample.title);
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const sample = sampleJDs[0];
      setRawText(sample.text);
      handleRunAnalysis(sample.text, sample.title);
    }
  };

  const keywords = currentJd.extractedKeywords;

  return (
    <div className="analyzer-hero-container fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Header & Input Card */}
      <div className="analyzer-hero-card">
        <h1 className="greeting-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Analyze a Job Description</h1>
        <p className="greeting-sub" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Turn any job description into an actionable resume strategy.
        </p>

        {/* Input Card Shell */}
        <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
          
          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.85rem' }}>
            <button 
              className={`btn-secondary ${inputMode === 'paste' ? 'active' : ''}`} 
              onClick={() => setInputMode('paste')}
              style={{ gap: '0.45rem' }}
            >
              <FileText size={16} /> Paste Job Description
            </button>
            <button 
              className={`btn-secondary ${inputMode === 'url' ? 'active' : ''}`} 
              onClick={() => setInputMode('url')}
              style={{ gap: '0.45rem' }}
            >
              <Link size={16} /> Paste Job URL
            </button>
            <button 
              className={`btn-secondary ${inputMode === 'upload' ? 'active' : ''}`} 
              onClick={() => setInputMode('upload')}
              style={{ gap: '0.45rem' }}
            >
              <Upload size={16} /> Upload JD File
            </button>
          </div>

          {/* Mode 1: Textarea Paste */}
          {inputMode === 'paste' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <textarea
                rows={9}
                placeholder="Paste the complete job description here (responsibilities, required skills, qualifications, experience, tech stack)..."
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  padding: '1rem 1.25rem',
                  borderRadius: '10px'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => handleRunAnalysis(rawText)}
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                >
                  <Sparkles size={16} /> Analyze with AI
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: URL Crawling */}
          {inputMode === 'url' && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input 
                type="url" 
                value={urlInput} 
                onChange={e => setUrlInput(e.target.value)} 
                placeholder="https://careers.company.com/jobs/view/software-engineer-backend"
                style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.9rem' }}
              />
              <button 
                className="btn-primary" 
                onClick={handleSimulateUrlFetch} 
                disabled={isScraping}
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
              >
                {isScraping ? 'Scraping Website...' : 'Analyze URL'}
              </button>
            </div>
          )}

          {/* Mode 3: Drag & Drop File Upload */}
          {inputMode === 'upload' && (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                border: dragActive ? '2px dashed var(--primary)' : '2px dashed var(--border)',
                borderRadius: '10px',
                backgroundColor: dragActive ? 'var(--primary-light)' : 'var(--bg-card)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <Upload size={36} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Drag & drop your PDF, DOCX, or TXT job description file
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Automated parsing extracts skills, experience, and responsibilities instantly.
              </p>
            </div>
          )}

          {/* Sample JD Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Try a sample JD:</span>
            {sampleJDs.map(sample => (
              <button 
                key={sample.id} 
                className="status-badge badge-matched" 
                style={{ cursor: 'pointer', border: '1px solid var(--primary-border)' }} 
                onClick={() => handleSelectSample(sample)}
              >
                {sample.title} ({sample.company})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extracted Job Requirements Breakdown */}
      {currentJd && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="section-h2">{currentJd.jobTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentJd.companyName} • {currentJd.experienceRequired}</span>
            </div>
            <button className="btn-primary" onClick={onProceedToMatching} style={{ gap: '0.45rem' }}>
              Proceed to Matching Score <ArrowRight size={16} />
            </button>
          </div>

          <div className="stats-4-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat-card">
              <div className="stat-label">Hard Skills</div>
              <div className="stat-value">{keywords.languages.length + keywords.frameworks.length + keywords.tools.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Responsibilities</div>
              <div className="stat-value">{currentJd.responsibilities.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Qualifications</div>
              <div className="stat-value">{currentJd.qualifications.length}</div>
            </div>
          </div>

          {/* AI Job Intelligence Panel Card */}
          <div className="ai-job-intelligence-panel fade-in">
            <div className="ai-panel-title">
              <Sparkles size={20} /> AI JOB INTELLIGENCE
            </div>
            <p style={{ fontSize: '0.92rem', opacity: 0.9 }}>
              This role strongly emphasizes <strong>backend development, REST API architecture, and Spring-based microservices</strong>.
            </p>
            <div className="ai-priority-list">
              <div className="ai-priority-item"><span>01</span> <strong>Java / Spring Boot</strong></div>
              <div className="ai-priority-item"><span>02</span> <strong>REST API Development & OpenAPI</strong></div>
              <div className="ai-priority-item"><span>03</span> <strong>SQL / PostgreSQL Query Optimization</strong></div>
              <div className="ai-priority-item"><span>04</span> <strong>Microservices & System Design</strong></div>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#93C5FD', fontWeight: 600 }}>
              Recommended Resume Focus: Backend Projects • API Reliability • Core Java Microservices
            </div>
          </div>

          {/* Extracted Skills Categorization */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="stat-card">
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', color: '#2563EB' }}>
                <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Required Hard Skills
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {[...keywords.languages, ...keywords.frameworks].map((s, i) => (
                  <span key={i} className="status-badge badge-matched">{s}</span>
                ))}
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', color: '#D97706' }}>
                <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Related / Transferable
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="status-badge badge-related">≈ Hibernate</span>
                <span className="status-badge badge-related">≈ JPA</span>
                <span className="status-badge badge-related">≈ Relational DB</span>
              </div>
            </div>

            <div className="stat-card">
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', color: '#DC2626' }}>
                <XCircle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Missing Skills
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="status-badge badge-missing">! Docker</span>
                <span className="status-badge badge-missing">! AWS</span>
                <span className="status-badge badge-missing">! Kafka</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
