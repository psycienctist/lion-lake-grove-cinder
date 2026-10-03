let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(v: boolean) {
  muted = v;
}

function ac() {
  if (muted || typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  ac();
}

function beep(freq: number, dur: number, type: OscillatorType, gain = 0.05) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur);
}

export const sfx = {
  hit: () => beep(180 + Math.random() * 40, 0.08, "square", 0.04),
  heavy: () => {
    beep(90, 0.14, "sawtooth", 0.06);
    beep(220, 0.08, "square", 0.03);
  },
  special: () => {
    beep(420, 0.18, "triangle", 0.05);
    beep(180, 0.22, "sawtooth", 0.04);
  },
  tag: () => beep(520, 0.1, "square", 0.035),
  ko: () => beep(70, 0.35, "sawtooth", 0.07),
  ui: () => beep(640, 0.05, "triangle", 0.03),
  win: () => {
    beep(440, 0.12, "triangle", 0.04);
    setTimeout(() => beep(660, 0.16, "triangle", 0.04), 90);
  },
};
