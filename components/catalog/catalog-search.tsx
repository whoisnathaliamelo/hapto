"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui";

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

const QUICK_SUGGESTIONS = [
  "WCAG",
  "Espaçamento",
  "Botões",
  "Inputs",
  "Switches",
  "Bottom Nav",
];

function getIsMac() {
  if (typeof window === "undefined") return false;
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || "");
}

export function CatalogSearch({
  value,
  onChange,
  resultCount,
  totalCount,
}: CatalogSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = useSyncExternalStore(
    () => () => {},
    getIsMac,
    () => false
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }

      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (value) {
          onChange("");
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, onChange]);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const isSearching = value.trim().length > 0;

  return (
    <div className="w-full space-y-3">
      <SearchInput
        inputRef={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClear={handleClear}
        variant="glass"
        placeholder="Pesquisar componentes, tokens ou ergonomia (ex: botões, inputs, wcag)..."
        aria-label="Pesquisar componentes no catálogo"
        className={cn(
          "rounded-2xl",
          isSearching && "border-primary/60 ring-2 ring-primary/15"
        )}
        endAdornment={
          isSearching ? (
            <span className="hidden sm:inline-flex rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
            </span>
          ) : (
            <kbd
              title={`Pressione ${isMac ? "⌘K" : "Ctrl+K"} ou / para focar`}
              onClick={() => inputRef.current?.focus()}
              className="hidden sm:inline-flex cursor-pointer items-center gap-1 rounded-lg border border-line bg-surface-raised px-2 py-1 text-[11px] font-semibold text-muted shadow-2xs hover:text-ink transition-colors"
            >
              <span>{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </kbd>
          )
        }
      />

      <div className="flex flex-wrap items-center gap-1.5 px-1 text-xs text-muted">
        <span className="font-medium mr-1 hidden sm:inline">Sugestões:</span>
        {QUICK_SUGGESTIONS.map((suggestion) => {
          const isSelected = value.toLowerCase() === suggestion.toLowerCase();
          return (
            <button
              key={suggestion}
              type="button"
              onClick={() => onChange(isSelected ? "" : suggestion)}
              className={cn(
                "min-h-7 rounded-lg border px-2.5 py-1 font-medium transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary",
                isSelected
                  ? "border-primary bg-primary text-on-primary font-semibold shadow-2xs"
                  : "border-line/70 bg-surface/60 hover:border-primary/50 hover:bg-surface hover:text-ink"
              )}
            >
              {suggestion}
            </button>
          );
        })}

        {isSearching && (
          <span className="sm:hidden ml-auto font-medium text-primary">
            {resultCount}/{totalCount}
          </span>
        )}
      </div>
    </div>
  );
}

interface CatalogSearchEmptyStateProps {
  query: string;
  onClear: () => void;
}

export function CatalogSearchEmptyState({
  query,
  onClear,
}: CatalogSearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-line/80 bg-surface/50 p-8 sm:p-12 text-center backdrop-blur-xs">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-line bg-surface-raised text-muted shadow-2xs mb-4">
        <SearchX className="size-7 text-muted" />
      </div>

      <h3 className="text-lg font-bold text-ink sm:text-xl">
        Nenhum componente encontrado
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted leading-relaxed">
        Não encontramos nenhum componente ou token correspondente a{" "}
        <span className="font-semibold text-ink">&ldquo;{query}&rdquo;</span>. Tente buscar
        por termos como alvos táteis, botões, inputs, espaçamento ou navegação.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-on-primary shadow-xs transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <RotateCcw className="size-4" />
        <span>Limpar busca e ver todos</span>
      </button>
    </div>
  );
}
