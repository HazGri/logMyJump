import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";


export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(profile ?? {});
}


export async function PUT(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { paraclub, brevets, objectif } = body;

  try {
    const updated = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        paraclub,
        brevets,
        objectif,
      },
      create: {
        userId: session.user.id,
        paraclub,
        brevets,
        objectif,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Erreur de mise à jour du profil :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
