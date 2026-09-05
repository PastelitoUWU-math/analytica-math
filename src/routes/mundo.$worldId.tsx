import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { getWorld, WORLDS } from "@/lib/content/worlds";
import { useProgress } from "@/lib/game-state";
import { InlineMath } from "@/components/InlineMath";
import { levelTopic } from "@/lib/unlock";
import { useExpandNav } from "@/components/ExpandNav";

export const Route = createFileRoute("/mundo/$worldId")({
  head: ({ params }) => {
    const w = getWorld(params.worldId);
    const url = `https://analynx-math.lovable.app/mundo/${params.worldId}`;
    return {
      meta: [
        { title: `${w?.title ?? "Mundo"} — Analynx` },
        { name: "description", content: w?.summary?.slice(0, 150) ?? "Mundo de Analynx" },
        { property: "og:title", content: `${w?.title ?? "Mundo"} — Analynx` },
        { property: "og:description", content: w?.summary?.slice(0, 150) ?? "Mundo de Analynx" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    const w = getWorld(params.worldId);
    if (!w) throw notFound();
    return { worldId: params.worldId };
  },
  component: WorldPage,
});

function WorldPage() {
  const { worldId } = Route.useParams();
  const world = getWorld(worldId)!;
  const progress = useProgress();
  const expand = useExpandNav();
  const completed = progress.completed[worldId] ?? -1;
  const bossDone = progress.bossDefeated[worldId];
  // Prerrequisito: haber vencido al jefe del mundo anterior.
  const idx = WORLDS.findIndex((w) => w.id === worldId);
  const prev = idx > 0 ? WORLDS[idx - 1] : null;
  const prereqMet = !prev || progress.bossDefeated[prev.id];
  if (!prereqMet) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">🔒</div>
          <h1 className="text-2xl font-display tracking-tight mt-4">Mundo bloqueado</h1>
          <p className="text-muted-foreground mt-2">
            Debes vencer a <strong className="text-foreground">{prev!.boss?.name}</strong> en{" "}
            <em>{prev!.title}</em> antes de acceder a este mundo.
          </p>
          <Link to="/mundos" className="inline-block mt-6 px-5 py-2.5 rounded-md bg-foreground text-background">
            ← Volver a los mundos
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/mundos" className="text-sm text-muted-foreground hover:text-foreground">
          ← Mundos
        </Link>
        <h1 className="text-3xl font-display tracking-tight mt-3">{world.title}</h1>
        <p className="text-muted-foreground italic">{world.subtitle}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 stagger">
          {world.levels.map((lv, idx) => {
            const unlocked = idx <= completed + 1;
            const done = idx <= completed;
            const cls = `relative rounded-md border flex items-start gap-3 p-3 text-left transition ${
              unlocked
                ? done
                  ? "bg-success/10 border-success/40 hover:bg-success/15"
                  : "bg-card border-border hover:border-accent"
                : "bg-secondary/40 border-border/40 text-muted-foreground/50"
            }`;
            const inner = (
              <>
                <div className="shrink-0 w-9 text-center">
                  <div className="text-[9px] uppercase tracking-wider opacity-70">Nivel</div>
                  <div className="text-lg font-display leading-none">{idx + 1}</div>
                </div>
                <div className="min-w-0 flex-1 pr-4 pb-4">
                  <div className="text-sm leading-snug">
                    <InlineMath source={levelTopic(lv.title)} />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    <InlineMath source={lv.concept} />
                  </div>
                </div>
                {done && <div className="absolute top-1.5 right-1.5 text-success text-xs">✓</div>}
                {!unlocked && <div className="absolute top-1.5 right-1.5 text-xs">🔒</div>}
              </>
            );
            if (!unlocked) {
              const canSkipHere = idx - (completed + 1) >= 2;
              return (
                <div key={lv.id} className={cls} aria-disabled>
                  {inner}
                  {canSkipHere && (
                    <Link
                      to="/prueba/$worldId/$target"
                      params={{ worldId, target: String(idx) }}
                      className="absolute bottom-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded border border-accent/50 text-accent hover:bg-accent/10 transition"
                      title="Haz una prueba para saltarte los niveles intermedios"
                    >
                      Saltar aquí
                    </Link>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={lv.id}
                to="/nivel/$worldId/$levelIdx"
                params={{ worldId, levelIdx: String(idx) }}
                onClick={(e) => {
                  e.preventDefault();
                  expand(e.currentTarget, {
                    to: "/nivel/$worldId/$levelIdx",
                    params: { worldId, levelIdx: String(idx) },
                  });
                }}
                className={cls}
              >
                {inner}
              </Link>
            );
          })}
        </div>

        {world.levels.length - (completed + 1) >= 2 && (
          <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm">
              <div className="font-display text-lg">¿Ya dominas esto?</div>
              <p className="text-muted-foreground">
                Salta niveles superando una prueba con un ejercicio de cada nivel que quieras
                saltarte. Pulsa «Saltar aquí» en cualquier nivel bloqueado, o sáltate el mundo entero.
              </p>
            </div>
            <Link
              to="/prueba/$worldId/$target"
              params={{ worldId, target: "mundo" }}
              className="px-4 py-2 rounded-md border border-accent/60 text-accent hover:bg-accent/10 transition whitespace-nowrap"
            >
              Prueba para saltar el mundo →
            </Link>
          </div>
        )}

        {world.boss && (
          <div className="mt-10 border border-accent/40 rounded-lg p-6 bg-gradient-to-br from-accent/5 to-transparent">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">Jefe del mundo</div>
                <h2 className="text-2xl font-display mt-1">{world.boss.name}</h2>
                <p className="text-sm text-muted-foreground">{world.boss.era}</p>
              </div>
              <div className="text-right">
                {completed + 1 >= world.levels.length ? (
                  <Link
                    to="/jefe/$worldId"
                    params={{ worldId }}
                    className="px-5 py-2.5 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition"
                  >
                    {bossDone ? "Revivir batalla" : "Enfrentarte al jefe"}
                  </Link>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Completa los {world.levels.length} niveles para desbloquear
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
