import React from 'react';
import RadarBars from './RadarBars';

export default function Blueprint({ scores }) {
  // scores: { confidence, authority, trust, approachability, styleFit }
  const traits = [
    { label: 'Confidence', value: scores.confidence ?? 0 },
    { label: 'Authority', value: scores.authority ?? 0 },
    { label: 'Trust', value: scores.trust ?? 0 },
    { label: 'Approachability', value: scores.approachability ?? 0 },
    { label: 'Style fit', value: scores.styleFit ?? 0 },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <RadarBars traits={traits} />
    </div>
  );
}
