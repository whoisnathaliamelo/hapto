import { BookOpen, FlaskConical, Palette } from "lucide-react";
import { Reveal } from "@/components/reveal";

const modules = [
  { n: "01", icon: BookOpen, title: "Início & Fundamento", text: "Princípios de ergonomia mobile e a filosofia do Hapto." },
  { n: "02", icon: Palette, title: "Design Tokens", text: "Cores, tipografia e espaçamento, separados por inputs, botões, textos e mais." },
  { n: "03", icon: FlaskConical, title: "Playground", text: "Explore variações, entenda as escolhas e copie o código." },
];

export function Modules() {
  return (
    <section id="modulos" className="scroll-mt-20 bg-secondary-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Uma jornada em 3 módulos</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {modules.map(({ n, icon: Icon, title, text }, i) => (
            <Reveal key={n} delay={i * 0.1}>
              <a
                href="#"
                className="group relative block h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition active:scale-[0.98]"
              >
                <span className="absolute -top-4 right-4 text-8xl font-bold text-primary/10 transition group-hover:text-primary/20">
                  {n}
                </span>
                <Icon className="size-7 text-primary" />
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
