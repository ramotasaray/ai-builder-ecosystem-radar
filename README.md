# AI-Builder Ecosystem Radar

A market-intelligence view of the AI app builders, agentic IDEs, and vibe-coding platforms in Supabase's orbit, scored by how deeply each integrates Supabase today and where the partnership opportunity is largest.

**Live:** https://ai-builder-ecosystem-radar.vercel.app

Built by Daniel Ramírez as a work sample for the Supabase **Associate Partner Development Manager (AMER)** role. It is a small, working artifact of two responsibilities in that job description: *Market Intelligence* (monitoring trends across AI-assisted development) and *Ecosystem Growth* (finding where to build relationships next).

## What it does

- Tracks 18 builder tools across 4 categories (AI app builder, agentic IDE, no-code platform, design-to-code).
- Scores each on a 0-100 **partnership opportunity** scale and tags an **integration status** (Native, Template/Docs, MCP, Community, Low/None) and a **momentum** read.
- Lets you filter by category and sort by opportunity or name.

> The integration status and opportunity scores are my own assessment as of June 2026, not official Supabase data. The point is the method, not a claim of internal knowledge.

## Why this shape

The role is about engaging builders inside modern vibe-coding environments. So instead of describing that I can build with these tools, I built the radar *on Supabase, with an AI-first workflow*: the database, schema, row-level security, and seed data were all provisioned programmatically, and the app was scaffolded with Claude Code. The repo is the evidence.

## Tech stack

- **Supabase** — Postgres database, row-level security, auto-generated REST API, `@supabase/supabase-js` client.
- **Next.js (App Router)** — a server component reads the catalog at build time (ISR, 5-minute revalidation); a small client component handles filtering and sorting.
- **Tailwind CSS** — styling in Supabase's dark/green palette.
- **Vercel** — hosting and CI from `git push`.
- **Claude Code** — used to provision Supabase (via the Management API), author the SQL migration, build the front end, and deploy.

## Data model

A single `tools` table, read-only to the public via RLS:

| column | type | notes |
|---|---|---|
| `id` | bigint identity | primary key |
| `name` | text | tool name |
| `slug` | text | unique |
| `category` | text | AI app builder / Agentic IDE / No-code platform / Design-to-code |
| `website` | text | homepage |
| `integration_status` | text | Native / Template/Docs / MCP / Community / Low/None |
| `opportunity_score` | int | 0-100, partnership opportunity |
| `momentum` | text | High / Medium-High / Medium / Emerging / Low |
| `notes` | text | one-line rationale |

Row-level security exposes `select` only (to `anon` and `authenticated`); there are no client-side write paths. The publishable key shipped to the browser is read-only by design.

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + publishable key
npm run dev                  # http://localhost:3000
```

Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxx
```

The schema and seed data live in [`supabase/schema.sql`](supabase/schema.sql); apply it to any Supabase project to reproduce the database.

## Author

Daniel Ramírez · [linkedin.com/in/ramo5](https://linkedin.com/in/ramo5) · [referido.pro](https://referido.pro)
