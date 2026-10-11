export function AtomicArchitecture() {
  const steps = [
    {
      step: 1,
      icon: "⚛️",
      name: "Átomos",
      description: "As menores peças (Cores, Fontes, Ícones, Inputs soltos).",
    },
    {
      step: 2,
      icon: "🧬",
      name: "Moléculas",
      description: "Combinações simples (Ex: Rótulo + Input de Texto + Botão de Limpar).",
    },
    {
      step: 3,
      icon: "🧫",
      name: "Organismos",
      description: "Blocos complexos (Ex: Barra de Navegação Inferior, Cabeçalho).",
    },
    {
      step: 4,
      icon: "📐",
      name: "Modelos",
      description: "A estrutura / layout da tela em esqueleto.",
    },
    {
      step: 5,
      icon: "📱",
      name: "Páginas",
      description: "A tela final pronta com dados reais.",
    },
  ];

  return (
    <section id="atomic-architecture">
      <div>
        <h2>Arquitetura Modular (Atomic Design)</h2>
        <p>Fluxo horizontal interativo dos 5 passos:</p>

        <ol>
          {steps.map((item) => (
            <li key={item.step}>
              <span>{item.icon}</span>
              <span>Passo {item.step}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
