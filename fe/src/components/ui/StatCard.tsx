interface StatCardProps {
  title: string;
  currentValue: string | number;
  previousValue: string | number;
  change: number;
  compareMode: boolean;
  formatValue?: (value: number) => string;
}

export default function StatCard({
  title,
  currentValue,
  previousValue,
  change,
  compareMode,
}: StatCardProps) {
  return (
    <div className="bg-[#f9f6f4] rounded-2xl py-2 px-3 shadow-sm">
      <p className="text-md font-semibold text-gray-600">{title}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-2xl font-medium text-gray-900">{currentValue}</h3>
        {compareMode && (
          <>
            <span className="text-md text-gray-600">vs {previousValue}</span>
            <span
              className={`text-sm font-medium ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ({change >= 0 ? "+" : ""}
              {change.toFixed(1)}%)
            </span>
          </>
        )}
      </div>
    </div>
  );
}
