export function ErgonomicPillars() {
  return (
    <section id="ergonomic-pillars">
      <div>
        <h2>Os 3 Pilares da Ergonomia Mobile</h2>

        {/* Resumo / Matriz dos 3 pilares */}
        <div role="table" aria-label="Visão geral dos 3 pilares ergonômicos">
          <div>
            <div>
              <strong>🎯 FÍSICA</strong>
              <span>Anatomia da mão</span>
            </div>
            <div>
              <strong>🧠 COGNITIVA</strong>
              <span>Esforço mental</span>
            </div>
            <div>
              <strong>♿ UNIVERSAL</strong>
              <span>Inclusão e WCAG</span>
            </div>
          </div>
        </div>

        {/* Card 1: Ergonomia Física */}
        <article>
          <header>
            <span>🎯</span>
            <h3>Ergonomia Física (O Toque)</h3>
            <p>Anatomia da mão e limites físicos</p>
          </header>
          <ul>
            <li>
              <strong>Área de Toque (48 x 48 dp):</strong> O dedo humano é impreciso. Áreas menores que 48dp causam toques acidentais e frustração.
            </li>
            <li>
              <strong>Zona do Polegar (<em>Thumb Zone</em>):</strong> 75% dos usuários navegam usando apenas uma das mãos. Elementos importantes devem ficar na <strong>metade inferior da tela</strong>.
            </li>
            <li>
              <strong>Grid de 8 dp:</strong> Todas as margens e espaçamentos usam múltiplos de 8 (8, 16, 24, 32px) para manter a tela organizada.
            </li>
          </ul>
        </article>

        {/* Card 2: Ergonomia Cognitiva */}
        <article>
          <header>
            <span>🧠</span>
            <h3>Ergonomia Cognitiva (A Mente)</h3>
            <p>Esforço mental e clareza perceptiva</p>
          </header>
          <ul>
            <li>
              <strong>Zero Adivinhação (<em>Affordance</em>):</strong> Botões devem parecer botões. Sombras e elevações mostram o que é clicável.
            </li>
            <li>
              <strong>Carga Mental Reduzida:</strong> Use ícones e fluxos conhecidos. O usuário não precisa aprender a usar seu app do zero.
            </li>
            <li>
              <strong>Animações Funcionais:</strong> Animações curtas mostram de onde um menu veio e para onde ele foi, orientando o olhar.
            </li>
          </ul>
        </article>

        {/* Card 3: Acessibilidade Universal */}
        <article>
          <header>
            <span>♿</span>
            <h3>Acessibilidade Universal (A Inclusão)</h3>
            <p>Inclusão e conformidade com WCAG</p>
          </header>
          <ul>
            <li>
              <strong>Contraste Rígido (WCAG 2.1):</strong> Texto escuro em fundo claro (ou vice-versa) com razão de <strong>4.5:1</strong> para garantir leitura sob luz do sol ou por pessoas com baixa visão.
            </li>
            <li>
              <strong>Design para Idosos e PCDs:</strong> Fontes escaláveis e alvos confortáveis garantem inclusão digital para todas as idades.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
