import type { TargetSize } from "../types";

interface TargetCalibratorProps {
  value: TargetSize;
  onChange: (value: TargetSize) => void;
}

export function TargetCalibrator({ value, onChange }: TargetCalibratorProps) {
  const options: { id: TargetSize; label: string; detail: string }[] = [
    { id: "40px", label: "40px", detail: "Risco de erro de toque" },
    { id: "44px", label: "44px", detail: "Mínimo Apple HIG" },
    { id: "48px", label: "48px", detail: "Padrão Hapto / Material" },
  ];

  return (
    <fieldset>
      <legend>Calibrar Target Tátil</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
          >
            <span>{option.label}</span>
            <small> — {option.detail}</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
