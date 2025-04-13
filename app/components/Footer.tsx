import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-around m-6">
      <Link href={"/"}>
        <Image width={30} height={30} src="/img/home.svg" alt="home icone" />
      </Link>
      <Link href={"/"}>
        <Image width={30} height={30} src="/img/hubot.svg" alt="chatbot icone" />
      </Link>
      <Link href={"/"}>
        <Image width={30} height={30} src="/img/profile.svg" alt="profil icone" />
      </Link>
    </div>
  );
};
