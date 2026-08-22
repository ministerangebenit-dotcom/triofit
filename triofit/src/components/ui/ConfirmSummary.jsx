import React, { useState } from 'react';
import { useLang } from '../../lib/i18n';

export default function ConfirmSummary({ summary, onConfirm, onEdit }) {
  const { t } = useLang();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(summary);

  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-3">
      <div className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        {t.confirmTitle}
      </div>
      {editing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full bg-transparent resize-none outline-none text-base border border-white/10 rounded-lg p-2"
        />
      ) : (
        <p className="text-base leading-relaxed">{text}</p>
      )}
      <div className="flex gap-2">
        {editing ? (
          <button
            onClick={() => {
              setEditing(false);
              onEdit?.(text);
            }}
            className="flex-1 py-2 rounded-xl font-semibold"
            style={{ background: 'var(--gold)', color: '#111' }}
          >
            {t.confirmYes}
          </button>
        ) : (
          <>
            <button
              onClick={() => onConfirm?.(text)}
              className="flex-1 py-2 rounded-xl font-semibold"
              style={{ background: 'var(--gold)', color: '#111' }}
            >
              {t.confirmYes}
            </button>
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-2 rounded-xl font-semibold glass"
            >
              {t.confirmEdit}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
