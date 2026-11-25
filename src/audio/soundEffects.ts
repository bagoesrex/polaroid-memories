// Web Audio API procedural sound effects for Polaroid camera

let audioCtx: AudioContext | null = null;

function ensureAudio(soundEnabled: boolean): AudioContext | null {
  if (!soundEnabled) return null;
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playShutterAndMotorSfx(soundEnabled: boolean): void {
  const ctx = ensureAudio(soundEnabled);
  if (!ctx) return;
  const now = ctx.currentTime;

  // 1. Crisp mechanical shutter click (short filtered noise burst)
  const clickBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.045), ctx.sampleRate);
  const clickData = clickBuf.getChannelData(0);
  for (let i = 0; i < clickData.length; i++) {
    clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
  }
  const clickSrc = ctx.createBufferSource();
  clickSrc.buffer = clickBuf;
  const clickFilter = ctx.createBiquadFilter();
  clickFilter.type = 'bandpass';
  clickFilter.frequency.value = 1800;
  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.45, now);
  clickSrc.connect(clickFilter).connect(clickGain).connect(ctx.destination);
  clickSrc.start(now);

  // 2. Polaroid motor whirring sound (ejection)
  const motorOsc = ctx.createOscillator();
  const motorGain = ctx.createGain();
  const motorFilter = ctx.createBiquadFilter();
  motorOsc.type = 'sawtooth';
  motorOsc.frequency.setValueAtTime(112, now + 0.09);
  motorOsc.frequency.linearRampToValueAtTime(128, now + 0.55);
  motorOsc.frequency.linearRampToValueAtTime(98, now + 0.92);
  motorFilter.type = 'lowpass';
  motorFilter.frequency.value = 420;
  motorGain.gain.setValueAtTime(0.0001, now + 0.09);
  motorGain.gain.linearRampToValueAtTime(0.08, now + 0.16);
  motorGain.gain.setValueAtTime(0.075, now + 0.78);
  motorGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
  motorOsc.connect(motorFilter).connect(motorGain).connect(ctx.destination);
  motorOsc.start(now + 0.09);
  motorOsc.stop(now + 0.96);
}

export function playPaperFlipSfx(soundEnabled: boolean): void {
  const ctx = ensureAudio(soundEnabled);
  if (!ctx) return;
  const now = ctx.currentTime;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.11), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const env = Math.sin((i / data.length) * Math.PI);
    data[i] = (Math.random() * 2 - 1) * env * 0.22;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1400;
  src.connect(filter).connect(ctx.destination);
  src.start(now);
}
