"use client";

import { Shell } from "../components/Shell";
import { AddFriendForm } from "./addFriendForm";

export default function Page() {
  return (
    <Shell>
      <section className="container-x pt-10 pb-16 max-w-3xl">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Squadron · recruitment</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-none">
            Hail a
            <span className="font-serif italic normal-case text-cyan lowercase"> sky buddy</span>
          </h1>
          <p className="font-mono text-[13px] text-bone-dim max-w-lg">
            Enter the pilot&rsquo;s email address to transmit an invitation.
          </p>
        </div>

        <AddFriendForm />
      </section>
    </Shell>
  );
}
