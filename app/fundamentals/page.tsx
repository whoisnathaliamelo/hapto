import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HeroFundamentals } from "@/components/fundamentals/hero-fundamentals";
import { WhyDesignSystems } from "@/components/fundamentals/why-design-systems";
import { AtomicArchitecture } from "@/components/fundamentals/atomic-architecture";
import { ErgonomicPillars } from "@/components/fundamentals/ergonomic-pillars";
import { RulesCheatSheet } from "@/components/fundamentals/rules-cheat-sheet";

export const metadata: Metadata = {
  title: "Fundamentos | Hapto Design System",
  description:
    "Ergonomia Mobile & Design Systems: interfaces acessíveis, intuitivas e eficientes para a era touch.",
};

export default function FundamentalsPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <HeroFundamentals />
        <WhyDesignSystems />
        <AtomicArchitecture />
        <ErgonomicPillars />
        <RulesCheatSheet />
      </main>
      <Footer />
    </>
  );
}
