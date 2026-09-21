import React, { useState } from 'react';
import type { JobDescriptionData } from '../../types/resume';
import { sampleJDs, type SampleJD } from '../../data/sampleJDs';
import { parseJobDescription } from '../../services/jdIntelligence';
import { Sparkles, Link, Upload, FileText, CheckCircle2, ArrowRight, Layers, Tag, ShieldAlert } from 'lucide-react';

interface Props {
  currentJd: JobDescriptionData;
  onAnalyzeJd: (jd: JobDescriptionData) => void;
  onProceedToDashboard: () => void;
}

export const JDAnalyzer: React.FC<Props> = ({ currentJd, onAnalyzeJd, onProceedToDashboard }) => {
  const [inputMode, setInputMode] = useState<'paste' | 'url' | 'upload'>('paste');
  const [rawText, setRawText] = useState<string>(currentJd.rawText || sampleJDs[0].text);
  const [urlInput, setUrlInput] = useState<string>('https://careers.amazon.com/jobs/2049182/senior-java-backend-engineer');
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('jd-java-backend');
  const [statusMsg, setStatusMsg] = useState<string>('');

  const handleRunAnalysis = (textToParse: string, titleOverride?: string) => {
    const parsed = parseJobDescription(textToParse, titleOverride);
    onAnalyzeJd(parsed);
    setStatusMsg('Job Description parsed successfully! NLP keywords extracted.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSelectSample = (sample: SampleJD) => {
    setSelectedSampleId(sample.id);
    setRawText(sample.text);
    handleRunAnalysis(sample.text, sample.title);
  };

  const handleSimulateUrlFetch = () => {
    if (!urlInput.trim()) return;
    setIsScraping(true);
    setStatusMsg('Fetching Job Description URL and cleaning HTML noise...');
    setTimeout(() => {
      setIsScraping(false);
      const sample = sampleJDs.find(s => s.id === 'jd-java-backend') || sampleJDs[0];
      setRawText(sample.text);
      handleRunAnalysis(sample.text, sample.title);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        handleRunAnalysis(content);
      }
    };
    reader.readAsText(file);
  };

  const keywords = currentJd.extractedKeywords;

  return (
    <div className="jd-analyzer-container fade-in">
      {/* Hero Header */}
      <div className="jd-hero">
        <div className="jd-hero-badge">
          <Sparkles size={16} /> Module 2 — Job Intelligence & Keyword Engine
        </div>
        <h1 className="jd-hero-title">Paste Job Description or URL to Analyze</h1>
        <p className="jd-hero-desc">
          Our AI/NLP Engine extracts job titles, technical skills, action verbs, required qualifications, and industry terminology to align your resume with recruiter searches.
        </p>

        {/* Preset Sample Selector Buttons */}
        <div className="sample-presets-bar">
          <span className="preset-label">Quick Load Sample JDs:</span>
          {sampleJDs.map(sample => (
            <button
              key={sample.id}
              className={`preset-chip ${selectedSampleId === sample.id ? 'active' : ''}`}
              onClick={() => handleSelectSample(sample)}
            >
              <FileText size={14} />
              <span>{sample.title} ({sample.company})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Mode Tabs & Form */}
      <div className="jd-input-card">
        <div className="input-mode-tabs">
          <button 
            className={`mode-tab ${inputMode === 'paste' ? 'active' : ''}`}
            onClick={() => setInputMode('paste')}
          >
            <FileText size={16} /> Paste Raw Text
          </button>

          <button 
            className={`mode-tab ${inputMode === 'url' ? 'active' : ''}`}
            onClick={() => setInputMode('url')}
          >
            <Link size={16} /> Ingest Job URL
          </button>

          <button 
            className={`mode-tab ${inputMode === 'upload' ? 'active' : ''}`}
            onClick={() => setInputMode('upload')}
          >
            <Upload size={16} /> Upload Document (.txt / .pdf)
          </button>
        </div>

        {/* Tab 1: Paste Text */}
        {inputMode === 'paste' && (
          <div className="mode-content">
            <textarea
              className="jd-textarea"
              rows={9}
              placeholder="Paste complete Job Description here (Responsibilities, Technical Requirements, Qualifications...)"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            <div className="form-actions-bar">
              <button className="primary-action-btn" onClick={() => handleRunAnalysis(rawText)}>
                <Sparkles size={18} /> Analyze Job Description & Extract Keywords
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Job URL Ingestion */}
        {inputMode === 'url' && (
          <div className="mode-content">
            <div className="url-input-group">
              <input
                type="url"
                className="url-input-field"
                placeholder="https://careers.linkedin.com/jobs/view/123456"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button 
                className="primary-action-btn" 
                onClick={handleSimulateUrlFetch}
                disabled={isScraping}
              >
                {isScraping ? 'Scraping & Cleaning HTML...' : 'Fetch & Analyze URL'}
              </button>
            </div>
            <p className="helper-text">
              * Supports LinkedIn, Indeed, Greenhouse, Lever, Workday, and corporate careers pages. Automatically strips CSS noise and navigation scripts.
            </p>
          </div>
        )}

        {/* Tab 3: Upload Document */}
        {inputMode === 'upload' && (
          <div className="mode-content">
            <div className="dropzone-area">
              <Upload size={36} className="dropzone-icon" />
              <p className="dropzone-text">Drag & drop your Job Description PDF / DOCX / TXT file here</p>
              <input 
                type="file" 
                accept=".txt,.pdf,.doc,.docx" 
                className="file-input-hidden" 
                onChange={handleFileUpload} 
              />
            </div>
          </div>
        )}

        {statusMsg && (
          <div className="status-toast alert-success fade-in">
            <CheckCircle2 size={18} /> {statusMsg}
          </div>
        )}
      </div>

      {/* Extracted Intelligence Results Card */}
      {currentJd && (
        <div className="jd-results-container fade-in">
          <div className="results-header">
            <div>
              <h2 className="results-title">Extracted JD Intelligence Overview</h2>
              <div className="results-subtitle">
                Target Role: <strong>{currentJd.jobTitle}</strong> | Employer: <strong>{currentJd.companyName}</strong> | Experience Required: <strong>{currentJd.experienceRequired}</strong>
              </div>
            </div>
            <button className="proceed-btn" onClick={onProceedToDashboard}>
              <span>Proceed to ATS Matching & Scoring</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Categorized Keyword Grid */}
          <div className="keyword-categories-grid">
            <div className="keyword-card">
              <div className="card-head"><Tag size={16} /> Programming Languages ({keywords.languages.length})</div>
              <div className="chips-wrapper">
                {keywords.languages.map((item, idx) => (
                  <span key={idx} className="chip lang-chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="keyword-card">
              <div className="card-head"><Layers size={16} /> Frameworks & Libraries ({keywords.frameworks.length})</div>
              <div className="chips-wrapper">
                {keywords.frameworks.map((item, idx) => (
                  <span key={idx} className="chip frame-chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="keyword-card">
              <div className="card-head"><Sparkles size={16} /> Architecture & APIs ({keywords.architecture.length + keywords.apis.length})</div>
              <div className="chips-wrapper">
                {[...keywords.architecture, ...keywords.apis].map((item, idx) => (
                  <span key={idx} className="chip arch-chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="keyword-card">
              <div className="card-head"><FileText size={16} /> Cloud & Tools ({keywords.tools.length})</div>
              <div className="chips-wrapper">
                {keywords.tools.map((item, idx) => (
                  <span key={idx} className="chip tool-chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="keyword-card">
              <div className="card-head"><Sparkles size={16} /> Corporate Action Verbs ({keywords.actionVerbs.length})</div>
              <div className="chips-wrapper">
                {keywords.actionVerbs.map((item, idx) => (
                  <span key={idx} className="chip verb-chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="keyword-card">
              <div className="card-head"><ShieldAlert size={16} /> Soft Skills & Methodology ({keywords.softSkills.length})</div>
              <div className="chips-wrapper">
                {keywords.softSkills.map((item, idx) => (
                  <span key={idx} className="chip soft-chip">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Responsibilities & Qualifications List */}
          <div className="details-two-col">
            <div className="details-card">
              <h3>Key Target Responsibilities ({currentJd.responsibilities.length})</h3>
              <ul className="details-list">
                {currentJd.responsibilities.map((resp, idx) => (
                  <li key={idx}><CheckCircle2 size={16} className="check-icon" /> {resp}</li>
                ))}
              </ul>
            </div>

            <div className="details-card">
              <h3>Required Qualifications ({currentJd.qualifications.length})</h3>
              <ul className="details-list">
                {currentJd.qualifications.map((qual, idx) => (
                  <li key={idx}><CheckCircle2 size={16} className="check-icon" /> {qual}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
