"use client";

import { useState } from "react";

export function WhyDesignSystems() {
  const [tab, setTab] = useState<"sem" | "com">("sem");

  return (
    <section id="why-design-systems">
      <div>
        <h2>Por que usar um Design System?</h2>

        {/* O que é */}
        <article>
          <h3>💡 O que é?</h3>
          <p>
            É uma biblioteca de padrões, decisões de estilo (<strong>Design Tokens</strong>) e componentes reutilizáveis.
            Funciona como a &quot;linguagem comum&quot; entre designers e desenvolvedores para criar telas mais rápido e sem erros.
          </p>
        </article>

        {/* Antes vs Depois */}
        <div>
          <h3>Antes vs. Depois</h3>
          <div role="tablist" aria-label="Comparativo de uso de Design System">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "sem"}
              onClick={() => setTab("sem")}
            >
              Sem Design System (Ad-hoc)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "com"}
              onClick={() => setTab("com")}
            >
              Com Design System
            </button>
          </div>

          <div role="tabpanel">
            {tab === "sem" ? (
              <ul>
                <li>❌ Botões com tamanhos e cores diferentes em cada tela.</li>
                <li>❌ Código duplicado e difícil de manter.</li>
                <li>❌ Alto risco de erros e lentidão nas entregas.</li>
              </ul>
            ) : (
              <ul>
                <li>✅ <strong>Reusabilidade:</strong> Componentes prontos para usar.</li>
                <li>✅ <strong>Consistência:</strong> Mesma identidade visual em todo o app.</li>
                <li>✅ <strong>Manutenibilidade (ISO/IEC 25010):</strong> Alterou no sistema, atualizou em todo o produto.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
