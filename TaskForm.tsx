/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { Task } from "../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [executeAt, setExecuteAt] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (new Date(executeAt) <= new Date()) {
      setError("Escolha uma data futura.");
      toast.error("Escolha uma data futura.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<Task>("/tasks", {
        title,
        description,
        executeAt,
        webhookUrl,
      });
      onTaskCreated(data);
      setTitle("");
      setDescription("");
      setExecuteAt("");
      setWebhookUrl("");
      toast.success("Tarefa criada com sucesso! Notificação será enviada para o webhook.");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Erro ao criar tarefa.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-white/90 rounded-3xl shadow-xl mb-8 p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Agendar Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
              <input
                type="datetime-local"
                value={executeAt}
                onChange={e => setExecuteAt(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Criar Tarefa"}
          </button>
        </form>
      </div>
    </>
  );
}
