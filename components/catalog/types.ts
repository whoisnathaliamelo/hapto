export type AtomicCategory = "all" | "tokens" | "atoms" | "molecules" | "organisms";

export type ComponentSection =
  | "all"
  | "colors"
  | "typography"
  | "spacing"
  | "buttons"
  | "inputs"
  | "switches"
  | "icons"
  | "search"
  | "cards"
  | "bottom-nav"
  | "top-bar"
  | "feedback";

export interface SectionMeta {
  id: ComponentSection;
  label: string;
  category: "tokens" | "atoms" | "molecules" | "organisms";
  description?: string;
  keywords?: string[];
}

export interface CatalogGroupProps {
  activeSection: ComponentSection;
  visibleSections?: Set<ComponentSection>;
}
