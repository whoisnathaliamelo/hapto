import type { HandGrip } from "../types";

interface HandSelectorProps {
  value: HandGrip;
  onChange: (value: HandGrip) => void;
}

export function HandSelector({ value, onChange }: HandSelectorProps) {
  const options: { id: HandGrip; label: string }[] = [
    { id: "left", label: "Canhoto (Esquerda)" },
    { id: "right", label: "Destro (Direita)" },
    { id: "both", label: "Ambas as Mãos" },
  ];

  return (
    <fieldset>
      <legend>Pegada da Mão</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
