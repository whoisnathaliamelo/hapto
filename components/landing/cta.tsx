import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-10 text-center shadow-sm sm:p-16">
          <div className="absolute inset-0 -z-10 bg-radial from-primary/10 via-transparent to-transparent opacity-70" />
          
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Pronto para aplicar ergonomia mobile de verdade?
          </h2>
          
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Acesse os tokens, explore o playground interativo e entenda como pequenas alterações
            em targets e zonas de toque transformam a usabilidade mobile.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/fundamentals" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Começar pelos fundamentos <ArrowRight className="size-4" />
            </Link>
            <Link href="/playground" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Acessar o playground
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
