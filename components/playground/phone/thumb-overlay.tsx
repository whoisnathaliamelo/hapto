import type { HandGrip } from "../types";
import { AlertTriangle, CheckCircle, Flame } from "lucide-react";
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
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between select-none overflow-hidden"
    >
      {/* 1. Zona Difícil (Hard to reach - Topo da tela) */}
      <div className="relative h-[28%] border-b border-rose-500/25 bg-rose-500/[0.07] p-2.5 backdrop-blur-[0.5px] transition-all">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-bold text-rose-700 dark:text-rose-300">
            <AlertTriangle className="size-2.5" />
            Zona Difícil (Hard)
          </span>
          <span className="text-[8px] font-semibold text-rose-600/80 dark:text-rose-400">
            Leitura passiva
          </span>
        </div>
      </div>

      {/* 2. Zona Esticada (Stretch - Centro da tela) */}
      <div className="relative flex-1 border-b border-amber-500/25 bg-amber-500/[0.05] p-2.5 transition-all flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-300">
            <Flame className="size-2.5" />
            Zona Esticada (Stretch)
          </span>
          <span className="text-[8px] font-semibold text-amber-600/80 dark:text-amber-400">
            Alcance médio
          </span>
        </div>
      </div>

      {/* 3. Zona Natural (Easy Reach - Base da tela onde o polegar atinge com facilidade) */}
      <div
        className={cn(
          "relative h-[38%] border-t-2 border-primary/50 bg-primary/[0.08] p-2.5 transition-all flex flex-col justify-end",
          // Curvatura visual adaptada à mão
          handGrip === "right" && "rounded-tl-[3.5rem] bg-gradient-to-tl from-primary/15 to-transparent",
          handGrip === "left" && "rounded-tr-[3.5rem] bg-gradient-to-tr from-primary/15 to-transparent",
          handGrip === "both" && "rounded-t-[2.5rem] bg-gradient-to-t from-primary/15 to-transparent"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            handGrip === "right" && "flex-row-reverse text-right",
            handGrip === "left" && "flex-row text-left",
            handGrip === "both" && "justify-between"
          )}
        >
          <span className="inline-flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
            <CheckCircle className="size-3" />
            Zona Natural (Reach)
          </span>
          <span className="text-[9px] font-bold text-primary/90">
            {handGrip === "right" ? "Polegar Direito ↘" : handGrip === "left" ? "↙ Polegar Esquerdo" : "2 Polegares ↔"}
          </span>
        </div>
        <p className="mt-1 text-[9px] text-primary/80 font-medium">
          Área ideal para CTAs primários, tabs e ações frequentes.
        </p>
      </div>
    </div>
  );
}

