"use client";

import { useState } from "react";

export const JumpForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const data = {
      date: form.date.value,
      aircraft: form.aircraft.value,
      altitude: form.altitude.value,
      jumpType: form.jumpType.value,
      location: form.location.value,
      country: selectedCountry === "autre" ? customCountry : selectedCountry,
      note: form.note.value,
    };

    try {
      const res = await fetch("/api/addJump", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseBody = await res.json().catch(() => null);

      console.log("Status:", res.status);
      console.log("Réponse serveur:", responseBody);

      if (res.ok) {
        setShowToast(true);
        console.log("✅ Saut enregistré avec succès !");
        console.log("📦 Données envoyées :", data);

        form.reset();
        setSelectedCountry("");
        setCustomCountry("");
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error("Erreur lors de l'enregistrement :", responseBody);
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-md gap-2 items-center font-test"
    >
      {showToast && (
        <div className="toast toast-center toast-middle z-50">
          <div className="alert alert-success shadow-lg">
            <span>✅ Saut enregistré avec succès !</span>
          </div>
        </div>
      )}
      <label htmlFor="date">Date du saut</label>
      <input
        id="date"
        type="date"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        required
      />

      <label htmlFor="aircraft">Avion</label>
      <input
        id="aircraft"
        type="text"
        placeholder="Ex: Pilatus, Cessna..."
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
      />

      <label htmlFor="altitude">Hauteur (en mètres)</label>
      <select
        id="altitude"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        required
      >
        <option value="">Sélectionner une hauteur</option>
        <option value="4000">4000 m </option>
        <option value="1500">1500 m </option>
        <option value="3000">3000 m </option>
        <option value="8000">8000 m </option>
      </select>

      <label htmlFor="jumpType">Type de saut</label>
      <select
        id="jumpType"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        required
      >
        <option value="">Sélectionner un type</option>
        <option value="solo">Solo</option>
        <option value="biplace">Biplace / Tandem</option>
        <option value="wingsuit">Wingsuit</option>
        <option value="freefly">Freefly</option>
        <option value="voile-contact">Voile contact</option>
        <option value="vol-relatif">Vol relatif</option>
        <option value="tracking">Tracking / Angle</option>
        <option value="camera">Caméra</option>
        <option value="swoop">Swoop</option>
        <option value="hop-n-pop">Hop and Pop</option>
      </select>

      <label htmlFor="location">Lieu</label>
      <input
        id="location"
        type="text"
        placeholder="Nom de la dropzone"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
      />

      <label htmlFor="country">Pays</label>
      <select
        id="country"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        required
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Sélectionner un pays</option>
        <option value="france">🇫🇷 France</option>
        <option value="belgique">🇧🇪 Belgique</option>
        <option value="suisse">🇨🇭 Suisse</option>
        <option value="espagne">🇪🇸 Espagne</option>
        <option value="portugal">🇵🇹 Portugal</option>
        <option value="italie">🇮🇹 Italie</option>
        <option value="allemagne">🇩🇪 Allemagne</option>
        <option value="canada">🇨🇦 Canada</option>
        <option value="usa">🇺🇸 États-Unis</option>
        <option value="australie">🇦🇺 Australie</option>
        <option value="réunion">🇷🇪 La Réunion</option>
        <option value="djibouti">🇩🇯 Djibouti</option>
        <option value="maroc">🇲🇦 Maroc</option>
        <option value="autre">🌍 Autre</option>
      </select>

      {selectedCountry === "autre" && (
        <input
          type="text"
          value={customCountry}
          onChange={(e) => setCustomCountry(e.target.value)}
          placeholder="Entrer le nom du pays"
          className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        />
      )}

      <label htmlFor="note">Note</label>
      <textarea
        id="note"
        rows={3}
        placeholder="Programme, impressions, météo, etc."
        className="rounded-lg w-10/12 bg-gray-300 px-3 py-2 resize-none"
      ></textarea>

      <button
        className="mx-auto w-10/12 h-9 bg-[#50ADCE] text-white mt-5 rounded-lg cursor-pointer"
        type="submit"
      >
        Enregistrer
      </button>
    </form>
  );
};
