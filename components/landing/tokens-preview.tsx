import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { MousePointerClick, TextCursorInput, Type, MoveVertical, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const tokenModules = [
  {
    id: "buttons",
    icon: MousePointerClick,
    title: "Módulo Buttons",
    description: "Alturas de toque calibradas (40px a 56px), raio de borda, padding e micro-interações de clique.",
    badge: "Ações táteis",
    href: "/components#buttons",
  },
  {
    id: "inputs",
    icon: TextCursorInput,
    title: "Módulo Inputs",
    description: "Campos de texto com alvo generoso e tipografia mínima que evita zoom involuntário no iOS.",
    badge: "Formulários",
    href: "/components#inputs",
  },
  {
    id: "typography",
    icon: Type,
    title: "Módulo Typography",
    description: "Escalas tipográficas com contraste e hierarquia legíveis mesmo sob luz solar externa.",
    badge: "Leitura",
    href: "/components#typography",
  },
  {
    id: "spacing",
    icon: MoveVertical,
    title: "Módulo Spacing & Targets",
    description: "Distâncias de segurança entre alvos adjacentes para evitar toques incorretos acidentais.",
    badge: "Áreas de toque",
    href: "/components",
  },
];

export function TokensPreview() {
  return (
    <section
      id="componentes"
      className="flex min-h-[calc(100svh-5rem)] scroll-mt-20 items-center border-b border-line/40 bg-surface-raised/30 py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-line/40 pb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Módulo 02
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Catálogo de Componentes
              </h2>
              <p className="mt-3 text-base text-muted">
                Biblioteca modular guiada por Atomic Design: tokens, átomos, moléculas e organismos calibrados para telas sensíveis ao toque.
              </p>
            </div>

            <Link
              href="/components"
              className={buttonVariants({ variant: "outline", size: "md", className: "self-start md:self-auto shrink-0" })}
            >
              Explorar catálogo completo <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tokenModules.map(({ id, icon: Icon, title, description, badge, href }, i) => (
            <Reveal key={id} delay={i * 0.08}>
              <Link
                href={href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
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
                  <span>Ver especificações</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
