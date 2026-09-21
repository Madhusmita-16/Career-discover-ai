import type { AgentTaskItem } from '../types/resume';

export const initialAgentTasks: AgentTaskItem[] = [
  {
    id: 'task-101',
    agentType: 'Job Discovery Agent',
    taskType: 'ingest_greenhouse_feed',
    status: 'completed',
    priority: 'High',
    startedAt: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString(),
    completedAt: new Date(Date.now() - 14 * 60 * 1000).toLocaleTimeString(),
    result: 'Discovered 128 open opportunities; normalized 42 eligible positions.'
  },
  {
    id: 'task-102',
    agentType: 'Job Intelligence Agent',
    taskType: 'parse_requirements_keywords',
    status: 'completed',
    priority: 'High',
    startedAt: new Date(Date.now() - 10 * 60 * 1000).toLocaleTimeString(),
    completedAt: new Date(Date.now() - 9 * 60 * 1000).toLocaleTimeString(),
    result: 'Extracted 14 technical skills & 8 domain terms for Software Engineer position.'
  },
  {
    id: 'task-103',
    agentType: 'Fact Verification Agent',
    taskType: 'audit_provenance_graph',
    status: 'completed',
    priority: 'High',
    startedAt: new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString(),
    completedAt: new Date(Date.now() - 7 * 60 * 1000).toLocaleTimeString(),
    result: 'Verified 100% of resume claims against master candidate profile evidence.'
  },
  {
    id: 'task-104',
    agentType: 'Resume Agent',
    taskType: 'generate_tailored_resume',
    status: 'completed',
    priority: 'Normal',
    startedAt: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString(),
    completedAt: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString(),
    result: 'Generated ATS Classic tailored version v4.'
  },
  {
    id: 'task-105',
    agentType: 'Event Intelligence Agent',
    taskType: 'scan_hackathons_conferences',
    status: 'running',
    priority: 'Normal',
    startedAt: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString(),
    result: 'Scanning Smart India Hackathon & AWS Community Day registration deadlines...'
  },
  {
    id: 'task-106',
    agentType: 'Application Agent',
    taskType: 'prepare_application_package',
    status: 'pending',
    priority: 'Normal',
    startedAt: new Date().toLocaleTimeString(),
    result: 'Waiting for human review of Cover Letter and ATS Resume PDF.'
  }
];

export function getAgentStatusSummary(tasks: AgentTaskItem[]) {
  const activeCount = tasks.filter(t => t.status === 'running').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const systemHealth = '100% Operational';
  return {
    activeCount,
    completedCount,
    totalTasks: tasks.length,
    systemHealth
  };
}
