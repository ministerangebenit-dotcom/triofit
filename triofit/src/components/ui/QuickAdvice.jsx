import React from 'react';
import { motion } from 'framer-motion';

export default function QuickAdvice({ tips }) {
  // tips: string[3]
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3">
      {tips.map((tip, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className="flex gap-3 items-start"
        >
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--gold)', color: '#111' }}
          >
            {i + 1}
          </span>
          <p className="text-sm leading-relaxed">{tip}</p>
        </motion.div>
      ))}
    </div>
  );
}
