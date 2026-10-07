# Deploying SKILLORA

SKILLORA is a Next.js frontend (`apps/web`) and a FastAPI backend (`services/api`).
The default setup is **one Vercel project that serves both**: the site at `/`, the API at `/api`.

## Option A — one Vercel project (recommended)

1. Push this folder to GitHub (this folder must be the repository root, or set it as the project's *Root Directory*).
2. Vercel → **Add New → Project** → import the repo. Leave *Framework Preset* as **Other**
   (the root `vercel.json` defines both builds) and leave Build/Install/Output commands empty.
3. Add environment variables (Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `ENVIRONMENT` | `production` |
   | `SECRET_KEY` | long random string — `python -c "import secrets; print(secrets.token_urlsafe(48))"` |
   | `CORS_ORIGINS` | `https://<your-project>.vercel.app` (add your custom domain too, comma-separated) |
   | `NEXT_PUBLIC_API_URL` | leave **empty** — the app calls same-origin `/api` |

4. Deploy. Check `https://<your-project>.vercel.app/api/health` → `{"status":"healthy",...}`
   and `https://<your-project>.vercel.app/api/docs` for the API explorer.

## Option B — two Vercel projects (if you prefer separate deploys)

* **API project:** Root Directory `services/api` (uses `services/api/vercel.json`). Env: `ENVIRONMENT`, `SECRET_KEY`, `CORS_ORIGINS=<web url>`.
* **Web project:** Root Directory `apps/web`. Env: `NEXT_PUBLIC_API_URL=https://<api-project>.vercel.app/api`.

## Option C — Render / Docker

`render.yaml` is a ready blueprint (Render → New → Blueprint). `docker compose up` runs everything locally.

## Things to know

* **Data is not persisted yet.** Accounts created through `/auth/signup` live in memory; on serverless hosts they
  disappear on cold starts. The demo workspace is unaffected. Add a database (Vercel Postgres, Neon, Supabase)
  before real users sign up.
* **Android app:** the APK bundles a static copy of the site. Bake in your API address when building:
  `NEXT_PUBLIC_API_URL=https://<your-project>.vercel.app/api npm run build:apk` (needs JDK 21 + Android SDK).
  Without it, the app works in local demo mode only.
* Seed/demo data for the API lives in `services/api/data/seed`.
