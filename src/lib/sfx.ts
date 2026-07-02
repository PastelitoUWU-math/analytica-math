// Efectos de sonido sintetizados con WebAudio. Sin dependencias externas.
// Muy ligeros — solo tonos cortos con envolvente exponencial.

let ctx: AudioContext | null = null;
let muted = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    // preferencia guardada
    try {
      muted = localStorage.getItem("analytica.sfx.muted") === "1";
    } catch { /* ignore */ }
  }
  return ctx;
}

export function setMuted(v: boolean) {
  muted = v;
  try { localStorage.setItem("analytica.sfx.muted", v ? "1" : "0"); } catch { /* ignore */ }
}
export function isMuted() {
  if (typeof window === "undefined") return true;
  try { return localStorage.getItem("analytica.sfx.muted") === "1"; } catch { return false; }
}

type ToneOpts = { freq: number; dur?: number; type?: OscillatorType; gain?: number; slide?: number };
function tone({ freq, dur = 0.12, type = "sine", gain = 0.14, slide = 0 }: ToneOpts, delay = 0) {
  const c = ac(); if (!c || muted) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  click:   () => tone({ freq: 620, dur: 0.05, type: "triangle", gain: 0.08 }),
  hover:   () => tone({ freq: 880, dur: 0.03, type: "sine",     gain: 0.04 }),
  correct: () => { tone({ freq: 660, dur: 0.09, type: "triangle" }); tone({ freq: 990, dur: 0.14, type: "triangle" }, 0.09); },
  wrong:   () => tone({ freq: 240, dur: 0.22, type: "sawtooth", gain: 0.10, slide: -120 }),
  reveal:  () => { tone({ freq: 520, dur: 0.10 }); tone({ freq: 415, dur: 0.15 }, 0.1); },
  levelUp: () => {
    [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.15, type: "triangle", gain: 0.13 }, i * 0.09));
  },
  boss:    () => { tone({ freq: 180, dur: 0.35, type: "sawtooth", gain: 0.10, slide: -60 }); tone({ freq: 90, dur: 0.4, type: "sine", gain: 0.08 }, 0.1); },
};

// Delegación de clicks para reproducir el sonido de UI de forma global sin
// tocar cada botón. Se activa con [data-sfx].
export function installGlobalClickSfx() {
  if (typeof document === "undefined") return;
  const handler = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    const el = t.closest("[data-sfx],button,a,[role='button']") as HTMLElement | null;
    if (!el) return;
    const kind = el.getAttribute("data-sfx") || "click";
    (sfx as Record<string, () => void>)[kind]?.();
  };
  document.addEventListener("click", handler, true);
}
