import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-24 left-1/4 -z-10 size-96 animate-float rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute top-40 right-1/4 -z-10 size-80 animate-float rounded-full bg-accent/40 blur-3xl [animation-delay:-4s]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-24 lg:grid-cols-2 lg:pt-28">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur">
              <Sparkles className="size-4 text-primary" /> Design system feito para o toque
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              Componentes que cabem no{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                seu polegar
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Hapto reúne componentes com ergonomia mobile e explica o porquê de cada decisão.
              Você não só copia, você entende.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            <a href="#modulos" className={buttonVariants()}>
              Começar a explorar <ArrowRight className="size-5" />
            </a>
            <a href="#ensina" className={cn(buttonVariants({ variant: "outline" }))}>
              Ver como funciona
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center">
          <PhoneMock />
        </Reveal>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="animate-float">
      <div className="relative h-[540px] w-[270px] rounded-[2.8rem] border border-line bg-surface p-3 shadow-2xl shadow-primary/20">
        <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-line" />
        <div className="space-y-4 px-3">
          <p className="text-sm text-muted">Bem-vinda de volta</p>
          <p className="text-2xl font-semibold">Entrar</p>
          <div className="h-12 rounded-2xl border border-line bg-bg" />
          <div className="h-12 rounded-2xl border border-line bg-bg" />
        </div>
        <div className="absolute inset-x-3 bottom-3 h-48 rounded-[2.2rem] bg-gradient-to-t from-primary/25 to-transparent" />
        <div className="absolute inset-x-6 bottom-8 grid h-12 place-items-center rounded-full bg-primary text-sm font-medium text-on-primary">
          Continuar
        </div>
        <span className="absolute right-4 bottom-24 rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg dark:text-bg">
          zona do polegar
        </span>
      </div>
    </div>
  );
}
