import { useMemo, useState } from "react";
import { Card } from "./Card";

const typeStyle = {
  prova: "bg-rose-500",
  tarefa: "bg-sky-500",
  revisão: "bg-emerald-500",
  apresentação: "bg-amber-500",
  trabalho: "bg-violet-500",
  evento: "bg-slate-500",
};

export function CalendarGrid({ activities, compact = false }) {
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const days = useMemo(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return [
      ...Array(first.getDay()).fill(null),
      ...Array.from({ length: total }, (_, index) =>
        new Date(now.getFullYear(), now.getMonth(), index + 1)
          .toISOString()
          .slice(0, 10),
      ),
    ];
  }, []);
  const selectedActivities = activities.filter(
    (activity) => activity.date === selected,
  );
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-black">Calendário do mês</h3>
        <span className="text-sm text-slate-500">
          Provas, trabalhos, tarefas, revisões e eventos
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const items = activities.filter((activity) => activity.date === day);
          return (
            <button
              key={day || index}
              disabled={!day}
              onClick={() => setSelected(day)}
              className={`min-h-16 rounded-2xl border p-2 text-left transition ${day === selected ? "border-violet-500 bg-violet-50 dark:bg-violet-500/20" : "border-slate-100 bg-white/70 dark:border-slate-800 dark:bg-slate-950/40"} ${compact ? "min-h-12" : ""}`}
            >
              <span className="font-bold">
                {day ? new Date(`${day}T00:00:00`).getDate() : ""}
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {items.slice(0, compact ? 2 : 4).map((item) => (
                  <span
                    key={item.id}
                    className={`h-2 w-2 rounded-full ${typeStyle[item.type] || typeStyle.prova}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">
        <h4 className="font-black">
          Atividades do dia {selected.split("-").reverse().join("/")}
        </h4>
        <div className="mt-3 space-y-2">
          {selectedActivities.length ? (
            selectedActivities.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl bg-white p-3 dark:bg-slate-900"
              >
                <span>{item.title}</span>
                <span className="text-xs font-bold uppercase text-slate-500">
                  {item.type} • {item.time}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Nenhuma atividade cadastrada.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
