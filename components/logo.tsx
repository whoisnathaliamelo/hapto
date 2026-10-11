import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center tracking-tight text-ink", className)}>
      <span className="text-2xl font-bold tracking-tight text-ink">
        hapto<span className="text-primary">.</span>
      </span>
    </span>
  );
}
