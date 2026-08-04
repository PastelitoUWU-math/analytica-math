import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { getWorld } from "@/lib/content/worlds";
import { Rich } from "@/components/Rich";
import { InlineMath } from "@/components/InlineMath";
import { ExerciseRunner } from "@/components/ExerciseRunner";
import { LessonPlayer } from "@/components/LessonPlayer";
import { useEffect, useState } from "react";
import { completeLevel, useProgress } from "@/lib/game-state";
import { levelUnlocked } from "@/lib/unlock";

export const Route = createFileRoute("/nivel/$worldId/$levelIdx")({
  head: ({ params }) => {
    const w = getWorld(params.worldId);
    const lv = w?.levels[Number(params.levelIdx)];
    const url = `https://analytica-math.lovable.app/nivel/${params.worldId}/${params.levelIdx}`;
    const title = `${lv?.title ?? "Nivel"} — ${w?.title ?? ""}`;
    const desc = lv?.concept ?? "Nivel de Analynx";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    const w = getWorld(params.worldId);
    if (!w) throw notFound();
    const idx = Number(params.levelIdx);
    if (!Number.isFinite(idx) || !w.levels[idx]) throw notFound();
    return { worldId: params.worldId, idx };
  },
  component: LevelPageOuter,
});

function LevelPageOuter() {
  const { worldId, idx } = Route.useLoaderData();
  // key forces full remount when the level changes, resetting all state
  return <LevelPage key={`${worldId}/${idx}`} worldId={worldId} idx={idx} />;
}

function LevelPage({ worldId, idx }: { worldId: string; idx: number }) {
  const world = getWorld(worldId)!;
  const level = world.levels[idx];
  const progress = useProgress();
  const unlocked = levelUnlocked(worldId, idx, progress);
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"lesson" | "exercise" | "done">("lesson");
  const [exIdx, setExIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ correct: 0, revealed: 0 });

  // Belt & suspenders: also reset if for some reason we end up reused.
  useEffect(() => {
    setPhase("lesson");
    setExIdx(0);
    setScore(0);
    setStats({ correct: 0, revealed: 0 });
  }, [worldId, idx]);

  if (!unlocked) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">🔒</div>
          <h1 className="text-2xl font-display tracking-tight mt-4">Nivel bloqueado</h1>
          <p className="text-muted-foreground mt-2">
            Este nivel aún no está desbloqueado. Completa los niveles anteriores de{" "}
            <em>{world.title}</em> para acceder.
          </p>
          <Link
            to="/mundo/$worldId"
            params={{ worldId }}
            className="inline-block mt-6 px-5 py-2.5 rounded-md bg-foreground text-background"
          >
            ← Volver al mundo
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/mundo/$worldId"
          params={{ worldId }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {world.title}
        </Link>
        <div className="mt-3 flex items-baseline justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-display tracking-tight">
            <InlineMath source={level.title} />
          </h1>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            <InlineMath source={level.concept} />
          </span>
        </div>

        {phase === "lesson" && (
          <LessonPlayer
            body={level.lesson.body}
            exerciseCount={level.exercises.length}
            onFinish={() => setPhase("exercise")}
          />
        )}

        {phase === "exercise" && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <ExerciseRunner
              key={exIdx}
              exercise={level.exercises[exIdx]}
              index={exIdx}
              total={level.exercises.length}
              onComplete={({ correct, revealed }) => {
                const earned = correct ? 10 : 0;
                setScore((s) => s + earned);
                const nextStats = {
                  correct: stats.correct + (correct ? 1 : 0),
                  revealed: stats.revealed + (revealed ? 1 : 0),
                };
                setStats(nextStats);
                if (exIdx + 1 < level.exercises.length) {
                  setExIdx(exIdx + 1);
                } else {
                  const bonus = 20;
                  const total = score + earned + bonus;
                  completeLevel(worldId, idx, total, nextStats.correct);
                  setScore(total);
                  setPhase("done");
                }
              }}
            />

            <button
              onClick={() => setPhase("lesson")}
              className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              Volver a leer la lección
            </button>
          </div>
        )}

        {phase === "done" && (
          <section className="mt-6 bg-card/90 border border-success/40 rounded-lg p-8 text-center animate-scale-in">
            <div className="text-xs uppercase tracking-widest text-success mb-2">
              Nivel completado
            </div>
            <h2 className="text-2xl font-display">+{score} puntos</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.correct} aciertos · {stats.revealed} reveladas
            </p>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {idx + 1 < world.levels.length ? (
                <button
                  onClick={() =>
                    navigate({
                      to: "/nivel/$worldId/$levelIdx",
                      params: { worldId, levelIdx: String(idx + 1) },
                    })
                  }
                  className="px-5 py-2.5 rounded-md bg-foreground text-background btn-glow"
                >
                  Siguiente nivel →
                </button>
              ) : (
                <Link
                  to="/jefe/$worldId"
                  params={{ worldId }}
                  className="px-5 py-2.5 rounded-md bg-accent text-accent-foreground btn-glow"
                >
                  Enfrentarte al jefe →
                </Link>
              )}
              <Link
                to="/mundo/$worldId"
                params={{ worldId }}
                className="px-5 py-2.5 rounded-md border border-border hover:bg-secondary"
              >
                Volver al mundo
              </Link>
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
