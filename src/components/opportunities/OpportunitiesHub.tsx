import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Clock 
} from 'lucide-react';
import type { OpportunityEvent } from '../../types/resume';
import { mockOpportunities, getRemainingDays } from '../../services/opportunityAgent';

export const OpportunitiesHub: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityEvent[]>(mockOpportunities);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleRegister = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => opp.id === id ? { ...opp, isRegistered: !opp.isRegistered } : opp)
    );
  };

  const filtered = opportunities.filter(opp => {
    if (selectedCategory === 'all') return true;
    return opp.category === selectedCategory;
  });

  return (
    <div className="opportunities-container">
      <div className="opp-header">
        <h2>Events & Hackathons Intelligence</h2>
        <p>Discover tech hackathons, developer conferences, hiring sprints, and competitions tailored for developers.</p>

        {/* Category Tabs */}
        <div className="opp-category-tabs">
          <button 
            className={`opp-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Opportunities
          </button>
          <button 
            className={`opp-tab ${selectedCategory === 'hackathon' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('hackathon')}
          >
            Hackathons
          </button>
          <button 
            className={`opp-tab ${selectedCategory === 'conference' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('conference')}
          >
            Conferences
          </button>
          <button 
            className={`opp-tab ${selectedCategory === 'hiring_event' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('hiring_event')}
          >
            Hiring Events
          </button>
        </div>
      </div>

      {/* Grid of Opportunities */}
      <div className="opp-grid">
        {filtered.map(opp => {
          const daysLeft = getRemainingDays(opp.registrationDeadline);
          return (
            <div key={opp.id} className="opp-card">
              <div className="opp-card-top">
                <span className={`opp-type-badge ${opp.category}`}>{opp.category.toUpperCase()}</span>
                <span className={`deadline-badge ${daysLeft <= 3 ? 'urgent' : ''}`}>
                  <Clock size={13} /> {daysLeft} days left to register
                </span>
              </div>

              <h3 className="opp-title">{opp.title}</h3>
              <div className="opp-organizer">Organized by: <strong>{opp.organizer}</strong></div>

              <div className="opp-meta-list">
                <div><MapPin size={14} /> {opp.location} ({opp.workMode})</div>
                {opp.prize && <div className="text-green"><Trophy size={14} /> {opp.prize}</div>}
                <div>Eligibility: {opp.eligibility}</div>
              </div>

              <div className="opp-skills-flex">
                {opp.skills.map((s, idx) => (
                  <span key={idx} className="opp-skill-tag">{s}</span>
                ))}
              </div>

              <div className="opp-card-actions">
                <button 
                  className={`btn-register ${opp.isRegistered ? 'registered' : ''}`}
                  onClick={() => toggleRegister(opp.id)}
                >
                  {opp.isRegistered ? <><CheckCircle2 size={16} /> Registered</> : 'Register Now'}
                </button>
                <a 
                  href={opp.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-external-link"
                >
                  Details <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
