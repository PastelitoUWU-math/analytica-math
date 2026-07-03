// Local game state: progress, points (actuales y de por vida), purchases.
// Los puntos "de por vida" (lifetimePoints) SOLO suben — nunca bajan aunque
// el jugador gaste puntos en la tienda. La clasificación usa ese valor.
import { useEffect, useState, useSyncExternalStore } from "react";
import { syncProgressToProfile } from "./auth";

export type Progress = {
  completed: Record<string, number>;
  bossDefeated: Record<string, boolean>;
  points: number;           // saldo actual (se puede gastar)
  lifetimePoints: number;   // acumulado histórico (jamás baja)
  totalCorrect: number;
  playerName: string;
  ownedCosmetics: string[];
  activeTheme: string;
  boosts: { hint: number; skip: number };
};

const KEY = "analytica.progress.v1";

const DEFAULT: Progress = {
  completed: {},
  bossDefeated: {},
  points: 0,
  lifetimePoints: 0,
  totalCorrect: 0,
  playerName: "",
  ownedCosmetics: ["theme-pergamino"],
  activeTheme: "theme-pergamino",
  boosts: { hint: 0, skip: 0 },
};

let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
    // Migración: si no había lifetimePoints, arranca desde points actuales
    if (parsed.lifetimePoints < parsed.points) parsed.lifetimePoints = parsed.points;
    cache = parsed;
  } catch {
    cache = DEFAULT;
  }
  return cache!;
}
function write(p: Progress) {
  const prev = cache;
  cache = p;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(p));
  listeners.forEach((l) => l());
  if (typeof window !== "undefined" && prev && (
    prev.points !== p.points ||
    prev.totalCorrect !== p.totalCorrect ||
    prev.lifetimePoints !== p.lifetimePoints
  )) {
    syncProgressToProfile(p.points, p.totalCorrect, p.lifetimePoints).catch(() => {});
  }
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => read(),
    () => DEFAULT,
  );
}

function earn(p: Progress, n: number): Progress {
  return {
    ...p,
    points: p.points + n,
    lifetimePoints: p.lifetimePoints + n,
  };
}

export function setPlayerName(name: string) {
  write({ ...read(), playerName: name });
}
export function addPoints(n: number) {
  const p = read();
  write({ ...earn(p, n), totalCorrect: p.totalCorrect + 1 });
}
export function completeLevel(worldId: string, levelIdx: number, earned: number) {
  const p = read();
  const prev = p.completed[worldId] ?? -1;
  write({
    ...earn(p, earned),
    completed: { ...p.completed, [worldId]: Math.max(prev, levelIdx) },
  });
}
export function defeatBoss(worldId: string, earned: number) {
  const p = read();
  write({
    ...earn(p, earned),
    bossDefeated: { ...p.bossDefeated, [worldId]: true },
  });
}
export function buyCosmetic(id: string, cost: number): boolean {
  const p = read();
  if (p.points < cost || p.ownedCosmetics.includes(id)) return false;
  // gastamos puntos actuales — lifetimePoints NO cambia
  write({ ...p, points: p.points - cost, ownedCosmetics: [...p.ownedCosmetics, id] });
  return true;
}
export function setTheme(id: string) {
  const p = read();
  if (!p.ownedCosmetics.includes(id)) return;
  write({ ...p, activeTheme: id });
}
export function buyBoost(kind: "hint" | "skip", cost: number, qty = 1): boolean {
  const p = read();
  if (p.points < cost) return false;
  write({ ...p, points: p.points - cost, boosts: { ...p.boosts, [kind]: p.boosts[kind] + qty } });
  return true;
}
export function useBoost(kind: "hint" | "skip"): boolean {
  const p = read();
  if (p.boosts[kind] <= 0) return false;
  write({ ...p, boosts: { ...p.boosts, [kind]: p.boosts[kind] - 1 } });
  return true;
}

export function useClient<T>(getter: () => T, fallback: T): T {
  const [v, setV] = useState<T>(fallback);
  useEffect(() => setV(getter()), []);
  return v;
}
