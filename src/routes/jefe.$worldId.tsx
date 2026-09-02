import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { getWorld } from "@/lib/content/worlds";
import { BossPortrait } from "@/components/BossPortrait";
import { ExerciseRunner } from "@/components/ExerciseRunner";
import { Rich } from "@/components/Rich";
import { useEffect, useRef, useState } from "react";
import { defeatBoss, useProgress } from "@/lib/game-state";
import { bossUnlocked } from "@/lib/unlock";

export const Route = createFileRoute("/jefe/$worldId")({
  head: ({ params }) => {
    const w = getWorld(params.worldId);
    const url = `https://analynx-math.lovable.app/jefe/${params.worldId}`;
    const title = `Jefe ${w?.boss?.name ?? ""} — ${w?.title ?? ""}`;
    const desc = `Batalla final de ${w?.title}: enfréntate a ${w?.boss?.name}.`;
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
    if (!w || !w.boss) throw notFound();
    return { worldId: params.worldId };
  },
  component: BossPage,
});

function BossPage() {
  const { worldId } = Route.useParams();
  const world = getWorld(worldId)!;
  const boss = world.boss!;
  const navigate = useNavigate();
  const progress = useProgress();
  const canFight = bossUnlocked(worldId, progress);

  const [phase, setPhase] = useState<"intro" | "fight" | "win" | "lose">("intro");
  const [introLine, setIntroLine] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(0);
  const [tauntIdx, setTauntIdx] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Música del jefe: suena en bucle durante la pelea, se detiene al ganar o salir.
  useEffect(() => {
    if (!boss.themeUrl) return;
    if (phase !== "fight") {
      const a = audioRef.current;
      if (a) { a.pause(); a.currentTime = 0; }
      return;
    }
    if (!audioRef.current) {
      const a = new Audio(boss.themeUrl);
      a.loop = true;
      a.volume = 0.55;
      audioRef.current = a;
    }
    audioRef.current.play().catch(() => { /* autoplay puede requerir interacción */ });
    return () => {
      const a = audioRef.current;
      if (a) { a.pause(); a.currentTime = 0; }
    };
  }, [phase, boss.themeUrl]);

  // Detén al desmontar (cambio de ruta)
  useEffect(() => () => {
    const a = audioRef.current;
    if (a) { a.pause(); a.src = ""; }
  }, []);


  const currentLine =
    phase === "intro"
      ? boss.intro[introLine]
      : phase === "win"
        ? boss.defeat
        : phase === "lose"
          ? boss.victory
          : tauntIdx >= 0
            ? boss.taunts[tauntIdx % boss.taunts.length]
            : `Pregunta ${exIdx + 1} de ${boss.exercises.length}. Resuélvela si te atreves. (Fallos: ${fails}/3)`;

  if (!canFight) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">🔒</div>
          <h1 className="text-2xl font-display tracking-tight mt-4">Batalla bloqueada</h1>
          <p className="text-muted-foreground mt-2">
            Debes completar todos los niveles de <em>{world.title}</em> antes de enfrentarte a{" "}
            <strong className="text-foreground">{boss.name}</strong>.
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
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to="/mundo/$worldId"
          params={{ worldId }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {world.title}
        </Link>

        <div className="mt-6 grid md:grid-cols-[260px_1fr] gap-8 items-start">
          <div className="bg-card border border-border/60 rounded-lg p-4">
            <div
              className="aspect-[5/6] rounded overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${boss.accent}22, transparent)` }}
            >
              {boss.portraitUrl ? (
                <img
                  src={boss.portraitUrl}
                  alt={`Retrato de ${boss.name}`}
                  className="w-full h-full object-cover grayscale-[15%]"
                />
              ) : (
                <BossPortrait
                  name={boss.name}
                  accent={boss.accent}
                  speaking={phase !== "win"}
                />
              )}
            </div>
            <div className="mt-3">
              <div className="text-xs uppercase tracking-widest" style={{ color: boss.accent }}>
                Jefe
              </div>
              <div className="font-display text-lg">{boss.name}</div>
              <div className="text-xs text-muted-foreground">{boss.era}</div>
            </div>
          </div>

          <div>
            <div
              className="relative bg-card border border-border/60 rounded-lg p-5 italic text-lg leading-relaxed"
              style={{ borderLeftColor: boss.accent, borderLeftWidth: 3 }}
            >
              <div className="text-xs not-italic uppercase tracking-widest mb-1" style={{ color: boss.accent }}>
                {boss.name} dice
              </div>
              <Rich source={`"${currentLine}"`} />
            </div>

            {phase === "intro" && (
              <div className="mt-5 flex justify-end">
                {introLine + 1 < boss.intro.length ? (
                  <button
                    onClick={() => setIntroLine(introLine + 1)}
                    className="px-5 py-2.5 rounded-md border border-border hover:bg-secondary"
                  >
                    Continuar →
                  </button>
                ) : (
                  <button
                    onClick={() => setPhase("fight")}
                    className="px-5 py-2.5 rounded-md text-accent-foreground hover:opacity-90"
                    style={{ background: boss.accent }}
                  >
                    Comenzar batalla
                  </button>
                )}
              </div>
            )}

            {phase === "fight" && (
              <div className="mt-5">
                <ExerciseRunner
                  key={exIdx}
                  exercise={boss.exercises[exIdx]}
                  index={exIdx}
                  total={boss.exercises.length}
                  bossMode
                  onComplete={({ correct }) => {
                    const earned = correct ? 20 : 0;
                    const newScore = score + earned;
                    setScore(newScore);
                    const newFails = correct ? fails : fails + 1;
                    if (!correct) {
                      setFails(newFails);
                      setTauntIdx((t) => t + 1);
                    } else {
                      setTauntIdx(-1);
                    }
                    if (newFails >= 3) {
                      setPhase("lose");
                      return;
                    }
                    if (exIdx + 1 < boss.exercises.length) {
                      setExIdx(exIdx + 1);
                    } else {
                      const bonus = 100;
                      const total = newScore + bonus;
                      defeatBoss(worldId, total, Math.round(newScore / 20));
                      setScore(total);
                      setPhase("win");
                    }
                  }}
                />
              </div>
            )}

            {phase === "win" && (
              <div className="mt-6 bg-card border border-success/40 rounded-lg p-6 text-center">
                <div className="text-xs uppercase tracking-widest text-success mb-1">Victoria</div>
                <h2 className="text-2xl font-display">+{score} puntos</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Has vencido a {boss.name}. El mundo queda completado.
                </p>
                <div className="mt-5 flex gap-3 justify-center">
                  <Link
                    to="/mundos"
                    className="px-5 py-2.5 rounded-md bg-foreground text-background"
                  >
                    Ver otros mundos
                  </Link>
                  <button
                    onClick={() => navigate({ to: "/tienda" })}
                    className="px-5 py-2.5 rounded-md border border-border"
                  >
                    Gastar puntos en la tienda
                  </button>
                </div>
              </div>
            )}

            {phase === "lose" && (
              <div className="mt-6 bg-card border border-destructive/40 rounded-lg p-6 text-center">
                <div className="text-xs uppercase tracking-widest text-destructive mb-1">Derrota</div>
                <h2 className="text-2xl font-display">Has sido vencido</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Fallaste 3 ejercicios. {boss.name} conserva su corona. Vuelve cuando estés preparado.
                </p>
                <div className="mt-5 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setPhase("intro");
                      setIntroLine(0);
                      setExIdx(0);
                      setScore(0);
                      setFails(0);
                      setTauntIdx(-1);
                    }}
                    className="px-5 py-2.5 rounded-md bg-foreground text-background"
                  >
                    Reintentar
                  </button>
                  <Link
                    to="/mundo/$worldId"
                    params={{ worldId }}
                    className="px-5 py-2.5 rounded-md border border-border"
                  >
                    Volver al mundo
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
