import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("size-8", className)} aria-hidden>
      <path d="M9 5C4.5 11.5 4.5 20.5 9 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 5c4.5 6.5 4.5 15.5 0 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M9.5 16h13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3.5" className="origin-center animate-ripple fill-primary [transform-box:fill-box]" />
      <circle cx="16" cy="16" r="3.5" className="fill-primary" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <LogoMark />
      <span className="text-2xl font-semibold tracking-tight">hapto</span>
    </span>
  );
}
