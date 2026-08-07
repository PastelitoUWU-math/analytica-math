// Pruebas de salto: permiten saltarse niveles (o un mundo entero) demostrando
// que ya dominas el contenido. Se elige un número de ejercicios por nivel
// saltado según la regla pedagógica definida.
import type { Exercise, World } from "@/lib/content/types";

/** Cuántos ejercicios corresponden a cada nivel saltado, según cuántos se saltan. */
export function distribution(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [5];
  if (n === 2) return [3, 3];
  if (n === 3) return [2, 2, 2];
  if (n === 4) return [1, 1, 1, 2];
  return Array.from({ length: n }, () => 1);
}

export type TestItem = { levelIdx: number; levelTitle: string; exercise: Exercise };

function pick<T>(arr: T[], k: number): T[] {
  const pool = [...arr];
  const out: T[] = [];
  while (out.length < k && pool.length > 0) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]!);
  }
  // Si el nivel tiene menos ejercicios de los pedidos, repetimos desde el principio.
  let i = 0;
  while (out.length < k && arr.length > 0) out.push(arr[i++ % arr.length]!);
  return out;
}

/** Construye la prueba para saltar los niveles [from, to) del mundo.
 *  Si `includeBoss`, añade además un ejercicio del jefe al final. */
export function buildSkipTest(world: World, from: number, to: number, includeBoss = false): TestItem[] {
  const levels = world.levels.slice(from, to);
  const counts = distribution(levels.length);
  const items: TestItem[] = [];
  levels.forEach((lv, i) => {
    pick(lv.exercises, counts[i] ?? 1).forEach((exercise) => {
      items.push({ levelIdx: from + i, levelTitle: lv.title, exercise });
    });
  });
  if (includeBoss && world.boss && world.boss.exercises.length > 0) {
    pick(world.boss.exercises, 1).forEach((exercise) => {
      items.push({ levelIdx: -1, levelTitle: world.boss!.name, exercise });
    });
  }
  return items;
}

