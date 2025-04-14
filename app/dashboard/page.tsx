import Link from "next/link";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { JumpList } from "../components/JumpList";
import { JumpStats } from "../components/JumpStats";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="text-white shadow-xl bg-[#50ADCE]  w-full h-[135px] flex justify-center">
        <div className="flex justify-center items-center ">
          <Image
            width={60}
            height={60}
            alt="image wingsuit"
            src="/img/wingsuit.svg"
            className=""
          />
          <p className="text-xl">LogMyJump</p>
        </div>
      </div>
      <JumpStats />
      <div className="flex flex-grow flex-col gap-6">
        <Link
          className="mx-auto w-10/12 h-9 bg-[#50ADCE] mt-5 rounded-lg text-white flex justify-center items-center"
          href={"/addJump"}
        >
          Ajouter un saut
        </Link>
        <p className="text-lg ml-4">Mes derniers sauts</p>
        <JumpList />
      </div>
      <Footer />
    </div>
  );
}
