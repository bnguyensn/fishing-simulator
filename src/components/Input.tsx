export interface InputProps {
  label: string;

  value: string;
  setValue: (newValue: string) => void;

  placeholder?: string;

  error?: string;
}

export function Input({
  label,
  value,
  setValue,
  placeholder,
  error,
}: InputProps) {
  const inputId = `${label}-input`;

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor={inputId}>{label}</label>
        <input
          id={inputId}
          className="w-full border-2 border-indigo-300 p-1 bg-transparent"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      {error && <p className="text-sm text-red-600 text-right">{error}</p>}
    </div>
  );
}
