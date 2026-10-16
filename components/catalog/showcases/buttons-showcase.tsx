"use client";

import { useState } from "react";
import { Plus, Send, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonsShowcase() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setFeedback(`Toque detectado: ${name}`);
    const timer = setTimeout(() => setFeedback(null), 1800);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 py-2">
      {/* Grade de demonstração dos botões */}
      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        {/* 1. Botão Primário (48px - Padrão Ergonômico de Toque) */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleClick("Primário (48px)")}
          className="shadow-sm hover:shadow-primary/20 hover:shadow-lg"
        >
          <Sparkles className="size-4" />
          <span>Principal</span>
        </Button>

        {/* 2. Botão Secundário */}
        <Button
          variant="secondary"
          size="md"
          onClick={() => handleClick("Secundário (44px)")}
        >
          <span>Secundário</span>
        </Button>

        {/* 3. FAB (Floating Action Button - 56px para fácil alcance do polegar) */}
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

      {/* Régua de Especificações & Feedback Interativo */}
      <div className="flex w-full items-center justify-between border-t border-line/60 pt-3 text-[11px] text-muted">
        <span className="flex items-center gap-1.5 font-mono">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Alvo mínimo: 48×48dp
        </span>

        <span className="font-medium text-ink transition-all">
          {feedback ? (
            <span className="inline-flex items-center gap-1 text-primary animate-in fade-in">
              <Check className="size-3" />
              {feedback}
            </span>
          ) : (
            <span className="text-muted/70">Toque em qualquer botão</span>
          )}
        </span>
      </div>
    </div>
  );
}
