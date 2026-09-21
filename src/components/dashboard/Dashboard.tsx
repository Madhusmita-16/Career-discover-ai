import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ArrowRight, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Filter,
  MessageSquare,
  Bot
} from 'lucide-react';
import type { JobListing, ResumeVersion } from '../../types/resume';
import type { TabType } from '../layout/Sidebar';

interface Props {
  userName: string;
  savedVersions?: ResumeVersion[];
  recommendedJob?: JobListing;
  onCreateNewResume?: () => void;
  onOpenVersion?: (version: ResumeVersion) => void;
  onNavigateTab: (tab: TabType) => void;
  onSelectJobForAnalysis: (job: JobListing) => void;
}

export const Dashboard: React.FC<Props> = ({
  userName,
  onNavigateTab,
  onSelectJobForAnalysis,
}) => {
  const [expandedWhyMatch, setExpandedWhyMatch] = useState<Record<string, boolean>>({});
  const [activeWorkModeFilter, setActiveWorkModeFilter] = useState<string>('all');
  const [activeExperienceFilter, setActiveExperienceFilter] = useState<string>('all');
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});

  const toggleWhyMatch = (id: string) => {
    setExpandedWhyMatch(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const mockJobs: JobListing[] = [
    {
      id: 'job-1',
      title: 'Software Engineer — Java & Backend',
      company: 'ABC Technologies',
      location: 'Bangalore, India',
      workMode: 'Hybrid',
      experienceMin: 0,
      experienceMax: 2,
      salaryRange: '₹12,00,000 - ₹18,00,000 PA',
      postedDate: '2 days ago',
      matchPercentage: 92,
      skills: ['Java', 'Spring Boot', 'REST API', 'SQL'],
      requiredSkills: ['Java', 'Spring Boot', 'REST API', 'SQL'],
      preferredSkills: ['Docker', 'AWS'],
      education: ['B.Tech / B.E. Computer Science'],
      source: 'company_career_page',
      url: 'https://careers.abctech.com/jobs/1',
      description: 'Looking for a passionate backend engineer proficient in Java, Spring Boot, microservices architecture, and relational databases.'
    },
    {
      id: 'job-2',
      title: 'Full Stack Developer',
      company: 'Stripe Innovations',
      location: 'Remote',
      workMode: 'Remote',
      experienceMin: 1,
      experienceMax: 3,
      salaryRange: '₹16,00,000 - ₹24,00,000 PA',
      postedDate: '1 day ago',
      matchPercentage: 88,
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      preferredSkills: ['AWS', 'GraphQL'],
      education: ['B.Tech / B.E. Computer Science'],
      source: 'greenhouse',
      url: 'https://stripe.com/jobs/2',
      description: 'Build enterprise payment integrations and developer portals using React 19, Node.js, and cloud native databases.'
    },
    {
      id: 'job-3',
      title: 'AI Engineering Specialist',
      company: 'Anthropic Labs',
      location: 'Hyderabad, India',
      workMode: 'On-site',
      experienceMin: 0,
      experienceMax: 1,
      salaryRange: '₹18,00,000 - ₹28,00,000 PA',
      postedDate: '3 days ago',
      matchPercentage: 84,
      skills: ['Python', 'FastAPI', 'PyTorch', 'LangChain'],
      requiredSkills: ['Python', 'FastAPI', 'PyTorch', 'LangChain'],
      preferredSkills: ['pgvector', 'Docker Compose'],
      education: ['B.Tech / M.Tech Computer Science'],
      source: 'authorized_api',
      url: 'https://anthropic.com/careers/3',
      description: 'Develop multi-agent workflow engines and RAG retrieval pipelines using LangGraph, Python, and vector databases.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. DASHBOARD HEADER & GREETING */}
      <div className="dashboard-greeting-hero">
        <div>
          <h1 className="greeting-title">Good evening, {userName}</h1>
          <p className="greeting-sub">Let's find something worth applying to.</p>
        </div>
      </div>

      {/* 2. TOP ACTION BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem'
      }}>
        <button 
          onClick={() => onNavigateTab('jobs')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Search size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Find Jobs</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Discover new opportunities</div>
          </div>
        </button>

        <button 
          onClick={() => onNavigateTab('job-analyzer')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED' }}>
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Analyze Job</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Paste Job URL or JD text</div>
          </div>
        </button>

        <button 
          onClick={() => onNavigateTab('editor')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: '#16A34A' }}>
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Build Resume</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>ATS tailored resumes</div>
          </div>
        </button>

        <button 
          onClick={() => onNavigateTab('career-chat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' }}>
            <MessageSquare size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Ask Career AI</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>AI Career Co-Pilot</div>
          </div>
        </button>
      </div>

      {/* 3. CORE METRICS STATS CARDS */}
      <div className="stats-4-grid">
        <div className="stat-card" onClick={() => onNavigateTab('jobs')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">New Opportunities</div>
          <div className="stat-value">24</div>
          <div className="stat-change">+8 added today</div>
        </div>

        <div className="stat-card" onClick={() => onNavigateTab('jobs')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Strong Matches (80%+)</div>
          <div className="stat-value">9</div>
          <div className="stat-change">Based on 14 skills</div>
        </div>

        <div className="stat-card" onClick={() => onNavigateTab('applications')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Active Applications</div>
          <div className="stat-value">5</div>
          <div className="stat-change">2 interviews scheduled</div>
        </div>

        <div className="stat-card" onClick={() => onNavigateTab('opportunities')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Upcoming Deadlines</div>
          <div className="stat-value">3</div>
          <div className="stat-change">Next: 2 days</div>
        </div>
      </div>

      {/* 4. "WHAT SHOULD I DO NEXT?" SMART AI CARD */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--primary-border)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          <Bot size={18} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>What should I do next?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {/* Action item 1 */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.3rem' }}>RECOMMENDED ACTION</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Apply to Software Engineer @ ABC Tech
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                92% match score. Meets 8/8 required technical requirements.
              </div>
            </div>
            <button 
              className="btn-primary"
              onClick={() => {
                onSelectJobForAnalysis(mockJobs[0]);
                onNavigateTab('editor');
              }}
              style={{ marginTop: '0.85rem', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              Prepare Application <ArrowRight size={14} />
            </button>
          </div>

          {/* Action item 2 */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', marginBottom: '0.3rem' }}>SKILL DEFICIENCY</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Add Docker Skill Evidence
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Docker appears in 6 of your saved job postings.
              </div>
            </div>
            <button 
              className="btn-secondary"
              onClick={() => onNavigateTab('skill-gap')}
              style={{ marginTop: '0.85rem', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              View Skill Roadmap <ArrowRight size={14} />
            </button>
          </div>

          {/* Action item 3 */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', marginBottom: '0.3rem' }}>RESUME OPTIMIZATION</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Update Keyword Density
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Your resume is missing 2 keywords commonly found in target roles.
              </div>
            </div>
            <button 
              className="btn-secondary"
              onClick={() => onNavigateTab('editor')}
              style={{ marginTop: '0.85rem', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              Open Resume Studio <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. MAIN SECTION: JOBS YOU CAN APPLY TO & HORIZONTAL FILTER BAR */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 className="section-h2">Jobs you can apply to</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Opportunities matched against your profile, skills, and preferences.
            </p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => onNavigateTab('jobs')}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          >
            View all jobs ({mockJobs.length + 12}) <ArrowRight size={14} />
          </button>
        </div>

        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          alignItems: 'center',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={14} /> Filters:
          </span>

          <select 
            value={activeWorkModeFilter}
            onChange={e => setActiveWorkModeFilter(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}
          >
            <option value="all">Work Mode: All</option>
            <option value="remote">Remote Only</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>

          <select 
            value={activeExperienceFilter}
            onChange={e => setActiveExperienceFilter(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}
          >
            <option value="all">Experience: All</option>
            <option value="fresher">Fresher (0 years)</option>
            <option value="0-2">0–2 years</option>
            <option value="2-4">2–4 years</option>
          </select>

          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}>
            Match: 80%+
          </button>

          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}>
            Posted: Last 7 days
          </button>

          <button 
            onClick={() => {
              setActiveWorkModeFilter('all');
              setActiveExperienceFilter('all');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* Job Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockJobs.map(job => {
            const isWhyExpanded = expandedWhyMatch[job.id];
            const isSaved = savedJobs[job.id];

            return (
              <div 
                key={job.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  {/* Left Job Metadata */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      flexShrink: 0
                    }}>
                      <Building2 size={22} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{job.title}</h3>
                        <span className="status-badge badge-matched">{job.workMode}</span>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {job.company} · {job.location} · {job.experienceMin}–{job.experienceMax} years · Posted {job.postedDate}
                      </div>

                      {/* Skill Chips */}
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                        {job.requiredSkills.map((sk, i) => (
                          <span 
                            key={i} 
                            style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: '4px',
                              backgroundColor: 'var(--bg-main)',
                              border: '1px solid var(--border)',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: 'var(--text-primary)'
                            }}
                          >
                            {sk}
                          </span>
                        ))}
                        {job.preferredSkills.map((sk, i) => (
                          <span 
                            key={i} 
                            style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: '4px',
                              backgroundColor: '#FEE2E2',
                              border: '1px solid #FECACA',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: '#DC2626'
                            }}
                          >
                            Missing: {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Match score ring badge & Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="jd-match-circle-pill">
                        {job.matchPercentage || 90}% Match
                      </div>
                      <button 
                        onClick={() => toggleSaveJob(job.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: isSaved ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                        title={isSaved ? "Saved Job" : "Save Job"}
                      >
                        <Bookmark size={18} fill={isSaved ? "var(--primary)" : "none"} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          onSelectJobForAnalysis(job);
                          onNavigateTab('job-analyzer');
                        }}
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        Analyze
                      </button>
                      <button 
                        className="btn-primary"
                        onClick={() => {
                          onSelectJobForAnalysis(job);
                          onNavigateTab('editor');
                        }}
                        style={{ padding: '0.4rem 0.95rem', fontSize: '0.8rem' }}
                      >
                        Prepare Application
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable "Why this matches" Evidence Section */}
                <div style={{ marginTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                  <button 
                    onClick={() => toggleWhyMatch(job.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    Why this matches {isWhyExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isWhyExpanded && (
                    <div style={{
                      marginTop: '0.65rem',
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16A34A' }}>
                        <CheckCircle2 size={14} /> 8/8 required technical requirements matched from candidate profile.
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16A34A' }}>
                        <CheckCircle2 size={14} /> Experience requirement (0-2 yrs) satisfies candidate education background.
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16A34A' }}>
                        <CheckCircle2 size={14} /> Location preference matched for India / Remote.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. UPCOMING OPPORTUNITIES & DEADLINES SECTION */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 className="section-h2">Upcoming opportunities & deadlines</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Interviews, assessment tests, hackathons, and registration deadlines.
            </p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => onNavigateTab('opportunities')}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          >
            View Calendar <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {/* Opportunity 1 */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="status-badge badge-matched">Interview</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tomorrow · 10:30 AM</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Technical Interview</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              ABC Technologies — Backend Developer Role
            </div>
            <button 
              className="btn-secondary"
              onClick={() => onNavigateTab('interview-prep')}
              style={{ marginTop: '0.85rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}
            >
              Prepare Interview
            </button>
          </div>

          {/* Opportunity 2 */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="status-badge badge-related">Deadline</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2 days remaining</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Application Deadline</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Stripe Innovations — Software Engineer
            </div>
            <button 
              className="btn-primary"
              onClick={() => onNavigateTab('editor')}
              style={{ marginTop: '0.85rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}
            >
              Submit Application
            </button>
          </div>

          {/* Opportunity 3 */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="status-badge badge-matched">Hackathon</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Starts Sep 28</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>AI Innovation Hackathon</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Global Agentic AI Challenge 2026
            </div>
            <button 
              className="btn-secondary"
              onClick={() => onNavigateTab('opportunities')}
              style={{ marginTop: '0.85rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}
            >
              Register Team
            </button>
          </div>
        </div>
      </div>

      {/* 7. APPLICATION TRACKER & RESUME READINESS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent Applications Preview Table */}
        <div className="recent-resumes-card">
          <div className="card-title-row">
            <h2 className="section-h2">Your applications</h2>
            <button 
              onClick={() => onNavigateTab('applications')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
            >
              View tracker <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div className="resume-item-row" onClick={() => onNavigateTab('applications')} style={{ cursor: 'pointer' }}>
              <div>
                <div className="row-job-title">Java Developer @ ABC Tech</div>
                <div className="row-company-date">Applied Sep 18 · Match 91%</div>
              </div>
              <span className="status-badge badge-matched">Applied</span>
            </div>

            <div className="resume-item-row" onClick={() => onNavigateTab('applications')} style={{ cursor: 'pointer' }}>
              <div>
                <div className="row-job-title">Backend Engineer @ XYZ Labs</div>
                <div className="row-company-date">Applied Sep 17 · Match 87%</div>
              </div>
              <span className="status-badge badge-related">Assessment</span>
            </div>

            <div className="resume-item-row" onClick={() => onNavigateTab('applications')} style={{ cursor: 'pointer' }}>
              <div>
                <div className="row-job-title">Software Engineer @ Nova Systems</div>
                <div className="row-company-date">Applied Sep 15 · Match 84%</div>
              </div>
              <span className="status-badge badge-matched">Interviewing</span>
            </div>
          </div>
        </div>

        {/* Resume Readiness & Warning Card */}
        <div className="recent-resumes-card">
          <div className="card-title-row">
            <h2 className="section-h2">Your Primary Resume</h2>
            <span className="status-badge badge-matched">ATS Ready</span>
          </div>

          <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              Software Developer — Java / Spring Boot / React
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              ATS Score: 89/100 · Keywords Matched: 34/38 · Updated 2 days ago
            </div>
          </div>

          {/* Warning Message */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.75rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', color: '#D97706', fontSize: '0.82rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700 }}>A few sections are playing hard to get.</div>
              <div>Missing project metrics and 2 keywords commonly requested in target roles.</div>
            </div>
          </div>

          <button 
            className="btn-primary"
            onClick={() => onNavigateTab('editor')}
            style={{ marginTop: '1rem', width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
          >
            Fix Resume & Open Studio
          </button>
        </div>
      </div>
    </div>
  );
};
