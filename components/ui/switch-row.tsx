import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "./switch";

export interface SwitchRowProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  disabled?: boolean;
}

export function SwitchRow({
  checked = false,
  onCheckedChange,
  label,
  description,
  icon,
  iconClassName,
  disabled = false,
  className,
  ...props
}: SwitchRowProps) {
  const generatedId = React.useId();
  const switchId = props.id ?? generatedId;
  const descriptionId = `${switchId}-desc`;

  const handleToggle = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className="size-4.5" />;
  };

  return (
    <div
      role="switch"
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-label={label}
      aria-describedby={description ? descriptionId : undefined}
      aria-disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex min-h-14 w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 shadow-2xs select-none transition-all duration-200",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-primary/50 hover:bg-surface-raised/30 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary shadow-2xs",
              iconClassName
            )}
          >
            {renderIcon()}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-ink leading-snug">
            {label}
          </span>
          {description && (
            <span
              id={descriptionId}
              className="text-[10px] text-muted leading-relaxed"
            >
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 pointer-events-none">
        <Switch
          id={switchId}
          checked={checked}
          disabled={disabled}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}

// Alias SettingRow para uso semântico em telas de ajustes
export const SettingRow = SwitchRow;
