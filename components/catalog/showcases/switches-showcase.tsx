"use client";

import { useState } from "react";
import { Check, Info, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type ControlType = "switch" | "checkbox" | "row";

const VARIATIONS_INFO: Record<
  ControlType,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  switch: {
    label: "Switch Tátil",
    tag: "Ação Imediata",
    ergonomicNote: "O controle tem corpo de 28px, mas a área tátil do container atinge 48dp para prevenir erros de ativação.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  checkbox: {
    label: "Checkbox 48dp",
    tag: "Seleção Múltipla",
    ergonomicNote: "O label inteiro é clicável (min-h-12). O polegar nunca precisa mirar apenas na caixinha de 20px.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  row: {
    label: "Linha de Ajuste",
    tag: "Padrão Mobile",
    ergonomicNote: "Estrutura de 56dp com título, descrição e gatilho à direita, otimizada para listas em telas sensíveis ao toque.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const SWITCHES_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: O container tem 'min-h-12' (48px) para garantir a Regra dos 48dp de toque

import { useState } from "react";
import { Check, Bell } from "lucide-react";

export function ControlesErgonomicos() {
  const [switchAtivo, setSwitchAtivo] = useState(true);
  const [checkAtivo, setCheckAtivo] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-3">
      {/* 1. Switch Ergonômico — Área de toque de 48dp com Label Clicável */}
      <label className="flex min-h-12 cursor-pointer items-center justify-between rounded-xl border border-line bg-surface p-3 transition-colors hover:border-primary/40 active:bg-surface-raised">
        <span className="text-sm font-semibold text-ink">
          Notificações Push
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={switchAtivo}
          onClick={() => setSwitchAtivo(!switchAtivo)}
          className={\`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 \${
            switchAtivo ? "bg-primary" : "bg-line"
          }\`}
        >
          <span
            className={\`inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-200 \${
              switchAtivo ? "translate-x-6" : "translate-x-1"
            }\`}
          />
        </button>
      </label>

      {/* 2. Checkbox Ergonômico — Todo o container é o alvo de toque */}
      <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:border-primary/40 active:bg-surface-raised">
        <input
          type="checkbox"
          checked={checkAtivo}
          onChange={(e) => setCheckAtivo(e.target.checked)}
          className="sr-only"
        />
        <div
          className={\`flex size-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 \${
            checkAtivo
              ? "border-primary bg-primary text-white"
              : "border-line bg-surface"
          }\`}
        >
          {checkAtivo && <Check className="size-4 stroke-[3]" />}
        </div>
        <span className="text-sm font-medium text-ink">
          Concordo com os termos do Hapto
        </span>
      </label>
    </div>
  );
}`;

export function SwitchesShowcase() {
  const [type, setType] = useState<ControlType>("switch");
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [rowSwitchOn, setRowSwitchOn] = useState(false);

  const currentInfo = VARIATIONS_INFO[type];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Tipo do Controle */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Tipo de Controle Tátil
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["switch", "checkbox", "row"] as ControlType[]).map((t) => {
            const isSelected = type === t;
            const item = VARIATIONS_INFO[t];
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
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

      {/* 2. Área de Demonstração Interativa */}
      <div className="flex min-h-[92px] w-full max-w-sm items-center justify-center px-1">
        {type === "switch" && (
          <div className="w-full">
            <label
              onClick={() => setSwitchOn(!switchOn)}
              className="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 shadow-2xs transition-all hover:border-primary/50 active:scale-[0.99]"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-ink">Modo Ergonômico</span>
                <span className="text-[10px] text-muted">
                  {switchOn ? "Ativo (Foco aumentado)" : "Inativo (Padrão)"}
                </span>
              </div>

              {/* Componente Visual do Switch */}
              <div
                role="switch"
                aria-checked={switchOn}
                className={cn(
                  "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200",
                  switchOn ? "bg-primary" : "bg-line"
                )}
              >
                <span
                  className={cn(
                    "inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-200",
                    switchOn ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </div>
            </label>
          </div>
        )}

        {type === "checkbox" && (
          <div className="w-full">
            <label
              onClick={() => setCheckboxOn(!checkboxOn)}
              className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-2xs transition-all hover:border-primary/50 active:scale-[0.99]"
            >
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
                  checkboxOn
                    ? "border-primary bg-primary text-on-primary shadow-xs"
                    : "border-line bg-surface-raised"
                )}
              >
                {checkboxOn && <Check className="size-4 stroke-[2.5]" />}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-ink">Habilitar Feedback Háptico</span>
                <span className="text-[10px] text-muted">Toque em qualquer ponto da linha</span>
              </div>
            </label>
          </div>
        )}

        {type === "row" && (
          <div className="w-full">
            <div
              onClick={() => setRowSwitchOn(!rowSwitchOn)}
              className="flex min-h-14 w-full cursor-pointer items-center justify-between rounded-xl border border-line bg-surface px-4 py-2 shadow-2xs transition-all hover:border-primary/50 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Shield className="size-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-ink">Proteção de Toque</span>
                  <span className="text-[10px] text-muted">Bloqueio de cliques duplos</span>
                </div>
              </div>

              <div
                role="switch"
                aria-checked={rowSwitchOn}
                className={cn(
                  "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200",
                  rowSwitchOn ? "bg-primary" : "bg-line"
                )}
              >
                <span
                  className={cn(
                    "inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-200",
                    rowSwitchOn ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </div>
            </div>
          </div>
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
        <span className="font-mono text-[10px]">Alvo: 48dp • Container Clicável</span>
        <span className="font-medium text-ink">
          {type === "switch" && (switchOn ? "Ligado" : "Desligado")}
          {type === "checkbox" && (checkboxOn ? "Marcado" : "Desmarcado")}
          {type === "row" && (rowSwitchOn ? "Protegido" : "Desprotegido")}
        </span>
      </div>
    </div>
  );
}
