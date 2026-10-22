import { useState } from "react";
import type { ScreenScenario, TargetSize, ThumbZone } from "../types";
import {
  ChevronLeft,
  Compass,
  Home,
  Lock,
  Mail,
  Plus,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScreenContentProps {
  scenario: ScreenScenario;
  targetSize: TargetSize;
  onElementClick: (name: string, zone: ThumbZone) => void;
}

export function ScreenContent({
  scenario,
  targetSize,
  onElementClick,
}: ScreenContentProps) {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "profile">("home");

  const targetHeightClass =
    targetSize === "40px"
      ? "min-h-10 h-10 text-xs"
      : targetSize === "44px"
      ? "min-h-11 h-11 text-xs"
      : "min-h-12 h-12 text-sm";

  return (
    <div
      id="simulated-app-screen"
      className="relative flex h-full flex-col justify-between bg-bg text-ink overflow-y-auto select-none"
    >
      <header className="sticky top-0 z-20 flex h-13 items-center justify-between border-b border-line/60 bg-surface/90 px-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => onElementClick("Botão Voltar (Top Bar)", "hard")}
          className="flex size-9 items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-surface-raised active:scale-95 transition-all cursor-pointer"
          title="Botão Voltar"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-primary" />
          <h2 className="text-xs font-bold tracking-tight text-ink">Hapto Mobile</h2>
        </div>

        <button
          type="button"
          onClick={() => onElementClick("Busca (Top Bar)", "hard")}
          className="flex size-9 items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-surface-raised active:scale-95 transition-all cursor-pointer"
          title="Buscar"
        >
          <Search className="size-4" />
        </button>
      </header>

      <main className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {scenario === "feed" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Feed Ergonômico
              </span>
              <span className="rounded-full bg-surface-raised border border-line px-2 py-0.5 text-[9px] font-semibold text-muted">
                {targetSize}
              </span>
            </div>

            <article className="rounded-2xl border border-line bg-surface p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                  <Sparkles className="size-3" /> Usabilidade
                </span>
                <span className="text-[9px] text-muted">Hoje</span>
              </div>
              <h3 className="text-xs font-bold text-ink leading-snug">
                Como alvos de 48px reduzem a taxa de erro em 34% no toque
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">
                A Lei de Fitts modela a velocidade e precisão do movimento humano até o alvo.
              </p>

              <button
                type="button"
                onClick={() => onElementClick("Botão Ler Mais (Card)", "stretch")}
                className={cn(
                  "w-full flex items-center justify-center rounded-xl font-semibold border border-line bg-surface-raised text-ink transition-all hover:bg-line/30 active:scale-[0.98] cursor-pointer",
                  targetHeightClass
                )}
              >
                <span>Ler Artigo Completo</span>
              </button>
            </article>

            <div className="rounded-2xl border border-line bg-surface/70 p-3 space-y-2">
              <h4 className="text-xs font-bold text-ink">Diretrizes da Apple HIG</h4>
              <p className="text-[10px] text-muted leading-tight">
                Recomendação mínima de 44x44 pontos para evitar toques fantasmas.
              </p>
            </div>
          </div>
        )}

        {scenario === "form" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Formulário Mobile
              </span>
              <span className="rounded-full bg-surface-raised border border-line px-2 py-0.5 text-[9px] font-semibold text-muted">
                Alvo {targetSize}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink">
                  E-mail de Acesso
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 size-4 text-muted pointer-events-none" />
                  <input
                    type="email"
                    placeholder="voce@hapto.design"
                    onClick={() => onElementClick("Input de E-mail", "stretch")}
                    className={cn(
                      "w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none transition-all cursor-text",
                      targetHeightClass
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 size-4 text-muted pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    onClick={() => onElementClick("Input de Senha", "stretch")}
                    className={cn(
                      "w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none transition-all cursor-text",
                      targetHeightClass
                    )}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onElementClick("Botão Entrar (Form)", "stretch")}
                className={cn(
                  "w-full mt-2 flex items-center justify-center rounded-xl bg-primary text-on-primary font-semibold shadow-xs hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer",
                  targetHeightClass
                )}
              >
                <span>Entrar na Conta</span>
              </button>
            </div>
          </div>
        )}

        {scenario === "actions" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Ações Rápidas
              </span>
              <span className="rounded-full bg-surface-raised border border-line px-2 py-0.5 text-[9px] font-semibold text-muted">
                {targetSize}
              </span>
            </div>

            <p className="text-[11px] text-muted leading-relaxed">
              Compare o esforço de tocar no botão secundário no meio da tela vs no botão flutuante (FAB) na base do polegar.
            </p>

            <button
              type="button"
              onClick={() => onElementClick("Botão de Ação Média", "stretch")}
              className={cn(
                "w-full flex items-center justify-center rounded-xl border border-line bg-surface text-ink font-semibold shadow-2xs hover:bg-surface-raised active:scale-[0.98] transition-all cursor-pointer",
                targetHeightClass
              )}
            >
              <span>Ação Secundária (Meio)</span>
            </button>
          </div>
        )}
      </main>

      <footer className="relative z-20 border-t border-line/60 bg-surface/95 px-3 py-2 backdrop-blur-md">
        {scenario === "actions" ? (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onElementClick("Ação Primária de Rodapé", "natural")}
              className={cn(
                "flex-1 mr-2 flex items-center justify-center rounded-xl bg-primary text-on-primary font-semibold shadow-sm hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer",
                targetHeightClass
              )}
            >
              <span>Confirmar Ação</span>
            </button>

            <button
              type="button"
              onClick={() => onElementClick("FAB (Botão Flutuante)", "natural")}
              className="flex size-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Nova Ação"
            >
              <Plus className="size-6" />
            </button>
          </div>
        ) : (
          <nav className="flex items-center justify-around">
            <button
              type="button"
              onClick={() => {
                setActiveTab("home");
                onElementClick("Aba Início (Bottom Nav)", "natural");
              }}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl px-4 py-1.5 text-[10px] font-semibold transition-all cursor-pointer",
                activeTab === "home" ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              <Home className="size-4" />
              <span className="mt-0.5">Início</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("explore");
                onElementClick("Aba Explorar (Bottom Nav)", "natural");
              }}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl px-4 py-1.5 text-[10px] font-semibold transition-all cursor-pointer",
                activeTab === "explore" ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              <Compass className="size-4" />
              <span className="mt-0.5">Explorar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                onElementClick("Aba Perfil (Bottom Nav)", "natural");
              }}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl px-4 py-1.5 text-[10px] font-semibold transition-all cursor-pointer",
                activeTab === "profile" ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              <User className="size-4" />
              <span className="mt-0.5">Perfil</span>
            </button>
          </nav>
        )}
      </footer>
    </div>
  );
}

