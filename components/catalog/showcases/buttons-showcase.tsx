"use client";

import { useState } from "react";
import { Plus, Sparkles, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "md" | "lg";

const SIZES_INFO: Record<
  ButtonSize,
  { label: string; height: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  sm: {
    label: "P",
    height: "40px",
    tag: "Secundário / Inline",
    ergonomicNote: "Exige respiro lateral. Abaixo dos 48dp, use apenas para ações de apoio.",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  },
  md: {
    label: "M",
    height: "44px",
    tag: "Padrão Apple (iOS HIG)",
    ergonomicNote: "Alvo mínimo de 44pt da Apple. Excelente densidade para listas e cards.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  lg: {
    label: "G",
    height: "48px",
    tag: "Padrão Ouro (Regra dos 48dp)",
    ergonomicNote: "Ideal para o polegar e conformidade total com a Regra dos 48dp e WCAG AAA.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
};

export const BUTTONS_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: Instale 'lucide-react' para os ícones ou use seus próprios SVGs

import { Plus, Sparkles } from "lucide-react";

export function BotoesErgonomicos() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Botão Primário — 48px de altura (Regra dos 48dp para o polegar) */}
      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-semibold text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Sparkles className="size-4" />
        <span>Principal</span>
      </button>

      {/* 2. Botão Secundário — 44px de altura (Padrão Apple HIG) */}
      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-raised px-5 text-sm font-medium text-ink transition-all duration-200 hover:border-primary/50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>Secundário</span>
      </button>

      {/* 3. FAB Flutuante — 56px de diâmetro (Alcance imediato do polegar) */}
      <button
        type="button"
        aria-label="Ação rápida flutuante"
        className="flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-md shadow-primary/25 transition-all duration-200 hover:scale-105 hover:bg-primary-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Plus className="size-6 stroke-[2.5]" />
      </button>
    </div>
  );
}`;

export function ButtonsShowcase() {
  const [size, setSize] = useState<ButtonSize>("lg");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setFeedback(`Toque: ${name}`);
    const timer = setTimeout(() => setFeedback(null), 1800);
    return () => clearTimeout(timer);
  };

  const currentSizeInfo = SIZES_INFO[size];

  return (
    <div className="flex w-full flex-col items-center gap-5 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Calibrar Tamanho do Alvo Tátil
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["sm", "md", "lg"] as ButtonSize[]).map((s) => {
            const isSelected = size === s;
            const item = SIZES_INFO[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={isSelected}
                className={cn(
                  "flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary",
                  isSelected
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-muted hover:bg-surface-raised hover:text-ink"
                )}
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-80">({item.height})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-3 py-2">
        <Button
          variant="primary"
          size={size}
          onClick={() => handleClick(`Principal (${currentSizeInfo.height})`)}
          className="shadow-sm hover:shadow-primary/20 hover:shadow-lg"
        >
          <Sparkles className="size-4" />
          <span>Principal</span>
        </Button>

        <Button
          variant="secondary"
          size={size}
          onClick={() => handleClick(`Secundário (${currentSizeInfo.height})`)}
        >
          <span>Secundário</span>
        </Button>

        <button
          type="button"
          onClick={() => handleClick("FAB Flutuante (56px)")}
          aria-label="Ação rápida flutuante"
          className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-md shadow-primary/25 transition-all duration-200 hover:scale-105 hover:bg-primary-hover hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Plus className="size-6 stroke-[2.5]" />
          <span className="sr-only">Adicionar</span>
        </button>
      </div>

      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Tamanho {currentSizeInfo.label} ({currentSizeInfo.height})</span>
          </span>
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              currentSizeInfo.badgeColor
            )}
          >
            {currentSizeInfo.tag}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          {currentSizeInfo.ergonomicNote}
        </p>
      </div>

      <div className="flex w-full items-center justify-between border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="font-mono text-[10px]">Alvo ativo: {currentSizeInfo.height}</span>
        <span className="font-medium text-ink">
          {feedback ? (
            <span className="inline-flex items-center gap-1 text-primary animate-in fade-in">
              <Check className="size-3" />
              {feedback}
            </span>
          ) : (
            <span className="text-muted/60">Experimente tocar nos botões</span>
          )}
        </span>
      </div>
    </div>
  );
}
