
import { Footer } from "../components/Footer";
import { JumpForm } from "./JumpForm";



export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 max-w-md mx-auto flex flex-col">
      <div className="flex-grow flex gap-4 justify-center flex-col">
        <h1 className="text-2xl mb-9 text-center">Ajouter un saut</h1>
        <JumpForm/>
      </div>
      <Footer />
    </div>
  );
}
