"use client";

import Image from "next/image";
import { Footer } from "../../../../../components/Footer";
import { useEffect, useState } from "react";

type FriendRequest = {
  id: string;
  requester: {
    id: string;
    name: string;
    email: string;
  };
};

export default function Home() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("/api/friends/friendsRequest");
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    await fetch(`/api/friends/${id}`, {
      method: "PUT",
      body: JSON.stringify({ action }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto relative pb-[150px]">
      {/* Header */}
      <div className="text-white shadow-xl bg-[#50ADCE] w-full h-[135px] flex justify-center">
        <div className="flex justify-center items-center gap-2">
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/friendship.svg"
          />
          <p className="text-xl">Demandes en attente</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {requests.length === 0 && <p>Aucune demande pour le moment.</p>}
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span>{req.requester.name || req.requester.email}</span>
            <div className="flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAction(req.id, "accept")}
              >
                ✅
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleAction(req.id, "reject")}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
