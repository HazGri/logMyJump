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
    <button
      onClick={handleFacebookSignIn}
      className="btn bg-[#1A77F2] w-10/12 text-white border-[#005fd8]"
    >
      <svg
        aria-label="Facebook logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <path
          fill="white"
          d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
        ></path>
      </svg>
      Se connecter avec Facebook
    </button>
  );
};
