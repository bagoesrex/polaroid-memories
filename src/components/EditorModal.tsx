import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import type { GiftConfig } from '../types';

interface EditorModalProps {
  isOpen: boolean;
  config: GiftConfig;
  onSave: (newConfig: GiftConfig) => void;
  onClose: () => void;
}

export function EditorModal({
  isOpen,
  config,
  onSave,
  onClose,
}: EditorModalProps) {
  const [recipient, setRecipient] = useState(config.recipient);
  const [sender, setSender] = useState(config.sender);
  const [stickyNote, setStickyNote] = useState(config.stickyNote);
  const [letterBody, setLetterBody] = useState(config.letterBody);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      ...config,
      recipient: recipient.trim() || config.recipient,
      sender: sender.trim() || config.sender,
      stickyNote: stickyNote.trim() || config.stickyNote,
      letterBody: letterBody.trim() || config.letterBody,
    });
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Kustomisasi demo GiftKuy"
      onClick={handleBackdropClick}
    >
      <form className="editor-card" onSubmit={handleSubmit}>
        <p className="editor-title">Kustomisasi Demo GiftKuy.id</p>
        <p className="editor-sub">
          Ubah nama penerima, pengirim, dan isi surat untuk melihat bagaimana pengguna
          mengkustomisasi hadiah ini.
        </p>

        <div className="field">
          <label htmlFor="inputRecipient">Nama Penerima</label>
          <input
            id="inputRecipient"
            type="text"
            maxLength={32}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="inputSender">Nama Pengirim</label>
          <input
            id="inputSender"
            type="text"
            maxLength={32}
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="inputSticky">Teks Sticky Note di Kamera</label>
          <input
            id="inputSticky"
            type="text"
            maxLength={40}
            value={stickyNote}
            onChange={(e) => setStickyNote(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="inputLetter">Isi Surat Rahasia</label>
          <textarea
            id="inputLetter"
            value={letterBody}
            onChange={(e) => setLetterBody(e.target.value)}
            required
          />
        </div>

        <div className="editor-actions">
          <button
            type="button"
            className="ghost-btn"
            onClick={onClose}
          >
            Batal
          </button>
          <button type="submit" className="primary-btn">
            Terapkan
          </button>
        </div>
      </form>
    </div>
  );
}
