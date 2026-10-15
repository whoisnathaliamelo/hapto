import { ArrowRight, CheckCircle2, Smartphone, Layers, Code2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/40 lg:h-[calc(100dvh-4rem)] lg:min-h-[560px] flex items-center">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto grid w-full max-w-6xl items-center justify-items-center gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-10 lg:py-0">
        {/* Lado Esquerdo: Conteúdo Principal */}
        <div className="w-full max-w-lg text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <Reveal>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15] xl:text-5xl xl:leading-[1.12]">
              Design system focado em{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-4">
                ergonomia mobile
              </span>{" "}
              e fundamentos.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Mais do que copiar código: uma ferramenta para entender a anatomia, o alcance do
              polegar e as decisões por trás de cada componente.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <a href="#fundamentos" className={buttonVariants({ variant: "primary", size: "md" })}>
              Conhecer módulos <ArrowRight className="size-4" />
            </a>
            <a href="#playground" className={buttonVariants({ variant: "outline", size: "md" })}>
              Ver playground
            </a>
          </Reveal>

          <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-muted">
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

        {/* Lado Direito: Celular Comprido e Proporcional */}
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
    <div className="relative mx-auto w-[275px] sm:w-[285px] lg:w-[290px] transition-transform duration-300 hover:-translate-y-1">
      {/* Moldura de celular moderna, comprida (formato smartphone 19.5:9) */}
      <div className="relative h-[495px] sm:h-[510px] w-full rounded-[2.75rem] border-[3.5px] border-line/90 bg-surface p-3 shadow-2xl shadow-primary/10 transition-shadow duration-300 hover:shadow-primary/20 flex flex-col justify-between">
        {/* Dynamic Island / Speaker */}
        <div className="mx-auto mb-2 flex h-3.5 w-24 shrink-0 items-center justify-center rounded-full bg-line/80 px-2">
          <div className="size-1.5 rounded-full bg-muted/50 mr-2" />
          <div className="h-1 w-7 rounded-full bg-muted/40" />
        </div>

        {/* Tela Interna do Smartphone */}
        <div className="flex flex-1 flex-col justify-between rounded-[2.1rem] border border-line/40 bg-bg p-3.5 overflow-hidden">
          {/* Top Status & Header */}
          <div className="flex items-center justify-between border-b border-line/50 pb-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                Hapto
              </p>
              <p className="text-xs font-bold text-ink">Touch Anatomy</p>
            </div>
            <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-semibold text-primary">
              Mobile 1st
            </span>
          </div>

          {/* Zona 1: Superior (Leitura Passiva / Alcance Difícil) */}
          <div className="rounded-xl border border-line/70 bg-surface p-2.5 transition hover:border-line">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-muted">Zona Superior</span>
              <span className="rounded bg-line/40 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                Leitura passiva
              </span>
            </div>
            <p className="mt-1 text-[10px] text-muted leading-tight">
              Área de contexto e status. Ações críticas não devem ficar aqui.
            </p>
          </div>

          {/* Zona 2: Central (Zona Neutra / Navegação Secundária) */}
          <div className="rounded-xl border border-line/60 bg-surface/50 p-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-muted">Zona Média</span>
              <span className="text-[9px] text-muted/70">Scroll & Leitura</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-6 flex-1 rounded-md bg-line/30 flex items-center px-2 text-[9px] text-muted">
                Card de conteúdo
              </div>
              <div className="size-6 rounded-md bg-line/40 flex items-center justify-center text-[10px] font-bold text-muted">
                #1
              </div>
            </div>
          </div>

          {/* Zona 3: Inferior (Reach Zone / Zona do Polegar - Alcance Fácil) */}
          <div className="relative rounded-xl border-2 border-dashed border-primary/45 bg-primary-light/40 p-2.5 sm:p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Zona do Polegar (Reach Zone)
              </span>
            </div>

            {/* Ação Primária (Target mínimo 48px) */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold text-on-primary shadow-sm transition hover:brightness-110 active:scale-[0.98] cursor-pointer"
            >
              <span>Ação Principal</span>
              <span className="rounded bg-black/15 px-1.5 py-0.5 text-[9px]">48px</span>
            </button>

            {/* Ações Secundárias */}
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                className="flex h-8.5 items-center justify-center rounded-lg border border-line bg-surface text-[10px] font-medium text-ink shadow-2xs transition hover:bg-line/20 active:scale-[0.98] cursor-pointer"
              >
                Secundário
              </button>
              <button
                type="button"
                className="flex h-8.5 items-center justify-center rounded-lg border border-line bg-surface text-[10px] font-medium text-ink shadow-2xs transition hover:bg-line/20 active:scale-[0.98] cursor-pointer"
              >
                Opções
              </button>
            </div>
          </div>

          {/* Bottom Bar Simulator */}
          <div className="flex items-center justify-around border-t border-line/60 pt-2 text-muted">
            <div className="flex flex-col items-center text-primary cursor-pointer transition hover:opacity-80">
              <Smartphone className="size-3.5" />
              <span className="text-[9px] font-semibold mt-0.5">Toque</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer transition hover:text-ink">
              <Layers className="size-3.5" />
              <span className="text-[9px] mt-0.5">Tokens</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer transition hover:text-ink">
              <Code2 className="size-3.5" />
              <span className="text-[9px] mt-0.5">Código</span>
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="mx-auto mt-0.5 h-1 w-20 shrink-0 rounded-full bg-muted/25" />
        </div>
      </div>
    </div>
  );
}
