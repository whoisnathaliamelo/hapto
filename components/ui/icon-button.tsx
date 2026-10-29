import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-line bg-surface text-muted hover:border-primary/50 hover:text-ink shadow-2xs",
        outline:
          "border border-line bg-surface text-ink hover:border-primary hover:text-primary shadow-2xs",
        ghost:
          "text-muted hover:bg-surface-raised hover:text-ink",
        primary:
          "bg-primary text-on-primary hover:bg-primary-hover shadow-xs",
        secondary:
          "border border-line bg-surface-raised text-ink hover:border-primary/50",
      },
      size: {
        // sm: 40px (Espaços compactos)
        sm: "size-10",
        // md: 44px (Padrão mínimo Apple HIG)
        md: "size-11",
        // lg: 48px (Padrão ouro Hapto & WCAG)
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

export interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  badge?: boolean | React.ReactNode;
  badgePing?: boolean;
}

export function IconButton({
  className,
  variant,
  size = "lg",
  badge,
  badgePing = true,
  type = "button",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}

      {badge === true && (
        <span className="absolute top-2.5 right-2.5 flex size-2.5 pointer-events-none">
          {badgePing && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          )}
          <span className="relative inline-flex size-2.5 rounded-full bg-primary shadow-2xs" />
        </span>
      )}

      {typeof badge === "number" || typeof badge === "string" ? (
        <span className="absolute -top-1 -right-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary shadow-xs pointer-events-none">
          {badge}
        </span>
      ) : typeof badge === "object" && badge !== null ? (
        <span className="absolute -top-1 -right-1 pointer-events-none">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
