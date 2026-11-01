"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Info,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Feedback,
  FeedbackIcon,
  FeedbackTitle,
  FeedbackDescription,
  FeedbackActions,
  FeedbackAction,
  FeedbackClose,
} from "@/components/ui";

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

export const FEEDBACK_CODE = `// Exemplo com componente modular Feedback (Hapto Design System)
// Ergonomia: Ancorado na base da tela (Thumb Zone) para alcance imediato do botão "Desfazer"

import { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import {
  Feedback,
  FeedbackIcon,
  FeedbackTitle,
  FeedbackActions,
  FeedbackAction,
  FeedbackClose,
} from "@/components/ui";

export function SnackbarErgonomica() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) return null;

  return (
    <Feedback variant="snackbar" fixed>
      {/* 1. Ícone + Mensagem Contextual */}
      <div className="flex items-center gap-2">
        <FeedbackIcon icon={CheckCircle2} className="text-emerald-500" />
        <FeedbackTitle>Item arquivado com sucesso</FeedbackTitle>
      </div>

      {/* 2. Botão de Ação Imediata (Desfazer) na Zona de Alcance */}
      <FeedbackActions>
        <FeedbackAction
          icon={RotateCcw}
          onClick={() => {
            alert("Ação desfeita!");
            setVisivel(false);
          }}
        >
          Desfazer
        </FeedbackAction>
        <FeedbackClose onClick={() => setVisivel(false)} />
      </FeedbackActions>
    </Feedback>
  );
};`;

export function FeedbackShowcase() {
  const [variant, setVariant] = useState<FeedbackVariant>("snackbar");
  const [activeNotification, setActiveNotification] = useState(true);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];



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
                  setActiveNotification(true);
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

      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xs">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tela Mobile Ativa</span>
            </div>
            <span className="text-[10px] text-muted">Zona de Feedback</span>
          </div>

          <div className="space-y-1 opacity-25">
            <div className="h-1.5 w-3/5 rounded-full bg-ink" />
            <div className="h-1.5 w-2/5 rounded-full bg-ink" />
          </div>
        </div>

        {activeNotification ? (
          <div>
            {variant === "snackbar" && (
              <Feedback variant="snackbar">
                <div className="flex min-w-0 items-center gap-2">
                  <FeedbackIcon icon={CheckCircle2} className="text-emerald-500" />
                  <FeedbackTitle>Item salvo nos favoritos</FeedbackTitle>
                </div>

                <FeedbackActions>
                  <FeedbackAction icon={RotateCcw} onClick={triggerUndo}>
                    Desfazer
                  </FeedbackAction>
                  <FeedbackClose aria-label="Dispensar" onClick={triggerDismiss} />
                </FeedbackActions>
              </Feedback>
            )}

            {variant === "banner" && (
              <Feedback variant="banner" status="warning">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <FeedbackIcon icon={AlertTriangle} />
                    <FeedbackTitle>Modo offline ativado</FeedbackTitle>
                  </div>
                  <FeedbackClose aria-label="Fechar alerta" onClick={triggerDismiss} />
                </div>
                <div className="flex items-center justify-between">
                  <FeedbackDescription>Sincronização em pausa</FeedbackDescription>
                  <FeedbackAction onClick={() => triggerAction("Tentando reconexão...")}>
                    Reconectar
                  </FeedbackAction>
                </div>
              </Feedback>
            )}

            {variant === "floating" && (
              <div className="flex w-full items-center justify-center">
                <Feedback variant="floating">
                  <FeedbackIcon icon={Sparkles} />
                  <FeedbackTitle>Preferências salvas</FeedbackTitle>
                  <FeedbackClose aria-label="Dispensar toast" onClick={triggerDismiss} />
                </Feedback>
              </div>
            )}
          </div>
        ) : (
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
