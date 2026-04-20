"use client";

import { useState } from "react";

export const JumpForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);

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
      setSaving(true);
      const res = await fetch("/api/addJump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseBody = await res.json().catch(() => null);
      console.log("Status:", res.status);
      console.log("Réponse serveur:", responseBody);

      if (res.ok) {
        setShowToast(true);
        form.reset();
        setSelectedCountry("");
        setCustomCountry("");
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 panel px-5 py-3 hud-corners">
          <span className="hud-tl" />
          <span className="hud-br" />
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.18em] uppercase">
            <span className="signal-dot" />
            <span className="text-cyan">Jump filed</span>
            <span className="text-bone-dim">· archived to logbook</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="panel hud-corners p-6 md:p-10 relative overflow-hidden"
      >
        <span className="hud-tl" />
        <span className="hud-br" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="signal-dot" />
            <span className="eyebrow">Sheet / JMP-001</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-amber">UNSAVED</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Field label="Date of jump" code="DTE">
            <input id="date" type="date" className="field" required />
          </Field>

          <Field label="Aircraft" code="AIR">
            <input id="aircraft" type="text" placeholder="Pilatus, Cessna, Skyvan…" className="field" />
          </Field>

          <Field label="Altitude / exit" code="ALT">
            <select id="altitude" className="field" required defaultValue="">
              <option value="" disabled>Select altitude…</option>
              <option value="4000">4000 m</option>
              <option value="1500">1500 m</option>
              <option value="3000">3000 m</option>
              <option value="8000">8000 m</option>
            </select>
          </Field>

          <Field label="Jump type" code="TYP">
            <select id="jumpType" className="field" required defaultValue="">
              <option value="" disabled>Select type…</option>
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
          </Field>

          <Field label="Dropzone" code="DZ">
            <input id="location" type="text" placeholder="Nom de la dropzone" className="field" />
          </Field>

          <Field label="Country" code="CTY">
            <select
              id="country"
              className="field"
              required
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" disabled>Select country…</option>
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
              <option value="autre">🌍 Other</option>
            </select>
            {selectedCountry === "autre" && (
              <input
                type="text"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                placeholder="Enter country"
                className="field mt-3"
              />
            )}
          </Field>

          <div className="md:col-span-2">
            <Field label="Pilot note" code="NTE">
              <textarea id="note" rows={4} className="field" placeholder="Programme, impressions, météo, exit, landing…" />
            </Field>
          </div>
        </div>

        <div className="hairline my-8" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="eyebrow">All fields archive under your callsign</div>
          <button type="submit" className="btn-phos" disabled={saving}>
            {saving ? "Filing…" : "→ File jump in logbook"}
          </button>
        </div>

        <div className="scanline" />
      </form>
    </>
  );
};

function Field({ label, code, children }: { label: string; code: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="field-label mb-0">{label}</span>
        <span className="font-mono text-[9px] tracking-[0.24em] text-bone-faint">{code}</span>
      </div>
      {children}
    </div>
  );
}
