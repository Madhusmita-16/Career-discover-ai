export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  targetTitle: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
  keyAchievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export type SkillCategory = 
  | 'Languages' 
  | 'Frameworks' 
  | 'Databases' 
  | 'Cloud & DevOps' 
  | 'Tools' 
  | 'Soft Skills' 
  | 'Concepts';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency?: number; // 1-5
}

export interface SkillCategoryGroup {
  category: SkillCategory;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface CandidateProfile {
  id: string;
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillItem[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: string[];
  dsaProfiles?: string[];
}

export interface CategorizedKeywords {
  languages: string[];
  frameworks: string[];
  architecture: string[];
  apis: string[];
  tools: string[];
  actionVerbs: string[];
  domainTerms: string[];
  softSkills: string[];
}

export interface JobDescriptionData {
  id: string;
  jobTitle: string;
  companyName?: string;
  location?: string;
  experienceRequired?: string;
  rawText: string;
  cleanText: string;
  extractedKeywords: CategorizedKeywords;
  responsibilities: string[];
  qualifications: string[];
}

export type MatchStatus = 'matched' | 'transferable' | 'missing';

export interface SkillMatchResult {
  skillName: string;
  category: SkillCategory;
  status: MatchStatus;
  matchedWith?: string;
  note?: string;
}

export interface MatchAnalysis {
  jobTitle: string;
  totalRequirements: number;
  matchedCount: number;
  transferableCount: number;
  missingCount: number;
  matchPercentage: number;
  skillMatches: SkillMatchResult[];
  selectedProjectIds: string[];
  missingSkills: string[];
  keyRecommendations: string[];
}

export type AuditType = 'pass' | 'warning' | 'critical';
export type AuditCategory = 'Structure' | 'Keywords' | 'Formatting' | 'Content' | 'SEO';

export interface ATSAuditLog {
  id: string;
  type: AuditType;
  category: AuditCategory;
  message: string;
  recommendation: string;
}

export interface ATSScores {
  overallATSScore: number;
  jdMatchScore: number;
  keywordCoverageScore: number;
  readabilityScore: number;
  experienceRelevanceScore: number;
  auditLogs: ATSAuditLog[];
}

export type ResumeTemplateId = 
  | 'ats-classic' 
  | 'modern-minimal' 
  | 'corporate-blue' 
  | 'developer-stack' 
  | 'java-backend' 
  | 'full-stack' 
  | 'tech-blueprint' 
  | 'professional-timeline' 
  | 'project-first' 
  | 'graduate' 
  | 'two-column-professional' 
  | 'executive' 
  | 'data-ai' 
  | 'creative-tech' 
  | 'product-engineer' 
  | 'consulting-pro' 
  | 'monochrome' 
  | 'modern-split' 
  | 'achievement-focused' 
  | 'premium-signature';

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

export interface TemplateSettings {
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  lineHeight?: 'compact' | 'normal' | 'spacious';
  margins?: 'narrow' | 'normal' | 'wide';
  headerStyle?: 'left' | 'center' | 'split' | 'banner' | 'monogram';
  bulletStyle?: 'disc' | 'square' | 'arrow' | 'dash';
  dateStyle?: 'short' | 'long' | 'year';
  dividerStyle?: 'solid' | 'double' | 'dashed' | 'accent' | 'none';
  showIcons: boolean;
  sectionOrder?: string[];
  sectionsConfig?: SectionConfig[];
  customSections?: CustomSection[];
}

export type TemplateRoleCategory = 
  | 'Software Developer'
  | 'Java Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'Frontend Developer'
  | 'Data Scientist'
  | 'AI/ML Engineer'
  | 'DevOps Engineer'
  | 'Product Engineer'
  | 'Student'
  | 'Graduate'
  | 'Experienced Professional';

export type TemplateStyleCategory = 
  | 'ATS'
  | 'Minimal'
  | 'Modern'
  | 'Corporate'
  | 'Creative'
  | 'Executive'
  | 'Technical';

export type TemplateExperienceCategory = 
  | 'Fresher'
  | '0–2 years'
  | '2–5 years'
  | '5+ years'
  | 'All Levels';

export interface TemplateMetadata {
  id: ResumeTemplateId;
  number: string;
  name: string;
  shortDescription: string;
  recommendedRole: string;
  roleCategory: TemplateRoleCategory;
  styleCategory: TemplateStyleCategory;
  experienceCategory: TemplateExperienceCategory;
  atsCompatibilityScore: number;
  tags: string[];
  isRecommended?: boolean;
}

export interface OptimizedResume {
  id: string;
  candidateProfileId: string;
  targetJdId: string;
  targetTitle: string;
  summary: string;
  optimizedExperiences: WorkExperience[];
  selectedProjects: Project[];
  optimizedSkills: SkillCategoryGroup[];
  certifications: Certification[];
  education: Education[];
  templateId: ResumeTemplateId;
  customSettings: TemplateSettings;
  score: ATSScores;
  createdAt: string;
}

export interface ResumeVersion {
  id: string;
  versionName: string;
  targetRole: string;
  companyName: string;
  dateSaved: string;
  optimizedResume: OptimizedResume;
  jdText: string;
}

// -------------------------------------------------------------
// CareerOS AI Operating System Data Structures
// -------------------------------------------------------------

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  experienceMin: number;
  experienceMax: number;
  salaryRange?: string;
  skills: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  education: string[];
  postedDate: string;
  source: 'company_career_page' | 'greenhouse' | 'lever' | 'authorized_api' | 'user_url' | 'manual_input';
  url: string;
  description: string;
  matchPercentage?: number;
  applicationDeadline?: string;
}

export interface JobFilterState {
  search: string;
  location: string;
  experience: string; // 'all' | '0-1' | '1-2' | '2-3' | '3-5' | '5+'
  jobAge: string; // 'all' | '1' | '3' | '7' | '14' | '30'
  skills: string[];
  workMode: string; // 'all' | 'Remote' | 'Hybrid' | 'On-site'
}

export type ApplicationStatus = 
  | 'saved' 
  | 'analyzed' 
  | 'ready' 
  | 'applied' 
  | 'assessment' 
  | 'interview' 
  | 'final' 
  | 'offer' 
  | 'rejected';

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  status: ApplicationStatus;
  dateSaved: string;
  dateApplied?: string;
  dateUpdated: string;
  resumeVersionId?: string;
  coverLetter?: string;
  notes?: string;
  interviewDate?: string;
  salaryOffered?: string;
  matchScore?: number;
}

export type OpportunityCategory = 
  | 'hackathon' 
  | 'conference' 
  | 'webinar' 
  | 'competition' 
  | 'hiring_event';

export interface OpportunityEvent {
  id: string;
  title: string;
  organizer: string;
  category: OpportunityCategory;
  date: string;
  registrationDeadline: string;
  location: string;
  workMode: WorkMode;
  prize?: string;
  eligibility: string;
  skills: string[];
  url: string;
  isRegistered?: boolean;
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  userProficiency: number; // 0-100
  marketDemand: 'High' | 'Very High' | 'Moderate' | 'Critical';
  category: SkillCategory;
  recommendation: string;
  learningResources: { title: string; url: string; duration: string }[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'system_design';
  expectedConcepts: string[];
  sampleAnswer: string;
}

export interface InterviewTranscriptMessage {
  id: string;
  speaker: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface InterviewSession {
  id: string;
  company: string;
  jobTitle: string;
  createdAt: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  weakAreas: string[];
  recommendedTopics: string[];
  transcript: InterviewTranscriptMessage[];
}

export interface AgentTaskItem {
  id: string;
  agentType: string;
  taskType: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  priority: 'High' | 'Normal' | 'Low';
  startedAt: string;
  completedAt?: string;
  result?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  contextType?: 'job' | 'resume' | 'interview' | 'general';
  references?: string[];
}

export interface FactProvenance {
  id: string;
  claim: string;
  isVerified: boolean;
  evidenceSource?: string; // e.g. "Project: EduConnect LMS"
  status: 'verified' | 'unverified' | 'flagged';
  notes?: string;
}

