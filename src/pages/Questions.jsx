import { useState } from "react";
import { Card } from "../components/Card";
import { confidenceOptions } from "../data/seedData";
import { useStudyData } from "../hooks/useStudyData.jsx";
const blank = {
  statement: "",
  subjectId: "",
  content: "",
  type: "múltipla escolha",
  alternatives: "",
  correctAnswer: "",
  explanation: "",
};
export function Questions() {
  const { data, actions } = useStudyData();
  const [form, setForm] = useState(blank);
  const [answers, setAnswers] = useState({});
  const submit = (e) => {
    e.preventDefault();
    actions.addQuestion({
      ...form,
      alternatives: form.alternatives.split(",").map((x) => x.trim()),
    });
    setForm(blank);
  };
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-black">Questões</h1>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-3">
          <textarea
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
            placeholder="Enunciado"
            value={form.statement}
            onChange={(e) => setForm({ ...form, statement: e.target.value })}
            required
          />
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.subjectId}
            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
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
            placeholder="Conteúdo"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <select
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>múltipla escolha</option>
            <option>verdadeiro ou falso</option>
            <option>flashcard</option>
          </select>
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Alternativas separadas por vírgula"
            value={form.alternatives}
            onChange={(e) => setForm({ ...form, alternatives: e.target.value })}
          />
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Resposta correta"
            value={form.correctAnswer}
            onChange={(e) =>
              setForm({ ...form, correctAnswer: e.target.value })
            }
          />
          <input
            className="rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Explicação"
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
          />
          <button className="rounded-2xl bg-violet-600 p-3 font-black text-white">
            Cadastrar
          </button>
        </form>
      </Card>
      <div className="grid gap-4 xl:grid-cols-2">
        {data.questions.map((question) => {
          const state = answers[question.id] || {};
          const last = question.attempts.at(-1);
          return (
            <Card key={question.id}>
              <p className="text-sm font-bold text-violet-600">
                {data.subjects.find((s) => s.id === question.subjectId)?.name} •{" "}
                {question.content}
              </p>
              <h3 className="mt-2 font-black">{question.statement}</h3>
              <div className="mt-3 grid gap-2">
                {question.alternatives.map((alt) => (
                  <label
                    key={alt}
                    className="rounded-2xl border p-3 dark:border-slate-700"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      className="mr-2"
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [question.id]: { ...state, answer: alt },
                        })
                      }
                    />
                    {alt}
                  </label>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="font-black">
                  Como você se sentiu ao responder essa questão?
                </p>
                <select
                  className="mt-2 w-full rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-900"
                  value={state.confidence || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [question.id]: { ...state, confidence: e.target.value },
                    })
                  }
                >
                  <option value="">Selecione</option>
                  {confidenceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    actions.answerQuestion(
                      question.id,
                      state.answer,
                      state.confidence,
                    )
                  }
                  disabled={!state.answer || !state.confidence}
                  className="mt-3 rounded-2xl bg-emerald-500 px-4 py-2 font-black text-white disabled:opacity-40"
                >
                  Responder +XP
                </button>
              </div>
              {last && (
                <div className="mt-3 rounded-2xl bg-white p-3 dark:bg-slate-950">
                  <strong>{last.isCorrect ? "✅ Acertou" : "❌ Errou"}</strong>
                  <p>Confiança: {last.confidence}</p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
