import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { CardStat } from "./CardStat";

export const JumpStats = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;

  const jumps = await prisma.jump.findMany({
    where: { userId: session.user.id },
  });

  const totalJumps = jumps.length;
  const totalAltitude = jumps.reduce((sum, jump) => sum + jump.altitude, 0);
  const totalAltitudeKm = (totalAltitude / 1000).toFixed(1); // ex: 12.4 km

  const estimatedTotalSeconds = jumps.reduce((sum, jump) => {
    return sum + estimateFreefallTime(jump.altitude);
  }, 0);

  const totalSeconds = Math.round(estimatedTotalSeconds);

  let timeLabel = "";
  if (totalSeconds < 60) {
    timeLabel = `${totalSeconds} sec`;
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeLabel = seconds > 0 ? `${minutes}min ${seconds}s` : `${minutes} min`;
  }

  return (
    <div className="flex gap-3 mx-2 -mt-6">
      <CardStat
        imgSrc="/img/skydive.svg"
        imgAlt="image d'un parachutiste"
        cardTitle="Nombre de sauts"
        cardData={totalJumps}
      />
      <CardStat
        imgSrc="/img/altitude.svg"
        imgAlt="image d'une montagne"
        cardTitle="Altitude totale"
        cardData={`${totalAltitudeKm}km`}
      />
      <CardStat
        imgSrc="/img/timer.svg"
        imgAlt="image d'un timer"
        cardTitle="Temps en chute"
        cardData={timeLabel}
      />
    </div>
  );
};

function estimateFreefallTime(altitude: number): number {
  if (altitude >= 8000) return 100;
  if (altitude >= 4000) return 50;
  if (altitude >= 3000) return 35;
  if (altitude >= 1500) return 15;
  return 8;
}
