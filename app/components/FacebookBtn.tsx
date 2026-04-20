"use client";
import { authClient } from "@/lib/auth-client";

export const FacebookBtn = () => {
  const handleFacebookSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "facebook",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error("Erreur de connexion Facebook:", err);
    }
  };
  return (
    <button onClick={handleFacebookSignIn} className="btn-ghost-phos w-full">
      <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
        />
      </svg>
      Continuer avec Facebook
    </button>
  );
};
