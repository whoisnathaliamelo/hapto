# 📱 Hapto Design System

> **Design system focado em ergonomia mobile, acessibilidade tátil e fundamentos de interface.**  
> Mais do que copiar código: uma ferramenta viva para entender a anatomia, o alcance do polegar e as decisões por trás de cada componente.

🔗 **Acesse online:** [https://hapto.vercel.app](https://hapto.vercel.app)

---

## 🎯 Sobre o Projeto

O **Hapto** foi concebido para resolver um dos maiores problemas das interfaces modernas: componentes pensados para mouse e desktop que são simplesmente adaptados para telas móveis sem respeitar a biomecânica da mão humana.

Através de uma abordagem baseada em **Atomic Design**, diretrizes da **WCAG 2.2** e padrões de ergonomia do **iOS Human Interface Guidelines** e **Material Design**, o Hapto oferece:

1. **Alvos Táteis Calibrados (Touch Targets)**: Garantia do padrão ouro de 48dp (e mínimo Apple de 44pt) para prevenir erros de digitação e toques involuntários.
2. **Thumb Zone First**: Componentes estruturados para a zona de alcance natural do polegar, minimizando esforço articular.
3. **Contraste Sob Luz Solar**: Paleta de cores testada contra as taxas de contraste WCAG (4.5:1 para texto normal, 3:1 para alvos gráficos).
4. **Prevenção de Zoom Involuntário**: Escala tipográfica calibrada (mínimo de 16px em inputs) para evitar comportamento indesejado no iOS Safari.

---

## 🧩 Módulos da Aplicação

- **🌐 [Landing Page](/)**: Apresentação da filosofia, demonstração interativa do aparelho móvel e visão geral dos pilares.
- **📚 [Fundamentos](/fundamentals)**:
  - Decomposição em **Atomic Architecture** (Tokens, Átomos, Moléculas, Organismos).
  - Pilares ergonômicos e heurísticas visuais.
  - Cheat sheet com regras de espaçamento, respiro (8dp+) e tamanhos.
- **📦 [Catálogo de Componentes](/components)**:
  - Vitrine completa com busca instantânea e filtros por camada atômica.
  - Demonstração interativa, código-fonte pronto para uso e explicação da ergonomia por trás de cada variação.
- **🧪 [Playground Ergonômico](/playground)**:
  - Simulador de alcance do polegar (*Thumb Zone*).
  - Alternância entre pegada com **mão direita** e **mão esquerda**.
  - Diagnóstico tátil em tempo real com mapeamento das zonas: *Natural*, *Esticada* e *Difícil*.
  - Cenários reais: Feed de Notícias, Formulário e Ações/FAB.

---

## 🛠️ Componentes Disponíveis

| Categoria | Componentes |
| :--- | :--- |
| **Tokens** | Cores & Contraste WCAG, Tipografia & Escala, Espaçamentos & Targets |
| **Átomos** | Button, FAB, IconButton, Input, Switch, Checkbox, Badge, Chip, Ícones |
| **Moléculas** | SearchBar / SearchInput, Informative Cards, SwitchRow, CheckboxRow, SegmentedControl |
| **Organismos** | BottomNav (Thumb Zone), TopAppBar, Feedback (Alertas & Snackbars) |

---

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org) (App Router, Turbopack)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org)
- **Biblioteca de UI**: [React 19](https://react.dev)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com) + [class-variance-authority](https://cva.style/docs)
- **Animações**: [Motion](https://motion.dev) (Framer Motion)
- **Ícones**: [Lucide React](https://lucide.dev)
- **Temas**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode)

---

## 💻 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) (versão 20 ou superior)
- `npm`, `yarn`, `pnpm` ou `bun`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/whoisnathaliamelo/hapto.git
   cd hapto
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   Acesse [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Cria a versão de produção otimizada.
- `npm run start`: Inicia o servidor com o build de produção.
- `npm run lint`: Executa a verificação estática de código com o ESLint.

---

## 📐 Estrutura de Pastas

```text
hapto/
├── app/                  # Rotas e layouts do Next.js (App Router)
│   ├── components/       # Página do Catálogo de Componentes
│   ├── fundamentals/     # Página de Fundamentos & Arquitetura Atômica
│   ├── playground/       # Página do Laboratório/Simulador Interativo
│   └── page.tsx          # Landing Page
├── components/
│   ├── catalog/          # Componentes visuais do catálogo (showcases, filtros)
│   ├── fundamentals/     # Seções da página de fundamentos
│   ├── landing/          # Seções da landing page
│   ├── playground/       # Simulador do aparelho, controles e mapa de calor
│   └── ui/               # Biblioteca de componentes do Design System
├── lib/                  # Utilitários (cn, formatação, etc.)
└── public/               # Arquivos estáticos
```

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais detalhes.
