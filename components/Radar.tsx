"use client";

import { useMemo, useState } from "react";
import type { Tool } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  Native: "border-brand/40 bg-brand/10 text-brand",
  "Template/Docs": "border-teal-400/30 bg-teal-400/10 text-teal-300",
  MCP: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
  Community: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  "Low/None": "border-hairline bg-white/5 text-ink-muted",
};

function scoreColor(score: number) {
  if (score >= 80) return "bg-brand";
  if (score >= 60) return "bg-teal-400";
  if (score >= 45) return "bg-amber-400";
  return "bg-ink-faint";
}

export default function Radar({ tools }: { tools: Tool[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tools.map((t) => t.category)))],
    [tools]
  );
  const [cat, setCat] = useState("All");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");

  const visible = useMemo(() => {
    const list = cat === "All" ? tools : tools.filter((t) => t.category === cat);
    return [...list].sort((a, b) =>
      sortBy === "score"
        ? b.opportunity_score - a.opportunity_score
        : a.name.localeCompare(b.name)
    );
  }, [tools, cat, sortBy]);

  if (!tools.length) {
    return (
      <p className="rounded-xl border border-hairline bg-surface-panel/70 p-6 text-ink-muted">
        No data available right now. Check the Supabase connection.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              cat === c
                ? "border-brand bg-brand/10 text-brand"
                : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-sm text-ink-faint">
          <span>Sort</span>
          <button
            onClick={() => setSortBy("score")}
            className={sortBy === "score" ? "text-brand" : "hover:text-ink"}
          >
            Opportunity
          </button>
          <span className="text-hairline-strong">/</span>
          <button
            onClick={() => setSortBy("name")}
            className={sortBy === "name" ? "text-brand" : "hover:text-ink"}
          >
            Name
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-xl border border-hairline bg-surface-panel/70 p-5 transition hover:border-hairline-strong hover:bg-surface-raised/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t.website ? (
                    <a
                      href={t.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-brand"
                    >
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </h3>
                <p className="text-xs uppercase tracking-wide text-ink-faint">
                  {t.category}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md border px-2 py-0.5 text-xs ${
                  STATUS_STYLES[t.integration_status] ??
                  "border-hairline text-ink-muted"
                }`}
              >
                {t.integration_status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>Partnership opportunity</span>
                <span className="font-semibold text-ink">{t.opportunity_score}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${scoreColor(t.opportunity_score)}`}
                  style={{ width: `${t.opportunity_score}%` }}
                />
              </div>
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
              {t.notes}
            </p>
            <div className="mt-4 text-xs text-ink-faint">
              Momentum: <span className="text-ink">{t.momentum}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
