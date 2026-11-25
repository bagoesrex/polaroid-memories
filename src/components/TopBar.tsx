import { memo } from 'react';

interface TopBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenEditor?: () => void;
}

export const TopBar = memo(function TopBar({ soundEnabled, onToggleSound, onOpenEditor }: TopBarProps) {
  return (
    <header className="top-bar">
      {onOpenEditor && (
        <button type="button" className="pill-btn" onClick={onOpenEditor}>
          <span aria-hidden="true">✎</span>
          <span>Edit Demo</span>
        </button>
      )}
      <button
        type="button"
        className={`pill-btn ${soundEnabled ? 'active' : ''}`}
        style={{ marginLeft: 'auto' }}
        aria-pressed={soundEnabled}
        onClick={onToggleSound}
      >
        <span aria-hidden="true">♪</span>
        <span>{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
      </button>
    </header>
  );
});
