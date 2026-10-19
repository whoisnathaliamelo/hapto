"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Info,
  Smartphone,
  Type,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TypographyVariant = "ios-zoom-guard" | "scale-hierarchy" | "line-height-thumb";

const VARIATIONS_INFO: Record<
  TypographyVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  "ios-zoom-guard": {
    label: "Regra dos 16px (iOS)",
    tag: "Prevenção de Zoom",
    ergonomicNote: "No iOS Safari, campos de texto com fonte abaixo de 16px disparam o zoom automático da tela ao focar, quebrando a viewport e desorientando o usuário.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "scale-hierarchy": {
    label: "Escala Mobile",
    tag: "Escaneabilidade",
    ergonomicNote: "Escala tipográfica proporcional ao tamanho do display portátil. Evita fontes exageradas que quebram títulos em várias linhas na rolagem do polegar.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  "line-height-thumb": {
    label: "Respiro de Linha",
    tag: "Leitura em Rolagem",
    ergonomicNote: "Line-height calibrado em 1.5x a 1.6x para textos corridos impede que as linhas 'pulem' ou se misturem durante a rolagem rápida com o polegar.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const TYPOGRAPHY_CODE = `// Escala Tipográfica Ergonômica Mobile-First com Tailwind CSS
// Regra de Ouro: Campos de texto sempre com 'text-base' (16px) para evitar auto-zoom no iOS Safari

export const TIPOGRAFIA_HAPTO = {
  // Display Mobile: Títulos de topo (com leading compacto para não ocupar meia tela)
  display: "text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]",

  // Heading Mobile: Cabeçalhos de seção e cards
  heading: "text-lg font-bold tracking-tight text-ink",

  // Body Mobile: Padrão de leitura confortável
  body: "text-base font-normal leading-relaxed text-ink",

  // Input Mobile: MÍNIMO 16px para prevenir auto-zoom no Safari iOS
  input: "text-base text-ink placeholder:text-muted",

  // Caption / Microcopy: Metadados, badges e datas
  caption: "text-xs font-medium text-muted leading-normal",
};

// Exemplo de Input Imune ao Zoom no iOS Safari:
export function InputSemZoom() {
  return (
    <input
      type="text"
      placeholder="Mínimo 16px (text-base)"
      className="min-h-12 w-full rounded-xl border border-line bg-surface px-3.5 text-base text-ink focus:outline-primary"
    />
  );
}`;

export function TypographyShowcase() {
  const [variant, setVariant] = useState<TypographyVariant>("ios-zoom-guard");
  const [testedSize, setTestedSize] = useState<"16px" | "14px">("16px");
  const [selectedScale, setSelectedScale] = useState<"display" | "heading" | "body" | "caption">("body");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação Tipográfica
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["ios-zoom-guard", "scale-hierarchy", "line-height-thumb"] as TypographyVariant[]).map((v) => {
            const isSelected = variant === v;
            const item = VARIATIONS_INFO[v];
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setVariant(v);
                  setLastAction(`Variação: ${item.label}`);
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

      {/* 2. Área Central Interativa: Simulação Tipográfica */}
      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xs">
        {/* --- Variação 1: Prevenção de Auto-Zoom no iOS --- */}
        {variant === "ios-zoom-guard" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink">Teste de Foco em Input</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setTestedSize("16px");
                    setLastAction("16px selecionado: Zoom prevenido ✅");
                  }}
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all active:scale-95",
                    testedSize === "16px"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                      : "border-line bg-surface text-muted"
                  )}
                >
                  16px (Hapto)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTestedSize("14px");
                    setLastAction("14px selecionado: Safari dará zoom involuntário ⚠️");
                  }}
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all active:scale-95",
                    testedSize === "14px"
                      ? "border-amber-500 bg-amber-500/10 text-amber-600"
                      : "border-line bg-surface text-muted"
                  )}
                >
                  14px (Risco)
                </button>
              </div>
            </div>

            {/* Simulação de Input com feedback de zoom */}
            <div
              className={cn(
                "flex items-center justify-between rounded-xl border p-2.5 transition-all",
                testedSize === "16px"
                  ? "border-line bg-surface-raised"
                  : "border-amber-500/40 bg-amber-500/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Smartphone className="size-4 text-muted shrink-0" />
                <span
                  className={cn(
                    "font-medium text-ink transition-all",
                    testedSize === "16px" ? "text-base" : "text-sm scale-95"
                  )}
                >
                  {testedSize === "16px" ? "Fonte: 16px (1rem)" : "Fonte: 14px (0.875rem)"}
                </span>
              </div>

              {testedSize === "16px" ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  <span>Sem Zoom</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 animate-pulse">
                  <ZoomIn className="size-3.5" />
                  <span>Auto-Zoom!</span>
                </span>
              )}
            </div>

            <p className="truncate text-center text-[10px] text-muted">
              {testedSize === "16px"
                ? "Ideal: o Safari mantém a viewport intacta ao tocar."
                : "Abaixo de 16px o iOS Safari força o zoom na página."}
            </p>
          </div>
        )}

        {/* --- Variação 2: Escala Hierárquica --- */}
        {variant === "scale-hierarchy" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold uppercase text-muted">Nível:</span>
              <div className="flex gap-1">
                {(["display", "heading", "body", "caption"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setSelectedScale(lvl);
                      setLastAction(`Escala: ${lvl.toUpperCase()}`);
                    }}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase transition-all active:scale-95",
                      selectedScale === lvl
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-line bg-surface text-muted hover:text-ink"
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Amostra visual do nível tipográfico */}
            <div className="flex min-h-[50px] items-center justify-center rounded-xl border border-line bg-surface-raised p-2 text-center">
              {selectedScale === "display" && (
                <span className="text-xl font-extrabold tracking-tight text-ink">
                  Display Mobile (24-30px)
                </span>
              )}
              {selectedScale === "heading" && (
                <span className="text-base font-bold text-ink">
                  Heading de Seção (18px)
                </span>
              )}
              {selectedScale === "body" && (
                <span className="text-sm font-normal text-ink leading-relaxed">
                  Corpo de Leitura Calibrado (16px)
                </span>
              )}
              {selectedScale === "caption" && (
                <span className="text-xs font-semibold text-muted">
                  Caption & Metadados (12-13px)
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>Proporção equilibrada</span>
              <span>Evita quebra em mobile</span>
            </div>
          </div>
        )}

        {/* --- Variação 3: Leading / Respiro de Linha --- */}
        {variant === "line-height-thumb" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink">Respiro de Linha (1.5x)</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                Leading Confortável
              </span>
            </div>

            <div className="rounded-xl border border-line bg-surface-raised p-2 text-left">
              <p className="text-[11px] font-medium leading-relaxed text-ink line-clamp-3">
                Linhas com espaçamento vertical de 1.5x a 1.6x garantem que os olhos não percam o ponto focal durante a rolagem vertical rápida feita pelo polegar.
              </p>
            </div>

            <p className="truncate text-center text-[10px] text-muted">
              Espaçamento vertical previne confusão tátil e cansaço visual
            </p>
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
          Base: 16px (1rem) • Leading: 1.5x • Sem Zoom iOS
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Teste as variações tipográficas</span>
          )}
        </span>
      </div>
    </div>
  );
}
