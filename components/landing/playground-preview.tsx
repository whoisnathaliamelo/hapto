import { Reveal } from "@/components/reveal";
import { Sliders, BookOpen, Code2, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const playgroundCards = [
  {
    icon: Sliders,
    badge: "Laboratório interativo",
    title: "Variações Táteis ao Vivo",
    description:
      "Alterne tamanhos (44px vs 48px), estados de foco e variantes em tempo real para sentir o comportamento na mão.",
  },
  {
    icon: BookOpen,
    badge: "Justificativas de UX",
    title: "Explicativas Anatômicas",
    description:
      "Cada componente vem com a justificativa de ergonomia: alcance do polegar, prevenção de zoom e contraste.",
  },
  {
    icon: Code2,
    badge: "Exportação direta",
    title: "Código Pronto para Copiar",
    description:
      "Copie snippets limpos em React, Tailwind v4 e CVA, prontos para colar no seu projeto com um clique.",
  },
];

export function PlaygroundPreview() {
  return (
    <section
      id="playground"
      className="flex min-h-[calc(100svh-5rem)] scroll-mt-20 items-center border-b border-line/40 py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-line/40 pb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Módulo 03
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Playground
              </h2>
              <p className="mt-3 text-base text-muted">
                O laboratório prático: explore componentes, entenda a razão de cada detalhe e copie o código pronto para sua aplicação.
              </p>
            </div>

            <a
              href="#playground"
              className={buttonVariants({ variant: "outline", size: "md", className: "self-start md:self-auto shrink-0" })}
            >
              Acessar playground <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {playgroundCards.map(({ icon: Icon, badge, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                      {badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-ink group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-4 text-xs font-semibold text-primary">
                  <span>Ver no playground</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
