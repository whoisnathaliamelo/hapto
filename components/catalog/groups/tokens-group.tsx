"use client";

import { Palette } from "lucide-react";
import { GroupHeading } from "../group-heading";
import { ShowcaseCard } from "../showcase-card";
import { SECTIONS } from "../constants";
import type { CatalogGroupProps, ComponentSection } from "../types";
import {
  ColorsShowcase,
  COLORS_CODE,
  TypographyShowcase,
  TYPOGRAPHY_CODE,
  SpacingShowcase,
  SPACING_CODE,
} from "../showcases";

export function TokensGroup({ activeSection, visibleSections }: CatalogGroupProps) {
  const shouldRender = (id: ComponentSection) => {
    const matchesActive = activeSection === "all" || activeSection === id;
    const matchesSearch = !visibleSections || visibleSections.has(id);
    return matchesActive && matchesSearch;
  };

  const count = SECTIONS.filter(
    (s) => s.category === "tokens" && shouldRender(s.id)
  ).length;

  if (visibleSections && count === 0) {
    return null;
  }

  return (
    <section id="tokens-group" className="scroll-mt-24">
      <GroupHeading icon={Palette} title="Tokens de Design" count={count} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shouldRender("colors") && (
          <ShowcaseCard
            id="colors"
            section="colors"
            title="Cores & Contraste WCAG"
            description="Padrões de contraste mínimo 4.5:1 e 3:1 para acessibilidade sob luz solar."
            code={COLORS_CODE}
            delay={0}
          >
            <ColorsShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("typography") && (
          <ShowcaseCard
            id="typography"
            section="typography"
            title="Tipografia & Escala"
            description="Hierarquia mobile e tamanho mínimo de 16px para prevenção de zoom no iOS."
            code={TYPOGRAPHY_CODE}
            delay={0.08}
          >
            <TypographyShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("spacing") && (
          <ShowcaseCard
            id="spacing"
            section="spacing"
            title="Espaçamentos & Targets"
            description="Distâncias de segurança entre alvos adjacentes (8dp+) para evitar toques incorretos acidentais."
            code={SPACING_CODE}
            delay={0.16}
          >
            <SpacingShowcase />
          </ShowcaseCard>
        )}
      </div>
    </section>
  );
}
