import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { buyBoost, buyCosmetic, setTheme, useProgress } from "@/lib/game-state";

type Cosmetic = { id: string; name: string; cost: number; preview: string[] };

const COSMETICS: Cosmetic[] = [
  {
    id: "theme-pergamino",
    name: "Pergamino (incluido)",
    cost: 0,
    preview: ["#fdfaf0", "#2d2a26", "#a8682a", "#7a4a18"],
  },
  {
    id: "theme-nocturno",
    name: "Tinta nocturna",
    cost: 150,
    preview: ["#0e1322", "#e7e4d8", "#8aa1d6", "#c97a52"],
  },
  {
    id: "theme-jardin",
    name: "Jardín de Leibniz",
    cost: 300,
    preview: ["#f3f1e7", "#1a2b1f", "#2f6b3a", "#b89230"],
  },
  {
    id: "theme-conjugado",
    name: "Conjugado dorado",
    cost: 500,
    preview: ["#1a1a1a", "#f4ead0", "#d4a836", "#9e2b25"],
  },
];

const BOOSTS = [
  {
    id: "hint",
    name: "Pista",
    desc: "Revela la pista del ejercicio actual.",
    cost: 30,
    icon: "?",
  },
  {
    id: "skip",
    name: "Saltar ejercicio",
    desc: "Salta un ejercicio sin penalización (no suma puntos).",
    cost: 80,
    icon: "→",
  },
] as const;

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — Analytica" },
      {
        name: "description",
        content: "Cambia el tema visual de Analytica y compra potenciadores con tus puntos.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const progress = useProgress();
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <h1 className="text-3xl font-display tracking-tight">Tienda</h1>
          <span className="text-sm text-muted-foreground">
            Tienes <span className="text-foreground tabular-nums">{progress.points}</span> puntos
          </span>
        </div>

        <h2 className="mt-10 text-xl font-display">Potenciadores</h2>
        <p className="text-sm text-muted-foreground">
          Te ayudan durante un nivel. Se consumen al usarlos.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {BOOSTS.map((b) => (
            <div key={b.id} className="bg-card border border-border/60 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg flex items-center gap-2">
                  <span
                    className="inline-flex w-7 h-7 items-center justify-center rounded bg-secondary border border-border text-sm"
                    aria-hidden
                  >
                    {b.icon}
                  </span>
                  {b.name}
                </div>
                <span className="text-xs text-muted-foreground">
                  Tienes: {progress.boosts[b.id as "hint" | "skip"]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{b.desc}</p>
              <button
                onClick={() => buyBoost(b.id as "hint" | "skip", b.cost)}
                disabled={progress.points < b.cost}
                className="mt-4 px-4 py-2 rounded-md bg-foreground text-background disabled:opacity-40"
              >
                Comprar · {b.cost} pts
              </button>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-display">Temas visuales</h2>
        <p className="text-sm text-muted-foreground">
          Cambia la atmósfera de Analytica. (Los temas se aplican como acento decorativo
          al perfil; el cambio completo de paleta llegará en una próxima actualización.)
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {COSMETICS.map((c) => {
            const owned = progress.ownedCosmetics.includes(c.id);
            const active = progress.activeTheme === c.id;
            return (
              <div
                key={c.id}
                className={`bg-card border rounded-lg p-5 ${active ? "border-accent" : "border-border/60"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg">{c.name}</div>
                  {active && (
                    <span className="text-xs text-accent uppercase tracking-widest">activo</span>
                  )}
                </div>
                <div className="mt-3 flex gap-1 h-8 rounded overflow-hidden">
                  {c.preview.map((col, i) => (
                    <div key={i} className="flex-1" style={{ background: col }} />
                  ))}
                </div>
                <div className="mt-4">
                  {owned ? (
                    <button
                      onClick={() => setTheme(c.id)}
                      disabled={active}
                      className="px-4 py-2 rounded-md border border-border disabled:opacity-40"
                    >
                      {active ? "Activo" : "Activar"}
                    </button>
                  ) : (
                    <button
                      onClick={() => buyCosmetic(c.id, c.cost)}
                      disabled={progress.points < c.cost}
                      className="px-4 py-2 rounded-md bg-foreground text-background disabled:opacity-40"
                    >
                      Comprar · {c.cost} pts
                    </button>
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
