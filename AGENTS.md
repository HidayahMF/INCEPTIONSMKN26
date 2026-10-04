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

## Figma → Web implementation contract
When the user asks to implement or align a Figma section, the agent owns the audit and implementation. The user should only need to provide a Figma link/file key and the section or node name/ID. Do not repeatedly ask the user to resolve asset mappings, icon direction, hover behavior, or text layout when the repository contains enough Figma data to determine them.

Global workflow:

1. Read `docs/figma-reference/` and `docs/figma-reference/interactions.json` before coding. Use the Figma REST API with `FIGMA_API_KEY` from the environment (never from chat or committed files) to fetch referenced nodes, image fills, dimensions, colors, gradients, shadows, fonts, and rendered PNGs.
2. Resolve local asset mapping automatically by comparing Figma image fills, node names, asset manifests, and `frontend/public/assets/figma/`. Keep uncertain assets rather than guessing or deleting them.
3. Read prototype reactions from `docs/figma-reference/interactions.json` when available. Implement trigger, destination state, easing, and duration from that data. If the interaction data is absent or ambiguous, use the existing section pattern first and ask one concise clarification only when implementation would otherwise be speculative.
4. Verify every SVG arrow's actual path direction. Rotate it explicitly when the intended direction differs; never trust filenames such as `left` or `right` blindly.
5. Default/hover visibility and card geometry must follow the verified Figma state and the user's latest explicit decision. Do not infer runtime behavior from a static node alone when prototype data exists.
6. Anchor variable-length content with bottom-anchored flex layout. CTA/detail controls must keep the same position for short and long text; clamp text only when Figma shows a fixed line count.
7. Guard hover effects against scroll-through and text selection. Draggable carousels must use pointer dragging, `user-select: none`, non-draggable images, scroll protection, and no body horizontal overflow.

Styling policy:

- Use existing design tokens and Tailwind utilities for new or actively refactored landing-page sections. Do not expand legacy global CSS for a new section unless an existing component requires it.
- Do not migrate the entire legacy stylesheet as part of an ordinary section task. A full CSS migration is a separate explicitly requested task.
- Prefer a small section-scoped style block or component utility classes over duplicated global overrides and `!important` cascades.
- Visual parity means matching composition, content, assets, behavior, and interaction feel. A small pixel difference from browser/font rasterization is acceptable unless the user explicitly requires pixel-perfect geometry.

Validation policy:

- See `## Validation Policy (permanent — default and mandatory)` below. That policy is authoritative and overrides the historical guidance that used to sit here.
- When a Figma PNG reference exists, compare against it by reading the image. Capturing fresh web screenshots into `artifacts/` is optional and must not be done automatically.

Reusable prompt: `Figma link/file key + section/node IDs + "match Figma and existing section behavior"`. If the user has a specific behavior override, the latest explicit instruction wins.

## Landing Page Section Order

Audit and recover the public landing page in this order, one section at a time, building after each:

1. Hero + Navbar
2. Quick Access
3. Overview
4. Advantages
5. Partners
6. Jurusan
7. Video Profile
8. Program
9. BLUD
10. Prestasi
11. News
12. AI CTA
13. Footer

For each section: read the current component, read `git show 40cf91f:<path>` for the pre-refactor baseline, read only the section-scoped CSS from `git show 40cf91f:frontend/src/styles/app.css`, compare assets, then port only the lost visual behaviour into Tailwind. Never checkout, revert, or restore `app.css`.

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

## Styling Rule (permanent — Tailwind-first)
This project uses Tailwind CSS as the primary and required styling system.
- AI agents MUST use Tailwind utility classes for application UI styling.
- Do NOT create application-owned `.css`, `.scss`, `.sass`, or `.less` styling.
- Do NOT add application-owned `@media`, `@keyframes`, `::before`, or `::after`.
- Use responsive Tailwind utilities such as `sm:`, `md:`, `lg:`, `xl:`, and arbitrary media variants like `min-[1272px]:` / `max-[639px]:` instead of CSS media queries.
- Use conditional React `className` for state-dependent styling.
- Use inline styles only when a value is genuinely dynamic and cannot reasonably be represented with Tailwind.
- Use React state, Web Animations API, or existing Tailwind animation utilities when animation behavior requires runtime control.
- Before creating new styling, search the existing codebase and reuse existing Tailwind patterns/components.
- Never move application CSS into another CSS file as a workaround.
- Preserve existing design, colors, spacing, responsive behavior, and functionality unless the user explicitly requests a change.
- Third-party dependency CSS may remain when it is genuinely owned and required by the dependency (e.g. `aos/dist/aos.css`, `@photo-sphere-viewer/core/index.css`, `@fontsource-variable/inter`).

Target state: `application-owned CSS = 0`. The only remaining application stylesheet is `frontend/src/styles/tokens.css`, which is the Tailwind entry point (`@import "tailwindcss"` + `@theme` design tokens) and must not contain additional rules.

## Validation Policy (permanent — default and mandatory)

This is the DEFAULT for this project. It overrides any earlier suggestion in this file that recommends running tests as part of ordinary frontend work.

### Default validation

For ordinary code changes — React components, Tailwind styling, responsive UI, animation, layout, assets/images, frontend refactors, and frontend bug fixes — the ONLY validation to run is:

```powershell
npm.cmd run build --workspace frontend
```

Do NOT run any of the following unless the user explicitly asks for E2E/Playwright/browser testing:

- `npx playwright test`
- Playwright E2E
- `npm run test:e2e`
- browser automation
- screenshot testing
- visual regression testing
- temporary E2E or probe files

### No temporary test files

Never create files such as `e2e/tmp-*.spec.ts` or `e2e/*probe*.spec.ts` to validate an ordinary change, and never create a throwaway test only to prove a UI change.

For animation work such as a marquee, rely on:

1. code inspection
2. comparison against the previous implementation/reference commit
3. TypeScript/build validation

Then run the build command above. If it passes, report exactly:

```text
Build: PASS
```

Do not add further validation automatically.

### Exception: explicit user request only

Playwright/E2E may be run only when the user explicitly asks, for example: "jalankan Playwright", "E2E", "browser test", "visual test", or an explicit request for runtime/browser verification.

If runtime verification appears necessary but the user has not asked for E2E, DO NOT run it. Explain that runtime verification requires Playwright/browser and wait for the user's instruction.

### No over-validation

More tests is not better. Prefer the minimum validation that is sufficient for the task. The normal frontend loop is:

```text
Edit
  ↓
Inspect
  ↓
npm.cmd run build --workspace frontend
  ↓
Report
```

Do not add Playwright merely because a change touches animation, responsive UI, or visuals.

### Temporary file cleanup

Never leave debugging or temporary test files in the repository. If the user explicitly requests a Playwright probe, delete the temporary probe/test file when finished, do not commit it, and report that the temporary file was removed.

### Reporting honestly

`Build: PASS` means the build passed. It is NOT proof of runtime or visual behavior. When runtime or visual behavior has not actually been verified, say so plainly instead of implying it was confirmed.

## Agent Workflow (styling/UI changes)
Before changing UI:
1. Read the relevant component and existing styling.
2. Search for existing Tailwind patterns.
3. Implement styling with Tailwind first.
4. Avoid introducing application-owned CSS.
5. Verify responsive behavior (desktop and mobile).
6. Run `npm.cmd run build --workspace frontend` before reporting completion, per the Validation Policy above. Do not run Playwright unless explicitly asked.

User request always outranks these defaults: if the user explicitly requests a specific CSS approach, follow the user's instruction.
