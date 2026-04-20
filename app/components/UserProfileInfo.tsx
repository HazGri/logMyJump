"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  paraclub?: string;
  brevets: string[];
  objectif?: string;
};

export const UserProfileInfo = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="panel-flat p-8 text-center">
        <span className="eyebrow">Chargement du profil<span className="blink" /></span>
      </div>
    );
  }
  if (!profile) return null;

  const { paraclub, brevets = [], objectif } = profile;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <DataBlock code="DZ" label="Paraclub préféré" value={paraclub || "Non renseigné"} />
      <DataBlock code="OBJ" label="Objectif" value={objectif || "Non renseigné"} emphasis />
      <div className="panel-flat p-5 md:p-6">
        <div className="flex items-baseline justify-between mb-3">
          <span className="eyebrow">Brevets obtenus</span>
          <span className="font-mono text-[10px] text-bone-faint tracking-[0.22em]">{brevets.length}·QUAL</span>
        </div>
        {brevets.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {brevets.map((b) => (
              <span key={b} className="chip" data-on="true">{b}</span>
            ))}
          </div>
        ) : (
          <div className="font-serif italic text-bone-dim">Aucun brevet renseigné.</div>
        )}
      </div>
    </div>
  );
};

function DataBlock({
  code,
  label,
  value,
  emphasis,
}: {
  code: string;
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="panel-flat p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <span className="eyebrow">{label}</span>
        <span className="font-mono text-[10px] text-bone-faint tracking-[0.22em]">{code}</span>
      </div>
      <div className={`${emphasis ? "font-serif italic text-2xl text-cyan" : "font-display text-lg text-bone"}`}>
        {value}
      </div>
    </div>
  );
}
