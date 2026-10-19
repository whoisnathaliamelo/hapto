"use client";

import { useEffect, useRef, useState } from "react";
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
    ergonomicNote: "O card inteiro é um alvo tátil contínuo: o polegar nunca precisa mirar em um pequeno link de texto.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "with-action": {
    label: "Ação Isolada",
    tag: "Gatilho Seguro",
    ergonomicNote: "Favoritar tem hitbox própria e stopPropagation, evitando abrir o card por acidente.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  metric: {
    label: "Métrica / Status",
    tag: "Escaneabilidade",
    ergonomicNote: "Número em destaque para leitura rápida em telas pequenas, com zona de avanço tátil clara.",
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const triggerAction = (label: string) => {
    setLastAction(label);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLastAction(null), 1800);
  };

  // Todos os cards de exemplo ocupam exatamente o mesmo espaço (altura fixa do slot)
  const previewCardBase =
    "group flex h-full w-full cursor-pointer rounded-2xl border border-line bg-surface p-4 shadow-2xs transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/50 hover:shadow-md active:scale-[0.98]";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex h-[46px] max-w-full shrink-0 items-center gap-1 rounded-xl border border-line bg-surface p-1 shadow-xs">
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
                "flex h-9 items-center whitespace-nowrap rounded-lg px-2.5 text-xs font-semibold transition-colors duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary",
                isSelected
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-muted hover:bg-surface-raised hover:text-ink"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 2. Slot do Card com Altura Fixa (não varia entre variações) */}
      <div className="h-[160px] w-full max-w-sm shrink-0">
        {variant === "interactive" && (
          <article
            onClick={() => triggerAction("Card aberto (Superfície Total)")}
            className={cn(previewCardBase, "flex-col justify-between")}
          >
            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                <Smartphone className="size-3 text-primary" />
                <span>Mobile First</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <Clock className="size-3" />
                <span>3 min de leitura</span>
              </span>
            </div>

            <div>
              <h4 className="truncate text-sm font-bold text-ink transition-colors group-hover:text-primary">
                Regra dos 48dp no Polegar
              </h4>
              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                Alvos de toque calibrados para prevenir falhas e fadiga muscular em smartphones.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-line/40 pt-2 text-xs font-semibold text-primary">
              <span>Acessar conteúdo</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        )}

        {variant === "with-action" && (
          <article
            onClick={() => triggerAction("Card principal acionado")}
            className={cn(previewCardBase, "flex-col justify-between")}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
                  <Sparkles className="size-4.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold text-ink transition-colors group-hover:text-primary">
                    Biblioteca de Gestos
                  </h4>
                  <span className="block truncate text-[10px] text-muted">24 componentes táteis</span>
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
                  "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-90",
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

            <p className="line-clamp-2 text-xs leading-relaxed text-muted">
              Toque no ícone à direita para isolar a ação sem abrir o card principal.
            </p>

            <div className="flex items-center justify-between border-t border-line/40 pt-2 text-xs font-semibold text-primary">
              <span>Abrir biblioteca</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        )}

        {variant === "metric" && (
          <article
            onClick={() => triggerAction("Relatório de ergonomia aberto")}
            className={cn(previewCardBase, "items-center justify-between")}
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="size-5.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-muted">Acessibilidade Tátil</span>
                <span className="text-2xl font-extrabold tracking-tight text-ink">98.4%</span>
                <span className="truncate text-[10px] font-medium text-emerald-600">
                  +12.8% vs. alvos de 32px
                </span>
              </div>
            </div>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-muted transition-colors group-hover:border-primary group-hover:text-primary">
              <ArrowRight className="size-4" />
            </div>
          </article>
        )}
      </div>

      {/* 3. Diagnóstico Ergonômico (altura fixa, texto limitado a 2 linhas) */}
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

      {/* 4. Feedback e Status (uma única linha, nunca quebra) */}
      <div className="flex h-[26px] w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="truncate font-mono text-[10px]">
          Alvo: Superfície Total • Respiro: 16px
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque no card para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
