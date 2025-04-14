"use client";

import Image from "next/image";
import Link from "next/link";
import { GoogleBtn } from "./components/GoogleBtn";
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto">
      <div className="flex justify-center items-center text-white shadow-xl/20 bg-[#50ADCE] text-[48px]  w-full h-[135px]">
        LogMyJump
      </div>
      <Image
        src="/img/parachute-svgrepo-com.svg"
        height={300}
        width={300}
        alt="image d'un parachutiste"
        className="animate-[floatZoom_3s_ease-in-out_infinite] rotate-350 mx-auto my-14"
      />

      <div className="flex flex-col items-center gap-4 justify-center mt-28">
        <GoogleBtn />
        <Link
          href={"/emailSignIn"}
          className="btn bg-white text-black w-10/12  border-[#e5e5e5]"
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
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          Se connecter avec l&apos;email
        </Link>
        <div className="flex items-center w-100 px-6 gap-4 my-4">
          <div className="flex-grow h-[1px] bg-gray-300" />
          <span className="text-md text-gray-500 leading-none pb-1">ou</span>
          <div className="flex-grow h-[1px] bg-gray-300" />
        </div>

        <Link href="/emailSignUp" className="font-test text-sm  text-blue-700">
          Se créer un compte
        </Link>
      </div>
    </div>
  );
}
