import { ArrowRight, CheckCircle2, Smartphone, Layers, Code2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/40">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto grid max-w-6xl items-center justify-items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:py-16">
        {/* Lado Esquerdo: Conteúdo Principal */}
        <div className="w-full max-w-lg text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <Reveal>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Design system focado em{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-4">
                ergonomia mobile
              </span>{" "}
              e fundamentos.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Mais do que copiar código: uma ferramenta para entender a anatomia, o alcance do
              polegar e as decisões por trás de cada componente.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <a href="#fundamentos" className={buttonVariants({ variant: "primary", size: "md" })}>
              Conhecer módulos <ArrowRight className="size-4" />
            </a>
            <a href="#playground" className={buttonVariants({ variant: "outline", size: "md" })}>
              Ver playground
            </a>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Target mínimo de 48px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Zona do polegar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Explicativas por componente</span>
            </div>
          </Reveal>
        </div>

        {/* Lado Direito: Celular Perfeitamente Centrado */}
        <div className="w-full flex justify-center items-center">
          <Reveal delay={0.15}>
            <ErgonomicPhonePreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ErgonomicPhonePreview() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[275px]">
      {/* Moldura do celular com altura confortável */}
      <div className="relative rounded-[2.2rem] border-2 border-line bg-surface p-3 shadow-xl shadow-primary/10">
        {/* Speaker */}
        <div className="mx-auto mb-2.5 flex h-3 w-16 items-center justify-center rounded-full bg-line/60">
          <div className="size-1 rounded-full bg-muted/40" />
        </div>

        <div className="flex flex-col gap-2.5 rounded-[1.8rem] bg-bg p-3.5 pb-2.5">
          {/* Top Header Mockup */}
          <div className="flex items-center justify-between border-b border-line/50 pb-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">
                Hapto
              </p>
              <p className="text-xs font-bold text-ink">Touch Anatomy</p>
            </div>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[9px] font-semibold text-primary">
              Mobile 1st
            </span>
          </div>

          {/* Zona de Leitura Passiva */}
          <div className="rounded-xl border border-line bg-surface p-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold text-muted">Zona Superior</span>
              <span className="text-[9px] text-muted/70">Leitura passiva</span>
            </div>
            <p className="mt-1 text-[11px] text-muted leading-tight">
              Área de contexto e status. Ações críticas não devem ficar aqui.
            </p>
          </div>

          {/* Destaque: Zona do Polegar */}
          <div className="relative rounded-xl border-2 border-dashed border-primary/40 bg-primary-light/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Zona do Polegar (Reach Zone)
              </span>
            </div>

            {/* Ação Primária */}
            <div className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-semibold text-on-primary shadow-sm">
              <span>Ação Principal</span>
              <span className="rounded bg-black/15 px-1 py-0.5 text-[9px]">48px</span>
            </div>

            {/* Ações Secundárias */}
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div className="flex h-9 items-center justify-center rounded-lg border border-line bg-surface text-[10px] font-medium text-ink">
                Secundário
              </div>
              <div className="flex h-9 items-center justify-center rounded-lg border border-line bg-surface text-[10px] font-medium text-ink">
                Opções
              </div>
            </div>
          </div>

          {/* Bottom Bar Simulator */}
          <div className="flex items-center justify-around border-t border-line/60 pt-1.5 text-muted">
            <div className="flex flex-col items-center text-primary">
              <Smartphone className="size-3.5" />
              <span className="text-[8px] font-semibold mt-0.5">Toque</span>
            </div>
            <div className="flex flex-col items-center">
              <Layers className="size-3.5" />
              <span className="text-[8px] mt-0.5">Tokens</span>
            </div>
            <div className="flex flex-col items-center">
              <Code2 className="size-3.5" />
              <span className="text-[8px] mt-0.5">Código</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
