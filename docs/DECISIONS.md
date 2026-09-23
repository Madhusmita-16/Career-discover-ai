# Architectural Decision Records (ADRs)

## ADR-001: Client-Side Single Page Application Architecture
- **Status**: Accepted
- **Decision**: Build CareerDiscover AI as a zero-backend Vite + React 19 SPA.
- **Rationale**: Keeps candidate resume data strictly private on the user's local machine, reduces hosting costs, and simplifies deployment to Vercel/Netlify.

## ADR-002: Multi-Agent Specialization Pattern
- **Status**: Accepted
- **Decision**: Separate AI duties into dedicated micro-agents (`jdIntelligence`, `atsEngine`, `aiOptimizer`, `careerRAGAgent`, `factVerificationAgent`) coordinated by `agentOrchestrator`.
- **Rationale**: Prevents monolithic prompt hallucinations and enables fast parallel execution in < 2.5 seconds.

## ADR-003: Client-Side PDF Generation via html2canvas & jsPDF
- **Status**: Accepted
- **Decision**: Generate PDF resumes client-side using `html2canvas` 1.4 (Retina 2.0x scale) + `jsPDF` 4.2.
- **Rationale**: Eliminates the need for headless Puppeteer server instances and ensures 100% visual parity with browser live preview.
