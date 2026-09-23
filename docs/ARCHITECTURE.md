# Technical Architecture

## Overview
CareerDiscover AI is structured as a client-side Single Page Application (SPA) powered by React 19, TypeScript, and Vite 8. All heavy AI orchestration, term matching, RAG context search, and PDF generation occur directly within the browser runtime.

## Tech Stack
- **Frontend Framework**: React 19.2, TypeScript 6.0
- **Build System**: Vite 8.3, ESBuild
- **Styling**: Tailwind CSS 3.4, Lucide React Icons
- **AI Services**: OpenAI API (GPT-4 / GPT-3.5), Multi-Agent Orchestrator
- **PDF Generation**: `html2canvas` 1.4, `jsPDF` 4.2
- **Testing & Quality**: Oxlint 1.8, ESLint, TypeScript Strict Rules

## Component Architecture
```
src/
├── components/
│   ├── dashboard/       # ATS Score Gauge, Missing Keyword Matrix
│   ├── editor/          # Candidate Profile & JD Input Editors
│   ├── templates/       # TechBlueprint, ClassicCorporate, ModernSplit Resume Views
│   ├── chat/            # AICareerChatPanel Assistant Widget
│   └── ui/              # Buttons, Modals, Badges, Toast Notifications
├── services/
│   ├── agentOrchestrator.ts    # Parallel & Sequential Agent Pipeline
│   ├── atsEngine.ts            # TF-IDF Term Overlap & Scoring Logic
│   ├── jdIntelligence.ts       # Job Description Extractor & Categorizer
│   ├── aiOptimizer.ts          # Action-Verb-Metric Bullet Enhancer
│   ├── careerRAGAgent.ts       # RAG Vector Search & Embeddings Engine
│   └── factVerificationAgent.ts# Hallucination Guardrail
├── types/
│   └── resume.ts        # TypeScript Interfaces & Data Contracts
└── App.tsx              # Central State Workspace Renderer
```

## Architectural Rules
1. **Zero Server Dependency**: All data processing and document generation run locally within the user browser environment.
2. **Strict Component Separation**: UI view components must not contain raw TF-IDF logic or direct OpenAI API HTTP requests; logic belongs in `services/`.
3. **Immutability**: React workspace state in `App.tsx` must be updated immutably using typed action handlers.
