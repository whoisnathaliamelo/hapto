"use client";

import { useState } from "react";
import { Atom, Boxes, Component, Layout, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function AtomicArchitecture() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      number: "01",
      icon: Atom,
      name: "Átomos",
      tagline: "Unidades Fundamentais",
      description:
        "As menores peças indivisíveis da interface. No mobile, incluem paleta de cores, tipografia calibrada, ícones e inputs em sua forma mais elementar.",
      items: ["Design Tokens de Cor", "Font Scale (Outfit)", "Ícones Lucide", "Input Isolado"],
      preview: {
        title: "Tokens & Átomos",
        badge: "Fundação",
      },
    },
    {
      step: 2,
      number: "02",
      icon: Boxes,
      name: "Moléculas",
      tagline: "Combinações Funcionais",
      description:
        "Agrupamentos simples de átomos que passam a operar como uma unidade com propósito específico para o usuário.",
      items: ["Label de Campo", "Input com Altura 48dp", "Botão de Limpeza com Ícone", "Helper Text"],
      preview: {
        title: "Molécula de Formulário",
        badge: "Unidade",
      },
    },
    {
      step: 3,
      number: "03",
      icon: Component,
      name: "Organismos",
      tagline: "Seções Completas",
      description:
        "Componentes mais complexos que combinam moléculas e átomos para formar uma seção autônoma e reconhecível da interface.",
      items: ["Bottom Navigation Bar", "Cabeçalho de Aplicação", "Card com Ações e Badges", "Barra de Busca"],
      preview: {
        title: "Organismo de Navegação",
        badge: "Seção",
      },
    },
    {
      step: 4,
      number: "04",
      icon: Layout,
      name: "Modelos",
      tagline: "Esqueleto & Arquitetura",
      description:
        "A estrutura de layout em nível de wireframe. Define a distribuição espacial, o grid de 8dp e as zonas de alcance sem os dados definitivos.",
      items: ["Grid Mobile de 8dp", "Zonas do Polegar Marcadas", "Esqueleto de Cards", "Hierarquia de Rolagem"],
      preview: {
        title: "Template Estrutural",
        badge: "Layout",
      },
    },
    {
      step: 5,
      number: "05",
      icon: Smartphone,
      name: "Páginas",
      tagline: "Interface Concreta",
      description:
        "O produto final entregue ao usuário, com conteúdo dinâmico, estados de feedback tátil e interações reais prontas para produção.",
      items: ["Dados Reais Preenchidos", "Micro-interações Ativas", "Acessibilidade Validada", "Feedback Háptico/Tátil"],
      preview: {
        title: "Tela em Produção",
        badge: "Final",
      },
    },
  ];

  const current = steps.find((s) => s.step === activeStep) || steps[0];
  const CurrentIcon = current.icon;

  return (
    <section id="atomic-architecture" className="scroll-mt-20 border-b border-line/40 bg-surface-raised/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Cabeçalho */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Estrutura Modular
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Arquitetura Modular (Atomic Design)
            </h2>
            <p className="mt-3 text-base text-muted">
              Uma metodologia estruturada para decompor interfaces móveis em camadas progressivas, garantindo consistência do token até a tela final.
            </p>
          </div>
        </Reveal>

        {/* Stepper com 5 Passos Rigorosamente do Mesmo Tamanho */}
        <Reveal delay={0.15} className="mt-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 items-stretch">
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

        {/* Painel de Visualização Detalhada com Altura Casada e Travada */}
        <Reveal delay={0.25} className="mt-8">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-12 items-stretch min-h-[420px]">
              {/* Lado Esquerdo: Descrição e Componentes Chave */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      Etapa {current.number} de 05
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

                {/* Composição em Cards Padronizados de Altura Idêntica */}
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

              {/* Lado Direito: Preview de Arquitetura com Altura Casada e Estável */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <div className="h-full flex flex-col justify-between rounded-2xl border border-line bg-surface-raised p-6 shadow-xs">
                  {/* Topo do Preview */}
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

                  {/* Canvas de Demonstração em Altura Travada Estável */}
                  <div className="my-auto py-4 flex h-[220px] flex-col items-center justify-center w-full">
                    {current.step === 1 && (
                      <div className="w-full space-y-2.5">
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <span className="size-4 rounded-md bg-primary" />
                            <span className="text-xs font-mono font-medium text-ink">primary</span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">#176B5B</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <span className="size-4 rounded-md bg-accent" />
                            <span className="text-xs font-mono font-medium text-ink">accent</span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">#229981</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-2xs">
                          <span className="text-xs font-semibold text-ink">Touch Target Base</span>
                          <span className="rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary font-mono">48 × 48 dp</span>
                        </div>
                      </div>
                    )}

                    {current.step === 2 && (
                      <div className="w-full space-y-2">
                        <label className="text-xs font-semibold text-ink">E-mail Corporativo</label>
                        <div className="flex h-12 items-center justify-between rounded-xl border border-line bg-surface px-3.5 shadow-2xs">
                          <span className="text-xs text-ink font-medium">usuario@empresa.com</span>
                          <span className="rounded-md bg-surface-raised px-2 py-1 text-[10px] font-mono text-muted">
                            Clear
                          </span>
                        </div>
                        <span className="text-[11px] text-muted block">Rótulo + Campo tátil (48dp) + Ação combinados</span>
                      </div>
                    )}

                    {current.step === 3 && (
                      <div className="w-full rounded-2xl border border-line bg-surface p-4 shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-line/40">
                          <span className="text-xs font-bold text-ink">Bottom Navigation</span>
                          <span className="text-[10px] font-mono text-primary font-bold">h-16 (64dp)</span>
                        </div>
                        <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[11px] font-semibold text-muted">
                          <span className="rounded-lg bg-primary-light py-2 text-primary font-bold">Início</span>
                          <span className="py-2">Tokens</span>
                          <span className="py-2">Testes</span>
                          <span className="py-2">Docs</span>
                        </div>
                      </div>
                    )}

                    {current.step === 4 && (
                      <div className="w-full space-y-2.5 rounded-2xl border border-dashed border-line bg-surface/50 p-4">
                        <div className="h-4 w-1/3 rounded bg-line/60" />
                        <div className="h-9 w-full rounded-xl bg-line/35" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-14 rounded-xl bg-line/25" />
                          <div className="h-14 rounded-xl bg-line/25" />
                        </div>
                        <div className="h-10 w-full rounded-xl bg-line/30" />
                      </div>
                    )}

                    {current.step === 5 && (
                      <div className="w-full rounded-2xl border border-primary/30 bg-surface p-4 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-ink">Painel de Métricas</span>
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="rounded-xl border border-line bg-surface-raised p-3">
                          <span className="text-[11px] text-muted block">Status do Sistema</span>
                          <strong className="text-xs font-bold text-ink">100% de conformidade tátil móvel</strong>
                        </div>
                        <button type="button" className="w-full h-11 rounded-xl bg-primary text-xs font-bold text-on-primary shadow-xs">
                          Acessar Componentes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rodapé de Inspeção do Preview */}
                  <div className="border-t border-line/60 pt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">Hierarquia modular:</span>
                    <span className="font-semibold text-primary">
                      {current.step === 1 && "Átomos · Nível 1"}
                      {current.step === 2 && "Moléculas · Nível 2"}
                      {current.step === 3 && "Organismos · Nível 3"}
                      {current.step === 4 && "Modelos · Nível 4"}
                      {current.step === 5 && "Páginas · Nível 5"}
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
