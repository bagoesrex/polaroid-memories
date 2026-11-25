interface LetterRewardProps {
  visible: boolean;
  recipient: string;
  onOpenLetter: () => void;
}

export function LetterReward({ visible, recipient, onOpenLetter }: LetterRewardProps) {
  return (
    <div className={`letter-reward-wrap ${visible ? 'visible' : ''}`}>
      <span className="reward-label">TERSELIP DI BALIK ROLL FILM</span>
      <button
        type="button"
        className="folded-envelope"
        onClick={onOpenLetter}
      >
        <span className="env-hand">untuk {recipient}</span>
        <span className="env-sub">Klik untuk membuka surat</span>
      </button>
    </div>
  );
}
