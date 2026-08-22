import React from 'react';
import FanSpinner from '../chat/FanSpinner';

export default function WaitingForStylist() {
  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-3">
      <FanSpinner size={28} />
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Your stylist is putting together outfit options...
      </span>
    </div>
  );
}
