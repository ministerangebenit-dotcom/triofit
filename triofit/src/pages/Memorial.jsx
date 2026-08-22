import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Memorial() {
  const navigate = useNavigate();

  return (
    <div className="app-shell min-h-screen px-6 py-10 flex flex-col items-center gap-6 text-center">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        ← Back
      </button>

      <div
        className="w-28 h-28 rounded-full glass flex items-center justify-center overflow-hidden"
        style={{ border: '2px solid var(--gold)' }}
      >
        {/* Replace src with the team member's photo */}
        <span className="text-4xl">🕊️</span>
      </div>

      <h1 className="font-display text-2xl">In Loving Memory</h1>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        [Name] · [Birth date] – [Passing date]
      </p>

      <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
        You believed in TRIOFIT before it had a name. Your kindness, your ideas, and your spirit
        live on in everything we build. This space is dedicated to your memory — thank you for
        being part of our story.
      </p>

      <button onClick={() => navigate('/chat')} className="text-sm underline mt-4">
        Continue to TRIOFIT
      </button>
    </div>
  );
}
