type CardStatProps = {
  code: string;
  label: string;
  value: number | string;
  unit?: string;
  tone?: "cyan" | "amber";
};

export const CardStat = ({ code, label, value, unit, tone = "cyan" }: CardStatProps) => {
  const color = tone === "amber" ? "var(--amber)" : "var(--cyan)";
  const glow = tone === "amber" ? "glow-amber" : "glow-cyan";
  return (
    <div className="panel hud-corners p-5 md:p-6 relative overflow-hidden">
      <span className="hud-tl" />
      <span className="hud-br" />
      <div className="flex items-start justify-between mb-5">
        <span className="eyebrow">{label}</span>
        <span
          className="font-mono text-[10px] tracking-[0.24em] px-1.5 py-0.5 border"
          style={{ color, borderColor: color }}
        >
          {code}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`number-instrument font-display text-4xl md:text-5xl ${glow}`}>
          {value}
        </span>
        {unit && <span className="font-mono text-xs text-bone-dim uppercase tracking-[0.22em]">{unit}</span>}
      </div>
      <div className="mt-4 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 h-1"
            style={{
              background: i < 8 ? color : "var(--ink-4)",
              opacity: i < 8 ? 0.9 - i * 0.05 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};
