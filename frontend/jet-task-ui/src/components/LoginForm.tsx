import { useState, FormEvent } from "react";
import axios from "axios";
import { api } from "../services/api";

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post<{ token: string }>("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("jwt", res.data.token);
      onLoginSuccess();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Erro ao autenticar.");
      } else {
        setError("Erro ao autenticar.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white/80 rounded-3xl shadow-2xl px-8 py-10 mx-auto mt-20 flex flex-col gap-4"
    >
      <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-3 tracking-tight">
        Acesse o Jet Task
      </h2>
      {error && <div className="text-red-600 text-center text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-slate-50 focus:ring-indigo-500 focus:border-indigo-500"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-slate-50 focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-2 bg-indigo-600 rounded-xl text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
      <p className="text-xs text-gray-400 text-center">Dica: admin / 123456</p>
    </form>
  );
}
