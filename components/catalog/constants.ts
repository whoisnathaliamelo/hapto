import {
  Bell,
  IdCard,
  MousePointerClick,
  MoveVertical,
  Palette,
  PanelBottom,
  PanelTop,
  Search,
  Shapes,
  TextCursorInput,
  ToggleRight,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { AtomicCategory, ComponentSection, SectionMeta } from "./types";

export const SECTIONS: SectionMeta[] = [
  { id: "colors", label: "Cores & Contraste WCAG", category: "tokens" },
  { id: "typography", label: "Tipografia & Escala", category: "tokens" },
  { id: "spacing", label: "Espaçamentos & Targets", category: "tokens" },

  { id: "buttons", label: "Botões (Normal, Secundário, FAB)", category: "atoms" },
  { id: "inputs", label: "Inputs de Texto", category: "atoms" },
  { id: "switches", label: "Switches e Checkboxes", category: "atoms" },
  { id: "icons", label: "Ícones Ergonômicos", category: "atoms" },

  { id: "search", label: "Barra de Busca", category: "molecules" },
  { id: "cards", label: "Cards Informativos", category: "molecules" },

  { id: "bottom-nav", label: "Bottom Navigation", category: "organisms" },
  { id: "top-bar", label: "Top App Bar", category: "organisms" },
  { id: "feedback", label: "Alertas e Snackbars", category: "organisms" },
];

export const SECTION_ICONS: Record<Exclude<ComponentSection, "all">, LucideIcon> = {
  colors: Palette,
  typography: Type,
  spacing: MoveVertical,
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

export const CATEGORY_LABELS: Record<SectionMeta["category"], string> = {
  tokens: "Token",
  atoms: "Átomo",
  molecules: "Molécula",
  organisms: "Organismo",
};

export const GROUPS: { id: Exclude<AtomicCategory, "all">; label: string }[] = [
  { id: "tokens", label: "Tokens" },
  { id: "atoms", label: "Átomos" },
  { id: "molecules", label: "Moléculas" },
  { id: "organisms", label: "Organismos" },
];

export const shortLabel = (label: string) => label.replace(/\s*\(.*\)/, "");
