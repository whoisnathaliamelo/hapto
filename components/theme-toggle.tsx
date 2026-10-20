"use client";

import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Aplica a classe de forma síncrona: o next-themes só altera o <html> num useEffect,
    // o que fazia a View Transition capturar o "novo" estado ainda com o tema antigo.
    const applyTheme = () => {
      root.classList.toggle("dark", nextTheme === "dark");
      root.style.colorScheme = nextTheme;
      flushSync(() => setTheme(nextTheme));
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("startViewTransition" in document) || reduceMotion) {
      applyTheme();
      return;
    }

    // Desliga as transições CSS por elemento durante o cross-fade, evitando animação dupla (e travada)
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(applyTheme);
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      type="button"
      aria-label="Alternar tema claro/escuro"
      onClick={toggleTheme}
      className="group relative inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-all duration-300 hover:border-primary/50 hover:bg-surface-raised active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="relative size-[18px]">
        {/* Ícone Sol: rotaciona e desvanece suavemente ao entrar no dark mode */}
        <Sun className="absolute inset-0 size-[18px] text-ink rotate-0 scale-100 transition-all duration-300 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0" />
        {/* Ícone Lua: rotaciona e surge suavemente ao entrar no dark mode */}
        <Moon className="absolute inset-0 size-[18px] text-primary rotate-90 scale-0 opacity-0 transition-all duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
      </div>
    </button>
  );
}
