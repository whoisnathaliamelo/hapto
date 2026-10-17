"use client";

import { useState } from "react";
import { Check, Code2, Copy, Eye } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, SECTION_ICONS, SECTIONS } from "./constants";
import type { ComponentSection } from "./types";

interface ShowcaseCardProps {
  id: string;
  section: Exclude<ComponentSection, "all">;
  title: string;
  description: string;
  children?: React.ReactNode;
  placeholder?: string;
  delay: number;
  code?: string;
}

export function ShowcaseCard({
  id,
  section,
  title,
  description,
  children,
  placeholder,
  delay,
  code,
}: ShowcaseCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const Icon = SECTION_ICONS[section];
  const meta = SECTIONS.find((item) => item.id === section);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <Reveal delay={delay} className="h-full">
      <article
        id={id}
        className="group flex h-full scroll-mt-24 flex-col rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
            {Icon && <Icon className="size-5" />}
          </div>
          {meta && (
            <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[10px] font-semibold text-muted">
              {CATEGORY_LABELS[meta.category]}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-base font-bold text-ink transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted min-h-[34px]">{description}</p>

        {/* Barra de Abas (Visualizar / Código) e Ação de Copiar */}
        {code && (
          <div className="mt-4 flex items-center justify-between border-b border-line/60 pb-2">
            <div className="flex items-center gap-1 rounded-lg bg-surface-raised p-1">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
                  activeTab === "preview"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-muted hover:text-ink"
                )}
              >
                <Eye className="size-3.5" />
                <span>Visualizar</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
                  activeTab === "code"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-muted hover:text-ink"
                )}
              >
                <Code2 className="size-3.5" />
                <span>Código</span>
              </button>
            </div>

            {activeTab === "code" && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted transition-all hover:border-primary hover:text-primary active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copiar código</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Área de Apresentação com Altura Uniforme Calibrada */}
        <div className="mt-4 flex min-h-[380px] flex-1 items-center justify-center rounded-xl border border-line/60 bg-surface-raised/40 p-4">
          {activeTab === "code" && code ? (
            <pre className="h-[380px] max-h-[380px] w-full overflow-auto rounded-lg border border-line/40 bg-[#091311] p-4 text-left text-xs font-mono leading-relaxed text-[#e6f4ef] selection:bg-primary/40 [scrollbar-width:thin]">
              <code>{code}</code>
            </pre>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {children ?? (
                <span className="text-xs font-medium text-muted">
                  {placeholder ?? "Em breve..."}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
