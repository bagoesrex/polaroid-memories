interface TopBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenEditor: () => void;
}

export function TopBar({ soundEnabled, onToggleSound, onOpenEditor }: TopBarProps) {
  return (
    <header className="top-bar">
      <button type="button" className="pill-btn" onClick={onOpenEditor}>
        <span>✎</span>
        <span>Edit Demo</span>
      </button>
      <button
        type="button"
        className={`pill-btn ${soundEnabled ? 'active' : ''}`}
        aria-pressed={soundEnabled}
        onClick={onToggleSound}
      >
        <span>♪</span>
        <span>{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
      </button>
    </header>
  );
}
