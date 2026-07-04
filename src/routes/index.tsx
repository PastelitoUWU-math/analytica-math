import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { WORLDS } from "@/lib/content/worlds";
import { useProgress } from "@/lib/game-state";
import { Rich } from "@/components/Rich";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analytica — Aprende análisis matemático jugando" },
      {
        name: "description",
        content:
          "Analytica es un juego web en español para aprender análisis matemático paso a paso: límites, derivadas, integrales y series. Mundos, niveles y batallas contra matemáticos legendarios.",
      },
      { property: "og:title", content: "Analytica" },
      {
        property: "og:description",
        content:
          "Aprende cálculo desde cero con explicaciones rigurosas paso a paso, en formato de juego.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const progress = useProgress();
  return (
    <Shell>
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Análisis matemático · Jugando · Paso a paso
          </p>
          <span
            className="text-[10px] font-semibold tracking-[0.3em] uppercase px-2 py-0.5 rounded-sm border border-accent/60 text-accent bg-accent/10"
            title="Versión beta: quedan funcionalidades y mundos por añadir"
          >
            Beta
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display tracking-tight leading-[1.05]">
          Bienvenido a <span className="italic">Analytica</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Elige un mundo y empieza a aprender. Las lecciones avanzan despacio para
          consolidar cada concepto; al final de cada mundo, un matemático legendario te espera.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80 max-w-xl mx-auto">
          Esta es la <strong className="text-foreground">versión beta</strong> de Analytica: aún quedan mundos y
          funcionalidades por incorporar.
        </p>
      </section>

      <div className="ink-rule max-w-3xl mx-auto my-4" />

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          {WORLDS.map((w, i) => {
            const completed = progress.completed[w.id] ?? -1;
            const totalLevels = w.levels.length;
            const pct = totalLevels ? Math.round(((completed + 1) / totalLevels) * 100) : 0;
            const bossDone = progress.bossDefeated[w.id];
            return (
              <div
                key={w.id}
                className={`relative bg-card/90 border border-border/60 rounded-xl p-6 card-lift ${
                  w.available ? "" : "opacity-70"
                }`}
              >
                <div className="absolute -top-3 left-5 text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                  Mundo {romanize(i + 1)}
                </div>
                <h2 className="text-xl font-display mt-1">{w.title.replace(/^Mundo [^—]+— /, "")}</h2>
                <p className="text-sm text-muted-foreground italic">{w.subtitle}</p>
                <div className="mt-3 text-[14px] leading-relaxed text-foreground/85">
                  <Rich source={w.summary} />
                </div>
                {w.available ? (
                  <>
                    <div className="mt-4 text-xs text-muted-foreground">
                      {completed + 1} / {totalLevels} niveles · jefe {bossDone ? "vencido" : "pendiente"}
                    </div>
                    <div className="mt-1 h-1.5 bg-secondary rounded overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-5">
                      <Link
                        to="/mundo/$worldId"
                        params={{ worldId: w.id }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background btn-glow"
                      >
                        {completed >= 0 ? "Continuar" : "Empezar"} →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                    Próximamente
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}

function romanize(n: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII"][n - 1] ?? String(n);
}
