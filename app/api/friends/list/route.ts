// /api/friends/list
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { requesterId: session.user.id, status: "accepted" },
        { receiverId: session.user.id, status: "accepted" },
      ],
    },
    include: {
      requester: { include: { profile: true } },
      receiver: { include: { profile: true } },
    },
  });

  const friends = friendships.map((f) => {
    const isRequester = f.requesterId === session.user.id;
    const friend = isRequester ? f.receiver : f.requester;

    return {
      id: friend.id,
      name: friend.name,
      objectif: friend.profile?.objectif ?? "Non renseigné",
      paraclub: friend.profile?.paraclub ?? "Non renseigné",
      brevets: friend.profile?.brevets ?? [], // 👈 ici
      friendshipId: f.id,
    };
  });

  return NextResponse.json(friends);
}
