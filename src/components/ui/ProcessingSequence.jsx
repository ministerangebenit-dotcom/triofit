import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FanSpinner from '../chat/FanSpinner';
import { useLang } from '../../lib/i18n';

export default function ProcessingSequence({ durationMs = 30000, onComplete }) {
  const { t } = useLang();
  const messages = t.processing;
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepMs = durationMs / messages.length;
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, messages.length - 1));
    }, stepMs);

    const start = Date.now();
    const progressTimer = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / durationMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressTimer);
        onComplete?.();
      }
    }, 100);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [durationMs, messages.length, onComplete]);

  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center gap-4">
      <FanSpinner size={48} />
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-sm text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          {messages[step]}
        </motion.p>
      </AnimatePresence>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{ width: `${progress}%`, background: 'var(--gold)' }}
        />
      </div>
    </div>
  );
}
