import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../lib/api';
import { useLang } from '../lib/i18n';

const FIELDS = [
  { key: 'chest', label: 'Chest width' },
  { key: 'waist', label: 'Waist' },
  { key: 'hip', label: 'Hip' },
  { key: 'inseam', label: 'Inseam' },
  { key: 'shoeSize', label: 'Shoe size' },
  { key: 'shoulderWidth', label: 'Shoulder width' },
];

export default function Measurements() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await endpoints.measurements(formData);
      setResult(res.data || {});
    } catch {
      setResult({});
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
        {t.measurementsTitle}
      </h1>

      <label className="glass rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer">
        {preview ? (
          <img src={preview} alt="Measurement preview" className="w-full max-h-64 object-cover rounded-xl" />
        ) : (
          <span className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            {t.measurementsUpload}
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

      {result && (
        <div className="glass rounded-2xl p-5 flex flex-col gap-3">
          {FIELDS.map((f) => (
            <div key={f.key} className="flex justify-between text-sm">
              <span>{f.label}</span>
              <span style={{ color: 'var(--gold)' }}>
                {result[f.key] ?? '—'}
                {result[`${f.key}Confidence`] ? ` (${result[`${f.key}Confidence`]}%)` : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
