# API_SPEC — initial endpoint contract

Status: draft routes; implement only what is requested by a task. Prefix `/api`. All responses use `{ data, error }`, documented HTTP codes and input validation. Never leak stack traces or provider credentials.

## Public
- `GET /health` — basic runtime health (without leaking secrets).
- `GET /public/home`, `/public/majors`, `/public/facilities`, `/public/news`, `/public/achievements` — published content only.
- `GET /public/tour/:sceneId` — published panorama plus approved hotspots.
- `POST /chat` `{ message, conversationId? }` — rate-limited public RAG; response `{answer, sources: [{title, url?, page?}], status: answered|insufficient_evidence|out_of_scope}`; no private retrieval.

## Auth/admin (pending onboarding decision)
- `GET /me` — returns safe profile + effective scoped permissions from verified session.
- `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh` — identifier/password login with HTTP-only cookies; internal Auth email is never returned.
- Admin content CRUD; admin PDF upload/publish; index/re-index status; do not publish uploaded PDF contents by default.

## Future protected modules
- `/grades`, `/recommendations`, `/achievements`, `/portfolio`, `/cv`, `/pkl/vacancies`, `/pkl/applications`, `/lost-found`, `/aspirations`, `/merchants`, `/orders`, `/payments/midtrans/notification`.
- Every handler defines `authenticate`, `authorize(permission, scope)`, validation, ownership, audit and failure paths before UI wiring.
- Midtrans notification endpoint must validate trusted provider signature/status, handle duplicates and reject unsolicited state changes.
