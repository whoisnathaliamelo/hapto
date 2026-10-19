import type { HandGrip } from "../types";

interface ThumbOverlayProps {
  handGrip: HandGrip;
}

export function ThumbOverlay({ handGrip }: ThumbOverlayProps) {
  return (
    <div id="thumb-overlay" aria-hidden="true" data-hand={handGrip}>
      {/* Zona 1: Difícil / Hard to reach (Topo da tela) */}
      <div id="zone-hard" data-zone="hard">
        <span>Zona Difícil</span>
        <small>Leitura passiva / alto esforço</small>
      </div>

      {/* Zona 2: Esticada / Stretch (Meio da tela) */}
      <div id="zone-stretch" data-zone="stretch">
        <span>Zona Esticada</span>
        <small>Alcance moderado</small>
      </div>

      {/* Zona 3: Natural / Easy reach (Base da tela, próximo ao polegar) */}
      <div id="zone-natural" data-zone="natural">
        <span>Zona Natural</span>
        <small>Alvos frequentes e confortáveis</small>
      </div>
    </div>
  );
}
