"use client";

import { useState } from "react";
import { Blocks, Shapes, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilterChips } from "./mobile-filter-chips";
import { ShowcaseCard } from "./showcase-card";
import { GroupHeading } from "./group-heading";
import { UsageGuide } from "./usage-guide";
import { SECTIONS } from "./constants";
import type { AtomicCategory, ComponentSection } from "./types";

// Showcases individuais
import {
  ButtonsShowcase,
  BUTTONS_CODE,
  InputsShowcase,
  INPUTS_CODE,
  SwitchesShowcase,
  SWITCHES_CODE,
} from "./showcases";

export function CatalogView() {
  const [activeCategory, setActiveCategory] = useState<AtomicCategory>("all");
  const [activeSection, setActiveSection] = useState<ComponentSection>("all");

  const handleSelect = (category: AtomicCategory, section: ComponentSection) => {
    setActiveCategory(category);
    setActiveSection(section);
  };

  const shouldRender = (sectionId: ComponentSection, category: AtomicCategory) => {
    const matchesCategory = activeCategory === "all" || activeCategory === category;
    const matchesSection = activeSection === "all" || activeSection === sectionId;
    return matchesCategory && matchesSection;
  };

  const showAtoms = activeCategory === "all" || activeCategory === "atoms";
  const showMolecules = activeCategory === "all" || activeCategory === "molecules";
  const showOrganisms = activeCategory === "all" || activeCategory === "organisms";

  return (
    <section className="relative isolate overflow-clip border-b border-line/40">
      {/* Background decorativo com grid dots e iluminação sutil */}
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 bg-radial from-primary/15 via-transparent to-transparent opacity-60 blur-2xl" />

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-20 lg:pt-10 lg:pb-24">
        {/* Layout no desktop: Sidebar à esquerda + Área Principal com conteúdo centralizado */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-14">
          {/* Sidebar lateral no Desktop */}
          <FilterSidebar
            activeCategory={activeCategory}
            activeSection={activeSection}
            onSelect={handleSelect}
          />

          {/* Área Principal centralizada */}
          <div className="min-w-0 flex-1 flex flex-col items-center">
            <div className="w-full max-w-4xl xl:max-w-5xl space-y-12 lg:space-y-16">
              {/* Cabeçalho da Página Centralizado */}
              <header className="mx-auto max-w-2xl text-center">
                <Reveal>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-3.5 py-1 text-xs font-semibold text-muted shadow-2xs backdrop-blur-xs">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    <span>Design System Mobile-First</span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                    Catálogo de{" "}
                    <span className="text-primary underline decoration-primary/30 underline-offset-8">
                      Componentes
                    </span>
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    Biblioteca modular guiada por Atomic Design e calibrada para ergonomia móvel.
                  </p>
                </Reveal>
              </header>

              {/* Card de Instruções de Uso para o Usuário */}
              <UsageGuide />

              {/* Mobile: chips em linha logo após o cabeçalho */}
              <Reveal delay={0.1} className="lg:hidden w-full">
                <MobileFilterChips
                  activeCategory={activeCategory}
                  activeSection={activeSection}
                  onSelect={handleSelect}
                />
              </Reveal>

              {/* Conteúdo Renderizado por Seção */}
              <div className="space-y-14 lg:space-y-16">
                {/* GRUPO: ÁTOMOS */}
                {showAtoms && (
                  <section id="atoms-group" className="scroll-mt-24">
                    <GroupHeading
                      icon={Blocks}
                      title="Átomos"
                      count={SECTIONS.filter((s) => s.category === "atoms" && shouldRender(s.id, "atoms")).length}
                    />

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {shouldRender("buttons", "atoms") && (
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

                      {shouldRender("inputs", "atoms") && (
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

                      {shouldRender("switches", "atoms") && (
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

                      {shouldRender("icons", "atoms") && (
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
                )}

                {/* GRUPO: MOLÉCULAS */}
                {showMolecules && (
                  <section id="molecules-group" className="scroll-mt-24">
                    <GroupHeading
                      icon={Sparkles}
                      title="Moléculas"
                      count={SECTIONS.filter((s) => s.category === "molecules" && shouldRender(s.id, "molecules")).length}
                    />

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {shouldRender("search", "molecules") && (
                        <ShowcaseCard
                          id="section-search"
                          section="search"
                          title="Barra de Busca"
                          description="Campo com botão de limpar e atalho tátil de fácil alcance."
                          placeholder="[Espaço reservado: SearchShowcase]"
                          delay={0}
                        />
                      )}

                      {shouldRender("cards", "molecules") && (
                        <ShowcaseCard
                          id="section-cards"
                          section="cards"
                          title="Cards Informativos"
                          description="Superfícies táteis com hierarquia e feedback em toda a área."
                          placeholder="[Espaço reservado: CardsShowcase]"
                          delay={0.08}
                        />
                      )}
                    </div>
                  </section>
                )}

                {/* GRUPO: ORGANISMOS */}
                {showOrganisms && (
                  <section id="organisms-group" className="scroll-mt-24">
                    <GroupHeading
                      icon={Shapes}
                      title="Organismos"
                      count={SECTIONS.filter((s) => s.category === "organisms" && shouldRender(s.id, "organisms")).length}
                    />

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {shouldRender("bottom-nav", "organisms") && (
                        <ShowcaseCard
                          id="section-bottom-nav"
                          section="bottom-nav"
                          title="Bottom Navigation"
                          description="Barra inferior ergonômica com zona de alcance natural do polegar."
                          placeholder="[Espaço reservado: BottomNavShowcase]"
                          delay={0}
                        />
                      )}

                      {shouldRender("top-bar", "organisms") && (
                        <ShowcaseCard
                          id="section-top-bar"
                          section="top-bar"
                          title="Top App Bar"
                          description="Cabeçalho mobile com navegação e ações secundárias."
                          placeholder="[Espaço reservado: TopBarShowcase]"
                          delay={0.08}
                        />
                      )}

                      {shouldRender("feedback", "organisms") && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
