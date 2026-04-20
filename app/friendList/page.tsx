"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shell } from "../components/Shell";

export default function Page() {
  const [friends, setFriends] = useState<
    {
      id: string;
      name: string;
      objectif?: string;
      paraclub?: string;
      brevets?: string[];
      friendshipId: string;
    }[]
  >([]);

  const fetchFriends = async () => {
    try {
      const res = await fetch("/api/friends/list");
      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.error("Erreur chargement amis:", err);
    }
  };

  const removeFriend = async (friendshipId: string) => {
    const confirmDelete = confirm("Remove this pilot from squadron?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/friends/remove/${friendshipId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchFriends();
      else {
        const error = await res.json();
        console.error("Erreur lors de la suppression:", error);
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <Shell>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-cyan" />
              <span className="eyebrow">Squadron · pilot roster</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-none">
              Sky
              <span className="font-serif italic normal-case text-cyan lowercase"> buddies</span>
            </h1>
          </div>
          <Link href="/addFriend" className="btn-ghost-phos self-start">+ Recruit a pilot</Link>
        </div>

        {friends.length === 0 ? (
          <div className="panel hud-corners p-10 text-center">
            <span className="hud-tl" />
            <span className="hud-br" />
            <p className="font-serif italic text-xl text-bone-dim">
              The squadron is empty. Invite someone to formation.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 drift-stagger">
            {friends.map((friend) => (
              <article
                key={friend.id}
                className="panel-flat p-5 relative group hover:border-[color:var(--cyan)] transition-colors"
              >
                <button
                  onClick={() => removeFriend(friend.friendshipId)}
                  className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center text-bone-faint hover:text-[color:var(--vermillon)] border border-[color:var(--hairline-strong)] hover:border-[color:var(--vermillon)]"
                  aria-label="Remove pilot"
                  title="Remove pilot"
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="signal-dot" />
                  <span className="eyebrow">Pilot</span>
                </div>
                <div className="font-display text-xl text-bone mb-4">{friend.name}</div>

                <dl className="space-y-2 text-[13px]">
                  <Row label="Dropzone" value={friend.paraclub || "—"} />
                  <Row label="Objective" value={friend.objectif || "—"} />
                </dl>

                {friend.brevets?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {friend.brevets.map((b) => (
                      <span key={b} className="chip" data-on="true">{b}</span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 font-serif italic text-bone-faint">No qualifications.</div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="eyebrow">{label}</dt>
      <dd className="flex-1 border-b border-dashed border-[color:var(--hairline)] mx-2" />
      <dd className="font-mono text-bone">{value}</dd>
    </div>
  );
}
