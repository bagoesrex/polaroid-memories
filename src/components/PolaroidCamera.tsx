import type { Memory } from '../types';
import { EjectBay } from './EjectBay';

interface PolaroidCameraProps {
  stickyNote: string;
  remainingCount: number;
  currentShot: number;
  isBusy: boolean;
  isRecoil: boolean;
  isPressed: boolean;
  flashGlow: boolean;
  isEjecting: boolean;
  isDeveloped: boolean;
  ejectingMemory: Memory | null;
  onShutterClick: () => void;
  onEjectingCardClick: () => void;
}

export function PolaroidCamera({
  stickyNote,
  remainingCount,
  currentShot,
  isBusy,
  isRecoil,
  isPressed,
  flashGlow,
  isEjecting,
  isDeveloped,
  ejectingMemory,
  onShutterClick,
  onEjectingCardClick,
}: PolaroidCameraProps) {
  const isRollEmpty = remainingCount === 0;
  const ledClass = isRollEmpty
    ? 'ready-led empty'
    : isBusy
      ? 'ready-led charging'
      : 'ready-led';

  let hintText = '';
  if (isBusy) {
    hintText = `mencetak kenangan #${currentShot + 1}...`;
  } else if (isRollEmpty) {
    hintText =
      'semua foto tercetak — klik foto untuk membalik, atau buka surat di bawah';
  } else if (currentShot === 0) {
    hintText = 'tekan tombol merah untuk mencetak kenangan pertama...';
  } else {
    hintText = `tersisa ${remainingCount} foto lagi di roll ini — klik foto di bawah untuk membaliknya`;
  }

  return (
    <div className="camera-stage">
      <div className="camera-shadow" aria-hidden="true" />

      <div className={`polaroid-camera ${isRecoil ? 'recoil' : ''}`}>
        <div className="sticky-note">{stickyNote}</div>

        <div className="cam-top">
          <div className="rainbow-stripe" aria-hidden="true">
            <span className="rs-1" />
            <span className="rs-2" />
            <span className="rs-3" />
            <span className="rs-4" />
            <span className="rs-5" />
          </div>

          <div className="viewfinder" aria-hidden="true">
            <div className="viewfinder-glass" />
          </div>

          <div className="flash-unit" aria-hidden="true">
            <div className={`flash-lens ${flashGlow ? 'glow' : ''}`} />
          </div>

          <div className="status-cluster">
            <span className={ledClass} title="Status kamera" />
            <span className="film-counter">
              {String(remainingCount).padStart(2, '0')}
            </span>
          </div>

          <div className="exposure-dial" aria-hidden="true" />

          <div className="lens-outer" aria-hidden="true">
            <div className="lens-ring">
              <div className="lens-glass" />
            </div>
          </div>

          <div className="shutter-wrap">
            <span
              className={`shutter-pulse ${isRollEmpty || isBusy ? 'hidden' : ''}`}
            />
            <button
              type="button"
              className={`shutter-btn ${isPressed ? 'pressed' : ''}`}
              disabled={isRollEmpty || isBusy}
              onClick={onShutterClick}
              aria-label="Tekan tombol shutter untuk mencetak foto kenangan"
            />
          </div>

          <span className="cam-brand">GIFTKUY 600</span>
        </div>

        <div className="cam-base">
          <div className="film-slot-housing">
            <div className="film-slot-lip" />
          </div>
        </div>
      </div>

      <EjectBay
        isEjecting={isEjecting}
        isDeveloped={isDeveloped}
        memory={ejectingMemory}
        onCardClick={onEjectingCardClick}
      />

      <p className="camera-hint">{hintText}</p>
    </div>
  );
}
