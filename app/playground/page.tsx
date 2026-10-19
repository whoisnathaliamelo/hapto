import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PlaygroundView } from "@/components/playground";

export const metadata: Metadata = {
  title: "Playground Interativo | Hapto Design System",
  description:
    "Simulador tátil para testar ergonomia mobile, alcance do polegar e alvos de toque na prática.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar fluid />
      <main className="w-full">
        <PlaygroundView />
      </main>
      <Footer fluid />
    </>
  );
}
