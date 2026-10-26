import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "flex w-full rounded-xl border bg-surface text-ink transition-all duration-200 placeholder:text-muted/60 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-line hover:border-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        error:
          "border-rose-500/80 text-rose-950 dark:text-rose-200 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/20",
        success:
          "border-emerald-500/80 text-emerald-950 dark:text-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20",
      },
      inputSize: {
        // md: 44px (Padrão mínimo Apple HIG)
        md: "min-h-11 px-3.5 text-base",
        // lg: 48px (Padrão ouro Hapto & WCAG - previne auto-zoom no iOS)
        lg: "min-h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "lg",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export function Input({
  className,
  variant,
  inputSize,
  type = "text",
  startIcon,
  endIcon,
  error,
  helperText,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const computedVariant = error ? "error" : variant;

  return (
    <div className="w-full space-y-1.5">
      <div className="relative flex items-center">
        {startIcon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center justify-center text-muted">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            inputVariants({ variant: computedVariant, inputSize }),
            startIcon && "pl-11",
            endIcon && "pr-11",
            className
          )}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3.5 flex items-center justify-center text-muted">
            {endIcon}
          </div>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
