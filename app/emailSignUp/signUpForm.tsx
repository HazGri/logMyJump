"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email(
      { email, password, name, callbackURL: "/dashboard" },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      }
    );
    console.log("SignUp data:", data);
    console.log("SignUp error:", error);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="field-label">Nom / pseudo</label>
        <input
          id="name"
          type="text"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Maverick"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          type="email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pilote@paraclub.fr"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="field-label">Mot de passe</label>
        <input
          id="password"
          type="password"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn-phos mt-2">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-ink-0 border-t-transparent animate-spin" />
            Création
          </span>
        ) : (
          "→ Ouvrir mon carnet"
        )}
      </button>
    </form>
  );
};
