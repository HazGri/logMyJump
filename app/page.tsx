"use client";

import Link from "next/link";
import { GoogleBtn } from "./components/GoogleBtn";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Minimal top rail (no Shell on landing) */}
      <header className="sticky top-0 z-30 border-b border-[color:var(--hairline-strong)] bg-[color:var(--ink-1)]/70 backdrop-blur-md">
        <div className="container-x flex h-14 items-center gap-4">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeOpacity="0.4" />
              <circle cx="13" cy="13" r="6" stroke="var(--cyan)" strokeWidth="1" />
              <path d="M13 1V5M13 21V25M1 13H5M21 13H25" stroke="var(--cyan)" strokeWidth="1" />
              <circle cx="13" cy="13" r="1.5" fill="var(--cyan)" />
            </svg>
            <span className="font-display text-[12px] tracking-[0.24em]">
              LOG<span className="text-cyan">/</span>MY<span className="text-cyan">/</span>JUMP
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.24em] text-bone-dim">
            <span className="flex items-center gap-2">
              <span className="signal-dot" />
              <span>carrier</span>
              <span className="text-cyan">ready</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container-x pt-10 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center drift-stagger">
        {/* Left: editorial headline + sign in */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-cyan" />
            <span className="eyebrow">Flight journal · est. 2024</span>
          </div>

          <h1 className="font-display text-[42px] leading-[0.95] sm:text-[56px] lg:text-[84px] text-bone">
            Keep the sky
            <br />
            <span className="font-serif italic normal-case tracking-normal text-cyan lowercase text-[52px] sm:text-[72px] lg:text-[108px]">
              on the record.
            </span>
          </h1>

          <p className="max-w-xl text-bone-dim text-[15px] leading-relaxed font-mono">
            A digital logbook for parachutists. Log every jump, chart your altitude, track your
            squadron and own your progression — from PAC to wingsuit.
          </p>

          <div className="hairline max-w-md" />

          <div className="flex flex-col gap-3 max-w-md">
            <GoogleBtn />
            <Link href="/emailSignIn" className="btn-ghost-phos">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Sign in with email
            </Link>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-grow h-px bg-[color:var(--hairline-strong)]" />
              <span className="eyebrow">or</span>
              <div className="flex-grow h-px bg-[color:var(--hairline-strong)]" />
            </div>

            <Link
              href="/emailSignUp"
              className="self-start font-display text-[11px] tracking-[0.22em] text-cyan hover:text-bone transition-colors border-b border-dashed border-[color:var(--hairline-strong)] pb-0.5"
            >
              → open a new flight log
            </Link>
          </div>
        </div>

        {/* Right: instrument dial + ticker */}
        <div className="lg:col-span-5 relative">
          <InstrumentDial />

          <div className="mt-8 panel p-5 hud-corners overflow-hidden">
            <span className="hud-tl" />
            <span className="hud-br" />
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow">System status</span>
              <span className="text-[10px] font-mono text-cyan">// LIVE</span>
            </div>
            <ul className="space-y-2 font-mono text-[12px]">
              <StatusRow label="Altimeter" value="04 000 m" />
              <StatusRow label="Canopy" value="ready" tone="cyan" />
              <StatusRow label="Drop zone" value="awaiting input" tone="dim" />
              <StatusRow label="Freefall queue" value="00 : 00 : 00" />
            </ul>
            <div className="scanline" />
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-[color:var(--hairline-strong)] py-6">
        <div className="container-x flex flex-col md:flex-row gap-2 md:items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-bone-faint">
          <span>© LogMyJump — built for canopy-folders</span>
          <span>Coord. 48.8566°N · 2.3522°E</span>
        </div>
      </footer>
    </div>
  );
}

function StatusRow({ label, value, tone = "default" }: { label: string; value: string; tone?: "cyan" | "dim" | "default" }) {
  const cls = tone === "cyan" ? "text-cyan" : tone === "dim" ? "text-bone-faint" : "text-bone";
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-bone-dim">{label}</span>
      <span className="flex-1 mx-3 border-b border-dashed border-[color:var(--hairline)]" />
      <span className={cls}>{value}</span>
    </li>
  );
}

function InstrumentDial() {
  const ticks = Array.from({ length: 36 });
  return (
    <div className="relative aspect-square max-w-[420px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e1323" />
            <stop offset="80%" stopColor="#05070d" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#rg)" stroke="rgba(180,195,230,0.22)" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(180,195,230,0.1)" />
        {ticks.map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const r1 = i % 9 === 0 ? 78 : 84;
          const r2 = 90;
          const x1 = 100 + Math.sin(angle) * r1;
          const y1 = 100 - Math.cos(angle) * r1;
          const x2 = 100 + Math.sin(angle) * r2;
          const y2 = 100 - Math.cos(angle) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 9 === 0 ? "#5ff7f3" : "rgba(236,236,227,0.4)"}
              strokeWidth={i % 9 === 0 ? 1.5 : 0.6}
            />
          );
        })}
        {/* labels */}
        <text x="100" y="22" textAnchor="middle" fill="#5ff7f3" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">0</text>
        <text x="178" y="104" textAnchor="middle" fill="#a4acbd" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">9</text>
        <text x="100" y="188" textAnchor="middle" fill="#a4acbd" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">18</text>
        <text x="22" y="104" textAnchor="middle" fill="#a4acbd" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">27</text>
        {/* needle */}
        <g transform="rotate(-35 100 100)" style={{ transformOrigin: "100px 100px" }}>
          <line x1="100" y1="100" x2="100" y2="30" stroke="#ffb347" strokeWidth="2" />
          <circle cx="100" cy="30" r="3" fill="#ffb347" />
        </g>
        <circle cx="100" cy="100" r="6" fill="#0e1323" stroke="#5ff7f3" />
        <circle cx="100" cy="100" r="2" fill="#5ff7f3" />
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-14 pointer-events-none">
        <div className="text-center">
          <div className="eyebrow mb-1">Altitude</div>
          <div className="font-display text-2xl text-amber glow-amber number-instrument">04 000</div>
          <div className="eyebrow mt-1">meters / AGL</div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(95,247,243,0.2), transparent)" }} />
    </div>
  );
}
