import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-app"
          >
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--gold)' }}>
              Triofit Pro
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Unlock unlimited perception analyses, outfit recommendations, and priority styling.
            </p>
            <button
              className="w-full py-3 rounded-xl font-semibold"
              style={{ background: 'var(--gold)', color: '#111' }}
            >
              Upgrade
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
