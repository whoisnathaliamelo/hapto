import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function HeroFundamentals() {
  return (
    <section id="hero">
      <nav aria-label="Breadcrumb">
        <Link href="/">
          <ArrowLeft size={16} /> Voltar para o início
        </Link>
      </nav>

      <div>
        <span>Módulo 01</span>
        <h1>Ergonomia Mobile & Design Systems</h1>
        <p>
          Construindo interfaces acessíveis, intuitivas e eficientes para a era <em>touch</em>.
        </p>

        {/* 3 Badges com Métricas */}
        <ul aria-label="Highlights de Métricas">
          <li>
            <span>📱</span>
            <strong>+6,8 Bilhões</strong>
            <span>de usuários de smartphones no mundo.</span>
          </li>
          <li>
            <span>🎯</span>
            <strong>48 x 48 dp</strong>
            <span>de área mínima para interações por toque.</span>
          </li>
          <li>
            <span>👁️</span>
            <strong>4.5:1</strong>
            <span>de razão mínima de contraste para acessibilidade (WCAG).</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
