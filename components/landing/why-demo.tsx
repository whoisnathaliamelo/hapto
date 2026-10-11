import { Reveal } from "@/components/reveal";

export function WhyDemo() {
  return (
    <section id="ensina" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="grid items-center gap-12 rounded-[2rem] border border-line bg-surface p-8 md:grid-cols-2 md:p-14">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Não é só copiar. É entender.
          </h2>
          <p className="mt-4 text-muted">
            Em cada componente você vê as medidas e o motivo delas. Aqui, por exemplo, por que
            um botão tem 48px de altura.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto flex max-w-xs items-center gap-4">
            <div className="flex h-12 flex-col items-center justify-between text-xs text-primary">
              <span className="h-full w-px bg-primary" />
            </div>
            <div className="flex-1">
              <div className="grid h-12 place-items-center rounded-full bg-primary font-medium text-on-primary">
                Confirmar
              </div>
              <p className="mt-3 text-sm text-muted">
                <b className="text-ink">48px</b> — a média da ponta de um dedo é ~10mm, e esse
                tamanho evita toques errados.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
