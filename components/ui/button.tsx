import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary shadow-sm hover:bg-primary-hover hover:shadow-md",
        secondary:
          "bg-surface-raised text-ink border border-line hover:border-primary/50",
        outline:
          "border border-line bg-surface/80 text-ink backdrop-blur-sm hover:border-primary hover:text-primary",
        ghost:
          "text-ink hover:bg-surface-raised hover:text-primary",
      },
      size: {
        sm: "min-h-10 px-4 text-xs font-semibold",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-7 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

type Props = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
