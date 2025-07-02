import { useState, FormEvent } from 'react';
import axios from 'axios';
import { api } from '../services/api';

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post<{ token: string }>('/auth/login', { username, password });
      localStorage.setItem('jwt', res.data.token);
      onLoginSuccess();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao autenticar.');
      } else {
        setError('Erro ao autenticar.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-24 bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">Entrar no sistema</h2>
      {error && <div className="text-red-600 text-center text-sm">{error}</div>}
      <div>
        <label className="block text-sm mb-1">Usuário</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Senha</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
      <p className="text-xs text-gray-500 text-center">Dica: admin / 123456</p>
    </form>
  );
}
