/**
 * Robotic UI sound engine — every sound is synthesized with the Web Audio API,
 * so there are no audio files to download.
 *
 * Browsers only allow audio after a user gesture, so nothing plays until
 * `unlock()` runs inside a click/keypress. The mute choice is remembered.
 */

type Listener = (on: boolean) => void;

const KEY = 'akash-sound';

/** Spoken on the visitor's first interaction. */
export const WELCOME_LINE = "Welcome to my world. I'm Akash Gawali.";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private listeners = new Set<Listener>();
  private last: Record<string, number> = {};
  enabled = true;

  constructor() {
    try {
      this.enabled = localStorage.getItem(KEY) !== 'off';
    } catch {
      /* storage unavailable — default to on */
    }
  }

  get unlocked() {
    return !!this.ctx && this.ctx.state === 'running';
  }

  /** Audio was unlocked by a click (it may still be finishing its resume). */
  get primed() {
    return !!this.ctx && this.ctx.state !== 'closed';
  }

  /** Call from inside a user gesture. Safe to call repeatedly. */
  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.9;
        const comp = this.ctx.createDynamicsCompressor();
        this.master.connect(comp).connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      /* audio unavailable */
    }
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    if (!on) window.speechSynthesis?.cancel();
    else this.unlock();
    this.listeners.forEach((l) => l(on));
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  private ready(name: string, gap: number) {
    if (!this.enabled || !this.ctx || !this.master || this.ctx.state !== 'running') return false;
    const now = performance.now();
    if (now - (this.last[name] ?? 0) < gap) return false;
    this.last[name] = now;
    return true;
  }

  private tone(freq: number, end: number, start: number, dur: number, type: OscillatorType, vol: number, filter = 4000) {
    const c = this.ctx!;
    const t = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = filter;
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(this.master!);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private noise(start: number, dur: number, vol: number, from: number, to: number) {
    const c = this.ctx!;
    const t = c.currentTime + start;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = 1.2;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(this.master!);
    src.start(t);
  }

  /** Two quick robotic chirps — played when a heading reveals. */
  reveal() {
    if (!this.ready('reveal', 220)) return;
    this.tone(880, 1320, 0, 0.07, 'square', 0.09, 3000);
    this.tone(1320, 1760, 0.08, 0.06, 'square', 0.07, 3000);
  }

  /** Soft data ticks — used by the decoding kicker text. */
  tick() {
    if (!this.ready('tick', 45)) return;
    this.tone(2200 + Math.random() * 900, 1800, 0, 0.025, 'triangle', 0.05, 5000);
  }

  /** Tiny confirmation beep for hovers on interactive robots. */
  beep() {
    if (!this.ready('beep', 160)) return;
    this.tone(660, 990, 0, 0.09, 'sine', 0.08);
    this.tone(990, 760, 0.1, 0.12, 'sine', 0.06);
  }

  /** Particles streaming in to form the portrait. */
  scan() {
    if (!this.ready('scan', 1500)) return;
    this.noise(0, 1.6, 0.05, 300, 5000);
    this.tone(120, 480, 0, 1.6, 'sawtooth', 0.025, 900);
    this.tone(1600, 2400, 1.55, 0.09, 'square', 0.04, 3000);
  }

  /** System boot-up — the landing "power on" moment. */
  boot() {
    if (!this.ready('boot', 2000)) return;
    this.noise(0, 1.1, 0.07, 200, 3500);
    this.tone(55, 220, 0, 1.2, 'sawtooth', 0.05, 700);
    [0, 0.14, 0.28].forEach((s, i) => this.tone(700 + i * 260, 900 + i * 260, 0.9 + s, 0.07, 'square', 0.045, 2800));
    this.tone(1760, 1760, 1.45, 0.28, 'sine', 0.05);
  }


  // ------------------------------------------------------------------ landing-page text effects

  /** Short digital "data burst" — the dots streaming in from everywhere. */
  stream(dur = 1.4) {
    if (!this.ready('stream', 800)) return;
    const n = Math.round(dur * 34);
    for (let i = 0; i < n; i++) {
      const t = (i / n) * dur + Math.random() * 0.02;
      const f = 1400 + Math.random() * 2600 + (i / n) * 1200;
      this.tone(f, f * (0.7 + Math.random() * 0.5), t, 0.018 + Math.random() * 0.02, i % 3 ? 'square' : 'triangle', 0.05 + (i / n) * 0.05, 6000);
    }
    this.noise(0, dur, 0.06, 600, 7000);
    this.tone(90, 260, 0, dur, 'sawtooth', 0.05, 900);
  }

  /** The name locks into place — sub thump + digital chord + bright ping with an echo. */
  lock() {
    if (!this.ready('lock', 800)) return;
    this.tone(120, 42, 0, 0.45, 'sine', 0.42);
    this.noise(0, 0.22, 0.16, 5000, 900);
    [523.25, 783.99, 1046.5].forEach((f) => this.tone(f, f, 0.02, 0.5, 'square', 0.05, 2400));
    [0, 0.16, 0.32].forEach((d, i) => this.tone(2093, 2093, 0.04 + d, 0.18, 'sine', 0.16 / (i + 1)));
  }

  /** One line of text sliding out — a rising digital chirp with a soft swish. Pitch rises line by line. */
  line(i = 0) {
    if (!this.ready(`line${i}`, 120)) return;
    const base = 700 + i * 130;
    this.tone(base, base * 1.9, 0, 0.08, 'square', 0.085, 3800);
    this.tone(base * 2, base * 2.6, 0.06, 0.06, 'square', 0.05, 4200);
    this.noise(0, 0.16, 0.05, 1200, 6500);
  }

  /** Little confirmation blip for the info cards. */
  chip() {
    if (!this.ready('chip', 90)) return;
    this.tone(1320, 1760, 0, 0.06, 'triangle', 0.09);
    this.tone(1760, 2200, 0.07, 0.07, 'triangle', 0.07);
  }

  /** Robotic voice line via the browser's built-in speech synthesis. */
  speak(text: string) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const say = () => {
      const u = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      const pick =
        voices.find((v) => /Google UK English Male|Microsoft (Guy|David|Ryan)|Daniel/i.test(v.name)) ??
        voices.find((v) => /^en(-|_)(GB|US|IN)/i.test(v.lang)) ??
        voices.find((v) => v.lang?.startsWith('en'));
      if (pick) u.voice = pick;
      u.pitch = 0.55; // lower, more synthetic
      u.rate = 0.92;
      u.volume = 1;
      synth.cancel();
      synth.speak(u);
    };
    if (synth.getVoices().length) say();
    else synth.addEventListener('voiceschanged', say, { once: true });
  }
}

export const sound = new SoundEngine();

const GREETED = 'akash-greeted';

/** Fired on the first click / tap / key press, after audio is unlocked. */
export const FIRST_INTERACTION = 'akash:first-interaction';

/**
 * Browsers block all audio until the visitor interacts with the page — no website can
 * play sound on load. On the first click, tap or key press we unlock audio and announce it;
 * the landing page then replays its intro with sound (if the visitor is still on it),
 * otherwise the welcome line plays on its own. Once per browser session.
 */
if (typeof window !== 'undefined') {
  const first = (evt: Event) => {
    window.removeEventListener('pointerdown', first, true);
    window.removeEventListener('keydown', first, true);
    sound.unlock();
    let greeted = false;
    try {
      greeted = sessionStorage.getItem(GREETED) === '1';
      sessionStorage.setItem(GREETED, '1');
    } catch {
      /* storage unavailable — greet anyway */
    }
    const ev = new CustomEvent(FIRST_INTERACTION, { detail: { greeted, target: evt.target }, cancelable: true });
    const handled = !window.dispatchEvent(ev); // a listener called preventDefault() = it will handle the greeting
    if (greeted || handled || !sound.enabled) return;
    window.setTimeout(() => sound.boot(), 60);
    window.setTimeout(() => sound.speak(WELCOME_LINE), 700);
  };
  window.addEventListener('pointerdown', first, { capture: true });
  window.addEventListener('keydown', first, { capture: true });
}
