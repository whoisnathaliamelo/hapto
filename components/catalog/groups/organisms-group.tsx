"use client";

import { Shapes } from "lucide-react";
import { GroupHeading } from "../group-heading";
import { ShowcaseCard } from "../showcase-card";
import { SECTIONS } from "../constants";
import type { CatalogGroupProps, ComponentSection } from "../types";
import {
  BottomNavShowcase,
  BOTTOM_NAV_CODE,
  TopBarShowcase,
  TOP_BAR_CODE,
  FeedbackShowcase,
  FEEDBACK_CODE,
} from "../showcases";

export function OrganismsGroup({ activeSection, visibleSections }: CatalogGroupProps) {
  const shouldRender = (id: ComponentSection) => {
    const matchesActive = activeSection === "all" || activeSection === id;
    const matchesSearch = !visibleSections || visibleSections.has(id);
    return matchesActive && matchesSearch;
  };

  const count = SECTIONS.filter(
    (s) => s.category === "organisms" && shouldRender(s.id)
  ).length;

  if (visibleSections && count === 0) {
    return null;
  }

  return (
    <section id="organisms-group" className="scroll-mt-24">
      <GroupHeading icon={Shapes} title="Organismos" count={count} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shouldRender("bottom-nav") && (
          <ShowcaseCard
            id="bottom-nav"
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
            id="top-bar"
            section="top-bar"
            title="Top App Bar"
            description="Cabeçalho mobile com navegação e ações secundárias."
            code={TOP_BAR_CODE}
            delay={0.08}
          >
            <TopBarShowcase />
          </ShowcaseCard>
        )}

        {shouldRender("feedback") && (
          <ShowcaseCard
            id="feedback"
            section="feedback"
            title="Alertas e Snackbars"
            description="Notificações efêmeras e contextuais posicionadas próximas ao polegar."
            code={FEEDBACK_CODE}
            delay={0.16}
          >
            <FeedbackShowcase />
          </ShowcaseCard>
        )}
      </div>
    </section>
  );
}
