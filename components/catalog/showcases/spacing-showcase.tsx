"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SpacingVariant = "touch-safety" | "scale-grid" | "edge-gutter";

const VARIATIONS_INFO: Record<
  SpacingVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  "touch-safety": {
    label: "Respiro entre Alvos (8dp+)",
    tag: "Prevenção de Erro",
    ergonomicNote:
      "Alvos de toque adjacentes exigem no mínimo 8dp (idealmente 12-16dp) de separação para evitar toques acidentais simultâneos com a área de contato do polegar (~10mm).",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "scale-grid": {
    label: "Grid de 8pt / 4pt",
    tag: "Escala Harmônica",
    ergonomicNote:
      "Múltiplos de 4px e 8px alinham perfeitamente com a densidade de pixels (@2x e @3x) dos displays mobile, garantindo nitidez sem frações de pixel.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  "edge-gutter": {
    label: "Margem de Borda (Gutter)",
    tag: "Zona de Repouso",
    ergonomicNote:
      "Margem externa mínima de 16px protege contra toques involuntários da base da palma e evita conflitos com os gestos de navegação lateral do iOS e Android.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const SPACING_CODE = `// Escala de Espaçamento e Respiro Tátil com Tailwind CSS
// Regra de Ouro: Distância mínima de 8dp entre alvos de toque e margem de borda >= 16dp

export const RESPIRO_ERGONOMICO = {
  // Respiro mínimo obrigatório entre dois botões/ícones táteis (WCAG 2.5.8)
  touchTargetGap: "gap-2",      // 8px (0.5rem) - Mínimo seguro

  // Respiro recomendado para ações confortáveis sem precisão extrema
  comfortableGap: "gap-3",      // 12px (0.75rem) - Ideal para listas/toolbars
  relaxedGap: "gap-4",          // 16px (1rem) - Botões empilhados

  // Margens de tela (Screen Gutters) - Protege contra toques da palma da mão
  screenGutterMobile: "px-4",   // 16px nas bordas em smartphones
  screenGutterTablet: "px-6",   // 24px em telas maiores
};

// Exemplo: Dois botões com respiro seguro contra toques acidentais
export function BotoesComRespiro() {
  return (
    <div className="flex items-center gap-2.5">
      <button className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-on-primary active:scale-95">
        Salvar
      </button>
      <button className="min-h-11 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink active:scale-95">
        Cancelar
      </button>
    </div>
  );
}`;

type GapChoice = "4px" | "8px" | "16px";

const GAP_DATA: Record<
  GapChoice,
  { label: string; px: number; status: "risk" | "pass" | "gold"; badgeText: string }
> = {
  "4px": {
    label: "4px (Inseguro)",
    px: 4,
    status: "risk",
    badgeText: "Risco de Toque Duplo",
  },
  "8px": {
    label: "8px (Mínimo)",
    px: 8,
    status: "pass",
    badgeText: "WCAG 2.5.8 Seguro",
  },
  "16px": {
    label: "16px (Confortável)",
    px: 16,
    status: "gold",
    badgeText: "Padrão Ouro Hapto",
  },
};

type ScaleToken = "4px" | "8px" | "12px" | "16px" | "24px";

const SCALE_TOKENS: Record<
  ScaleToken,
  { token: string; useCase: string }
> = {
  "4px": { token: "space-1 (0.25rem)", useCase: "Micro-respiro de ícone / badge" },
  "8px": { token: "space-2 (0.5rem)", useCase: "Distância mínima entre alvos de toque" },
  "12px": { token: "space-3 (0.75rem)", useCase: "Respiro entre botões secundários" },
  "16px": { token: "space-4 (1rem)", useCase: "Margem lateral mobile (Screen Gutter)" },
  "24px": { token: "space-6 (1.5rem)", useCase: "Separação entre blocos de conteúdo" },
};

export function SpacingShowcase() {
  const [variant, setVariant] = useState<SpacingVariant>("touch-safety");
  const [selectedGap, setSelectedGap] = useState<GapChoice>("8px");
  const [selectedScale, setSelectedScale] = useState<ScaleToken>("8px");
  const [gutterSize, setGutterSize] = useState<"8px" | "16px">("16px");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];
  const gapInfo = GAP_DATA[selectedGap];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Token de Espaçamento
        </span>
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["touch-safety", "scale-grid", "edge-gutter"] as SpacingVariant[]).map((v) => {
            const isSelected = variant === v;
            const item = VARIATIONS_INFO[v];
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setVariant(v);
                  setLastAction(`Variação: ${item.label}`);
                }}
                aria-pressed={isSelected}
                className={cn(
                  "flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary",
                  isSelected
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-muted hover:bg-surface-raised hover:text-ink"
                )}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xs">
        {variant === "touch-safety" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-muted">Distância entre Alvos:</span>
              <div className="flex gap-1">
                {(["4px", "8px", "16px"] as GapChoice[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setSelectedGap(g);
                      setLastAction(`Respiro ajustado para ${g}: ${GAP_DATA[g].badgeText}`);
                    }}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-all active:scale-95",
                      selectedGap === g
                        ? g === "4px"
                          ? "border-rose-500 bg-rose-500/10 text-rose-600 font-bold"
                          : "border-primary bg-primary/10 text-primary font-bold"
                        : "border-line bg-surface text-muted hover:text-ink"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center rounded-xl border border-line bg-surface-raised/70 p-2.5">
              <div
                className="flex items-center transition-all duration-300"
                style={{ gap: `${gapInfo.px}px` }}
              >
                <button
                  type="button"
                  onClick={() => setLastAction(`Botão 'Confirmar' acionado (${selectedGap} gap)`)}
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-on-primary shadow-2xs transition-transform active:scale-95"
                >
                  Confirmar
                </button>

                <div className="relative flex flex-col items-center">
                  <span className="font-mono text-[9px] font-extrabold text-muted">
                    {gapInfo.px}px
                  </span>
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      gapInfo.status === "risk"
                        ? "bg-rose-500"
                        : gapInfo.status === "pass"
                        ? "bg-emerald-500"
                        : "bg-primary"
                    )}
                    style={{ width: `${Math.max(gapInfo.px, 6)}px` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setLastAction(`Botão 'Excluir' acionado (${selectedGap} gap)`)}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink shadow-2xs transition-transform active:scale-95 hover:border-line"
                >
                  Excluir
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted">Status do Toque:</span>
              <span
                className={cn(
                  "flex items-center gap-1 font-bold",
                  gapInfo.status === "risk"
                    ? "text-rose-600"
                    : gapInfo.status === "pass"
                    ? "text-emerald-600"
                    : "text-primary"
                )}
              >
                {gapInfo.status === "risk" ? (
                  <>
                    <AlertTriangle className="size-3" />
                    <span>{gapInfo.badgeText}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-3" />
                    <span>{gapInfo.badgeText}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        )}

        {variant === "scale-grid" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink">Tokens de Espaçamento</span>
              <span className="text-[10px] text-muted">Grid Base: 8pt</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {(["4px", "8px", "12px", "16px", "24px"] as ScaleToken[]).map((tok) => {
                const isSelected = selectedScale === tok;
                return (
                  <button
                    key={tok}
                    type="button"
                    onClick={() => {
                      setSelectedScale(tok);
                      setLastAction(`Token ${tok}: ${SCALE_TOKENS[tok].token}`);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border p-1.5 transition-all active:scale-95",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-xs"
                        : "border-line bg-surface-raised text-muted hover:border-primary/40 hover:text-ink"
                    )}
                  >
                    <span className="font-mono text-[10px] font-extrabold">{tok}</span>
                    <span className="text-[8px] opacity-75">
                      {tok === "4px" ? "0.5x" : tok === "8px" ? "1x" : tok === "12px" ? "1.5x" : tok === "16px" ? "2x" : "3x"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-lg border border-line bg-surface-raised/70 px-2 py-1.5 text-center">
              <p className="truncate text-[10px] text-ink font-medium">
                <strong className="text-primary">{selectedScale}</strong>: {SCALE_TOKENS[selectedScale].useCase}
              </p>
            </div>
          </div>
        )}

        {variant === "edge-gutter" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink">Margem Lateral da Tela</span>
              <div className="flex gap-1">
                {(["8px", "16px"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      setGutterSize(sz);
                      setLastAction(`Gutter: ${sz} ${sz === "16px" ? "(Recomendado)" : "(Estreito)"}`);
                    }}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all active:scale-95",
                      gutterSize === sz
                        ? sz === "16px"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-amber-500 bg-amber-500/10 text-amber-600"
                        : "border-line bg-surface text-muted"
                    )}
                  >
                    {sz} {sz === "16px" && "★"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center rounded-xl border border-line bg-surface-raised/80 p-2">
              <div
                className="flex w-full items-center justify-between rounded-lg border border-dashed border-primary/50 bg-surface py-2 text-center transition-all duration-300"
                style={{
                  paddingLeft: `${gutterSize === "16px" ? 16 : 8}px`,
                  paddingRight: `${gutterSize === "16px" ? 16 : 8}px`,
                }}
              >
                <span className="font-mono text-[9px] text-primary font-bold">
                  {gutterSize}
                </span>
                <span className="text-[10px] font-bold text-ink truncate px-1">
                  Área Segura de Conteúdo
                </span>
                <span className="font-mono text-[9px] text-primary font-bold">
                  {gutterSize}
                </span>
              </div>
            </div>

            <p className="truncate text-center text-[10px] text-muted">
              {gutterSize === "16px"
                ? "16px cria o recuo ideal contra toques fantasmas da palma."
                : "8px fica muito rente à borda física do smartphone."}
            </p>
          </div>
        )}
      </div>

      <div className="h-[86px] w-full shrink-0 overflow-hidden rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
          <span className="flex min-w-0 items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">Ergonomia ({currentInfo.label})</span>
          </span>
          <span
            className={cn(
              "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              currentInfo.badgeColor
            )}
          >
            {currentInfo.tag}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      <div className="flex h-[26px] w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="truncate font-mono text-[10px]">
          Alvos: &ge;8dp gap • Gutter: 16px • Grid: 8pt
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Teste as distâncias e alvos</span>
          )}
        </span>
      </div>
    </div>
  );
}
