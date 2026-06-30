import { useEffect } from "react";
import { useProgress } from "@/lib/game-state";

// Aplica el tema activo poniendo data-theme="..." en <html>.
// Las variables de cada tema están definidas en src/styles.css.
export function ThemeApplier() {
  const { activeTheme } = useProgress();
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = activeTheme || "theme-pergamino";
  }, [activeTheme]);
  return null;
}
