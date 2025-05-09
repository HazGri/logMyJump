"use client";

import Image from "next/image";
import Link from "next/link";
import { GoogleBtn } from "./components/GoogleBtn";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#50ADCE] text-white text-[48px] h-[135px] flex justify-center items-center shadow-xl z-10">
        LogMyJump
      </div>
      <div className="flex-1 mt-[135px] overflow-auto px-4 pb-10">
        <Image
          src="/img/parachute-svgrepo-com.svg"
          height={300}
          width={300}
          alt="image d'un parachutiste"
          className="animate-[floatZoom_3s_ease-in-out_infinite] rotate-350 mx-auto my-14"
        />

        <div className="flex flex-col items-center gap-4 justify-center">
          <GoogleBtn />

          <Link
            href={"/emailSignIn"}
            className="btn bg-white text-black w-10/12 border-[#e5e5e5]"
          >
            <svg
              aria-label="Email icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="black"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </g>
            </svg>
            Se connecter avec l&apos;email
          </Link>

          <div className="flex items-center w-100 px-6 gap-4 my-4">
            <div className="flex-grow h-[1px] bg-gray-300" />
            <span className="text-md text-gray-500 leading-none pb-1">ou</span>
            <div className="flex-grow h-[1px] bg-gray-300" />
          </div>

          <Link href="/emailSignUp" className="font-test text-sm text-blue-700">
            Se créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
