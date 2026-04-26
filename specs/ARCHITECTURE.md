# SadamaAgent — Architecture & Contributor Guardrails

> This document defines the hard technical constraints for the SadamaAgent platform. All contributors and AI agents **must read and follow this before making any changes.**

---

## 1. Core Framework Rules

| Constraint | Value |
|---|---|
| Next.js Version | **16.2.0 (App Router only)** — no Pages Router usage |
| TypeScript | **5.7 strict mode** — no implicit `any`, no `@ts-ignore` without comment |
| CSS Strategy | Tailwind v4 + `globals.css` for custom tokens. No inline styles, no styled-components |
| State / Data | `@tanstack/react-query` exclusively for all async data. No `useEffect` + `fetch` patterns |
| i18n | `next-intl` — all pages live under `app/[locale]/*`, all user-visible strings use `useTranslations()` |
| Auth | Supabase Auth (email/password only). No OAuth providers. Session managed by middleware. |

---

## 2. Multi-Tenancy Requirement

> [!IMPORTANT]
> The application **must** natively support multiple ports (tenants) from a single deployment.

- **Never hardcode a `port_id` in environment variables.**
- All database queries that interact with port-specific data must include a `port_id` filter derived from the authenticated user's `owner_id`.
- The `agent_settings` table is keyed by `port_id`. Settings (system prompt, mode, language) are per-port.

---

## 3. Routing & Middleware

The middleware file is **`proxy.ts`** (not `middleware.ts` — this is intentional due to Vercel configuration).

It performs two jobs in strict order:
1. **i18n routing** via `next-intl` middleware (resolves `/en/` and `/et/` prefixes).
2. **Auth guard** — any path matching `/[locale]/dashboard*` redirects unauthenticated users to `/login`.

**Do not move or rename `proxy.ts`.** It is registered via `next.config.mjs` → `withNextIntl`.

---

## 4. Component Hierarchy

```
app/[locale]/
    layout.tsx          → Providers (QueryClient, ThemeProvider, Toaster, Analytics)
    page.tsx            → Landing page (Public)
    login/              → Auth pages (Public)
    signup/
    dashboard/
        layout.tsx      → DashboardLayout (Sidebar + Header) — auth required
        page.tsx        → Stats overview
        berths/         → Berth CRUD
        bookings/       → Booking viewer
        settings/       → Profile + AI agent config
```

### Client vs. Server Components

- **Dashboard pages** are `"use client"` for TanStack Query integration.
- **Landing page** is `"use client"` due to ChatWidget and map state.
- **Layouts** are server components (no `"use client"` directive).
- **Supabase server client** (`lib/supabase/server.ts`) is for server components and route handlers only.
- **Supabase browser client** (`lib/supabase/client.ts`) is for client components only.

---

## 5. Data Flow Architecture

```
[Client Component]
    └─ TanStack Query hook (lib/queries/*.ts)
          └─ Supabase JS client (lib/supabase/client.ts)
                └─ Supabase PostgreSQL (with RLS)
```

### Adding a new data entity

1. Add the table to `specs/DATABASE_SCHEMA.sql`.
2. Add RLS policies to `specs/RLS_POLICIES.sql` and apply them.
3. Create a new file in `lib/queries/` with typed hooks using `useQuery` / `useMutation`.
4. Add translation strings to `messages/en.json` and `messages/et.json`.
5. Build the UI component referencing the hook.

---

## 6. AI Chatbot Architecture

The chatbot is a **server-side agentic loop** running in a Supabase Edge Function (`supabase/functions/chat-handler/index.ts`).

**Do not** call Gemini from the Next.js API routes — all AI logic is Edge Function only.

### Tool Call Flow
```
ChatWidget (client)
    → POST /functions/v1/chat-handler
        → Gemini 2.5 Flash (function calling enabled)
            ↔ list_ports        (Supabase DB select)
            ↔ check_availability (Supabase RPC)
            ↔ create_booking    (Supabase insert)
        ← Final text response
    ← Rendered in ChatWidget
```

### Guardrails (Do Not Remove)
- Max 8 agentic loop iterations (`MAX_LOOPS = 8`).
- Off-topic, prompt injection, and hallucination guards are in the system prompt.
- `verify_jwt: false` in `supabase/config.toml` is required — publishable keys are not JWTs.

See `specs/CHATBOT.md` for the full chatbot design document.

---

## 7. Validation Strategy

All form validation uses `lib/validations.ts` — a shared module usable on both client and server.

- **Client-side errors**: Use the `<FormError message={...} />` component (`components/ui/form-error.tsx`).
- **Dashboard inline edits** (Berths): Display errors via `toast.error()`.
- **Never use default browser form validation** (`required`, `pattern` attributes).

---

## 8. Internationalization Rules

- All user-visible strings must be in `messages/en.json` and `messages/et.json`.
- Translation keys are namespaced by component: `"ComponentName.keyName"`.
- Use `useTranslations("ComponentName")` in client components.
- Use `getTranslations("ComponentName")` in server components.
- The landing page defaults to detecting the browser locale. The dashboard enforces the user's selected locale.

---

## 9. Interactive Map

The `FeaturedPorts` section uses `react-leaflet` with OpenStreetMap tiles.

**Key architecture decisions:**
- Map is wrapped in `components/landing/map-wrapper.tsx` using `next/dynamic` with `ssr: false` to prevent hydration errors.
- The actual map implementation is in `components/landing/ports-map.tsx`.
- Port markers are in `components/landing/port-marker.tsx`.
- The map provider (Leaflet/OSM) can be swapped by replacing only these three files — the rest of the app is unaffected.
- The "Ask AI to Book" button dispatches a custom `open-chat` window event. The `ChatWidget` and `app/[locale]/page.tsx` listen for this event.

---

## 10. `.gitignore` & Sensitive Files

**Never commit:**
- `.env.local`, `.env.test`, `.env*.local` (secrets)
- `node_modules/`, `.next/`, `out/`, `build/`
- `playwright-report/`, `test-results/`, `tests/logs/`
- `tsconfig.tsbuildinfo` (build cache)
- Supabase `.temp/` directory

These are all listed in `.gitignore` at the project root.
