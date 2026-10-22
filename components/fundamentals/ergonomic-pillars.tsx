"use client";

import { Hand, Brain, Accessibility, Target, Grid3X3, Layers, Eye, Zap, Contrast, Users, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function ErgonomicPillars() {
  const pillars = [
    {
      number: "01",
      icon: Hand,
      title: "Ergonomia Física",
      tagline: "O Toque & Limites da Mão",
      badge: "Anatomia",
      summary: "Padrão: Alvo mínimo de 48 × 48 dp (Lei de Fitts)",
      points: [
        {
          icon: Target,
          title: "Área de Toque (48 × 48 dp):",
          text: "O dedo humano é impreciso. Áreas menores que 48dp causam toques acidentais e frustração do usuário.",
        },
        {
          icon: Hand,
          title: "Zona do Polegar (Thumb Zone):",
          text: "75% dos usuários navegam usando apenas uma mão. Elementos essenciais devem ficar na metade inferior da tela.",
        },
        {
          icon: Grid3X3,
          title: "Grid de 8 dp:",
          text: "Todas as margens e espaçamentos usam múltiplos de 8 (8, 16, 24, 32px) para ritmo e precisão tátil.",
        },
      ],
    },
    {
      number: "02",
      icon: Brain,
      title: "Ergonomia Cognitiva",
      tagline: "A Mente & Redução de Esforço",
      badge: "Percepção",
      summary: "Padrão: Affordance clara e feedback funcional",
      points: [
        {
          icon: Layers,
          title: "Zero Adivinhação (Affordance):",
          text: "Botões devem parecer botões. Sombras e elevações mostram o que é imediatamente clicável sem esforço mental.",
        },
        {
          icon: Eye,
          title: "Carga Mental Reduzida:",
          text: "Use ícones universais e fluxos familiares. O usuário não precisa aprender a usar o aplicativo do zero.",
        },
        {
          icon: Zap,
          title: "Animações Funcionais:",
          text: "Transições curtas e objetivas indicam a origem de menus e ações, mantendo o foco visual orientado.",
        },
      ],
    },
    {
      number: "03",
      icon: Accessibility,
      title: "Acessibilidade Universal",
      tagline: "A Inclusão & Normas WCAG",
      badge: "Conformidade",
      summary: "Padrão: Contraste mínimo de 4.5:1 (WCAG AA)",
      points: [
        {
          icon: Contrast,
          title: "Contraste Rígido (WCAG 2.1):",
          text: "Texto escuro em fundo claro (ou vice-versa) com razão mínima de 4.5:1 para leitura sob luz solar e baixa visão.",
        },
        {
          icon: Users,
          title: "Design para Idosos e PCDs:",
          text: "Fontes escaláveis e alvos confortáveis garantem inclusão digital e autonomia para todas as faixas etárias.",
        },
        {
          icon: CheckCircle2,
          title: "Semântica Rigorosa:",
          text: "Tags HTML nativas com atributos acessíveis que garantem compatibilidade com leitores de tela modernos.",
        },
      ],
    },
  ];

  return (
    <section id="ergonomic-pillars" className="scroll-mt-20 border-b border-line/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Fundamentos Anatômicos
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Os 3 Pilares da Ergonomia Mobile
            </h2>
            <p className="mt-3 text-base text-muted">
              Interfaces móveis exigem considerar os limites físicos das mãos, a clareza perceptiva da mente e a acessibilidade para qualquer pessoa.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <div className="grid gap-3 sm:grid-cols-3 rounded-2xl border border-line bg-surface-raised p-2 shadow-2xs">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.number} className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-xs">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">{item.number}</span>
                      <strong className="text-xs font-bold uppercase tracking-wider text-ink">
                        {item.title.split(" ")[1] || item.title}
                      </strong>
                    </div>
                    <span className="text-xs text-muted block">{item.tagline}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {pillars.map((item, index) => {
            const MainIcon = item.icon;
            return (
              <Reveal key={item.number} delay={0.2 + index * 0.1}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-7 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform group-hover:scale-105">
                        <MainIcon className="size-5" />
                      </div>
                      <span className="rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-xl font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-primary">
                        {item.tagline}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-4">
                      {item.points.map((pt) => {
                        const PointIcon = pt.icon;
                        return (
                          <li key={pt.title} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                            <PointIcon className="size-4 shrink-0 text-primary mt-0.5" />
                            <div>
                              <strong className="text-ink font-semibold">{pt.title} </strong>
                              <span>{pt.text}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-8 rounded-xl border border-line/60 bg-surface-raised p-3 text-center">
                    <span className="text-[11px] font-semibold text-primary">
                      {item.summary}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
