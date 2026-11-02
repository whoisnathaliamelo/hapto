import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const chipVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-all duration-200 select-none cursor-pointer active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        outline:
          "border border-line bg-surface text-muted hover:border-primary/50 hover:text-ink",
        filled:
          "border border-line/60 bg-surface-raised text-ink hover:border-primary/40",
        subtle:
          "border border-primary/30 bg-primary-light text-primary",
        primary:
          "border-primary bg-primary text-on-primary shadow-2xs hover:bg-primary-hover",
      },
      size: {
        // sm: 28px de altura (sugestões rápidas e tags compactas)
        sm: "min-h-7 px-2.5 text-[11px] rounded-lg",
        // md: 36px de altura (filtros intermediários)
        md: "min-h-9 px-3 text-xs rounded-xl",
        // lg: 44px de altura (Padrão mínimo Apple HIG / Hapto Mobile para polegar)
        lg: "min-h-11 px-4 text-sm rounded-xl",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        variant: "outline",
        className: "border-primary bg-primary-light text-primary font-semibold shadow-2xs",
      },
      {
        selected: true,
        variant: "filled",
        className: "border-primary bg-primary text-on-primary font-semibold shadow-2xs",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "lg",
      selected: false,
    },
  }
);

export interface ChipProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof chipVariants>, "selected"> {
  selected?: boolean;
  active?: boolean;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function Chip({
  className,
  variant = "outline",
  size = "lg",
  selected,
  active,
  icon,
  onDismiss,
  dismissLabel = "Remover filtro",
  type = "button",
  children,
  ...props
}: ChipProps) {
  const isSelected = selected ?? active ?? false;

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    const iconSizeClass =
      size === "sm" ? "size-3" : size === "md" ? "size-3.5" : "size-4";
    return <IconComponent className={cn(iconSizeClass, "shrink-0")} />;
  };

  return (
    <button
      type={type}
      aria-pressed={isSelected}
      className={cn(
        chipVariants({ variant, size, selected: isSelected }),
        className
      )}
      {...props}
    >
      {renderIcon()}

      <span>{children}</span>

      {onDismiss && (
        <span
          role="button"
          tabIndex={0}
          aria-label={dismissLabel}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onDismiss();
            }
          }}
          className="ml-0.5 -mr-1 flex size-4 items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 transition-opacity"
        >
          <X className="size-3" />
        </span>
      )}
    </button>
  );
}

// Alias FilterChip para semântica de filtros
export const FilterChip = Chip;
