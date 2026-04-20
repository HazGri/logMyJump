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
  const totalAltitudeKm = (totalAltitude / 1000).toFixed(1);

  const estimatedTotalSeconds = jumps.reduce((sum, jump) => sum + estimateFreefallTime(jump.altitude), 0);
  const totalSeconds = Math.round(estimatedTotalSeconds);

  let timeLabel = "";
  if (totalSeconds < 60) {
    timeLabel = `${totalSeconds}s`;
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeLabel = seconds > 0 ? `${minutes}m${String(seconds).padStart(2, "0")}` : `${minutes}m`;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 drift-stagger">
      <CardStat code="JMP" label="Nombre de sauts" value={String(totalJumps).padStart(3, "0")} unit="total" />
      <CardStat code="ALT" label="Altitude cumulée" value={totalAltitudeKm} unit="kilomètres" tone="amber" />
      <CardStat code="CHL" label="Chute libre" value={timeLabel} unit="cumulé" />
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
