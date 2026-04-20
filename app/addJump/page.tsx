import { Shell } from "../components/Shell";
import { JumpForm } from "./JumpForm";

export default function Page() {
  return (
    <Shell>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Entry · pre-flight brief</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-none">
            Log a
            <span className="font-serif italic normal-case text-cyan lowercase"> new jump</span>
          </h1>
          <p className="font-mono text-[13px] text-bone-dim max-w-xl">
            Fill the checklist. Every field is archived under your callsign.
          </p>
        </div>

        <JumpForm />
      </section>
    </Shell>
  );
}
