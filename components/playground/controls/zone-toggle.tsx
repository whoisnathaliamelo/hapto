import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ZoneToggle({ checked, onChange }: ZoneToggleProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3.5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Layers className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-ink">Thumb Zone Overlay</p>
            <p className="text-[11px] text-muted">
              Mapa de alcance do polegar
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            checked ? "bg-primary" : "bg-line"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-line/50 pt-2 text-[10px] font-semibold">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              checked ? "bg-primary ring-2 ring-primary/20" : "bg-muted/30"
            )}
          />
          <span className={cn("transition-colors", checked ? "text-primary font-bold" : "text-muted/60")}>
            Natural
          </span>
        </div>
        <span className="text-line text-[9px]">•</span>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              checked ? "bg-amber-500 ring-2 ring-amber-500/20" : "bg-muted/30"
            )}
          />
          <span className={cn("transition-colors", checked ? "text-amber-600 dark:text-amber-400 font-bold" : "text-muted/60")}>
            Esticada
          </span>
        </div>
        <span className="text-line text-[9px]">•</span>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              checked ? "bg-rose-500 ring-2 ring-rose-500/20" : "bg-muted/30"
            )}
          />
          <span className={cn("transition-colors", checked ? "text-rose-600 dark:text-rose-400 font-bold" : "text-muted/60")}>
            Difícil
          </span>
        </div>
      </div>
    </div>
  );
}


