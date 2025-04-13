"use client";

import Image from "next/image";
import Link from "next/link";
import { GoogleBtn } from "./components/GoogleBtn";
import { FacebookBtn } from "./components/FacebookBtn";
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto">
      <div className="flex justify-center items-center text-white shadow-xl bg-[#50ADCE] text-[48px]  w-full h-[135px]">
        LogMyJump
      </div>
      <Image
        src="/img/parachute-svgrepo-com.svg"
        height={300}
        width={300}
        alt="image d'un parachutiste"
        className="animate-[float_3s_ease-in-out_infinite] mx-auto my-14"
      />
      <div className="flex flex-col items-center gap-4 justify-center mt-28">
        <GoogleBtn/>
        <FacebookBtn/>
        <Link href="/emailSignIn" className="font-test text-blue-700">
          Se connecter avec l&apos;email
        </Link>
        <Link href="/emailSignUp" className="font-test text-sm  text-blue-700">
          Se créer un compte
        </Link>
      </div>
    </div>
  );
}
