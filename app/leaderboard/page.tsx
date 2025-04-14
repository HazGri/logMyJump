"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [pendingCount, setPendingCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<
    { id: string; name: string; jumpCount: number }[]
  >([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/friends/friendsRequest");
        const data = await res.json();
        setPendingCount(data.length || 0);
      } catch (err) {
        console.error("Erreur chargement demandes :", err);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/friends/leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error("Erreur chargement leaderboard :", err);
      }
    };

    fetchPending();
    fetchLeaderboard();
  }, []);

  const getMedalClass = (index: number) => {
    if (index === 0) return "bg-yellow-300"; // or gold
    if (index === 1) return "bg-gray-300"; // or silver
    if (index === 2) return "bg-orange-300"; // or bronze
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto relative pb-[150px]">
      <div className="text-white shadow-xl bg-[#50ADCE] w-full h-[135px] flex justify-center">
        <div className="flex items-center mr-auto pl-10 gap-3">
          <Image
            width={60}
            height={60}
            alt="image podium"
            src="/img/podium.svg"
          />
          <p className="text-2xl pt-3">Leaderboard</p>
        </div>
      </div>

      <main className="px-4 mt-6 space-y-2">
        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-500">Aucun ami pour le moment.</p>
        ) : (
          leaderboard
            .slice(0, 7) 
            .map((user, i) => (
              <div
                key={user.id}
                className={`p-3 rounded shadow flex justify-between items-center ${getMedalClass(
                  i
                )}`}
              >
                <span className="font-semibold">{user.name}</span>
                <span>{user.jumpCount} sauts</span>
              </div>
            ))
        )}
      </main>

      <div className="fixed bottom-50 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-40">
        <Link href={"/addFriend"} className="btn btn-accent">
          Ajouter un ami
        </Link>
        <Link href={"/friendRequest"} className="btn btn-warning">
          Demandes en attente : {pendingCount}
        </Link>
        <Link href={"/friendList"} className="btn btn-info">
          SkyBuddies
        </Link>
      </div>

      <Footer />
    </div>
  );
}
