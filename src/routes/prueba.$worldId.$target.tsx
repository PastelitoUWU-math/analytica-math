import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { ExerciseRunner } from "@/components/ExerciseRunner";
import { InlineMath } from "@/components/InlineMath";
import { getWorld } from "@/lib/content/worlds";
import { buildSkipTest } from "@/lib/skip-test";
import { skipToLevel, skipWorld, useProgress } from "@/lib/game-state";
import { worldPrereqMet } from "@/lib/unlock";
import { sfx } from "@/lib/sfx";

export const Route = createFileRoute("/prueba/$worldId/$target")({
  head: ({ params }) => {
    const w = getWorld(params.worldId);
    const url = `https://analytica-math.lovable.app/prueba/${params.worldId}/${params.target}`;
    const title = `Prueba de salto — ${w?.title ?? "Analynx"}`;
    const desc = `Demuestra que dominas los niveles que quieres saltarte en ${w?.title ?? "Analynx"}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { name: "robots", content: "noindex" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    const w = getWorld(params.worldId);
    if (!w) throw notFound();
    const isWorld = params.target === "mundo";
    const idx = Number(params.target);
    if (!isWorld && (!Number.isInteger(idx) || !w.levels[idx])) throw notFound();
    return { worldId: params.worldId, target: isWorld ? ("mundo" as const) : idx };
  },
  component: SkipTestPage,
});

function SkipTestPage() {
  const { worldId, target } = Route.useLoaderData();
  const world = getWorld(worldId)!;
  const progress = useProgress();
  const navigate = useNavigate();

  const from = (progress.completed[worldId] ?? -1) + 1;
  const to = target === "mundo" ? world.levels.length : target;
  const prereq = worldPrereqMet(worldId, progress).met;
  const valid = prereq && world.available && to > from + 0 && from < world.levels.length;

  const items = useMemo(
    () => (valid ? buildSkipTest(world, from, to) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [worldId, from, to, valid],
  );

  const [phase, setPhase] = useState<"intro" | "test" | "won" | "lost">("intro");
  const [i, setI] = useState(0);

  if (!valid) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">🔒</div>
          <h1 className="text-2xl font-display tracking-tight mt-4">Prueba no disponible</h1>
          <p className="text-muted-foreground mt-2">
            Esta prueba de salto no está disponible ahora mismo (ya has superado esos niveles o el
            mundo aún está bloqueado).
          </p>
          <Link to="/mundo/$worldId" params={{ worldId }} className="inline-block mt-6 px-5 py-2.5 rounded-md bg-foreground text-background">
            ← Volver al mundo
          </Link>
        </div>
      </Shell>
    );
  }

  const nSkipped = to - from;

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/mundo/$worldId" params={{ worldId }} className="text-sm text-muted-foreground hover:text-foreground">
          ← {world.title}
        </Link>

        <h1 className="text-3xl font-display tracking-tight mt-3">Prueba de salto</h1>
        <p className="text-muted-foreground mt-1">
          {target === "mundo"
            ? `Saltar el resto del mundo (${nSkipped} niveles y el jefe).`
            : `Saltar del nivel ${from + 1} al nivel ${to + 1} (${nSkipped} nivel${nSkipped === 1 ? "" : "es"}).`}
        </p>

        {phase === "intro" && (
          <section className="mt-6 bg-card/90 border border-accent/40 rounded-lg p-7 animate-fade-in">
            <div className="text-xs uppercase tracking-widest text-accent">Reglas</div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              <li>· La prueba tiene <strong>{items.length} ejercicio{items.length === 1 ? "" : "s"}</strong>, tomados de los niveles que quieres saltarte.</li>
              <li>· Tienes <strong>2 intentos</strong> por ejercicio y <strong>no hay pistas</strong>.</li>
              <li>· Un solo fallo definitivo cancela la prueba: tendrás que volver a empezar.</li>
              <li>· Si la superas, esos niveles quedarán marcados como completados{target === "mundo" ? " y el jefe como vencido" : ""}.</li>
              <li>· No se otorgan puntos por saltarse niveles, pero los aciertos cuentan para tus logros.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground">
              Niveles evaluados:{" "}
              {Array.from(new Set(items.map((it) => it.levelIdx)))
                .map((n) => n + 1)
                .join(", ")}
            </div>
            <div className="mt-6 flex gap-3 justify-end flex-wrap">
              <Link to="/mundo/$worldId" params={{ worldId }} className="px-5 py-2.5 rounded-md border border-border">
                Cancelar
              </Link>
              <button
                onClick={() => { sfx.reveal(); setPhase("test"); }}
                className="px-5 py-2.5 rounded-md bg-accent text-accent-foreground btn-glow"
              >
                Empezar la prueba →
              </button>
            </div>
          </section>
        )}

        {phase === "test" && items[i] && (
          <div className="mt-6 space-y-3 animate-fade-in">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Del nivel {items[i]!.levelIdx + 1} — <InlineMath source={items[i]!.levelTitle} />
            </div>
            <ExerciseRunner
              key={i}
              exercise={items[i]!.exercise}
              index={i}
              total={items.length}
              bossMode
              onComplete={({ correct }) => {
                if (!correct) {
                  sfx.wrong();
                  setPhase("lost");
                  return;
                }
                if (i + 1 < items.length) {
                  setI(i + 1);
                } else {
                  if (target === "mundo") skipWorld(worldId, items.length);
                  else skipToLevel(worldId, to, items.length);
                  sfx.levelUp();
                  setPhase("won");
                }
              }}
            />
          </div>
        )}

        {phase === "won" && (
          <section className="mt-6 bg-card/90 border border-success/40 rounded-lg p-8 text-center animate-scale-in">
            <div className="text-xs uppercase tracking-widest text-success mb-2">Prueba superada</div>
            <h2 className="text-2xl font-display">
              {target === "mundo" ? "Mundo desbloqueado por completo" : `Nivel ${to + 1} desbloqueado`}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Has demostrado dominar {nSkipped} nivel{nSkipped === 1 ? "" : "es"}. Puedes volver a
              cualquiera de ellos cuando quieras.
            </p>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {target === "mundo" ? (
                <Link to="/mundos" className="px-5 py-2.5 rounded-md bg-foreground text-background btn-glow">
                  Ver mundos →
                </Link>
              ) : (
                <button
                  onClick={() => navigate({ to: "/nivel/$worldId/$levelIdx", params: { worldId, levelIdx: String(to) } })}
                  className="px-5 py-2.5 rounded-md bg-foreground text-background btn-glow"
                >
                  Ir al nivel {to + 1} →
                </button>
              )}
              <Link to="/mundo/$worldId" params={{ worldId }} className="px-5 py-2.5 rounded-md border border-border">
                Volver al mundo
              </Link>
            </div>
          </section>
        )}

        {phase === "lost" && (
          <section className="mt-6 bg-card/90 border border-destructive/40 rounded-lg p-8 text-center animate-scale-in">
            <div className="text-xs uppercase tracking-widest text-destructive mb-2">Prueba fallada</div>
            <h2 className="text-2xl font-display">Aún no dominas esos niveles</h2>
            <p className="text-sm text-muted-foreground mt-2">
              No pasa nada: repasa las lecciones y vuelve a intentarlo cuando quieras.
            </p>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => { setI(0); setPhase("intro"); }}
                className="px-5 py-2.5 rounded-md bg-foreground text-background btn-glow"
              >
                Reintentar
              </button>
              <Link to="/mundo/$worldId" params={{ worldId }} className="px-5 py-2.5 rounded-md border border-border">
                Volver al mundo
              </Link>
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
