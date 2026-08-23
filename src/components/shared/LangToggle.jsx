import React from 'react';
import { useLang } from '../../lib/i18n';

export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="w-9 h-9 rounded-full glass flex items-center justify-center text-xs font-semibold"
    >
      {lang === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
