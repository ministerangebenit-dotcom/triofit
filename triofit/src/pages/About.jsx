import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoOrb from '../components/shared/LogoOrb';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        ← Back
      </button>
      <div className="flex flex-col items-center gap-3 text-center">
        <LogoOrb size={64} />
        <h1 className="font-display text-2xl" style={{ color: 'var(--gold)' }}>
          About TRIOFIT
        </h1>
      </div>

      <section className="glass rounded-2xl p-5 flex flex-col gap-2">
        <h2 className="font-semibold">Who we are</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          TRIOFIT is an AI-powered personal styling platform helping people understand and
          shape how they're perceived socially — before they walk into the room.
        </p>
      </section>

      <section className="glass rounded-2xl p-5 flex flex-col gap-2">
        <h2 className="font-semibold">Why we built it</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Style is communication. We built TRIOFIT so anyone can walk into a job interview,
          a date, or a big meeting knowing exactly the impression they'll make — and how to
          improve it.
        </p>
      </section>

      <section className="glass rounded-2xl p-5 flex flex-col gap-2">
        <h2 className="font-semibold">How it works</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Tell us your goal and situation. Our AI builds a perception profile, then recommends
          real outfits from partner stores near you.
        </p>
      </section>

      <section className="glass rounded-2xl p-5 flex flex-col gap-2">
        <h2 className="font-semibold">Contact</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          hello@triofit.app
        </p>
      </section>
    </div>
  );
}
