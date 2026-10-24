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
  {
    id: "colors",
    label: "Cores & Contraste WCAG",
    category: "tokens",
    description: "Padrões de contraste mínimo 4.5:1 e 3:1 para acessibilidade sob luz solar.",
    keywords: ["wcag", "contraste", "acessibilidade", "cores", "paleta", "dark mode", "luz solar", "aaa", "aa"],
  },
  {
    id: "typography",
    label: "Tipografia & Escala",
    category: "tokens",
    description: "Hierarquia mobile e tamanho mínimo de 16px para prevenção de zoom no iOS.",
    keywords: ["tipografia", "fonte", "texto", "tamanho", "escala", "zoom", "ios", "safari", "16px", "inter", "heading"],
  },
  {
    id: "spacing",
    label: "Espaçamentos & Targets",
    category: "tokens",
    description: "Distâncias de segurança entre alvos adjacentes (8dp+) para evitar toques incorretos acidentais.",
    keywords: ["espaçamento", "spacing", "gap", "padding", "margem", "gutter", "targets", "8dp", "alvos", "toque", "respiro", "grid"],
  },

  {
    id: "buttons",
    label: "Botões (Normal, Secundário, FAB)",
    category: "atoms",
    description: "Alvos táteis calibrados entre 40px e 56px para polegar.",
    keywords: ["botões", "botão", "button", "fab", "primário", "secundário", "touch target", "48dp", "56dp", "clique", "ação"],
  },
  {
    id: "inputs",
    label: "Inputs de Texto",
    category: "atoms",
    description: "Campos com altura de 48dp e tipografia mínima que evita zoom involuntário.",
    keywords: ["inputs", "input", "texto", "formulário", "campo", "placeholder", "foco", "validação", "teclado"],
  },
  {
    id: "switches",
    label: "Switches e Checkboxes",
    category: "atoms",
    description: "Controles binários com estados visuais claros e feedback tátil.",
    keywords: ["switches", "switch", "toggle", "checkbox", "alternância", "seleção", "booleano", "on off"],
  },
  {
    id: "icons",
    label: "Ícones Ergonômicos",
    category: "atoms",
    description: "Metáforas visuais com grid de toque acessível.",
    keywords: ["ícones", "icones", "icons", "svg", "lucide", "tamanho", "área de toque", "24px", "48px"],
  },

  {
    id: "search",
    label: "Barra de Busca",
    category: "molecules",
    description: "Campo com botão de limpar e atalho tátil de fácil alcance.",
    keywords: ["search", "busca", "pesquisa", "barra de busca", "filtro", "procurar", "find", "atalho"],
  },
  {
    id: "cards",
    label: "Cards Informativos",
    category: "molecules",
    description: "Superfícies táteis com hierarquia e feedback em toda a área.",
    keywords: ["cards", "card", "superfície", "container", "card informativo", "elevação", "toque"],
  },

  {
    id: "bottom-nav",
    label: "Bottom Navigation",
    category: "organisms",
    description: "Barra inferior ergonômica com zona de alcance natural do polegar.",
    keywords: ["bottom nav", "bottom navigation", "navegação", "barra inferior", "menu", "rodapé", "polegar", "tabs"],
  },
  {
    id: "top-bar",
    label: "Top App Bar",
    category: "organisms",
    description: "Cabeçalho mobile com navegação e ações secundárias.",
    keywords: ["top bar", "top app bar", "cabeçalho", "header", "app bar", "voltar", "título"],
  },
  {
    id: "feedback",
    label: "Alertas e Snackbars",
    category: "organisms",
    description: "Notificações efêmeras e contextuais posicionadas próximas ao polegar.",
    keywords: ["feedback", "alertas", "alerta", "snackbars", "snackbar", "toast", "notificação", "banner", "sucesso", "erro"],
  },
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

export function normalizeSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
