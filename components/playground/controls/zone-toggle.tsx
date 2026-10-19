interface ZoneToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ZoneToggle({ checked, onChange }: ZoneToggleProps) {
  return (
    <fieldset>
      <legend>Sobreposição Visual</legend>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>Exibir Zonas do Polegar (Thumb Zone)</span>
      </label>
    </fieldset>
  );
}
