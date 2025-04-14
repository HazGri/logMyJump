"use client";

import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { Footer } from "../components/Footer";
import { ProfileForm } from "../components/ProfileForm";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto relative pb-[150px]">
      {/* Header */}
      <div className="text-white shadow-xl bg-[#50ADCE] w-full h-[135px] flex justify-center">
        <div className="flex justify-center items-center gap-2">
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/wingsuit.svg"
          />
          <p className="text-xl">{session?.user?.name ?? "Non connecté"}</p>
        </div>
      </div>
      <ProfileForm />
      <Footer />
    </div>
  );
}
