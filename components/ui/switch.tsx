import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean; 
    className?: string;
    id?: string;
    
}

export function Switch({
  checked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className,
  id,
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const generatedId = React.useId();
  const switchId = id ?? generatedId;
  const descriptionId = `${switchId}-desc`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const switchControl = (
    <div className="relative inline-flex min-h-12 min-w-12 items-center justify-center">
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-line",
          className
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-6 rounded-full bg-surface shadow-md ring-0 transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );

  if (!label && !description) {
    return switchControl;
  }

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "flex min-h-12 items-center justify-between gap-4 cursor-pointer select-none rounded-xl p-1 transition-colors hover:bg-surface-raised/50",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex flex-col">
        {label && (
          <span className="text-xs font-bold text-ink leading-snug">
            {label}
          </span>
        )}
        {description && (
          <span id={descriptionId} className="text-[11px] text-muted leading-relaxed">
            {description}
          </span>
        )}
      </div>
      {switchControl}
    </label>
  );
}
