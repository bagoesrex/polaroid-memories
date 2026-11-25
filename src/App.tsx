import { useState, useEffect, useRef, useCallback } from 'react';
import type { GiftConfig, Memory, ActiveModal } from './types';
import { DEFAULT_CONFIG, MEMORIES } from './data/memories';
import { playShutterAndMotorSfx, playPaperFlipSfx } from './audio/soundEffects';

import { Atmosphere } from './components/Atmosphere';
import { TopBar } from './components/TopBar';
import { HeroHeader } from './components/HeroHeader';
import { PolaroidCamera } from './components/PolaroidCamera';
import { PrintsGrid } from './components/PrintsGrid';
import { LetterReward } from './components/LetterReward';
import { PolaroidModal } from './components/PolaroidModal';
import { LetterModal } from './components/LetterModal';
import { EditorModal } from './components/EditorModal';
import { BrandFooter } from './components/BrandFooter';
import { Toast } from './components/Toast';

export default function App() {
  const [config, setConfig] = useState<GiftConfig>(DEFAULT_CONFIG);
  const [currentShot, setCurrentShot] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [printedMemories, setPrintedMemories] = useState<Memory[]>([]);

  // Mechanical and visual FX state
  const [cameraRecoil, setCameraRecoil] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [flashGlow, setFlashGlow] = useState<boolean>(false);
  const [flashState, setFlashState] = useState<'idle' | 'firing' | 'fading'>('idle');
  const [isEjecting, setIsEjecting] = useState<boolean>(false);
  const [isDeveloped, setIsDeveloped] = useState<boolean>(false);
  const [ejectingMemory, setEjectingMemory] = useState<Memory | null>(null);

  // Modal & Toast state
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedPrintIndex, setSelectedPrintIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  const totalShots = MEMORIES.length;
  const remainingCount = totalShots - currentShot;

  // Shutter action
  const handleShutter = useCallback(() => {
    if (isBusy || currentShot >= totalShots) return;

    setIsBusy(true);
    const shotIndex = currentShot;
    const mem = MEMORIES[shotIndex];

    playShutterAndMotorSfx(soundEnabled);

    // Recoil and flash trigger
    setCameraRecoil(true);
    setIsPressed(true);
    setFlashGlow(true);
    setFlashState('firing');

    // Eject card setup
    setEjectingMemory(mem);
    setIsEjecting(true);
    setIsDeveloped(false);

    // 90ms: Release recoil and flash fading
    window.setTimeout(() => {
      setFlashState('fading');
      setFlashGlow(false);
      setCameraRecoil(false);
      setIsPressed(false);
    }, 90);

    // 420ms: Start chemical developing
    window.setTimeout(() => {
      setIsDeveloped(true);
    }, 420);

    // 2550ms: Complete ejection and land on desk
    window.setTimeout(() => {
      setCurrentShot(shotIndex + 1);
      setPrintedMemories((prev) => [...prev, mem]);
      setIsEjecting(false);
      setIsBusy(false);

      if (shotIndex + 1 === totalShots) {
        showToast(`Roll selesai! Ada surat terlipat untuk ${config.recipient}.`);
      }
    }, 2550);
  }, [isBusy, currentShot, totalShots, soundEnabled, config.recipient, showToast]);

  // Open photo flip modal
  const handleSelectPrint = useCallback(
    (index: number) => {
      setSelectedPrintIndex(index);
      setActiveModal('polaroid');
      playPaperFlipSfx(soundEnabled);
    },
    [soundEnabled]
  );

  // Ejecting card preview
  const handleEjectingCardClick = useCallback(() => {
    if (!isBusy && currentShot > 0) {
      handleSelectPrint(currentShot - 1);
    }
  }, [isBusy, currentShot, handleSelectPrint]);

  // Open letter modal
  const handleOpenLetter = useCallback(() => {
    setActiveModal('letter');
    playPaperFlipSfx(soundEnabled);
  }, [soundEnabled]);

  // Reload roll
  const handleReloadRoll = useCallback(() => {
    if (isBusy) return;
    setCurrentShot(0);
    setPrintedMemories([]);
    setIsEjecting(false);
    setIsDeveloped(false);
    setEjectingMemory(null);
    playPaperFlipSfx(soundEnabled);
    showToast('Roll film baru siap dipakai.');
  }, [isBusy, soundEnabled, showToast]);

  // Toggle sound
  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        playPaperFlipSfx(true);
      }
      return next;
    });
  }, []);

  // Keyboard shortcut (Escape to close all modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save config from EditorModal
  const handleSaveConfig = useCallback(
    (newConfig: GiftConfig) => {
      setConfig(newConfig);
      setActiveModal(null);
      showToast('Tampilan demo berhasil diperbarui.');
    },
    [showToast]
  );

  return (
    <>
      <Atmosphere flashState={flashState} />

      <main className="stage">
        <TopBar
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenEditor={() => setActiveModal('editor')}
        />

        <HeroHeader recipient={config.recipient} totalCount={totalShots} />

        <section className="desk-center">
          <PolaroidCamera
            stickyNote={config.stickyNote}
            remainingCount={remainingCount}
            currentShot={currentShot}
            isBusy={isBusy}
            isRecoil={cameraRecoil}
            isPressed={isPressed}
            flashGlow={flashGlow}
            isEjecting={isEjecting}
            isDeveloped={isDeveloped}
            ejectingMemory={ejectingMemory}
            onShutterClick={handleShutter}
            onEjectingCardClick={handleEjectingCardClick}
          />

          <div className="prints-section">
            <PrintsGrid
              prints={printedMemories}
              onSelectPrint={handleSelectPrint}
            />

            <LetterReward
              visible={currentShot === totalShots}
              recipient={config.recipient}
              onOpenLetter={handleOpenLetter}
            />
          </div>

          <div className="bottom-actions">
            {currentShot === totalShots && (
              <button
                type="button"
                className="ghost-btn"
                onClick={handleReloadRoll}
              >
                Masukkan Roll Baru
              </button>
            )}
          </div>
        </section>
      </main>

      <BrandFooter onOpenEditor={() => setActiveModal('editor')} />

      <PolaroidModal
        key={selectedPrintIndex ?? -1}
        isOpen={activeModal === 'polaroid' && selectedPrintIndex !== null}
        memory={
          selectedPrintIndex !== null ? MEMORIES[selectedPrintIndex] : null
        }
        index={selectedPrintIndex ?? 0}
        sender={config.sender}
        onClose={() => setActiveModal(null)}
        onPlayFlipSound={() => playPaperFlipSfx(soundEnabled)}
      />

      <LetterModal
        isOpen={activeModal === 'letter'}
        config={config}
        onClose={() => setActiveModal(null)}
      />

      <EditorModal
        key={activeModal === 'editor' ? 'editor-open' : 'editor-closed'}
        isOpen={activeModal === 'editor'}
        config={config}
        onSave={handleSaveConfig}
        onClose={() => setActiveModal(null)}
      />

      <Toast message={toastMessage} />
    </>
  );
}
