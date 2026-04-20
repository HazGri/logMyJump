"use client";

import { authClient } from "@/lib/auth-client";

export const GoogleBtn = () => {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error("Erreur de connexion Google:", err);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn-phos w-full">
      <svg width="14" height="14" viewBox="0 0 512 512" aria-hidden="true">
        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
      </svg>
      Continuer avec Google
    </button>
  );
};
