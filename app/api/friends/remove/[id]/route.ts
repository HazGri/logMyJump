import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = context.params;

  const friendship = await prisma.friendship.findUnique({
    where: { id },
    select: {
      id: true,
      requesterId: true,
      receiverId: true,
    },
  });

  if (
    !friendship ||
    (friendship.requesterId !== session.user.id &&
      friendship.receiverId !== session.user.id)
  ) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  await prisma.friendship.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
