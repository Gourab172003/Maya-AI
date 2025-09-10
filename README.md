Welcome to Maya AI 2.0 (A space between reality and dreams!)

## Project info

**URL**: maya-ai-ecru.vercel.app

**About the application**
This Web app is a single-page React application (built with Vite/Remix-style setup) that provides an AI chat companion called Maya — a holographic, neon-themed chat UI with authentication and an AI backend. The UI is client-rendered with React + React Router. It uses Tailwind for styling, TanStack Query for remote data fetching/caching, Sonner/Toaster for notifications, and (based on the repo) Supabase likely for auth and/or persistence. The project is hosted via GitHub + Vercel (auto-deploy on push).


### Core tech stack

1. React (React Router for routes — BrowserRouter + Routes)
2. Vite / Remix-style structure (you have index.html at root + src/ and vite.config.ts)
3. Tailwind CSS (tailwind.config.ts + @tailwind directives in your global CSS)
4. TanStack Query for data fetching (QueryClientProvider)
5. Sonner / Toaster for UI notifications
6. Supabase (there’s a supabase folder — probably for DB/auth or file storage)
7. Gemini / LLM integration (commit message mentioned “Add Gemini API integration”) — likely used server-side to query the AI model.
8. Vercel for hosting (connected to GitHub repo for CI/CD)



**Key files and responsibilities**

1.index.html — root HTML that bootstraps your SPA. Best place for any very early inline script .
2.src/main.tsx — entrypoint that imports global CSS and mounts <App />. You added the MutationObserver kill there .
3.src/App.tsx — main app component, sets up QueryClientProvider, TooltipProvider, BrowserRouter, Toasters, and contains the useEffect that removes Lovable nodes as a last defense.
4.src/index.css / src/app.css — global Tailwind + theme CSS. Good place for instant display:none !important rules to prevent flashes.
5.src/pages/Index.tsx — main chat page (UI for message list, input) — where chat renders after auth.
6.src/pages/NotFound.tsx — fallback route.
7.src/components/ui/* — UI primitives.
8.supabase/ — DB or auth helpers / migrations .
9..env / serverless endpoints — server API keys (Gemini/OpenAI).


**Deployment / CI**

1.GitHub → Vercel auto-deploy on push.
2.Add a GitHub Action for PR checks (lint, typecheck, unit tests).
3.Add Preview Deploys from Vercel for PRs to validate changes visually.









