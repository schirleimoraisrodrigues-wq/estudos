import { useState } from "react";
import { Card } from "../components/Card";
import { useStudyData } from "../hooks/useStudyData.jsx";
const blank = {
  title: "",
  description: "",
  subjectId: "",
  date: "",
  time: "",
  type: "tarefa",
  priority: "média",
  status: "pendente",
};
export function Tasks() {
  const { data, actions } = useStudyData();
  const [form, setForm] = useState(blank);
  const submit = (e) => {
    e.preventDefault();
    actions.upsertTask(form);
    setForm(blank);
  };
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-black">Tarefas e atividades</h1>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.subjectId}
            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          >
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="time"
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {["tarefa", "trabalho", "revisão", "apresentação", "evento"].map(
              (t) => (
                <option key={t}>{t}</option>
              ),
            )}
          </select>
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>baixa</option>
            <option>média</option>
            <option>alta</option>
          </select>
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>pendente</option>
            <option>em andamento</option>
            <option>concluída</option>
          </select>
          <textarea
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="rounded-2xl bg-violet-600 p-3 font-black text-white">
            Salvar
          </button>
        </form>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {data.tasks.map((task) => (
          <Card key={task.id}>
            <h3 className="font-black">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-slate-500">
              {task.type} • {task.date} {task.time} • {task.priority} •{" "}
              {task.status}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setForm(task)}
                className="rounded-xl border px-3 py-2 dark:border-slate-700"
              >
                Editar
              </button>
              <button
                onClick={() => actions.completeTask(task.id)}
                className="rounded-xl bg-emerald-500 px-3 py-2 text-white"
              >
                Concluir +XP
              </button>
              <button
                onClick={() => actions.deleteTask(task.id)}
                className="rounded-xl bg-rose-500 px-3 py-2 text-white"
              >
                Excluir
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
