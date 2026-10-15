"use client";

import { useState } from "react";

type AtomicCategory = "all" | "atoms" | "molecules" | "organisms";

type ComponentSection =
  | "all"
  | "buttons"
  | "inputs"
  | "switches"
  | "icons"
  | "search"
  | "cards"
  | "bottom-nav"
  | "top-bar"
  | "feedback";

interface SectionMeta {
  id: ComponentSection;
  label: string;
  category: "atoms" | "molecules" | "organisms";
}

const SECTIONS: SectionMeta[] = [
  // Átomos
  { id: "buttons", label: "Botões (Normal, Secundário, FAB)", category: "atoms" },
  { id: "inputs", label: "Inputs de Texto", category: "atoms" },
  { id: "switches", label: "Switches e Checkboxes", category: "atoms" },
  { id: "icons", label: "Ícones Ergonômicos", category: "atoms" },

  // Moléculas
  { id: "search", label: "Barra de Busca", category: "molecules" },
  { id: "cards", label: "Cards Informativos", category: "molecules" },

  // Organismos
  { id: "bottom-nav", label: "Bottom Navigation", category: "organisms" },
  { id: "top-bar", label: "Top App Bar", category: "organisms" },
  { id: "feedback", label: "Alertas e Snackbars", category: "organisms" },
];

export function CatalogView() {
  const [activeCategory, setActiveCategory] = useState<AtomicCategory>("all");
  const [activeSection, setActiveSection] = useState<ComponentSection>("all");

  const availableSections =
    activeCategory === "all"
      ? SECTIONS
      : SECTIONS.filter((item) => item.category === activeCategory);

  const shouldRender = (sectionId: ComponentSection, category: AtomicCategory) => {
    const matchesCategory = activeCategory === "all" || activeCategory === category;
    const matchesSection = activeSection === "all" || activeSection === sectionId;
    return matchesCategory && matchesSection;
  };

  return (
    <section>
      {/* Cabeçalho da Página */}
      <header>
        <div>
          <span>Módulo 03</span>
          <h1>Catálogo de Componentes</h1>
          <p>
            Biblioteca modular guiada por Atomic Design e calibrada para ergonomia móvel.
          </p>
        </div>
      </header>

      {/* Navegação de Nível 1: Atomic Design */}
      <nav aria-label="Níveis do Atomic Design">
        <ul>
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveSection("all");
              }}
            >
              Todos os Níveis
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("atoms");
                setActiveSection("all");
              }}
            >
              Átomos
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("molecules");
                setActiveSection("all");
              }}
            >
              Moléculas
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("organisms");
                setActiveSection("all");
              }}
            >
              Organismos
            </button>
          </li>
        </ul>
      </nav>

      {/* Navegação de Nível 2: Seletor Direto de Componente */}
      <nav aria-label="Seleção rápida de componente">
        <span>Filtrar componente:</span>
        <ul>
          <li>
            <button
              type="button"
              onClick={() => setActiveSection("all")}
            >
              Exibir Todos
            </button>
          </li>
          {availableSections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      {/* Conteúdo Renderizado por Sessão */}
      <main>
        {/* GRUPO: ÁTOMOS */}
        {(activeCategory === "all" || activeCategory === "atoms") && (
          <section id="atoms-group">
            <h2>Átomos</h2>

            {shouldRender("buttons", "atoms") && (
              <article id="section-buttons">
                <h3>Botões (Normal, Secundário, FAB)</h3>
                <p>Alvos táteis calibrados entre 40px e 56px para polegar.</p>
                <div>[Espaço reservado: ButtonsShowcase]</div>
              </article>
            )}

            {shouldRender("inputs", "atoms") && (
              <article id="section-inputs">
                <h3>Inputs de Texto</h3>
                <p>Campos com altura de 48dp e tipografia mínima que evita zoom involuntário.</p>
                <div>[Espaço reservado: InputsShowcase]</div>
              </article>
            )}

            {shouldRender("switches", "atoms") && (
              <article id="section-switches">
                <h3>Switches e Checkboxes</h3>
                <p>Controles binários com estados visuais claros e feedback tátil.</p>
                <div>[Espaço reservado: SwitchesShowcase]</div>
              </article>
            )}

            {shouldRender("icons", "atoms") && (
              <article id="section-icons">
                <h3>Ícones Ergonômicos</h3>
                <p>Metáforas visuais com grid de toque acessível.</p>
                <div>[Espaço reservado: IconsShowcase]</div>
              </article>
            )}
          </section>
        )}

        {/* GRUPO: MOLÉCULAS */}
        {(activeCategory === "all" || activeCategory === "molecules") && (
          <section id="molecules-group">
            <h2>Moléculas</h2>

            {shouldRender("search", "molecules") && (
              <article id="section-search">
                <h3>Barra de Busca com Botão de Limpar</h3>
                <p>Composição de input, ícone de busca e gatilho de limpeza acessível.</p>
                <div>[Espaço reservado: SearchBarShowcase]</div>
              </article>
            )}

            {shouldRender("cards", "molecules") && (
              <article id="section-cards">
                <h3>Cards Informativos Espaçados</h3>
                <p>Cartões de informação com espaçamento de segurança contra toques incorretos.</p>
                <div>[Espaço reservado: InfoCardsShowcase]</div>
              </article>
            )}
          </section>
        )}

        {/* GRUPO: ORGANISMOS */}
        {(activeCategory === "all" || activeCategory === "organisms") && (
          <section id="organisms-group">
            <h2>Organismos</h2>

            {shouldRender("bottom-nav", "organisms") && (
              <article id="section-bottom-nav">
                <h3>Bottom Navigation (Barra Inferior)</h3>
                <p>Barra de navegação na zona natural do polegar (Thumb Reach Zone).</p>
                <div>[Espaço reservado: BottomNavShowcase]</div>
              </article>
            )}

            {shouldRender("top-bar", "organisms") && (
              <article id="section-top-bar">
                <h3>Top App Bar (Cabeçalho)</h3>
                <p>Barra superior de contexto e navegação hierárquica.</p>
                <div>[Espaço reservado: TopBarShowcase]</div>
              </article>
            )}

            {shouldRender("feedback", "organisms") && (
              <article id="section-feedback">
                <h3>Alertas e Snackbars</h3>
                <p>Mensagens de estado e feedback de curta duração com ação de descarte.</p>
                <div>[Espaço reservado: FeedbackShowcase]</div>
              </article>
            )}
          </section>
        )}
      </main>
    </section>
  );
}
