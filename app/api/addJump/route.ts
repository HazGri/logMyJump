import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"; 

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const jump = await prisma.jump.create({
      data: {
        date: new Date(body.date),
        aircraft: body.aircraft,
        altitude: parseInt(body.altitude, 10),
        jumpType: body.jumpType,
        location: body.location,
        country: body.country,
        note: body.note || "",
        userId: session.user.id, 
      },
    });

    return NextResponse.json(jump, { status: 201 });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
