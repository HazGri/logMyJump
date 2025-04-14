"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { UserProfileInfo } from "../components/UserProfileInfo";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

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
      <UserProfileInfo />
      <div className="fixed bottom-50 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-40">
        <Link href={"/profileForm"} className="btn btn-warning">Modifier le profil</Link>
        <button onClick={handleSignOut} className="btn btn-error">
          Se déconnecter
        </button>
      </div>

      <Footer />
    </div>
  );
}
