"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  callsign?: string;
};

const navItems = [
  { href: "/dashboard", label: "Carnet", code: "LOG", icon: LogbookIcon },
  { href: "/leaderboard", label: "Escadrille", code: "ESC", icon: SquadronIcon },
  { href: "/userProfile", label: "Pilote", code: "PLT", icon: PilotIcon },
];

export const Shell = ({ children, callsign }: Props) => {
  const pathname = usePathname();
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}Z`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[color:var(--hairline-strong)] bg-[color:var(--ink-1)]/80 backdrop-blur-md">
        <div className="container-x flex h-14 items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <BrandMark />
            <span className="font-display text-[13px] tracking-[0.24em] text-bone group-hover:text-cyan transition-colors">
              LOG<span className="text-cyan">/</span>MY<span className="text-cyan">/</span>JUMP
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.24em] text-bone-dim ml-4">
            <span className="flex items-center gap-2">
              <span className="signal-dot" />
              <span>liaison</span>
              <span className="text-cyan">ok</span>
            </span>
            <span>UTC <span className="text-bone">{now}</span></span>
            {callsign && (
              <span>
                IND <span className="text-amber">{callsign}</span>
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:inline eyebrow">v04·20</span>
          </div>
        </div>
      </header>

      <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-[240px] flex-col border-r border-[color:var(--hairline-strong)] bg-[color:var(--ink-1)]/60 backdrop-blur-sm z-30">
        <div className="px-6 py-8 flex flex-col gap-1">
          <span className="eyebrow">Navigation · panneau</span>
          <span className="font-serif italic text-xl text-bone mt-1">Choisis ton cap</span>
        </div>
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-3 rounded-sm transition-all border ${
                  active
                    ? "border-[color:var(--cyan)] bg-[color:var(--cyan-soft)] text-cyan"
                    : "border-transparent hover:border-[color:var(--hairline-strong)] text-bone-dim hover:text-bone"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-sm border ${
                  active ? "border-[color:var(--cyan)] text-cyan" : "border-[color:var(--hairline-strong)] text-bone-dim group-hover:text-bone"
                }`}>
                  <Icon />
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-[11px] tracking-[0.22em]">{item.label}</span>
                  <span className="font-mono text-[9px] tracking-[0.24em] text-bone-faint">{item.code}-{active ? "●" : "○"}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-6 border-t border-[color:var(--hairline-strong)]">
          <div className="eyebrow mb-2">Horizon</div>
          <div className="font-serif italic text-sm text-bone-dim leading-snug">
            &ldquo;Le ciel n&rsquo;est pas une limite, c&rsquo;est un terrain de jeu.&rdquo;
          </div>
        </div>
      </aside>

      <main className="shell-main">{children}</main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[color:var(--hairline-strong)] bg-[color:var(--ink-1)]/95 backdrop-blur-md">
        <div className="flex items-stretch h-[72px] max-w-xl mx-auto px-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 relative ${
                  active ? "text-cyan" : "text-bone-dim"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-10 bg-cyan shadow-[0_0_12px_var(--cyan-glow)]" />
                )}
                <Icon />
                <span className="font-display text-[9px] tracking-[0.22em]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

function BrandMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeOpacity="0.4" />
      <circle cx="13" cy="13" r="6" stroke="var(--cyan)" strokeWidth="1" />
      <path d="M13 1V5M13 21V25M1 13H5M21 13H25" stroke="var(--cyan)" strokeWidth="1" />
      <circle cx="13" cy="13" r="1.5" fill="var(--cyan)" />
    </svg>
  );
}

function LogbookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2.5" y="2" width="11" height="12" rx="1" />
      <path d="M2.5 5.5h11M5 8h6M5 10.5h4" />
    </svg>
  );
}
function SquadronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 2l2 4 4.5.6-3.2 3.2.8 4.4L8 12l-4.1 2.2.8-4.4L1.5 6.6 6 6z" />
    </svg>
  );
}
function PilotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="6" r="3" />
      <path d="M2.5 14c1-3 3.5-4.5 5.5-4.5S12.5 11 13.5 14" />
    </svg>
  );
}
