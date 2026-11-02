"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  Info,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Chip,
  SearchInput,
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui";

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

export const SEARCH_CODE = `// Exemplo com Hapto Design System
import { useState } from "react";
import { SearchInput, Chip } from "@/components/ui";

export function BarraDeBuscaErgonomica() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState(false);

  return (
    <div className="w-full max-w-md space-y-2">
      {/* 1. Componente SearchInput com alvo de 48dp para polegar */}
      <SearchInput
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onClear={() => setBusca("")}
        filterActive={filtroAtivo}
        onFilterClick={() => setFiltroAtivo(!filtroAtivo)}
        placeholder="Buscar componentes..."
      />

      {/* 2. Chips Rápidos na Thumb Zone */}
      <div className="flex gap-2">
        {["Botões", "Inputs", "Feedback"].map((tag) => (
          <Chip key={tag} size="sm" onClick={() => setBusca(tag)}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};`;

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
        <SegmentedControl
          value={variant}
          onValueChange={(val) => setVariant(val as SearchVariant)}
        >
          {(["standard", "with-filter", "suggestions"] as SearchVariant[]).map((v) => (
            <SegmentedControlItem key={v} value={v}>
              {VARIATIONS_INFO[v].label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>

      <div className="flex min-h-[108px] w-full max-w-sm flex-col justify-center gap-2.5 px-1">
        <SearchInput
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedTag(null);
          }}
          onClear={handleClear}
          placeholder="Digite para buscar..."
          endAction={
            variant === "with-filter" ? (
              <button
                type="button"
                aria-label="Alternar filtros"
                onClick={() => setFilterActive(!filterActive)}
                className={cn(
                  "mr-1 flex size-9 shrink-0 items-center justify-center rounded-lg transition-all active:scale-90 cursor-pointer",
                  filterActive
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-muted hover:bg-surface-raised hover:text-ink"
                )}
                title={filterActive ? "Filtro ativo" : "Aplicar filtro"}
              >
                <SlidersHorizontal className="size-4" />
              </button>
            ) : undefined
          }
        />

        {variant === "suggestions" && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-muted shrink-0 pr-1">
              <Clock className="size-3" />
              <span>Rápido:</span>
            </span>
            {SUGGESTIONS.map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <Chip
                  key={tag}
                  size="sm"
                  selected={isTagSelected}
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag}
                </Chip>
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
          <Badge className={cn("shrink-0", currentInfo.badgeColor)}>
            {currentInfo.tag}
          </Badge>
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
