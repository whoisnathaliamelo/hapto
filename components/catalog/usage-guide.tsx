import { Info } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function UsageGuide() {
  return (
    <Reveal delay={0.05}>
      <aside className="mb-8 rounded-2xl border border-primary/20 bg-primary-light/40 p-5 text-sm text-ink backdrop-blur-xs">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Info className="size-5" />
          <span>Como usar os componentes no seu projeto</span>
        </div>
        <div className="mt-3 grid gap-3 text-xs leading-relaxed text-muted sm:grid-cols-3">
          <div className="rounded-xl border border-line/60 bg-surface/80 p-3.5 shadow-2xs">
            <strong className="block text-ink font-semibold">1. Zero Dependências</strong>
            Copie e cole o código JSX direto no seu projeto React com Tailwind CSS. Não precisa instalar bibliotecas extras de componentes.
          </div>
          <div className="rounded-xl border border-line/60 bg-surface/80 p-3.5 shadow-2xs">
            <strong className="block text-ink font-semibold">2. Ícones</strong>
            Os exemplos utilizam <code className="font-mono font-semibold text-primary">lucide-react</code>, mas você pode usar qualquer SVG ou biblioteca de ícones.
          </div>
          <div className="rounded-xl border border-line/60 bg-surface/80 p-3.5 shadow-2xs">
            <strong className="block text-ink font-semibold">3. Cores & Tokens</strong>
            Os componentes usam classes do Hapto (<code className="font-mono text-primary">primary</code>, <code className="font-mono text-primary">ink</code>). Mantenha essas variáveis ou substitua pelas cores do seu tema (ex: <code className="font-mono text-ink">emerald-600</code>).
          </div>
        </div>
      </aside>
    </Reveal>
  );
}
