import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { useStudyData } from "../hooks/useStudyData.jsx";
import { calculateLevel } from "../utils/xp";

export function Flashcards() {
  const { data } = useStudyData();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.flashcards.map((card) => (
        <Card key={card.id}>
          <p className="text-sm text-violet-600">Flashcard</p>
          <h3 className="text-xl font-black">{card.front}</h3>
          <p className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
            {card.back}
          </p>
        </Card>
      ))}
    </div>
  );
}
export function Profile() {
  const { data } = useStudyData();
  return (
    <Card>
      <h1 className="text-3xl font-black">{data.profile.name}</h1>
      <p>{data.profile.course}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <span>XP: {data.profile.xp}</span>
        <span>Nível: {calculateLevel(data.profile.xp)}</span>
        <span>Sequência: {data.profile.streak} dias</span>
      </div>
      <h2 className="mt-6 font-black">Conquistas</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.profile.achievements.map((item) => (
          <span
            key={item}
            className="rounded-full bg-amber-100 px-4 py-2 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200"
          >
            🏆 {item}
          </span>
        ))}
      </div>
    </Card>
  );
}
export function Settings({ theme, toggleTheme }) {
  return (
    <Card>
      <h1 className="text-3xl font-black">Configurações</h1>
      <p className="mt-2 text-slate-500">
        Preferências salvas no LocalStorage.
      </p>
      <button
        onClick={toggleTheme}
        className="mt-5 rounded-2xl bg-violet-600 px-5 py-3 font-black text-white"
      >
        Alternar para tema {theme === "dark" ? "claro" : "escuro"}
      </button>
    </Card>
  );
}
export function SubjectProgressList() {
  const { data } = useStudyData();
  return (
    <div className="space-y-3">
      {data.subjects.map((subject) => (
        <div key={subject.id}>
          <div className="mb-1 flex justify-between">
            <span>{subject.name}</span>
            <span>{subject.progress}%</span>
          </div>
          <ProgressBar value={subject.progress} />
        </div>
      ))}
    </div>
  );
}
