"use client";

import { Blocks } from "lucide-react";
import { GroupHeading } from "../group-heading";
import { ShowcaseCard } from "../showcase-card";
import { SECTIONS } from "../constants";
import type { ComponentSection } from "../types";
import {
  ButtonsShowcase,
  BUTTONS_CODE,
  InputsShowcase,
  INPUTS_CODE,
  SwitchesShowcase,
  SWITCHES_CODE,
} from "../showcases";

interface AtomsGroupProps {
  activeSection: ComponentSection;
}

export function AtomsGroup({ activeSection }: AtomsGroupProps) {
  const shouldRender = (id: ComponentSection) =>
    activeSection === "all" || activeSection === id;

  const count = SECTIONS.filter(
    (s) => s.category === "atoms" && shouldRender(s.id)
  ).length;

  return (
    <section id="atoms-group" className="scroll-mt-24">
      <GroupHeading icon={Blocks} title="Átomos" count={count} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shouldRender("buttons") && (
          <ShowcaseCard
            id="section-buttons"
            section="buttons"
            title="Botões (Normal, Secundário, FAB)"
            description="Alvos táteis calibrados entre 40px e 56px para polegar."
            code={BUTTONS_CODE}
            delay={0}
          >
            <ButtonsShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("inputs") && (
          <ShowcaseCard
            id="section-inputs"
            section="inputs"
            title="Inputs de Texto"
            description="Campos com altura de 48dp e tipografia mínima que evita zoom involuntário."
            code={INPUTS_CODE}
            delay={0.08}
          >
            <InputsShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("switches") && (
          <ShowcaseCard
            id="section-switches"
            section="switches"
            title="Switches e Checkboxes"
            description="Controles binários com estados visuais claros e feedback tátil."
            code={SWITCHES_CODE}
            delay={0.16}
          >
            <SwitchesShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("icons") && (
          <ShowcaseCard
            id="section-icons"
            section="icons"
            title="Ícones Ergonômicos"
            description="Metáforas visuais com grid de toque acessível."
            placeholder="[Espaço reservado: IconsShowcase]"
            delay={0.24}
          />
        )}
      </div>
    </section>
  );
}
