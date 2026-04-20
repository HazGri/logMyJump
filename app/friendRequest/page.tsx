"use client";

import { useEffect, useState } from "react";
import { Shell } from "../components/Shell";

type FriendRequest = {
  id: string;
  requester: {
    id: string;
    name: string;
    email: string;
  };
};

export default function Page() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("/api/friends/friendsRequest");
      const data = await res.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    await fetch(`/api/friends/${id}`, {
      method: "PUT",
      body: JSON.stringify({ action }),
      headers: { "Content-Type": "application/json" },
    });
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <Shell>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Escadrille · demandes entrantes</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-none">
            Demandes
            <span className="font-serif italic normal-case text-cyan lowercase"> en attente</span>
          </h1>
        </div>

        {requests.length === 0 ? (
          <div className="panel hud-corners p-10 text-center">
            <span className="hud-tl" />
            <span className="hud-br" />
            <p className="font-serif italic text-xl text-bone-dim">Aucune demande pour le moment.</p>
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 gap-3 drift-stagger">
            {requests.map((req) => (
              <li
                key={req.id}
                className="panel-flat p-4 md:p-5 flex items-center gap-4 justify-between"
              >
                <div className="min-w-0">
                  <div className="eyebrow mb-1">Pilote entrant</div>
                  <div className="font-display text-lg text-bone truncate">
                    {req.requester.name || req.requester.email}
                  </div>
                  <div className="font-mono text-[11px] text-bone-faint truncate">
                    {req.requester.email}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(req.id, "accept")}
                    className="h-9 w-9 flex items-center justify-center border border-[color:var(--cyan)] text-cyan hover:bg-[color:var(--cyan-soft)]"
                    aria-label="Accepter"
                    title="Accepter"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "reject")}
                    className="h-9 w-9 flex items-center justify-center border border-[color:var(--vermillon)] text-[color:var(--vermillon)] hover:bg-[rgba(255,91,56,0.12)]"
                    aria-label="Refuser"
                    title="Refuser"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 3l10 10M13 3L3 13" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}
