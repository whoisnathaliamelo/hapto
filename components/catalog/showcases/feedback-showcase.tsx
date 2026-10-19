"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  Info,
  RefreshCw,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeedbackVariant = "snackbar" | "banner" | "floating";

const VARIATIONS_INFO: Record<
  FeedbackVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  snackbar: {
    label: "Snackbar Inferior",
    tag: "Ação na Thumb Zone",
    ergonomicNote: "Posicionada na base da tela para permitir que o polegar acione 'Desfazer' ou 'Ver' instantaneamente sem reajustar a pegada do smartphone.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  banner: {
    label: "Alerta em Card",
    tag: "Contexto Visual",
    ergonomicNote: "Card de aviso estruturado com contraste tátil e botão de ação compacto, ideal para informações persistentes que demandam atenção.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  floating: {
    label: "Toast Flutuante (Pill)",
    tag: "Dispensar Rápido",
    ergonomicNote: "Pílula de notificação flutuante com feedback de sucesso/erro de leitura rápida, botão de fechar com hitbox generosa e auto-dispensa.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const FEEDBACK_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Ergonomia: Ancorado na base da tela (Thumb Zone) para alcance imediato do botão "Desfazer"

import { useState } from "react";
import { CheckCircle2, RotateCcw, X } from "lucide-react";

export function SnackbarErgonomica() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-line bg-surface-raised p-3 shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2"
    >
      {/* 1. Ícone + Mensagem Contextual */}
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
        <span className="text-xs font-medium text-ink">
          Item arquivado com sucesso
        </span>
      </div>

      {/* 2. Botão de Ação Imediata (Desfazer) na Zona de Alcance */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            alert("Ação desfeita!");
            setVisivel(false);
          }}
          className="flex min-h-[36px] items-center gap-1 rounded-xl px-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 active:scale-95"
        >
          <RotateCcw className="size-3.5" />
          <span>Desfazer</span>
        </button>

        <button
          type="button"
          aria-label="Dispensar notificação"
          onClick={() => setVisivel(false)}
          className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink active:scale-90"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}`;

export function FeedbackShowcase() {
  const [variant, setVariant] = useState<FeedbackVariant>("snackbar");
  const [activeNotification, setActiveNotification] = useState(true);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  // Auto restaura notificação ao trocar de variação
  useEffect(() => {
    setActiveNotification(true);
  }, [variant]);

  const triggerUndo = () => {
    setActiveNotification(false);
    setLastAction("Ação revertida (Desfazer)!");
  };

  const triggerDismiss = () => {
    setActiveNotification(false);
    setLastAction("Notificação dispensada.");
  };

  const triggerAction = (msg: string) => {
    setLastAction(msg);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Organismo
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["snackbar", "banner", "floating"] as FeedbackVariant[]).map((v) => {
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

      {/* 2. Área Central Interativa: Simulação de Tela Mobile (altura mantida em 142px) */}
      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xs">
        {/* Topo do Mock Mobile: Contexto da Tela */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tela Mobile Ativa</span>
            </div>
            <span className="text-[10px] text-muted">Zona de Feedback</span>
          </div>

          {/* Linhas sutis simulando conteúdo da interface sem poluição visual */}
          <div className="space-y-1 opacity-25">
            <div className="h-1.5 w-3/5 rounded-full bg-ink" />
            <div className="h-1.5 w-2/5 rounded-full bg-ink" />
          </div>
        </div>

        {/* Notificação Ativa (posicionada em fluxo natural sem sobreposição de texto) */}
        {activeNotification ? (
          <div>
            {/* --- Variação 1: Snackbar Inferior com Ação "Desfazer" --- */}
            {variant === "snackbar" && (
              <div
                role="status"
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-surface-raised/95 p-2 shadow-sm backdrop-blur-sm transition-all"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                  <span className="truncate text-[11px] font-medium text-ink">
                    Item salvo nos favoritos
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={triggerUndo}
                    className="flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-bold text-primary transition-colors hover:bg-primary/10 active:scale-90"
                  >
                    <RotateCcw className="size-3" />
                    <span>Desfazer</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Dispensar"
                    onClick={triggerDismiss}
                    className="flex size-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink active:scale-90"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* --- Variação 2: Banner de Aviso / Card Persistente --- */}
            {variant === "banner" && (
              <div
                role="alert"
                className="flex w-full flex-col gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <AlertTriangle className="size-3.5 shrink-0 text-amber-600" />
                    <span className="truncate text-[11px] font-bold text-ink">
                      Modo offline ativado
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Fechar alerta"
                    onClick={triggerDismiss}
                    className="flex size-5 shrink-0 items-center justify-center rounded text-muted transition-colors hover:text-ink active:scale-90"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted">
                    Sincronização em pausa
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerAction("Tentando reconexão...")}
                    className="rounded bg-amber-600/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 transition-colors hover:bg-amber-600/30 active:scale-90"
                  >
                    Reconectar
                  </button>
                </div>
              </div>
            )}

            {/* --- Variação 3: Floating Toast (Pill) --- */}
            {variant === "floating" && (
              <div className="flex w-full items-center justify-center">
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3 py-1.5 shadow-md backdrop-blur-sm transition-all"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="text-[11px] font-semibold text-ink">
                    Preferências salvas
                  </span>
                  <button
                    type="button"
                    aria-label="Dispensar toast"
                    onClick={triggerDismiss}
                    className="ml-1 flex size-5 items-center justify-center rounded-full text-muted hover:bg-surface-raised hover:text-ink active:scale-80"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Estado quando a notificação é fechada */
          <div className="flex w-full items-center justify-between rounded-xl border border-dashed border-line bg-surface-raised/40 px-3 py-2">
            <span className="text-[11px] text-muted">Notificação fechada</span>
            <button
              type="button"
              onClick={() => {
                setActiveNotification(true);
                setLastAction("Notificação reaberta!");
              }}
              className="flex min-h-7 items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 text-[11px] font-semibold text-primary transition-all hover:border-primary active:scale-95"
            >
              <RefreshCw className="size-3" />
              <span>Disparar novamente</span>
            </button>
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
          Posicionamento: Base • Alcance: Thumb Zone
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque nas ações para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
