"use client";

import { useState } from "react";
import { AlertCircle, Check, Info, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

type InputState = "normal" | "icon" | "error";

const STATES_INFO: Record<
  InputState,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  normal: {
    label: "Padrão (48dp)",
    tag: "Essencial",
    ergonomicNote: "Altura de 48dp garante foco imediato no polegar. Fonte de 16px evita o auto-zoom do iOS.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  icon: {
    label: "Com Ícone",
    tag: "Apoio Visual",
    ergonomicNote: "Ícone interno com recuo seguro (pl-11) para não invadir a área de digitação legível.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  error: {
    label: "Com Erro",
    tag: "Acessibilidade",
    ergonomicNote: "Borda com contraste alto e mensagem descritiva imediata sem depender apenas de cor.",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  },
};

export const INPUTS_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: 'min-h-12' garante 48dp para toque e 'text-base' (16px) impede zoom no iOS

import { useState } from "react";
import { Mail, X, AlertCircle } from "lucide-react";

export function InputErgonomico() {
  const [valor, setValor] = useState("");

  return (
    <div className="w-full max-w-sm space-y-1.5">
      {/* 1. Label claro e legível */}
      <label className="text-xs font-semibold text-ink">
        E-mail de Contato
      </label>

      {/* 2. Container do campo com 48dp de altura */}
      <div className="relative flex items-center">
        <Mail className="pointer-events-none absolute left-3.5 size-5 text-muted" />

        <input
          type="email"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="exemplo@hapto.design"
          className="min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-11 text-base text-ink shadow-2xs transition-all duration-200 placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        {/* 3. Botão de limpar com alvo tátil confortável */}
        {valor && (
          <button
            type="button"
            onClick={() => setValor("")}
            aria-label="Limpar campo"
            className="absolute right-2 flex size-8 items-center justify-center rounded-lg text-muted hover:bg-surface-raised hover:text-ink active:scale-90"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* 4. Mensagem de apoio acessível */}
      <p className="text-[11px] text-muted">
        Toque fácil com polegar e sem zoom involuntário no mobile.
      </p>
    </div>
  );
}`;

export function InputsShowcase() {
  const [state, setState] = useState<InputState>("normal");
  const [value, setValue] = useState("contato@hapto.design");
  const [isFocused, setIsFocused] = useState(false);

  const currentInfo = STATES_INFO[state];
  const isError = state === "error";
  const hasIcon = state === "icon";

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      {/* 1. Seletor de Estados do Campo */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Campo
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["normal", "icon", "error"] as InputState[]).map((st) => {
            const isSelected = state === st;
            const item = STATES_INFO[st];
            return (
              <button
                key={st}
                type="button"
                onClick={() => setState(st)}
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

      {/* 2. Campo de Texto Interativo */}
      <div className="w-full max-w-sm px-1 py-1">
        <div className="flex items-center justify-between pb-1.5">
          <label
            htmlFor="showcase-input"
            className="text-xs font-bold text-ink"
          >
            {isError ? "E-mail com Erro" : "E-mail de Acesso"}
          </label>
          <span className="text-[10px] font-medium text-muted">min-h-12 (48px)</span>
        </div>

        <div className="relative flex items-center">
          {hasIcon && (
            <Mail
              className={cn(
                "pointer-events-none absolute left-3.5 size-5 transition-colors",
                isFocused ? "text-primary" : "text-muted"
              )}
            />
          )}

          <input
            id="showcase-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Digite algo aqui..."
            className={cn(
              "min-h-12 w-full rounded-xl border bg-surface text-base text-ink shadow-2xs transition-all duration-200 placeholder:text-muted/60 focus:outline-none",
              hasIcon ? "pl-11" : "pl-4",
              value ? "pr-11" : "pr-4",
              isError
                ? "border-rose-500/80 bg-rose-500/5 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20"
                : "border-line focus:border-primary focus:ring-2 focus:ring-primary/20"
            )}
          />

          {/* Botão de Limpar com área tátil confortável */}
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Limpar campo de texto"
              className="absolute right-2 flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Mensagem de Erro ou Apoio */}
        <div className="mt-1.5 flex min-h-[18px] items-center gap-1.5 text-[11px]">
          {isError ? (
            <span className="flex items-center gap-1 text-rose-600 font-medium animate-in fade-in">
              <AlertCircle className="size-3.5 shrink-0" />
              Formato de e-mail inválido. Verifique o endereço.
            </span>
          ) : (
            <span className="text-muted/80">
              {isFocused ? "Digitando... alvo confortável para o polegar." : "Toque no campo para interagir."}
            </span>
          )}
        </div>
      </div>

      {/* 3. Diagnóstico Ergonômico */}
      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Ergonomia do Input ({currentInfo.label})</span>
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
        <span className="font-mono text-[10px]">Alvo: 48dp • Fonte: 16px</span>
        <span className="font-medium text-ink">
          {isFocused ? (
            <span className="inline-flex items-center gap-1 text-primary animate-in fade-in">
              <Check className="size-3" />
              Campo Focado
            </span>
          ) : (
            <span className="text-muted/60">Em repouso</span>
          )}
        </span>
      </div>
    </div>
  );
}
