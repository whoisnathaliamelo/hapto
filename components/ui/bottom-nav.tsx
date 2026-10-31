import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const bottomNavVariants = cva(
  "relative flex items-center transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        standard:
          "h-14 w-full justify-around border-t border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm",
        "with-fab":
          "relative h-14 w-full justify-around border-t border-line/70 bg-surface-raised/80 px-1 backdrop-blur-sm",
        floating:
          "h-12 w-full max-w-[280px] justify-around rounded-full border border-line bg-surface/90 px-2 shadow-md backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

export type BottomNavVariant = NonNullable<
  VariantProps<typeof bottomNavVariants>["variant"]
>;

interface BottomNavContextValue {
  variant: BottomNavVariant;
}

const BottomNavContext = React.createContext<BottomNavContextValue>({
  variant: "standard",
});

export interface BottomNavProps
  extends React.ComponentProps<"nav">,
    VariantProps<typeof bottomNavVariants> {}

export function BottomNav({
  className,
  variant = "standard",
  children,
  ...props
}: BottomNavProps) {
  const resolvedVariant = variant ?? "standard";

  return (
    <BottomNavContext.Provider value={{ variant: resolvedVariant }}>
      <nav
        role="navigation"
        className={cn(bottomNavVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {children}
      </nav>
    </BottomNavContext.Provider>
  );
}

export interface BottomNavItemProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  label?: string;
  active?: boolean;
  badge?: number | string | boolean | React.ReactNode;
  variant?: BottomNavVariant;
}

export function BottomNavItem({
  icon,
  label,
  active = false,
  badge,
  variant: itemVariant,
  className,
  type = "button",
  title,
  children,
  ...props
}: BottomNavItemProps) {
  const context = React.useContext(BottomNavContext);
  const variant = itemVariant ?? context.variant;
  const isFloating = variant === "floating";

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return (
      <IconComponent
        className={cn(
          isFloating ? "size-4" : "size-4.5",
          "transition-transform",
          active && !isFloating && "scale-110"
        )}
      />
    );
  };

  if (isFloating) {
    return (
      <button
        type={type}
        aria-current={active ? "page" : undefined}
        title={title ?? label}
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-all active:scale-85 cursor-pointer",
          active
            ? "bg-primary text-on-primary shadow-xs"
            : "text-muted hover:bg-surface-raised hover:text-ink",
          className
        )}
        {...props}
      >
        {renderIcon()}
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      aria-current={active ? "page" : undefined}
      title={title ?? label}
      className={cn(
        "relative flex min-h-[44px] min-w-[48px] flex-1 flex-col items-center justify-center rounded-xl py-1 transition-transform active:scale-90 cursor-pointer",
        active ? "text-primary font-semibold" : "text-muted hover:text-ink",
        className
      )}
      {...props}
    >
      <div className="relative">
        {renderIcon()}
        {badge !== undefined && badge !== null && badge !== false && (
          <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-on-primary">
            {badge === true ? "" : badge}
          </span>
        )}
      </div>

      {label && <span className="text-[10px] tracking-tight">{label}</span>}

      {active && (
        <span className="absolute -top-[1px] h-0.5 w-6 rounded-full bg-primary" />
      )}
      {children}
    </button>
  );
}

export interface BottomNavFabProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  label?: string;
  badge?: number | string | boolean | React.ReactNode;
}

export function BottomNavFab({
  icon,
  label = "Criar",
  badge,
  className,
  type = "button",
  title = "Ação Primária Central",
  children,
  ...props
}: BottomNavFabProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className="size-5 stroke-[2.5]" />;
  };

  return (
    <div className="relative -mt-6 flex flex-col items-center justify-center">
      <button
        type={type}
        title={title}
        aria-label={props["aria-label"] ?? label}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-all hover:scale-105 active:scale-90 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
          className
        )}
        {...props}
      >
        {renderIcon()}
        {badge !== undefined && badge !== null && badge !== false && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-surface text-[9px] font-bold text-primary shadow-xs">
            {badge === true ? "" : badge}
          </span>
        )}
        {children}
      </button>
      {label && (
        <span className="mt-0.5 text-[9px] font-bold text-primary">
          {label}
        </span>
      )}
    </div>
  );
}
