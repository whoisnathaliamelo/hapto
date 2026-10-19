import type { TargetSize, TouchEventData } from "../types";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Fingerprint,
  Info,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TouchFeedbackProps {
  lastTouch: TouchEventData | null;
  targetSize: TargetSize;
}

export function TouchFeedback({ lastTouch, targetSize }: TouchFeedbackProps) {
  const getZoneEvaluation = (zone: TouchEventData["zone"]) => {
    switch (zone) {
      case "natural":
        return {
          title: "Zona Natural",
          badge: "Confortável",
          badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
          barColor: "bg-emerald-500",
          effortPercent: 15,
          effortLabel: "Baixo (15% de fadiga motora)",
          description:
            "Excelente posição ergonômica. O polegar toca sem rotação de punho nem troca de empunhadura do aparelho.",
          recommendation: "Ideal para botões de CTA primário, abas de navegação e FAB.",
        };
      case "stretch":
        return {
          title: "Zona Esticada",
          badge: "Alcance Moderado",
          badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
          barColor: "bg-amber-500",
          effortPercent: 55,
          effortLabel: "Médio (55% de esforço muscular)",
          description:
            "Requer esticar a articulação do polegar. Em telas acima de 6.1\", pode começar a exigir micro-ajuste na mão.",
          recommendation: "Adequado para cartões de conteúdo e botões secundários ocasionais.",
        };
      case "hard":
        return {
          title: "Zona Difícil",
          badge: "Alto Esforço",
          badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
          barColor: "bg-rose-500",
          effortPercent: 90,
          effortLabel: "Crítico (90% de esforço / risco de queda)",
          description:
            "Força o usuário a deslizar o aparelho na palma da mão ou recorrer à segunda mão para alcançar o topo.",
          recommendation: "Reserve apenas para status, leitura passiva ou ações de rara execução.",
        };
    }
  };

  const targetEvaluation = {
    "40px": {
      tag: "Alto risco de erro",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      description: "Abaixo da largura do dedo (~10mm). Aumenta toque duplo acidental.",
    },
    "44px": {
      tag: "Mínimo aceitável",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      description: "Padrão Apple HIG. Aceitável, mas requer precisão visual.",
    },
    "48px": {
      tag: "Padrão Ouro (48dp)",
      badgeColor: "bg-primary-light text-primary border-primary/30",
      description: "Ergonomia ideal. Garante toque confortável sem miss-click.",
    },
  }[targetSize];

  return (
    <aside className="space-y-4">
      {/* 1. Header do Painel */}
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-line/50 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
              <Activity className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Diagnóstico Tátil</h3>
              <p className="text-[11px] text-muted">Métricas de alcance em tempo real</p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-surface-raised border border-line px-2.5 py-1 text-[10px] font-bold text-ink">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Ativo
          </span>
        </div>

        {/* Status da Calibragem do Target */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-surface-raised/60 border border-line/60 p-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Target Calibrado
            </span>
            <p className="text-base font-extrabold text-ink">{targetSize}</p>
          </div>
          <div className="text-right">
            <span
              className={cn(
                "inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold",
                targetEvaluation.badgeColor
              )}
            >
              {targetEvaluation.tag}
            </span>
            <p className="text-[10px] text-muted mt-0.5">
              {targetEvaluation.description}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Análise do Toque Atual */}
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5 mb-3">
          <Fingerprint className="size-3.5 text-primary" />
          <span>Último Toque Registrado</span>
        </h4>

        {lastTouch ? (
          <div className="space-y-4">
            {/* Componente e Zona */}
            <div className="rounded-xl border border-line/70 bg-surface-raised/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Elemento Tocado:</span>
                <span className="text-xs font-bold text-ink flex items-center gap-1">
                  <MousePointerClick className="size-3 text-primary" />
                  {lastTouch.elementClicked}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Zona de Alcance:</span>
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-bold",
                    getZoneEvaluation(lastTouch.zone).badgeColor
                  )}
                >
                  {getZoneEvaluation(lastTouch.zone).title}
                </span>
              </div>
            </div>

            {/* Barra de Esforço Motor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted">Esforço Motor Estimado</span>
                <span className="font-bold text-ink">
                  {getZoneEvaluation(lastTouch.zone).effortLabel}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-surface-raised border border-line/60 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    getZoneEvaluation(lastTouch.zone).barColor
                  )}
                  style={{
                    width: `${getZoneEvaluation(lastTouch.zone).effortPercent}%`,
                  }}
                />
              </div>
            </div>

            {/* Justificativa e Recomendação de UX */}
            <div className="rounded-xl border border-line/50 bg-surface p-3 space-y-1.5 text-xs">
              <div className="flex items-start gap-1.5 text-muted leading-relaxed">
                <Info className="size-3.5 text-primary mt-0.5 shrink-0" />
                <span>{getZoneEvaluation(lastTouch.zone).description}</span>
              </div>
              <div className="flex items-start gap-1.5 text-primary text-[11px] font-medium pt-1 border-t border-line/40">
                <Sparkles className="size-3 mt-0.5 shrink-0" />
                <span>{getZoneEvaluation(lastTouch.zone).recommendation}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted border border-dashed border-line rounded-xl p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-surface-raised text-primary mb-2">
              <MousePointerClick className="size-5" />
            </div>
            <p className="text-xs font-semibold text-ink">Nenhum toque registrado</p>
            <p className="mt-1 text-[11px] text-muted max-w-xs leading-relaxed">
              Toque em qualquer botão, aba ou campo dentro do celular simulado para ver a análise ergonômica em tempo real.
            </p>
          </div>
        )}
      </div>

      {/* 3. Dica Rápida de Acessibilidade */}
      <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-primary">
          <CheckCircle2 className="size-3.5" />
          <span>Regra dos 75% da Steven Hoober</span>
        </div>
        <p className="text-[11px] text-muted leading-relaxed">
          Mais de 75% das interações em smartphones são realizadas com o polegar de uma única mão. Desenhar respeitando o alcance inferior reduz a frustração e o cansaço articular.
        </p>
      </div>
    </aside>
  );
}

