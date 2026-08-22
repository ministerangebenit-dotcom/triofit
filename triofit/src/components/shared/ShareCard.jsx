import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useLang } from '../../lib/i18n';

export default function ShareCard({ score, topTrait, name }) {
  const cardRef = useRef(null);
  const { t } = useLang();

  const handleShare = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'triofit-result.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My Triofit result' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'triofit-result.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{
          background: 'linear-gradient(160deg, #16161A, #0B0B0D)',
          border: '1px solid rgba(199,155,69,0.35)',
        }}
      >
        <div className="font-display text-lg mb-1" style={{ color: 'var(--gold)' }}>
          TRIOFIT
        </div>
        <div className="text-4xl font-display my-4">{score}%</div>
        <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Top trait
        </div>
        <div className="text-xl font-semibold mb-4">{topTrait}</div>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {name ? `${name} · ` : ''}triofit.app
        </div>
      </div>
      <button
        onClick={handleShare}
        className="px-6 py-3 rounded-xl font-semibold"
        style={{ background: 'var(--gold)', color: '#111' }}
      >
        {t.shareResult}
      </button>
    </div>
  );
}
