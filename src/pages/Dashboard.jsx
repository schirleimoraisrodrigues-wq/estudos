import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { CalendarGrid } from "../components/CalendarGrid";
import { ProgressBar } from "../components/ProgressBar";
import { useStudyData } from "../hooks/useStudyData.jsx";
import { calculateDailyPriorities } from "../utils/priority";
import { calculateLevel, nextLevelProgress } from "../utils/xp";

export function Dashboard() {
  const { data } = useStudyData();
  const activities = [
    ...data.tasks,
    ...data.exams.map((exam) => ({ ...exam, type: "prova" })),
  ];
  const nextTasks = data.tasks
    .filter((task) => task.status !== "concluída")
    .slice(0, 3);
  const lowSubjects = [...data.subjects]
    .sort((a, b) => a.performance - b.performance)
    .slice(0, 3);
  const xpProgress = nextLevelProgress(data.profile.xp);
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-2">
          <p className="text-slate-500">Olá, {data.profile.name} 👋</p>
          <h1 className="text-3xl font-black">
            Sua jornada de estudos espera por você.
          </h1>
          <Link
            to="/questoes"
            className="mt-5 inline-block rounded-2xl bg-violet-600 px-5 py-3 font-black text-white"
          >
            Estudar agora
          </Link>
        </Card>
        <Card>
          <p className="text-slate-500">XP</p>
          <h2 className="text-4xl font-black">{data.profile.xp}</h2>
          <p>Nível {calculateLevel(data.profile.xp)}</p>
          <ProgressBar value={xpProgress.percentage} />
        </Card>
        <Card>
          <p className="text-slate-500">Sequência</p>
          <h2 className="text-4xl font-black">🔥 {data.profile.streak}</h2>
          <p>dias estudando</p>
        </Card>
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <CalendarGrid compact activities={activities} />
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="mb-3 font-black">Prioridades de hoje</h3>
            {calculateDailyPriorities(data).map((subject) => (
              <div
                key={subject.id}
                className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"
              >
                <strong>{subject.name}</strong>
                <p className="text-sm text-slate-500">
                  Prioridade {subject.priority}
                </p>
              </div>
            ))}
          </Card>
          <Card>
            <h3 className="mb-3 font-black">Próximas tarefas</h3>
            {nextTasks.map((task) => (
              <p key={task.id} className="mb-2">
                ✅ {task.title}
              </p>
            ))}
          </Card>
          <Card>
            <h3 className="mb-3 font-black">Próximas provas</h3>
            {data.exams.slice(0, 3).map((exam) => (
              <p key={exam.id} className="mb-2">
                📝 {exam.title} • {exam.date}
              </p>
            ))}
          </Card>
          <Card>
            <h3 className="mb-3 font-black">Pior desempenho</h3>
            {lowSubjects.map((subject) => (
              <p key={subject.id} className="mb-2">
                {subject.name}: {subject.performance}%
              </p>
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
}
