"use client";

import Link from "next/link";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { CardStat } from "../components/CardStat";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="text-white shadow-xl bg-[#50ADCE]  w-full h-[135px] flex justify-center">
        <Link href={"/"}>
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/wingsuit.svg"
            className="pt-4"
          />
        </Link>
      </div>
      <div className="flex gap-3 mx-2 -mt-6">
        <CardStat
          imgSrc={"/img/skydive.svg"}
          imgAlt={"image d'un parachutiste"}
          cardTitle={"Nombre de sauts"}
          cardData={10}
        />
        <CardStat
          imgSrc={"/img/altitude.svg"}
          imgAlt={"image d'une montagne"}
          cardTitle={"Altitude totale"}
          cardData={10200}
        />
        <CardStat
          imgSrc={"/img/timer.svg"}
          imgAlt={"image d'un timer"}
          cardTitle={"Temps passé en chute"}
          cardData={4}
        />
      </div>
      <div className="flex flex-grow flex-col gap-6">
        <Link
          className="mx-auto w-10/12 h-9 bg-[#50ADCE] mt-5 rounded-lg text-white flex justify-center items-center"
          href={"/addJump"}
        >
          Ajouter un saut
        </Link>
        <p className="text-lg ml-4">Mes derniers sauts</p>
      </div>
      <Footer />
    </div>
  );
}
