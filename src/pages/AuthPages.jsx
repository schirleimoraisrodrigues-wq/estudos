import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, register } from "../services/authService";

function AuthShell({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    try {
      mode === "login" ? login(form) : register(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main className="grid min-h-screen place-items-center study-gradient p-4 text-slate-900 dark:text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-violet-600">StudyQuest</h1>
          <p className="text-slate-500">
            {mode === "login"
              ? "Entre para continuar sua jornada."
              : "Crie sua conta para iniciar a missão."}
          </p>
        </div>
        {mode === "register" && (
          <input
            className="mb-3 w-full rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          className="mb-3 w-full rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="mb-3 w-full rounded-2xl border p-3 dark:border-slate-700 dark:bg-slate-950"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {error && (
          <p className="mb-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-500/10">
            {error}
          </p>
        )}
        <button className="w-full rounded-2xl bg-violet-600 p-3 font-black text-white shadow-lg shadow-violet-500/30">
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
          <Link
            className="font-bold text-violet-600"
            to={mode === "login" ? "/cadastro" : "/login"}
          >
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </Link>
        </p>
      </form>
    </main>
  );
}
export const Login = () => <AuthShell mode="login" />;
export const Register = () => <AuthShell mode="register" />;
