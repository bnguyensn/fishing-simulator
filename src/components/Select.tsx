export interface SelectOption {
  value: string;
  label?: string;
}

export interface SelectProps {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  options: SelectOption[];
}

export function Select({ label, value, setValue, options }: SelectProps) {
  return (
    <label className="w-full flex items-center gap-2">
      <div>{label}</div>
      <select
        className="w-full p-1 bg-slate-900"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value} className="bg-slate-900">
            {label ?? value}
          </option>
        ))}
      </select>
    </label>
  );
}
