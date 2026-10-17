"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  Info,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CardVariant = "interactive" | "with-action" | "metric";

const VARIATIONS_INFO: Record<
  CardVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  interactive: {
    label: "Superfície Total",
    tag: "Toque em Toda a Área",
    ergonomicNote: "O card inteiro funciona como um alvo tátil contínuo. O polegar nunca precisa mirar em um pequeno link de texto.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "with-action": {
    label: "Ação Isolada",
    tag: "Gatilho Seguro",
    ergonomicNote: "Ação secundária (favoritar) com hitbox própria de 44dp e isolamento de evento (stopPropagation), evitando cliques acidentais no card principal.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  metric: {
    label: "Métrica / Status",
    tag: "Escaneabilidade",
    ergonomicNote: "Hierarquia visual calibrada para leitura rápida em telas pequenas, com indicador numérico em destaque e zona de avanço tátil clara.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const CARDS_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: O card inteiro atua como botão/link tátil com 'active:scale-[0.98]' para feedback tátil instantâneo

import { useState } from "react";
import { ChevronRight, Bookmark, Sparkles } from "lucide-react";

export function CardInformativoErgonomico() {
  const [salvo, setSalvo] = useState(false);

  return (
    <div className="w-full max-w-sm">
      {/* 1. Card Inteiro como Alvo Tátil Generoso */}
      <article
        onClick={() => alert("Card principal acionado!")}
        className="group relative cursor-pointer rounded-2xl border border-line bg-surface p-4 shadow-2xs transition-all duration-200 hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
      >
        <div className="flex items-start justify-between gap-3">
          {/* Ícone de Destaque */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Sparkles className="size-5" />
          </div>

          {/* Ação Secundária com Hitbox Isolada (44x44dp) */}
          <button
            type="button"
            aria-label="Salvar nos favoritos"
            onClick={(e) => {
              e.stopPropagation(); // Previne o clique indesejado no card
              setSalvo(!salvo);
            }}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-raised hover:text-primary active:scale-90"
          >
            <Bookmark
              className={\`size-5 transition-transform \${
                salvo ? "fill-primary text-primary scale-110" : ""
              }\`}
            />
          </button>
        </div>

        {/* Conteúdo com Hierarquia Calibrada */}
        <h3 className="mt-3 text-base font-bold text-ink transition-colors group-hover:text-primary">
          Design System Háptico
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Padrões ergonômicos de toque e feedback tátil para aplicações mobile-first.
        </p>

        {/* Rodapé com Indicador de Navegação */}
        <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-2.5 text-xs font-semibold text-primary">
          <span>Explorar módulo</span>
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </div>
  );
}`;

export function CardsShowcase() {
  const [variant, setVariant] = useState<CardVariant>("interactive");
  const [saved, setSaved] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  const triggerAction = (label: string) => {
    setLastAction(label);
    const timer = setTimeout(() => setLastAction(null), 1800);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Card Informativo
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["interactive", "with-action", "metric"] as CardVariant[]).map((v) => {
            const isSelected = variant === v;
            const item = VARIATIONS_INFO[v];
            return (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
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

      {/* 2. Área Central Interativa */}
      <div className="flex min-h-[148px] w-full max-w-sm items-center justify-center px-1">
        {variant === "interactive" && (
          <article
            onClick={() => triggerAction("Card aberto (Superfície Total)")}
            className="group flex w-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                <Smartphone className="size-3 text-primary" />
                <span>Mobile First</span>
              </span>
              <span className="text-[10px] text-muted flex items-center gap-1">
                <Clock className="size-3" />
                <span>3 min de leitura</span>
              </span>
            </div>

            <h4 className="mt-3 text-sm font-bold text-ink transition-colors group-hover:text-primary">
              Regra dos 48dp no Polegar
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Alvos de toque calibrados para prevenir falhas e fadiga muscular em smartphones.
            </p>

            <div className="mt-3 flex items-center justify-between border-t border-line/40 pt-2 text-xs font-semibold text-primary">
              <span>Acessar conteúdo</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        )}

        {variant === "with-action" && (
          <article
            onClick={() => triggerAction("Card principal acionado")}
            className="group flex w-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
                  <Sparkles className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink transition-colors group-hover:text-primary">
                    Biblioteca de Gestos
                  </h4>
                  <span className="text-[10px] text-muted">24 componentes táteis</span>
                </div>
              </div>

              {/* Botão Secundário com Hitbox Isolada de 44x44dp */}
              <button
                type="button"
                aria-label="Salvar card nos favoritos"
                onClick={(e) => {
                  e.stopPropagation(); // Impede o clique no card principal!
                  setSaved(!saved);
                  triggerAction(saved ? "Removido dos favoritos" : "Salvo nos favoritos!");
                }}
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-90",
                  saved
                    ? "border-primary/40 bg-primary/10 text-primary shadow-xs"
                    : "border-line bg-surface text-muted hover:border-primary/50 hover:text-ink"
                )}
                title={saved ? "Salvo" : "Salvar"}
              >
                <Bookmark
                  className={cn(
                    "size-4.5 transition-transform duration-200",
                    saved && "fill-primary scale-110"
                  )}
                />
              </button>
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-muted">
              Toque no ícone à direita para isolar a ação sem abrir o card principal.
            </p>
          </article>
        )}

        {variant === "metric" && (
          <article
            onClick={() => triggerAction("Relatório de ergonomia aberto")}
            className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-line bg-surface p-4 shadow-2xs transition-all duration-200 hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <TrendingUp className="size-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-muted">Acessibilidade Tátil</span>
                <span className="text-xl font-extrabold text-ink tracking-tight">98.4%</span>
                <span className="text-[10px] font-medium text-emerald-600">
                  +12.8% vs. alvos de 32px
                </span>
              </div>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl border border-line bg-surface-raised text-muted transition-colors group-hover:border-primary group-hover:text-primary">
              <ArrowRight className="size-4" />
            </div>
          </article>
        )}
      </div>

      {/* 3. Diagnóstico Ergonômico */}
      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Ergonomia ({currentInfo.label})</span>
          </span>
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              currentInfo.badgeColor
            )}
          >
            {currentInfo.tag}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      {/* 4. Feedback e Status */}
      <div className="flex w-full items-center justify-between border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="font-mono text-[10px]">
          Alvo: Superfície Total • Respiro: 16px
        </span>
        <span className="font-medium text-ink flex items-center gap-1">
          {lastAction ? (
            <>
              <Check className="size-3 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">{lastAction}</span>
            </>
          ) : (
            <span className="text-muted">Toque no card para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
