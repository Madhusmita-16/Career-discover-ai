# Test Plan & Verification Matrix

## Overview
This document outlines the manual and automated verification procedures for CareerDiscover AI.

## Verification Checklist

### 1. Candidate Ingestion & Form Inputs
- [x] Candidate name, email, location, GitHub, LinkedIn fields populate correctly.
- [x] Adding/editing work experience items updates local React state without re-render glitches.
- [x] Pasting target Job Description triggers JD intelligence extraction.

### 2. ATS Engine & Scoring
- [x] Matching keywords correctly calculates score percentage (0–100%).
- [x] Missing required keywords trigger warning badges in the ATS dashboard.
- [x] Formatting checks flag non-standard bullet points or missing contact headers.

### 3. Multi-Agent AI Pipeline
- [x] OpenAI API key prompt displays correctly if key is not configured.
- [x] Bullet point optimizer returns Action-Verb-Metric bullets.
- [x] Fact check agent flags claims exceeding candidate baseline record.

### 4. Template Rendering & PDF Export
- [x] Template switcher instantly changes active resume preview (*Tech Blueprint*, *Classic Corporate*, *Modern Split*).
- [x] `html2canvas` captures DOM workspace at 2.0x Retina DPI scale.
- [x] `jsPDF` outputs multi-page A4 document with zero text clipping.

### 5. Cross-Browser & Responsive Controls
- [x] Desktop (1440px): 2-column editor and live preview side-by-side.
- [x] Tablet (768px): Stacked editor and preview with tab toggle.
- [x] Mobile (375px): Full-width input cards with bottom navigation bar.
