import type { SynthToneOptions } from './types';

/**
 * WEB AUDIO SYNTHESIZER
 * Zero external audio files required — generates dynamic futuristic UI tones.
 */
export class SoundSynthesizer {
  private audioCtx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext(): void {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    } catch {
      this.enabled = false;
    }
  }

  public playTone(options: SynthToneOptions = {}): void {
    const { freq = 440, type = 'sine', duration = 0.08, gainVal = 0.08 } = options;

    if (!this.enabled || !this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, freq * 0.5),
        this.audioCtx.currentTime + duration
      );

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio playback quiet fallback
    }
  }

  public playClick(): void {
    this.playTone({ freq: 880, type: 'triangle', duration: 0.05, gainVal: 0.05 });
  }

  public playWhoosh(): void {
    this.playTone({ freq: 220, type: 'sine', duration: 0.15, gainVal: 0.07 });
  }

  public playSuccess(): void {
    if (!this.enabled || !this.audioCtx) return;
    this.playTone({ freq: 523.25, type: 'sine', duration: 0.1, gainVal: 0.06 });
    setTimeout(() => this.playTone({ freq: 659.25, type: 'sine', duration: 0.1, gainVal: 0.06 }), 80);
    setTimeout(() => this.playTone({ freq: 783.99, type: 'sine', duration: 0.18, gainVal: 0.08 }), 160);
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playSuccess();
    }
    return this.enabled;
  }
}
