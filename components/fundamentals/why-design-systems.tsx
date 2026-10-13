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
                  id="tab-sem-design-system"
                  aria-selected={tab === "sem"}
                  onClick={() => setTab("sem")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                    tab === "sem"
                      ? "bg-surface text-ink shadow-xs border border-red-500/20"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className={`flex size-4 items-center justify-center rounded-full text-[10px] ${tab === "sem" ? "bg-red-500/15 text-red-600 dark:text-red-400" : "bg-line text-muted"}`}>
                    <X className="size-3" />
                  </span>
                  <span>Sem Design System (Ad-hoc)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-com-design-system"
                  aria-selected={tab === "com"}
                  onClick={() => setTab("com")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
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

            {/* Grid 50/50 Balanceado com Altura Travada e Consistente */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2 items-stretch min-h-[440px]">
              {/* Coluna Esquerda: Lista de Argumentos com Cards de Altura Idêntica */}
              <div className="flex flex-col justify-between h-full">
                {/* Cabeçalho da Coluna com Badge e Resumo */}
                <div className="flex items-center justify-between pb-1">
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    tab === "sem"
                      ? "border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
                      : "border border-primary/20 bg-primary-light text-primary"
                  }`}>
                    {tab === "sem" ? (
                      <>
                        <ShieldAlert className="size-3.5" />
                        <span>Desenvolvimento Fragmentado</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3.5" />
                        <span>Ecossistema Padronizado</span>
                      </>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    {tab === "sem" ? "3 gargalos críticos" : "3 ganhos arquiteturais"}
                  </span>
                </div>

                {/* Grade com 3 Cards rigorosamente do mesmo tamanho */}
                <div className="grid grid-rows-3 gap-3.5 my-4 flex-1">
                  {tab === "sem" ? (
                    <>
                      <article className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-red-500/35 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400">
                              <X className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                              01 · Alvos de Toque
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">Lei de Fitts</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Botões com tamanhos irregulares
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Alturas abaixo de 48dp elevam os toques acidentais e geram frustração direta no usuário móvel.
                          </p>
                        </div>
                      </article>

                      <article className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-red-500/35 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400">
                              <X className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                              02 · Manutenção
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">ISO/IEC 25010</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Código duplicado e estilos isolados
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Cada tela reinventa regras de espaçamento e cores, inflando o bundle e a dívida técnica do app.
                          </p>
                        </div>
                      </article>

                      <article className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-red-500/35 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-600 dark:text-red-400">
                              <X className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                              03 · Velocidade
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">Time-to-Market</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Lentidão nas entregas e retrabalho
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Desenvolvedores gastam horas redesenhando elementos básicos em vez de entregar valor de negócio real.
                          </p>
                        </div>
                      </article>
                    </>
                  ) : (
                    <>
                      <article className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                              <Check className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                              01 · Reusabilidade
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">Lei de Fitts</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Alvos padronizados em 48dp
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Componentes testados e calibrados para anatomia do toque aceleram lançamentos com total precisão.
                          </p>
                        </div>
                      </article>

                      <article className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                              <Check className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                              02 · Consistência
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">Design Tokens</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Identidade visual unificada no app
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Variáveis centrais de cor, raio e espaçamento atualizam todo o ecossistema digital instantaneamente.
                          </p>
                        </div>
                      </article>

                      <article className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                              <Check className="size-3.5" />
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                              03 · Manutenibilidade
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted">ISO/IEC 25010</span>
                        </div>
                        <div className="mt-2">
                          <strong className="block text-sm font-bold text-ink">
                            Escalabilidade ágil e previsível
                          </strong>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            Padrões claros diminuem o esforço cognitivo do usuário e aceleram novas telas sem gerar débitos técnicos.
                          </p>
                        </div>
                      </article>
                    </>
                  )}
                </div>

                {/* Rodapé da Coluna Esquerda com Alinhamento Estável */}
                <div className="rounded-xl border border-line/60 bg-surface-raised px-4 py-2.5 flex items-center justify-between text-xs">
                  <span className="text-muted">Impacto no projeto:</span>
                  <span className={`font-semibold ${tab === "sem" ? "text-red-600 dark:text-red-400" : "text-primary"}`}>
                    {tab === "sem" ? "Alto custo de retrabalho e atrito" : "Produtividade 4x maior e coesão total"}
                  </span>
                </div>
              </div>

              {/* Coluna Direita: Mockup Visual de Inspeção com Cards de Altura Idêntica */}
              <div className="flex flex-col h-full">
                <div className="h-full flex flex-col justify-between rounded-2xl border border-line bg-surface-raised p-6 shadow-xs">
                  {/* Barra Superior estilo DevTools / Editor */}
                  <div className="flex items-center justify-between border-b border-line/60 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-red-400" />
                      <span className="size-2 rounded-full bg-amber-400" />
                      <span className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-muted">
                      {tab === "sem" ? "inspeção // sem-sistema.tsx" : "inspeção // hapto-tokens.tsx"}
                    </span>
                    <span className="text-[10px] font-mono text-muted/70 hidden sm:inline">
                      375 × 812 dp
                    </span>
                  </div>

                  {/* Grade com 3 Componentes rigorosamente do mesmo tamanho */}
                  <div className="grid grid-rows-3 gap-3.5 my-4 flex-1">
                    {tab === "sem" ? (
                      <>
                        {/* Componente 1: Botão Checkout com alvo reduzido */}
                        <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5 flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Botão Checkout</span>
                            <span className="font-mono text-red-500 font-semibold">{"h: 31px (Inseguro < 48dp)"}</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-7.5 w-full rounded bg-ink/75 flex items-center justify-center text-[11px] font-medium text-surface border border-red-500/30">
                              Confirmar Pedido
                            </div>
                          </div>
                        </div>

                        {/* Componente 2: Input com padding fora do grid */}
                        <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5 flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Input Cupom</span>
                            <span className="font-mono text-red-500 font-semibold">pad: 3px (Sem grid 8dp)</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-7.5 w-full rounded border border-line bg-surface-raised px-2.5 flex items-center text-[11px] text-muted">
                              Insira o cupom...
                            </div>
                          </div>
                        </div>

                        {/* Componente 3: Ação Secundária com cor fora da paleta */}
                        <div className="rounded-xl border border-dashed border-red-500/40 bg-surface p-3.5 flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Ação Secundária</span>
                            <span className="font-mono text-red-500 font-semibold">cor: #4f46e5 (Fora do token)</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-9 w-full rounded-full bg-indigo-600 flex items-center justify-center text-[11px] font-medium text-white shadow-2xs">
                              Voltar à Loja
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Componente 1: Botão Padronizado 48dp Fitts */}
                        <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Button Primary</span>
                            <span className="font-mono text-primary font-bold">min-h: 48dp (Fitts OK)</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-11 w-full rounded-xl bg-primary flex items-center justify-center text-xs font-bold text-on-primary shadow-xs">
                              Confirmar Pedido
                            </div>
                          </div>
                        </div>

                        {/* Componente 2: Input Calibrado no Grid de 8dp */}
                        <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Input Standard</span>
                            <span className="font-mono text-primary font-bold">grid: 8dp pad (OK)</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 flex items-center text-xs text-muted">
                              Insira o cupom promocional...
                            </div>
                          </div>
                        </div>

                        {/* Componente 3: Botão Secundário com Tokens */}
                        <div className="rounded-xl border border-primary/30 bg-surface p-3.5 shadow-2xs flex flex-col justify-between h-full">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span className="font-mono font-medium text-ink">Button Secondary</span>
                            <span className="font-mono text-primary font-bold">token: surface-raised</span>
                          </div>
                          <div className="h-11 flex items-center justify-center">
                            <div className="h-11 w-full rounded-xl border border-line bg-surface-raised flex items-center justify-center text-xs font-semibold text-ink">
                              Voltar à Loja
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Rodapé do Mockup com Alinhamento Estável */}
                  <div className="border-t border-line/60 pt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">Diagnóstico tátil:</span>
                    <span className={`font-semibold ${tab === "sem" ? "text-red-500" : "text-primary"}`}>
                      {tab === "sem" ? "Falha nos alvos de toque (< 48dp)" : "100% de conformidade móvel (WCAG AA)"}
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
