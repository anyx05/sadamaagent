# SadamaAgent — Architecture Strict Guardrails

## Core Requirements
- **Next.js Version**: 16.2.0 (App Router)
- **CSS Strategy**: Vanilla Tailwind + `globals.css` + custom theming standard. Avoid inline CSS.
- **State Management**: `@tanstack/react-query` exclusively for data fetching instead of standard Next.js fetch cache where real-time port states are needed.
- **Multilingual Support**: `next-intl` forces pages to live under `app/[locale]/*`.
- **Database Rules**: All data access requires checking `port_id`. The application MUST natively support multi-tenancy (multiple ports accessed from one domain) without hardcoded ENV port scopes.

## Integrations
- **AI Backend**: Google Gemini function calling orchestrated by server-side Edge Functions.
- **Database**: Supabase PostgreSQL. Standard RLS bounds apply to all tables.
- **Email Delivery**: Resend triggered by edge functions upon successful booking.
