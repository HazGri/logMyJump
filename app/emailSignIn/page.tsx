import Link from "next/link";
import { SignInForm } from "./signInForm";


export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto">
      <div className="flex justify-center items-center text-white shadow-xl bg-[#50ADCE] text-[48px]  w-full h-[135px]">
        <Link href="/">LogMyJump</Link>
      </div>

      <div className="flex flex-col items-center gap-4 justify-center mt-28">
        <SignInForm/>
        <Link href="/emailSignUp" className="font-test text-blue-700">
          Se créer un compte
        </Link>
      </div>
    </div>
  );
}
