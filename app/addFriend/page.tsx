"use client";

import { Footer } from "../components/Footer";
import { AddFriendForm } from "./addFriendForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto relative pb-[150px]">
      <div className="text-white shadow-xl bg-[#50ADCE] w-full h-[135px] flex justify-center">
        <div className="flex items-center mr-auto pl-10 gap-3">
          <p className="text-2xl pt-3">Ajouter un skyBuddie</p>
        </div>
      </div>
      <main>
        <AddFriendForm />
      </main>
      <Footer />
    </div>
  );
}
