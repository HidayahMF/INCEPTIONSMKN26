# INCEPTIONSMKN26 — SMK Negeri 26 Jakarta

Website profil SMK Negeri 26 Jakarta untuk lomba INCEPTION 2026. Frontend React + TypeScript + Vite; backend Express **JavaScript**; database Supabase PostgreSQL. Public AI RAG, panorama, and Midtrans Sandbox remain planned. Auth/RBAC is implemented as a Supabase-backed foundation and requires configured infrastructure.

## Run locally
1. Install Node.js 20+ and run `npm install` at repository root.
2. In terminal A run `npm run dev:api`.
3. In terminal B run `npm run dev` and open http://localhost:5173.
4. Run `npm run check && npm run build` for type/syntax checking and frontend build.

The public UI uses the approved design tokens and local project assets. It does not expose credentials or student records. Public content and knowledge-base/RAG APIs require the additional migration and approved sources below. Login uses server-only identifier mapping, Supabase Auth, HTTP-only cookies, `/api/me`, and additive role assignments. Keep service-role secrets on the backend only.

## Public content and chatbot
1. Apply `supabase/migrations/202609240002_public_content_knowledge.sql` after the identity migration.
2. Create the private Supabase Storage bucket named `knowledge-private` (or set `SUPABASE_KNOWLEDGE_BUCKET` to an existing private bucket). The bucket must not be public.
3. Start the API and open public routes such as `/profile`, `/organization`, `/majors`, `/tour`, `/partners`, `/blud`, `/programs`, `/achievements`, `/news`, `/information`, and `/contact`. They read only `PUBLISHED` `public_pages`; without verified content they show an empty state.
4. A user with an active `CONTENT_EDITOR` or `ADMIN` assignment can open `/admin/knowledge`. Add verified text or PDF sources, inspect their draft status, then approve them. Only `APPROVED` sources with `visibility=PUBLIC` are retrieved by the public chatbot.
5. Set `GEMINI_API_KEY` only in the backend environment. The backend performs keyword/full-text-style retrieval over approved chunks, selects at most five matching chunks, and sends only those chunks to Gemini. This is not vector RAG: no embeddings or vector similarity are used. The chatbot returns `insufficient_evidence` or `out_of_scope` when sources do not support the question.

PDFs are restricted to `application/pdf`, 10 MB, are extracted server-side, stored in a private bucket, and remain draft until approved. Do not upload grades, private profiles, CVs, credentials, or other restricted data.

## Official content import
The reviewed source dataset is `data/smkn26-official-content.json`. It contains original summaries from the official SMKN 26 website, with source URLs and retrieval date `2026-09-24`. Run this only after checking/applying `supabase/migrations/202609240002_public_content_knowledge.sql` to the intended Supabase project:

```bash
npm run import:official --workspace backend
```

The importer is idempotent: it inserts missing `public_pages` and knowledge records as `DRAFT`, skips existing slugs/source documents, does not truncate tables, and never overwrites existing published/admin-edited content. An editor must approve records before they appear publicly or are retrieved by the chatbot. The SIJA and TKR source pages returned generic/template content during review, so their details are explicitly limited rather than invented.

## Landing page
The home route is split into reusable React components under `frontend/src/components/public/` for the navbar, hero, shortcut menu, school overview, advantages, partner section, news, and footer. Tailwind v4 utilities use the approved token theme, and approved local assets are served from `frontend/public/assets/`.

## Runtime independence
The new site is self-contained after migration/import. Normal browser requests use the frontend, Express API, Supabase PostgreSQL/Storage, and Gemini only. The old school site is referenced only by migration-audit metadata and the administrator-run initial import dataset; it is never fetched by the frontend, public API, chatbot retrieval, or normal backend request path. Public chatbot citations use the new site's routes.

## Supabase auth/RBAC setup
1. Copy `.env.example` to a private backend environment file and fill `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Never prefix the service key with `VITE_`.
2. Apply `supabase/migrations/202609240001_core_identity_rbac.sql` to an empty Supabase project with the Supabase CLI or SQL editor. Migrations are not executed by this repository automatically.
3. For synthetic demos only, provide strong, unique shell environment variables named `DEMO_PASSWORD_DEMO_ADMIN`, `DEMO_PASSWORD_DEMO_GURU`, `DEMO_PASSWORD_DEMO_BK`, `DEMO_PASSWORD_DEMO_KAJUR`, `DEMO_PASSWORD_DEMO_SISWA`, `DEMO_PASSWORD_DEMO_KELAS`, `DEMO_PASSWORD_DEMO_MPK`, `DEMO_PASSWORD_DEMO_KANTIN`, and `DEMO_PASSWORD_DEMO_KOPERASI`, then run `npm run provision:demo --workspace backend`. Do not place these values in `.env.example`, source control, screenshots, or chat.
4. Start the API with `npm run dev:api`; start Vite with `npm run dev`. Visit `/login` only with an administrator-provisioned account.

The private `auth_identity_mappings` table maps normalized school identifiers to an internal Auth email. The email is never returned to the browser. Profiles are private, role assignments are additive and expiry-aware, and backend middleware is authoritative. RLS is defense in depth; service-role queries still apply explicit user/role checks.

### Developer Quick Login
For local development only, set `ENABLE_DEV_QUICK_LOGIN=true` in `backend/.env`. Keep `NODE_ENV` unset or non-production, run the API on its default loopback binding, and start Vite at `http://localhost:5173`. The `/login` page then shows buttons for the nine synthetic demo accounts, and `/dashboard` shows a local account switcher. The backend still authenticates through Supabase Auth and the normal HTTP-only session cookies; it does not issue fake tokens or expose passwords. Set `ENABLE_DEV_QUICK_LOGIN=false` (or remove it) to disable the endpoint. The endpoint returns `404` for non-local, non-browser, production, or unapproved requests.

## Deployment
Validate the Vercel plan, deployment shape and routing in a minimal proof of concept before publishing; this archive does **not** claim an already-working Vercel setup. Configure frontend and API routing so `/api/*` targets the Express serverless function, and ensure SPA fallback doesn't intercept `/api/*`. Supabase Auth onboarding (NIS/NIP account provisioning) remains undecided. Midtrans remains Sandbox-only.
