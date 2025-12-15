
// Simple synthesizer for UI sound effects without external assets
let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, delay = 0, volume = 0.1) => {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
};

export const playSound = (type: 'hover' | 'click' | 'message' | 'success' | 'complete') => {
  try {
    switch (type) {
      case 'hover':
        // Very subtle high tick
        playTone(800, 'sine', 0.05, 0, 0.02);
        break;
      case 'click':
        // Soft sci-fi blip
        playTone(400, 'sine', 0.1, 0, 0.1);
        playTone(600, 'sine', 0.1, 0.05, 0.05);
        break;
      case 'message':
        // Typing bubble sound
        playTone(300, 'triangle', 0.1, 0, 0.05);
        break;
      case 'success':
        // Nice chord
        playTone(440, 'sine', 0.4, 0, 0.1); // A4
        playTone(554, 'sine', 0.4, 0.1, 0.1); // C#5
        playTone(659, 'sine', 0.6, 0.2, 0.1); // E5
        break;
      case 'complete':
        // Victory fanfare
        playTone(523.25, 'square', 0.2, 0, 0.1); // C5
        playTone(523.25, 'square', 0.2, 0.1, 0.1); 
        playTone(523.25, 'square', 0.2, 0.2, 0.1); 
        playTone(659.25, 'square', 0.6, 0.3, 0.2); // E5
        playTone(587.33, 'square', 0.6, 0.3, 0.1); // D5 (harmony)
        break;
    }
  } catch (e) {
    // Audio context issues are non-critical
    console.warn("Audio play failed", e);
  }
};
