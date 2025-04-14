import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email requis" }, { status: 400 });
  }

  const receiver = await prisma.user.findUnique({
    where: { email },
  });

  if (!receiver || receiver.id === session.user.id) {
    return NextResponse.json(
      { error: "Utilisateur invalide" },
      { status: 400 }
    );
  }


  const existing = await prisma.friendship.findUnique({
    where: {
      requesterId_receiverId: {
        requesterId: session.user.id,
        receiverId: receiver.id,
      },
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Demande déjà envoyée" },
      { status: 409 }
    );
  }

  const friendship = await prisma.friendship.create({
    data: {
      requesterId: session.user.id,
      receiverId: receiver.id,
    },
  });

  return NextResponse.json(friendship, { status: 201 });
}
