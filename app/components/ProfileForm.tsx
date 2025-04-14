"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const ProfileForm = () => {
  const router = useRouter();
  const [paraclub, setParaclub] = useState("");
  const [objectif, setObjectif] = useState("");
  const [brevets, setBrevets] = useState<string[]>([]);

  const brevetOptions = [
    "PAC",
    "A",
    "B",
    "Bi4", "Bi5",
    "B1", "B2", "B3", "B4", "B5",
    "BPA",
    "C",
    "D",
    "Wingsuit Niveau 1",
    "Wingsuit Niveau 2",
    "Wingsuit Niveau 3",
    "Voilure Hybride",
  ];
  

  const handleBrevetChange = (brevet: string) => {
    setBrevets((prev) =>
      prev.includes(brevet)
        ? prev.filter((b) => b !== brevet)
        : [...prev, brevet]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/updateProfile", {
      method: "PUT",
      body: JSON.stringify({ paraclub, brevets, objectif }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/userProfile");
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Paraclub préféré</label>
        <input
          type="text"
          value={paraclub}
          onChange={(e) => setParaclub(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Ex: Skydive Maubeuge"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Brevets</label>
        <div className="flex flex-wrap gap-2">
          {brevetOptions.map((brevet) => (
            <label key={brevet} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={brevets.includes(brevet)}
                onChange={() => handleBrevetChange(brevet)}
              />
              {brevet}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Objectif</label>
        <input
          type="text"
          value={objectif}
          onChange={(e) => setObjectif(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Ex: Passer la PAC, devenir moniteur..."
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full bg-[#50ADCE] text-white py-2 rounded-md"
      >
        Enregistrer
      </button>
    </form>
  );
};
