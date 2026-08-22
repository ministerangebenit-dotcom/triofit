import React from 'react';

// Gender-responsive, WhatsApp-style tiled SVG icon background.
const ICONS = {
  neutral: ['✦', '◈', '✧'],
  feminine: ['✦', '♥', '✿'],
  masculine: ['✦', '◆', '⚡'],
};

export default function ChatBackground({ variant = 'neutral' }) {
  const icons = ICONS[variant] || ICONS.neutral;
  const tile = Array.from({ length: 48 }, (_, i) => icons[i % icons.length]);

  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden"
      aria-hidden="true"
    >
      <div className="grid grid-cols-6 gap-8 p-8 -rotate-6 scale-125">
        {tile.map((icon, i) => (
          <span key={i} className="text-2xl text-center" style={{ color: 'var(--gold)' }}>
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
}
