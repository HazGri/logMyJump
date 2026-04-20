"use client";

import { useState } from "react";

type Jump = {
  id: string;
  date: Date | string;
  aircraft: string;
  altitude: number;
  jumpType: string;
  location: string;
  country: string;
  note?: string | null;
};

export const JumpCard = ({ jump, index }: { jump: Jump; index?: number }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Purge this jump from the log?");
    if (!confirmed) return;

    const res = await fetch(`/api/jumps/${jump.id}`, { method: "DELETE" });
    if (res.ok) setIsVisible(false);
    else alert("Erreur lors de la suppression du saut.");
  };

  if (!isVisible) return null;

  const date = new Date(jump.date);
  const dd = String(date.getDate()).padStart(2, "0");
  const mmShort = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const yyyy = date.getFullYear();

  return (
    <article className="panel-flat group relative px-4 md:px-6 py-5 hover:border-[color:var(--cyan)] transition-colors">
      <div className="flex items-center gap-5 md:gap-7">
        {/* Date column */}
        <div className="shrink-0 text-center border-r border-[color:var(--hairline-strong)] pr-5 md:pr-7">
          <div className="font-display text-3xl md:text-4xl text-bone leading-none">{dd}</div>
          <div className="eyebrow mt-1">{mmShort}</div>
          <div className="text-[10px] font-mono text-bone-faint mt-0.5">{yyyy}</div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-display text-[11px] tracking-[0.22em] text-cyan">{jump.jumpType}</span>
            {typeof index === "number" && (
              <span className="font-mono text-[10px] text-bone-faint tracking-[0.22em]">
                · #{String(index).padStart(3, "0")}
              </span>
            )}
          </div>
          <div className="font-serif italic text-lg md:text-xl text-bone truncate">
            {jump.location || "—"}{jump.country ? <span className="text-bone-dim">, {jump.country}</span> : null}
          </div>
        </div>

        {/* Altitude readout */}
        <div className="shrink-0 text-right">
          <div className="eyebrow">Alt</div>
          <div className="number-instrument font-display text-xl md:text-2xl text-amber glow-amber leading-none mt-1">
            {jump.altitude.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-bone-faint mt-0.5">m / AGL</div>
        </div>

        {/* Controls */}
        <div className="shrink-0 flex items-center gap-2">
          {jump.note && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-label="Toggle note"
              className="h-9 w-9 flex items-center justify-center border border-[color:var(--hairline-strong)] text-bone-dim hover:border-[color:var(--cyan)] hover:text-cyan transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M3 3h10v10H5l-2 2V3z" />
                <path d="M5.5 6.5h5M5.5 9h3" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete jump"
            className="h-9 w-9 flex items-center justify-center border border-[color:var(--hairline-strong)] text-bone-dim hover:border-[color:var(--vermillon)] hover:text-[color:var(--vermillon)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M5.5 4V2.5h5V4M6 7v5M10 7v5M4 4l.8 10h6.4L12 4" />
            </svg>
          </button>
        </div>
      </div>

      {jump.note && expanded && (
        <div className="mt-4 pt-4 border-t border-dashed border-[color:var(--hairline)]">
          <div className="eyebrow mb-2">Pilot note</div>
          <p className="font-serif italic text-bone-dim leading-relaxed">{jump.note}</p>
        </div>
      )}

      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-cyan opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_var(--cyan-glow)]"
      />
    </article>
  );
};
