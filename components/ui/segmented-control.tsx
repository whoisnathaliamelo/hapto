import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const segmentedControlVariants = cva(
  "inline-flex items-center border border-line bg-surface select-none shadow-xs transition-colors",
  {
    variants: {
      variant: {
        default: "border-line bg-surface",
        raised: "border-line/80 bg-surface-raised/70",
        outline: "border-line bg-transparent",
      },
      shape: {
        rounded: "rounded-xl p-1 gap-1",
        pill: "rounded-full p-1 gap-1",
      },
      size: {
        // sm: 32px de altura (densidade alta / espaço reduzido)
        sm: "min-h-8 p-0.5 gap-0.5 text-xs",
        // md: 40px de altura (padrão desktop / cards)
        md: "min-h-10 p-1 gap-1 text-xs",
        // lg: 48px de altura (Padrão Ouro Hapto & WCAG - alvo de toque do polegar)
        lg: "min-h-12 p-1 gap-1.5 text-sm",
      },
      fullWidth: {
        true: "w-full flex",
        false: "w-auto inline-flex",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      size: "md",
      fullWidth: false,
    },
  }
);

export const segmentedItemVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-semibold transition-all duration-200 select-none cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "",
        surface: "",
        subtle: "",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
      size: {
        sm: "min-h-7 px-2.5 py-1 text-xs gap-1",
        md: "min-h-8 px-3 py-1.5 text-xs gap-1.5",
        lg: "min-h-10 px-4 py-2 text-sm gap-2",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        variant: "primary",
        className:
          "bg-primary text-on-primary shadow-xs font-bold",
      },
      {
        selected: false,
        variant: "primary",
        className:
          "text-muted hover:bg-surface-raised hover:text-ink",
      },
      {
        selected: true,
        variant: "surface",
        className:
          "bg-surface text-ink font-bold shadow-xs border border-line/80 ring-1 ring-primary/20",
      },
      {
        selected: false,
        variant: "surface",
        className:
          "text-muted hover:text-ink hover:bg-surface/50 font-medium",
      },
      {
        selected: true,
        variant: "subtle",
        className:
          "bg-primary-light text-primary border border-primary/30 font-bold shadow-2xs",
      },
      {
        selected: false,
        variant: "subtle",
        className:
          "text-muted hover:bg-surface-raised hover:text-ink",
      },
    ],
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
      size: "md",
      selected: false,
    },
  }
);

interface SegmentedControlContextValue {
  value: string;
  onValueChange: (val: string) => void;
  size: "sm" | "md" | "lg";
  shape: "rounded" | "pill";
  itemVariant: "primary" | "surface" | "subtle";
  fullWidth: boolean;
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControl() {
  const ctx = React.useContext(SegmentedControlContext);
  if (!ctx) {
    throw new Error(
      "SegmentedControlItem deve ser usado dentro de um SegmentedControl"
    );
  }
  return ctx;
}

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  detail?: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof segmentedControlVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  itemVariant?: "primary" | "surface" | "subtle";
  options?: SegmentedControlOption[];
}

export function SegmentedControl({
  className,
  variant,
  shape = "rounded",
  size = "md",
  fullWidth = false,
  itemVariant = "primary",
  value: controlledValue,
  defaultValue,
  onValueChange,
  options,
  children,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? options?.[0]?.value ?? ""
  );

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newVal: string) => {
      if (!isControlled) {
        setInternalValue(newVal);
      }
      onValueChange?.(newVal);
    },
    [isControlled, onValueChange]
  );

  const contextValue = React.useMemo<SegmentedControlContextValue>(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      size: size ?? "md",
      shape: shape ?? "rounded",
      itemVariant: itemVariant ?? "primary",
      fullWidth: fullWidth ?? false,
    }),
    [activeValue, handleValueChange, size, shape, itemVariant, fullWidth]
  );

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <div
        role="tablist"
        className={cn(
          segmentedControlVariants({
            variant,
            shape,
            size,
            fullWidth,
          }),
          className
        )}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <SegmentedControlItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                icon={opt.icon}
                detail={opt.detail}
              >
                {opt.label}
              </SegmentedControlItem>
            ))
          : children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export interface SegmentedControlItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  detail?: string;
}

export function SegmentedControlItem({
  value,
  icon,
  detail,
  className,
  children,
  disabled,
  onClick,
  ...props
}: SegmentedControlItemProps) {
  const {
    value: activeValue,
    onValueChange,
    size,
    shape,
    itemVariant,
    fullWidth,
  } = useSegmentedControl();

  const isSelected = activeValue === value;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onValueChange(value);
    onClick?.(e);
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    const iconSizeClass =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-4.5" : "size-4";
    return <IconComponent className={cn(iconSizeClass, "shrink-0")} />;
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        segmentedItemVariants({
          variant: itemVariant,
          shape,
          size,
          selected: isSelected,
        }),
        fullWidth && "flex-1",
        className
      )}
      {...props}
    >
      {renderIcon()}
      {children && <span>{children}</span>}
      {detail && (
        <span
          className={cn(
            "text-[10px] transition-opacity",
            isSelected ? "opacity-90" : "opacity-60"
          )}
        >
          {detail}
        </span>
      )}
    </button>
  );
}
