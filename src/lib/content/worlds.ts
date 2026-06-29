import type { World } from "./types";
import { world1Levels, world1Boss } from "./world1";

export const WORLDS: World[] = [
  {
    id: "limites",
    title: "Mundo I — Límites",
    subtitle: "El comportamiento al acercarse",
    summary:
      "El primer ladrillo del análisis. Desde la idea intuitiva de límite hasta los trucos para resolver indeterminaciones, pasando por límites laterales, infinito, el número $e$ y el límite trigonométrico fundamental.",
    available: true,
    levels: world1Levels,
    boss: world1Boss,
  },
  {
    id: "continuidad",
    title: "Mundo II — Continuidad",
    subtitle: "Funciones sin saltos",
    summary:
      "Definición rigurosa de continuidad, tipos de discontinuidades, teoremas de Bolzano y Weierstrass. Jefe: Weierstrass.",
    available: false,
    levels: [],
    boss: null,
  },
  {
    id: "derivadas",
    title: "Mundo III — Derivadas",
    subtitle: "La tasa de cambio",
    summary:
      "Desde la pendiente de la tangente hasta las reglas de derivación, regla de la cadena, derivadas implícitas y aplicaciones. Jefe: Leibniz.",
    available: false,
    levels: [],
    boss: null,
  },
  {
    id: "integrales",
    title: "Mundo IV — Integrales",
    subtitle: "Sumar lo infinitamente pequeño",
    summary:
      "La integral definida y el teorema fundamental, técnicas de integración y aplicaciones. Jefe: Newton.",
    available: false,
    levels: [],
    boss: null,
  },
  {
    id: "series",
    title: "Mundo V — Series",
    subtitle: "Sumas infinitas",
    summary:
      "Convergencia, criterios, series de potencias y de Taylor. Jefe: Euler.",
    available: false,
    levels: [],
    boss: null,
  },
];

export function getWorld(id: string) {
  return WORLDS.find((w) => w.id === id);
}
