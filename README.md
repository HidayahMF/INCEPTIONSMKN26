# INCEPTIONSMKN26 — development starter

Website profil SMK Negeri 26 Jakarta untuk lomba INCEPTION 2026. Frontend React + TypeScript + Vite; backend Express **JavaScript**; database Supabase PostgreSQL. Public AI RAG, panorama, and Midtrans Sandbox remain planned. Auth/RBAC is implemented as a Supabase-backed foundation and requires configured infrastructure.

## Run locally
1. Install Node.js 20+ and run `npm install` at repository root.
2. In terminal A run `npm run dev:api`.
3. In terminal B run `npm run dev` and open http://localhost:5173.
4. Run `npm run check && npm run build` for type/syntax checking and frontend build.

The public UI is a responsive shell based on user-provided style guide screenshots. It intentionally avoids invented school statistics, unapproved logos/photos, fake AI answers, or working-feature claims. `/api/health` works; `/api/chat` validates input and returns 503 until Gemini + approved public RAG sources are implemented. Login uses server-only identifier mapping, Supabase Auth, HTTP-only cookies, `/api/me`, and additive role assignments. No credentials or student records are included. Keep service-role secrets on the backend only.

## Supabase auth/RBAC setup
1. Copy `.env.example` to a private backend environment file and fill `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Never prefix the service key with `VITE_`.
2. Apply `supabase/migrations/202609240001_core_identity_rbac.sql` to an empty Supabase project with the Supabase CLI or SQL editor. Migrations are not executed by this repository automatically.
3. For synthetic demos only, provide strong, unique shell environment variables named `DEMO_PASSWORD_DEMO_ADMIN`, `DEMO_PASSWORD_DEMO_GURU`, `DEMO_PASSWORD_DEMO_BK`, `DEMO_PASSWORD_DEMO_KAJUR`, `DEMO_PASSWORD_DEMO_SISWA`, `DEMO_PASSWORD_DEMO_KELAS`, `DEMO_PASSWORD_DEMO_MPK`, `DEMO_PASSWORD_DEMO_KANTIN`, and `DEMO_PASSWORD_DEMO_KOPERASI`, then run `npm run provision:demo --workspace backend`. Do not place these values in `.env.example`, source control, screenshots, or chat.
4. Start the API with `npm run dev:api`; start Vite with `npm run dev`. Visit `/login` only with an administrator-provisioned account.

The private `auth_identity_mappings` table maps normalized school identifiers to an internal Auth email. The email is never returned to the browser. Profiles are private, role assignments are additive and expiry-aware, and backend middleware is authoritative. RLS is defense in depth; service-role queries still apply explicit user/role checks.

## Deployment
Validate the Vercel plan, deployment shape and routing in a minimal proof of concept before publishing; this archive does **not** claim an already-working Vercel setup. Configure frontend and API routing so `/api/*` targets the Express serverless function, and ensure SPA fallback doesn't intercept `/api/*`. Supabase Auth onboarding (NIS/NIP account provisioning) remains undecided. Midtrans remains Sandbox-only.

## Coding agent contract
Read `AGENTS.md` and every relevant file in `docs/` before implementing a module. Change only requested scopes; never represent a mock or unavailable feature as complete.
