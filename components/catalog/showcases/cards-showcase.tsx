"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  Info,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardTitle,
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui";

type CardVariant = "interactive" | "with-action" | "metric";

const VARIATIONS_INFO: Record<
  CardVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  interactive: {
    label: "Superfície Total",
    tag: "Toque em Toda a Área",
    ergonomicNote: "O card inteiro é um alvo tátil contínuo: o polegar nunca precisa mirar em um pequeno link de texto.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "with-action": {
    label: "Ação Isolada",
    tag: "Gatilho Seguro",
    ergonomicNote: "Favoritar tem hitbox própria e stopPropagation, evitando abrir o card por acidente.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  metric: {
    label: "Métrica / Status",
    tag: "Escaneabilidade",
    ergonomicNote: "Número em destaque para leitura rápida em telas pequenas, com zona de avanço tátil clara.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const CARDS_CODE = `// Exemplo com Hapto Design System
import { useState } from "react";
import { ChevronRight, Bookmark, Sparkles } from "lucide-react";
import { Card, CardTitle, CardDescription, CardAction, CardFooter, Badge } from "@/components/ui";

export function CardInformativoErgonomico() {
  const [salvo, setSalvo] = useState(false);

  return (
    <Card
      as="article"
      variant="interactive"
      onClick={() => alert("Card acionado!")}
      className="w-full max-w-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant="primary" shape="pill" icon={<Sparkles className="size-3" />}>
          Destaque
        </Badge>

        {/* Ação secundária isolada (CardAction com stopPropagation automático) */}
        <CardAction
          aria-label="Salvar nos favoritos"
          onClick={() => setSalvo(!salvo)}
        >
          <Bookmark className={\`size-5 \${salvo ? "fill-primary text-primary" : "text-muted"}\`} />
        </CardAction>
      </div>

      <CardTitle className="mt-3">Design System Háptico</CardTitle>
      <CardDescription className="mt-1">
        Padrões ergonômicos de toque e feedback tátil para aplicações mobile-first.
      </CardDescription>

      <CardFooter className="mt-4">
        <span>Explorar módulo</span>
        <ChevronRight className="size-4" />
      </CardFooter>
    </Card>
  );
};`;

export function CardsShowcase() {
  const [variant, setVariant] = useState<CardVariant>("interactive");
  const [saved, setSaved] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const triggerAction = (label: string) => {
    setLastAction(label);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLastAction(null), 1800);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <SegmentedControl
        value={variant}
        onValueChange={(val) => setVariant(val as CardVariant)}
      >
        {(["interactive", "with-action", "metric"] as CardVariant[]).map((v) => (
          <SegmentedControlItem key={v} value={v}>
            {VARIATIONS_INFO[v].label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>

      <div className="h-[160px] w-full max-w-sm shrink-0">
        {variant === "interactive" && (
          <Card
            variant="interactive"
            onClick={() => triggerAction("Card aberto (Superfície Total)")}
            className="flex h-full w-full flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
              <Badge
                variant="neutral"
                shape="pill"
                icon={<Smartphone className="size-3 text-primary" />}
              >
                Mobile First
              </Badge>
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <Clock className="size-3" />
                <span>3 min de leitura</span>
              </span>
            </div>

            <div>
              <CardTitle className="truncate text-sm">
                Regra dos 48dp no Polegar
              </CardTitle>
              <CardDescription className="mt-0.5 line-clamp-2">
                Alvos de toque calibrados para prevenir falhas e fadiga muscular em smartphones.
              </CardDescription>
            </div>

            <CardFooter>
              <span>Acessar conteúdo</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CardFooter>
          </Card>
        )}

        {variant === "with-action" && (
          <Card
            variant="interactive"
            onClick={() => triggerAction("Card principal acionado")}
            className="flex h-full w-full flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
                  <Sparkles className="size-4.5" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="truncate text-sm">
                    Biblioteca de Gestos
                  </CardTitle>
                  <span className="block truncate text-[10px] text-muted">24 componentes táteis</span>
                </div>
              </div>

              <CardAction
                aria-label="Salvar card nos favoritos"
                onClick={() => {
                  setSaved(!saved);
                  triggerAction(saved ? "Removido dos favoritos" : "Salvo nos favoritos!");
                }}
                className={cn(
                  "border text-muted",
                  saved
                    ? "border-primary/40 bg-primary/10 text-primary shadow-xs"
                    : "border-line bg-surface hover:border-primary/50 hover:text-ink"
                )}
                title={saved ? "Salvo" : "Salvar"}
              >
                <Bookmark
                  className={cn(
                    "size-4.5 transition-transform duration-200",
                    saved && "fill-primary scale-110"
                  )}
                />
              </CardAction>
            </div>

            <CardDescription className="line-clamp-2">
              Toque no ícone à direita para isolar a ação sem abrir o card principal.
            </CardDescription>

            <CardFooter>
              <span>Abrir biblioteca</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CardFooter>
          </Card>
        )}

        {variant === "metric" && (
          <Card
            variant="interactive"
            onClick={() => triggerAction("Relatório de ergonomia aberto")}
            className="flex h-full w-full items-center justify-between"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="size-5.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-muted">Acessibilidade Tátil</span>
                <span className="text-2xl font-extrabold tracking-tight text-ink">98.4%</span>
                <span className="truncate text-[10px] font-medium text-emerald-600">
                  +12.8% vs. alvos de 32px
                </span>
              </div>
            </div>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-muted transition-colors group-hover:border-primary group-hover:text-primary">
              <ArrowRight className="size-4" />
            </div>
          </Card>
        )}
      </div>

      <div className="h-[86px] w-full shrink-0 overflow-hidden rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
          <span className="flex min-w-0 items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">Ergonomia ({currentInfo.label})</span>
          </span>
          <Badge className={cn("shrink-0", currentInfo.badgeColor)}>
            {currentInfo.tag}
          </Badge>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      <div className="flex h-[26px] w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="truncate font-mono text-[10px]">
          Alvo: Superfície Total • Respiro: 16px
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque no card para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
