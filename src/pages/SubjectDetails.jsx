import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { useStudyData } from "../hooks/useStudyData.jsx";
import { calculatePerformance } from "../utils/performance";

const tabs = ["Conteúdos", "Tarefas", "Provas", "Questões", "Desempenho"];
export function SubjectDetails() {
  const { id } = useParams();
  const { data } = useStudyData();
  const [tab, setTab] = useState(tabs[0]);
  const subject = data.subjects.find((item) => item.id === id);
  if (!subject) return <Card>Matéria não encontrada.</Card>;
  const tasks = data.tasks.filter((item) => item.subjectId === id);
  const exams = data.exams.filter((item) => item.subjectId === id);
  const questions = data.questions.filter((item) => item.subjectId === id);
  const performance = calculatePerformance(data.questions, id);
  return (
    <div className="space-y-6">
      <Card>
        <div
          className="h-2 rounded-full"
          style={{ background: subject.color }}
        />
        <h1 className="mt-4 text-3xl font-black">{subject.name}</h1>
        <p className="text-slate-500">{subject.description}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <span>Prioridade: {subject.priority}</span>
          <span>Desempenho: {subject.performance}%</span>
          <span>Progresso geral: {subject.progress}%</span>
          <span>Questões: {questions.length}</span>
        </div>
        <div className="mt-4">
          <ProgressBar value={subject.progress} />
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-2xl px-4 py-2 font-bold ${tab === item ? "bg-violet-600 text-white" : "bg-white dark:bg-slate-900"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <Card>
        {tab === "Conteúdos" &&
          subject.contents.map((content) => (
            <p key={content.id} className="mb-3">
              📌 {content.title} • dificuldade {content.difficulty} •{" "}
              {content.progress}%
            </p>
          ))}
        {tab === "Tarefas" &&
          tasks.map((task) => (
            <p key={task.id} className="mb-3">
              ✅ {task.title} • {task.status}
            </p>
          ))}
        {tab === "Provas" &&
          exams.map((exam) => (
            <p key={exam.id} className="mb-3">
              📝 {exam.title} • {exam.date} • {exam.preparationStatus}
            </p>
          ))}
        {tab === "Questões" &&
          questions.map((question) => (
            <p key={question.id} className="mb-3">
              🧠 {question.statement}
            </p>
          ))}
        {tab === "Desempenho" && (
          <div>
            <h3 className="text-xl font-black">{performance.score}%</h3>
            <p>
              Acertos: {performance.correct} • Erros: {performance.wrong} •
              Respondidas: {performance.total}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
