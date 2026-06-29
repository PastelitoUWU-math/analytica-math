// Local game state: progress, points, purchases. Stored in localStorage.
import { useEffect, useState, useSyncExternalStore } from "react";

export type Progress = {
  // worldId -> highest level index completed (0-based, -1 = none)
  completed: Record<string, number>;
  bossDefeated: Record<string, boolean>;
  points: number;
  totalCorrect: number;
  playerName: string;
  ownedCosmetics: string[];
  activeTheme: string; // cosmetic id of active theme
  boosts: { hint: number; skip: number };
};

const KEY = "analytica.progress.v1";
const RANK_KEY = "analytica.ranking.v1";

const DEFAULT: Progress = {
  completed: {},
  bossDefeated: {},
  points: 0,
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
    cache = raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    cache = DEFAULT;
  }
  return cache!;
}
function write(p: Progress) {
  cache = p;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(p));
  listeners.forEach((l) => l());
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => read(),
    () => DEFAULT,
  );
}

export function setPlayerName(name: string) {
  write({ ...read(), playerName: name });
}
export function addPoints(n: number) {
  const p = read();
  write({ ...p, points: p.points + n, totalCorrect: p.totalCorrect + 1 });
}
export function completeLevel(worldId: string, levelIdx: number, earned: number) {
  const p = read();
  const prev = p.completed[worldId] ?? -1;
  write({
    ...p,
    completed: { ...p.completed, [worldId]: Math.max(prev, levelIdx) },
    points: p.points + earned,
  });
  pushRanking();
}
export function defeatBoss(worldId: string, earned: number) {
  const p = read();
  write({ ...p, bossDefeated: { ...p.bossDefeated, [worldId]: true }, points: p.points + earned });
  pushRanking();
}
export function buyCosmetic(id: string, cost: number): boolean {
  const p = read();
  if (p.points < cost || p.ownedCosmetics.includes(id)) return false;
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

// Ranking: local-only board, includes player + a few seeded competitors.
export type RankEntry = { name: string; points: number; updatedAt: number };
function pushRanking() {
  if (typeof window === "undefined") return;
  const p = read();
  const name = p.playerName || "Anónimo";
  try {
    const raw = localStorage.getItem(RANK_KEY);
    const seed: RankEntry[] = raw
      ? JSON.parse(raw)
      : [
          { name: "Hipatia", points: 480, updatedAt: Date.now() },
          { name: "Ramanujan", points: 920, updatedAt: Date.now() },
          { name: "Sofía K.", points: 310, updatedAt: Date.now() },
          { name: "Gauss Jr.", points: 1450, updatedAt: Date.now() },
          { name: "Noether", points: 760, updatedAt: Date.now() },
        ];
    const others = seed.filter((e) => e.name !== name);
    const next = [...others, { name, points: p.points, updatedAt: Date.now() }]
      .sort((a, b) => b.points - a.points)
      .slice(0, 50);
    localStorage.setItem(RANK_KEY, JSON.stringify(next));
  } catch {}
}
export function readRanking(): RankEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RANK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useClient<T>(getter: () => T, fallback: T): T {
  const [v, setV] = useState<T>(fallback);
  useEffect(() => setV(getter()), []);
  return v;
}
