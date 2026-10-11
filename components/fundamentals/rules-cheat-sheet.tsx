export function RulesCheatSheet() {
  const rules = [
    {
      number: "01",
      icon: "🎯",
      title: "Regra dos 48dp",
      rule: "Nada clicável pode ter menos de 48 x 48 dp.",
    },
    {
      number: "02",
      icon: "👁️",
      title: "Regra do 4.5:1",
      rule: "Sempre teste o contraste entre texto e fundo (WCAG AA).",
    },
    {
      number: "03",
      icon: "👍",
      title: "Regra do Polegar",
      rule: "Guarde a parte inferior da tela para as ações principais.",
    },
    {
      number: "04",
      icon: "📏",
      title: "Regra dos Múltiplos de 8",
      rule: "Espaçamentos padronizados em 8, 16, 24 e 32px.",
    },
  ];

  return (
    <section id="rules-cheat-sheet">
      <div>
        <h2>Cheat Sheet: As 4 Regras de Ouro</h2>
        <p>Diretrizes essenciais para memorizar e aplicar em qualquer interface mobile:</p>

        <div>
          {rules.map((item) => (
            <article key={item.number}>
              <div>
                <span>{item.number}</span>
                <span>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.rule}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
