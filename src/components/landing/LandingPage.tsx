import React from 'react';
import { Sparkles, ShieldCheck, Layers, FileSearch, ArrowRight } from 'lucide-react';

interface Props {
  onStartBuilding: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStartBuilding }) => {
  return (
    <div className="landing-page-container fade-in">
      {/* Hero Section */}
      <div className="landing-hero">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          <Sparkles size={16} /> CareerOS AI — AI-Powered Career Platform
        </div>

        <h1 className="landing-title">
          Your Resume Should Match the Job.<br />
          <span style={{ color: 'var(--primary)' }}>Not Just Describe You.</span>
        </h1>

        <p className="landing-subtitle">
          Paste a job description. Our AI analyzes the requirements, matches them against your real experience, and builds an ATS-ready corporate resume without inventing skills.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }} onClick={onStartBuilding}>
            Build My Resume <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }} onClick={onStartBuilding}>
            See How It Works
          </button>
        </div>

        {/* Visual Architecture Flow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '3.5rem', background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', fontSize: '0.82rem', fontWeight: 700 }}>
          <span>JOB DESCRIPTION</span> <ArrowRight size={14} color="var(--primary)" />
          <span>AI ANALYSIS</span> <ArrowRight size={14} color="var(--primary)" />
          <span>SKILL MATCHING</span> <ArrowRight size={14} color="var(--primary)" />
          <span>ATS OPTIMIZATION</span> <ArrowRight size={14} color="var(--primary)" />
          <span style={{ color: 'var(--primary)' }}>PROFESSIONAL RESUME</span>
        </div>
      </div>

      {/* 4 Feature Cards */}
      <div className="landing-cards-grid">
        <div className="landing-card">
          <FileSearch size={28} className="landing-card-icon" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem' }}>✦ JD Intelligence</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Understand every important technical skill, responsibility, and terminology required by the target job description.
          </p>
        </div>

        <div className="landing-card">
          <ShieldCheck size={28} className="landing-card-icon" style={{ color: '#16A34A' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem' }}>◈ Truthful Match</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Never fabricate skills just to increase match scores. Missing competencies are highlighted in a Gap Analysis report.
          </p>
        </div>

        <div className="landing-card">
          <Layers size={28} className="landing-card-icon" style={{ color: '#D97706' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem' }}>◎ ATS Analysis</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Audit structure, keyword density, section headings, and machine-readability metrics before downloading.
          </p>
        </div>

        <div className="landing-card">
          <Sparkles size={28} className="landing-card-icon" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem' }}>◉ AI Optimization</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Enhance real work experience and project highlights into STAR-format corporate bullet points.
          </p>
        </div>
      </div>
    </div>
  );
};
