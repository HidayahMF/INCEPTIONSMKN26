# INCEPTION26 — Design & Implementation Contract

> Scope: authenticated Student, Teacher, BK, MPK, Merchant, Cooperative, and Admin services. This is an implementation contract for OpenCode, **not** a license to redesign public pages. Baseline: repository `HidayahMF/INCEPTIONSMKN26`, branch `main`, inspected 24 Oct 2026. Before implementation, audit current local working tree; local state may be newer.

## 0. Non-negotiable competition constraints
- Grand Final evaluation: chatbot AI 30%, functionality 25%, UI/UX and responsive 20%, technical/deployment 10%, demo/presentation 15%.
- A visually finished, non-working feature is NOT implemented. Functional extras matter more than sheer number of pages. Do not add fake buttons or claim demo data are live.
- Protect the already-working public site, AI chat, and Learning flow. No repo secrets, credentials, or tokens. Public deploy and repository must match.
- The guidebook schedule has entries for 25 and 26 October 2026; confirm the **actual submission cutoff** against official committee message rather than trusting a 12:00 AM assumption.

## 1. Inspect-first workflow
Read, don't overwrite blindly:
1. `frontend/src/styles/tokens.css`, `frontend/src/layouts/StudentPortalLayout.tsx`, `frontend/src/layouts/TeacherPortalLayout.tsx`, `frontend/src/layouts/PortalLayout.tsx`.
2. Public exemplars: actual homepage and strong public internal pages, inspect their DOM, rhythm, typography, blue outlines, buttons, images and responsive breakpoints.
3. Current student components under `frontend/src/components/student/`, including `StudentDashboardSections.tsx`; pages `StudentPortfolioPage.tsx`, `StudentPklPage.tsx`, `StudentLostFoundReportPage.tsx`, `DashboardPage.tsx`.
4. Existing learning APIs and permission middleware; inspect migrations/schema, Supabase setup, session context and uploaded-file patterns before adding endpoints.
5. Produce a short inventory of each control: LIVE / DEMO / DISABLED / BROKEN / MISSING, with file path and network endpoint. Never classify from appearance alone.

## 2. Source-of-truth visual identity
Actual tokens in `frontend/src/styles/tokens.css`:
- Font: `Inter Variable`, `Inter`, sans-serif. Do NOT replace with generic Poppins/Roboto or decorative font.
- `primary #0092ff`; `primary-dark #006cdc`; `soft-blue #4cbaf5`; `light-blue #d7f1ff`; `school-bg #eaf5fa`; `ink #0b1324`; `muted #5b6b8c`; `surface #ffffff`.
- Current portal background `#f3f7fd`, content max width `1400px`, desktop sidebar offset `247px`, page spacing `px-5 py-7`, sm `px-8`, lg `py-8`.
- Existing portal section card baseline: rounded-2xl, `border-[#e1e9f4]`, white fill, restrained `0 2px 8px rgba(25,63,112,.02)` shadow, `p-5`. This is a reference, not a reason to put every element in a card.
- Existing inputs: height `44px`, `rounded-xl`, quiet blue-gray border `#cbd9ea`, blue focus.
- Use blue as the principal accent, while retaining white and cool neutrals. Do not introduce rainbow KPI icons or arbitrary accent palettes. System state color may be applied sparingly for accessible semantic status, not decoration.
- Use the exact existing shared topbar, sidebar, breadcrumbs and main-content container; reuse established typography and scale. Inspect real public styles before claiming pixel parity.

## 3. Anti-AI-slop rules
- DO NOT create generic SaaS dashboard look, unrelated gradient banners, excessive glossy glass panels, enormous rounded cards, nested cards, colorful pill spam, arbitrary KPI grids, neon shadows, floating emoji, motion on every element, or randomly chosen 3D stock art.
- Each screen must have a clear primary action and a coherent information hierarchy: eyebrow if appropriate, heading, explanatory microcopy only where useful, primary task workspace, secondary details. Prioritize workflows above decorative dashboards.
- Visual density should be purposeful. Use border/divider and whitespace before drop shadow. Keep alignment and horizontal margins consistent. No repeating 4 identical stat cards unless the metrics are actionable.
- Keep the public site's visual DNA (Inter, vivid school blue, light surfaces, clean outlines, sparing gradients, confident hierarchy) translated into a denser authenticated workflow—not copy-paste public landing page hero sections into form screens.
- Real assets first: reuse `/assets` when semantically apt, only create new images for meaningful states/illustrations. UI controls and status icons should generally be Lucide/SVG vectors rather than large raster 3D art. Decorative artwork must not impair loading or accessible information.
- Avoid invented statistical values, testimonials, industries, applicants, counts or activity. Demo fixtures must be explicitly labeled demo and segregated from production.
- No naked alert() for core actions, no 'segera hadir' on features marked complete, no dead CTA, no fake select values.

## 4. Components and interaction system
- Headings: use existing public/portal title semantics; page H1 once; H2 for functional sections; data tables with accessible headers.
- Buttons: primary blue high-contrast, secondary outlined, tertiary link; consistent focus visible, loading, disabled and success states. Never hover-scale a dense table action excessively.
- Cards: border-led `rounded-2xl`, white, restrained shadow. Use table/list view for applications, records, approvals; don't transform every row into cards.
- Form patterns: visible labels, required markers, inline validation, save/discard, upload progress, success/error messaging, unsaved-change handling where justified.
- Status: explicit text, timestamps and actor; never color alone. Document allowed transitions per feature. Use neutral / blue as default; alert colors only when semantically warranted.
- Empty states: explain what is empty and offer one useful CTA; don't generate fictional demo records for real accounts.
- Loading: skeleton shaped like final content; error: actionable retry; retry must be wired.
- Responsive: mobile 320–375px min, tablet and desktop. Sidebar becomes overlay; forms one column mobile; tables can scroll with column priority and visible affordance. No horizontal body overflow.
- Accessibility: keyboard navigation, focus, dialog close/escape, alt text, semantic names, sufficient contrast, reduced-motion respect.

## 5. Information architecture — existing UI first
Preserve route names unless necessary, preserve public routes unchanged.
- Portfolio & achievements: student listing, detail/edit/new, teacher verification queue.
- BKK/PKL: opportunities list/detail, student apply/track, BKK/teacher opportunity management and application review.
- Lost & Found: list, report, detail, BK moderation and handover.
- Aspirasi: class representative submission, history/status, MPK review/reply.
- Kantin: menu, cart/preorder, order status; merchant menu/order ops (payment postponed unless independently ready).
- Admin: basic users/roles and operational overviews after core flows, do not build a decorative empty analytics dashboard.

## 6. Feature-completion contracts
### P0 — Portfolio + Prestasi
- Authenticated student CRUD; owner-only edits; validation; upload through sanctioned server/storage pattern (size/MIME restrictions, generated safe paths).
- Student status DRAFT -> SUBMITTED -> VERIFIED/REJECTED; reviewer notes; resubmission; never self-verify.
- Verified, consent-appropriate records can surface publicly; unverified and private data must never leak.
- Remove `demoPortfolioProjects` and `demoStudentAchievements` from production renders only after replacing with working API, real empties and error states.
- Acceptance: create -> refresh -> persists -> teacher review -> student sees change -> public visibility only if authorized.

### P1 — BKK / PKL
- Teacher/BKK create/publish opportunities. Student filters and views details; apply with a real CV upload and selected owned portfolio references.
- Persist single application per student/opportunity as dictated by policy; statuses Submitted -> Under Review -> Additional Documents / Interview -> Accepted or Rejected, with validated transitions.
- Teacher/BKK review, annotate and change status; student sees latest result. Limit applicant visibility by role; protect CV URLs.
- Acceptance: student submits -> DB record -> reviewer sees -> changes status -> student sees after refresh.

### P2 — Lost & Found
- Student report lost/found record with photo and data validation; persistent list/detail, owner restrictions; BK verifies and records handover with audit info.
- Acceptance: report -> appears from API -> BK verifies -> recipient/time recorded -> status updated.

### P3 — Aspirasi Kelas
- Authorize CLASS_REP for submission, MPK_OFFICER (or approved management role) to review/respond; sensible category and status model, discussion history.
- Acceptance: class rep submits -> MPK reviews/replies -> author reads status/reply.

### P4 — Kantin Lite
- Merchant CRUD menu/stock and order management; student menu -> create preorder -> track status -> pickup.
- No fake payment integration. Treat money and inventory transitions atomically and server-side; check authorization.
- Acceptance: student orders -> merchant accepts -> marks ready -> student sees -> completes.

### P5 — Operational Admin
- Role and account management with server-side permission checks, verified operational counts, minimal audit record. Reuse existing roles/permissions; no hardcoded client-only authorization.

## 7. Backend, data, security
- Existing schema and backend architecture are source of truth; propose new migrations/API contracts before coding and avoid breaking existing learning/chat endpoints.
- Validate server-side, enforce RBAC AND record ownership, use least privilege, rate limits where relevant, sanitize text and upload types, avoid public storage buckets for sensitive CV/records, signed downloads where appropriate.
- Use transactional mutations for status updates/inventory/orders; audit who/when for approvals; stable pagination/filtering; structured errors.
- Prefer additive and reversible migrations; seed demonstration data only in clearly isolated test/demo environment, never represent it as real school operational data.
- Write unit/integration/e2e smoke tests for each vertical slice. Browser test as student and authorized reviewer, plus unauthorized role.

## 8. Agent work loop — repeat per vertical slice
1. Audit local code; note files, routes, existing backend and data.
2. Write 1-page implementation contract: API, schema, permissions, states and relevant exact UI components to reuse.
3. Implement smallest complete backend + frontend + role-reviewer flow.
4. Verify desktop/mobile, loading/error/empty/success, role security, persistent refresh, regression checks.
5. Report proof: files changed, migrations, endpoints, test commands/results, screen captures, live status, known gaps. Do not call it finished until acceptance path passes.
6. Commit in small independent units. If time is tight, ship fewer complete slices rather than broad fake-complete UI.

## 9. Deadline triage
Suggested slices: Portfolio -> PKL -> Lost & Found -> Aspirasi -> Kantin Lite -> admin polish. If blocked, stop expanding, stabilize functioning modules.
Reserve final portion of available time for production smoke tests of home, key public pages, login, chatbot grounded/out-of-scope, learning, and the newly completed flows; responsive checks and security. Confirm official final submission date/time, timezone and required deliverables directly from latest organizer instruction.

## 10. Agent quality gate / rubric
Pass all before accepting a screen:
- [ ] Looks like it belongs to SMKN26 public site and existing authenticated shell
- [ ] Same tokens/font and disciplined spacing; no unrelated design system
- [ ] Clear task hierarchy; primary action works
- [ ] No decorative fake data, dead buttons or non-functional forms
- [ ] Refresh persists actual writes; status is consistent between roles
- [ ] User cannot change records outside permissions
- [ ] Tested 375px, 768px, 1440px; keyboard and focus states
- [ ] Existing public, chatbot, learning flows remain working
- [ ] No secrets committed; deployment and repo represent same final state

## 11. Suggested direct OpenCode instruction
"Read DESIGN_INCEPTION26.md in full. Audit the CURRENT local repository; treat this file as the UI and feature acceptance contract. First report actual code-level deltas and propose the smallest complete vertical slice for Portfolio & Prestasi including backend persistence, upload and teacher verification. Match exact existing SMKN26 typography, tokens, shells and component language. Do not redesign public pages or create a generic SaaS dashboard. Implement and test the slice end-to-end, then proceed in priority order if stable. Never mark a feature complete without a persistent role-to-role acceptance test."
