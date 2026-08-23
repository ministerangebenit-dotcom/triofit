import React, { useState } from 'react';

export default function RefineQuestions({ questions, onComplete }) {
  // questions: [{ id, text, options: [] }]
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);

  const current = questions[index];

  const handleSelect = (option) => {
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      onComplete(next);
    }
  };

  if (!current) return null;

  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-4">
      <p className="text-base font-medium">{current.text}</p>
      <div className="flex flex-wrap gap-2">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className="px-4 py-2 rounded-full glass text-sm hover:opacity-80"
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        {index + 1} / {questions.length}
      </div>
    </div>
  );
}
