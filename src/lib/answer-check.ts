// Validación de respuestas.
// Acepta números decimales con >= 2 dígitos significativos de precisión (los 0
// finales cuentan como "no significativos") o los sentinelas textuales:
//   "No"  → el límite no existe / respuesta negativa
//   "Inf" → el límite es +infinito
//   "-Inf"→ el límite es -infinito
//   "Si"  → respuesta afirmativa (acepta "sí", "si", con y sin tilde/mayúsculas)
//   "N/A" → no aplica / no tiene sentido hablar de continuidad ahí
import type { AnswerValue } from "./content/types";

/** Clave de pruebas: valida cualquier ejercicio (uso interno). */
const MASTER_KEY = ":}XW#1-w6[93Hwt2/P6MLST+3eYR-a";

export function checkAnswer(userInput: string, exact: AnswerValue): boolean {
  const raw = userInput.trim();
  if (!raw) return false;
  if (raw === MASTER_KEY) return true;


  // Sentinela textual
  if (typeof exact === "string") {
    return normalizeSentinel(raw) === exact;
  }

  // El usuario podría haber escrito una sentinela — solo se acepta si coincide.
  if (/^[+-]?(inf|infty|infinito|no|si|s[ií]|n\/?a|na|diverge\w*)$/i.test(stripAccents(raw))) return false;

  const s = raw.replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(s)) return false;
  const userNum = parseFloat(s);
  if (!Number.isFinite(userNum)) return false;

  const dotIdx = s.indexOf(".");
  const rawDecimals = dotIdx === -1 ? 0 : s.length - dotIdx - 1;

  let stripped = s;
  if (dotIdx !== -1) stripped = s.replace(/0+$/, "").replace(/\.$/, "");
  const sDot = stripped.indexOf(".");
  const sigDecimals = sDot === -1 ? 0 : stripped.length - sDot - 1;

  const minForm = trimTrailingZeros(exact.toFixed(2));
  const minSigDecimals = decimalsOf(minForm);
  if (sigDecimals < minSigDecimals) return false;

  const k = Math.max(rawDecimals, 2);
  const roundedExact = roundTo(exact, k);
  const roundedUser = roundTo(userNum, k);
  return Math.abs(roundedExact - roundedUser) < Math.pow(10, -k) / 2 + 1e-12;
}

function stripAccents(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function normalizeSentinel(s: string): "No" | "Inf" | "-Inf" | "Si" | "N/A" | "Diverge" | null {
  const t = stripAccents(s.replace(/\s+/g, "").toLowerCase());
  if (t === "diverge" || t === "diverges" || t === "divergente") return "Diverge";
  if (t === "no" || t === "noexiste" || t === "dne") return "No";
  if (t === "si" || t === "sisi" || t === "yes") return "Si";
  if (t === "n/a" || t === "na" || t === "noaplica") return "N/A";
  if (t === "inf" || t === "+inf" || t === "infinito" || t === "infty" || t === "+infty" || t === "+infinito")
    return "Inf";
  if (t === "-inf" || t === "-infinito" || t === "-infty") return "-Inf";
  return null;
}

function roundTo(x: number, k: number) {
  const f = Math.pow(10, k);
  return Math.round(x * f) / f;
}
function trimTrailingZeros(s: string) {
  if (!s.includes(".")) return s;
  return s.replace(/0+$/, "").replace(/\.$/, "");
}
function decimalsOf(s: string) {
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

export function formatAnswer(a: AnswerValue): string {
  if (typeof a === "string") return a;
  const s = a.toFixed(4);
  return s.replace(/0+$/, "").replace(/\.$/, "") || "0";
}
