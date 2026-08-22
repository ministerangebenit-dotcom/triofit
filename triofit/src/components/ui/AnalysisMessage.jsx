import React from 'react';
import { motion } from 'framer-motion';
import RadarBars from './RadarBars';
import { useLang } from '../../lib/i18n';

export default function AnalysisMessage({ analysis, onRefine, onQuickAdvice }) {
  const { t } = useLang();
  // analysis: { impression, reasons: [], strengths: [], cautions: [], traits: [{label,value}] }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-5 flex flex-col gap-4"
    >
      <div>
        <div className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--gold)' }}>
          {t.analysisImpression}
        </div>
        <div className="font-display text-2xl">{analysis.impression}</div>
      </div>

      {analysis.traits?.length > 0 && <RadarBars traits={analysis.traits} />}

      {analysis.strengths?.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-1">{t.analysisStrengths}</div>
          <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
            {analysis.strengths.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}

      {analysis.cautions?.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-1">{t.analysisCautions}</div>
          <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
            {analysis.cautions.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={onRefine}
          className="flex-1 py-3 rounded-xl font-semibold"
          style={{ background: 'var(--gold)', color: '#111' }}
        >
          {t.refineCta}
        </button>
        <button onClick={onQuickAdvice} className="flex-1 py-3 rounded-xl font-semibold glass">
          {t.quickCta}
        </button>
      </div>
    </motion.div>
  );
}
