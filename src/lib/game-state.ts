// Local game state: progress, points (actuales y de por vida), purchases.
// Los puntos "de por vida" (lifetimePoints) SOLO suben — nunca bajan aunque
// el jugador gaste puntos en la tienda. La clasificación usa ese valor.
import { useEffect, useState, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { WORLDS } from "@/lib/content/worlds";
import { ACHIEVEMENTS, emitAchievement, type UnlockedAchievement } from "@/lib/achievements";

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
  achievements: UnlockedAchievement[];
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
  ownedCosmetics: ["theme-nocturno"],
  activeTheme: "theme-nocturno",
  boosts: { hint: 0, skip: 0 },
  currentStreak: 0,
  bestStreak: 0,
  lastActivityDate: null,
  achievements: [],
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


// ---------------------------------------------------------------------------
// Máquina de estados de la persistencia.
//
//  guest    → sin sesión: la fuente de verdad es localStorage.
//  loading  → hay sesión, todavía NO sabemos cuál es el progreso remoto.
//  ready    → hay sesión y la fila remota está cargada (o creada) con éxito.
//  error    → hay sesión pero la lectura falló: NO sabemos el progreso.
//
// Regla de oro: en `loading` y `error` está PROHIBIDO escribir en la nube.
// Ningún fallo de red, RLS o carrera puede sustituir el progreso remoto por
// valores por defecto.
// ---------------------------------------------------------------------------
export type ProgressStatus = "guest" | "loading" | "ready" | "error";

/** ¿El navegador tiene una sesión persistida? Evita mostrar datos de invitado
 *  a un usuario autenticado mientras Supabase todavía restaura la sesión. */
function hasStoredSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^sb-.*-auth-token$/.test(k)) return true;
    }
  } catch { /* almacenamiento no disponible */ }
  return false;
}

let status: ProgressStatus = hasStoredSession() ? "loading" : "guest";
let accountUserId: string | null = null;
let accountCache: Progress | null = null;
let guestCache: Progress | null = null;
let loadError: string | null = null;
let generation = 0; // invalida hidrataciones obsoletas (cambio de usuario / logout)
let saveTimer: ReturnType<typeof setTimeout> | null = null;
let hydration: { userId: string; promise: Promise<void> } | null = null;
const listeners = new Set<() => void>();

const DEV = typeof import.meta !== "undefined" && import.meta.env?.DEV;
function log(event: string, data: Record<string, unknown> = {}) {
  if (!DEV) return;
  // Solo identificadores, nunca datos sensibles.
  console.info(`[progress] ${event}`, { userId: accountUserId ?? null, status, ...data });
}

function notify() {
  listeners.forEach((l) => l());
}

function normalize(value: Partial<Progress> | null | undefined): Progress {
  return {
    ...DEFAULT,
    ...value,
    completed: value?.completed ?? {},
    bossDefeated: value?.bossDefeated ?? {},
    ownedCosmetics: value?.ownedCosmetics ?? DEFAULT.ownedCosmetics,
    boosts: { ...DEFAULT.boosts, ...(value?.boosts ?? {}) },
    achievements: Array.isArray(value?.achievements) ? value.achievements : [],
  };
}

function readGuest(): Progress {
  if (guestCache) return guestCache;
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(GUEST_KEY) ?? localStorage.getItem(LEGACY_KEY);
    const parsed = normalize(raw ? JSON.parse(raw) : DEFAULT);
    if (parsed.lifetimePoints < parsed.points) parsed.lifetimePoints = parsed.points;
    guestCache = parsed;
  } catch {
    guestCache = DEFAULT;
  }
  return guestCache ?? DEFAULT;
}

/**
 * Progreso visible. Con sesión iniciada NUNCA devuelve el progreso de invitado:
 * mientras carga (o si falla) devuelve DEFAULT, pero la UI debe usar
 * `useProgressStatus()` para no presentarlo como dato real.
 */
function read(): Progress {
  if (accountUserId) return accountCache ?? DEFAULT;
  if (status === "loading") return DEFAULT; // sesión restaurándose: nunca datos de invitado
  return readGuest();
}

export function progressStatus(): ProgressStatus {
  return status;
}

/** Estado explícito de carga para la UI (cargando / error / listo). */
export function useProgressStatus() {
  const snapshot = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => statusSnapshot(),
    () => "guest|null",
  );
  const [st, err] = snapshot.split("|");
  return {
    status: st as ProgressStatus,
    error: err === "null" ? null : err,
    isLoading: st === "loading",
    isError: st === "error",
    /** Datos fiables: invitado (local) o cuenta cargada. */
    isReady: st === "guest" || st === "ready",
    retry: () => { if (accountUserId) void activateAccountProgress(accountUserId, false, true); },
  };
}
function statusSnapshot() {
  return `${status}|${loadError ?? "null"}`;
}

/** Evalúa el catálogo de logros y concede los que correspondan (también retroactivamente). */
function grantAchievements(p: Progress): Progress {
  // Los logros solo se conceden con la sesión iniciada y los datos ya cargados.
  if (!accountUserId || status !== "ready") return p;
  const owned = new Set(p.achievements.map((a) => a.id));
  const newly = ACHIEVEMENTS.filter((a) => !owned.has(a.id) && a.check(p));
  if (newly.length === 0) return p;

  const now = new Date().toISOString();
  const reward = newly.reduce((s, a) => s + a.recompensa_coins, 0);
  if (typeof window !== "undefined") {
    setTimeout(() => newly.forEach((a, i) => setTimeout(() => emitAchievement(a), i * 900)), 300);
  }
  return {
    ...p,
    points: p.points + reward,
    lifetimePoints: p.lifetimePoints + reward,
    achievements: [...p.achievements, ...newly.map((a) => ({ id: a.id, at: now }))],
  };
}

/** Mínimo de ejercicios que forzosamente ha resuelto quien tiene niveles completados. */
function estimatedCorrect(p: Progress): number {
  let n = 0;
  for (const w of WORLDS) {
    const done = (p.completed[w.id] ?? -1) + 1;
    for (let i = 0; i < done; i++) n += w.levels[i]?.exercises.length ?? 0;
    if (p.bossDefeated[w.id]) n += w.boss?.exercises.length ?? 0;
  }
  return n;
}

/** Revisa logros pendientes con el estado actual (útil al arrancar o iniciar sesión). */
export function syncAchievements() {
  if (accountUserId && status !== "ready") return; // nunca durante loading/error
  const p = read();
  const floor = estimatedCorrect(p);
  const base = floor > p.totalCorrect ? { ...p, totalCorrect: floor } : p;
  const next = grantAchievements(base);
  if (next !== p) write(next);
}

function write(p: Progress) {
  // Con sesión iniciada, prohibido mutar hasta que los datos remotos estén cargados.
  if (status === "loading" || status === "error" || (accountUserId && status !== "ready")) {
    log("WRITE_BLOCKED", { reason: status });
    return;
  }
  const prev = read();
  p = grantAchievements(p);
  if (accountUserId) {
    accountCache = p;
    notify();
    if (typeof window !== "undefined" && prev !== p) scheduleCloudSave(accountUserId, p, generation);
    return;
  }
  guestCache = p;
  if (typeof window !== "undefined") {
    localStorage.setItem(GUEST_KEY, JSON.stringify(p));
    localStorage.removeItem(LEGACY_KEY);
  }
  notify();
}

function scheduleCloudSave(userId: string, progress: Progress, gen: number) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    if (accountUserId === userId && generation === gen && status === "ready") {
      void saveCloudProgress(userId, progress);
    }
  }, 250);
}

function toRow(userId: string, progress: Progress) {
  return {
    user_id: userId,
    completed: progress.completed as Json,
    boss_defeated: progress.bossDefeated as Json,
    points: progress.points,
    lifetime_points: progress.lifetimePoints,
    total_correct: progress.totalCorrect,
    owned_cosmetics: progress.ownedCosmetics as Json,
    active_theme: progress.activeTheme,
    boosts: progress.boosts as Json,
    current_streak: progress.currentStreak,
    best_streak: progress.bestStreak,
    last_activity_date: progress.lastActivityDate,
    achievements: progress.achievements as unknown as Json,
  };
}

async function saveCloudProgress(userId: string, progress: Progress, attempt = 0): Promise<boolean> {
  // Solo se guarda cuando sabemos con certeza cuál es el progreso del usuario.
  if (status !== "ready" || accountUserId !== userId) {
    log("SAVE_SKIPPED", { reason: status });
    return false;
  }
  log("STATS_UPDATE", { attempt });
  const { error } = await supabase.from("user_progress").upsert(toRow(userId, progress), {
    onConflict: "user_id",
  });
  if (error) {
    log("STATS_UPDATE_ERROR", { message: error.message, attempt });
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      return saveCloudProgress(userId, progress, attempt + 1);
    }
    return false;
  }
  await supabase.rpc("sync_progress", {
    _points: progress.points,
    _total_correct: progress.totalCorrect,
    _lifetime: progress.lifetimePoints,
  });
  return true;
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
  current_streak?: number | null;
  best_streak?: number | null;
  last_activity_date?: string | null;
  achievements?: Json;
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
    currentStreak: row.current_streak ?? 0,
    bestStreak: row.best_streak ?? 0,
    lastActivityDate: row.last_activity_date ?? null,
    achievements: Array.isArray(row.achievements)
      ? (row.achievements as unknown as UnlockedAchievement[])
      : [],
  });
}

/**
 * Carga (o crea, solo si se confirma que no existe) el progreso del usuario.
 * Idempotente por usuario: llamadas concurrentes comparten la misma promesa.
 */
export async function activateAccountProgress(
  userId: string,
  importGuestProgress = false,
  force = false,
) {
  if (!force && hydration?.userId === userId) return hydration.promise;
  if (!force && accountUserId === userId && status === "ready") return;

  const gen = ++generation;
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  accountUserId = userId;
  accountCache = null;
  loadError = null;
  status = "loading";
  log("STATS_LOAD_STARTED", { force });
  notify();

  const stale = () => generation !== gen;

  const task = (async () => {
    const guest = readGuest();
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (stale()) { log("STATS_LOAD_ABORTED"); return; }

    if (error) {
      // NO existe ninguna certeza sobre el progreso → estado de error, sin escrituras.
      status = "error";
      loadError = error.message;
      accountCache = null;
      log("STATS_LOAD_ERROR", { message: error.message });
      notify();
      return;
    }

    if (data) {
      status = "ready";
      accountCache = fromCloud(data);
      log("STATS_LOAD_SUCCESS", { points: accountCache.points });
      notify();
      // Ajustes derivados (suelo de ejercicios + logros retroactivos) por la vía normal.
      const floor = estimatedCorrect(accountCache);
      if (floor > accountCache.totalCorrect) write({ ...accountCache, totalCorrect: floor });
      else syncAchievements();
      return;
    }

    // Confirmado por el servidor: el usuario no tiene fila todavía → creación única.
    log("STATS_LOAD_EMPTY");
    const seed = importGuestProgress ? normalize(guest) : DEFAULT;
    log("STATS_CREATE_STARTED", { imported: importGuestProgress });
    const { error: insertError } = await supabase.from("user_progress").insert(toRow(userId, seed));
    if (stale()) return;

    if (insertError) {
      // Carrera: otra pestaña la creó antes → recargamos la fila real, nunca sobrescribimos.
      const { data: retry, error: retryError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (stale()) return;
      if (retry) {
        status = "ready";
        accountCache = fromCloud(retry);
        log("STATS_LOAD_SUCCESS", { afterInsertConflict: true });
        notify();
        syncAchievements();
        return;
      }
      status = "error";
      loadError = retryError?.message ?? insertError.message;
      accountCache = null;
      log("STATS_CREATE_ERROR", { message: loadError });
      notify();
      return;
    }

    status = "ready";
    accountCache = seed;
    log("STATS_CREATE_SUCCESS");
    notify();
    syncAchievements();
    if (importGuestProgress) await saveCloudProgress(userId, accountCache);
  })().finally(() => {
    if (hydration?.userId === userId) hydration = null;
  });

  hydration = { userId, promise: task };
  return task;
}

/** Guarda pendientes antes de cerrar sesión. Solo si los datos eran fiables. */
export async function flushAccountProgress() {
  if (!accountUserId || status !== "ready" || !accountCache) return;
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  await saveCloudProgress(accountUserId, accountCache);
}

/** Vuelve al modo invitado. No borra nada remoto y descarta hidrataciones en curso. */
export function activateGuestProgress() {
  if (accountUserId === null && status === "guest") return;
  generation++;
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  hydration = null;
  accountUserId = null;
  accountCache = null;
  loadError = null;
  status = "guest";
  guestCache = null; // no mezclar el estado del usuario anterior
  readGuest();
  log("SIGNED_OUT_GUEST_MODE");
  notify();
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

/** Registra actividad de hoy y devuelve el progreso con la racha actualizada. */
function touchStreak(p: Progress): Progress {
  const today = todayKey();
  if (p.lastActivityDate === today) return p;
  const continues = p.lastActivityDate === yesterdayKey();
  const currentStreak = continues ? p.currentStreak + 1 : 1;
  const bestStreak = Math.max(p.bestStreak, currentStreak);
  notifyStreak(currentStreak, bestStreak > p.bestStreak);
  return { ...p, currentStreak, bestStreak, lastActivityDate: today };
}

function notifyStreak(streak: number, isRecord: boolean) {
  if (typeof window === "undefined") return;
  void import("sonner").then(({ toast }) => {
    toast(`🔥 ¡Racha de ${streak} día${streak === 1 ? "" : "s"}!`, {
      description: isRecord ? "Nuevo récord personal. Sigue así." : "Vuelve mañana para mantenerla.",
    });
  });
}

/** Recupera una racha perdida pagando puntos. */
export function recoverStreak(): boolean {
  const p = read();
  if (!streakLost(p) || p.points < STREAK_RECOVERY_COST) return false;
  write({
    ...p,
    points: p.points - STREAK_RECOVERY_COST,
    lastActivityDate: yesterdayKey(),
  });
  return true;
}

export function setPlayerName(name: string) {
  write({ ...read(), playerName: name });
}
export function addPoints(n: number) {
  const p = read();
  write(touchStreak({ ...earn(p, n), totalCorrect: p.totalCorrect + 1 }));
}

export function completeLevel(worldId: string, levelIdx: number, earned: number, correctCount = 0) {
  const p = read();
  const prev = p.completed[worldId] ?? -1;
  // Antitrampas: solo se puede completar el siguiente nivel desbloqueado.
  if (levelIdx > prev + 1) return;
  write(touchStreak({
    ...earn(p, earned),
    totalCorrect: p.totalCorrect + Math.max(0, correctCount),
    completed: { ...p.completed, [worldId]: Math.max(prev, levelIdx) },
  }));
}
export function defeatBoss(worldId: string, earned: number, correctCount = 0) {
  const p = read();
  // Antitrampas: el jefe solo cuenta si se han completado todos los niveles.
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world || (p.completed[worldId] ?? -1) + 1 < world.levels.length) return;
  write(touchStreak({
    ...earn(p, earned),
    totalCorrect: p.totalCorrect + Math.max(0, correctCount),
    bossDefeated: { ...p.bossDefeated, [worldId]: true },
  }));
}

/** Prueba de salto superada: desbloquea hasta `targetIdx` (marca como hechos los anteriores). */
export function skipToLevel(worldId: string, targetIdx: number, correctCount = 0) {
  const p = read();
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world || targetIdx <= 0 || targetIdx > world.levels.length) return;
  const prev = p.completed[worldId] ?? -1;
  if (targetIdx - 1 <= prev) return;
  write(touchStreak({
    ...p,
    totalCorrect: p.totalCorrect + Math.max(0, correctCount),
    completed: { ...p.completed, [worldId]: targetIdx - 1 },
  }));
}

/** Prueba de salto de mundo superada: niveles completados + jefe vencido. */
export function skipWorld(worldId: string, correctCount = 0) {
  const p = read();
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) return;
  write(touchStreak({
    ...p,
    totalCorrect: p.totalCorrect + Math.max(0, correctCount),
    completed: { ...p.completed, [worldId]: world.levels.length - 1 },
    bossDefeated: { ...p.bossDefeated, [worldId]: true },
  }));
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
