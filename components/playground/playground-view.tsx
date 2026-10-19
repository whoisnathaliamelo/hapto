"use client";

import { useState } from "react";
import type {
  SimulatorSettings,
  TouchEventData,
  ThumbZone,
  ScreenScenario,
} from "./types";
import { HandSelector } from "./controls/hand-selector";
import { ZoneToggle } from "./controls/zone-toggle";
import { TargetCalibrator } from "./controls/target-calibrator";
import { PhoneFrame } from "./phone/phone-frame";
import { ThumbOverlay } from "./phone/thumb-overlay";
import { ScreenContent } from "./phone/screen-content";
import { TouchFeedback } from "./diagnostics/touch-feedback";

export function PlaygroundView() {
  const [settings, setSettings] = useState<SimulatorSettings>({
    handGrip: "right",
    showOverlay: true,
    targetSize: "48px",
    activeScreen: "feed",
  });

  const [lastTouch, setLastTouch] = useState<TouchEventData | null>(null);

  const handleElementClick = (elementClicked: string, zone: ThumbZone) => {
    setLastTouch({
      x: 0,
      y: 0,
      zone,
      elementClicked,
    });
  };

  return (
    <section id="playground-container">
      {/* 1. Cabeçalho da Seção */}
      <header>
        <h1>Playground Ergonômico Mobile</h1>
        <p>
          Simule a anatomia do toque e avalie o alcance do polegar com diferentes pegadas e alvos táteis.
        </p>
      </header>

      {/* 2. Área Central com Controles, Celular e Diagnóstico */}
      <div>
        {/* COLUNA 1: Painel de Controles */}
        <aside id="playground-controls">
          <h2>Controles</h2>

          {/* Pegada da mão */}
          <HandSelector
            value={settings.handGrip}
            onChange={(handGrip) => setSettings((s) => ({ ...s, handGrip }))}
          />

          {/* Sobreposição de Thumb Zone */}
          <ZoneToggle
            checked={settings.showOverlay}
            onChange={(showOverlay) => setSettings((s) => ({ ...s, showOverlay }))}
          />

          {/* Calibragem de tamanho de alvo */}
          <TargetCalibrator
            value={settings.targetSize}
            onChange={(targetSize) => setSettings((s) => ({ ...s, targetSize }))}
          />

          {/* Seletor de Cenário */}
          <fieldset>
            <legend>Cenário Simulado</legend>
            <select
              value={settings.activeScreen}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  activeScreen: e.target.value as ScreenScenario,
                }))
              }
            >
              <option value="feed">Feed de Conteúdo (Top Bar + Bottom Nav)</option>
              <option value="form">Formulário de Entrada (Inputs)</option>
              <option value="actions">Ações Rápidas (FAB)</option>
            </select>
          </fieldset>
        </aside>

        {/* COLUNA 2: O Celular Simulado */}
        <div id="playground-device-area">
          <PhoneFrame>
            <ScreenContent
              scenario={settings.activeScreen}
              targetSize={settings.targetSize}
              onElementClick={handleElementClick}
            />

            {settings.showOverlay && (
              <ThumbOverlay handGrip={settings.handGrip} />
            )}
          </PhoneFrame>
        </div>

        {/* COLUNA 3: Diagnóstico e Métricas */}
        <div id="playground-diagnostics-area">
          <TouchFeedback
            lastTouch={lastTouch}
            targetSize={settings.targetSize}
          />
        </div>
      </div>
    </section>
  );
}
