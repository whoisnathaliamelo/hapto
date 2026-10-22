"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckSquare,
  Info,
  MoreVertical,
  Search,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TopBarVariant = "standard" | "large-title" | "contextual";

const VARIATIONS_INFO: Record<
  TopBarVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  standard: {
    label: "Padrão (Voltar + Ações)",
    tag: "Hitbox 48dp",
    ergonomicNote: "Botão de voltar com área de toque mínima de 48dp na zona superior, com respiro de 12px entre ícones à direita para evitar toques simultâneos involuntários.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "large-title": {
    label: "Título Expandido",
    tag: "Escaneabilidade",
    ergonomicNote: "Tipografia em destaque traz o ponto focal visual para mais perto do centro da tela, facilitando a leitura inicial sem esticar o polegar.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  contextual: {
    label: "Barra Contextual",
    tag: "Ações em Lote",
    ergonomicNote: "Modo seleção rápida substitui a navegação com botão 'Cancelar' explícito e isola ações destrutivas na borda oposta com feedback imediato.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const TOP_BAR_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Ergonomia: Hitboxes >= 48dp, espaçamento seguro entre ações e suporte a Safe Area no topo

import { useState } from "react";
import { ArrowLeft, Share2, MoreVertical } from "lucide-react";

export function TopAppBarErgonomica() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-line bg-surface/95 px-2 pt-safe backdrop-blur-md"
    >
      {/* 1. Botão de Navegação Primário com Hitbox Generosa (48x48dp) */}
      <button
        type="button"
        aria-label="Voltar à tela anterior"
        onClick={() => history.back()}
        className="flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-raised active:scale-90"
      >
        <ArrowLeft className="size-5" />
      </button>

      {/* 2. Título Central com Truncamento Seguro */}
      <h1 className="max-w-[200px] truncate text-center text-sm font-bold text-ink">
        Detalhes do Componente
      </h1>

      {/* 3. Ações Secundárias com Espaçamento Ergonômico de 8px */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Compartilhar"
          className="flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90"
        >
          <Share2 className="size-4.5" />
        </button>

        <button
          type="button"
          aria-label="Mais opções"
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90"
        >
          <MoreVertical className="size-4.5" />
        </button>
      </div>
    </header>
  );
}`;

export function TopBarShowcase() {
  const [variant, setVariant] = useState<TopBarVariant>("standard");
  const [selectedCount, setSelectedCount] = useState(3);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  const triggerAction = (msg: string) => {
    setLastAction(msg);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Organismo
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["standard", "large-title", "contextual"] as TopBarVariant[]).map((v) => {
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

      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-start overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
        {variant === "standard" && (
          <header className="flex h-13 w-full shrink-0 items-center justify-between border-b border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => triggerAction("Ação: Voltar acionado")}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink transition-all hover:bg-surface active:scale-90"
            >
              <ArrowLeft className="size-4.5" />
            </button>

            <span className="truncate px-2 text-xs font-bold text-ink">
              Design Systems
            </span>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Compartilhar"
                onClick={() => triggerAction("Ação: Compartilhar aberto")}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted transition-all hover:bg-surface hover:text-ink active:scale-90"
              >
                <Share2 className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Mais opções"
                onClick={() => triggerAction("Ação: Menu de opções aberto")}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted transition-all hover:bg-surface hover:text-ink active:scale-90"
              >
                <MoreVertical className="size-4" />
              </button>
            </div>
          </header>
        )}

        {variant === "large-title" && (
          <div className="flex w-full shrink-0 flex-col border-b border-line/70 bg-surface-raised/80 backdrop-blur-sm">
            <header className="flex h-11 w-full items-center justify-between px-1">
              <button
                type="button"
                aria-label="Voltar"
                onClick={() => triggerAction("Ação: Voltar acionado")}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl text-ink transition-all hover:bg-surface active:scale-90"
              >
                <ArrowLeft className="size-4.5" />
              </button>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  aria-label="Buscar"
                  onClick={() => triggerAction("Ação: Busca aberta")}
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted transition-all hover:bg-surface hover:text-ink active:scale-90"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </header>
            <div className="px-3.5 pb-2">
              <h2 className="text-base font-extrabold tracking-tight text-ink">
                Componentes
              </h2>
            </div>
          </div>
        )}

        {variant === "contextual" && (
          <header className="flex h-13 w-full shrink-0 items-center justify-between border-b border-line/70 bg-primary/10 px-1 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Fechar seleção"
                onClick={() => triggerAction("Seleção cancelada")}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-primary transition-all hover:bg-surface active:scale-90"
              >
                <X className="size-4.5" />
              </button>
              <span className="text-xs font-bold text-primary">
                {selectedCount} selecionados
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Selecionar todos"
                onClick={() => {
                  setSelectedCount(5);
                  triggerAction("Todos (5) selecionados");
                }}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-primary transition-all hover:bg-surface active:scale-90"
                title="Selecionar todos"
              >
                <CheckSquare className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Excluir selecionados"
                onClick={() => {
                  setSelectedCount(0);
                  triggerAction("Itens excluídos com segurança");
                }}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-red-500 transition-all hover:bg-red-500/10 active:scale-90"
                title="Excluir"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </header>
        )}

        <div className="flex flex-1 flex-col items-center justify-center p-3 text-center">
          <p className="text-[11px] font-medium text-ink">
            {variant === "standard" && "Corpo da Tela: rolagem sob o cabeçalho"}
            {variant === "large-title" && "Área de leitura primária acessível"}
            {variant === "contextual" && "Modo de ação contextual ativado"}
          </p>
          <span className="text-[10px] text-muted">
            Toque nos ícones da Top Bar para testar hitboxes
          </span>
        </div>
      </div>

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

      <div className="flex h-[26px] w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="truncate font-mono text-[10px]">
          Alvo: 44-48dp • Espaço entre Ações: 8dp
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque em uma ação para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
