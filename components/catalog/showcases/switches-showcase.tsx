"use client";

import { useState } from "react";
import { Info, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Switch,
  Checkbox,
  SwitchRow,
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui";

type ControlType = "switch" | "checkbox" | "row";

const VARIATIONS_INFO: Record<
  ControlType,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  switch: {
    label: "Switch Tátil",
    tag: "Ação Imediata",
    ergonomicNote: "O controle tem corpo de 28px, mas a área tátil do container atinge 48dp para prevenir erros de ativação.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  checkbox: {
    label: "Checkbox 48dp",
    tag: "Seleção Múltipla",
    ergonomicNote: "O label inteiro é clicável (min-h-12). O polegar nunca precisa mirar apenas na caixinha de 20px.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  row: {
    label: "Linha de Ajuste",
    tag: "Padrão Mobile",
    ergonomicNote: "Estrutura de 56dp com título, descrição e gatilho à direita, otimizada para listas em telas sensíveis ao toque.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const SWITCHES_CODE = `// Exemplo com Hapto Design System
import { useState } from "react";
import { Shield } from "lucide-react";
import { Switch, Checkbox, SwitchRow } from "@/components/ui";

export function ControlesErgonomicos() {
  const [switchAtivo, setSwitchAtivo] = useState(true);
  const [checkAtivo, setCheckAtivo] = useState(false);
  const [rowAtivo, setRowAtivo] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-3">
      {/* 1. Switch Tátil de 48dp com Label Clicável */}
      <Switch
        checked={switchAtivo}
        onCheckedChange={setSwitchAtivo}
        label="Notificações Push"
        description="Alertas em tempo real"
      />

      {/* 2. Checkbox Ergonômico de 48dp em Formato Card */}
      <Checkbox
        variant="card"
        checked={checkAtivo}
        onCheckedChange={setCheckAtivo}
        label="Feedback Háptico"
        description="Vibração ao interagir"
      />

      {/* 3. Linha de Ajuste (56dp para Polegar) com Ícone */}
      <SwitchRow
        checked={rowAtivo}
        onCheckedChange={setRowAtivo}
        icon={Shield}
        label="Proteção de Toque"
        description="Bloqueio de cliques duplos"
      />
    </div>
  );
};`;

export function SwitchesShowcase() {
  const [type, setType] = useState<ControlType>("switch");
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [rowSwitchOn, setRowSwitchOn] = useState(false);

  const currentInfo = VARIATIONS_INFO[type];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Tipo de Controle Tátil
        </span>
        <SegmentedControl
          value={type}
          onValueChange={(val) => setType(val as ControlType)}
        >
          {(["switch", "checkbox", "row"] as ControlType[]).map((t) => (
            <SegmentedControlItem key={t} value={t}>
              {VARIATIONS_INFO[t].label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>

      <div className="flex min-h-[92px] w-full max-w-sm items-center justify-center px-1">
        {type === "switch" && (
          <div className="w-full">
            <Switch
              checked={switchOn}
              onCheckedChange={setSwitchOn}
              label="Modo Ergonômico"
              description={switchOn ? "Ativo (Foco aumentado)" : "Inativo (Padrão)"}
              className="shadow-2xs"
            />
          </div>
        )}

        {type === "checkbox" && (
          <div className="w-full">
            <Checkbox
              variant="card"
              checked={checkboxOn}
              onCheckedChange={setCheckboxOn}
              label="Habilitar Feedback Háptico"
              description="Toque em qualquer ponto da linha"
            />
          </div>
        )}

        {type === "row" && (
          <div className="w-full">
            <SwitchRow
              checked={rowSwitchOn}
              onCheckedChange={setRowSwitchOn}
              icon={Shield}
              label="Proteção de Toque"
              description="Bloqueio de cliques duplos"
            />
          </div>
        )}
      </div>

      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Ergonomia ({currentInfo.label})</span>
          </span>
          <Badge className={cn("shrink-0", currentInfo.badgeColor)}>
            {currentInfo.tag}
          </Badge>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      <div className="flex w-full items-center justify-between border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="font-mono text-[10px]">Alvo: 48dp • Container Clicável</span>
        <span className="font-medium text-ink">
          {type === "switch" && (switchOn ? "Ligado" : "Desligado")}
          {type === "checkbox" && (checkboxOn ? "Marcado" : "Desmarcado")}
          {type === "row" && (rowSwitchOn ? "Protegido" : "Desprotegido")}
        </span>
      </div>
    </div>
  );
}
