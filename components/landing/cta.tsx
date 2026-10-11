import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-center text-on-primary">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-accent/30 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
            Pronta para desenhar para o toque?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md opacity-80">
            Comece pelos fundamentos e avance no seu ritmo.
          </p>
          <a href="#modulos" className={buttonVariants({ variant: "outline", className: "relative mt-8 text-ink" })}>
            Começar agora
          </a>
        </div>
      </Reveal>
    </section>
  );
}
