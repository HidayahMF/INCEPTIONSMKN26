# Vercel Deployment

The GitHub Actions workflow in `.github/workflows/deploy-vercel.yml` deploys both Vercel projects whenever `main` receives a push.

Configure these repository secrets in GitHub under **Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN`: a Vercel personal access token
- `VERCEL_ORG_ID`: the Vercel team or account ID
- `VERCEL_FRONTEND_PROJECT_ID`: the frontend Vercel project ID
- `VERCEL_BACKEND_PROJECT_ID`: the backend Vercel project ID

Keep runtime environment variables configured in the corresponding Vercel project. Do not commit `.env` files or API keys.

The frontend project should use `frontend` as its Vercel root directory. The backend project should use `backend` as its Vercel root directory. Both projects must have production environment variables configured before the first production deployment.

After the secrets are configured, a normal push triggers deployment:

```bash
git push origin main
```

Deployment status is visible in the repository's **Actions** tab. `workflow_dispatch` is also available for manually rerunning deployment.
