// Efectos de sonido sintetizados con WebAudio — variados, sin dependencias.
// Los sonidos están siempre activados (no hay opción para silenciar).

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

type ToneOpts = {
  freq: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
  slideTo?: number;      // frecuencia destino (exponencial)
  attack?: number;
};
function tone(o: ToneOpts, delay = 0) {
  const c = ac(); if (!c) return;
  const t0 = c.currentTime + delay;
  const { freq, dur = 0.14, type = "sine", gain = 0.14, slideTo, attack = 0.008 } = o;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo && slideTo > 0) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

// Ruido corto (para "swoosh"/"pop")
function noise(dur = 0.12, gain = 0.08, hp = 800, delay = 0) {
  const c = ac(); if (!c) return;
  const t0 = c.currentTime + delay;
  const frames = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, frames, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const src = c.createBufferSource(); src.buffer = buf;
  const filter = c.createBiquadFilter(); filter.type = "highpass"; filter.frequency.value = hp;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter).connect(g).connect(c.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

// Variantes con rotación aleatoria para que no suene monótono
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export const sfx = {
  click: () => {
    const f = pick([560, 620, 680, 720, 780]);
    tone({ freq: f, dur: 0.05, type: "triangle", gain: 0.07 });
  },
  hover: () => tone({ freq: pick([880, 990, 1040]), dur: 0.03, type: "sine", gain: 0.03 }),
  correct: () => {
    // Arpegio mayor con variación de tónica
    const roots = [ [523.25, 659.25, 783.99, 1046.5], // C
                    [587.33, 739.99, 880.00, 1174.7], // D
                    [493.88, 622.25, 739.99, 987.77] ]; // B
    const scale = pick(roots);
    scale.forEach((f, i) => tone({ freq: f, dur: 0.13, type: i < 2 ? "triangle" : "sine", gain: 0.12 }, i * 0.06));
    noise(0.05, 0.04, 3000, 0);
  },
  wrong: () => {
    // Descenso disonante con "thump" grave
    tone({ freq: 330, dur: 0.10, type: "square", gain: 0.09, slideTo: 220 });
    tone({ freq: 155, dur: 0.22, type: "sawtooth", gain: 0.09, slideTo: 90 }, 0.05);
    noise(0.10, 0.05, 300, 0.04);
  },
  reveal: () => {
    // Suspensión → resolución
    [415, 466, 523].forEach((f, i) => tone({ freq: f, dur: 0.16, type: "sine", gain: 0.11 }, i * 0.09));
  },
  levelUp: () => {
    // Fanfarria alegre variable
    const start = pick([392, 440, 523]);
    const seq = [1, 1.25, 1.5, 2].map((r) => start * r);
    seq.forEach((f, i) => tone({ freq: f, dur: 0.15, type: "triangle", gain: 0.13 }, i * 0.08));
    tone({ freq: seq[3] * 2, dur: 0.35, type: "sine", gain: 0.10 }, 0.32);
    noise(0.12, 0.05, 4000, 0);
  },
  boss: () => {
    // Golpe cinemático
    tone({ freq: 160, dur: 0.45, type: "sawtooth", gain: 0.11, slideTo: 55 });
    tone({ freq: 80,  dur: 0.55, type: "sine",     gain: 0.09, slideTo: 40 }, 0.08);
    noise(0.35, 0.06, 200, 0);
    tone({ freq: 880, dur: 0.10, type: "square", gain: 0.07 }, 0.18);
  },
  purchase: () => {
    tone({ freq: 660, dur: 0.08, type: "triangle", gain: 0.10 });
    tone({ freq: 990, dur: 0.10, type: "sine",     gain: 0.10 }, 0.06);
    tone({ freq: 1320,dur: 0.16, type: "sine",     gain: 0.08 }, 0.12);
    noise(0.05, 0.04, 4000, 0.02);
  },
  swoosh: () => noise(0.18, 0.07, 600),
};

// Delegación global de clicks para producir el sonido de UI sin cablear cada botón.
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
