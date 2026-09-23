# Security & Data Privacy Guidelines

## Client-Side Privacy Policy
CareerDiscover AI processes candidate resumes and job descriptions locally in the browser environment. Zero user data, candidate details, or resume texts are transmitted to or stored on external application servers.

## Secret Management
- **API Keys**: OpenAI API keys are entered locally by the user or supplied via environment variables (`VITE_OPENAI_API_KEY`).
- **No Hardcoded Secrets**: Secrets must never be hardcoded in source code or pushed to Git repositories.

## Input Validation & Sanitization
- All raw text pasted into Job Description inputs is sanitized to prevent XSS script injection before DOM rendering.
- `html2canvas` captures sanitized DOM nodes only.

## Third-Party Integrations
- OpenAI API requests are issued over HTTPS using official SDK endpoints. Temperature is locked at `0.3` to reduce ungrounded outputs.
