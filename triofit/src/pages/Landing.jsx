import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LogoOrb from '../components/shared/LogoOrb';
import LangToggle from '../components/shared/LangToggle';
import ThemeToggle from '../components/shared/ThemeToggle';
import { useLang } from '../lib/i18n';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="app-shell flex flex-col min-h-screen px-6 py-6">
      <div className="flex justify-end gap-2">
        <LangToggle />
        <ThemeToggle />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <LogoOrb size={88} />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-display text-4xl leading-tight"
        >
          {t.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base max-w-xs"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          onClick={() => navigate('/goal')}
          className="px-8 py-3 rounded-full font-semibold text-base"
          style={{ background: 'var(--gold)', color: '#111' }}
        >
          {t.cta}
        </motion.button>
      </div>
    </div>
  );
}
