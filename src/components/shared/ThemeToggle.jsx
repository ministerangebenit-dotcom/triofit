import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('triofit_theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('triofit_theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
