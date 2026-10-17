export type AtomicCategory = "all" | "atoms" | "molecules" | "organisms";

export type ComponentSection =
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

export interface SectionMeta {
  id: ComponentSection;
  label: string;
  category: "atoms" | "molecules" | "organisms";
}
