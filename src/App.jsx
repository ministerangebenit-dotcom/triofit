import React, { useEffect } from 'react';
import { LangProvider } from './lib/i18n';
import AppRouter from './router';

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem('triofit_theme');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, []);

  return (
    <LangProvider>
      <AppRouter />
    </LangProvider>
  );
}
