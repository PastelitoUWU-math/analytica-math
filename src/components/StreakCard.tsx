import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  effectiveStreak,
  recoverStreak,
  STREAK_RECOVERY_COST,
  streakLost,
  useProgress,
} from "@/lib/game-state";
import { sfx } from "@/lib/sfx";

function formatDate(iso: string | null): string {
  if (!iso) return "Sin actividad todavía";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function StreakCard() {
  const progress = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const streak = effectiveStreak(progress);
  const lost = streakLost(progress);
  const canPay = progress.points >= STREAK_RECOVERY_COST;

  return (
    <section className="mt-6 rounded-lg border border-border/60 bg-card p-5 shadow-sm">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Racha de estudio</h2>
      <p className="mt-2 text-2xl font-display">
        <span className="mr-2">🔥</span>
        Racha actual: {streak} {streak === 1 ? "día" : "días"}
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Mejor racha histórica</dt>
          <dd className="font-mono tabular-nums">
            {progress.bestStreak} {progress.bestStreak === 1 ? "día" : "días"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Última actividad</dt>
          <dd>{formatDate(progress.lastActivityDate)}</dd>
        </div>
      </dl>

      {lost && (
        <div className="mt-4 rounded-md border border-accent/40 bg-accent/5 p-3 text-sm">
          <p>
            Perdiste tu racha de <strong>{progress.currentStreak}</strong>{" "}
            {progress.currentStreak === 1 ? "día" : "días"}. Puedes recuperarla por{" "}
            {STREAK_RECOVERY_COST} puntos.
          </p>
          <button
            type="button"
            disabled={!canPay}
            onClick={() => {
              if (recoverStreak()) {
                sfx.levelUp?.();
                toast(`🔥 Racha recuperada: ${progress.currentStreak} días`, {
                  description: "Completa un ejercicio hoy para mantenerla.",
                });
              }
            }}
            className="mt-3 px-3 py-1.5 rounded-md bg-foreground text-background text-sm disabled:opacity-40"
          >
            {canPay
              ? `Recuperar racha (${STREAK_RECOVERY_COST} pts)`
              : `Necesitas ${STREAK_RECOVERY_COST - progress.points} pts más`}
          </button>
        </div>
      )}
    </section>
  );
}
