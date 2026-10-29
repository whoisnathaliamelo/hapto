"use client";

import { useState } from "react";
import {
  Bell,
  Bookmark,
  Check,
  Crosshair,
  Heart,
  Info,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui";

type IconVariant = "action" | "badge" | "cluster";

const VARIATIONS_INFO: Record<
  IconVariant,
  { label: string; tag: string; ergonomicNote: string; badgeColor: string }
> = {
  action: {
    label: "Icon Button",
    tag: "Hitbox 48dp",
    ergonomicNote: "O glifo visual mede 20-24px, mas o alvo de toque cobre 48x48dp. O usuário aciona a ação sem necessidade de precisão milimétrica.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  badge: {
    label: "Com Notificação",
    tag: "Feedback de Estado",
    ergonomicNote: "Badge fixado no canto superior sem obstruir o reconhecimento da silhueta do ícone nem reduzir a área de clique de 48dp.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  cluster: {
    label: "Grid de Ações",
    tag: "Respiro de 8dp",
    ergonomicNote: "Espaçamento mínimo de 8dp entre alvos de toque adjacentes para evitar toques acidentais no comando vizinho.",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
};

export const ICONS_CODE = `// Exemplo com Tailwind CSS Puro (Zero Dependências)
// Dica: O ícone mede 20-24px, mas o botão possui 'size-12' (48x48px) para a Regra dos 48dp

import { useState } from "react";
import { Bell, Bookmark, Heart, Share2 } from "lucide-react";

export function IconesErgonomicos() {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Icon Button com Alvo Tátil de 48x48dp (Regra dos 48dp) */}
      <button
        type="button"
        aria-label="Curtir"
        onClick={() => setCurtido(!curtido)}
        className="relative inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-all hover:border-primary/50 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Heart
          className={\`size-5 transition-transform duration-200 \${
            curtido ? "fill-red-500 text-red-500 scale-110" : "text-muted"
          }\`}
        />
      </button>

      {/* 2. Ícone com Badge de Notificação Efêmero */}
      <button
        type="button"
        aria-label="Notificações"
        className="relative inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-all hover:border-primary/50 hover:text-primary active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Bell className="size-5 text-muted" />
        <span className="absolute top-2.5 right-2.5 flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
        </span>
      </button>

      {/* 3. Ícone com Estado Salvo / Bookmark */}
      <button
        type="button"
        aria-label="Salvar item"
        onClick={() => setSalvo(!salvo)}
        className="relative inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-all hover:border-primary/50 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Bookmark
          className={\`size-5 transition-transform duration-200 \${
            salvo ? "fill-primary text-primary scale-110" : "text-muted"
          }\`}
        />
      </button>

      {/* 4. Ação com Respiro de Segurança de 8dp */}
      <button
        type="button"
        aria-label="Compartilhar"
        className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-all hover:border-primary/50 hover:text-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Share2 className="size-5" />
      </button>
    </div>
  );
}`;

export function IconsShowcase() {
  const [variant, setVariant] = useState<IconVariant>("action");
  const [showHitbox, setShowHitbox] = useState(true);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => setToastMessage(null), 1600);
    return () => clearTimeout(timer);
  };

  const currentInfo = VARIATIONS_INFO[variant];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 py-1">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Variação Ergonômica
          </span>

          <button
            type="button"
            onClick={() => setShowHitbox(!showHitbox)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all active:scale-95",
              showHitbox
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-line bg-surface text-muted hover:text-ink"
            )}
            title="Alternar visualização da área tátil de 48dp"
          >
            <Crosshair className="size-3" />
            <span>Hitbox 48dp: {showHitbox ? "Visível" : "Oculta"}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1 shadow-xs">
          {(["action", "badge", "cluster"] as IconVariant[]).map((v) => {
            const isSelected = variant === v;
            const item = VARIATIONS_INFO[v];
            return (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
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

      <div className="flex min-h-[96px] w-full max-w-sm items-center justify-center px-1">
        {variant === "action" && (
          <div className="flex items-center gap-4">
            <div className="relative">
              {showHitbox && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 animate-pulse"
                />
              )}
              <IconButton
                aria-label="Curtir"
                onClick={() => {
                  setLiked(!liked);
                  showToast(!liked ? "Curtido!" : "Descurtido");
                }}
                className={cn(
                  liked
                    ? "border-red-500/40 text-red-500 shadow-xs"
                    : "border-line text-muted hover:border-primary/50 hover:text-ink"
                )}
              >
                <Heart
                  className={cn(
                    "size-5 transition-transform duration-200",
                    liked && "fill-red-500 scale-110"
                  )}
                />
              </IconButton>
              {showHitbox && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-primary">
                  48dp
                </span>
              )}
            </div>

            <div className="relative">
              {showHitbox && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 animate-pulse"
                />
              )}
              <IconButton
                aria-label="Salvar"
                onClick={() => {
                  setSaved(!saved);
                  showToast(!saved ? "Salvo nos favoritos!" : "Removido");
                }}
                className={cn(
                  saved
                    ? "border-primary/40 text-primary shadow-xs"
                    : "border-line text-muted hover:border-primary/50 hover:text-ink"
                )}
              >
                <Bookmark
                  className={cn(
                    "size-5 transition-transform duration-200",
                    saved && "fill-primary scale-110"
                  )}
                />
              </IconButton>
              {showHitbox && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-primary">
                  48dp
                </span>
              )}
            </div>
          </div>
        )}

        {variant === "badge" && (
          <div className="flex items-center gap-6">
            <div className="relative">
              {showHitbox && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 animate-pulse"
                />
              )}
              <IconButton
                aria-label="Notificações"
                badge={hasNotif}
                onClick={() => {
                  setHasNotif(!hasNotif);
                  showToast(hasNotif ? "Notificações marcadas como lidas" : "Novas notificações!");
                }}
                className="text-ink"
              >
                <Bell className="size-5 text-ink" />
              </IconButton>
              {showHitbox && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-primary">
                  48x48dp
                </span>
              )}
            </div>

            <span className="text-xs text-muted">
              {hasNotif ? "1 notificação não lida (Toque p/ limpar)" : "Nenhuma notificação (Toque p/ gerar)"}
            </span>
          </div>
        )}

        {variant === "cluster" && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-1.5 shadow-2xs">
              {[
                { icon: Heart, label: "Curtir", action: () => showToast("Curtido!") },
                { icon: Share2, label: "Compartilhar", action: () => showToast("Link copiado!") },
                { icon: Bookmark, label: "Salvar", action: () => showToast("Salvo!") },
                { icon: MoreHorizontal, label: "Mais ações", action: () => showToast("Menu aberto") },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="relative">
                    {showHitbox && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-0.5 rounded-xl border border-dashed border-primary/40 bg-primary/5"
                      />
                    )}
                    <IconButton
                      size="md"
                      variant="ghost"
                      aria-label={item.label}
                      onClick={item.action}
                      className="hover:text-primary"
                    >
                      <IconComponent className="size-4.5" />
                    </IconButton>
                  </div>
                );
              })}
            </div>
            {showHitbox && (
              <span className="text-[10px] font-mono font-semibold text-primary">
                Gap de 8dp entre alvos de toque
              </span>
            )}
          </div>
        )}
      </div>

      <div className="w-full rounded-xl border border-line/60 bg-surface/70 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <Info className="size-3.5 text-primary" />
            <span>Ergonomia ({currentInfo.label})</span>
          </span>
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              currentInfo.badgeColor
            )}
          >
            {currentInfo.tag}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          {currentInfo.ergonomicNote}
        </p>
      </div>

      <div className="flex w-full items-center justify-between border-t border-line/50 pt-2 text-[11px] text-muted">
        <span className="font-mono text-[10px]">
          Alvo: {variant === "cluster" ? "44x44dp (M)" : "48x48dp (G)"} • Glifo: 20px
        </span>
        <span className="font-medium text-ink flex items-center gap-1">
          {toastMessage ? (
            <>
              <Check className="size-3 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">{toastMessage}</span>
            </>
          ) : (
            <span>Interativo: toque para testar</span>
          )}
        </span>
      </div>
    </div>
  );
}
