import type { LucideIcon } from "lucide-react";

interface GroupHeadingProps {
  icon: LucideIcon;
  title: string;
  count: number;
}

export function GroupHeading({ icon: Icon, title, count }: GroupHeadingProps) {
  return (
    <div className="flex items-center justify-center gap-3 border-b border-line/40 pb-4 text-center">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary shadow-2xs">
        <Icon className="size-4.5" />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
      <span className="rounded-full border border-line/60 bg-surface-raised px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
        {count} {count === 1 ? "componente" : "componentes"}
      </span>
    </div>
  );
}
