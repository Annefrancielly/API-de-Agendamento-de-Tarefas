import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Task } from "./types";
import "./index.css";
import { api } from "./services/api";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("jwt"));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api
      .get<Task[]>("/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setToken(null);
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-slate-200">
        <LoginForm onLoginSuccess={() => setToken(localStorage.getItem("jwt"))} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-slate-200 dark:from-slate-900 dark:to-indigo-950 transition-colors">
      <header className="w-full py-6 bg-indigo-700 text-white flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold tracking-wide">Agenda de Tarefas</span>
        <button
          onClick={handleLogout}
          className="ml-8 px-5 py-1 bg-white text-indigo-700 rounded-xl font-semibold shadow hover:bg-indigo-100 transition"
        >
          Logout
        </button>
      </header>
      <main className="w-full max-w-xl mx-auto px-4 py-10">
        <TaskForm
          onTaskCreated={(task: Task) => setTasks([task, ...tasks])}
        />
        {loading ? (
          <p className="mt-8 text-center text-indigo-600 animate-pulse">Carregando tarefas…</p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </main>
      <footer className="w-full text-center text-xs text-gray-400 py-4">
        Desenvolvido por Anne • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
