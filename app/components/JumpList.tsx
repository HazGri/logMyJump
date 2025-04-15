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
    return <p className="text-center mt-10">Aucun saut enregistré pour le moment.</p>;
  }

  return (
<div
  className="
    h-[200px]
    [@media(min-height:740px)]:h-[280px]     
    [@media(min-height:800px)]:h-[350px]
    [@media(min-height:870px)]:h-[450px]
    overflow-scroll space-y-4
  "
>
  {jumps.map((jump) => (
    <JumpCard key={jump.id} jump={jump} />
  ))}
</div>


  
  );
};
