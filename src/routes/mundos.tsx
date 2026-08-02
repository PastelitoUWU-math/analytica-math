import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { WORLDS } from "@/lib/content/worlds";
import { useProgress } from "@/lib/game-state";
import { Rich } from "@/components/Rich";

export const Route = createFileRoute("/mundos")({
  head: () => ({
    meta: [
      { title: "Mundos — Analynx" },
      {
        name: "description",
        content:
          "Cinco mundos del análisis matemático: límites, continuidad, derivadas, integrales y series.",
      },
      { property: "og:title", content: "Mundos — Analynx" },
      { property: "og:description", content: "Recorre el análisis matemático en cinco etapas: límites, continuidad, derivadas, integrales y series." },
      { property: "og:url", content: "https://analytica-math.lovable.app/mundos" },
    ],
    links: [{ rel: "canonical", href: "https://analytica-math.lovable.app/mundos" }],
  }),
  component: WorldsPage,
});

function WorldsPage() {
  const progress = useProgress();
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display tracking-tight mb-2">Mundos</h1>
        <p className="text-muted-foreground mb-10">
          Recorre el análisis matemático en cinco etapas. Avanza a tu ritmo.
        </p>
        <div className="space-y-6">
          {WORLDS.map((w) => {
            const completed = progress.completed[w.id] ?? -1;
            const totalLevels = w.levels.length;
            const pct = totalLevels ? Math.round(((completed + 1) / totalLevels) * 100) : 0;
            const bossDone = progress.bossDefeated[w.id];
            // Prerrequisito: cada mundo requiere haber vencido al jefe del anterior.
            const prevIdx = WORLDS.findIndex((x) => x.id === w.id) - 1;
            const prevWorld = prevIdx >= 0 ? WORLDS[prevIdx] : null;
            const prereqMet = !prevWorld || progress.bossDefeated[prevWorld.id];
            const locked = w.available && !prereqMet;
            return (
              <div
                key={w.id}
                className={`bg-card border border-border/60 rounded-lg p-6 ${
                  w.available && !locked ? "" : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="flex-1 min-w-[260px]">
                    <h2 className="text-xl font-display">{w.title}</h2>
                    <p className="text-sm text-muted-foreground italic">{w.subtitle}</p>
                    <div className="mt-3 text-[15px] leading-relaxed">
                      <Rich source={w.summary} />
                    </div>
                  </div>
                  <div className="w-full md:w-72">
                    {!w.available ? (
                      <div className="text-sm text-muted-foreground text-right">Próximamente</div>
                    ) : locked ? (
                      <div className="text-right text-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-secondary/40 text-muted-foreground">
                          🔒 Vence a {prevWorld!.boss?.name ?? "el jefe anterior"}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Completa {prevWorld!.title} para desbloquear este mundo.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-xs text-muted-foreground mb-1">
                          {completed + 1} / {totalLevels} niveles · jefe {bossDone ? "vencido" : "pendiente"}
                        </div>
                        <div className="h-1.5 bg-secondary rounded overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Link
                            to="/mundo/$worldId"
                            params={{ worldId: w.id }}
                            className="flex-1 text-center px-3 py-2 rounded-md bg-foreground text-background text-sm hover:opacity-90"
                          >
                            Entrar
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
