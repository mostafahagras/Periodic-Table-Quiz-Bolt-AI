import React from 'react';

interface ScoreDisplayProps {
  score: number;
  total: number;
}

export function ScoreDisplay({ score, total }: ScoreDisplayProps) {
  return (
    <div className="text-center mb-4">
      <p className="text-xl font-semibold">
        Score: <span className="text-blue-600">{score}</span> / {total}
      </p>
    </div>
  );
}