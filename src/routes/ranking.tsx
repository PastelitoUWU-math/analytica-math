import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { readRanking, setPlayerName, useProgress } from "@/lib/game-state";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking — Analytica" },
      {
        name: "description",
        content: "Clasificación de los mejores analistas matemáticos de Analytica.",
      },
    ],
  }),
  component: RankingPage,
});

function RankingPage() {
  const progress = useProgress();
  const [rank, setRank] = useState<{ name: string; points: number }[]>([]);
  const [name, setName] = useState(progress.playerName);
  useEffect(() => {
    setRank(readRanking());
  }, [progress.points, progress.playerName]);

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display tracking-tight">Clasificación</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Tu puntuación y la de otros analistas. La clasificación se guarda en este
          navegador.
        </p>

        <div className="mt-6 bg-card border border-border/60 rounded-lg p-5">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Tu nombre en la tabla
          </label>
          <div className="mt-2 flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anónimo"
              maxLength={24}
              className="flex-1 px-3 py-2 rounded-md border border-input bg-background"
            />
            <button
              onClick={() => setPlayerName(name.trim() || "Anónimo")}
              className="px-4 py-2 rounded-md bg-foreground text-background"
            >
              Guardar
            </button>
          </div>
        </div>

        <ol className="mt-8 divide-y divide-border/60 bg-card border border-border/60 rounded-lg overflow-hidden">
          {rank.length === 0 ? (
            <li className="p-8 text-center text-muted-foreground text-sm">
              Aún no hay puntuaciones. Resuelve ejercicios para entrar en la tabla.
            </li>
          ) : (
            rank.map((r, i) => {
              const me = r.name === (progress.playerName || "Anónimo");
              return (
                <li
                  key={i}
                  className={`flex items-center justify-between px-5 py-3 ${
                    me ? "bg-accent/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg w-8 text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className={me ? "font-semibold" : ""}>{r.name}</span>
                    {me && <span className="text-xs text-accent">tú</span>}
                  </div>
                  <span className="tabular-nums">{r.points}</span>
                </li>
              );
            })
          )}
        </ol>
      </div>
    </Shell>
  );
}
