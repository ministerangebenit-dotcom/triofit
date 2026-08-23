import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../lib/api';

export default function YourFits() {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem('triofit_session_id');
    if (!sessionId) {
      setLoading(false);
      return;
    }
    endpoints
      .getMessages(sessionId)
      .then((res) => {
        const imgs = (res.data?.messages || []).filter((m) => m.type === 'image');
        setOutfits(imgs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        ← Back
      </button>
      <h1 className="font-display text-2xl" style={{ color: 'var(--gold)' }}>
        YourFits
      </h1>

      {loading && <p className="text-sm text-center">Loading...</p>}

      {!loading && outfits.length === 0 && (
        <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
          Your recommended outfits will appear here once you've chatted with your stylist.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {outfits.map((o) => (
          <div key={o.id} className="glass rounded-xl overflow-hidden aspect-[3/4]">
            <img src={o.content} alt="Outfit" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
