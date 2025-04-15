"use client";

import type { Jump } from "@prisma/client";
import { useState } from "react";

export const JumpCard = ({ jump }: { jump: Jump }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = async () => {
    const confirmed = confirm("Tu es sûr de vouloir supprimer ce saut ?");

    if (!confirmed) return;

    const res = await fetch(`/api/jumps/${jump.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setIsVisible(false);
    } else {
      alert("Erreur lors de la suppression du saut.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white shadow-lg rounded-xl mx-2 p-4 flex justify-between gap-1 relative">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          {new Date(jump.date).toLocaleDateString()}
        </p>
        <p className="font-semibold">
          {jump.jumpType} — {jump.altitude} m
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 relative">
        <p className="text-sm text-gray-700 text-right">
          {jump.location}, {jump.country}
        </p>

        {jump.note && (
          <div className="relative">
            <span className="group cursor-default text-md px-6 inline-block">
              📝
              <div className="absolute z-10 right-0 bottom-full mb-2 max-w-[200px] break-words bg-gray-100 text-gray-700 text-xs p-2 rounded shadow-md opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none">
                {jump.note}
              </div>
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="absolute cursor-pointer bottom-5 right-4 text-red-500 hover:text-red-700 text-xs"
        title="Supprimer"
      >
        🗑
      </button>
    </div>
  );
};
