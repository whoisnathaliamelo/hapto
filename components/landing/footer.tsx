import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ fluid = false }: { fluid?: boolean } = {}) {
  return (
    <footer className="border-t border-line/60 bg-surface/40 py-4">
      <div
        className={cn(
          "mx-auto flex flex-col items-center justify-between gap-3 px-6 text-xs text-muted sm:flex-row transition-all",
          fluid ? "w-full max-w-[1600px] lg:px-8 xl:px-12" : "max-w-6xl"
        )}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="transition hover:opacity-80" aria-label="Hapto início">
            <Logo />
          </Link>
          <span className="hidden text-line sm:inline">•</span>
          <span className="text-[11px]">Design system para ergonomia mobile</span>
        </div>

        <div className="flex items-center gap-5 text-[11px]">
          <Link href="/fundamentals" className="transition hover:text-ink">
            Início & Fundamento
          </Link>
          <Link href="/components" className="transition hover:text-ink">
            Catálogo de Componentes
          </Link>
          <Link href="/playground" className="transition hover:text-ink">
            Playground
          </Link>
        </div>

        <span className="text-[11px] opacity-75">
          © <CurrentYear /> Hapto
        </span>
      </div>
    </footer>
  );
}
