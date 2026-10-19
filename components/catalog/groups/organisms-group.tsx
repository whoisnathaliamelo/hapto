"use client";

import { Shapes } from "lucide-react";
import { GroupHeading } from "../group-heading";
import { ShowcaseCard } from "../showcase-card";
import { SECTIONS } from "../constants";
import type { ComponentSection } from "../types";
import { BottomNavShowcase, BOTTOM_NAV_CODE } from "../showcases";

interface OrganismsGroupProps {
  activeSection: ComponentSection;
}

export function OrganismsGroup({ activeSection }: OrganismsGroupProps) {
  const shouldRender = (id: ComponentSection) =>
    activeSection === "all" || activeSection === id;

  const count = SECTIONS.filter(
    (s) => s.category === "organisms" && shouldRender(s.id)
  ).length;

  return (
    <section id="organisms-group" className="scroll-mt-24">
      <GroupHeading icon={Shapes} title="Organismos" count={count} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shouldRender("bottom-nav") && (
          <ShowcaseCard
            id="section-bottom-nav"
            section="bottom-nav"
            title="Bottom Navigation"
            description="Barra inferior ergonômica com zona de alcance natural do polegar."
            code={BOTTOM_NAV_CODE}
            delay={0}
          >
            <BottomNavShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("top-bar") && (
          <ShowcaseCard
            id="section-top-bar"
            section="top-bar"
            title="Top App Bar"
            description="Cabeçalho mobile com navegação e ações secundárias."
            placeholder="[Espaço reservado: TopBarShowcase]"
            delay={0.08}
          />
        )}

        {shouldRender("feedback") && (
          <ShowcaseCard
            id="section-feedback"
            section="feedback"
            title="Alertas e Snackbars"
            description="Notificações efêmeras e contextuais posicionadas próximas ao polegar."
            placeholder="[Espaço reservado: FeedbackShowcase]"
            delay={0.16}
          />
        )}
      </div>
    </section>
  );
}
