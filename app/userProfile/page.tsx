"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shell } from "../components/Shell";
import { UserProfileInfo } from "../components/UserProfileInfo";

export default function Page() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const name = session?.user?.name ?? "Non connecté";
  const email = session?.user?.email ?? "";
  const callsign = name.toUpperCase().slice(0, 8);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Shell callsign={callsign}>
      <section className="container-x pt-10 pb-20">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Pilote · identifiants</span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl leading-none">
            Identité
            <br />
            <span className="font-serif italic normal-case text-cyan lowercase text-5xl lg:text-7xl">de vol.</span>
          </h1>
        </div>

        <div className="panel hud-corners p-6 md:p-10 mb-10 relative overflow-hidden">
          <span className="hud-tl" />
          <span className="hud-br" />
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="signal-dot" />
                <span className="eyebrow">Pilote actif / vérifié</span>
              </div>
              <div className="eyebrow mb-2">Indicatif</div>
              <div className="font-display text-3xl md:text-4xl text-bone mb-4">{name}</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="eyebrow mb-1">Email</div>
                  <div className="font-mono text-[13px] text-bone-dim break-all">{email || "Non renseigné"}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Statut</div>
                  <div className="font-mono text-[13px] text-cyan">OPÉRATIONNEL</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="2" y="2" width="116" height="116" stroke="var(--cyan)" strokeOpacity="0.5" strokeDasharray="4 3" />
                <circle cx="60" cy="60" r="30" stroke="var(--cyan)" />
                <circle cx="60" cy="60" r="46" stroke="var(--hairline-strong)" />
                <text x="60" y="114" textAnchor="middle" fill="var(--cyan)" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="2">ID · {callsign}</text>
                <path d="M45 60h30M60 45v30" stroke="var(--cyan)" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className="scanline" />
        </div>

        <UserProfileInfo />

        <div className="hairline my-10" />

        <div className="flex flex-wrap gap-3">
          <Link href="/profileForm" className="btn-ghost-phos">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 2l3 3-8 8H3v-3l8-8z" />
            </svg>
            Modifier le profil
          </Link>
          <button onClick={handleSignOut} className="btn-destruct btn-ghost-phos">
            Se déconnecter
          </button>
        </div>
      </section>
    </Shell>
  );
}
