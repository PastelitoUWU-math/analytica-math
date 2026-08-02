// Local game state: progress, points (actuales y de por vida), purchases.
// Los puntos "de por vida" (lifetimePoints) SOLO suben — nunca bajan aunque
// el jugador gaste puntos en la tienda. La clasificación usa ese valor.
import { useEffect, useState, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

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
  currentStreak: number;
  bestStreak: number;
  lastActivityDate: string | null; // YYYY-MM-DD (local)
};

const GUEST_KEY = "analytica.progress.guest.v2";
const LEGACY_KEY = "analytica.progress.v1";

export const STREAK_RECOVERY_COST = 1000;

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
  currentStreak: 0,
  bestStreak: 0,
  lastActivityDate: null,
};

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function todayKey(): string {
  return dayKey(new Date());
}
export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

/** Racha visible: 0 si han pasado más de 24 h (más de un día natural) sin actividad. */
export function effectiveStreak(p: Progress): number {
  if (!p.lastActivityDate) return 0;
  if (p.lastActivityDate === todayKey() || p.lastActivityDate === yesterdayKey()) return p.currentStreak;
  return 0;
}

/** ¿Se ha perdido una racha que se puede recuperar pagando puntos? */
export function streakLost(p: Progress): boolean {
  return !!p.lastActivityDate && p.currentStreak > 0 && effectiveStreak(p) === 0;
}


let cache: Progress | null = null;
let activeUserId: string | null = null;
let saveTimer: ReturnType<typeof setTimeout> | null = null;
const hydrationByUser = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();

function normalize(value: Partial<Progress> | null | undefined): Progress {
  return {
    ...DEFAULT,
    ...value,
    completed: value?.completed ?? {},
    bossDefeated: value?.bossDefeated ?? {},
    ownedCosmetics: value?.ownedCosmetics ?? DEFAULT.ownedCosmetics,
    boosts: { ...DEFAULT.boosts, ...(value?.boosts ?? {}) },
  };
}

function read(): Progress {
  if (cache) return cache;
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(GUEST_KEY) ?? localStorage.getItem(LEGACY_KEY);
    const parsed = normalize(raw ? JSON.parse(raw) : DEFAULT);
    // Migración: si no había lifetimePoints, arranca desde points actuales
    if (parsed.lifetimePoints < parsed.points) parsed.lifetimePoints = parsed.points;
    cache = parsed;
  } catch {
    cache = DEFAULT;
  }
  return cache ?? DEFAULT;
}
function write(p: Progress) {
  const prev = cache;
  cache = p;
  if (typeof window !== "undefined" && !activeUserId) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(p));
    localStorage.removeItem(LEGACY_KEY);
  }
  listeners.forEach((l) => l());
  if (typeof window !== "undefined" && activeUserId && prev !== p) {
    scheduleCloudSave(activeUserId, p);
  }
}

function scheduleCloudSave(userId: string, progress: Progress) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    if (activeUserId === userId) void saveCloudProgress(userId, progress);
  }, 250);
}

async function saveCloudProgress(userId: string, progress: Progress) {
  const { error } = await supabase.from("user_progress").upsert({
    user_id: userId,
    completed: progress.completed as Json,
    boss_defeated: progress.bossDefeated as Json,
    points: progress.points,
    lifetime_points: progress.lifetimePoints,
    total_correct: progress.totalCorrect,
    owned_cosmetics: progress.ownedCosmetics as Json,
    active_theme: progress.activeTheme,
    boosts: progress.boosts as Json,
  });
  if (!error) {
    await supabase.rpc("sync_progress", {
      _points: progress.points,
      _total_correct: progress.totalCorrect,
      _lifetime: progress.lifetimePoints,
    });
  }
}

function fromCloud(row: {
  completed: Json;
  boss_defeated: Json;
  points: number;
  lifetime_points: number;
  total_correct: number;
  owned_cosmetics: Json;
  active_theme: string;
  boosts: Json;
}): Progress {
  return normalize({
    completed: row.completed as Record<string, number>,
    bossDefeated: row.boss_defeated as Record<string, boolean>,
    points: row.points,
    lifetimePoints: row.lifetime_points,
    totalCorrect: row.total_correct,
    ownedCosmetics: row.owned_cosmetics as string[],
    activeTheme: row.active_theme,
    boosts: row.boosts as Progress["boosts"],
  });
}

export async function activateAccountProgress(userId: string, importGuestProgress = false) {
  const existing = hydrationByUser.get(userId);
  if (existing) return existing;
  const task = (async () => {
    const guest = read();
    activeUserId = userId;
    const { data } = await supabase.from("user_progress").select("*").eq("user_id", userId).maybeSingle();
    let next = data ? fromCloud(data) : DEFAULT;
    const cloudIsPristine = !data || (
      data.points === 0 &&
      data.lifetime_points === 0 &&
      data.total_correct === 0 &&
      Object.keys(data.completed as Record<string, number>).length === 0 &&
      Object.keys(data.boss_defeated as Record<string, boolean>).length === 0
    );
    if (importGuestProgress && cloudIsPristine) next = normalize(guest);
    cache = next;
    listeners.forEach((listener) => listener());
    if (!data || (importGuestProgress && cloudIsPristine)) await saveCloudProgress(userId, next);
  })().finally(() => hydrationByUser.delete(userId));
  hydrationByUser.set(userId, task);
  return task;
}

export async function flushAccountProgress() {
  if (!activeUserId || !cache) return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = null;
  await saveCloudProgress(activeUserId, cache);
}

export function activateGuestProgress() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = null;
  activeUserId = null;
  cache = null;
  read();
  listeners.forEach((listener) => listener());
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
