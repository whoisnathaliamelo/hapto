import type { TargetSize } from "../types";
import { CheckCircle2, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface TargetCalibratorProps {
  value: TargetSize;
  onChange: (value: TargetSize) => void;
}

export function TargetCalibrator({ value, onChange }: TargetCalibratorProps) {
  const options: {
    id: TargetSize;
    label: string;
    detail: string;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      id: "40px",
      label: "40px",
      detail: "Alvo reduzido — alto risco de erro no toque do polegar",
      badge: "Subdimensionado",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
    {
      id: "44px",
      label: "44px",
      detail: "Mínimo estipulado pela Apple (Human Interface Guidelines)",
      badge: "Mínimo Apple",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      id: "48px",
      label: "48px",
      detail: "Padrão ouro ergonômico (Material Design & Hapto)",
      badge: "Padrão Ouro",
      badgeColor: "bg-primary-light text-primary border-primary/30",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <Crosshair className="size-3.5 text-primary" />
          <span>Calibragem de Target Tátil</span>
        </label>
        <span className="text-[10px] font-semibold text-muted">Lei de Fitts</span>
      </div>

      <div className="space-y-1.5">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all cursor-pointer min-h-[58px]",
                isSelected
                  ? "border-primary bg-primary-light/30 shadow-xs ring-1 ring-primary/30"
                  : "border-line bg-surface hover:border-line hover:bg-surface-raised/50"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                    isSelected
                      ? "bg-primary text-on-primary"
                      : "bg-surface-raised text-muted group-hover:text-ink"
                  )}
                >
                  {option.label}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-xs font-bold text-ink">
                      Altura {option.label}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.2 text-[9px] font-semibold border",
                        option.badgeColor
                      )}
                    >
                      {option.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted leading-tight mt-0.5 truncate">
                    {option.detail}
                  </p>
                </div>
              </div>

              <CheckCircle2
                className={cn(
                  "size-4 text-primary shrink-0 ml-2 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

