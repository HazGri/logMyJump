import Link from "next/link";
import { Shell } from "../components/Shell";
import { JumpList } from "../components/JumpList";
import { JumpStats } from "../components/JumpStats";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  const callsign = session?.user?.name?.toUpperCase().slice(0, 8);

  return (
    <Shell callsign={callsign}>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-cyan" />
              <span className="eyebrow">Tableau de bord · carnet</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl leading-none">
              Carnet
              <br />
              <span className="font-serif italic normal-case text-cyan lowercase text-5xl lg:text-7xl">de sauts</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/addJump" className="btn-phos">
              + Ajouter un saut
            </Link>
          </div>
        </div>

        <div className="mb-10">
          <JumpStats />
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="signal-dot" />
            <h2 className="font-display text-sm tracking-[0.24em]">Mes derniers sauts</h2>
          </div>
          <span className="eyebrow">Du plus récent au plus ancien</span>
        </div>

        <JumpList />
      </section>
    </Shell>
  );
}
