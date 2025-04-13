"use client";

import Link from "next/link";
import { Footer } from "../components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="text-white shadow-xl bg-[#50ADCE]  w-full h-[135px] flex justify-center">
        <Link href={"/"}>
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/wingsuit.svg"
            className="pt-4"
          />
        </Link>
      </div>
      <div className="flex flex-grow">
        <p>Main</p>
      </div>
      <Footer />
    </div>
  );
}
