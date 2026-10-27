import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const checkboxBoxVariants = cva(
  "flex shrink-0 items-center justify-center border transition-all duration-200 select-none",
  {
    variants: {
      size: {
        md: "size-5 rounded-md", // 20px
        lg: "size-6 rounded-lg", // 24px (Padrão ouro Hapto)
      },
      state: {
        unchecked: "border-line bg-surface-raised/40 hover:border-primary/50",
        checked: "border-primary bg-primary text-on-primary shadow-xs",
        indeterminate: "border-primary bg-primary text-on-primary shadow-xs",
        error: "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400",
      },
    },
    defaultVariants: {
      size: "lg",
      state: "unchecked",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange">,
    VariantProps<typeof checkboxBoxVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  variant?: "default" | "card";
}

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  onChange,
  indeterminate = false,
  label,
  description,
  error,
  variant = "default",
  size = "lg",
  disabled = false,
  className,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = `${checkboxId}-desc`;
  const errorId = `${checkboxId}-error`;

  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  );

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onCheckedChange?.(e.target.checked);
    onChange?.(e);
  };

  const computedState = error
    ? "error"
    : indeterminate
    ? "indeterminate"
    : isChecked
    ? "checked"
    : "unchecked";

  const boxSizeClass = size === "md" ? "size-3.5 stroke-[2.5]" : "size-4 stroke-[2.5]";

  const touchTargetWrapperClass =
    size === "md"
      ? "relative inline-flex min-h-11 min-w-11 items-center justify-center"
      : "relative inline-flex min-h-12 min-w-12 items-center justify-center";

  const checkboxControl = (
    <div className={touchTargetWrapperClass}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={indeterminate ? "mixed" : isChecked}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : description ? descriptionId : undefined
        }
        className="peer sr-only"
        {...props}
      />
      <div
        className={cn(
          checkboxBoxVariants({ size, state: computedState }),
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {indeterminate ? (
          <Minus className={boxSizeClass} />
        ) : isChecked ? (
          <Check className={boxSizeClass} />
        ) : null}
      </div>
    </div>
  );

  if (!label && !description && !error) {
    return checkboxControl;
  }

  const containerVariants = {
    default: cn(
      "flex min-h-12 items-center gap-3 cursor-pointer select-none rounded-xl p-1 transition-colors hover:bg-surface-raised/50",
      disabled && "cursor-not-allowed opacity-50"
    ),
    card: cn(
      "flex min-h-12 w-full cursor-pointer select-none items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-2xs transition-all hover:border-primary/50 active:scale-[0.99]",
      disabled && "cursor-not-allowed opacity-50"
    ),
  };

  return (
    <div className="w-full space-y-1">
      <label htmlFor={checkboxId} className={containerVariants[variant]}>
        {/* Checkbox box control - no container padding when in label/card */}
        <div className="relative flex shrink-0 items-center justify-center">
          <input
            id={checkboxId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-checked={indeterminate ? "mixed" : isChecked}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : description ? descriptionId : undefined
            }
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              checkboxBoxVariants({ size, state: computedState }),
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface",
              className
            )}
          >
            {indeterminate ? (
              <Minus className={boxSizeClass} />
            ) : isChecked ? (
              <Check className={boxSizeClass} />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-bold text-ink leading-snug">
              {label}
            </span>
          )}
          {description && (
            <span
              id={descriptionId}
              className="text-[10px] text-muted leading-relaxed"
            >
              {description}
            </span>
          )}
        </div>
      </label>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-rose-600 dark:text-rose-400 pl-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}
