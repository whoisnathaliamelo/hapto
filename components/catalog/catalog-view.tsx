"use client";

import { useState } from "react";
import {
  Bell,
  Blocks,
  IdCard,
  MousePointerClick,
  PanelBottom,
  PanelTop,
  Search,
  Shapes,
  TextCursorInput,
  ToggleRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type AtomicCategory = "all" | "atoms" | "molecules" | "organisms";

type ComponentSection =
  | "all"
  | "buttons"
  | "inputs"
  | "switches"
  | "icons"
  | "search"
  | "cards"
  | "bottom-nav"
  | "top-bar"
  | "feedback";

interface SectionMeta {
  id: ComponentSection;
  label: string;
  category: "atoms" | "molecules" | "organisms";
}

const SECTIONS: SectionMeta[] = [
  // Átomos
  { id: "buttons", label: "Botões (Normal, Secundário, FAB)", category: "atoms" },
  { id: "inputs", label: "Inputs de Texto", category: "atoms" },
  { id: "switches", label: "Switches e Checkboxes", category: "atoms" },
  { id: "icons", label: "Ícones Ergonômicos", category: "atoms" },

  // Moléculas
  { id: "search", label: "Barra de Busca", category: "molecules" },
  { id: "cards", label: "Cards Informativos", category: "molecules" },

  // Organismos
  { id: "bottom-nav", label: "Bottom Navigation", category: "organisms" },
  { id: "top-bar", label: "Top App Bar", category: "organisms" },
  { id: "feedback", label: "Alertas e Snackbars", category: "organisms" },
];

const SECTION_ICONS: Record<Exclude<ComponentSection, "all">, LucideIcon> = {
  buttons: MousePointerClick,
  inputs: TextCursorInput,
  switches: ToggleRight,
  icons: Shapes,
  search: Search,
  cards: IdCard,
  "bottom-nav": PanelBottom,
  "top-bar": PanelTop,
  feedback: Bell,
};

const CATEGORY_LABELS: Record<SectionMeta["category"], string> = {
  atoms: "Átomo",
  molecules: "Molécula",
  organisms: "Organismo",
};

const LEVELS: { id: AtomicCategory; label: string }[] = [
  { id: "all", label: "Todos os Níveis" },
  { id: "atoms", label: "Átomos" },
  { id: "molecules", label: "Moléculas" },
  { id: "organisms", label: "Organismos" },
];

const chipBase =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-medium transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function ShowcaseCard({
  id,
  section,
  title,
  description,
  placeholder,
  delay,
}: {
  id: string;
  section: Exclude<ComponentSection, "all">;
  title: string;
  description: string;
  placeholder: string;
  delay: number;
}) {
  const Icon = SECTION_ICONS[section];
  const meta = SECTIONS.find((item) => item.id === section)!;

  return (
    <Reveal delay={delay} className="h-full">
      <article
        id={id}
        className="group flex h-full scroll-mt-24 flex-col rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Icon className="size-5" />
          </div>
          <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[10px] font-semibold text-muted">
            {CATEGORY_LABELS[meta.category]}
          </span>
        </div>

        <h3 className="mt-5 text-base font-bold text-ink transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>

        <div className="mt-6 flex min-h-40 flex-1 items-center justify-center rounded-xl border border-dashed border-line bg-surface-raised/50 px-4 text-center text-xs font-medium text-muted">
          {placeholder}
        </div>
      </article>
    </Reveal>
  );
}

function GroupHeading({
  icon: Icon,
  title,
  count,
}: {
  icon: LucideIcon;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line/40 pb-4">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-4.5" />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
      <span className="rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
        {count} {count === 1 ? "componente" : "componentes"}
      </span>
    </div>
  );
}

export function CatalogView() {
  const [activeCategory, setActiveCategory] = useState<AtomicCategory>("all");
  const [activeSection, setActiveSection] = useState<ComponentSection>("all");

  const availableSections =
    activeCategory === "all"
      ? SECTIONS
      : SECTIONS.filter((item) => item.category === activeCategory);

  const shouldRender = (sectionId: ComponentSection, category: AtomicCategory) => {
    const matchesCategory = activeCategory === "all" || activeCategory === category;
    const matchesSection = activeSection === "all" || activeSection === sectionId;
    return matchesCategory && matchesSection;
  };

  const showAtoms = activeCategory === "all" || activeCategory === "atoms";
  const showMolecules = activeCategory === "all" || activeCategory === "molecules";
  const showOrganisms = activeCategory === "all" || activeCategory === "organisms";

  return (
    <section className="relative isolate overflow-hidden border-b border-line/40">
      {/* Background decorativo com grid dots e iluminação sutil */}
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 bg-radial from-primary/15 via-transparent to-transparent opacity-60 blur-2xl" />

      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* Cabeçalho da Página */}
        <header>
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                Catálogo de{" "}
                <span className="text-primary underline decoration-primary/30 underline-offset-8">
                  Componentes
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Biblioteca modular guiada por Atomic Design e calibrada para ergonomia móvel.
              </p>
            </div>
          </Reveal>
        </header>

        {/* Barra de Filtros */}
        <Reveal delay={0.1}>
          <div className="mt-12 space-y-5 rounded-2xl border border-line bg-surface/80 p-5 shadow-xs backdrop-blur-sm">
            {/* Navegação de Nível 1: Atomic Design */}
            <nav aria-label="Níveis do Atomic Design">
              <ul className="flex flex-wrap gap-1.5 rounded-2xl border border-line bg-surface-raised p-1.5 sm:inline-flex">
                {LEVELS.map(({ id, label }) => {
                  const isActive = activeCategory === id;
                  return (
                    <li key={id} className="flex-1 sm:flex-none">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => {
                          setActiveCategory(id);
                          setActiveSection("all");
                        }}
                        className={cn(
                          chipBase,
                          "w-full font-semibold",
                          isActive
                            ? "bg-primary text-on-primary shadow-sm"
                            : "text-muted hover:bg-surface hover:text-ink"
                        )}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Navegação de Nível 2: Seletor Direto de Componente */}
            <nav
              aria-label="Seleção rápida de componente"
              className="flex flex-col gap-3 border-t border-line/50 pt-5 lg:flex-row lg:items-start"
            >
              <span className="shrink-0 pt-3 text-xs font-bold uppercase tracking-widest text-primary">
                Filtrar componente:
              </span>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <button
                    type="button"
                    aria-pressed={activeSection === "all"}
                    onClick={() => setActiveSection("all")}
                    className={cn(
                      chipBase,
                      "border",
                      activeSection === "all"
                        ? "border-primary bg-primary-light text-primary"
                        : "border-line bg-surface text-muted hover:border-primary/50 hover:text-ink"
                    )}
                  >
                    Exibir Todos
                  </button>
                </li>
                {availableSections.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          chipBase,
                          "border",
                          isActive
                            ? "border-primary bg-primary-light text-primary"
                            : "border-line bg-surface text-muted hover:border-primary/50 hover:text-ink"
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </Reveal>

        {/* Conteúdo Renderizado por Sessão */}
        <main className="mt-14 space-y-16">
          {/* GRUPO: ÁTOMOS */}
          {showAtoms && (
            <section id="atoms-group" className="scroll-mt-24">
              <GroupHeading icon={Blocks} title="Átomos" count={SECTIONS.filter((s) => s.category === "atoms" && shouldRender(s.id, "atoms")).length} />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {shouldRender("buttons", "atoms") && (
                  <ShowcaseCard
                    id="section-buttons"
                    section="buttons"
                    title="Botões (Normal, Secundário, FAB)"
                    description="Alvos táteis calibrados entre 40px e 56px para polegar."
                    placeholder="[Espaço reservado: ButtonsShowcase]"
                    delay={0}
                  />
                )}

                {shouldRender("inputs", "atoms") && (
                  <ShowcaseCard
                    id="section-inputs"
                    section="inputs"
                    title="Inputs de Texto"
                    description="Campos com altura de 48dp e tipografia mínima que evita zoom involuntário."
                    placeholder="[Espaço reservado: InputsShowcase]"
                    delay={0.08}
                  />
                )}

                {shouldRender("switches", "atoms") && (
                  <ShowcaseCard
                    id="section-switches"
                    section="switches"
                    title="Switches e Checkboxes"
                    description="Controles binários com estados visuais claros e feedback tátil."
                    placeholder="[Espaço reservado: SwitchesShowcase]"
                    delay={0.16}
                  />
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
              <GroupHeading icon={Blocks} title="Moléculas" count={SECTIONS.filter((s) => s.category === "molecules" && shouldRender(s.id, "molecules")).length} />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {shouldRender("search", "molecules") && (
                  <ShowcaseCard
                    id="section-search"
                    section="search"
                    title="Barra de Busca com Botão de Limpar"
                    description="Composição de input, ícone de busca e gatilho de limpeza acessível."
                    placeholder="[Espaço reservado: SearchBarShowcase]"
                    delay={0}
                  />
                )}

                {shouldRender("cards", "molecules") && (
                  <ShowcaseCard
                    id="section-cards"
                    section="cards"
                    title="Cards Informativos Espaçados"
                    description="Cartões de informação com espaçamento de segurança contra toques incorretos."
                    placeholder="[Espaço reservado: InfoCardsShowcase]"
                    delay={0.08}
                  />
                )}
              </div>
            </section>
          )}

          {/* GRUPO: ORGANISMOS */}
          {showOrganisms && (
            <section id="organisms-group" className="scroll-mt-24">
              <GroupHeading icon={Blocks} title="Organismos" count={SECTIONS.filter((s) => s.category === "organisms" && shouldRender(s.id, "organisms")).length} />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {shouldRender("bottom-nav", "organisms") && (
                  <ShowcaseCard
                    id="section-bottom-nav"
                    section="bottom-nav"
                    title="Bottom Navigation (Barra Inferior)"
                    description="Barra de navegação na zona natural do polegar (Thumb Reach Zone)."
                    placeholder="[Espaço reservado: BottomNavShowcase]"
                    delay={0}
                  />
                )}

                {shouldRender("top-bar", "organisms") && (
                  <ShowcaseCard
                    id="section-top-bar"
                    section="top-bar"
                    title="Top App Bar (Cabeçalho)"
                    description="Barra superior de contexto e navegação hierárquica."
                    placeholder="[Espaço reservado: TopBarShowcase]"
                    delay={0.08}
                  />
                )}

                {shouldRender("feedback", "organisms") && (
                  <ShowcaseCard
                    id="section-feedback"
                    section="feedback"
                    title="Alertas e Snackbars"
                    description="Mensagens de estado e feedback de curta duração com ação de descarte."
                    placeholder="[Espaço reservado: FeedbackShowcase]"
                    delay={0.16}
                  />
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </section>
  );
}
