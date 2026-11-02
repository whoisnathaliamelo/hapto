import { FilterChip } from "@/components/ui";
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
              <FilterChip
                selected={isActive}
                size="lg"
                onClick={() => onSelect(item.category, item.id)}
              >
                {item.id === "all" ? item.label : shortLabel(item.label)}
              </FilterChip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
