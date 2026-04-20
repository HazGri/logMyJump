"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: false,
    });
    console.log("SignIn data:", data);
    console.log("SignIn error:", error);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          className="field"
          type="email"
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
          className="field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          required
        />
      </div>
      <button type="submit" className="btn-phos mt-2" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-ink-0 border-t-transparent animate-spin" />
            Connexion
          </span>
        ) : (
          "→ Se connecter"
        )}
      </button>
    </form>
  );
};
