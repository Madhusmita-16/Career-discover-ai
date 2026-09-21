import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Plus 
} from 'lucide-react';
import type { ApplicationItem, ApplicationStatus } from '../../types/resume';
import { 
  getStoredApplications, 
  updateApplicationStatus, 
  getApplicationStats 
} from '../../services/applicationTrackerService';

interface Props {
  onNavigateTab: (tab: string) => void;
}

export const ApplicationTrackerView: React.FC<Props> = ({ onNavigateTab }) => {
  const [applications, setApplications] = useState<ApplicationItem[]>(() => getStoredApplications());

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    const updated = updateApplicationStatus(appId, newStatus);
    setApplications(updated);
  };

  const stats = getApplicationStats(applications);

  const columns: { status: ApplicationStatus; title: string }[] = [
    { status: 'saved', title: 'SAVED' },
    { status: 'ready', title: 'READY' },
    { status: 'applied', title: 'APPLIED' },
    { status: 'assessment', title: 'ASSESSMENT' },
    { status: 'interview', title: 'INTERVIEW' },
    { status: 'offer', title: 'OFFER' },
    { status: 'rejected', title: 'REJECTED' }
  ];

  return (
    <div className="applications-container">
      {/* Analytics Header Metrics */}
      <div className="apps-analytics-header">
        <div className="analytics-card">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total Pipeline</div>
        </div>
        <div className="analytics-card">
          <div className="stat-num text-purple">{stats.applied}</div>
          <div className="stat-label">Submitted Applications</div>
        </div>
        <div className="analytics-card">
          <div className="stat-num text-orange">{stats.interviews}</div>
          <div className="stat-label">Active Interviews</div>
        </div>
        <div className="analytics-card">
          <div className="stat-num text-green">{stats.offers}</div>
          <div className="stat-label">Job Offers</div>
        </div>
        <div className="analytics-card">
          <div className="stat-num text-blue">{stats.responseRate}%</div>
          <div className="stat-label">Response Rate</div>
        </div>
      </div>

      {/* Response Rate Insight Bar */}
      <div className="response-insights-card">
        <div className="insight-title"><TrendingUp size={16} /> Application Analytics Feedback Loop</div>
        <div className="insight-grid">
          <div className="insight-item">
            <span>Java Backend Resume: <strong>28% Response Rate</strong></span>
            <div className="mini-progress-bg"><div className="mini-progress-fill green" style={{ width: '28%' }} /></div>
          </div>
          <div className="insight-item">
            <span>Full Stack Resume: <strong>21% Response Rate</strong></span>
            <div className="mini-progress-bg"><div className="mini-progress-fill blue" style={{ width: '21%' }} /></div>
          </div>
          <div className="insight-item">
            <span>Applied within 0-2 Days of posting: <strong>31% Response Rate</strong></span>
            <div className="mini-progress-bg"><div className="mini-progress-fill orange" style={{ width: '31%' }} /></div>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="kanban-board-wrapper">
        <div className="kanban-header">
          <h2>Application Pipeline</h2>
          <button className="btn-primary-sm" onClick={() => onNavigateTab('jobs')}>
            <Plus size={14} /> Add Application from Jobs
          </button>
        </div>

        <div className="kanban-columns-grid">
          {columns.map(col => {
            const items = applications.filter(a => a.status === col.status);
            return (
              <div key={col.status} className="kanban-column">
                <div className="col-header">
                  <span className="col-title">{col.title}</span>
                  <span className="col-count">{items.length}</span>
                </div>

                <div className="col-items-list">
                  {items.map(item => (
                    <div key={item.id} className="kanban-item-card">
                      <h4 className="item-title">{item.jobTitle}</h4>
                      <div className="item-company"><Building2 size={13} /> {item.company}</div>
                      <div className="item-location">{item.location}</div>

                      {item.matchScore && (
                        <div className="item-match">Match Score: {item.matchScore}%</div>
                      )}

                      {item.salaryOffered && (
                        <div className="item-salary text-green">Offer: {item.salaryOffered}</div>
                      )}

                      {item.notes && (
                        <p className="item-notes">{item.notes}</p>
                      )}

                      <div className="item-actions">
                        <select 
                          value={item.status}
                          onChange={e => handleStatusChange(item.id, e.target.value as ApplicationStatus)}
                          className="status-select"
                        >
                          <option value="saved">Move to Saved</option>
                          <option value="ready">Move to Ready</option>
                          <option value="applied">Move to Applied</option>
                          <option value="assessment">Move to Assessment</option>
                          <option value="interview">Move to Interview</option>
                          <option value="offer">Move to Offer</option>
                          <option value="rejected">Move to Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="empty-col-placeholder">No applications</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
