import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Task } from './types';
import './index.css'; // importa estilos

import { api } from './services/api';


export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('jwt'));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // Sempre busca tarefas quando logado
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.get<Task[]>('/tasks')
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [token]);

  function handleLogout() {
    localStorage.removeItem('jwt');
    setToken(null);
  }

  // Quando loga, recebe o token, re-renderiza
  if (!token) {
    return <LoginForm onLoginSuccess={() => setToken(localStorage.getItem('jwt'))} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full py-6 bg-indigo-700 text-white text-center text-3xl font-bold shadow">
        Jet Task Scheduler
        <button
          onClick={handleLogout}
          className="ml-8 px-4 py-1 bg-white text-indigo-700 rounded shadow hover:bg-indigo-100"
        >
          Logout
        </button>
      </header>
      <main className="w-full max-w-3xl px-6 py-10">
      <TaskForm onTaskCreated={(task: Task) => setTasks([task, ...tasks])} />
        {loading
          ? <p className="mt-8 text-center text-gray-500">Carregando tarefas…</p>
          : <TaskList tasks={tasks} />
        }
      </main>
    </div>
  );
}
