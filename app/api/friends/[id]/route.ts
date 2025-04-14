import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { action } = await req.json();

  if (!["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  }

  await prisma.friendship.update({
    where: { id: params.id },
    data: { status: action === "accept" ? "accepted" : "rejected" },
  });

  return NextResponse.json({ success: true });
}
