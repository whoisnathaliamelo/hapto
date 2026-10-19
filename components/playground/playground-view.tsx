"use client";

import { useState } from "react";
import type {
  SimulatorSettings,
  TouchEventData,
  ThumbZone,
  ScreenScenario,
} from "./types";
import { HandSelector } from "./controls/hand-selector";
import { ZoneToggle } from "./controls/zone-toggle";
import { TargetCalibrator } from "./controls/target-calibrator";
import { PhoneFrame } from "./phone/phone-frame";
import { ThumbOverlay } from "./phone/thumb-overlay";
import { ScreenContent } from "./phone/screen-content";
import { TouchFeedback } from "./diagnostics/touch-feedback";
import { Reveal } from "@/components/reveal";
import { Sliders, Smartphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaygroundView() {
  const [settings, setSettings] = useState<SimulatorSettings>({
    handGrip: "right",
    showOverlay: true,
    targetSize: "48px",
    activeScreen: "feed",
  });

  const [lastTouch, setLastTouch] = useState<TouchEventData | null>(null);

  const handleElementClick = (elementClicked: string, zone: ThumbZone) => {
    setLastTouch({
      x: 0,
      y: 0,
      zone,
      elementClicked,
    });
  };

  const scenarios: { id: ScreenScenario; label: string; desc: string }[] = [
    { id: "feed", label: "Feed Notícias", desc: "Cards & leitura passiva" },
    { id: "form", label: "Formulário", desc: "Inputs & digitação" },
    { id: "actions", label: "Ações & FAB", desc: "Botões de alto alcance" },
  ];

  return (
    <section className="relative isolate overflow-clip border-b border-line/40">
      {/* Background decorativo com grid dots e iluminação sutil */}
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 bg-radial from-primary/15 via-transparent to-transparent opacity-60 blur-2xl" />

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-20 lg:pt-10 lg:pb-24">
        {/* Cabeçalho da Seção */}
        <header className="mx-auto max-w-3xl text-center mb-10 lg:mb-14">
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-3.5 py-1 text-xs font-semibold text-muted shadow-2xs backdrop-blur-xs">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>Módulo 03 • Laboratório Interativo</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Playground{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Ergonômico
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Simule a anatomia do toque, teste diferentes pegadas e avalie o impacto das zonas de alcance do polegar na prática.
            </p>
          </Reveal>
        </header>

        {/* Grid de 3 Colunas: Controles | Celular | Diagnóstico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA 1: Painel de Controles e Calibragem */}
          <div className="lg:col-span-4 xl:col-span-4 order-2 lg:order-1 space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-line/50 pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Sliders className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-ink">Painel de Parâmetros</h2>
                    <p className="text-[11px] text-muted">Ajuste as variáveis do teste</p>
                  </div>
                </div>

                {/* Seletor de Pegada */}
                <HandSelector
                  value={settings.handGrip}
                  onChange={(handGrip) => setSettings((s) => ({ ...s, handGrip }))}
                />

                {/* Seletor de Cenário */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                      <Smartphone className="size-3.5 text-primary" />
                      <span>Cenário da Tela</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-surface-raised/60 p-1">
                    {scenarios.map((scen) => {
                      const isSelected = settings.activeScreen === scen.id;
                      return (
                        <button
                          key={scen.id}
                          type="button"
                          onClick={() => setSettings((s) => ({ ...s, activeScreen: scen.id }))}
                          className={cn(
                            "flex flex-col items-center justify-center rounded-lg px-2 py-2 text-center transition-all cursor-pointer",
                            isSelected
                              ? "bg-surface text-ink font-bold shadow-xs border border-line/80 ring-1 ring-primary/20"
                              : "text-muted hover:text-ink hover:bg-surface/50 font-medium"
                          )}
                        >
                          <span className="text-xs">{scen.label}</span>
                          <span className="text-[9px] text-muted/70">{scen.desc.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle da Camada de Thumb Zone */}
                <ZoneToggle
                  checked={settings.showOverlay}
                  onChange={(showOverlay) => setSettings((s) => ({ ...s, showOverlay }))}
                />

                {/* Calibragem de tamanho de alvo */}
                <TargetCalibrator
                  value={settings.targetSize}
                  onChange={(targetSize) => setSettings((s) => ({ ...s, targetSize }))}
                />
              </div>
            </Reveal>
          </div>

          {/* COLUNA 2: O Celular Simulado Centralizado */}
          <div className="lg:col-span-4 xl:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center py-2 space-y-3">
            {/* Mini Legenda de Zonas Externa (não polui a tela interna) */}
            {settings.showOverlay && (
              <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 text-[11px] font-semibold text-muted bg-surface/90 border border-line/80 rounded-full px-3.5 py-1 shadow-2xs backdrop-blur-xs">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary ring-2 ring-primary/20" />
                  <span>Natural</span>
                </div>
                <span className="text-line text-[9px]">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                  <span>Esticada</span>
                </div>
                <span className="text-line text-[9px]">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500 ring-2 ring-rose-500/20" />
                  <span>Difícil</span>
                </div>
              </div>
            )}

            <Reveal delay={0.1}>
              <PhoneFrame>
                <ScreenContent
                  scenario={settings.activeScreen}
                  targetSize={settings.targetSize}
                  onElementClick={handleElementClick}
                />

                {settings.showOverlay && (
                  <ThumbOverlay handGrip={settings.handGrip} />
                )}
              </PhoneFrame>
            </Reveal>
          </div>

          {/* COLUNA 3: Painel de Diagnóstico em Tempo Real */}
          <div className="lg:col-span-4 xl:col-span-4 order-3 lg:order-3">
            <Reveal delay={0.15}>
              <TouchFeedback
                lastTouch={lastTouch}
                targetSize={settings.targetSize}
              />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

