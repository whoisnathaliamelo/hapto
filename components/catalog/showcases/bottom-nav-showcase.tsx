"use client";

import { useState } from "react";
import {
  Bell,
  Bookmark,
  Check,
  Compass,
  Home,
  Info,
  Plus,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BottomNavVariant = "standard" | "with-fab" | "floating";

const VARIATIONS_INFO: Record<
  BottomNavVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  standard: {
    label: "Padrão (4 Destinos)",
    tag: "Zona do Polegar",
    ergonomicNote: "Posicionada na 'Natural Thumb Zone' inferior. Distribui 4 alvos simétricos de 48dp de largura por 56dp de altura, evitando toques falsos.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "with-fab": {
    label: "Ação Central (FAB)",
    tag: "Ação Primária Fácil",
    ergonomicNote: "Gatilho central em relevo para a ação principal do app (ex: Criar/Novo), centralizado no arco de rotação confortável do polegar.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  floating: {
    label: "Barra Flutuante (Pill)",
    tag: "Respiro de Borda",
    ergonomicNote: "Barra suspensa com cantos curvos e recuo das bordas físicas da tela, prevenindo acionamento acidental dos gestos de navegação do sistema operacional.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const BOTTOM_NAV_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Ergonomia: Alvos táteis >= 48x48dp, feedback ativo imediato e posicionamento na Thumb Zone

import { useState } from "react";
import { Home, Compass, Bookmark, User, Plus } from "lucide-react";

export function BottomNavErgonomica() {
  const [abaAtiva, setAbaAtiva] = useState("inicio");

  const destinos = [
    { id: "inicio", label: "Início", icone: Home },
    { id: "explorar", label: "Explorar", icone: Compass },
    { id: "salvos", label: "Salvos", icone: Bookmark, badge: 3 },
    { id: "perfil", label: "Perfil", icone: User },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-line bg-surface/95 px-2 pb-safe backdrop-blur-md"
    >
      {destinos.map((item) => {
        const ativo = abaAtiva === item.id;
        const Icone = item.icone;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setAbaAtiva(item.id)}
            aria-current={ativo ? "page" : undefined}
            className="group relative flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-xs transition-transform active:scale-95"
          >
            {/* Ícone com indicador de badge e cor dinâmica */}
            <div className="relative">
              <Icone
                className={\`size-5 transition-colors \${
                  ativo ? "text-primary" : "text-muted group-hover:text-ink"
                }\`}
              />
              {item.badge && (
                <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-on-primary">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Rótulo de texto ergonômico */}
            <span
              className={\`text-[11px] font-medium transition-colors \${
                ativo ? "font-semibold text-primary" : "text-muted"
              }\`}
            >
              {item.label}
            </span>

            {/* Indicador sutil de página ativa */}
            {ativo && (
              <span className="absolute -top-[1px] h-0.5 w-6 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
}`;

type NavItem = {
  id: string;
  label: string;
  icon: typeof Home;
  badge?: number;
};

const STANDARD_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "explore", label: "Explorar", icon: Compass },
  { id: "saved", label: "Salvos", icon: Bookmark, badge: 3 },
  { id: "profile", label: "Perfil", icon: User },
];

export function BottomNavShowcase() {
  const [variant, setVariant] = useState<BottomNavVariant>("standard");
  const [activeTab, setActiveTab] = useState("home");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  const triggerNav = (label: string, id: string) => {
    setActiveTab(id);
    setLastAction(`Navegou para: ${label}`);
  };

  const triggerFab = () => {
    setLastAction("Ação Central (FAB) acionada!");
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Organismo
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["standard", "with-fab", "floating"] as BottomNavVariant[]).map((v) => {
            const isSelected = variant === v;
            const item = VARIATIONS_INFO[v];
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setVariant(v);
                  setLastAction(`Variação selecionada: ${item.label}`);
                }}
                aria-pressed={isSelected}
                className={cn(
                  "flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary",
                  isSelected
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-muted hover:bg-surface-raised hover:text-ink"
                )}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Área Central Interativa: Simulação de Moldura Mobile */}
      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
        {/* Mock de Conteúdo da Tela Mobile */}
        <div className="flex flex-1 flex-col items-center justify-center p-3 text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {activeTab === "home" && "Tela: Início"}
              {activeTab === "explore" && "Tela: Explorar"}
              {activeTab === "saved" && "Tela: Salvos (3 itens)"}
              {activeTab === "profile" && "Tela: Perfil"}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted">
            Toque nos destinos abaixo para testar o feedback tátil
          </p>
        </div>

        {/* --- Variação 1: Standard (4 Destinos) --- */}
        {variant === "standard" && (
          <nav
            role="navigation"
            aria-label="Navegação inferior padrão"
            className="flex h-14 w-full items-center justify-around border-t border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm"
          >
            {STANDARD_NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => triggerNav(item.label, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-[44px] min-w-[48px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90",
                    isActive ? "text-primary font-semibold" : "text-muted hover:text-ink"
                  )}
                >
                  <div className="relative">
                    <Icon className={cn("size-4.5 transition-transform", isActive && "scale-110")} />
                    {item.badge && (
                      <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-on-primary">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight">{item.label}</span>
                  {isActive && (
                    <span className="absolute -top-[1px] h-0.5 w-6 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* --- Variação 2: With FAB (Ação Central em Relevo) --- */}
        {variant === "with-fab" && (
          <nav
            role="navigation"
            aria-label="Navegação inferior com FAB"
            className="relative flex h-14 w-full items-center justify-around border-t border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm"
          >
            {/* Lado Esquerdo: Início e Explorar */}
            <button
              type="button"
              onClick={() => triggerNav("Início", "home")}
              aria-current={activeTab === "home" ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90",
                activeTab === "home" ? "text-primary font-semibold" : "text-muted hover:text-ink"
              )}
            >
              <Home className="size-4.5" />
              <span className="text-[10px]">Início</span>
            </button>

            <button
              type="button"
              onClick={() => triggerNav("Explorar", "explore")}
              aria-current={activeTab === "explore" ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90",
                activeTab === "explore" ? "text-primary font-semibold" : "text-muted hover:text-ink"
              )}
            >
              <Compass className="size-4.5" />
              <span className="text-[10px]">Explorar</span>
            </button>

            {/* Botão Central FAB (Hitbox 48dp elevado na Thumb Zone) */}
            <div className="relative -mt-6 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={triggerFab}
                aria-label="Adicionar novo item"
                className="flex size-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-all hover:scale-105 active:scale-90 focus-visible:outline-2 focus-visible:outline-primary"
                title="Ação Primária Central"
              >
                <Plus className="size-5 stroke-[2.5]" />
              </button>
              <span className="mt-0.5 text-[9px] font-bold text-primary">Criar</span>
            </div>

            {/* Lado Direito: Salvos e Perfil */}
            <button
              type="button"
              onClick={() => triggerNav("Salvos", "saved")}
              aria-current={activeTab === "saved" ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90",
                activeTab === "saved" ? "text-primary font-semibold" : "text-muted hover:text-ink"
              )}
            >
              <div className="relative">
                <Bookmark className="size-4.5" />
                <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-on-primary">
                  3
                </span>
              </div>
              <span className="text-[10px]">Salvos</span>
            </button>

            <button
              type="button"
              onClick={() => triggerNav("Perfil", "profile")}
              aria-current={activeTab === "profile" ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90",
                activeTab === "profile" ? "text-primary font-semibold" : "text-muted hover:text-ink"
              )}
            >
              <User className="size-4.5" />
              <span className="text-[10px]">Perfil</span>
            </button>
          </nav>
        )}

        {/* --- Variação 3: Floating / Pill (Barra Flutuante) --- */}
        {variant === "floating" && (
          <div className="flex w-full items-center justify-center pb-2.5 px-3">
            <nav
              role="navigation"
              aria-label="Navegação inferior flutuante"
              className="flex h-12 w-full max-w-[280px] items-center justify-around rounded-full border border-line bg-surface/90 px-2 shadow-md backdrop-blur-md"
            >
              {STANDARD_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => triggerNav(item.label, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full transition-all active:scale-85",
                      isActive
                        ? "bg-primary text-on-primary shadow-xs"
                        : "text-muted hover:bg-surface-raised hover:text-ink"
                    )}
                    title={item.label}
                  >
                    <Icon className="size-4" />
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* 3. Diagnóstico Ergonômico (altura fixa 86px calibrada) */}
      <div className="h-[86px] w-full shrink-0 overflow-hidden rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
          <span className="flex min-w-0 items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">Ergonomia ({currentInfo.label})</span>
          </span>
          <span
            className={cn(
              "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              currentInfo.badgeColor
            )}
          >
            {currentInfo.tag}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      {/* 4. Feedback e Status (altura fixa 26px calibrada) */}
      <div className="flex h-[26px] w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="truncate font-mono text-[10px]">
          Alvo: 48x48dp • Zona: Thumb Zone Inferior
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque em qualquer destino para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
