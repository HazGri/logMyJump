import Link from "next/link";
import { SignUpForm } from "./signUpForm";

export default function Page() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[color:var(--hairline-strong)] bg-[color:var(--ink-1)]/70 backdrop-blur-md">
        <div className="container-x flex h-14 items-center">
          <Link href="/" className="flex items-center gap-3 font-display text-[12px] tracking-[0.24em] group">
            <span className="text-cyan group-hover:text-bone transition-colors">←</span>
            <span>LOG<span className="text-cyan">/</span>MY<span className="text-cyan">/</span>JUMP</span>
          </Link>
        </div>
      </header>

      <section className="container-x py-12 lg:py-24 grid lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-6">
          <span className="eyebrow">01 / enrolment</span>
          <h1 className="font-display text-4xl lg:text-6xl leading-none">
            New
            <br />
            <span className="font-serif italic normal-case text-cyan lowercase text-5xl lg:text-7xl">flight file</span>
          </h1>
          <p className="max-w-md font-mono text-[13px] text-bone-dim leading-relaxed">
            Open a dedicated log. Your brevets, hours and dropzones travel with you.
          </p>
          <div className="hairline max-w-xs" />
          <ul className="space-y-2 font-mono text-[12px] text-bone-dim">
            <li className="flex items-center gap-3"><span className="text-cyan">+</span>Unlimited jumps</li>
            <li className="flex items-center gap-3"><span className="text-cyan">+</span>Squadron & leaderboard</li>
            <li className="flex items-center gap-3"><span className="text-cyan">+</span>Altitude & freefall totals</li>
          </ul>
        </div>

        <div className="panel p-8 lg:p-10 hud-corners relative overflow-hidden">
          <span className="hud-tl" />
          <span className="hud-br" />
          <div className="flex items-center gap-3 mb-8">
            <span className="signal-dot" />
            <span className="eyebrow">Enrolment form</span>
            <span className="ml-auto text-[10px] font-mono text-amber">PEND</span>
          </div>
          <SignUpForm />
          <div className="hairline my-6" />
          <Link
            href="/emailSignIn"
            className="font-display text-[11px] tracking-[0.22em] text-bone-dim hover:text-cyan transition-colors"
          >
            → Already enrolled? Check in
          </Link>
          <div className="scanline" />
        </div>
      </section>
    </div>
  );
}
