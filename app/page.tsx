import { getSupabase } from "@/lib/supabase";
import type { Tool } from "@/lib/types";
import Radar from "@/components/Radar";

export const revalidate = 300;

export default async function Page() {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("tools")
    .select("*")
    .order("opportunity_score", { ascending: false });

  const tools = (data ?? []) as Tool[];

  const native = tools.filter((t) => t.integration_status === "Native").length;
  const highOpp = tools.filter((t) => t.opportunity_score >= 80).length;
  const avg = tools.length
    ? Math.round(tools.reduce((s, t) => s + t.opportunity_score, 0) / tools.length)
    : 0;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm font-medium text-brand">
          <span className="inline-block h-2 w-2 rounded-full bg-brand" />
          Built on Supabase + Vercel
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          AI-Builder Ecosystem Radar
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-300">
          A market-intelligence view of AI app builders, agentic IDEs, and
          vibe-coding platforms, scored by how deeply they integrate Supabase
          today and where the partnership opportunity is largest.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-neutral-500">
          Independent analysis by Daniel Ramírez, prepared for the Supabase
          Associate Partner Development Manager role. Integration status and
          opportunity scores reflect my own assessment as of June 2026, not
          official Supabase data.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Tools tracked" value={String(tools.length)} />
        <Stat label="Native integrations" value={String(native)} />
        <Stat label="High-opportunity (80+)" value={String(highOpp)} />
        <Stat label="Avg opportunity" value={String(avg)} />
      </section>

      <Radar tools={tools} />

      <footer className="mt-16 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
        <p>
          Data lives in Postgres on Supabase, served read-only through
          row-level security and the supabase-js client. Front end built with
          Next.js, deployed on Vercel, scaffolded with Claude Code.
        </p>
        <p className="mt-2">
          By Daniel Ramírez ·{" "}
          <a
            className="text-brand hover:underline"
            href="https://linkedin.com/in/ramo5"
          >
            linkedin.com/in/ramo5
          </a>
        </p>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="text-3xl font-semibold text-brand">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
        {label}
      </div>
    </div>
  );
}
