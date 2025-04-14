import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const pendingRequests = await prisma.friendship.findMany({
    where: {
      receiverId: session.user.id,
      status: "pending",
    },
    include: {
      requester: true,
    },
  });

  return NextResponse.json(pendingRequests);
}
