import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const topBarVariants = cva(
  "w-full shrink-0 transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        standard:
          "flex h-13 items-center justify-between border-b border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm",
        "large-title":
          "flex flex-col border-b border-line/70 bg-surface-raised/80 backdrop-blur-sm",
        contextual:
          "flex h-13 items-center justify-between border-b border-line/70 bg-primary/10 px-1 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

export type TopBarVariant = NonNullable<
  VariantProps<typeof topBarVariants>["variant"]
>;

interface TopBarContextValue {
  variant: TopBarVariant;
}

const TopBarContext = React.createContext<TopBarContextValue>({
  variant: "standard",
});

export interface TopBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof topBarVariants> {
  as?: "header" | "div" | "nav";
}

export function TopBar({
  className,
  variant = "standard",
  as: Component = "header",
  children,
  role = "banner",
  ...props
}: TopBarProps) {
  const resolvedVariant = variant ?? "standard";

  return (
    <TopBarContext.Provider value={{ variant: resolvedVariant }}>
      <Component
        role={role}
        className={cn(topBarVariants({ variant: resolvedVariant }), className)}
        {...(props as any)}
      >
        {children}
      </Component>
    </TopBarContext.Provider>
  );
}

export const topBarActionVariants = cva(
  "flex shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-ink hover:bg-surface active:scale-90",
        muted: "text-muted hover:bg-surface hover:text-ink active:scale-90",
        primary: "text-primary hover:bg-surface active:scale-90",
        destructive: "text-red-500 hover:bg-red-500/10 active:scale-90",
      },
      size: {
        sm: "size-9",
        md: "size-10",
        lg: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TopBarActionProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof topBarActionVariants> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
}

export function TopBarAction({
  className,
  variant = "default",
  size,
  icon,
  children,
  type = "button",
  ...props
}: TopBarActionProps) {
  const context = React.useContext(TopBarContext);
  const resolvedSize = size ?? (context.variant === "large-title" ? "sm" : "md");

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    const iconSizeClass = resolvedSize === "sm" ? "size-4" : "size-4.5";
    return <IconComponent className={iconSizeClass} />;
  };

  return (
    <button
      type={type}
      className={cn(
        topBarActionVariants({ variant, size: resolvedSize }),
        className
      )}
      {...props}
    >
      {renderIcon()}
      {children}
    </button>
  );
}

export interface TopBarTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "span" | "p";
  variant?: "standard" | "large";
}

export function TopBarTitle({
  as,
  variant: titleVariant,
  className,
  children,
  ...props
}: TopBarTitleProps) {
  const context = React.useContext(TopBarContext);
  const isLarge =
    titleVariant === "large" || (!titleVariant && context.variant === "large-title");

  const Component = as ?? (isLarge ? "h2" : "span");

  return (
    <Component
      className={cn(
        isLarge
          ? "text-base font-extrabold tracking-tight text-ink"
          : "truncate px-2 text-xs font-bold text-ink",
        className
      )}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}

export interface TopBarNavRowProps extends React.HTMLAttributes<HTMLElement> {
  as?: "header" | "div";
}

export function TopBarNavRow({
  as: Component = "header",
  className,
  ...props
}: TopBarNavRowProps) {
  return (
    <Component
      className={cn(
        "flex h-11 w-full items-center justify-between px-1",
        className
      )}
      {...(props as any)}
    />
  );
}

export interface TopBarLargeTitleAreaProps extends React.ComponentProps<"div"> {}

export function TopBarLargeTitleArea({
  className,
  ...props
}: TopBarLargeTitleAreaProps) {
  return <div className={cn("px-3.5 pb-2", className)} {...props} />;
}

export interface TopBarSectionProps extends React.ComponentProps<"div"> {
  gap?: "tight" | "normal";
}

export function TopBarSection({
  className,
  gap = "tight",
  ...props
}: TopBarSectionProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        gap === "tight" ? "gap-0.5" : "gap-1",
        className
      )}
      {...props}
    />
  );
}

export interface TopBarActionsProps extends React.ComponentProps<"div"> {}

export function TopBarActions({
  className,
  ...props
}: TopBarActionsProps) {
  return <div className={cn("flex items-center gap-0.5", className)} {...props} />;
}
