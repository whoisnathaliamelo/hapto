"use client";

import Link from "next/link";
import { ArrowLeft, Smartphone, Target, Eye } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function HeroFundamentals() {
  const metrics = [
    {
      icon: Smartphone,
      value: "+6,8 Bilhões",
      label: "Usuários de smartphones no mundo",
      description: "A tela sensível ao toque é a interface computacional mais utilizada no planeta.",
      badge: "Alcance Global",
    },
    {
      icon: Target,
      value: "48 × 48 dp",
      label: "Área mínima para toque",
      description: "Prevenção anatômica de toques acidentais baseada na Lei de Fitts e na ponta do dedo.",
      badge: "Padrão Tátil",
    },
    {
      icon: Eye,
      value: "4.5 : 1",
      label: "Razão mínima de contraste",
      description: "Critério WCAG AA que assegura legibilidade sob luz solar e para baixa visão.",
      badge: "Acessibilidade",
    },
  ];

  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-line/40 py-16 lg:py-24">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-72 w-full max-w-4xl bg-radial from-primary/15 via-transparent to-transparent opacity-60 blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-muted backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-surface-raised hover:text-ink active:scale-95 shadow-2xs"
            >
              <ArrowLeft className="size-3.5 text-primary" />
              <span>Voltar ao Início</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 max-w-3xl">

          <Reveal delay={0.15}>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Ergonomia Mobile &{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Design Systems
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl max-w-2xl">
              Construindo interfaces acessíveis, intuitivas e eficientes para a era <em>touch</em>. Compreenda a ciência das pontas dos dedos e a escala modular.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <Reveal key={metric.value} delay={0.25 + i * 0.1}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/5 blur-xl transition-opacity group-hover:opacity-100 opacity-0" />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {metric.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="block text-3xl font-extrabold tracking-tight text-ink group-hover:text-primary transition-colors">
                        {metric.value}
                      </span>
                      <h2 className="mt-1 text-sm font-bold text-ink">
                        {metric.label}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 border-t border-line/50 pt-3 text-xs leading-relaxed text-muted">
                    {metric.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
