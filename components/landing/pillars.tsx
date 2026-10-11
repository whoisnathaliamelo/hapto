import { Hand, Target, BookOpenCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

const foundations = [
  {
    icon: Hand,
    title: "Zonas de Alcance do Polegar",
    text: "O mapeamento visual das áreas natural, esticada e de difícil alcance para uso com uma e duas mãos.",
  },
  {
    icon: Target,
    title: "Lei de Fitts e Alvos Táteis",
    text: "Por que 44px e 48px são os padrões científicos que previnem erros de toque e reduzem o tempo de reação.",
  },
  {
    icon: BookOpenCheck,
    title: "Anatomia e Decisões de Design",
    text: "Princípios práticos de acessibilidade motora aplicados à construção de fluxos mobile fluidos.",
  },
];

export function Pillars() {
  return (
    <section
      id="fundamentos"
      className="flex min-h-[calc(100svh-5rem)] scroll-mt-20 items-center border-b border-line/40 py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-line/40 pb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Módulo 01
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Início & Fundamento
              </h2>
              <p className="mt-3 text-base text-muted">
                A base teórica e ergonômica: compreenda os limites físicos das mãos e as regras para criar interfaces confortáveis.
              </p>
            </div>

            <Link
              href="/fundamentals"
              className={buttonVariants({ variant: "outline", size: "md", className: "self-start md:self-auto shrink-0" })}
            >
              Acessar módulo completo <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {foundations.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-xs transition-all hover:border-primary/50 hover:shadow-md">
                <div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
