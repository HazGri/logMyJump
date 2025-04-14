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
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          router.push("/dashboard"); // redirection
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message); // gestion d'erreur simple
        },
      }
    );
    console.log("SignIn data:", data);
    console.log("SignIn error:", error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Créer un compte</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">
          Nom
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium">
          Mot de passe
        </label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? <span className="loading loading-spinner loading-md"></span> : "Créer un compte"}
      </button>
    </form>
  );
};
