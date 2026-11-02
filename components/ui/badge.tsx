import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-bold uppercase tracking-wider select-none border transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-primary/30 bg-primary/10 text-primary",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
        info:
          "border-blue-500/30 bg-blue-500/10 text-blue-600",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-600",
        danger:
          "border-rose-500/30 bg-rose-500/10 text-rose-600",
        purple:
          "border-purple-500/30 bg-purple-500/10 text-purple-600",
        neutral:
          "border-line/60 bg-surface-raised text-muted",
        outline:
          "border-line bg-surface text-ink",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
      size: {
        sm: "text-[9px] px-1.5 py-0.25 gap-1",
        md: "text-[10px] px-2 py-0.5 gap-1.5",
        lg: "text-xs px-2.5 py-1 gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "primary",
  shape = "rounded",
  size = "md",
  icon,
  dot = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    const iconSizeClass =
      size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3";
    return <IconComponent className={cn(iconSizeClass, "shrink-0")} />;
  };

  return (
    <span
      className={cn(badgeVariants({ variant, shape, size }), className)}
      {...props}
    >
      {dot && (
        <span className="relative flex size-1.5 shrink-0">
          {pulse && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      )}

      {renderIcon()}

      {children && <span>{children}</span>}
    </span>
  );
}
