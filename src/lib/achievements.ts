// Catálogo de logros desbloqueables.
// El estado por usuario (desbloqueado + fecha) se guarda en Progress.achievements.
import { WORLDS } from "@/lib/content/worlds";
import type { Progress } from "@/lib/game-state";

export type Achievement = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  recompensa_coins: number;
  check: (p: Progress) => boolean;
};

export type UnlockedAchievement = { id: string; at: string };

function worldLevelsDone(p: Progress, worldId: string): boolean {
  const w = WORLDS.find((x) => x.id === worldId);
  if (!w || w.levels.length === 0) return false;
  return (p.completed[worldId] ?? -1) + 1 >= w.levels.length;
}
function worldFullyDone(p: Progress, worldId: string): boolean {
  return worldLevelsDone(p, worldId) && !!p.bossDefeated[worldId];
}
function bossesDefeated(p: Progress): number {
  return Object.values(p.bossDefeated).filter(Boolean).length;
}
function topStreak(p: Progress): number {
  return Math.max(p.bestStreak ?? 0, p.currentStreak ?? 0);
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "primer-paso",
    nombre: "Primer Paso",
    descripcion: "Completa tu primer ejercicio.",
    icono: "🏆",
    recompensa_coins: 10,
    check: (p) => p.totalCorrect >= 1,
  },
  {
    id: "aprendiz",
    nombre: "Aprendiz",
    descripcion: "Completa 10 ejercicios.",
    icono: "📘",
    recompensa_coins: 25,
    check: (p) => p.totalCorrect >= 10,
  },
  {
    id: "estudiante-aplicado",
    nombre: "Estudiante Aplicado",
    descripcion: "Completa 50 ejercicios.",
    icono: "📐",
    recompensa_coins: 75,
    check: (p) => p.totalCorrect >= 50,
  },
  {
    id: "maestro-matematico",
    nombre: "Maestro Matemático",
    descripcion: "Completa 100 ejercicios.",
    icono: "🎓",
    recompensa_coins: 150,
    check: (p) => p.totalCorrect >= 100,
  },
  {
    id: "conquistador-limites",
    nombre: "Conquistador de Límites",
    descripcion: "Completa todo el mundo de Límites (niveles y jefe).",
    icono: "∞",
    recompensa_coins: 200,
    check: (p) => worldFullyDone(p, "limites"),
  },
  {
    id: "maestro-derivadas",
    nombre: "Maestro de las Derivadas",
    descripcion: "Completa todo el mundo de Derivadas (niveles y jefe).",
    icono: "𝑑",
    recompensa_coins: 200,
    check: (p) => worldFullyDone(p, "derivadas"),
  },
  {
    id: "cazador-jefes",
    nombre: "Cazador de Jefes",
    descripcion: "Derrota a tu primer jefe.",
    icono: "⚔️",
    recompensa_coins: 50,
    check: (p) => bossesDefeated(p) >= 1,
  },
  {
    id: "invencible",
    nombre: "Invencible",
    descripcion: "Derrota a 10 jefes.",
    icono: "🛡️",
    recompensa_coins: 500,
    check: (p) => bossesDefeated(p) >= 10,
  },
  {
    id: "constancia-hierro",
    nombre: "Constancia de Hierro",
    descripcion: "Mantén una racha de 7 días.",
    icono: "🔥",
    recompensa_coins: 100,
    check: (p) => topStreak(p) >= 7,
  },
  {
    id: "disciplina-absoluta",
    nombre: "Disciplina Absoluta",
    descripcion: "Mantén una racha de 30 días.",
    icono: "🌋",
    recompensa_coins: 400,
    check: (p) => topStreak(p) >= 30,
  },
  {
    id: "leyenda-analynx",
    nombre: "Leyenda de Analynx",
    descripcion: "Mantén una racha de 100 días.",
    icono: "👑",
    recompensa_coins: 1000,
    check: (p) => topStreak(p) >= 100,
  },
  {
    id: "gran-maestro-analisis",
    nombre: "Gran Maestro del Análisis",
    descripcion: "Completa 1000 ejercicios.",
    icono: "🧠",
    recompensa_coins: 150,
    check: (p) => p.totalCorrect >= 1000,
  },
  {
    id: "bienvenido-analynx",
    nombre: "¡Bienvenido a Analynx!",
    descripcion: "Inicia sesión en la web de Analynx. ¡Gracias!",
    icono: "👋",
    recompensa_coins: 100,
    check: () => true,
  },
  {
    id: "pan-integral",
    nombre: "Pan Integral, Pan Comido",
    descripcion: "Completa todo el mundo de Integrales (niveles y jefe).",
    icono: "🥖",
    recompensa_coins: 300,
    check: (p) => worldFullyDone(p, "integrales"),
  },
  {
    id: "discipulo-cauchy",
    nombre: "Discípulo de Cauchy",
    descripcion: "Completa todos los niveles del Mundo de Límites.",
    icono: "📜",
    recompensa_coins: 150,
    check: (p) => worldLevelsDone(p, "limites"),
  },
];

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

// --- Emisor de eventos para el popup ---
type Listener = (a: Achievement) => void;
const listeners = new Set<Listener>();

export function onAchievementUnlocked(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
const emitted = new Set<string>();
export function emitAchievement(a: Achievement) {
  if (emitted.has(a.id)) return; // evita notificaciones duplicadas
  emitted.add(a.id);
  listeners.forEach((l) => l(a));
}

