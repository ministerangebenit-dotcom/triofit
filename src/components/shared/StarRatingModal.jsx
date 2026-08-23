import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StarRatingModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);

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
            className="glass rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-app text-center"
          >
            <h3 className="font-display text-xl mb-4">How was your experience?</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="text-3xl"
                  style={{ color: n <= rating ? 'var(--gold)' : 'var(--text-secondary)' }}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                onSubmit?.(rating);
                onClose();
              }}
              className="w-full py-3 rounded-xl font-semibold"
              style={{ background: 'var(--gold)', color: '#111' }}
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
