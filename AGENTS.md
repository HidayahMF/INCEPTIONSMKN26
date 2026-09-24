# AGENTS.md — SMKN 26 School Website (DRAFT v0.2)

> Status: stack approved; exact Figma tokens and authentication onboarding are pending. This file governs any AI coding agent working in this repository.

## Locked stack and scope
- Frontend: React + TypeScript + Vite. Backend: **Express JavaScript (ES modules), NOT TypeScript**. Database: Supabase PostgreSQL. AI: server-side Gemini RAG using published school content + admin-uploaded, approved PDFs. Payments: **Midtrans Sandbox only**. Target hosting: Vercel frontend + serverless Express API; verify plan eligibility/quotas.
- Frontend styling: Tailwind CSS is the primary utility styling system, with approved Figma/team design tokens retained in `frontend/src/styles/tokens.css`. Figma is the design source of truth; do not copy the legacy school-site design or use unlicensed assets.
- One-developer seven-day build target is an aspiration, not proof of completion. Aim to finish all modules while guaranteeing a working public website, chatbot and submission artifacts by 3 October 2026. Never mark stub features as working.
- Repository: https://github.com/HidayahMF/INCEPTIONSMKN26.git. Read `ARCHITECTURE.md`, `RBAC.md`, `DATABASE.md`, `API_SPEC.md`, `ROADMAP.md` before code changes.
- Student/teacher identifier is NIS/NIP + password; account provisioning and onboarding are **UNDECIDED**. Do not invent open registration, default credentials or use date of birth as password.

## Mission and competition constraints
Build a responsive, original school-profile website for SMKN 26 Jakarta with an integrated AI school-information chatbot. The public school profile and chatbot are the core deliverable; the student/staff portal is a complementary module. Meet the initial-submission requirements by 3 October 2026 (confirm time and any schedule changes with the organizer).

Competition guidebook is the source of truth for rules. Initial submission: proposal PDF, public GitHub repository, 2–5 minute demonstration video, README; working landing page, core school information, navigation, mobile/desktop baseline, API-connected chatbot. Public deployment is not mandatory at this stage. No ready-made CMS/website builder. Never commit secrets.

## Instruction priority
1. User's latest explicit task and approved decisions.
2. Competition guidebook and team-approved PRODUCT_SPEC.md.
3. Team-approved DESIGN_SYSTEM.md and original Figma frames/assets.
4. Existing repository architecture and conventions.
5. Agent assumptions. If any required information is absent, ask; do not fabricate school facts, brand tokens, permissions, credentials, or Figma details.

## Agent work contract
- Before changing code: inspect current repository, report intended files, route/feature scope, dependencies, and potential conflicts.
- Implement one feature or small vertical slice at a time. Do not silently expand scope or add a new UI library, backend, database, payment provider, or AI provider.
- Reuse team-approved components and tokens; do not invent colors, fonts, spacing scales, or substitute generic visual styles for Figma.
- Keep public pages accessible without login; authenticate and authorize protected actions server-side.
- Never present placeholders, mock data, fake AI responses, fake payment successes, or nonfunctional buttons as completed features. Label demo data clearly.
- Never expose Gemini API keys, payment credentials, password hashes, student grades, private portfolio files, or other private data in client bundles, public APIs, prompt contexts, logs, or GitHub.
- For any data affecting a student's record, use authenticated identity and explicit role / class / ownership checks. Do not rely on client-provided role or student ID alone.
- For chatbot: retrieve only approved public-school knowledge for public users; return an explicit no-answer response when information is absent; show source/document references when available. Private academic data, if later supported, uses separate authenticated API tools with ownership checks, not a shared public RAG index.
- Official school information must originate from `https://smkn26jkt.sch.id/` or a team-approved source, retain source URL/retrieval metadata, and remain DRAFT until verified/approved. Never present unverified or stale statistics as current facts.
- The new SMKN 26 website must operate from its own database, backend, storage, and knowledge base. The legacy school website is migration provenance only and must never be a runtime dependency, fetch target, iframe, runtime asset host, or chatbot retrieval source.
- For payment: do not initiate real transactions without approved sandbox/test scope and configuration. Verify transaction state server-side from a trusted payment notification or status API; never trust client success screens.
- Run applicable tests, lint, and build; report executed commands/results. If unable to run, disclose this rather than claiming success.
- At the end: summarize changed files, working flows, unresolved items, and exactly how a teammate can verify them.

## Initial-submission hard requirements (not a cap on ambition)
1. Public landing page, school profile, majors, facilities, achievements/news and contact/location using verified content available to the team.
2. Navigation, responsive layout, shared design system, working links and meaningful empty/error states.
3. Working Gemini-backed chatbot for public school information; initial retrieval can be deliberately narrow, but responses must not invent school facts.
4. README, proposal, demo script/video and public repo that matches the demo.
5. Team aims for all eight product concepts during the seven-day sprint. Implement as many fully tested vertical slices as possible, but keep the initial-submission core and artifacts functional; one polished panorama is a useful early integrated example.

## Full product target
School panorama, grade-based learning recommendations, PKL/BKK applications, portfolio and achievements approval, lost & found and BK handover, canteen/co-op sandbox pre-orders, and class-based MPK aspirations are all desired in this sprint. Implement complete vertical slices with tested permissions; any unfinished scope must stay clearly marked PLANNED, not fake-complete.

## Open decisions — ask before implementing
- Verify current repo files and Vercel/Supabase deployment settings before scaffolding or overwriting.
- Exact Figma frames, styles, typography, color tokens, image assets and responsive variants.
- Content dataset and approval/contact person at school.
- Actual school content and panorama assets available during sprint; one developer assisted by agent.
- Authentication method and test accounts; permissions for minors' data and external sharing.
- Gemini API quota, KB update mechanism, references/citations and answer fallback.

## Definition of done for any implemented feature
A real entry point, supported happy path, permission checks where relevant, loading/empty/error states, desktop and mobile behavior, no exposed credentials, tested core flow, and documented demo steps. Status labels: PLANNED / IN PROGRESS / WORKING / VERIFIED. Never mark VERIFIED unless tested.
