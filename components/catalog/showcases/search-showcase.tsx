"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  Info,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SearchVariant = "standard" | "with-filter" | "suggestions";

const VARIATIONS_INFO: Record<
  SearchVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  standard: {
    label: "Busca + Limpar",
    tag: "Altura 48dp",
    ergonomicNote: "Altura mínima de 48dp calibrada para o polegar e fonte de 16px para prevenir o zoom involuntário no iOS Safari.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "with-filter": {
    label: "Com Filtro",
    tag: "Ação Composta",
    ergonomicNote: "Botão de filtro incorporado com alvo de toque de 40dp e estado ativo destacado, evitando navegação desnecessária de telas.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  suggestions: {
    label: "Com Chips Rápidos",
    tag: "Thumb Reach",
    ergonomicNote: "Chips táteis posicionados abaixo do campo de busca na zona natural de alcance, permitindo refinamento com um único toque.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const SEARCH_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: 'min-h-12' (48px) garante a Regra dos 48dp e 'text-base' (16px) evita o auto-zoom no iOS

import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

export function BarraDeBuscaErgonomica() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState(false);

  return (
    <div className="w-full max-w-md space-y-2">
      {/* 1. Container de Busca — Altura de 48dp calibrada para o polegar */}
      <div className="relative flex min-h-12 w-full items-center rounded-xl border border-line bg-surface shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="ml-3.5 size-5 shrink-0 text-muted" />

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar no sistema..."
          className="w-full bg-transparent px-3 text-base text-ink placeholder:text-muted focus:outline-none"
        />

        {/* 2. Botão Limpar com Hitbox Confortável de Toque */}
        {busca && (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => setBusca("")}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90"
          >
            <X className="size-4" />
          </button>
        )}

        {/* 3. Ação Lateral de Filtro Integrado */}
        <button
          type="button"
          aria-label="Abrir filtros"
          onClick={() => setFiltroAtivo(!filtroAtivo)}
          className={\`mr-1.5 flex size-10 shrink-0 items-center justify-center rounded-lg transition-all active:scale-95 \${
            filtroAtivo
              ? "bg-primary text-on-primary shadow-xs"
              : "text-muted hover:bg-surface-raised hover:text-ink"
          }\`}
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </div>
    </div>
  );
}`;

const SUGGESTIONS = ["Botões", "Inputs", "Feedback", "48dp"];

export function SearchShowcase() {
  const [variant, setVariant] = useState<SearchVariant>("standard");
  const [query, setQuery] = useState("Componente");
  const [filterActive, setFilterActive] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  const handleClear = () => {
    setQuery("");
    setSelectedTag(null);
  };

  const handleSelectTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setQuery("");
    } else {
      setSelectedTag(tag);
      setQuery(tag);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação da Barra de Busca
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["standard", "with-filter", "suggestions"] as SearchVariant[]).map((v) => {
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

      <div className="flex min-h-[108px] w-full max-w-sm flex-col justify-center gap-2.5 px-1">
        <div className="relative flex min-h-12 w-full items-center rounded-xl border border-line bg-surface shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="ml-3.5 size-5 shrink-0 text-muted transition-colors focus-within:text-primary" />

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedTag(null);
            }}
            placeholder="Digite para buscar..."
            className="w-full bg-transparent px-3 text-sm sm:text-base text-ink placeholder:text-muted focus:outline-none"
          />

          {query && (
            <button
              type="button"
              aria-label="Limpar campo de busca"
              onClick={handleClear}
              className="mr-1 flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-all hover:bg-surface-raised hover:text-ink active:scale-90"
              title="Limpar texto"
            >
              <X className="size-4" />
            </button>
          )}

          {variant === "with-filter" && (
            <button
              type="button"
              aria-label="Alternar filtros"
              onClick={() => setFilterActive(!filterActive)}
              className={cn(
                "mr-1.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-all active:scale-90",
                filterActive
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-muted hover:bg-surface-raised hover:text-ink"
              )}
              title={filterActive ? "Filtro ativo" : "Aplicar filtro"}
            >
              <SlidersHorizontal className="size-4" />
            </button>
          )}
        </div>

        {variant === "suggestions" && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-muted shrink-0 pr-1">
              <Clock className="size-3" />
              <span>Rápido:</span>
            </span>
            {SUGGESTIONS.map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectTag(tag)}
                  className={cn(
                    "inline-flex min-h-7 shrink-0 items-center rounded-lg border px-2.5 text-[11px] font-medium transition-all duration-150 active:scale-95",
                    isTagSelected
                      ? "border-primary bg-primary text-on-primary shadow-2xs"
                      : "border-line bg-surface text-muted hover:border-primary/40 hover:text-ink"
                  )}
                >
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        )}

        {variant === "with-filter" && filterActive && (
          <div className="flex items-center gap-1.5 text-[11px] text-primary">
            <Sparkles className="size-3" />
            <span>Filtro de busca mobile ativado (+ relevância móvel)</span>
          </div>
        )}
      </div>

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

      <div className="flex w-full items-center justify-between border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="font-mono text-[10px]">
          Alvo: 48dp • Limpar: 36-40dp • Fonte: 16px
        </span>
        <span className="font-medium text-ink flex items-center gap-1">
          {query ? (
            <>
              <Check className="size-3 text-emerald-600" />
              <span className="text-emerald-600 truncate max-w-[140px]">
                &quot;{query}&quot;
              </span>
            </>
          ) : (
            <span className="text-muted">Aguardando busca</span>
          )}
        </span>
      </div>
    </div>
  );
}
