import { useState } from "react";

interface TokenInputProps {
  onTokenSave?: () => void;
}

export function TokenInput({ onTokenSave }: TokenInputProps) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem("jwt", token.trim());
    setSaved(true);
    onTokenSave?.();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        JWT Token
      </label>
      <div className="mt-1 flex shadow-sm rounded-md overflow-hidden">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Cole seu token aqui"
          className="flex-1 block w-full px-4 py-2 border-gray-300 focus:border-primary focus:ring-primary focus:ring-1 rounded-none"
        />
        <button
          onClick={handleSave}
          disabled={!token.trim()}
          className="px-4 py-2 bg-primary text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 rounded-none"
        >
          Salvar
        </button>
      </div>
      {saved && (
        <p className="mt-1 text-sm text-green-600">Token salvo com sucesso!</p>
      )}
    </div>
  );
}
