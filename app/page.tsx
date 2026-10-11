import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { Pillars } from "@/components/landing/pillars";
import { TokensPreview } from "@/components/landing/tokens-preview";
import { PlaygroundPreview } from "@/components/landing/playground-preview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Pillars />
        <TokensPreview />
        <PlaygroundPreview />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
