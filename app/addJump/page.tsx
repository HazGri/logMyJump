import { Footer } from "../components/Footer";
import { JumpForm } from "./JumpForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="flex-grow overflow-auto h-10 pb-[100px] px-4">
        <h1 className="text-2xl my-4 text-center">Ajouter un saut</h1>
        <JumpForm />
      </div>
      <Footer />
    </div>
  );
}
