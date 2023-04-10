export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'icon';

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
}

const classNameMapping: Record<ButtonVariant, string> = {
  contained: `px-4 py-2 bg-blue-800 active:bg-blue-500 disabled:bg-slate-500 text-white disabled:text-slate-800 cursor-pointer disabled:cursor-not-allowed rounded-md`,
  outlined: `px-4 py-2 bg-transparent active:bg-blue-200 disabled:bg-gray-300 text-white disabled:text-slate-800 border-2 border-blue-800 cursor-pointer disabled:cursor-not-allowed rounded-md`,
  text: `px-4 py-2 bg-transparent active:bg-blue-200 disabled:bg-gray-300 text-white disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed rounded-md`,
  icon: `w-12 h-12 flex justify-center items-center bg-transparent cursor-pointer disabled:cursor-not-allowed rounded-md`,
};

export function Button({
  disabled = false,
  onClick,
  text = '',
  variant = 'contained',
}: ButtonProps) {
  return (
    <button
      className={classNameMapping[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
