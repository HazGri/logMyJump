"use client";
import Image from "next/image";
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
    <button
      onClick={handleGoogleSignIn}
      className="flex cursor-pointer justify-center items-center gap-3 rounded-lg h-11 w-10/12 bg-gray-300"
    >
      <Image
        width={30}
        height={30}
        alt="logo google"
        src="/img/google.svg"
      ></Image>
      <p>Se connecter avec Google</p>
    </button>
  );
};
