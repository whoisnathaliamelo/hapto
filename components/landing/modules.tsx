import { BookOpen, Palette, Terminal, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

const modules = [
  {
    id: "fundamentos",
    badge: "Módulo 01",
    title: "Início & Fundamento",
    icon: BookOpen,
    description:
      "A base teórica e ergonômica: zonas de alcance do polegar, Lei de Fitts adaptada ao mobile, dimensões mínimas de toque e acessibilidade motora.",
    features: [
      "Mapa de calor da pegada mobile (one-hand & two-hands)",
      "Por que 44px e 48px são os padrões de toque",
      "Ergonomia em diferentes tamanhos de tela",
    ],
  },
  {
    id: "tokens",
    badge: "Módulo 02",
    title: "Catálogo de Componentes",
    icon: Palette,
    description:
      "Escalas calibradas para interfaces táteis organizadas por módulos de uso prático para consistência total entre design e código.",
    features: [
      "Buttons: alturas, paddings e estados ativos",
      "Inputs: alvos confortáveis e prevenção de zoom involuntário",
      "Typography & Spacing: hierarquia legível sob luz solar",
    ],
  },
  {
    id: "playground",
    badge: "Módulo 03",
    title: "Playground",
    icon: Terminal,
    description:
      "Ambiente interativo para testar estados dos componentes, ler a justificativa ergonômica de cada decisão e copiar o código pronto para produção.",
    features: [
      "Teste de componentes em tempo real",
      "Explicativas anatômicas integradas",
      "Snippet de código pronto (React, CVA & Tailwind)",
    ],
  },
];

export function Modules() {
  return (
    <section id="modulos" className="scroll-mt-16 bg-surface-raised/40 py-24 border-b border-line/40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Estrutura do Design System
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Dividido em 3 módulos essenciais
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Uma trilha pensada tanto para quem precisa consultar tokens rápidos quanto para quem
              deseja dominar os fundamentos ergonômicos.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.badge} delay={i * 0.1}>
                <div
                  id={m.id}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div>
                    {/* Header do Card com numeração proporcional */}
                    <div className="flex items-center justify-between border-b border-line/50 pb-5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light px-2.5 py-1 text-xs font-bold text-primary">
                        {m.badge}
                      </span>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-surface-raised text-primary">
                        <Icon className="size-5" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-ink group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {m.description}
                    </p>

                    {/* Lista de tópicos dentro do módulo */}
                    <ul className="mt-6 space-y-2.5 border-t border-line/40 pt-5">
                      {m.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-muted">
                          <Check className="size-4 shrink-0 text-primary mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-line/40">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      Acessar módulo <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
