"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckSquare,
  Info,
  MoreVertical,
  Search,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  SegmentedControl,
  SegmentedControlItem,
  TopBar,
  TopBarAction,
  TopBarTitle,
  TopBarActions,
  TopBarSection,
  TopBarNavRow,
  TopBarLargeTitleArea,
  type TopBarVariant,
} from "@/components/ui";

const VARIATIONS_INFO: Record<
  TopBarVariant,
  { label: string; tabLabel: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  standard: {
    label: "Padrão (Voltar + Ações)",
    tabLabel: "Padrão",
    tag: "Hitbox 48dp",
    ergonomicNote: "Botão voltar com área mínima de 48dp no topo e respiro de 12px entre ícones à direita para evitar toques acidentais.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  "large-title": {
    label: "Título Expandido",
    tabLabel: "Expandido",
    tag: "Escaneabilidade",
    ergonomicNote: "Tipografia em destaque traz o ponto focal para perto do centro da tela, facilitando a leitura imediata.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  contextual: {
    label: "Barra Contextual",
    tabLabel: "Contextual",
    tag: "Ações em Lote",
    ergonomicNote: "Modo seleção rápida substitui a navegação e isola ações destrutivas na borda oposta com feedback claro.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const TOP_BAR_CODE = `// Exemplo com Hapto Design System
import { ArrowLeft, Share2, MoreVertical } from "lucide-react";
import { TopBar, TopBarAction, TopBarTitle, TopBarActions } from "@/components/ui";

export function TopAppBarErgonomica() {
  return (
    <TopBar variant="standard" position="sticky">
      {/* 1. Botão Voltar com hitbox calibrada de 48dp */}
      <TopBarAction
        icon={ArrowLeft}
        aria-label="Voltar à tela anterior"
        onClick={() => history.back()}
      />

      {/* 2. Título Central com Truncamento Seguro */}
      <TopBarTitle align="center">
        Detalhes do Componente
      </TopBarTitle>

      {/* 3. Ações Secundárias com Respiro Ergonômico */}
      <TopBarActions>
        <TopBarAction icon={Share2} aria-label="Compartilhar" />
        <TopBarAction icon={MoreVertical} aria-label="Mais opções" />
      </TopBarActions>
    </TopBar>
  );
};`;

export function TopBarShowcase() {
  const [variant, setVariant] = useState<TopBarVariant>("standard");
  const [selectedCount, setSelectedCount] = useState(3);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const currentInfo = VARIATIONS_INFO[variant];

  const triggerAction = (msg: string) => {
    setLastAction(msg);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Variação do Organismo
        </span>
        <SegmentedControl
          value={variant}
          onValueChange={(val) => {
            const v = val as TopBarVariant;
            setVariant(v);
            setLastAction(`Variação selecionada: ${VARIATIONS_INFO[v].label}`);
          }}
        >
          {(["standard", "large-title", "contextual"] as TopBarVariant[]).map((v) => (
            <SegmentedControlItem key={v} value={v}>
              {VARIATIONS_INFO[v].tabLabel}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>

      <div className="relative flex h-[142px] w-full max-w-sm flex-col justify-start overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
        {variant === "standard" && (
          <TopBar variant="standard">
            <TopBarAction
              aria-label="Voltar"
              icon={ArrowLeft}
              onClick={() => triggerAction("Ação: Voltar acionado")}
            />

            <TopBarTitle>Design Systems</TopBarTitle>

            <TopBarActions>
              <TopBarAction
                variant="muted"
                aria-label="Compartilhar"
                icon={Share2}
                onClick={() => triggerAction("Ação: Compartilhar aberto")}
              />
              <TopBarAction
                variant="muted"
                aria-label="Mais opções"
                icon={MoreVertical}
                onClick={() => triggerAction("Ação: Menu de opções aberto")}
              />
            </TopBarActions>
          </TopBar>
        )}

        {variant === "large-title" && (
          <TopBar variant="large-title">
            <TopBarNavRow>
              <TopBarAction
                aria-label="Voltar"
                icon={ArrowLeft}
                onClick={() => triggerAction("Ação: Voltar acionado")}
              />

              <TopBarActions>
                <TopBarAction
                  variant="muted"
                  aria-label="Buscar"
                  icon={Search}
                  onClick={() => triggerAction("Ação: Busca aberta")}
                />
              </TopBarActions>
            </TopBarNavRow>

            <TopBarLargeTitleArea>
              <TopBarTitle variant="large">Componentes</TopBarTitle>
            </TopBarLargeTitleArea>
          </TopBar>
        )}

        {variant === "contextual" && (
          <TopBar variant="contextual">
            <TopBarSection gap="normal">
              <TopBarAction
                variant="primary"
                aria-label="Fechar seleção"
                icon={X}
                onClick={() => triggerAction("Seleção cancelada")}
              />
              <span className="text-xs font-bold text-primary">
                {selectedCount} selecionados
              </span>
            </TopBarSection>

            <TopBarActions>
              <TopBarAction
                variant="primary"
                aria-label="Selecionar todos"
                title="Selecionar todos"
                icon={CheckSquare}
                onClick={() => {
                  setSelectedCount(5);
                  triggerAction("Todos (5) selecionados");
                }}
              />
              <TopBarAction
                variant="destructive"
                aria-label="Excluir selecionados"
                title="Excluir"
                icon={Trash2}
                onClick={() => {
                  setSelectedCount(0);
                  triggerAction("Itens excluídos com segurança");
                }}
              />
            </TopBarActions>
          </TopBar>
        )}

        <div className="flex flex-1 flex-col items-center justify-center p-3 text-center">
          <p className="text-[11px] font-medium text-ink">
            {variant === "standard" && "Corpo da Tela: rolagem sob o cabeçalho"}
            {variant === "large-title" && "Área de leitura primária acessível"}
            {variant === "contextual" && "Modo de ação contextual ativado"}
          </p>
          <span className="text-[10px] text-muted">
            Toque nos ícones da Top Bar para testar hitboxes
          </span>
        </div>
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
          Alvo: 44-48dp • Espaçamento: 8dp
        </span>
        <span className="flex min-w-0 shrink-0 items-center gap-1 font-medium">
          {lastAction ? (
            <>
              <Check className="size-3 shrink-0 text-emerald-600" />
              <span className="truncate font-semibold text-emerald-600">{lastAction}</span>
            </>
          ) : (
            <span className="truncate text-muted">Toque para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
