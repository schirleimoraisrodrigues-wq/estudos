export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
