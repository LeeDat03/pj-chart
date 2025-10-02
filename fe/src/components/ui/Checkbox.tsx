interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  colorChart: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  colorChart,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-black peer-checked:border-black transition-all flex items-center justify-center">
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span
        className="w-3 h-[2px] rounded-full"
        style={{ backgroundColor: colorChart }}
      ></span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
