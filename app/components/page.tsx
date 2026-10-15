import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
    title: "Catálogo de Componentes | Hapto Design System",
    description: "Biblioteca modular de componentes móveis organizada por Atomic Design.",
}

export default function ComponentsPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <CatalogView />
      </main>
      <Footer />
    </>
  );
}
