import { memo } from 'react';
import type { Memory } from '../types';

interface EjectBayProps {
  isEjecting: boolean;
  isDeveloped: boolean;
  memory: Memory | null;
  onCardClick: () => void;
}

export const EjectBay = memo(function EjectBay({
  isEjecting,
  isDeveloped,
  memory,
  onCardClick,
}: EjectBayProps) {
  return (
    <div className={`eject-bay ${isEjecting ? 'ejecting' : ''}`}>
      <div
        className="ejecting-card"
        role="button"
        tabIndex={0}
        title="Klik untuk melihat foto"
        onClick={onCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCardClick();
          }
        }}
      >
        <div
          className={`ejecting-photo-frame ${isDeveloped ? 'developed' : ''}`}
        >
          {memory && (
            <img
              src={memory.image}
              alt={memory.caption}
            />
          )}
        </div>
        <p className="ejecting-caption">{memory ? memory.caption : ''}</p>
      </div>
    </div>
  );
});
