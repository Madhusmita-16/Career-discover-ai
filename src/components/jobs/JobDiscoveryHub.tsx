import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Sparkles, 
  ExternalLink,
  FileCheck
} from 'lucide-react';
import type { JobListing, JobFilterState, CandidateProfile } from '../../types/resume';
import { mockJobListings, filterJobs, calculateJobMatch } from '../../services/jobDiscoveryAgent';

interface Props {
  profile: CandidateProfile;
  onSelectJobForAnalysis: (job: JobListing) => void;
  onNavigateTab: (tab: string) => void;
}

export const JobDiscoveryHub: React.FC<Props> = ({
  profile,
  onSelectJobForAnalysis,
  onNavigateTab
}) => {
  const [filters, setFilters] = useState<JobFilterState>({
    search: '',
    location: 'all',
    experience: 'all',
    jobAge: 'all',
    skills: [],
    workMode: 'all'
  });

  const availableSkills = ['Java', 'Spring Boot', 'React', 'TypeScript', 'Python', 'Docker', 'AWS', 'PostgreSQL'];

  const filteredJobs = useMemo(() => {
    return filterJobs(mockJobListings, filters);
  }, [filters]);

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="job-discovery-container">
      {/* Search Header */}
      <div className="discovery-header">
        <h2>Continuous Job Discovery Engine</h2>
        <p>Real-time opportunities from authorized career portals, Greenhouse, Lever, and company feeds.</p>

        <div className="search-bar-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by role, skill, company or key term..." 
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className="search-input"
            />
          </div>
          <button 
            className="btn-primary"
            onClick={() => onNavigateTab('job-analyzer')}
          >
            Paste Job URL / JD
          </button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="filters-card">
        <div className="filter-group">
          <label><MapPin size={14} /> Location</label>
          <select 
            value={filters.location} 
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="all">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Bhubaneswar">Bhubaneswar</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="filter-group">
          <label><Briefcase size={14} /> Experience</label>
          <select 
            value={filters.experience} 
            onChange={e => setFilters({ ...filters, experience: e.target.value })}
          >
            <option value="all">All Experience Levels</option>
            <option value="0-1">0 – 1 years (Fresher)</option>
            <option value="1-2">1 – 2 years</option>
            <option value="2-3">2 – 3 years</option>
            <option value="3-5">3 – 5 years</option>
          </select>
        </div>

        <div className="filter-group">
          <label><Clock size={14} /> Job Age</label>
          <select 
            value={filters.jobAge} 
            onChange={e => setFilters({ ...filters, jobAge: e.target.value })}
          >
            <option value="all">Anytime</option>
            <option value="1">Last 24 hours</option>
            <option value="3">Last 3 days</option>
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Work Mode</label>
          <select 
            value={filters.workMode} 
            onChange={e => setFilters({ ...filters, workMode: e.target.value })}
          >
            <option value="all">All Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Skill Pills Filter */}
      <div className="skill-pills-filter">
        <span className="skills-label">Filter by Skills:</span>
        {availableSkills.map(skill => (
          <button
            key={skill}
            className={`skill-chip ${filters.skills.includes(skill) ? 'active' : ''}`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Jobs Results List */}
      <div className="jobs-results-header">
        <span>Showing <strong>{filteredJobs.length}</strong> matching positions</span>
      </div>

      <div className="jobs-list">
        {filteredJobs.map(job => {
          const matchScore = calculateJobMatch(job, profile);
          return (
            <div key={job.id} className="job-card-item">
              <div className="card-top-row">
                <div>
                  <h3 className="job-card-title">{job.title}</h3>
                  <div className="job-card-company">{job.company} • {job.location} ({job.workMode})</div>
                </div>
                <div className="match-score-badge">
                  <Sparkles size={14} /> {matchScore}% Match
                </div>
              </div>

              <p className="job-desc-snippet">{job.description}</p>

              <div className="job-skills-flex">
                {job.skills.map((s, idx) => {
                  const isUserSkill = profile.skills.some(us => us.name.toLowerCase() === s.toLowerCase());
                  return (
                    <span key={idx} className={`skill-tag ${isUserSkill ? 'matched' : ''}`}>
                      {isUserSkill ? 'Verified: ' : ''}{s}
                    </span>
                  );
                })}
              </div>

              <div className="card-bottom-row">
                <div className="job-meta-details">
                  <span>Source: <strong>{job.source}</strong></span>
                  <span>Exp: {job.experienceMin}–{job.experienceMax} yrs</span>
                  <span>Salary: {job.salaryRange || 'Disclosed upon application'}</span>
                </div>

                <div className="job-card-actions">
                  <button 
                    className="btn-outline-sm"
                    onClick={() => {
                      onSelectJobForAnalysis(job);
                      onNavigateTab('job-analyzer');
                    }}
                  >
                    <FileCheck size={14} /> Analyze Requirements
                  </button>
                  <button 
                    className="btn-primary-sm"
                    onClick={() => {
                      onSelectJobForAnalysis(job);
                      onNavigateTab('editor');
                    }}
                  >
                    <Sparkles size={14} /> Tailor Resume
                  </button>
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-icon-link"
                    title="View Original Posting"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
