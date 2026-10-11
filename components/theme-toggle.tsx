"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-surface-raised active:scale-95"
    >
      <Sun className="size-[18px] transition-transform duration-300 dark:hidden" />
      <Moon className="hidden size-[18px] transition-transform duration-300 dark:block text-primary" />
    </button>
  );
}
