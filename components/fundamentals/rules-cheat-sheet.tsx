"use client";

import Link from "next/link";
import { ArrowRight, Target, Contrast, Hand, Ruler, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

export function RulesCheatSheet() {
  const rules = [
    {
      number: "01",
      icon: Target,
      tag: "Dimensão Tátil",
      title: "Regra dos 48dp",
      rule: "Nada clicável pode ter menos de 48 × 48 dp.",
      detail: "Garanta que a área de toque física acompanhe a anatomia do dedo, prevenindo toques acidentais.",
    },
    {
      number: "02",
      icon: Contrast,
      tag: "Contraste WCAG",
      title: "Regra do 4.5:1",
      rule: "Sempre teste o contraste entre texto e fundo.",
      detail: "Assegure legibilidade imediata sob iluminação solar externa e para usuários com baixa acuidade visual.",
    },
    {
      number: "03",
      icon: Hand,
      tag: "Alcance Natural",
      title: "Regra do Polegar",
      rule: "Guarde a parte inferior da tela para as ações principais.",
      detail: "Posicione gatilhos primários e menus onde o polegar repousa naturalmente, sem esforço de alongamento.",
    },
    {
      number: "04",
      icon: Ruler,
      tag: "Ritmo & Grid",
      title: "Regra dos Múltiplos de 8",
      rule: "Espaçamentos padronizados em 8, 16, 24 e 32px.",
      detail: "Mantenha consistência matemática no layout e garanta renderização limpa sem quebra de subpixels.",
    },
  ];

  return (
    <section id="rules-cheat-sheet" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Diretrizes Rápidas
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Cheat Sheet: As 4 Regras de Ouro
            </h2>
            <p className="mt-3 text-base text-muted">
              Princípios fundamentais sintetizados para consulta rápida durante o design e a implementação de interfaces móveis.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.number} delay={0.1 + index * 0.1}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between border-b border-line/50 pb-4">
                      <span className="font-mono text-xs font-bold text-primary">
                        Regra {item.number}
                      </span>
                      <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform group-hover:scale-105">
                        <Icon className="size-4.5" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="inline-block rounded-md bg-surface-raised px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {item.tag}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                        {item.rule}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 border-t border-line/40 pt-4 text-xs leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.35} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-xs text-center">
            <div className="absolute inset-0 -z-10 bg-radial from-primary/10 via-transparent to-transparent opacity-70" />

            <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Pronto para aplicar a teoria na prática?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted">
              Consulte as tabelas detalhadas de escalas e medidas ou experimente componentes móveis calibrados em tempo real no playground.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/components"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                Ver Catálogo de Componentes <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/playground"
                className={buttonVariants({ variant: "outline", size: "md" })}
              >
                Acessar Playground <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
