-- AI-Builder Ecosystem Radar schema + seed
-- Idempotent: safe to re-run.

drop table if exists public.tools cascade;

create table public.tools (
  id            bigint generated always as identity primary key,
  name          text not null,
  slug          text not null unique,
  category      text not null,
  website       text,
  integration_status text not null,   -- Native | Template/Docs | MCP | Community | Low/None
  opportunity_score  int  not null check (opportunity_score between 0 and 100),
  momentum      text not null,        -- High | Medium-High | Medium | Emerging | Low
  notes         text,
  created_at    timestamptz not null default now()
);

-- Public, read-only access (anon key). No write paths exposed to the client.
alter table public.tools enable row level security;

create policy "Public read access"
  on public.tools
  for select
  to anon, authenticated
  using (true);

insert into public.tools (name, slug, category, website, integration_status, opportunity_score, momentum, notes) values
('Lovable',     'lovable',     'AI app builder',   'https://lovable.dev',   'Native',        95, 'High',        'One-click Supabase connect; among the largest sources of new Supabase projects in the vibe-coding wave.'),
('Bolt.new',    'bolt',        'AI app builder',   'https://bolt.new',      'Native',        92, 'High',        'Built-in Supabase integration in the StackBlitz editor; strong inbound for auth and Postgres.'),
('v0',          'v0',          'AI app builder',   'https://v0.app',        'Template/Docs', 88, 'High',        'Vercel and Supabase pairing; scaffolds supabase-js by default. Co-marketing upside with Vercel.'),
('Claude Code', 'claude-code', 'Agentic IDE',      'https://claude.com/claude-code', 'MCP',  86, 'High',        'Official Supabase MCP and CLI let agents provision and query directly; this Radar was built with it.'),
('Cursor',      'cursor',      'Agentic IDE',      'https://cursor.com',    'MCP',           82, 'High',        'Supabase MCP server gives the agent direct DB and migration control; deep developer mindshare.'),
('Replit',      'replit',      'Agentic IDE',      'https://replit.com',    'Template/Docs', 78, 'Medium-High', 'Replit Agent ships Supabase templates; large education and indie-hacker base.'),
('Windsurf',    'windsurf',    'Agentic IDE',      'https://windsurf.com',  'MCP',           74, 'Medium-High', 'MCP-based Supabase access; fast-growing agentic IDE.'),
('Retool',      'retool',      'No-code platform', 'https://retool.com',    'Native',        72, 'Medium',      'Native Postgres and Supabase connector for internal tools; B2B co-selling angle.'),
('Figma Make',  'figma-make',  'Design-to-code',   'https://figma.com/make','Community',     70, 'Emerging',    'New design-to-app surface; no formal Supabase path yet, high upside to define one.'),
('Tempo',       'tempo',       'AI app builder',   'https://tempo.new',     'Community',     64, 'Emerging',    'React app builder; community Supabase usage, room for an official integration.'),
('Databutton',  'databutton',  'AI app builder',   'https://databutton.com','Community',     62, 'Emerging',    'Python-leaning AI app builder; Supabase used as the data layer in community builds.'),
('Base44',      'base44',      'AI app builder',   'https://base44.com',    'Community',     60, 'Medium',      'Wix-acquired AI app builder; distribution through Wix is the strategic question.'),
('Create.xyz',  'create-xyz',  'AI app builder',   'https://create.xyz',    'Community',     58, 'Emerging',    'Prompt-to-app builder; community Supabase usage, integration not formalized.'),
('GitHub Spark','github-spark','Agentic IDE',      'https://github.com/features/spark', 'Community', 56, 'Emerging', 'GitHub AI app surface; ecosystem position still forming, worth an early relationship.'),
('Bubble',      'bubble',      'No-code platform', 'https://bubble.io',     'Community',     55, 'Medium',      'Postgres and Supabase via API connector and plugins; large no-code base, shallow native tie.'),
('Softr',       'softr',       'No-code platform', 'https://softr.io',      'Low/None',      48, 'Low',         'Primarily Airtable and Google Sheets backends; Supabase overlap limited today.'),
('Webflow',     'webflow',     'Design-to-code',   'https://webflow.com',   'Low/None',      40, 'Low',         'Site builder with limited app-database needs; low direct overlap.'),
('Framer',      'framer',      'Design-to-code',   'https://framer.com',    'Low/None',      38, 'Low',         'Site and CMS builder; minimal external Postgres need today.');
