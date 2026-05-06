import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { useStudyData } from "../hooks/useStudyData.jsx";

const blank = {
  name: "",
  color: "#8b5cf6",
  description: "",
  priority: "média",
};
export function Subjects() {
  const { data, actions } = useStudyData();
  const [form, setForm] = useState(blank);
  const submit = (event) => {
    event.preventDefault();
    actions.upsertSubject({
      ...form,
      contents: form.contents || [],
      performance: form.performance || 0,
      progress: form.progress || 0,
    });
    setForm(blank);
  };
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-black">Matérias</h2>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-5">
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="rounded-2xl bg-violet-600 font-black text-white">
            Salvar
          </button>
        </form>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.subjects.map((subject) => {
          const pending = data.tasks.filter(
            (task) =>
              task.subjectId === subject.id && task.status !== "concluída",
          ).length;
          return (
            <Card key={subject.id}>
              <Link to={`/materias/${subject.id}`}>
                <div
                  className="mb-4 h-2 rounded-full"
                  style={{ background: subject.color }}
                />
                <h3 className="text-xl font-black">{subject.name}</h3>
                <p className="text-sm text-slate-500">{subject.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <span>Desempenho: {subject.performance}%</span>
                  <span>Prioridade: {subject.priority}</span>
                  <span>Conteúdos: {subject.contents.length}</span>
                  <span>Pendentes: {pending}</span>
                </div>
                <div className="mt-4">
                  <ProgressBar value={subject.progress} />
                </div>
              </Link>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setForm(subject)}
                  className="rounded-xl border px-3 py-2 dark:border-slate-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => actions.deleteSubject(subject.id)}
                  className="rounded-xl bg-rose-500 px-3 py-2 text-white"
                >
                  Excluir
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
