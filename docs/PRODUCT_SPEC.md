# PRODUCT_SPEC.md — SMKN 26 (DRAFT v0.2)

> This is a team discussion draft, not a claim that the features below are already implemented. Competiton target: website profil sekolah + integrated AI chatbot. Confirm facts, permissions, data, branding, and feasibility with the team/school.

## Product areas
### Public website (no login)
- Home / landing page: school identity, accessible summary, primary CTAs, school information.
- About school: profile, vision/mission/history, organizational structure and staff/unit information, school tour, industry partners.
- Majors: six departments in the team architecture draft, with description, competency, learning journey, gallery, achievements and industry links.
- School programs: LSP, OSIS/MPK, extracurriculars, BKK, verified BLUD units.
- Achievements, news, information portals, contact and school location.
- AI chatbot accessible from public pages; answer from approved school knowledge and identify information that is unavailable.

### Private portal (login and permission checks)
- Student: personal dashboard, own grades and recommendations (later), own portfolio, achievement applications, PKL application, lost-item reports and claims, canteen/co-op pre-order (later).
- Teacher: grade entry and material mapping (if authorized), approval of achievements; subject to scope and policy.
- Head of department / BKK officer: publish PKL opportunities and view applicants within own department/mandate; separate capability, not assumed granted to every teacher.
- BK staff: receive items, record custody, verify claimant, close handover.
- Class representative: submit one class-specific aspirations batch when an MPK collection window is open; other students cannot submit as class representative.
- MPK officer: view and process class-tagged aspirations without exposing submitter's name in MPK views.
- Canteen vendor and co-op operator: own catalog/orders/reporting only.
- Admin: approved public content, knowledge-base curation, accounts and scoped role assignments.

## Feature workflows
### A. Panorama school tour
Public user selects room/location -> opens 360-degree panorama -> navigates between approved hotspots -> sees room name, short description and accessible fallback for mobile/slow connection. Start with one real room; expand after asset capture and permission to publish.

### B. Public AI chatbot with RAG
Visitor asks about SMKN 26 -> backend retrieves approved public information -> Gemini composes answer from retrieved evidence -> UI presents answer and available references. When evidence is absent/insufficient, say information is unavailable and direct user to official school contacts or relevant page. Out-of-domain requests receive a short scope explanation. Never send private student records to the public knowledge base. Log minimal anonymous diagnostic data and protect API quota/rate limits.

### C. Academic improvement recommendations (private)
Authorized teacher records student's score with subject, topic/learning objective, assessment date and permissible threshold -> student sees own topic-level gaps -> teacher-approved resources and practice questions are suggested -> student reviews progress after practice. A low subject average alone cannot establish which topic is weak. The AI may explain or generate draft practice questions from an approved topic, but should not invent grades or replace teacher assessment.

### D. PKL/BKK + portfolio + achievements (combined feature)
Student owns portfolio -> enters achievements with event, organizer, date and evidence -> designated teacher approves/rejects with reason -> approved achievement appears in verified portfolio -> student selects approved CV template or uploads own CV -> authorized BKK/head-of-department publishes a vacancy -> eligible student applies once with explicit CV/portfolio selection -> officer sees applications and exports only the permitted necessary fields for company handoff. Keep upload size/type limits and ownership checks. If CV is required, disable application with a clear reason and link to complete/upload CV. Never make an unverified claim look school-certified.

### E. Lost & found + BK custody (private)
Finder logs item using safe description and optional photo, location/time found -> BK physically receives and marks IN_CUSTODY -> owner searches using descriptive keywords (optional AI-assisted semantic ranking of approved listings) -> owner requests claim -> BK checks proof of ownership privately -> BK records handover -> status CLAIMED. Hide distinctive verification details from public search results; avoid publishing student location/contact details. AI suggests possible matches, not proof of ownership.

### F. Digital canteen and co-op (Midtrans Sandbox)
Vendor/co-op manages own catalog and order capacity -> student places a pre-order -> price, pickup slot, and availability confirmed -> payment is processed using explicitly approved sandbox integration during development -> server validates verified payment state -> merchant prepares item -> pickup confirmed. Distinguish vendor revenue, refunds/cancellations and platform reporting. Co-op uniform orders use size/stock/pickup flows and can share reusable ordering components without sharing all business rules. Do not handle live transactions or real payment credentials in an unapproved demo.

### G. Class aspirations to MPK
School assigns class memberships and role assignments for a defined academic year -> authorized class representative compiles class aspirations -> submits a class-tagged batch during the approved submission window -> MPK sees class label, content, status and moderation history, but not representative's personal name -> MPK updates status and gives class-level feedback. Audit trail remains available only to authorized school administrators to handle abuse/duplicates; explain clearly to students that this is class-labeled, not fully anonymous to administrators. Confirm whether class members can propose/draft suggestions before representative submits.

## Delivery target and implementation status
Team targets a fully working website with all proposed modules within seven days. This is a target, not an assertion that completion is guaranteed. Guidebook initial-submission requirements (working public site, AI chatbot, GitHub/README, proposal and demo) are hard gates. Track each feature as PLANNED / IN PROGRESS / WORKING / VERIFIED only after tests; no fake working links or mock AI/payment successes.

## Approved technical decisions
Frontend React + TypeScript + Vite; backend Express **JavaScript**, Supabase PostgreSQL, public information + admin-uploaded approved PDF RAG with Gemini, Midtrans Sandbox only. Auth identifier NIS/NIP + password; signup/account provisioning **not yet decided**. Team collects real public school information and authorized assets; private/demo records synthetic unless authorization exists.

## Data and permission boundaries
- Use synthetic demo users/grades/applications/orders unless school approval and lawful handling are confirmed.
- Public information belongs in a curated public knowledge base; private profile, CV, achievement proof, grades and claim evidence must be stored and authorized separately.
- Server-side RBAC must support multiple independent capabilities: a teacher may also be BK, head of department or MPK advisor, while a student may be class representative. Role assignments need class/department/academic-year scope and expiry.
- Do not expose sensitive information in shared public repositories or public demo videos.
- The official school site `https://smkn26jkt.sch.id/` is the primary public-information source for the current import dataset. Imported records retain source URL and retrieval date, enter `DRAFT`, and require editor approval before public display or RAG retrieval. Legacy site layouts/assets are not copied without permission.
- The new website must operate using its own database, backend, storage, and knowledge base. The legacy school site is migration provenance only and must never be a runtime dependency.

## Open questions
[ ] Confirm actual primary domain/deployment and existing codebase.
[ ] Confirm verified school text, photos, partner and program names, and permission to publish.
[ ] Confirm which modules must be working by 3 October (vs final stage).
[ ] Confirm source of truth for teacher-entered grades and teacher/guardian approval.
[ ] Confirm organization of MPK privileges and class-representative terms.
[ ] Confirm source of vacancies and who is authorized to send applicant data to industry partners.
[ ] Confirm payment vendor scope, merchant accounts, sandbox access, refund/cancellation policies.
