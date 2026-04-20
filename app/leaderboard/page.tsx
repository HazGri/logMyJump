"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shell } from "../components/Shell";

export default function Page() {
  const [pendingCount, setPendingCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<
    { id: string; name: string; jumpCount: number }[]
  >([]);
  const [sessionUserId, setSessionUserId] = useState("");

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/friends/friendsRequest");
        const data = await res.json();
        setPendingCount(data.length || 0);
      } catch (err) {
        console.error("Erreur chargement demandes :", err);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/friends/leaderboard");
        const data = await res.json();
        setLeaderboard(data.leaderboard);
        setSessionUserId(data.sessionUserId);
      } catch (err) {
        console.error("Erreur chargement leaderboard :", err);
      }
    };

    fetchPending();
    fetchLeaderboard();
  }, []);

  const getMedalClass = (index: number) => {
    if (index === 0) return "gold-medal";
    if (index === 1) return "silver-medal";
    if (index === 2) return "bronze-medal";
    return "panel-flat";
  };

  const topJump = leaderboard[0]?.jumpCount || 1;

  return (
    <Shell>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-cyan" />
              <span className="eyebrow">Escadrille · classement</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl leading-none">
              Classement
              <br />
              <span className="font-serif italic normal-case text-cyan lowercase text-5xl lg:text-7xl">des pilotes.</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/addFriend" className="btn-ghost-phos">+ Ajouter un ami</Link>
            <Link href="/friendRequest" className="btn-ghost-phos">
              Demandes
              {pendingCount > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-amber text-ink-0 text-[10px] font-display">
                  {pendingCount}
                </span>
              )}
            </Link>
            <Link href="/friendList" className="btn-ghost-phos">SkyBuddies</Link>
          </div>
        </div>

        <div className="panel hud-corners p-4 md:p-6 relative overflow-hidden">
          <span className="hud-tl" />
          <span className="hud-br" />
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <span className="signal-dot" />
              <span className="eyebrow">Tableau · top 7</span>
            </div>
            <span className="font-mono text-[10px] text-bone-faint tracking-[0.22em]">
              SAUTS · DÉCR.
            </span>
          </div>

          {leaderboard.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-serif italic text-xl text-bone-dim">
                Aucune activité. Ajoute un ami pour lancer la liaison.
              </p>
            </div>
          ) : (
            <ol className="flex flex-col gap-3 drift-stagger">
              {leaderboard.slice(0, 7).map((user, i) => {
                const isMe = user.id === sessionUserId;
                const pct = Math.max(8, Math.round((user.jumpCount / topJump) * 100));
                return (
                  <li
                    key={user.id}
                    className={`relative ${getMedalClass(i)} ${isMe ? "ring-phos" : ""} px-4 md:px-6 py-4`}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="shrink-0 w-10 text-center">
                        <div className="font-display text-2xl">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-serif italic text-lg md:text-xl truncate">
                            {user.name}
                          </div>
                          {isMe && (
                            <span className="font-mono text-[10px] tracking-[0.22em] text-cyan border border-[color:var(--cyan)] px-1.5 py-0.5">
                              MOI
                            </span>
                          )}
                        </div>
                        <div className="h-[3px] mt-2 bg-[color:var(--ink-4)] overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${pct}%`,
                              background:
                                i === 0
                                  ? "linear-gradient(90deg, #ffd700, #ffa500)"
                                  : i === 1
                                  ? "linear-gradient(90deg, #dce6f5, #a7b0c3)"
                                  : i === 2
                                  ? "linear-gradient(90deg, #e0a96d, #c47f3f)"
                                  : "var(--cyan)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="number-instrument font-display text-xl md:text-2xl leading-none">
                          {String(user.jumpCount).padStart(3, "0")}
                        </div>
                        <div className="eyebrow mt-1">sauts</div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </Shell>
  );
}
