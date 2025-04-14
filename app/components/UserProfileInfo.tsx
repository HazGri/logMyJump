"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  paraclub?: string;
  brevets: string[];
  objectif?: string;
};

export const UserProfileInfo = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-4">Chargement...</p>;

  const { paraclub, brevets = [], objectif } = profile;

  return (
    <div className="px-6 py-10 space-y-10">
      <p className="text-lg">
        <span className="font-semibold text-2xl text-gray-600">Paraclub préféré :</span>{" "}
        {paraclub || "Non renseigné"}
      </p>
      <p className="text-lg">
        <span className="font-semibold text-2xl text-gray-600">Brevets :</span>{" "}
        {brevets.length > 0 ? brevets.join(", ") : "Aucun brevet"}
      </p>
      <p className="text-lg">
        <span className="font-semibold text-2xl text-gray-600">Objectif :</span>{" "}
        {objectif || "Non renseigné"}
      </p>
    </div>
  );
};
