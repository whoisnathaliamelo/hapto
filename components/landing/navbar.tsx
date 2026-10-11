"use client";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Palette, Terminal } from "lucide-react";

const modules = [
  { href: "#fundamentos", label: "Início & Fundamento", icon: BookOpen },
  { href: "#tokens", label: "Design Tokens", icon: Palette },
  { href: "#playground", label: "Playground", icon: Terminal },
];

export function Navbar() {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <a href="#" className="transition hover:opacity-80 shrink-0" aria-label="Hapto início">
          <Logo />
        </a>

        {/* Módulos centralizados na Nav */}
        <nav className="hidden items-center md:flex" aria-label="Módulos do Design System">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 shadow-xs">
            {modules.map(({ href, label }, index) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleScroll(e, href)}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-muted transition-all hover:bg-surface-raised hover:text-ink active:scale-95"
                >
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle no canto direito */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
        </div>
      </div>

      {/* Menu mobile de módulos */}
      <div className="border-t border-line/40 bg-surface/40 px-4 py-2 md:hidden">
        <ul className="flex items-center justify-around gap-1 text-[11px] font-medium text-muted">
          {modules.map(({ href, label }, idx) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleScroll(e, href)}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:text-ink active:bg-surface-raised"
              >
                <span className="font-bold text-primary">{idx + 1}.</span>
                <span>{label.split(" ")[0]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
