interface AtmosphereProps {
  flashState: 'idle' | 'firing' | 'fading';
}

export function Atmosphere({ flashState }: AtmosphereProps) {
  const flashClass =
    flashState === 'firing'
      ? 'flash-overlay firing'
      : flashState === 'fading'
        ? 'flash-overlay fading'
        : 'flash-overlay';

  return (
    <>
      <div className="sunbeam" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className={flashClass} aria-hidden="true" />
    </>
  );
}
