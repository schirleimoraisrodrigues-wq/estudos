export function ProgressBar({ value, color = "bg-violet-500" }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
