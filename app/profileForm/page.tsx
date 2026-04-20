"use client";

import { authClient } from "@/lib/auth-client";
import { Shell } from "../components/Shell";
import { ProfileForm } from "../components/ProfileForm";

export default function Page() {
  const { data: session } = authClient.useSession();
  const callsign = session?.user?.name?.toUpperCase().slice(0, 8);

  return (
    <Shell callsign={callsign}>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Pilot · credentials / edit</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-none">
            Edit
            <span className="font-serif italic normal-case text-cyan lowercase"> flight identity</span>
          </h1>
        </div>

        <ProfileForm />
      </section>
    </Shell>
  );
}
