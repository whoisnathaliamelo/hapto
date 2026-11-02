import type { HandGrip } from "../types";
import { Hand } from "lucide-react";
import {
  Badge,
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui";

interface HandSelectorProps {
  value: HandGrip;
  onChange: (value: HandGrip) => void;
}

export function HandSelector({ value, onChange }: HandSelectorProps) {
  const options: { id: HandGrip; label: string; sub: string }[] = [
    { id: "left", label: "Canhoto", sub: "Mão esquerda" },
    { id: "right", label: "Destro", sub: "Mão direita" },
    { id: "both", label: "Duas Mãos", sub: "Dois polegares" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <Hand className="size-3.5 text-primary" />
          <span>Pegada da Mão</span>
        </label>
        <Badge variant="primary" shape="pill" size="sm">
          {value === "right" ? "Destro" : value === "left" ? "Canhoto" : "2 Mãos"}
        </Badge>
      </div>

      <SegmentedControl
        value={value}
        onValueChange={(val) => onChange(val as HandGrip)}
        variant="raised"
        itemVariant="surface"
        fullWidth
        className="grid grid-cols-3"
      >
        {options.map((option) => (
          <SegmentedControlItem
            key={option.id}
            value={option.id}
            detail={option.sub}
            className="flex-col py-2 min-h-12"
          >
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </div>
  );
}

