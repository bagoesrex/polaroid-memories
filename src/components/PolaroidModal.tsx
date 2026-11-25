import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import type { Memory } from '../types';

interface PolaroidModalProps {
  isOpen: boolean;
  memory: Memory | null;
  index: number;
  sender: string;
  onClose: () => void;
  onPlayFlipSound: () => void;
}

export function PolaroidModal({
  isOpen,
  memory,
  index,
  sender,
  onClose,
  onPlayFlipSound,
}: PolaroidModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
    }
  }, [isOpen, memory]);

  if (!isOpen || !memory) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
    onPlayFlipSound();
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Detail foto polaroid"
      onClick={handleBackdropClick}
    >
      <div
        className="flip-scene"
        title="Klik untuk membalik foto"
        onClick={handleToggleFlip}
      >
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-face flip-front">
            <div className="big-img">
              <img src={memory.image} alt={memory.caption} />
            </div>
            <p className="big-caption">{memory.caption}</p>
            <p className="big-date">{memory.date}</p>
          </div>
          <div className="flip-face flip-back">
            <div className="back-stamp">
              <span>GIFTKUY INSTANT FILM</span>
              <span>#{String(index + 1).padStart(2, '0')}</span>
            </div>
            <p className="back-note">{memory.backNote}</p>
            <p className="back-sign">— {sender}</p>
          </div>
        </div>
      </div>
      <div className="modal-controls">
        <button
          type="button"
          className="ghost-btn"
          onClick={handleToggleFlip}
        >
          Balik Foto
        </button>
        <button
          type="button"
          className="ghost-btn"
          onClick={onClose}
        >
          Taruh Kembali
        </button>
      </div>
    </div>
  );
}
