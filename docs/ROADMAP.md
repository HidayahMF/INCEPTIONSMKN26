# ROADMAP — seven-day sprint, not a delivery guarantee

Competition initial submission: 2026-10-03 (confirm organizer's exact cutoff). Public school profile + API-backed AI chatbot are required. Proposal PDF, public GitHub repository with README, and 2–5 minute demo video are required. Do not sacrifice these for additional modules.

## Day 1 — foundation and design
Inspect repository and Figma. Approve UI tokens with designer; establish Vite/React TS, Express JS, Supabase migrations, `.env.example`, lint/test/build, Vercel proof of deployment and responsive header/landing shell. Define synthetic demo accounts and permissions; real account onboarding remains unapproved.

## Day 2 — public school website
Use school-verified texts, logo and authorized photos. Public home, profile, majors, programs, achievements, news, contact; one working panorama if asset is ready. Empty states if content is not yet supplied; never invent school facts.

## Day 3 — RAG vertical slice
Admin-supplied approved school text + one PDF; ingest/chunk, retrieval, Gemini server integration, citations and no-answer. Test relevant/irrelevant/out-of-scope questions, bad uploads, quota and API failures.

## Day 4 — login and academic/portfolio slice
Once onboarding is approved, implement auth, effective permissions, synthetic demo classes and grades, topic-level recommendations, achievement approval, CV and PKL path. If auth remains open, work only with explicitly labelled synthetic admin-provisioned demo accounts; no public self-registration.

## Day 5 — BK and MPK
Custody/claim/handover flows; class-scoped aspirational submission and MPK class-only views; ensure cross-role denial tests.

## Day 6 — canteen/co-op
Merchant-separated catalog, pickup, orders, payment attempts and Midtrans Sandbox callback validation, including pending/failure paths. No real payment.

## Day 7 — stabilization and submission assets
Full demo run, responsive/accessibility and security checks, GitHub README, proposal, 2–5-minute video, final test accounts using fake data and evidence of working paths. Keep unfinished modules documented as planned, not implemented. Freeze submitted main content after deadline per guidebook.

## Feature tracker (update after real tests)
| Area | Status | Evidence |
|---|---|---|
| Public website | PLANNED | — |
| Gemini RAG | PLANNED | — |
| Panorama | PLANNED | — |
| Auth/RBAC | BLOCKED — onboarding decision | — |
| Learning recommendations | PLANNED | — |
| Portfolio/PKL/achievements | PLANNED | — |
| Lost & found | PLANNED | — |
| MPK aspirations | PLANNED | — |
| Canteen/co-op sandbox | PLANNED | — |
