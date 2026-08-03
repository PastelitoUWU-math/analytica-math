import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { useProgress } from "@/lib/game-state";

export const Route = createFileRoute("/logros")({
  head: () => ({
    meta: [
      { title: "Logros — Analynx" },
      {
        name: "description",
        content:
          "Consulta tus logros desbloqueados en Analynx: ejercicios completados, mundos conquistados, jefes derrotados y rachas de estudio.",
      },
      { property: "og:title", content: "Logros — Analynx" },
      {
        property: "og:description",
        content: "Desbloquea logros resolviendo ejercicios, venciendo jefes y manteniendo tu racha diaria.",
      },
      { property: "og:url", content: "https://analytica-math.lovable.app/logros" },
    ],
    links: [{ rel: "canonical", href: "https://analytica-math.lovable.app/logros" }],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const progress = useProgress();
  const unlockedMap = new Map(progress.achievements.map((a) => [a.id, a.at]));
  const total = ACHIEVEMENTS.length;
  const done = ACHIEVEMENTS.filter((a) => unlockedMap.has(a.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display tracking-tight">Logros</h1>
        <p className="text-muted-foreground mt-2">
          Recompensas por tu constancia. Cada logro otorga puntos ✦ al desbloquearse.
        </p>

        <div className="mt-8 bg-card/90 border border-border/60 rounded-lg p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-sm">
              Logros completados: <strong className="tabular-nums">{done}/{total}</strong>
            </div>
            <div className="text-2xl font-display tabular-nums">{pct}%</div>
          </div>
          <div className="mt-3 h-3 rounded bg-secondary overflow-hidden">
            <div className="h-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((a) => {
            const at = unlockedMap.get(a.id);
            const unlocked = !!at;
            return (
              <div
                key={a.id}
                className={`rounded-lg border p-4 flex gap-4 transition ${
                  unlocked
                    ? "border-accent/50 bg-accent/5"
                    : "border-border/50 bg-secondary/30 opacity-70"
                }`}
              >
                <div className={`text-3xl leading-none ${unlocked ? "" : "grayscale opacity-50"}`}>
                  {unlocked ? a.icono : "🔒"}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg leading-tight">{a.nombre}</div>
                  <p className="text-sm text-muted-foreground">{a.descripcion}</p>
                  <div className="mt-1 text-xs text-accent tabular-nums">
                    +{a.recompensa_coins} ✦
                  </div>
                  {unlocked && (
                    <div className="text-[11px] text-muted-foreground mt-1">
                      Desbloqueado el {new Date(at).toLocaleDateString("es-ES")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
