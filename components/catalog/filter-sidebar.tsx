import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { GROUPS, SECTION_ICONS, SECTIONS, shortLabel } from "./constants";
import type { AtomicCategory, ComponentSection } from "./types";

interface FilterSidebarProps {
  activeCategory: AtomicCategory;
  activeSection: ComponentSection;
  visibleSections?: Set<ComponentSection>;
  onSelect: (category: AtomicCategory, section: ComponentSection) => void;
}

export function FilterSidebar({
  activeCategory,
  activeSection,
  visibleSections,
  onSelect,
}: FilterSidebarProps) {
  const isAllActive = activeCategory === "all" && activeSection === "all";
  const totalDisplayCount = visibleSections ? visibleSections.size : SECTIONS.length;

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start w-64 xl:w-72 shrink-0">
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
            {totalDisplayCount}
          </span>
        </button>

        {GROUPS.map((group) => {
          const items = SECTIONS.filter((item) => item.category === group.id);
          const matchingItems = items.filter(
            (item) => !visibleSections || visibleSections.has(item.id)
          );
          const isGroupActive = activeCategory === group.id && activeSection === "all";

          if (visibleSections && matchingItems.length === 0) {
            return null;
          }

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
                  {matchingItems.length}
                </span>
              </button>

              <ul className="mt-2 ml-3 border-l border-line">
                {items.map((item) => {
                  const isVisible = !visibleSections || visibleSections.has(item.id);
                  if (visibleSections && !isVisible) return null;

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
