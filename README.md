# SKILLORA

**Build smarter. Manage better. Grow with AI.**

SKILLORA is an AI-powered entrepreneurship and enterprise management platform. It takes founders and growing teams from
idea validation to planning, operations, finance, workforce, compliance and decision support, with every AI
recommendation explained (observation → evidence → interpretation → action → confidence).

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Zustand |
| Backend | FastAPI (Python 3.12), JWT auth |
| Mobile | Capacitor (Android) |
| Hosting | Vercel (frontend + API in one project), Render/Docker supported |

## Run locally

```bash
npm install
cp .env.example .env

# terminal 1 — API on :8000
pip install -r services/api/requirements.txt
npm run api

# terminal 2 — web on :3000
npm run dev
```

Open <http://localhost:3000> and choose **Open the demo workspace**. The demo account
(`ankit@aerosync.ai` / `Skillora@2026`) also works against the API.

## Project layout

```
apps/web/            Next.js app (src/app/(app) = workspace pages sharing one shell)
apps/web/android/    Capacitor Android project
services/api/        FastAPI app, api/index.py = Vercel entry, data/seed = demo data
docs/                Architecture and build prompt
vercel.json          Combined frontend + API deployment
DEPLOYMENT.md        Step-by-step deploy guide
```

## Theming

Colors are CSS variables in `apps/web/src/styles/globals.css`. The default theme is `sunrise`
(graphite with a rose → saffron accent). Set `data-theme="jade"` or `"orchid"` on `<html>` in
`src/app/layout.tsx`, or edit the `--sk-*` values to create your own.

## Principles

* Never invent customers, revenue, certifications or accuracy claims
* AI recommendations are explainable and grounded in data
* Permissions are enforced on the backend
* Critical workflows keep working when AI services fail

© 2026 SKILLORA
