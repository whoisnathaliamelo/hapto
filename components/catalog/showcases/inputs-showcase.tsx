"use client";

import { useState } from "react";
import { Check, Info, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Input,
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui";

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

export const INPUTS_CODE = `// Exemplo com Hapto Design System
import { useState } from "react";
import { Mail, X } from "lucide-react";
import { Input } from "@/components/ui";

export function InputErgonomico() {
  const [valor, setValor] = useState("");

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className="text-xs font-semibold text-ink">
        E-mail de Contato
      </label>

      {/* Input de 48dp (Prevenção de auto-zoom no iOS) */}
      <Input
        inputSize="lg"
        type="email"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="exemplo@hapto.design"
        startIcon={<Mail className="size-5" />}
        endIcon={
          valor ? (
            <button
              type="button"
              onClick={() => setValor("")}
              aria-label="Limpar campo"
              className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-surface-raised active:scale-90"
            >
              <X className="size-4" />
            </button>
          ) : undefined
        }
        helperText="Alvo tátil confortável de 48dp e sem zoom involuntário no mobile."
      />
    </div>
  );
};`;

export function InputsShowcase() {
  const [state, setState] = useState<InputState>("normal");
  const [value, setValue] = useState("contato@hapto.design");
  const [isFocused, setIsFocused] = useState(false);

  const currentInfo = STATES_INFO[state];
  const isError = state === "error";
  const hasIcon = state === "icon";

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Campo
        </span>
        <SegmentedControl
          value={state}
          onValueChange={(val) => setState(val as InputState)}
        >
          {(["normal", "icon", "error"] as InputState[]).map((st) => (
            <SegmentedControlItem key={st} value={st}>
              {STATES_INFO[st].label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>

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

        <Input
          id="showcase-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Digite algo aqui..."
          startIcon={
            hasIcon ? (
              <Mail
                className={cn(
                  "size-5 transition-colors",
                  isFocused ? "text-primary" : "text-muted"
                )}
              />
            ) : undefined
          }
          endIcon={
            value ? (
              <button
                type="button"
                onClick={() => setValue("")}
                aria-label="Limpar campo de texto"
                className="flex size-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            ) : undefined
          }
          error={
            isError
              ? "Formato de e-mail inválido. Verifique o endereço."
              : undefined
          }
          helperText={
            !isError
              ? isFocused
                ? "Digitando... alvo confortável para o polegar."
                : "Toque no campo para interagir."
              : undefined
          }
        />
      </div>

      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Ergonomia do Input ({currentInfo.label})</span>
          </span>
          <Badge className={cn("shrink-0", currentInfo.badgeColor)}>
            {currentInfo.tag}
          </Badge>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

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
