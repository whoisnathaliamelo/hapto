import { GraduationCap, Hand, Target } from "lucide-react";
import { Reveal } from "@/components/reveal";

const pillars = [
  { icon: Hand, title: "Feito para o polegar", text: "Ações principais ficam na zona de alcance, onde a mão realmente chega." },
  { icon: Target, title: "Alvos confortáveis", text: "Áreas de toque de 44 a 48px e espaçamento que evita toques errados." },
  { icon: GraduationCap, title: "Ensina o porquê", text: "Cada componente vem com a explicação da decisão por trás do design." },
];

export function Pillars() {
  return (
    <section id="pilares" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <Reveal>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Três ideias guiam tudo
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <article className="h-full rounded-3xl border border-line bg-surface p-7 transition hover:-translate-y-1 hover:border-primary">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
