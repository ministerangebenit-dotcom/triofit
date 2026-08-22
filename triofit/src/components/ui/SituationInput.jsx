import React, { useState } from 'react';
import { useLang } from '../../lib/i18n';

export default function SituationInput({ onSubmit }) {
  const [value, setValue] = useState('');
  const { t } = useLang();

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t.situationPlaceholder}
        rows={4}
        className="w-full bg-transparent resize-none outline-none text-base placeholder:opacity-50"
      />
      <div className="flex justify-between items-center">
        <button
          type="button"
          aria-label="Voice input"
          className="w-9 h-9 rounded-full glass flex items-center justify-center"
        >
          🎙️
        </button>
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="px-5 py-2 rounded-xl font-semibold disabled:opacity-40"
          style={{ background: 'var(--gold)', color: '#111' }}
        >
          {t.send}
        </button>
      </div>
    </div>
  );
}
