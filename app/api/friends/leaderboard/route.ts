// app/api/friends/leaderboard/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const friends = await prisma.friendship.findMany({
      where: {
        status: "accepted",
        OR: [
          { requesterId: session.user.id },
          { receiverId: session.user.id },
        ],
      },
      include: {
        requester: {
          include: {
            jumps: true,
          },
        },
        receiver: {
          include: {
            jumps: true,
          },
        },
      },
    });

    const friendData: { id: string; name: string; jumpCount: number }[] = [];

    for (const friendship of friends) {
      const isRequester = friendship.requester.id !== session.user.id;
      const friend = isRequester ? friendship.requester : friendship.receiver;

      friendData.push({
        id: friend.id,
        name: friend.name,
        jumpCount: friend.jumps.length,
      });
    }


    const uniqueFriends = Array.from(
      new Map(friendData.map((f) => [f.id, f])).values()
    );

    const sorted = uniqueFriends.sort((a, b) => b.jumpCount - a.jumpCount);

    return NextResponse.json(sorted);
  } catch (err) {
    console.error("Erreur leaderboard:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}