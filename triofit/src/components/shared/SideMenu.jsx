import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../lib/i18n';

export default function SideMenu({ open, onClose, hasMemorial = true }) {
  const navigate = useNavigate();
  const { t } = useLang();

  const items = [
    { label: t.menu.about, path: '/about' },
    { label: t.menu.wardrobe, path: '/wardrobe' },
    { label: t.menu.measurements, path: '/measurements' },
    { label: t.menu.yourFits, path: '/your-fits' },
    { label: t.menu.registerStore, path: '/register-store' },
    ...(hasMemorial ? [{ label: t.menu.memorial, path: '/memorial' }] : []),
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            key="panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed left-0 top-0 h-full w-72 glass z-50 p-6 flex flex-col gap-2"
          >
            <div className="font-display text-xl mb-4" style={{ color: 'var(--gold)' }}>
              TRIOFIT
            </div>
            {items.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="text-left py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
