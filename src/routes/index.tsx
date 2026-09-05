import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { WORLDS } from "@/lib/content/worlds";
import { useProgress } from "@/lib/game-state";
import { Rich } from "@/components/Rich";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { worldPrereqMet } from "@/lib/unlock";
import { useAuth } from "@/lib/auth";
import { useExpandNav } from "@/components/ExpandNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analynx — Aprende análisis matemático jugando" },
      {
        name: "description",
        content:
          "Analynx es un juego web en español para aprender análisis matemático paso a paso: límites, derivadas, integrales y series. Mundos, niveles y batallas contra matemáticos legendarios.",
      },
      { property: "og:title", content: "Analynx" },
      {
        property: "og:description",
        content:
          "Aprende cálculo desde cero con explicaciones rigurosas paso a paso, en formato de juego.",
      },
      { property: "og:url", content: "https://analynx-math.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://analynx-math.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  const progress = useProgress();
  const { user } = useAuth();
  const unlockedIds = new Set(progress.achievements.map((a) => a.id));
  const achievementsDone = ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length;
  const achievementsPct = Math.round((achievementsDone / ACHIEVEMENTS.length) * 100);
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
          Bienvenido a <span className="italic">Analynx</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Elige un mundo y empieza a aprender. Las lecciones avanzan despacio para
          consolidar cada concepto; al final de cada mundo, un matemático legendario te espera.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80 max-w-xl mx-auto">
          Esta es la <strong className="text-foreground">versión beta</strong> de Analynx: aún quedan mundos y
          funcionalidades por incorporar.
        </p>
      </section>

      <div className="ink-rule max-w-3xl mx-auto my-4" />

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-5 stagger">
          {WORLDS.map((w, i) => {
            const completed = progress.completed[w.id] ?? -1;
            const totalLevels = w.levels.length;
            const pct = totalLevels ? Math.round(((completed + 1) / totalLevels) * 100) : 0;
            const bossDone = progress.bossDefeated[w.id];
            const { prev: prevWorld, met: prereqMet } = worldPrereqMet(w.id, progress);
            const locked = w.available && !prereqMet;
            return (
              <div
                key={w.id}
                data-expand-card
                className={`relative bg-card/90 border border-border/60 rounded-xl p-6 card-lift ${
                  w.available && !locked ? "" : "opacity-70"
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
                {w.available && locked ? (
                  <div className="mt-5">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 bg-secondary/40 text-muted-foreground text-sm">
                      🔒 Vence a {prevWorld?.boss?.name ?? "el jefe anterior"} para desbloquear
                    </div>
                  </div>
                ) : w.available ? (
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
                        onClick={(e) => {
                          const card = e.currentTarget.closest("[data-expand-card]");
                          if (card instanceof HTMLElement) {
                            e.preventDefault();
                            expand(card, { to: "/mundo/$worldId", params: { worldId: w.id } });
                          }
                        }}
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

      {user && (
        <>
          <div className="ink-rule max-w-3xl mx-auto my-4" />

          <section className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-display tracking-tight">Logros</h2>
              <Link to="/logros" className="text-sm text-accent hover:underline underline-offset-4">
                Ver todos →
              </Link>
            </div>
            <div className="mt-4 bg-card/90 border border-border/60 rounded-xl p-6">
              <div className="flex items-baseline justify-between text-sm">
                <span>
                  Logros completados:{" "}
                  <strong className="tabular-nums">
                    {achievementsDone}/{ACHIEVEMENTS.length}
                  </strong>
                </span>
                <span className="text-2xl font-display tabular-nums">{achievementsPct}%</span>
              </div>
              <div className="mt-3 h-3 rounded bg-secondary overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-700"
                  style={{ width: `${achievementsPct}%` }}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {ACHIEVEMENTS.slice(0, 8).map((a) => {
                  const got = unlockedIds.has(a.id);
                  return (
                    <span
                      key={a.id}
                      title={`${a.nombre} — ${a.descripcion}`}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${
                        got
                          ? "border-accent/50 bg-accent/10"
                          : "border-border/50 text-muted-foreground opacity-70"
                      }`}
                    >
                      <span>{got ? a.icono : "🔒"}</span>
                      {a.nombre}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

    </Shell>
  );
}

function romanize(n: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII"][n - 1] ?? String(n);
}
