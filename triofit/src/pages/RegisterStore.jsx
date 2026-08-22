import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../lib/api';

export default function RegisterStore() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ businessName: '', type: '', city: '', contact: '' });
  const [status, setStatus] = useState(null);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await endpoints.storeInterest(form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        ← Back
      </button>
      <h1 className="font-display text-2xl" style={{ color: 'var(--gold)' }}>
        Register Your Store
      </h1>

      {status === 'success' ? (
        <div className="glass rounded-2xl p-5 text-center">
          Thanks! We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            value={form.businessName}
            onChange={update('businessName')}
            placeholder="Business name"
            className="glass rounded-xl px-4 py-3 outline-none"
          />
          <input
            required
            value={form.type}
            onChange={update('type')}
            placeholder="Business type (e.g. boutique, tailor)"
            className="glass rounded-xl px-4 py-3 outline-none"
          />
          <input
            required
            value={form.city}
            onChange={update('city')}
            placeholder="City"
            className="glass rounded-xl px-4 py-3 outline-none"
          />
          <input
            required
            value={form.contact}
            onChange={update('contact')}
            placeholder="Contact (phone or email)"
            className="glass rounded-xl px-4 py-3 outline-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="py-3 rounded-xl font-semibold disabled:opacity-50"
            style={{ background: 'var(--gold)', color: '#111' }}
          >
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>
          {status === 'error' && (
            <p className="text-sm text-center text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
