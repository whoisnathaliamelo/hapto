import type { HandGrip } from "../types";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface HandSelectorProps {
  value: HandGrip;
  onChange: (value: HandGrip) => void;
}

export function HandSelector({ value, onChange }: HandSelectorProps) {
  const options: { id: HandGrip; label: string; sub: string }[] = [
    { id: "left", label: "Canhoto", sub: "Mão esquerda" },
    { id: "right", label: "Destro", sub: "Mão direita" },
    { id: "both", label: "Duas Mãos", sub: "Dois polegares" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <Hand className="size-3.5 text-primary" />
          <span>Pegada da Mão</span>
        </label>
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
          {value === "right" ? "Destro" : value === "left" ? "Canhoto" : "2 Mãos"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-surface-raised/60 p-1">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg px-2.5 py-2 text-center transition-all cursor-pointer",
                isSelected
                  ? "bg-surface text-ink font-bold shadow-xs border border-line/80 ring-1 ring-primary/20"
                  : "text-muted hover:text-ink hover:bg-surface/50 font-medium"
              )}
            >
              <span className="text-xs">{option.label}</span>
              <span className="text-[10px] text-muted/80">{option.sub}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

