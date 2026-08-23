import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../lib/api';
import { useLang } from '../lib/i18n';

export default function Wardrobe() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setItems(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await endpoints.wardrobe(formData);
      setItems(res.data?.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen px-6 py-8 flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        ← Back
      </button>
      <h1 className="font-display text-2xl" style={{ color: 'var(--gold)' }}>
        {t.wardrobeTitle}
      </h1>

      <label className="glass rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer">
        {preview ? (
          <img src={preview} alt="Wardrobe preview" className="w-full max-h-64 object-cover rounded-xl" />
        ) : (
          <span className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            {t.wardrobeUpload}
          </span>
        )}
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="py-3 rounded-xl font-semibold disabled:opacity-50"
        style={{ background: 'var(--gold)', color: '#111' }}
      >
        {loading ? '...' : t.analyze}
      </button>

      {items && (
        <div className="glass rounded-2xl p-5">
          {items.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              No items detected. Connect the backend to enable live analysis.
            </p>
          ) : (
            <ul className="text-sm space-y-1">
              {items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
