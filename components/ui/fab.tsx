import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const fabVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary shadow-md shadow-primary/25 hover:bg-primary-hover hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
        secondary:
          "border border-line bg-surface-raised text-ink shadow-md hover:border-primary/50 hover:bg-surface hover:scale-105",
        surface:
          "border border-line bg-surface text-ink shadow-md hover:border-primary/50 hover:scale-105",
        contrast:
          "bg-ink text-surface shadow-md hover:opacity-90 hover:scale-105",
      },
      size: {
        // sm: 40px (Mini FAB para espaços compactos)
        sm: "size-10 text-xs",
        // md: 48px (Padrão ouro Hapto & WCAG)
        md: "size-12 text-sm",
        // lg: 56px (Padrão Ouro FAB para polegar)
        lg: "size-14 text-base",
      },
      extended: {
        true: "w-auto px-5 rounded-full gap-2",
        false: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      extended: false,
    },
  }
);

export type FabPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "none";

const POSITION_CLASSES: Record<FabPosition, string> = {
  "bottom-right": "fixed bottom-6 right-6 z-40",
  "bottom-left": "fixed bottom-6 left-6 z-40",
  "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
  none: "",
};

export interface FabProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof fabVariants>, "extended"> {
  extended?: boolean;
  position?: FabPosition;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  label?: string;
  badge?: boolean | React.ReactNode;
}

export function Fab({
  className,
  variant = "primary",
  size = "lg",
  extended = false,
  position = "none",
  icon,
  label,
  badge,
  type = "button",
  children,
  ...props
}: FabProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    const iconSizeClass =
      size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6 stroke-[2.5]";
    return <IconComponent className={iconSizeClass} />;
  };

  const positionClass = POSITION_CLASSES[position];

  return (
    <button
      type={type}
      aria-label={label ?? (typeof children === "string" ? children : "Ação rápida")}
      className={cn(
        fabVariants({ variant, size, extended }),
        positionClass,
        className
      )}
      {...props}
    >
      {renderIcon()}

      {extended && label && <span>{label}</span>}

      {children}

      {!extended && label && !children && (
        <span className="sr-only">{label}</span>
      )}

      {badge === true && (
        <span className="absolute top-1.5 right-1.5 flex size-2.5 pointer-events-none">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-primary shadow-2xs" />
        </span>
      )}

      {(typeof badge === "number" || typeof badge === "string") && (
        <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary shadow-xs pointer-events-none">
          {badge}
        </span>
      )}

      {typeof badge === "object" && badge !== null && (
        <span className="absolute -top-1 -right-1 pointer-events-none">
          {badge}
        </span>
      )}
    </button>
  );
}

// Alias FAB para conveniência
export const FAB = Fab;
