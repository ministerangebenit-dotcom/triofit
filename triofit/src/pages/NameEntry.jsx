import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../lib/i18n';

export default function NameEntry() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { t } = useLang();

  const handleContinue = () => {
    if (!name.trim()) return;
    localStorage.setItem('triofit_name', name.trim());
    navigate('/chat');
  };

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col justify-center gap-6">
      <h1 className="font-display text-2xl text-center">{t.nameTitle}</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t.namePlaceholder}
        className="glass rounded-2xl px-5 py-4 text-lg outline-none text-center"
        onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
      />
      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="py-3 rounded-full font-semibold disabled:opacity-40"
        style={{ background: 'var(--gold)', color: '#111' }}
      >
        {t.continue}
      </button>
    </div>
  );
}
