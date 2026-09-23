# Product Requirements Document (PRD)

## Product
**CareerDiscover AI** — Autonomous Multi-Agent AI Resume Builder & Career Platform

## Problem
Software engineering candidates face significant obstacles when applying for technical positions:
1. Over 75% of resumes fail automated Applicant Tracking System (ATS) filtering due to term mismatches, formatting issues, or missing domain terminology.
2. Standard AI chatbots produce generic, unverified bullet points that lack real engineering metrics and fail candidate authenticity checks.
3. Translating technical software projects into quantified accomplishment bullets is time-consuming and error-prone.

## Target Users
- Software Engineers, Full-Stack Developers, DevOps Engineers, Data Analysts, and STEM Students seeking high-conversion ATS resumes.

## Goal
Build an autonomous, client-side React 19 application using Multi-Agent AI orchestration, Retrieval-Augmented Generation (RAG), and TF-IDF term matching to optimize candidate resumes for targeted job descriptions with zero server overhead.

## Core Features
1. **Candidate Profile & JD Ingestion**: Input candidate baseline work history, technical skills, and target Job Description.
2. **ATS Match Matrix Engine**: TF-IDF keyword overlap calculation with missing keyword alerts and score breakdown (0–100%).
3. **RAG Vector Search**: Contextual retrieval from pre-indexed engineering project portfolios.
4. **Action-Verb-Metric Bullet Enhancer**: OpenAI GPT-4 powered bullet rewriting following strict quantifiable impact standards.
5. **Anti-Hallucination Fact Check**: Automated verification agent preventing ungrounded candidate claims.
6. **Multi-Template Visual Renderer**: Live switching between *Tech Blueprint*, *Classic Corporate*, and *Modern Split* resume templates.
7. **Retina Client-Side PDF Export**: 2.0x High-DPI canvas capture yielding pixel-perfect vector ATS PDFs via `html2canvas` + `jsPDF`.

## MVP Scope
- Baseline candidate ingestion form
- Target JD parser & ATS score gauge
- OpenAI integration for bullet optimization
- 3 visual resume templates
- Client-side PDF export functionality

## Out of Scope (Version 1)
- Paid subscription tier / payment gateway
- Social feed or candidate messaging network
- Native iOS / Android mobile application
- Cloud user account persistence backend

## Success Criteria
- User can input profile & target JD and receive a complete ATS analysis in < 2.5 seconds.
- Generated PDF exports maintain exact styling without text clipping or layout breaks across A4 pages.
