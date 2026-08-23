import React from 'react';
import { motion } from 'framer-motion';

export default function LogoOrb({ size = 72 }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #D9AE5A, #C79B45 55%, #8a6a2e 100%)',
          boxShadow: '0 0 30px rgba(199,155,69,0.45)',
        }}
      />
      <span className="relative font-display text-white" style={{ fontSize: size * 0.36 }}>
        T
      </span>
    </motion.div>
  );
}
