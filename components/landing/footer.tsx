import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <Logo />
        <p>© {new Date().getFullYear()} Hapto. Design para o toque.</p>
      </div>
    </footer>
  );
}
