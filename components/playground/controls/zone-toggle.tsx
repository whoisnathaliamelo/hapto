import { Eye, EyeOff, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ZoneToggle({ checked, onChange }: ZoneToggleProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3.5 shadow-2xs">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Layers className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-ink">Thumb Zone Overlay</p>
            <p className="text-[11px] text-muted">
              Mapa de alcance visual do polegar
            </p>
          </div>
        </div>

        {/* Switch Toggle */}
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

      <div className="mt-3 flex items-center gap-2 border-t border-line/50 pt-2 text-[10px] text-muted">
        {checked ? (
          <>
            <Eye className="size-3 text-primary shrink-0" />
            <span>Zonas visíveis sobrepostas na tela do celular</span>
          </>
        ) : (
          <>
            <EyeOff className="size-3 text-muted shrink-0" />
            <span>Zonas ocultas (visão pura da aplicação)</span>
          </>
        )}
      </div>
    </div>
  );
}

