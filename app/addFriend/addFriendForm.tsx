"use client";

import { useState } from "react";

export const AddFriendForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/friends/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Invitation transmitted. Awaiting acknowledgement.");
        setEmail("");
      } else {
        setError(result.error || "Transmission failed.");
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="panel hud-corners p-6 md:p-10 relative overflow-hidden">
      <span className="hud-tl" />
      <span className="hud-br" />

      <div className="flex items-center gap-3 mb-8">
        <span className="signal-dot" />
        <span className="eyebrow">Transmit / handshake</span>
      </div>

      <label htmlFor="email" className="field-label">Target pilot email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="pilot@sky.zone"
        className="field"
      />

      <div className="hairline my-8" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="eyebrow">The pilot must already hold a flight log</div>
        <button type="submit" className="btn-phos" disabled={loading}>
          {loading ? "Transmitting…" : "→ Send invitation"}
        </button>
      </div>

      {message && (
        <div className="mt-6 border-l-2 border-[color:var(--cyan)] pl-4 font-mono text-[13px] text-cyan">
          ✓ {message}
        </div>
      )}
      {error && (
        <div className="mt-6 border-l-2 border-[color:var(--vermillon)] pl-4 font-mono text-[13px] text-[color:var(--vermillon)]">
          ✕ {error}
        </div>
      )}

      <div className="scanline" />
    </form>
  );
};
