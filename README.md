## Project info

**URL:** [maya-ai-ecru.vercel.app](https://maya-ai-ecru.vercel.app)

---

### About the application
This Web app is a single-page React application (built with Vite/Remix-style setup) that provides an AI chat companion called **Maya** — a holographic, neon-themed chat UI with authentication and an AI backend.  

- The UI is client-rendered with React + React Router.  
- It uses **Tailwind** for styling, **TanStack Query** for remote data fetching/caching.  
- **Sonner/Toaster** for notifications.  
- **Supabase** likely for auth and/or persistence.  
- **Gemini LLM integration** (commit: “Add Gemini API integration”).  
- Hosted via **GitHub + Vercel** (auto-deploy on push).  

---

### Core tech stack

1. **React** (React Router for routes — BrowserRouter + Routes)  
2. **Vite / Remix-style structure** (index.html at root + src/ + vite.config.ts)  
3. **Tailwind CSS** (tailwind.config.ts + @tailwind directives in global CSS)  
4. **TanStack Query** (QueryClientProvider for data fetching)  
5. **Sonner / Toaster** for UI notifications  
6. **Supabase** (DB/auth or file storage)  
7. **Gemini / LLM integration** (used server-side for AI responses)  
8. **Vercel** for hosting (connected to GitHub repo for CI/CD)  

---

### Key files and responsibilities

1. **index.html** → Root HTML that bootstraps the SPA. Best place for early inline scripts.  
2. **src/main.tsx** → Entrypoint: imports global CSS, mounts `<App />`, MutationObserver kill script.  
3. **src/App.tsx** → Main app wrapper. Sets up QueryClientProvider, TooltipProvider, Toasters, Router.  
4. **src/app.css** → Global Tailwind + theme CSS. Good place for instant display rules (e.g., hide Lovable badge).  
5. **src/pages/Index.tsx** → Main chat page (UI for messages, input, post-auth).  
6. **src/pages/NotFound.tsx** → Fallback route.  
7. **src/components/ui/** → Reusable UI primitives.  
8. **supabase/** → DB/auth helpers or migrations.  
9. **serverless endpoints (if any)** → API keys, Gemini/OpenAI queries.  

---

### Deployment 

1. **GitHub → Vercel auto-deploy on push**.  
2. **Add a GitHub Action** for PR checks (lint, typecheck, unit tests).  
3. **Environment variables** handled via Vercel dashboard (.env for local dev).  
4. **Supabase integration** if DB/auth is enabled.  
