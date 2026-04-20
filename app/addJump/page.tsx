import { Shell } from "../components/Shell";
import { JumpForm } from "./JumpForm";

export default function Page() {
  return (
    <Shell>
      <section className="container-x pt-10 pb-16">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-cyan" />
            <span className="eyebrow">Fiche · brief avant saut</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl leading-none">
            Ajouter
            <span className="font-serif italic normal-case text-cyan lowercase"> un saut</span>
          </h1>
          <p className="font-mono text-[13px] text-bone-dim max-w-xl">
            Remplis la checklist. Tous les champs sont archivés sur ton carnet.
          </p>
        </div>

        <JumpForm />
      </section>
    </Shell>
  );
}
