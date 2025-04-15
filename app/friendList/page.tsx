"use client";

import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import Image from "next/image";

export default function Home() {
  const [friends, setFriends] = useState<
    {
      id: string;
      name: string;
      objectif?: string;
      paraclub?: string;
      brevets?: string[];
      friendshipId: string;
    }[]
  >([]);

  const fetchFriends = async () => {
    try {
      const res = await fetch("/api/friends/list");
      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.error("Erreur chargement amis:", err);
    }
  };

  const removeFriend = async (friendshipId: string) => {
    const confirmDelete = confirm("Supprimer cet ami ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/friends/remove/${friendshipId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchFriends();
      } else {
        const error = await res.json();
        console.error("Erreur lors de la suppression:", error);
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="text-white shadow-xl/20 bg-[#50ADCE] w-full h-[135px] flex justify-center">
        <div className="flex justify-center items-center ">
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/wingsuit.svg"
            className=""
          />
          <p className="text-xl">Mes skyBuddies</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 mt-6 h-[450px] overflow-scroll">
        {friends.length === 0 ? (
          <p className="text-center text-gray-500">Aucun ami pour le moment.</p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white rounded shadow p-4 relative"
            >
              <Image
                onClick={() => removeFriend(friend.friendshipId)}
                className="cursor-pointer absolute top-2 right-2"
                width={15}
                height={15}
                alt="logo croix"
                src={"/img/close.svg"}
              />

              <p className="font-bold">{friend.name}</p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Paraclub :</span>{" "}
                {friend.paraclub || "Non renseigné"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Objectif :</span>{" "}
                {friend.objectif || "Non renseigné"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Brevets :</span>{" "}
                {friend.brevets?.length ? friend.brevets.join(", ") : "Aucun"}
              </p>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
