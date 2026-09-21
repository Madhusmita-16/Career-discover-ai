import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Clock, 
  RefreshCw, 
  Pause 
} from 'lucide-react';
import type { AgentTaskItem } from '../../types/resume';
import { initialAgentTasks, getAgentStatusSummary } from '../../services/agentOrchestrator';

export const AgentMonitorView: React.FC = () => {
  const [tasks] = useState<AgentTaskItem[]>(initialAgentTasks);
  const summary = getAgentStatusSummary(tasks);

  const agentsList = [
    { name: 'Job Discovery Agent', status: 'Healthy', activeTasks: 1, latency: '120ms', success: '99.8%' },
    { name: 'Job Intelligence Agent', status: 'Healthy', activeTasks: 0, latency: '85ms', success: '100%' },
    { name: 'Eligibility Match Agent', status: 'Healthy', activeTasks: 0, latency: '95ms', success: '99.5%' },
    { name: 'Skill Gap Agent', status: 'Healthy', activeTasks: 0, latency: '110ms', success: '100%' },
    { name: 'Resume Tailoring Agent', status: 'Healthy', activeTasks: 0, latency: '340ms', success: '98.9%' },
    { name: 'ATS Analysis Engine', status: 'Healthy', activeTasks: 0, latency: '150ms', success: '100%' },
    { name: 'Cover Letter Agent', status: 'Healthy', activeTasks: 0, latency: '280ms', success: '99.2%' },
    { name: 'Company Research Agent', status: 'Healthy', activeTasks: 0, latency: '190ms', success: '99.7%' },
    { name: 'Application Kanban Agent', status: 'Healthy', activeTasks: 1, latency: '45ms', success: '100%' },
    { name: 'Event Discovery Agent', status: 'Scanning', activeTasks: 1, latency: '420ms', success: '96.5%' },
    { name: 'Interview Coach Agent', status: 'Healthy', activeTasks: 0, latency: '210ms', success: '99.9%' },
    { name: 'Career Coach RAG Agent', status: 'Healthy', activeTasks: 0, latency: '160ms', success: '100%' },
    { name: 'Analytics Agent', status: 'Healthy', activeTasks: 0, latency: '70ms', success: '100%' },
    { name: 'Notification Agent', status: 'Healthy', activeTasks: 0, latency: '30ms', success: '100%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Admin Header with Admin Console Badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem' }}>
            <span style={{
              padding: '3px 10px',
              borderRadius: '6px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.5px'
            }}>
              ADMIN CONSOLE
            </span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Multi-Agent Orchestration & System Health
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Real-time monitoring for 14 autonomous agents, Celery task queues, PostgreSQL pgvector embeddings, and API health.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}>
            <RefreshCw size={14} /> Refresh Logs
          </button>
          <button className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}>
            <Pause size={14} /> Pause Queue
          </button>
        </div>
      </div>

      {/* System Metrics Cards */}
      <div className="stats-4-grid">
        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} style={{ color: '#16A34A' }} /> System Health
          </div>
          <div className="stat-value" style={{ color: '#16A34A' }}>99.9%</div>
          <div className="stat-change">All 14 agents operational</div>
        </div>

        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={16} style={{ color: '#2563EB' }} /> Active Queue Depth
          </div>
          <div className="stat-value">{summary.activeCount} tasks</div>
          <div className="stat-change">Redis Celery worker pool</div>
        </div>

        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Database size={16} style={{ color: '#7C3AED' }} /> pgvector Embeddings
          </div>
          <div className="stat-value">148,290</div>
          <div className="stat-change">Indexed vector chunks</div>
        </div>

        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} style={{ color: '#D97706' }} /> Average Latency
          </div>
          <div className="stat-value">135ms</div>
          <div className="stat-change">FastAPI backend response</div>
        </div>
      </div>

      {/* Main Operational Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* 14 Agent Roster Matrix */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={18} style={{ color: 'var(--primary)' }} /> 14 Autonomous AI Agents Roster
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>14 Operational</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '480px', overflowY: 'auto' }}>
            {agentsList.map((agent, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className={`dot-green`} style={{ backgroundColor: agent.status === 'Scanning' ? '#D97706' : '#16A34A' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{agent.name}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span>{agent.latency}</span>
                  <span style={{ color: '#16A34A', fontWeight: 600 }}>{agent.success}</span>
                  <span className={`status-badge ${agent.status === 'Scanning' ? 'badge-related' : 'badge-matched'}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Task Execution Log */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={18} style={{ color: '#7C3AED' }} /> Real-Time Task Execution Log
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Live Queue</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '480px', overflowY: 'auto' }}>
            {tasks.map(task => (
              <div 
                key={task.id}
                style={{
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{task.agentType}</span>
                  <span className={`status-badge ${task.status === 'running' ? 'badge-related' : 'badge-matched'}`}>
                    {task.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Task: {task.taskType}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Result: {task.result}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  Started: {task.startedAt} {task.completedAt ? `· Completed: ${task.completedAt}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
