import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#pilares", label: "Pilares" },
  { href: "#modulos", label: "Módulos" },
  { href: "#ensina", label: "Aprenda" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" aria-label="Hapto, início"><Logo /></a>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-ink">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#modulos" className={cn(buttonVariants({ size: "md" }), "hidden sm:inline-flex")}>
            Explorar
          </a>
        </div>
      </nav>
    </header>
  );
}
