import React from 'react';
import { useLang } from '../../lib/i18n';

export default function OutfitCard({ outfit }) {
  // outfit: { image, title, storeName, city, price }
  const { t } = useLang();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${outfit.storeName} ${outfit.city || ''}`
  )}`;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {outfit.image && (
        <img src={outfit.image} alt={outfit.title} className="w-full h-56 object-cover" />
      )}
      <div className="p-4 flex flex-col gap-1">
        <div className="font-semibold">{outfit.title}</div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {outfit.storeName} {outfit.price ? `· ${outfit.price}` : ''}
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-center py-2 px-4 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--gold)', color: '#111' }}
        >
          {t.openMaps}
        </a>
      </div>
    </div>
  );
}
