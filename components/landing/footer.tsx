import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface/40 py-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden text-line sm:inline">•</span>
          <span className="text-[11px]">Design system para ergonomia mobile</span>
        </div>

        <div className="flex items-center gap-5 text-[11px]">
          <a href="#fundamentos" className="transition hover:text-ink">Início & Fundamento</a>
          <a href="#tokens" className="transition hover:text-ink">Design Tokens</a>
          <a href="#playground" className="transition hover:text-ink">Playground</a>
        </div>

        <span className="text-[11px] opacity-75">
          © {new Date().getFullYear()} Hapto
        </span>
      </div>
    </footer>
  );
}
