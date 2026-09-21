import React from 'react';
import type { MatchAnalysis, ATSScores } from '../../types/resume';
import { ShieldCheck, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface Props {
  match: MatchAnalysis;
  scores: ATSScores;
  onProceedToEditor: () => void;
}

export const MatchingDashboard: React.FC<Props> = ({ match, onProceedToEditor }) => {
  return (
    <div className="matching-dashboard-container fade-in">
      {/* Top Banner */}
      <div className="dashboard-greeting-hero">
        <div>
          <h1 className="greeting-title">AI Matching & Truthful Skill Alignment</h1>
          <p className="greeting-sub">Target Role: <strong>{match.jobTitle}</strong></p>
        </div>
        <button className="btn-primary" onClick={onProceedToEditor}>
          <span>Open 3-Column Resume Editor</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Main Score Hero Card with Animated Dial */}
      <div className="analyzer-hero-card" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        {/* Large Score Dial */}
        <div style={{ position: 'relative', width: '170px', height: '170px', flexShrink: 0 }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="85" cy="85" r="70" fill="none" stroke="var(--border)" strokeWidth="12" />
            <circle 
              cx="85" 
              cy="85" 
              r="70" 
              fill="none" 
              stroke="#2563EB" 
              strokeWidth="12" 
              strokeLinecap="round"
              style={{
                strokeDasharray: 440,
                strokeDashoffset: 440 - (440 * match.matchPercentage) / 100,
                transition: 'stroke-dashoffset 1s ease'
              }}
            />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#2563EB', lineHeight: 1 }}>{match.matchPercentage}%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginTop: '4px' }}>JD MATCH</div>
          </div>
        </div>

        {/* Sub-Score Bars */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>
              <span>Technical Skills</span> <span>91%</span>
            </div>
            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '91%' }} /></div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>
              <span>Responsibilities Alignment</span> <span>83%</span>
            </div>
            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '83%' }} /></div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>
              <span>Project Evidence</span> <span>88%</span>
            </div>
            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '88%' }} /></div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>
              <span>Experience & Keywords Density</span> <span>86%</span>
            </div>
            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '86%' }} /></div>
          </div>
        </div>
      </div>

      {/* Truthful Gap Analysis Card */}
      <div className="truthful-card fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <h2 className="section-h2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} color="#16A34A" /> Skill Alignment & Truthful Gap Analysis
          </h2>
          <span className="status-badge badge-matched">Truthful Policy Guardrail Active</span>
        </div>

        {/* Matched Skills */}
        <div className="truthful-section-block">
          <div className="truthful-section-title" style={{ color: '#2563EB' }}>
            <CheckCircle2 size={18} /> MATCHED ({match.matchedCount})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <span className="status-badge badge-matched">Java</span>
            <span className="status-badge badge-matched">Spring Boot</span>
            <span className="status-badge badge-matched">SQL</span>
            <span className="status-badge badge-matched">REST APIs</span>
            <span className="status-badge badge-matched">Git</span>
            <span className="status-badge badge-matched">PostgreSQL</span>
          </div>
        </div>

        {/* Related Skills */}
        <div className="truthful-section-block">
          <div className="truthful-section-title" style={{ color: '#D97706' }}>
            <Sparkles size={18} /> RELATED & TRANSFERABLE ({match.transferableCount})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <span className="status-badge badge-related">Hibernate → JPA</span>
            <span className="status-badge badge-related">MySQL → Relational DB</span>
            <span className="status-badge badge-related">Node.js → Express</span>
          </div>
        </div>

        {/* Missing Skills */}
        <div className="truthful-section-block" style={{ marginBottom: 0 }}>
          <div className="truthful-section-title" style={{ color: '#DC2626' }}>
            <XCircle size={18} /> MISSING ({match.missingCount})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            <span className="status-badge badge-missing">Docker</span>
            <span className="status-badge badge-missing">AWS</span>
            <span className="status-badge badge-missing">Kafka</span>
          </div>

          <div style={{ background: 'var(--status-missing-bg)', border: '1px solid var(--status-missing-border)', padding: '0.85rem', borderRadius: 'var(--radius-md)', color: '#DC2626', fontSize: '0.85rem', fontWeight: 600 }}>
            Safeguard Alert: These missing skills will NOT be fabricated on your ATS resume.
          </div>
        </div>
      </div>
    </div>
  );
};
