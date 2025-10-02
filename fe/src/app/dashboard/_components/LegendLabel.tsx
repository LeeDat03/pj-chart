interface LegendLabelProps {
  label: string;
  color: string;
}

export default function LegendLabel({ label, color }: LegendLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 bg-black rounded"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
