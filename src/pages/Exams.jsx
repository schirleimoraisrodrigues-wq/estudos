import { useState } from "react";
import { Card } from "../components/Card";
import { useStudyData } from "../hooks/useStudyData.jsx";
const blank = {
  title: "",
  subjectId: "",
  date: "",
  time: "",
  contents: "",
  difficulty: "média",
  weight: 1,
  preparationStatus: "não iniciado",
  notes: "",
};
export function Exams() {
  const { data, actions } = useStudyData();
  const [form, setForm] = useState(blank);
  const submit = (e) => {
    e.preventDefault();
    actions.upsertExam({
      ...form,
      contents: String(form.contents)
        .split(",")
        .map((x) => x.trim()),
    });
    setForm(blank);
  };
  return (
    <CrudPage title="Provas" form={form} setForm={setForm} submit={submit}>
      <select
        value={form.subjectId}
        onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        required
      >
        <option value="">Matéria</option>
        {data.subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <input
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
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
      <input
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        placeholder="Conteúdos separados por vírgula"
        value={form.contents}
        onChange={(e) => setForm({ ...form, contents: e.target.value })}
      />
      <select
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        value={form.difficulty}
        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
      >
        <option>baixa</option>
        <option>média</option>
        <option>alta</option>
      </select>
      <select
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        value={form.preparationStatus}
        onChange={(e) =>
          setForm({ ...form, preparationStatus: e.target.value })
        }
      >
        <option>não iniciado</option>
        <option>estudando</option>
        <option>quase pronto</option>
        <option>preparado</option>
      </select>
      <input
        type="number"
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
        placeholder="Peso"
        value={form.weight}
        onChange={(e) => setForm({ ...form, weight: e.target.value })}
      />
      <textarea
        className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
        placeholder="Observações"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <button className="rounded-2xl bg-violet-600 p-3 font-black text-white">
        Salvar
      </button>
      <List
        items={data.exams}
        subjects={data.subjects}
        setForm={setForm}
        onDelete={actions.deleteExam}
      />
    </CrudPage>
  );
}
function CrudPage({ title, form, setForm, submit, children }) {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-black">{title}</h1>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-3">
          {children}
        </form>
      </Card>
    </div>
  );
}
function List({ items, subjects, setForm, onDelete }) {
  return (
    <div className="md:col-span-3 grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id}>
          <h3 className="font-black">{item.title}</h3>
          <p>
            {subjects.find((s) => s.id === item.subjectId)?.name} • {item.date}{" "}
            {item.time}
          </p>
          <p className="text-sm text-slate-500">
            Dificuldade {item.difficulty} • peso {item.weight} •{" "}
            {item.preparationStatus}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() =>
                setForm({ ...item, contents: item.contents.join(", ") })
              }
              className="rounded-xl border px-3 py-2 dark:border-slate-700"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="rounded-xl bg-rose-500 px-3 py-2 text-white"
            >
              Excluir
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
