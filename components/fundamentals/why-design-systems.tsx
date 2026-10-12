"use client";

import { useState } from "react";
import { Check, X, Layers, SplitSquareVertical, ArrowRight, ShieldAlert, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function WhyDesignSystems() {
  const [tab, setTab] = useState<"com" | "sem">("com");

  return (
    <section id="why-design-systems" className="scroll-mt-20 border-b border-line/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Cabeçalho da Seção */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Fundamento Central
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Por que usar um Design System?
            </h2>
            <p className="mt-3 text-base text-muted">
              Descubra como transformar o desenvolvimento fragmentado em um ecossistema produtivo, escalável e previsível.
            </p>
          </div>
        </Reveal>

        {/* Card: O que é? */}
        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-xs sm:p-8">
            <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-primary/10 via-transparent to-transparent opacity-80 blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
                <Layers className="size-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Conceito Fundamental
                </span>
                <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">
                  O que é um Design System?
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-muted">
                  É uma biblioteca viva de padrões, decisões de estilo (<strong className="text-ink font-semibold">Design Tokens</strong>) e componentes reutilizáveis. Funciona como a <span className="text-ink font-semibold">linguagem comum</span> entre designers e desenvolvedores para acelerar a entrega de produtos digitais sem perder a consistência visual.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Comparativo Prático com Altura Estável e Mockups Refinados */}
        <Reveal delay={0.2} className="mt-10">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/50 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <SplitSquareVertical className="size-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Comparativo Prático
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-ink">
                  Antes vs. Depois da Adoção
                </h3>
              </div>

              {/* Seletor de Abas Estável */}
              <div
                role="tablist"
                aria-label="Comparativo de adoção de design system"
                className="inline-flex rounded-xl border border-line bg-surface-raised p-1 shadow-2xs self-start sm:self-auto"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "sem"}
                  onClick={() => setTab("sem")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    tab === "sem"
                      ? "bg-surface text-ink shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className={`flex size-4 items-center justify-center rounded-full text-[10px] ${tab === "sem" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-line text-muted"}`}>
                    <X className="size-3" />
                  </span>
                  <span>Sem Design System (Ad-hoc)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "com"}
                  onClick={() => setTab("com")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    tab === "com"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className={`flex size-4 items-center justify-center rounded-full text-[10px] ${tab === "com" ? "bg-on-primary/20 text-on-primary" : "bg-line text-muted"}`}>
                    <Check className="size-3" />
                  </span>
                  <span>Com Design System</span>
                </button>
              </div>
            </div>

            {/* Grid com Altura Consistente */}
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-stretch min-h-[380px]">
              {/* Lado Esquerdo: Lista de Argumentos com mesma altura estrutural */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                {tab === "sem" ? (
                  <div className="space-y-3.5">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                      <ShieldAlert className="size-3.5" />
                      <span>Desenvolvimento Fragmentado</span>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 mt-0.5">
                            <X className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Botões com tamanhos e cores diferentes em cada tela
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Alvos táteis irregulares aumentam a taxa de toques acidentais e geram frustração no usuário móvel.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 mt-0.5">
                            <X className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Código duplicado e difícil de manter
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Cada funcionalidade recria folhas de estilo do zero, aumentando o peso da aplicação e a dívida técnica.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 mt-0.5">
                            <X className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Alto risco de erros e lentidão nas entregas
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Times gastam energia redesenhando elementos básicos em vez de entregar valor de negócio real.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                      <Sparkles className="size-3.5" />
                      <span>Ecossistema Padronizado</span>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary mt-0.5">
                            <Check className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Reusabilidade: Componentes prontos para usar
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Componentes testados e calibrados aceleram o lançamento de novas telas com segurança total.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary mt-0.5">
                            <Check className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Consistência: Mesma identidade visual em todo o app
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Padrões claros reduzem o esforço de aprendizagem do usuário, gerando interfaces familiares e fluidas.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary mt-0.5">
                            <Check className="size-3.5" />
                          </div>
                          <div>
                            <strong className="block text-sm font-bold text-ink">
                              Manutenibilidade (ISO/IEC 25010)
                            </strong>
                            <p className="mt-1 text-xs text-muted leading-relaxed">
                              Uma única alteração nas variáveis centrais de estilo atualiza o produto inteiro instantaneamente.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lado Direito: Mockup Visual Elegante de Alta Fidelidade */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="h-full flex flex-col justify-between rounded-2xl border border-line bg-surface-raised p-6 shadow-xs">
                  {/* Barra Superior estilo Editor */}
                  <div>
                    <div className="flex items-center justify-between border-b border-line/60 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-red-400" />
                        <span className="size-2 rounded-full bg-amber-400" />
                        <span className="size-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-mono text-muted">
                        {tab === "sem" ? "inspeção // sem-sistema" : "inspeção // hapto-tokens"}
                      </span>
                    </div>

                    {/* Conteúdo do Mockup Elegante */}
                    <div className="py-6 space-y-4">
                      {tab === "sem" ? (
                        <div className="space-y-3">
                          {/* Botão com inconsistência visual demonstrada com elegância */}
                          <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono">Botão Checkout</span>
                              <span className="font-mono text-red-500 font-semibold">h: 31px (Inseguro)</span>
                            </div>
                            <div className="h-8 rounded bg-ink/70 flex items-center justify-center text-xs font-medium text-surface">
                              Confirmar Pedido
                            </div>
                          </div>

                          <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono">Input Cupom</span>
                              <span className="font-mono text-red-500 font-semibold">pad: 3px (Sem alinhamento)</span>
                            </div>
                            <div className="h-7 rounded border border-line bg-surface-raised px-2 flex items-center text-[11px] text-muted">
                              Insira o código...
                            </div>
                          </div>

                          <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono">Ação Secundária</span>
                              <span className="font-mono text-red-500 font-semibold">cor: #4f46e5 (Fora da paleta)</span>
                            </div>
                            <div className="h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                              Voltar
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Componente padronizado com Design Tokens */}
                          <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono font-medium text-ink">Button Primary</span>
                              <span className="font-mono text-primary font-bold">min-h: 48px (Fitts)</span>
                            </div>
                            <div className="h-12 rounded-xl bg-primary flex items-center justify-center text-xs font-bold text-on-primary shadow-xs">
                              Confirmar Pedido
                            </div>
                          </div>

                          <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono font-medium text-ink">Input Standard</span>
                              <span className="font-mono text-primary font-bold">grid: 8dp pad</span>
                            </div>
                            <div className="h-12 rounded-xl border border-line bg-surface px-3.5 flex items-center text-xs text-muted">
                              Insira o código do cupom...
                            </div>
                          </div>

                          <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs">
                            <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                              <span className="font-mono font-medium text-ink">Button Secondary</span>
                              <span className="font-mono text-primary font-bold">token: surface-raised</span>
                            </div>
                            <div className="h-12 rounded-xl border border-line bg-surface-raised flex items-center justify-center text-xs font-semibold text-ink">
                              Voltar
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rodapé do Mockup */}
                  <div className="border-t border-line/60 pt-3 flex items-center justify-between text-[11px]">
                    <span className="text-muted">Diagnóstico tátil:</span>
                    <span className={`font-semibold ${tab === "sem" ? "text-red-500" : "text-primary"}`}>
                      {tab === "sem" ? "Falha nos alvos de toque" : "100% de conformidade móvel"}
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
