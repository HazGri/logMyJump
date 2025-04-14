import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: Request, context: any) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const deleted = await prisma.jump.delete({
      where: {
        id: context.params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
