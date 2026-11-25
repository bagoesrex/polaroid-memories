import type { MouseEvent } from 'react';
import type { GiftConfig } from '../types';

interface LetterModalProps {
  isOpen: boolean;
  config: GiftConfig;
  onClose: () => void;
}

export function LetterModal({ isOpen, config, onClose }: LetterModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Surat personal"
      onClick={handleBackdropClick}
    >
      <article className="letter-sheet">
        <p className="letter-date">JAKARTA · {config.letterDate}</p>
        <h3 className="letter-salutation">Untuk {config.recipient},</h3>
        <p className="letter-body">{config.letterBody}</p>
        <p className="letter-sign">selalu untukmu, {config.sender}</p>
      </article>
      <div className="modal-controls">
        <button
          type="button"
          className="ghost-btn"
          onClick={onClose}
        >
          Lipat Kembali
        </button>
      </div>
    </div>
  );
}
