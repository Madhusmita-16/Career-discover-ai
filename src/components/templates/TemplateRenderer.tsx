import React from 'react';
import type { OptimizedResume, CandidateProfile } from '../../types/resume';

import { ATSClassic } from './ATSClassic';
import { ModernMinimal } from './ModernMinimal';
import { CorporateBlue } from './CorporateBlue';
import { DeveloperStack } from './DeveloperStack';
import { JavaBackend } from './JavaBackend';
import { FullStack } from './FullStack';
import { TechBlueprint } from './TechBlueprint';
import { ProfessionalTimeline } from './ProfessionalTimeline';
import { ProjectFirst } from './ProjectFirst';
import { Graduate } from './Graduate';
import { TwoColumnProfessional } from './TwoColumnProfessional';
import { Executive } from './Executive';
import { DataAI } from './DataAI';
import { CreativeTech } from './CreativeTech';
import { ProductEngineer } from './ProductEngineer';
import { ConsultingPro } from './ConsultingPro';
import { Monochrome } from './Monochrome';
import { ModernSplit } from './ModernSplit';
import { AchievementFocused } from './AchievementFocused';
import { PremiumSignature } from './PremiumSignature';

interface Props {
  resume: OptimizedResume;
  profile: CandidateProfile;
}

export const TemplateRenderer: React.FC<Props> = ({ resume, profile }) => {
  switch (resume.templateId) {
    case 'ats-classic':
      return <ATSClassic resume={resume} profile={profile} />;
    case 'modern-minimal':
      return <ModernMinimal resume={resume} profile={profile} />;
    case 'corporate-blue':
      return <CorporateBlue resume={resume} profile={profile} />;
    case 'developer-stack':
      return <DeveloperStack resume={resume} profile={profile} />;
    case 'java-backend':
      return <JavaBackend resume={resume} profile={profile} />;
    case 'full-stack':
      return <FullStack resume={resume} profile={profile} />;
    case 'tech-blueprint':
      return <TechBlueprint resume={resume} profile={profile} />;
    case 'professional-timeline':
      return <ProfessionalTimeline resume={resume} profile={profile} />;
    case 'project-first':
      return <ProjectFirst resume={resume} profile={profile} />;
    case 'graduate':
      return <Graduate resume={resume} profile={profile} />;
    case 'two-column-professional':
      return <TwoColumnProfessional resume={resume} profile={profile} />;
    case 'executive':
      return <Executive resume={resume} profile={profile} />;
    case 'data-ai':
      return <DataAI resume={resume} profile={profile} />;
    case 'creative-tech':
      return <CreativeTech resume={resume} profile={profile} />;
    case 'product-engineer':
      return <ProductEngineer resume={resume} profile={profile} />;
    case 'consulting-pro':
      return <ConsultingPro resume={resume} profile={profile} />;
    case 'monochrome':
      return <Monochrome resume={resume} profile={profile} />;
    case 'modern-split':
      return <ModernSplit resume={resume} profile={profile} />;
    case 'achievement-focused':
      return <AchievementFocused resume={resume} profile={profile} />;
    case 'premium-signature':
      return <PremiumSignature resume={resume} profile={profile} />;
    default:
      return <ModernMinimal resume={resume} profile={profile} />;
  }
};
