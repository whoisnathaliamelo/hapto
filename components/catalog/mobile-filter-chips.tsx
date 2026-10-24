import { cn } from "@/lib/utils";
import { SECTIONS, shortLabel } from "./constants";
import type { AtomicCategory, ComponentSection } from "./types";

interface MobileFilterChipsProps {
  activeCategory: AtomicCategory;
  activeSection: ComponentSection;
  visibleSections?: Set<ComponentSection>;
  onSelect: (category: AtomicCategory, section: ComponentSection) => void;
}

export function MobileFilterChips({
  activeCategory,
  activeSection,
  visibleSections,
  onSelect,
}: MobileFilterChipsProps) {
  const isAllActive = activeCategory === "all" && activeSection === "all";

  const displayedSections = visibleSections
    ? SECTIONS.filter((s) => visibleSections.has(s.id))
    : SECTIONS;

  return (
    <nav aria-label="Filtro de componentes (mobile)" className="-mx-6 overflow-x-auto px-6">
      <ul className="flex gap-2 pb-2">
        {[{ id: "all" as const, label: "Todos", category: "all" as const }, ...displayedSections].map((item) => {
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
                    ? "border-primary bg-primary-light text-primary font-semibold"
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
