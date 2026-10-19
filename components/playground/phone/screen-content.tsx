import type { ScreenScenario, TargetSize, ThumbZone } from "../types";

interface ScreenContentProps {
  scenario: ScreenScenario;
  targetSize: TargetSize;
  onElementClick: (name: string, zone: ThumbZone) => void;
}

export function ScreenContent({
  scenario,
  targetSize,
  onElementClick,
}: ScreenContentProps) {
  return (
    <div id="simulated-app-screen" data-target-size={targetSize}>
      {/* 1. TOPO DA TELA (Zona Difícil) */}
      <header id="app-top-bar">
        <button
          type="button"
          onClick={() => onElementClick("Botão Voltar (Top Bar)", "hard")}
        >
          ← Voltar
        </button>
        <h2>Hapto App</h2>
        <button
          type="button"
          onClick={() => onElementClick("Ação de Busca (Top Bar)", "hard")}
        >
          🔍
        </button>
      </header>

      {/* 2. MIOLO DA TELA (Zona Esticada) */}
      <main id="app-body">
        {scenario === "feed" && (
          <section>
            <h3>Feed de Conteúdo</h3>
            <article>
              <h4>Card de Artigo</h4>
              <p>Exemplo de card informativo de leitura passiva.</p>
              <button
                type="button"
                onClick={() => onElementClick("Botão Ler Mais (Card)", "stretch")}
              >
                Ler mais
              </button>
            </article>
          </section>
        )}

        {scenario === "form" && (
          <section>
            <h3>Formulário Tátil</h3>
            <label>
              <span>E-mail</span>
              <input
                type="email"
                placeholder="nome@email.com"
                onClick={() => onElementClick("Input de E-mail", "stretch")}
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                placeholder="••••••••"
                onClick={() => onElementClick("Input de Senha", "stretch")}
              />
            </label>
          </section>
        )}

        {scenario === "actions" && (
          <section>
            <h3>Ações em Tela</h3>
            <p>Toque nos botões para testar o esforço de alcance.</p>
            <button
              type="button"
              onClick={() => onElementClick("Botão Secundário (Meio da tela)", "stretch")}
            >
              Ação Secundária
            </button>
          </section>
        )}
      </main>

      {/* 3. BASE DA TELA (Zona Natural do Polegar) */}
      <footer id="app-bottom-bar">
        {scenario === "actions" ? (
          <div id="app-fab-container">
            <button
              type="button"
              onClick={() => onElementClick("FAB - Botão de Ação Flutuante", "natural")}
            >
              + Nova Ação (FAB)
            </button>
          </div>
        ) : (
          <nav id="app-bottom-nav">
            <button
              type="button"
              onClick={() => onElementClick("Aba Início (Bottom Nav)", "natural")}
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => onElementClick("Aba Explorar (Bottom Nav)", "natural")}
            >
              Explorar
            </button>
            <button
              type="button"
              onClick={() => onElementClick("Aba Perfil (Bottom Nav)", "natural")}
            >
              Perfil
            </button>
          </nav>
        )}
      </footer>
    </div>
  );
}
