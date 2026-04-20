import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { JumpCard } from "./JumpCard";

export const JumpList = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const jumps = await prisma.jump.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  if (jumps.length === 0) {
    return (
      <div className="panel hud-corners p-10 md:p-16 text-center">
        <span className="hud-tl" />
        <span className="hud-br" />
        <div className="eyebrow mb-3">Carnet vide</div>
        <p className="font-serif italic text-2xl text-bone-dim mb-6">
          Aucun saut enregistré. Le ciel t&rsquo;attend.
        </p>
        <a href="/addJump" className="btn-phos inline-flex">→ Ajouter ton premier saut</a>
      </div>
    );
  }

  const total = jumps.length;

  return (
    <div className="flex flex-col gap-3 drift-stagger">
      {jumps.map((jump, i) => (
        <JumpCard key={jump.id} jump={jump} index={total - i} />
      ))}
    </div>
  );
};
