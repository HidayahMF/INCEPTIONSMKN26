# API_SPEC — initial endpoint contract

Status: draft routes; implement only what is requested by a task. Prefix `/api`. All responses use `{ data, error }`, documented HTTP codes and input validation. Never leak stack traces or provider credentials.

## Public
- `GET /health` — basic runtime health (without leaking secrets).
- `GET /public/home`, `/public/majors`, `/public/facilities`, `/public/news`, `/public/achievements` — published content only.
- `GET /public/tour/:sceneId` — published panorama plus approved hotspots.
- `POST /chat` `{ message, conversationId? }` — rate-limited public RAG; response `{answer, sources: [{title, url?, page?}], status: answered|insufficient_evidence|out_of_scope}`; no private retrieval.
- `GET /public/pages?section=` and `GET /public/pages/:slug` — published public content only.

## Auth/admin (pending onboarding decision)
- `GET /me` — returns safe profile + effective scoped permissions from verified session.
- `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh` — identifier/password login with HTTP-only cookies; internal Auth email is never returned.
- `POST /dev/login-as` — development-only local quick login for the fixed synthetic demo allowlist. Returns `404` unless the backend flag, non-production mode, loopback request, and local frontend origin checks all pass. Passwords remain server-side environment values.
- `GET/POST/PUT/DELETE /admin/pages` — `CONTENT_EDITOR`/`ADMIN` protected public-page CRUD with DRAFT/PUBLISHED status.
- `GET /admin/knowledge`, `POST /admin/knowledge/text`, `POST /admin/knowledge/pdf`, `POST /admin/knowledge/:id/status` — protected source ingestion, PDF extraction, review and approval. Original PDFs remain in private Storage.
- `npm run import:official --workspace backend` — administrator-run, idempotent import of reviewed summaries from `smkn26jkt.sch.id`; inserts missing DRAFT records and never overwrites existing content.

Runtime independence: public endpoints and `/chat` read internal Supabase data only. Legacy source URLs are never used as fetch targets and are not emitted as public citation links.

## Future protected modules
- `/grades`, `/recommendations`, `/achievements`, `/portfolio`, `/cv`, `/pkl/vacancies`, `/pkl/applications`, `/lost-found`, `/aspirations`, `/merchants`, `/orders`, `/payments/midtrans/notification`.
- Every handler defines `authenticate`, `authorize(permission, scope)`, validation, ownership, audit and failure paths before UI wiring.
- Midtrans notification endpoint must validate trusted provider signature/status, handle duplicates and reject unsolicited state changes.
