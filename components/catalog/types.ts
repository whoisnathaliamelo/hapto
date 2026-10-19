export type AtomicCategory = "all" | "tokens" | "atoms" | "molecules" | "organisms";

export type ComponentSection =
  | "all"
  | "colors"
  | "typography"
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
}
