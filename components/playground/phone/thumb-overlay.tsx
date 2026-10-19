import type { HandGrip } from "../types";
import { cn } from "@/lib/utils";

interface ThumbOverlayProps {
  handGrip: HandGrip;
}

export function ThumbOverlay({ handGrip }: ThumbOverlayProps) {
  return (
    <div
      id="thumb-overlay"
      aria-hidden="true"
      data-hand={handGrip}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between select-none overflow-hidden transition-all duration-300"
    >
      {/* 1. Zona Difícil (Topo da tela) - Sombra suave e linha tracejada rosa */}
      <div className="relative h-[26%] border-b border-dashed border-rose-500/40 bg-rose-500/[0.04] transition-all">
        {/* Marcador lateral discreto (sem poluir o centro da tela) */}
        <div className="absolute right-2 top-2">
          <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[9px] font-bold text-rose-600 dark:text-rose-400">
            Difícil
          </span>
        </div>
      </div>

      {/* 2. Zona Esticada (Centro da tela) - Linha tracejada âmbar */}
      <div className="relative flex-1 border-b border-dashed border-amber-500/40 bg-amber-500/[0.03] transition-all flex items-center justify-end pr-2">
        {/* Marcador lateral discreto */}
        <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400">
          Esticada
        </span>
      </div>

      {/* 3. Zona Natural (Base da tela) - Curvatura do arco do polegar e linha tracejada primária */}
      <div
        className={cn(
          "relative h-[38%] border-t-2 border-dashed border-primary/60 bg-primary/[0.06] transition-all duration-300 flex flex-col justify-end p-2",
          // Arco dinâmico conforme a mão
          handGrip === "right" && "rounded-tl-[5rem] bg-gradient-to-tl from-primary/20 via-primary/8 to-transparent",
          handGrip === "left" && "rounded-tr-[5rem] bg-gradient-to-tr from-primary/20 via-primary/8 to-transparent",
          handGrip === "both" && "rounded-t-[3.5rem] bg-gradient-to-t from-primary/18 via-primary/8 to-transparent"
        )}
      >
        {/* Marcador no canto respectivo da mão */}
        <div
          className={cn(
            "flex items-center",
            handGrip === "right" && "justify-end",
            handGrip === "left" && "justify-start",
            handGrip === "both" && "justify-center"
          )}
        >
          <span className="rounded-full bg-primary/20 border border-primary/40 px-2 py-0.5 text-[9px] font-bold text-primary shadow-2xs">
            {handGrip === "right" ? "Natural (Destro)" : handGrip === "left" ? "Natural (Canhoto)" : "Natural (2 Mãos)"}
          </span>
        </div>
      </div>
    </div>
  );
}


