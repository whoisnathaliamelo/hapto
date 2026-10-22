"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Palette, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    anchorHref: "#fundamentos",
    pageHref: "/fundamentals",
    label: "Início & Fundamento",
    icon: BookOpen,
  },
  {
    anchorHref: "#componentes",
    pageHref: "/components",
    label: "Catálogo de Componentes",
    icon: Palette,
  },
  {
    anchorHref: "#playground",
    pageHref: "/playground",
    label: "Playground",
    icon: Terminal,
  },
];

export function Navbar({ fluid = false }: { fluid?: boolean } = {}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, "", "/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between px-6 transition-all",
          fluid ? "w-full max-w-[1600px] lg:px-8 xl:px-12" : "max-w-6xl"
        )}
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          className="transition hover:opacity-80 shrink-0"
          aria-label="Hapto início"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Módulos do Design System">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 shadow-xs">
            {modules.map(({ anchorHref, pageHref, label }, index) => {
              const targetHref = isHome ? anchorHref : pageHref;
              const isActive = !isHome && pathname === pageHref;

              return (
                <li key={pageHref}>
                  {isHome ? (
                    <a
                      href={targetHref}
                      onClick={(e) => handleScroll(e, targetHref)}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-muted transition-all hover:bg-surface-raised hover:text-ink active:scale-95",
                        isActive && "bg-surface-raised text-ink"
                      )}
                    >
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary">
                        {index + 1}
                      </span>
                      <span>{label}</span>
                    </a>
                  ) : (
                    <Link
                      href={targetHref}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-muted transition-all hover:bg-surface-raised hover:text-ink active:scale-95",
                        isActive && "bg-surface-raised text-ink shadow-2xs font-bold"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full text-[10px] font-bold",
                          isActive
                            ? "bg-primary text-on-primary"
                            : "bg-primary-light text-primary"
                        )}
                      >
                        {index + 1}
                      </span>
                      <span>{label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
        </div>
      </div>

      <div className="border-t border-line/40 bg-surface/40 px-4 py-2 md:hidden">
        <ul className="flex items-center justify-around gap-1 text-[11px] font-medium text-muted">
          {modules.map(({ anchorHref, pageHref, label }, idx) => {
            const targetHref = isHome ? anchorHref : pageHref;
            const isActive = !isHome && pathname === pageHref;

            return (
              <li key={pageHref}>
                {isHome ? (
                  <a
                    href={targetHref}
                    onClick={(e) => handleScroll(e, targetHref)}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:text-ink active:bg-surface-raised"
                  >
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <span>{label.split(" ")[0]}</span>
                  </a>
                ) : (
                  <Link
                    href={targetHref}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:text-ink active:bg-surface-raised",
                      isActive && "font-bold text-primary"
                    )}
                  >
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <span>{label.split(" ")[0]}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
