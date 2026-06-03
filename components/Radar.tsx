"use client";

import { useMemo, useState } from "react";
import type { Tool } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  Native: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "Template/Docs": "bg-teal-500/15 text-teal-300 border-teal-500/30",
  MCP: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  Community: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Low/None": "bg-neutral-500/15 text-neutral-300 border-neutral-500/30",
};

function scoreColor(score: number) {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 60) return "bg-teal-400";
  if (score >= 45) return "bg-amber-400";
  return "bg-neutral-500";
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
      <p className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-neutral-400">
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
                : "border-neutral-800 text-neutral-300 hover:border-neutral-600"
            }`}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-sm text-neutral-400">
          <span>Sort</span>
          <button
            onClick={() => setSortBy("score")}
            className={sortBy === "score" ? "text-brand" : "hover:text-neutral-200"}
          >
            Opportunity
          </button>
          <span className="text-neutral-700">/</span>
          <button
            onClick={() => setSortBy("name")}
            className={sortBy === "name" ? "text-brand" : "hover:text-neutral-200"}
          >
            Name
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition hover:border-neutral-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">
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
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {t.category}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md border px-2 py-0.5 text-xs ${
                  STATUS_STYLES[t.integration_status] ??
                  "border-neutral-700 text-neutral-300"
                }`}
              >
                {t.integration_status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Partnership opportunity</span>
                <span className="font-semibold text-neutral-200">
                  {t.opportunity_score}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <div
                  className={`h-full rounded-full ${scoreColor(t.opportunity_score)}`}
                  style={{ width: `${t.opportunity_score}%` }}
                />
              </div>
            </div>

            <p className="mt-4 flex-1 text-sm text-neutral-300">{t.notes}</p>
            <div className="mt-4 text-xs text-neutral-500">
              Momentum: <span className="text-neutral-300">{t.momentum}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
