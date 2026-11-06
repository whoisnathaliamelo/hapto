"use client";

import { useState } from "react";
import { Palette, Atom, Boxes, Component } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function AtomicArchitecture() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      number: "01",
      icon: Palette,
      name: "Tokens",
      tagline: "Decisões Sub-atômicas",
      description:
        "A fundação matemática e visual do sistema. Variáveis agnósticas de plataforma que armazenam valores fundamentais de cor com contraste WCAG, escala tipográfica e malhas de espaçamento para toque.",
      items: [
        "Cores & Contraste WCAG (4.5:1+)",
        "Tipografia & Escala (16px+ anti-zoom)",
        "Espaçamentos & Targets (Grid 8dp)",
        "Tokens Semânticos (Light/Dark)",
      ],
      preview: {
        title: "Tokens de Design",
        badge: "Fundação",
      },
    },
    {
      step: 2,
      number: "02",
      icon: Atom,
      name: "Átomos",
      tagline: "Componentes Unitários",
      description:
        "Os menores blocos de interface interativa no DOM. Elementos funcionais puros estilizados pelos tokens, calibrados para assegurar alvos de toque generosos e estados táteis claros.",
      items: [
        "Botões (Normal, Secundário, FAB)",
        "Inputs de Texto (Altura 48dp+)",
        "Switches e Checkboxes",
        "Ícones Ergonômicos com Padding",
      ],
      preview: {
        title: "Átomos Interativos",
        badge: "Unidade",
      },
    },
    {
      step: 3,
      number: "03",
      icon: Boxes,
      name: "Moléculas",
      tagline: "Combinações Funcionais",
      description:
        "Agrupamentos de átomos trabalhando em conjunto com um propósito funcional específico. Resolvem tarefas imediatas como busca, filtragem e entrada de dados sem sobrecarregar o usuário.",
      items: [
        "Barra de Busca com Botão Limpar",
        "Cards Informativos Táteis",
        "Campos com Label & Helper Text",
        "Controles Segmentados & Chips",
      ],
      preview: {
        title: "Moléculas Compostas",
        badge: "Função",
      },
    },
    {
      step: 4,
      number: "04",
      icon: Component,
      name: "Organismos",
      tagline: "Seções & Navegação",
      description:
        "Estruturas completas e autônomas da interface formadas pela combinação de moléculas e átomos. Gerenciam os fluxos essenciais de navegação e feedback móvel na zona do polegar.",
      items: [
        "Bottom Navigation (Zona Natural)",
        "Top App Bar com Ações",
        "Alertas e Snackbars Táteis",
        "Modais e Bottom Sheets",
      ],
      preview: {
        title: "Organismo de Interface",
        badge: "Seção",
      },
    },
  ];

  const current = steps.find((s) => s.step === activeStep) || steps[0];
  const CurrentIcon = current.icon;

  return (
    <section id="atomic-architecture" className="scroll-mt-20 border-b border-line/40 bg-surface-raised/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Estrutura Modular
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Arquitetura Modular (Atomic Design)
            </h2>
            <p className="mt-3 text-base text-muted">
              Uma metodologia estruturada para decompor interfaces móveis em 4 camadas progressivas, garantindo consistência total desde o token bruto até os organismos completos.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 items-stretch">
            {steps.map((item) => {
              const Icon = item.icon;
              const isActive = activeStep === item.step;
              return (
                <button
                  key={item.step}
                  type="button"
                  id={`atomic-step-${item.step}`}
                  onClick={() => setActiveStep(item.step)}
                  className={`group relative flex h-full min-h-[116px] flex-col justify-between rounded-2xl border p-4.5 text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? "border-primary bg-surface shadow-xs ring-1 ring-primary/30"
                      : "border-line bg-surface/70 hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
                      isActive ? "bg-primary text-on-primary" : "bg-surface-raised text-muted group-hover:text-ink"
                    }`}>
                      <Icon className="size-4.5" />
                    </span>
                    <span className={`font-mono text-xs font-bold transition-colors ${isActive ? "text-primary" : "text-muted"}`}>
                      {item.number}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? "text-primary" : "text-ink"}`}>
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted truncate">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-8">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-12 items-stretch min-h-[420px]">
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      Etapa {current.number} de 04
                    </span>
                    <span className="text-line">•</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {current.tagline}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-2xs">
                      <CurrentIcon className="size-5.5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">
                        {current.name}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-muted min-h-[52px]">
                    {current.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-line/60 pt-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink block mb-3">
                    Elementos que compõem este nível:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.items.map((it) => (
                      <div
                        key={it}
                        className="flex h-11 items-center gap-2.5 rounded-xl border border-line/70 bg-surface-raised/50 px-3.5 text-xs transition-colors hover:border-primary/40 hover:bg-surface-raised"
                      >
                        <span className="size-2 rounded-full bg-primary shrink-0" />
                        <span className="font-medium text-ink truncate">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col h-full">
                <div className="h-full flex flex-col justify-between rounded-2xl border border-line bg-surface-raised p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-line/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-primary" />
                      <span className="text-xs font-bold text-ink">
                        {current.preview.title}
                      </span>
                    </div>
                    <span className="rounded-md border border-line bg-surface px-2 py-0.5 text-[10px] font-mono font-semibold text-muted">
                      {current.preview.badge}
                    </span>
                  </div>

                  <div className="my-auto py-4 flex h-[220px] flex-col items-center justify-center w-full">
                    {current.step === 1 && (
                      <div className="w-full space-y-2.5">
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <span className="size-4 rounded-md bg-primary" />
                            <span className="text-xs font-mono font-medium text-ink">--color-primary</span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">#176B5B · 4.5:1 AA</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <span className="size-4 rounded-md bg-surface-raised border border-line" />
                            <span className="text-xs font-mono font-medium text-ink">--font-size-base</span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">16px (Anti-zoom iOS)</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <span className="text-xs font-semibold text-ink">Touch Target Mínimo</span>
                          <span className="rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary font-mono">48 × 48 dp</span>
                        </div>
                      </div>
                    )}

                    {current.step === 2 && (
                      <div className="w-full space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-3 shadow-2xs">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-ink">Botão Primário</span>
                            <span className="text-[10px] text-muted">Touch target 48dp</span>
                          </div>
                          <span className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-primary text-xs font-bold text-on-primary shadow-xs">
                            Ação
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-3 shadow-2xs">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-ink">Switch Ergonômico</span>
                            <span className="text-[10px] text-muted">Alternância tátil</span>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary p-0.5">
                            <div className="size-5 rounded-full bg-surface shadow-xs translate-x-5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    )}

                    {current.step === 3 && (
                      <div className="w-full space-y-2.5">
                        <div className="rounded-xl border border-line bg-surface p-3 shadow-2xs space-y-1.5">
                          <div className="text-[11px] font-bold text-ink flex items-center justify-between">
                            <span>Barra de Busca</span>
                            <span className="text-[10px] font-mono text-primary font-semibold">Ícone + Input + Ação</span>
                          </div>
                          <div className="flex h-11 items-center justify-between rounded-lg border border-line bg-surface-raised px-3 text-xs">
                            <span className="text-muted flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-primary" />
                              Pesquisar componente...
                            </span>
                            <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-mono text-muted border border-line">
                              Limpar
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2 text-xs">
                          <span className="font-medium text-ink">Card Informativo Tátil</span>
                          <span className="text-[10px] text-primary font-bold">Feedback total</span>
                        </div>
                      </div>
                    )}

                    {current.step === 4 && (
                      <div className="w-full rounded-2xl border border-line bg-surface p-4 shadow-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-line/40">
                          <span className="text-xs font-bold text-ink">Bottom Navigation</span>
                          <span className="text-[10px] font-mono text-primary font-bold">Zona Natural · 64dp</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-center text-[11px] font-semibold text-muted">
                          <span className="rounded-lg bg-primary-light py-2 text-primary font-bold">Início</span>
                          <span className="py-2">Tokens</span>
                          <span className="py-2">Átomos</span>
                          <span className="py-2">Mais</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-surface-raised p-2 text-[11px]">
                          <span className="text-muted">Top App Bar / Header</span>
                          <span className="font-semibold text-ink">Ações de topo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-line/60 pt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">Hierarquia modular:</span>
                    <span className="font-semibold text-primary">
                      {current.step === 1 && "Tokens · Nível 1"}
                      {current.step === 2 && "Átomos · Nível 2"}
                      {current.step === 3 && "Moléculas · Nível 3"}
                      {current.step === 4 && "Organismos · Nível 4"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}