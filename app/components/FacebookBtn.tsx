"use client"
import Image from "next/image";
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
    <button onClick={handleFacebookSignIn} className="flex cursor-pointer justify-center text-white items-center gap-3 rounded-lg h-11 w-10/12 bg-[#1673EB]">
      <Image
        width={30}
        height={30}
        alt="logo facebook"
        src="/img/facebook.svg"
      ></Image>
      <p>Se connecter avec Facebook</p>
    </button>
  );
};
