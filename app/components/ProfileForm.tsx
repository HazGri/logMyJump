"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  paraclub?: string;
  brevets: string[];
  objectif?: string;
};

export const ProfileForm = () => {
  const router = useRouter();
  const [paraclub, setParaclub] = useState("");
  const [objectif, setObjectif] = useState("");
  const [brevets, setBrevets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const brevetOptions = [
    "PAC", "A", "B",
    "Bi4", "Bi5",
    "B1", "B2", "B3", "B4", "B5",
    "BPA", "C", "D",
    "Wingsuit Niveau 1", "Wingsuit Niveau 2", "Wingsuit Niveau 3",
    "Voilure Hybride",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data: UserProfile = await res.json();
        setParaclub(data.paraclub || "");
        setObjectif(data.objectif || "");
        setBrevets(data.brevets || []);
      } catch (err) {
        console.error("Erreur de chargement du profil", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleBrevetChange = (brevet: string) => {
    setBrevets((prev) =>
      prev.includes(brevet) ? prev.filter((b) => b !== brevet) : [...prev, brevet]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/updateProfile", {
      method: "PUT",
      body: JSON.stringify({ paraclub, brevets, objectif }),
      headers: { "Content-Type": "application/json" },
    });

    setSaving(false);
    if (res.ok) router.push("/userProfile");
    else alert("Erreur lors de l'enregistrement");
  };

  if (loading) {
    return (
      <div className="panel-flat p-10 text-center">
        <span className="eyebrow">Fetching profile<span className="blink" /></span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="panel hud-corners p-6 md:p-10 relative overflow-hidden">
      <span className="hud-tl" />
      <span className="hud-br" />

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div>
          <label className="field-label">Home dropzone</label>
          <input
            type="text"
            value={paraclub}
            onChange={(e) => setParaclub(e.target.value)}
            className="field"
            placeholder="Ex: Skydive Maubeuge"
          />
        </div>
        <div>
          <label className="field-label">Current objective</label>
          <input
            type="text"
            value={objectif}
            onChange={(e) => setObjectif(e.target.value)}
            className="field"
            placeholder="Ex: Passer la PAC, devenir moniteur…"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <label className="field-label mb-0">Brevets held</label>
          <span className="font-mono text-[10px] text-bone-faint tracking-[0.22em]">
            {brevets.length} / {brevetOptions.length} SELECTED
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {brevetOptions.map((brevet) => (
            <button
              type="button"
              key={brevet}
              onClick={() => handleBrevetChange(brevet)}
              className="chip"
              data-on={brevets.includes(brevet)}
            >
              {brevet}
            </button>
          ))}
        </div>
      </div>

      <div className="hairline mb-6" />

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <span className="eyebrow self-center">Updates are archived instantly</span>
        <button type="submit" className="btn-phos" disabled={saving}>
          {saving ? "Saving…" : "→ Save credentials"}
        </button>
      </div>

      <div className="scanline" />
    </form>
  );
};
