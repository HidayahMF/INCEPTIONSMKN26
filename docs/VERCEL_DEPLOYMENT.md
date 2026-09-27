# Vercel Deployment

Deployment uses Vercel Git Integration. There is no GitHub Actions Vercel CLI workflow and no Vercel deployment secret is required in GitHub.

The flow is:

```text
git push origin main
        ↓
GitHub main
        ↓
Vercel Git Integration
        ↓
Frontend and backend production deployments
```

## Frontend Project

Configure the Vercel project `inceptionsmkn-26`:

- Repository: `HidayahMF/INCEPTIONSMKN26`
- Production branch: `main`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `https://inceptionsmkn-26.vercel.app`

Keep `frontend/vercel.json`. It rewrites `/api/*` to the backend project and sends public SPA routes to `/index.html`.

## Backend Project

Configure the Vercel project `inceptionsmkn-26-backend`:

- Repository: `HidayahMF/INCEPTIONSMKN26`
- Production branch: `main`
- Root directory: `backend`
- Production domain: `https://inceptionsmkn-26-backend.vercel.app`

Keep `backend/vercel.json`. Its serverless entry point is `backend/api/index.js` using `@vercel/node`.

## Dashboard Setup

Vercel Git Integration is configured in the Vercel dashboard, not in this repository:

1. Open the frontend project and go to **Settings → Git → Connect Git Repository**.
2. Connect `HidayahMF/INCEPTIONSMKN26` and select `main` as the production branch.
3. In **Settings → General**, set the root directory to `frontend`.
4. Repeat for the backend project with root directory `backend`.
5. Confirm both projects use the same repository and `main` branch.
6. Configure runtime environment variables in the backend Vercel project.

Do not create `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or project ID GitHub secrets for this deployment model.

## Environment Variables

Keep existing runtime variable names in Vercel project settings. Backend-only secrets must remain server-side:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_KNOWLEDGE_BUCKET
GEMINI_API_KEY
GEMINI_MODEL
MIDTRANS_SERVER_KEY
FRONTEND_ORIGIN
COOKIE_SECURE
COOKIE_SAME_SITE
```

Never commit `.env` files or expose backend secrets through Vite.

## Automatic Deployment Test

After both Vercel projects are connected, push a documentation-only commit:

```bash
git push origin main
```

Vercel should create one production deployment for each project. Verify the deployment commit in the Vercel dashboard before calling automatic deployment verified.
