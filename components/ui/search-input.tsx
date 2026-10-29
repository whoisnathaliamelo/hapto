import * as React from "react";
import { Search, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const searchInputVariants = cva(
  "relative flex w-full items-center rounded-xl border transition-all duration-200 shadow-2xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
  {
    variants: {
      variant: {
        default: "border-line bg-surface hover:border-primary/40",
        glass:
          "border-line bg-surface/90 backdrop-blur-md hover:border-primary/40",
      },
      searchSize: {
        // md: 44px (Padrão mínimo Apple HIG)
        md: "min-h-11 px-3 text-base sm:text-sm",
        // lg: 48px (Padrão ouro Hapto & WCAG - previne auto-zoom no iOS)
        lg: "min-h-12 px-3.5 text-base sm:text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      searchSize: "lg",
    },
  }
);

export interface SearchInputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof searchInputVariants> {
  value?: string;
  onClear?: () => void;
  startIcon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  endAction?: React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
}

export function SearchInput({
  className,
  variant,
  searchSize = "lg",
  value,
  defaultValue = "",
  onChange,
  onClear,
  startIcon,
  endAdornment,
  endAction,
  inputRef,
  placeholder = "Buscar...",
  disabled = false,
  id,
  ...props
}: SearchInputProps) {
  const generatedId = React.useId();
  const searchId = id ?? generatedId;
  const internalInputRef = React.useRef<HTMLInputElement>(null);
  const actualRef = (inputRef as React.RefObject<HTMLInputElement>) || internalInputRef;

  const [internalValue, setInternalValue] = React.useState(
    defaultValue as string
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue && String(currentValue).length > 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onClear?.();

    if (actualRef && "current" in actualRef && actualRef.current) {
      actualRef.current.focus();

      // Dispara evento sintético caso esteja sob controle de formulário
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(actualRef.current, "");
        const ev = new Event("input", { bubbles: true });
        actualRef.current.dispatchEvent(ev);
      }
    }
  };

  return (
    <div
      className={cn(
        searchInputVariants({ variant, searchSize }),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="flex shrink-0 items-center justify-center text-muted transition-colors focus-within:text-primary">
        {startIcon ?? <Search className="size-5 shrink-0" />}
      </div>

      <input
        ref={actualRef}
        id={searchId}
        type="search"
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={props["aria-label"] ?? placeholder}
        className="w-full bg-transparent px-3 text-base sm:text-sm text-ink placeholder:text-muted/70 focus:outline-none disabled:cursor-not-allowed [appearance:none] [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />

      <div className="flex shrink-0 items-center gap-1.5">
        {endAdornment}

        {hasValue && !disabled && (
          <button
            type="button"
            aria-label="Limpar campo de busca"
            onClick={handleClear}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-raised hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
            title="Limpar busca"
          >
            <X className="size-4" />
          </button>
        )}

        {endAction}
      </div>
    </div>
  );
}
