import type { TargetSize, TouchEventData } from "../types";

interface TouchFeedbackProps {
  lastTouch: TouchEventData | null;
  targetSize: TargetSize;
}

export function TouchFeedback({ lastTouch, targetSize }: TouchFeedbackProps) {
  const getZoneEvaluation = (zone: TouchEventData["zone"]) => {
    switch (zone) {
      case "natural":
        return {
          title: "Zona Natural (Baixo Esforço)",
          description:
            "Excelente posição. O polegar alcança sem necessidade de rotação ou troca de pegada da mão.",
          tag: "Confortável",
        };
      case "stretch":
        return {
          title: "Zona Esticada (Médio Esforço)",
          description:
            "Requer esticar o polegar. Ideal para elementos secundários, cards ou conteúdo de leitura com toques ocasionais.",
          tag: "Atenção",
        };
      case "hard":
        return {
          title: "Zona Difícil (Alto Esforço)",
          description:
            "Força o usuário a reposicionar a mão ou usar a outra mão. Deve ser reservada para ações raras ou leitura passiva.",
          tag: "Crítico",
        };
    }
  };

  return (
    <aside id="touch-diagnostics-panel">
      <h3>Diagnóstico Ergonômico</h3>

      {/* Status da Calibragem do Alvo */}
      <div>
        <span>Alvo Atual Calibrado:</span>
        <strong>{targetSize}</strong>
      </div>

      {/* Resultado da Última Interação */}
      {lastTouch ? (
        <div>
          <h4>Último Toque Registrado</h4>
          <dl>
            <dt>Componente:</dt>
            <dd>{lastTouch.elementClicked}</dd>

            <dt>Zona Atingida:</dt>
            <dd>{getZoneEvaluation(lastTouch.zone).title}</dd>

            <dt>Avaliação:</dt>
            <dd>{getZoneEvaluation(lastTouch.zone).description}</dd>
          </dl>
        </div>
      ) : (
        <div>
          <p>
            Nenhum toque registrado ainda. Clique em qualquer botão ou campo dentro do celular simulado para ver a análise ergonômica.
          </p>
        </div>
      )}
    </aside>
  );
}
