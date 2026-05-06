import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService";

const navItems = [
  ["/", "🏠", "Dashboard"],
  ["/calendario", "📅", "Calendário"],
  ["/materias", "📚", "Matérias"],
  ["/provas", "📝", "Provas"],
  ["/tarefas", "✅", "Tarefas"],
  ["/questoes", "🧠", "Questões"],
  ["/flashcards", "🎴", "Flashcards"],
  ["/perfil", "🧑", "Perfil"],
  ["/configuracoes", "⚙️", "Configurações"],
];

export function Layout({ user, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen study-gradient text-slate-900 dark:text-slate-100">
      <button
        className="fixed left-4 top-4 z-50 rounded-2xl bg-white/90 px-3 py-2 shadow-lg dark:bg-slate-900 lg:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/50 bg-white/85 p-5 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} transition`}
      >
        <div className="mb-8 rounded-3xl bg-violet-600 p-4 text-white shadow-lg">
          <div className="text-2xl font-black">StudyQuest</div>
          <div className="text-sm text-violet-100">
            Organize, estude e evolua
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map(([to, icon, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${isActive ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200" : "hover:bg-slate-100 dark:hover:bg-slate-900"}`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/50 bg-white/70 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="ml-12 lg:ml-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Bem-vindo(a)
            </p>
            <strong>{user?.name}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold dark:border-slate-700"
            >
              Sair
            </button>
          </div>
        </header>
        <section className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
