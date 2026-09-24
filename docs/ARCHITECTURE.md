# ARCHITECTURE — INCEPTIONSMKN26

Status: approved stack; infrastructure is a target architecture, not a deployed system. Last updated 2026-09-24.

## Decisions (locked)
- Repository: https://github.com/HidayahMF/INCEPTIONSMKN26.git
- Frontend: React + TypeScript + Vite; reusable public and private layouts.
- Backend: **Express + JavaScript (ES modules)**. Do not generate a TypeScript backend or `tsconfig` inside `backend/`.
- Database: Supabase PostgreSQL; migrations committed in `supabase/migrations/`.
- AI: server-side Gemini API, retrieval over approved public website content and admin-uploaded PDFs.
- Payment: **Midtrans Sandbox only** for demo. No real payments.
- Account login identifier: NIS for students / NIP for teachers + password; onboarding and credential-verification flow **not yet decided**.
- Deployment target: Vercel for Vite UI and serverless Express APIs, Supabase for DB/storage. Verify plan eligibility and quotas; do not promise always-free production usage.

## Request/data flow
Browser -> Vite SPA deployed on Vercel -> `/api/*` -> Express JavaScript handler deployed as serverless function -> PostgreSQL, private Supabase Storage, Gemini, Midtrans Sandbox. Never import server secrets into `frontend/`.

## Proposed monorepo layout
```
frontend/src/{app,routes,layouts,components,features,services,styles}/
backend/src/{app.js,modules,middleware,lib,services}/
backend/api/index.js  # adapter if required by verified deployment configuration
supabase/{migrations,seed}/
docs/{PRODUCT_SPEC,DESIGN_SYSTEM,ARCHITECTURE,DATABASE,RBAC,API_SPEC,ROADMAP}.md
AGENTS.md
```
Validate Vercel configuration against current official docs and a deployed minimal `/api/health` before building production integrations. No long-running Express server, in-process cron/scheduler, local filesystem persistence, or process-memory sessions on serverless.

## Identity and authorization
Do not invent a default student/teacher password or provision public self-signup until onboarding is approved. Store Supabase Auth UUID as canonical `user_id`, NIS/NIP as verified unique identifiers in a private profile mapping. Login-by-NIS/NIP needs a server-only resolver/authentication flow that does **not** expose someone else's email or credentials; never create passwords from birth dates or NIS. Server verifies session and permission on every protected request; React route guards are UX only. For a demo, use administrator-provisioned synthetic users while onboarding decision is open.

## Content and AI
`public_pages`/published CMS-like content (custom-built content admin, NOT a ready-made CMS) -> sanitized text extractor -> document chunks with source URL, page, published version and `visibility=PUBLIC` -> embeddings / full-text index -> relevant retrieved chunks -> Gemini prompt with strict instruction to answer only from retrieved sources -> evidence-aware response with citations and no-answer state. PDFs: admin-only upload, PDF type/size validation, private original storage, text extraction outside request-critical path if lengthy; indexed copies become public only after human approval. Public RAG must NEVER index grades, CVs, student profiles, private achievements evidence or lost-property verification details. A prompt is not a privacy boundary.

## Storage and workflows
Use private buckets + signed URLs for CV, certificates and lost-property proof. Panorama assets may be public after rights check; compress and lazy load. Use transactions/constraints for one PKL application per vacancy/student, one active aspiration submission per class/cycle, and order/payment state changes. Midtrans callback must be authenticated, idempotent and reconciled with server-to-server status, never client-only success.

## Quality gates
Local API health route, frontend build, backend tests, migration checks, RBAC cross-account denial tests, empty/error/mobile states, RAG no-answer tests, sandbox payment pending/success/failure tests. Never label functionality done until exercised end-to-end.
