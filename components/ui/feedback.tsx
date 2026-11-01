import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const feedbackVariants = cva(
  "transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        snackbar:
          "flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-surface-raised/95 p-2 shadow-sm backdrop-blur-sm",
        banner:
          "flex w-full flex-col gap-1 rounded-xl border p-2 shadow-xs",
        floating:
          "flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3 py-1.5 shadow-md backdrop-blur-sm",
      },
      status: {
        default: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      fixed: {
        true: "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-2",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "banner",
        status: "default",
        className: "border-line bg-surface text-ink",
      },
      {
        variant: "banner",
        status: "warning",
        className: "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100",
      },
      {
        variant: "banner",
        status: "success",
        className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
      },
      {
        variant: "banner",
        status: "error",
        className: "border-red-500/30 bg-red-500/10 text-red-950 dark:text-red-100",
      },
      {
        variant: "banner",
        status: "info",
        className: "border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-100",
      },
    ],
    defaultVariants: {
      variant: "snackbar",
      status: "default",
      fixed: false,
    },
  }
);

export type FeedbackVariant = NonNullable<
  VariantProps<typeof feedbackVariants>["variant"]
>;

export type FeedbackStatus = NonNullable<
  VariantProps<typeof feedbackVariants>["status"]
>;

interface FeedbackContextValue {
  variant: FeedbackVariant;
  status: FeedbackStatus;
}

const FeedbackContext = React.createContext<FeedbackContextValue>({
  variant: "snackbar",
  status: "default",
});

export interface FeedbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedbackVariants> {
  as?: "div" | "aside" | "section";
}

export function Feedback({
  className,
  variant = "snackbar",
  status = "default",
  fixed = false,
  as: Component = "div",
  role,
  "aria-live": ariaLive,
  children,
  ...props
}: FeedbackProps) {
  const resolvedVariant = variant ?? "snackbar";
  const resolvedStatus = status ?? "default";

  const defaultRole =
    role ?? (resolvedVariant === "banner" || resolvedStatus === "warning" || resolvedStatus === "error"
      ? "alert"
      : "status");

  const defaultAriaLive =
    ariaLive ?? (defaultRole === "alert" ? "assertive" : "polite");

  return (
    <FeedbackContext.Provider
      value={{ variant: resolvedVariant, status: resolvedStatus }}
    >
      <Component
        role={defaultRole}
        aria-live={defaultAriaLive}
        className={cn(
          feedbackVariants({
            variant: resolvedVariant,
            status: resolvedStatus,
            fixed,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </FeedbackContext.Provider>
  );
}

export interface FeedbackIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
}

export function FeedbackIcon({
  icon,
  className,
  children,
  ...props
}: FeedbackIconProps) {
  const { variant, status } = React.useContext(FeedbackContext);

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-emerald-500";
      case "warning":
        return "text-amber-600";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return variant === "floating" ? "text-primary" : "text-ink";
    }
  };

  const iconSizeClass = variant === "snackbar" ? "size-4" : "size-3.5";

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className={cn(iconSizeClass, "shrink-0", getStatusColor())} />;
  };

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      {...props}
    >
      {renderIcon()}
      {children}
    </span>
  );
}

export interface FeedbackTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: "span" | "h4" | "p" | "div";
}

export function FeedbackTitle({
  as: Component = "span",
  className,
  ...props
}: FeedbackTitleProps) {
  const { variant } = React.useContext(FeedbackContext);

  const variantStyles = {
    snackbar: "truncate text-[11px] font-medium text-ink",
    banner: "truncate text-[11px] font-bold text-ink",
    floating: "text-[11px] font-semibold text-ink",
  }[variant];

  return <Component className={cn(variantStyles, className)} {...props} />;
}

export interface FeedbackDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span";
}

export function FeedbackDescription({
  as: Component = "span",
  className,
  ...props
}: FeedbackDescriptionProps) {
  return (
    <Component
      className={cn("text-[10px] text-muted", className)}
      {...props}
    />
  );
}

export interface FeedbackActionsProps extends React.ComponentProps<"div"> {}

export function FeedbackActions({
  className,
  ...props
}: FeedbackActionsProps) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}

export const feedbackActionVariants = cva(
  "inline-flex items-center justify-center font-bold transition-all cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "h-7 gap-1 rounded-lg px-2 text-[11px] text-primary hover:bg-primary/10 active:scale-90",
        secondary:
          "rounded px-2 py-0.5 text-[10px] active:scale-90",
        ghost:
          "rounded-lg p-1 text-muted hover:bg-surface hover:text-ink active:scale-90",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface FeedbackActionProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof feedbackActionVariants> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
}

export function FeedbackAction({
  variant,
  icon,
  className,
  children,
  type = "button",
  ...props
}: FeedbackActionProps) {
  const { variant: containerVariant, status } = React.useContext(FeedbackContext);
  const resolvedVariant = variant ?? (containerVariant === "banner" ? "secondary" : "primary");

  const getSecondaryStatusClasses = () => {
    switch (status) {
      case "warning":
        return "bg-amber-600/20 text-amber-700 dark:text-amber-300 hover:bg-amber-600/30";
      case "success":
        return "bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/30";
      case "error":
        return "bg-red-600/20 text-red-700 dark:text-red-300 hover:bg-red-600/30";
      case "info":
        return "bg-blue-600/20 text-blue-700 dark:text-blue-300 hover:bg-blue-600/30";
      default:
        return "bg-surface-raised text-ink hover:bg-surface-raised/80";
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className="size-3 shrink-0" />;
  };

  return (
    <button
      type={type}
      className={cn(
        feedbackActionVariants({ variant: resolvedVariant }),
        resolvedVariant === "secondary" && getSecondaryStatusClasses(),
        className
      )}
      {...props}
    >
      {renderIcon()}
      {children}
    </button>
  );
}

export interface FeedbackCloseProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
}

export function FeedbackClose({
  className,
  icon,
  "aria-label": ariaLabel = "Dispensar notificação",
  type = "button",
  ...props
}: FeedbackCloseProps) {
  const { variant } = React.useContext(FeedbackContext);

  const containerClasses = {
    snackbar:
      "flex size-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink active:scale-90 cursor-pointer",
    banner:
      "flex size-5 shrink-0 items-center justify-center rounded text-muted transition-colors hover:text-ink active:scale-90 cursor-pointer",
    floating:
      "ml-1 flex size-5 items-center justify-center rounded-full text-muted hover:bg-surface-raised hover:text-ink active:scale-80 cursor-pointer",
  }[variant];

  const iconSizeClass = variant === "snackbar" ? "size-3.5" : "size-3";

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cn(containerClasses, className)}
      {...props}
    >
      {icon ? (
        React.isValidElement(icon) ? (
          icon
        ) : (
          React.createElement(icon as React.ComponentType<{ className?: string }>, {
            className: iconSizeClass,
          })
        )
      ) : (
        <X className={iconSizeClass} />
      )}
    </button>
  );
}

// Preset aliases
export function Snackbar(props: FeedbackProps) {
  return <Feedback variant="snackbar" {...props} />;
}

export function AlertBanner(props: FeedbackProps) {
  return <Feedback variant="banner" role="alert" {...props} />;
}

export function Toast(props: FeedbackProps) {
  return <Feedback variant="floating" {...props} />;
}
