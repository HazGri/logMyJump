import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = context.params;
  const { action } = await req.json();

  if (!["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  }

  await prisma.friendship.update({
    where: { id },
    data: {
      status: action === "accept" ? "accepted" : "rejected",
    },
  });

  return NextResponse.json({ success: true });
}
