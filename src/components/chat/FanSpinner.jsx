import React from 'react';
import { motion } from 'framer-motion';

export default function FanSpinner({ size = 40 }) {
  const blades = Array.from({ length: 6 });
  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
    >
      {blades.map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 0.42,
            height: 3,
            background: 'var(--gold)',
            opacity: 0.3 + (i / blades.length) * 0.7,
            transform: `rotate(${(360 / blades.length) * i}deg) translateX(0)`,
            transformOrigin: '0 50%',
            borderRadius: 2,
          }}
        />
      ))}
    </motion.div>
  );
}
