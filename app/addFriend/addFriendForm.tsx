"use client";

import { useState } from "react";

export const AddFriendForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Invitation envoyée !");
        setEmail("");
      } else {
        setError(result.error || "❌ Une erreur est survenue.");
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
      <label htmlFor="email" className="block text-sm font-medium">
        Ajouter un ami par email :
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="exemple@mail.com"
        className="w-full rounded-lg border px-3 py-2"
      />

      <button
        type="submit"
        className="w-full btn btn-primary bg-[#50ADCE] text-white"
      >
        Envoyer  l&apos;invitation
      </button>

      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
