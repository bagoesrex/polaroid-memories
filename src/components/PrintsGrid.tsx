import type { KeyboardEvent } from 'react';
import type { Memory } from '../types';

interface PrintsGridProps {
  prints: Memory[];
  onSelectPrint: (index: number) => void;
}

export function PrintsGrid({ prints, onSelectPrint }: PrintsGridProps) {
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectPrint(index);
    }
  };

  return (
    <div className="prints-grid" aria-live="polite">
      {prints.map((memory, index) => (
        <div
          key={memory.id}
          className="polaroid-print"
          style={{ transform: `rotate(${memory.tilt}deg)` }}
          role="button"
          tabIndex={0}
          aria-label={`Buka foto ${memory.caption}`}
          onClick={() => onSelectPrint(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          <div className="img-box">
            <img src={memory.image} alt={memory.caption} />
          </div>
          <p className="caption">{memory.caption}</p>
          <span className="flip-badge">balik ↻</span>
        </div>
      ))}
    </div>
  );
}
