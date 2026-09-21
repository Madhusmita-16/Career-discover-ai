import type { InterviewQuestion, CandidateProfile, JobDescriptionData } from '../types/resume';

export function generateInterviewQuestions(
  jd: JobDescriptionData,
  _profile: CandidateProfile
): InterviewQuestion[] {
  return [
    {
      id: 'iq-1',
      question: `Can you explain how Dependency Injection and Spring Beans work in Spring Boot?`,
      category: 'technical',
      expectedConcepts: ['Inversion of Control (IoC)', '@Autowired', 'Component Scanning', 'Bean Lifecycle'],
      sampleAnswer: 'In Spring Boot, Inversion of Control delegates object instantiation to the Spring IoC container. Beans are annotated with @Component or @Service and injected using @Autowired or constructor injection.'
    },
    {
      id: 'iq-2',
      question: `How do you handle indexing and query optimization in PostgreSQL relational databases?`,
      category: 'technical',
      expectedConcepts: ['B-Tree Indexes', 'EXPLAIN ANALYZE', 'N+1 Query Problem', 'Composite Indexes'],
      sampleAnswer: 'Index frequently queried foreign keys and search columns using B-Tree indexes. Use EXPLAIN ANALYZE to detect sequential scans and resolve N+1 hibernate fetch issues using JOIN FETCH.'
    },
    {
      id: 'iq-3',
      question: `Describe a challenging bug you encountered in a project (like ${jd.jobTitle}) and how you systematically debugged it.`,
      category: 'behavioral',
      expectedConcepts: ['STAR Method', 'Root Cause Analysis', 'Log Inspection', 'Unit Testing Verification'],
      sampleAnswer: 'Follow the STAR method: describe the Situation, Task, Action (analyzing stack traces, writing automated regression tests), and the Result.'
    },
    {
      id: 'iq-4',
      question: `How would you architect a scalable RESTful microservice API for handle 10,000 requests per minute?`,
      category: 'system_design',
      expectedConcepts: ['Stateless API Services', 'Redis Caching', 'Load Balancer', 'Database Connection Pooling'],
      sampleAnswer: 'Use stateless Spring Boot microservices behind a load balancer, implement Redis caching for heavy read requests, and configure HikariCP connection pooling.'
    }
  ];
}

export function evaluateMockResponse(
  question: InterviewQuestion,
  userAnswer: string
): { score: number; feedback: string; keyMatched: string[]; missingConcepts: string[] } {
  const answerLower = userAnswer.toLowerCase();
  const matched = question.expectedConcepts.filter(concept =>
    answerLower.includes(concept.toLowerCase().split(' ')[0])
  );
  const missing = question.expectedConcepts.filter(concept => !matched.includes(concept));

  const ratio = question.expectedConcepts.length ? matched.length / question.expectedConcepts.length : 0.8;
  const score = Math.round(Math.min(98, Math.max(45, ratio * 90 + (userAnswer.length > 50 ? 10 : 0))));

  let feedback = 'Good response covering core fundamentals.';
  if (score >= 85) {
    feedback = 'Excellent answer! Strong domain terminology and clear structured reasoning.';
  } else if (score >= 65) {
    feedback = 'Decent answer. To improve, explicitly mention key technical architectural terms.';
  } else {
    feedback = 'Needs refinement. Incorporate specific implementation patterns and technical evidence.';
  }

  return {
    score,
    feedback,
    keyMatched: matched,
    missingConcepts: missing
  };
}
