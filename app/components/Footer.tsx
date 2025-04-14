import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-100 z-50 flex justify-around items-center h-[80px]">
<Link href={"/dashboard"}>
        <Image width={30} height={30} src="/img/home.svg" alt="home icone" />
      </Link>
      <Link href={"/"}>
        <Image width={30} height={30} src="/img/hubot.svg" alt="chatbot icone" />
      </Link>
      <Link href={"/userProfile"}>
        <Image width={30} height={30} src="/img/profile.svg" alt="profil icone" />
      </Link>
    </div>
  );
};
