import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva(
  "rounded-2xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-line bg-surface text-ink shadow-2xs",
        interactive:
          "group cursor-pointer border-line bg-surface text-ink shadow-2xs hover:border-primary/50 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary",
        raised:
          "border-line/80 bg-surface-raised text-ink shadow-sm hover:shadow-md",
        outline:
          "border-line bg-surface/80 text-ink backdrop-blur-sm",
        ghost:
          "border-transparent bg-transparent text-ink hover:bg-surface-raised/60",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  as?: "article" | "div" | "section";
}

export function Card({
  as: Component = "article",
  className,
  variant,
  padding,
  onClick,
  ...props
}: CardProps) {
  const computedVariant = variant ?? (onClick ? "interactive" : "default");

  return (
    <Component
      onClick={onClick}
      className={cn(
        cardVariants({ variant: computedVariant, padding }),
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-base font-bold text-ink leading-snug transition-colors group-hover:text-primary",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs leading-relaxed text-muted", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex-1", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-line/40 pt-2.5 text-xs font-semibold text-primary",
        className
      )}
      {...props}
    />
  );
}

export interface CardActionProps extends React.ComponentProps<"button"> {
  size?: "md" | "lg";
}

/**
 * CardAction isola ações secundárias dentro de um Card interativo.
 * Aplica stopPropagation automático e área de toque calibrada (44px/48px).
 */
export function CardAction({
  onClick,
  className,
  size = "md",
  ...props
}: CardActionProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl transition-all active:scale-90 focus-visible:outline-2 focus-visible:outline-primary",
        size === "md" ? "size-11" : "size-12",
        className
      )}
      {...props}
    />
  );
}
