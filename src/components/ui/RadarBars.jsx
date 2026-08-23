import React from 'react';
import { motion } from 'framer-motion';

export default function RadarBars({ traits }) {
  // traits: [{ label, value (0-100) }]
  return (
    <div className="flex flex-col gap-3 w-full">
      {traits.map((trait, i) => (
        <div key={trait.label}>
          <div className="flex justify-between text-sm mb-1">
            <span>{trait.label}</span>
            <span style={{ color: 'var(--gold)' }}>{trait.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${trait.value}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #C79B45, #D9AE5A)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
