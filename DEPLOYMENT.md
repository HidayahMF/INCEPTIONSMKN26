# Vercel Deployment

The repository is prepared for two Vercel projects using the same GitHub repository:

- Frontend: `inceptionsmkn26`, root directory `frontend`
- API: `inceptionsmkn26-api`, root directory `backend`

The browser continues to call relative `/api/...` endpoints. The frontend Vercel project rewrites those requests to the API project.

## 1. Backend Project

1. Push the repository to `HidayahMF/INCEPTIONSMKN26`.
2. In Vercel, select **Add New Project** and import the repository.
3. Set project name to `inceptionsmkn26-api`.
4. Set **Root Directory** to `backend`.
5. Set framework preset to **Other**.
6. Add these backend environment variables:

```text
NODE_ENV=production
FRONTEND_ORIGIN=https://inceptionsmkn26.vercel.app
SUPABASE_URL=<existing project URL>
SUPABASE_ANON_KEY=<existing anon key>
SUPABASE_SERVICE_ROLE_KEY=<existing service role key>
SUPABASE_KNOWLEDGE_BUCKET=knowledge-private
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
ENABLE_DEV_QUICK_LOGIN=false
GEMINI_API_KEY=<Gemini key>
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=<sandbox key if payments are enabled>
```

Do not add backend secrets to the frontend project and do not use `VITE_` for backend secrets.

Deploy and test:

```text
https://inceptionsmkn26-api.vercel.app/api/health
```

Expected response includes `{ "data": { "status": "ok" } }`.

If Vercel assigns a different API domain, update the API destination in `frontend/vercel.json` before deploying the frontend.

## 2. Frontend Project

1. Select **Add New Project** again and import the same repository.
2. Set project name to `inceptionsmkn26`.
3. Set **Root Directory** to `frontend`.
4. Set framework preset to **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. No frontend secret environment variables are required for the current relative API proxy.

Deploy and test:

```text
https://inceptionsmkn26.vercel.app/
https://inceptionsmkn26.vercel.app/tour
https://inceptionsmkn26.vercel.app/profile
https://inceptionsmkn26.vercel.app/login
https://inceptionsmkn26.vercel.app/api/health
```

`frontend/vercel.json` sends `/api/*` to the API project before the SPA fallback. Other routes fall back to `index.html`, so direct refreshes such as `/tour` do not return a Vercel 404.

## 3. Local Development

```bash
npm install
npm run dev:api
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Vite proxies `/api` to the local backend.

Keep local `FRONTEND_ORIGIN=http://localhost:5173`, `COOKIE_SECURE=false`, and `ENABLE_DEV_QUICK_LOGIN=true` only when using the local demo flow. Production quick login remains disabled by both environment and backend checks.

## 4. Supabase and Upload Notes

- Apply Supabase migrations manually; Vercel cold starts do not run migrations.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
- The `knowledge-private` bucket must remain private.
- Vercel deployment limits PDF uploads through Express to 4 MB. Local development keeps the existing 10 MB limit. Larger production files should later use a direct Supabase Storage upload flow.
- Panorama files are static frontend assets under `/assets/panorama/`.

## 5. Smoke Test

- `/` returns HTTP 200.
- `/tour` returns HTTP 200 on direct refresh.
- `/assets/panorama/LapanganSMKN261.jpeg` returns HTTP 200.
- Frontend `/api/health` reaches the backend and returns `status: ok`.
- Public pages load through `/api/public/pages`.
- Login can set HTTP-only cookies with `COOKIE_SECURE=true`.
- `/api/me` reads the session cookie.
- Logout clears both session cookies.
- `/api/dev/login-as` is unavailable in production.
- No Gemini or Supabase service key appears in the frontend bundle.
- Do not run production login tests without approved credentials.

## 6. Validation Commands

```bash
npm.cmd test
npm.cmd run check
npm.cmd run build
```

Do not commit `.env` files or real credentials.
