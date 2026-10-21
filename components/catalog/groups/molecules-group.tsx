"use client";

import { Sparkles } from "lucide-react";
import { GroupHeading } from "../group-heading";
import { ShowcaseCard } from "../showcase-card";
import { SECTIONS } from "../constants";
import type { ComponentSection } from "../types";
import {
  SearchShowcase,
  SEARCH_CODE,
  CardsShowcase,
  CARDS_CODE,
} from "../showcases";

interface MoleculesGroupProps {
  activeSection: ComponentSection;
}

export function MoleculesGroup({ activeSection }: MoleculesGroupProps) {
  const shouldRender = (id: ComponentSection) =>
    activeSection === "all" || activeSection === id;

  const count = SECTIONS.filter(
    (s) => s.category === "molecules" && shouldRender(s.id)
  ).length;

  return (
    <section id="molecules-group" className="scroll-mt-24">
      <GroupHeading icon={Sparkles} title="Moléculas" count={count} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shouldRender("search") && (
          <ShowcaseCard
            id="search"
            section="search"
            title="Barra de Busca"
            description="Campo com botão de limpar e atalho tátil de fácil alcance."
            code={SEARCH_CODE}
            delay={0}
          >
            <SearchShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("cards") && (
          <ShowcaseCard
            id="cards"
            section="cards"
            title="Cards Informativos"
            description="Superfícies táteis com hierarquia e feedback em toda a área."
            code={CARDS_CODE}
            delay={0.08}
          >
            <CardsShowcase />
          </ShowcaseCard>
        )}
      </div>
    </section>
  );
}
