import React from 'react';
import { 
  BarChart2, 
  BookOpen, 
  AlertTriangle, 
  ArrowRight
} from 'lucide-react';
import type { CandidateProfile } from '../../types/resume';

interface Props {
  profile: CandidateProfile;
  onNavigateTab: (tab: string) => void;
}

export const SkillGapView: React.FC<Props> = ({ profile: _profile, onNavigateTab }) => {
  const skillDemands = [
    { name: 'Java 17 / Spring Boot', userLevel: 90, demandLevel: 'Very High', category: 'Backend' },
    { name: 'React & TypeScript', userLevel: 85, demandLevel: 'High', category: 'Frontend' },
    { name: 'PostgreSQL & SQL', userLevel: 88, demandLevel: 'High', category: 'Databases' },
    { name: 'Docker Containers', userLevel: 60, demandLevel: 'High', category: 'DevOps' },
    { name: 'AWS Cloud (EC2/S3)', userLevel: 35, demandLevel: 'Very High', category: 'Cloud' },
    { name: 'Kubernetes Orchestration', userLevel: 10, demandLevel: 'High', category: 'DevOps' },
    { name: 'Apache Kafka Messaging', userLevel: 20, demandLevel: 'High', category: 'Architecture' },
    { name: 'System Design Principles', userLevel: 75, demandLevel: 'High', category: 'Concepts' }
  ];

  return (
    <div className="skill-gap-container">
      <div className="gap-header">
        <h2>Skill Graph & Learning Roadmap</h2>
        <p>Compare candidate proficiency against real-time market demand for your target software engineering roles.</p>
      </div>

      {/* Truthfulness Rule Alert */}
      <div className="truthfulness-alert-card">
        <AlertTriangle size={20} className="alert-icon" />
        <div>
          <h4>AI Truthfulness Safeguard Policy</h4>
          <p>
            Missing skills like Kubernetes or AWS will <strong>NEVER</strong> be automatically fabricated on your ATS resume. 
            Build genuine project evidence first before listing skills to pass employer background checks.
          </p>
        </div>
      </div>

      <div className="gap-main-grid">
        {/* Left Column: Skill Matrix */}
        <div className="gap-panel">
          <div className="panel-header">
            <h3><BarChart2 size={18} /> Candidate Skill Graph vs Market Demand</h3>
          </div>

          <div className="skills-matrix-list">
            {skillDemands.map((item, idx) => (
              <div key={idx} className="matrix-row">
                <div className="matrix-info">
                  <span className="skill-name-text">{item.name}</span>
                  <span className={`demand-tag ${item.demandLevel.toLowerCase().replace(' ', '-')}`}>
                    Demand: {item.demandLevel}
                  </span>
                </div>

                <div className="matrix-bar-wrapper">
                  <div className="progress-bg">
                    <div 
                      className={`progress-fill ${item.userLevel >= 80 ? 'green' : item.userLevel >= 50 ? 'blue' : 'orange'}`} 
                      style={{ width: `${item.userLevel}%` }} 
                    />
                  </div>
                  <span className="level-text">{item.userLevel}% Proficiency</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommended Learning Roadmap */}
        <div className="gap-panel">
          <div className="panel-header">
            <h3><BookOpen size={18} /> High-Impact Learning Targets</h3>
          </div>

          <div className="roadmap-cards-list">
            <div className="roadmap-card">
              <div className="roadmap-title">1. AWS IAM, EC2 & S3 Fundamentals</div>
              <p className="roadmap-desc">
                Appears in 74% of Java & Fullstack backend postings in Bangalore and Remote.
              </p>
              <div className="roadmap-meta">Estimated time: 10 Hours • Free Tier Labs</div>
            </div>

            <div className="roadmap-card">
              <div className="roadmap-title">2. Docker Compose & Containerization</div>
              <p className="roadmap-desc">
                Containerize your Spring Boot & PostgreSQL backend projects to demonstrate cloud readiness.
              </p>
              <div className="roadmap-meta">Estimated time: 6 Hours • Project Based</div>
            </div>

            <div className="roadmap-card">
              <div className="roadmap-title">3. System Design Tradeoffs</div>
              <p className="roadmap-desc">
                Master Caching (Redis), Load Balancing, and Database Indexing for SDE-1 interview rounds.
              </p>
              <div className="roadmap-meta">Estimated time: 12 Hours • Interview Prep</div>
            </div>
          </div>

          <button 
            className="btn-primary-block margin-top"
            onClick={() => onNavigateTab('interview-prep')}
          >
            Practice Technical Interview Questions <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
