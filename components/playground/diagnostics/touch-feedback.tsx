import type { TargetSize, TouchEventData } from "../types";
import {
  Activity,
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
    <div className="h-[610px] sm:h-[640px] w-full rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between select-none">
      <div>
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

        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-surface-raised/60 border border-line/60 p-3 h-[60px]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Target Calibrado
            </span>
            <p className="text-base font-extrabold text-ink leading-tight">{targetSize}</p>
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
            <p className="text-[10px] text-muted mt-0.5 truncate max-w-[190px]">
              {targetEvaluation.description}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line/70 bg-surface-raised/30 p-4 space-y-3 h-[290px] flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-line/40 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <Fingerprint className="size-3.5 text-primary" />
            <span>Último Toque</span>
          </h4>
          <span className="text-[10px] text-muted font-medium">
            {lastTouch ? "Registrado" : "Aguardando"}
          </span>
        </div>

        <div className="rounded-lg border border-line/60 bg-surface p-2.5 space-y-1.5 h-[62px] flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted">Elemento:</span>
            <span className="text-[11px] font-bold text-ink flex items-center gap-1 truncate max-w-[180px]">
              <MousePointerClick className="size-3 text-primary shrink-0" />
              {lastTouch ? lastTouch.elementClicked : "Nenhum toque"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted">Zona:</span>
            {lastTouch ? (
              <span
                className={cn(
                  "rounded px-1.5 py-0.2 text-[9px] font-bold border",
                  getZoneEvaluation(lastTouch.zone).badgeColor
                )}
              >
                {getZoneEvaluation(lastTouch.zone).title}
              </span>
            ) : (
              <span className="rounded bg-line/40 px-1.5 py-0.2 text-[9px] font-medium text-muted">
                Toque no celular
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1 h-[42px] flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-muted">Fadiga Motora</span>
            <span className="font-bold text-ink">
              {lastTouch
                ? getZoneEvaluation(lastTouch.zone).effortLabel
                : "0% — Sem esforço"}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-surface-raised border border-line/60 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                lastTouch
                  ? getZoneEvaluation(lastTouch.zone).barColor
                  : "bg-transparent"
              )}
              style={{
                width: `${lastTouch ? getZoneEvaluation(lastTouch.zone).effortPercent : 0}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-line/50 bg-surface p-2.5 h-[105px] flex flex-col justify-between text-[11px]">
          <div className="flex items-start gap-1.5 text-muted leading-relaxed line-clamp-2">
            <Info className="size-3 text-primary mt-0.5 shrink-0" />
            <span>
              {lastTouch
                ? getZoneEvaluation(lastTouch.zone).description
                : "Toque em qualquer botão, aba ou campo dentro do celular simulado para ver a análise de ergonomia."}
            </span>
          </div>
          <div className="flex items-start gap-1.5 text-primary text-[10px] font-semibold pt-1 border-t border-line/40 line-clamp-1">
            <Sparkles className="size-3 shrink-0 mt-0.5" />
            <span>
              {lastTouch
                ? getZoneEvaluation(lastTouch.zone).recommendation
                : "Elementos na base reduzem o tempo de reação e o risco de miss-click."}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-xs space-y-1 h-[88px] flex flex-col justify-center">
        <div className="flex items-center gap-1.5 font-bold text-primary text-[11px]">
          <CheckCircle2 className="size-3.5 shrink-0" />
          <span>Regra dos 75% da Steven Hoober</span>
        </div>
        <p className="text-[10px] text-muted leading-relaxed line-clamp-2">
          Mais de 75% das interações mobile ocorrem com o polegar de uma só mão. Posicionar alvos na base previne quedas do aparelho e esforço articular.
        </p>
      </div>
    </div>
  );
}

