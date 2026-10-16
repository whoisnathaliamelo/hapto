"use client";

import { useState } from "react";
import {
  Bell,
  Blocks,
  IdCard,
  LayoutGrid,
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
import { ButtonsShowcase } from "./showcases/buttons-showcase";

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

const GROUPS: { id: Exclude<AtomicCategory, "all">; label: string }[] = [
  { id: "atoms", label: "Átomos" },
  { id: "molecules", label: "Moléculas" },
  { id: "organisms", label: "Organismos" },
];

// Nome curto para a navegação (remove o trecho entre parênteses do label completo)
const shortLabel = (label: string) => label.replace(/\s*\(.*\)/, "");

function FilterSidebar({
  activeCategory,
  activeSection,
  onSelect,
}: {
  activeCategory: AtomicCategory;
  activeSection: ComponentSection;
  onSelect: (category: AtomicCategory, section: ComponentSection) => void;
}) {
  const isAllActive = activeCategory === "all" && activeSection === "all";

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start w-64 xl:w-72 shrink-0">
      {/* Desktop: lista vertical agrupada por nível */}
      <nav
        aria-label="Filtro de componentes"
        className="max-h-[calc(100svh-7.5rem)] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent]"
      >
        <div className="mb-3 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Explorar Catálogo
          </span>
        </div>

        <button
          type="button"
          aria-pressed={isAllActive}
          onClick={() => onSelect("all", "all")}
          className={cn(
            "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            isAllActive
              ? "bg-primary text-on-primary font-semibold shadow-sm"
              : "border border-line bg-surface font-medium text-ink hover:border-primary/50 hover:text-primary"
          )}
        >
          <LayoutGrid className="size-4 shrink-0" />
          <span className="flex-1 text-left">Todos os componentes</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              isAllActive ? "bg-on-primary/20 text-on-primary" : "bg-surface-raised text-muted"
            )}
          >
            {SECTIONS.length}
          </span>
        </button>

        {GROUPS.map((group) => {
          const items = SECTIONS.filter((item) => item.category === group.id);
          const isGroupActive = activeCategory === group.id && activeSection === "all";

          return (
            <div key={group.id} className="mt-6">
              <button
                type="button"
                aria-pressed={isGroupActive}
                onClick={() => onSelect(group.id, "all")}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isGroupActive ? "text-primary" : "text-muted hover:text-primary"
                )}
              >
                <span>{group.label}</span>
                <span className="rounded-full border border-line/60 bg-surface-raised px-2 py-0.5 text-[10px] tracking-normal">
                  {items.length}
                </span>
              </button>

              <ul className="mt-2 ml-3 border-l border-line">
                {items.map((item) => {
                  const Icon = SECTION_ICONS[item.id as Exclude<ComponentSection, "all">];
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        title={item.label}
                        onClick={() => onSelect(item.category, item.id)}
                        className={cn(
                          "relative flex min-h-11 w-full items-center gap-3 rounded-r-xl pr-3 pl-4 text-left text-sm leading-snug transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                          isActive
                            ? "bg-primary-light font-semibold text-primary before:absolute before:inset-y-1 before:-left-px before:w-0.5 before:rounded-full before:bg-primary"
                            : "text-muted hover:bg-surface-raised hover:text-ink"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span>{shortLabel(item.label)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function MobileFilterChips({
  activeCategory,
  activeSection,
  onSelect,
}: {
  activeCategory: AtomicCategory;
  activeSection: ComponentSection;
  onSelect: (category: AtomicCategory, section: ComponentSection) => void;
}) {
  const isAllActive = activeCategory === "all" && activeSection === "all";

  return (
    <nav aria-label="Filtro de componentes (mobile)" className="-mx-6 overflow-x-auto px-6">
      <ul className="flex gap-2 pb-2">
        {[{ id: "all" as const, label: "Todos", category: "all" as const }, ...SECTIONS].map((item) => {
          const isActive = item.id === "all" ? isAllActive : activeSection === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(item.category, item.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-xl border px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isActive
                    ? "border-primary bg-primary-light text-primary"
                    : "border-line bg-surface text-muted hover:border-primary/50 hover:text-ink"
                )}
              >
                {item.id === "all" ? item.label : shortLabel(item.label)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ShowcaseCard({
  id,
  section,
  title,
  description,
  children,
  placeholder,
  delay,
}: {
  id: string;
  section: Exclude<ComponentSection, "all">;
  title: string;
  description: string;
  children?: React.ReactNode;
  placeholder?: string;
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

        <div className="mt-6 flex min-h-40 flex-1 items-center justify-center rounded-xl border border-line/60 bg-surface-raised/40 p-4">
          {children ?? (
            <span className="text-xs font-medium text-muted">
              {placeholder ?? "Em breve..."}
            </span>
          )}
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
    <div className="flex items-center justify-center gap-3 border-b border-line/40 pb-4 text-center">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
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
          {/* Sidebar lateral no Desktop (iniciando no topo da página à esquerda) */}
          <FilterSidebar
            activeCategory={activeCategory}
            activeSection={activeSection}
            onSelect={handleSelect}
          />

          {/* Área / Coluna Principal centralizada */}
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

              {/* Mobile: chips em linha logo após o cabeçalho */}
              <Reveal delay={0.1} className="lg:hidden w-full">
                <MobileFilterChips
                  activeCategory={activeCategory}
                  activeSection={activeSection}
                  onSelect={handleSelect}
                />
              </Reveal>

              {/* Conteúdo Renderizado por Sessão */}
              <div className="space-y-14 lg:space-y-16">
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
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
