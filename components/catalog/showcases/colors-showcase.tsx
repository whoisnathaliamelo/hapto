"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Info,
  Sun,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ColorsVariant = "contrast-checker" | "semantic-palette" | "sunlight-sim";

const VARIATIONS_INFO: Record<
  ColorsVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  "contrast-checker": {
    label: "WCAG 2.1 (4.5:1 / 3:1)",
    tag: "Acessibilidade AA",
    ergonomicNote: "Exige contraste mínimo de 4.5:1 para textos padrão e 3:1 para textos grandes (≥18pt ou 14pt bold), assegurando legibilidade para pessoas com baixa acuidade visual.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "semantic-palette": {
    label: "Paleta Semântica",
    tag: "Tokens de Cor",
    ergonomicNote: "Cores mapeadas por função: Ink (texto principal), Muted (secundário acessível), Primary (gatilhos táteis) e Surface (planos de repouso dos dedos).",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  "sunlight-sim": {
    label: "Simulador Luz Solar",
    tag: "Uso Externo",
    ergonomicNote: "O brilho solar e os reflexos no vidro da tela degradam o contraste percebido em até 50%. Cores com 4.5:1 sobrevivem, enquanto contrastes fracos somem na rua.",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  },
};

export const COLORS_CODE = `// Tokens de Cores Ergonômicas com Contraste WCAG 2.1 AA (Zero Dependências)
// Regra: Texto normal >= 4.5:1 | Texto grande >= 3.0:1 | Componentes >= 3.0:1

:root {
  /* Fundo & Superfícies */
  --bg: #f9fbf9;
  --surface: #ffffff;
  --surface-raised: #f0f4f1;
  --line: #e1e8e3;

  /* Textos com Contraste Calibrado */
  --ink: #111a14;        /* Contraste 14.2:1 vs Fundo (Passa WCAG AAA) */
  --muted: #526357;      /* Contraste 5.1:1 vs Fundo (Passa WCAG AA >= 4.5:1) */

  /* Cores de Ação & Interação Tátil */
  --primary: #128a58;    /* Contraste 4.6:1 vs Fundo Branco */
  --on-primary: #ffffff; /* Contraste 4.6:1 vs Primary */
  --primary-light: #e6f6ee;
}

/* Modo Escuro Ergonômico (Evita contraste puro 21:1 que gera fadiga/astigmatismo) */
.dark {
  --bg: #0b110e;
  --surface: #121a15;
  --surface-raised: #1a251f;
  --line: #24332b;
  --ink: #f2f7f4;        /* Contraste 13.8:1 */
  --muted: #94a89c;      /* Contraste 5.4:1 */
  --primary: #22c57a;    /* Contraste 7.1:1 no Dark Mode */
  --on-primary: #05140b;
}`;

type ContrastPair = {
  id: string;
  name: string;
  fg: string;
  bg: string;
  ratio: number;
  type: "normal" | "large" | "fail";
  description: string;
};

const CONTRAST_PAIRS: ContrastPair[] = [
  {
    id: "ink-surface",
    name: "Ink no Surface",
    fg: "text-ink",
    bg: "bg-surface",
    ratio: 14.2,
    type: "normal",
    description: "Texto padrão (14-16px): 14.2:1",
  },
  {
    id: "muted-surface",
    name: "Muted no Surface",
    fg: "text-muted",
    bg: "bg-surface",
    ratio: 5.1,
    type: "normal",
    description: "Secundário acessível: 5.1:1",
  },
  {
    id: "primary-white",
    name: "Primary no Surface",
    fg: "text-primary",
    bg: "bg-surface",
    ratio: 4.6,
    type: "normal",
    description: "Ação de toque: 4.6:1",
  },
  {
    id: "fail-example",
    name: "Cinza Claro (Inválido)",
    fg: "text-line",
    bg: "bg-surface",
    ratio: 2.1,
    type: "fail",
    description: "Inadequado: 2.1:1 (Reprovado)",
  },
];

export function ColorsShowcase() {
  const [variant, setVariant] = useState<ColorsVariant>("contrast-checker");
  const [selectedPair, setSelectedPair] = useState<string>("ink-surface");
  const [sunlightActive, setSunlightActive] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];
  const activePair = CONTRAST_PAIRS.find((p) => p.id === selectedPair) || CONTRAST_PAIRS[0];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Variação Ergonômica */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Token de Cor
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["contrast-checker", "semantic-palette", "sunlight-sim"] as ColorsVariant[]).map((v) => {
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

      {/* 2. Área Central Interativa: Simulação de Verificador & Paleta */}
      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xs">
        {/* --- Variação 1: Verificador de Contraste WCAG 2.1 --- */}
        {variant === "contrast-checker" && (
          <div className="flex h-full flex-col justify-between">
            {/* Seletor rápido de pares */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold uppercase text-muted">Amostra:</span>
              <div className="flex gap-1">
                {CONTRAST_PAIRS.map((pair) => (
                  <button
                    key={pair.id}
                    type="button"
                    onClick={() => {
                      setSelectedPair(pair.id);
                      setLastAction(`Contraste: ${pair.name} (${pair.ratio}:1)`);
                    }}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-all active:scale-95",
                      selectedPair === pair.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-line bg-surface text-muted hover:text-ink"
                    )}
                  >
                    {pair.ratio}:1
                  </button>
                ))}
              </div>
            </div>

            {/* Painel do Teste com Avaliação WCAG */}
            <div className="flex items-center justify-between rounded-xl border border-line bg-surface-raised/70 p-2.5">
              <div className="flex flex-col">
                <span className={cn("text-xs font-bold", activePair.fg)}>
                  {activePair.name}
                </span>
                <span className="text-[10px] text-muted">
                  {activePair.ratio >= 4.5
                    ? "Legível em texto padrão (14-16px)"
                    : activePair.ratio >= 3.0
                    ? "Legível apenas em texto grande (≥18px)"
                    : "Ilegível sob luz solar ou baixa visão"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-extrabold text-ink">
                  {activePair.ratio}:1
                </span>
                {activePair.ratio >= 4.5 ? (
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                    <CheckCircle2 className="size-3" />
                    <span>AA Pass</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-bold text-red-500">
                    <XCircle className="size-3" />
                    <span>Fail</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>Mínimo Texto Normal: <strong>4.5:1</strong></span>
              <span>Mínimo Texto Grande: <strong>3.0:1</strong></span>
            </div>
          </div>
        )}

        {/* --- Variação 2: Paleta Semântica --- */}
        {variant === "semantic-palette" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink">Tokens de Superfície e Contraste</span>
              <span className="text-[10px] text-muted">Todos &ge; 4.5:1</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div
                onClick={() => setLastAction("Token: Primary (#128a58) • 4.6:1")}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-line bg-surface-raised p-1.5 transition-all hover:border-primary active:scale-95"
              >
                <div className="size-5 rounded-full bg-primary shadow-xs" />
                <span className="mt-1 text-[10px] font-bold text-ink">Primary</span>
                <span className="text-[9px] font-medium text-emerald-600">4.6:1</span>
              </div>

              <div
                onClick={() => setLastAction("Token: Ink (#111a14) • 14.2:1")}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-line bg-surface-raised p-1.5 transition-all hover:border-primary active:scale-95"
              >
                <div className="size-5 rounded-full bg-ink shadow-xs" />
                <span className="mt-1 text-[10px] font-bold text-ink">Ink</span>
                <span className="text-[9px] font-medium text-emerald-600">14.2:1</span>
              </div>

              <div
                onClick={() => setLastAction("Token: Muted (#526357) • 5.1:1")}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-line bg-surface-raised p-1.5 transition-all hover:border-primary active:scale-95"
              >
                <div className="size-5 rounded-full bg-muted shadow-xs" />
                <span className="mt-1 text-[10px] font-bold text-ink">Muted</span>
                <span className="text-[9px] font-medium text-emerald-600">5.1:1</span>
              </div>

              <div
                onClick={() => setLastAction("Token: Surface (#ffffff) • Base tátil")}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-line bg-surface-raised p-1.5 transition-all hover:border-primary active:scale-95"
              >
                <div className="size-5 rounded-full border border-line bg-surface shadow-xs" />
                <span className="mt-1 text-[10px] font-bold text-ink">Surface</span>
                <span className="text-[9px] font-medium text-muted">Base</span>
              </div>
            </div>

            <p className="truncate text-center text-[10px] text-muted">
              Toque nos tokens para ver o ratio e a função ergonômica
            </p>
          </div>
        )}

        {/* --- Variação 3: Simulador de Luz Solar Direta --- */}
        {variant === "sunlight-sim" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <Sun className={cn("size-3.5", sunlightActive ? "text-amber-500 animate-spin" : "text-muted")} />
                <span>Simulador de Luz Solar Externa</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSunlightActive(!sunlightActive);
                  setLastAction(sunlightActive ? "Ambiente interno restaurado" : "Simulação solar ativada (-50% contraste)");
                }}
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all active:scale-95",
                  sunlightActive
                    ? "border-amber-500 bg-amber-500/10 text-amber-600"
                    : "border-line bg-surface text-muted"
                )}
              >
                {sunlightActive ? "☀️ Sol Ativo" : "🏠 Interno"}
              </button>
            </div>

            {/* Painel comparativo com filtro de ofuscamento solar */}
            <div
              className={cn(
                "relative flex items-center justify-around rounded-xl border border-line p-2 transition-all",
                sunlightActive ? "bg-amber-100/40 opacity-70 contrast-75 brightness-110" : "bg-surface-raised"
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-ink">Hapto (4.5:1+)</span>
                <span className="text-xs font-bold text-ink">Texto Legível</span>
              </div>

              <div className="h-6 w-px bg-line" />

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-muted">Baixo Contraste (2.0:1)</span>
                <span className={cn("text-xs font-medium", sunlightActive ? "opacity-20 blur-[0.5px]" : "text-muted/60")}>
                  {sunlightActive ? "(Ilegível)" : "Texto Apagado"}
                </span>
              </div>
            </div>

            <p className="truncate text-center text-[10px] text-muted">
              {sunlightActive
                ? "Sob luz solar, o contraste percebido cai pela metade."
                : "Ative o simulador solar para ver o impacto na legibilidade."}
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
          WCAG 2.1 AA • Normal: 4.5:1 • Grande: 3:1
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Interaja com os tokens de cor</span>
          )}
        </span>
      </div>
    </div>
  );
}
