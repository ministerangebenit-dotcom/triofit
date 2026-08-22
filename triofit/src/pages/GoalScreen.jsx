import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../lib/i18n';

export default function GoalScreen() {
  const navigate = useNavigate();
  const { t } = useLang();

  const goalKeys = ['job', 'date', 'wealth', 'wedding', 'authority', 'brand'];

  const handleSelect = (key) => {
    localStorage.setItem('triofit_goal', key);
    navigate('/name');
  };

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col gap-6">
      <h1 className="font-display text-2xl text-center mt-6">{t.goalTitle}</h1>
      <div className="grid grid-cols-2 gap-3">
        {goalKeys.map((key, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => handleSelect(key)}
            className="glass rounded-2xl p-5 text-left font-medium h-28 flex items-end"
          >
            {t.goals[key]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
