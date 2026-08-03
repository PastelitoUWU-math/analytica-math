import { WORLDS, getWorld } from "@/lib/content/worlds";
import type { Progress } from "@/lib/game-state";

/** ¿Se ha cumplido el prerrequisito (vencer al jefe del mundo anterior)? */
export function worldPrereqMet(worldId: string, p: Progress) {
  const idx = WORLDS.findIndex((w) => w.id === worldId);
  const prev = idx > 0 ? WORLDS[idx - 1] : null;
  return { prev, met: !prev || !!p.bossDefeated[prev.id] };
}

/** ¿Puede el jugador entrar a este nivel? (antitrampas por URL) */
export function levelUnlocked(worldId: string, levelIdx: number, p: Progress) {
  const world = getWorld(worldId);
  if (!world || !world.available || !world.levels[levelIdx]) return false;
  if (!worldPrereqMet(worldId, p).met) return false;
  return levelIdx <= (p.completed[worldId] ?? -1) + 1;
}

/** ¿Puede el jugador enfrentarse al jefe? */
export function bossUnlocked(worldId: string, p: Progress) {
  const world = getWorld(worldId);
  if (!world || !world.boss) return false;
  if (!worldPrereqMet(worldId, p).met) return false;
  return (p.completed[worldId] ?? -1) + 1 >= world.levels.length;
}

/** Extrae el tema de un título tipo "Nivel 3: Límites laterales". */
export function levelTopic(title: string) {
  const i = title.indexOf(":");
  return i >= 0 ? title.slice(i + 1).trim() : title;
}
