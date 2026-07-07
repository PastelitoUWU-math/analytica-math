import { useState } from "react";
import { checkAnswer } from "@/lib/answer-check";
import { Rich } from "./Rich";
import type { Exercise } from "@/lib/content/types";
import { useBoost, useProgress } from "@/lib/game-state";
import { sfx } from "@/lib/sfx";

type Props = {
  exercise: Exercise;
  index: number;
  total: number;
  bossMode?: boolean;
  onComplete: (result: { correct: boolean; revealed: boolean; attempts: number }) => void;
};

export function ExerciseRunner({ exercise, index, total, bossMode = false, onComplete }: Props) {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "revealed">("idle");
  const [showHint, setShowHint] = useState(false);
  const progress = useProgress();

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (status === "correct" || status === "revealed") return;
    const ok = checkAnswer(input, exercise.answer);
    if (ok) {
      setStatus("correct");
      sfx.correct();
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    const maxAttempts = bossMode ? 2 : 5;
    if (next >= maxAttempts) {
      setStatus("revealed");
      sfx.reveal();
    } else {
      setStatus("wrong");
      sfx.wrong();
    }
  };

  const useHint = () => {
    if (useBoost("hint")) setShowHint(true);
  };
  const useSkip = () => {
    if (useBoost("skip")) setStatus("revealed");
  };

  return (
    <article className="bg-card border border-border/60 rounded-lg p-6 shadow-sm">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Ejercicio {index + 1} de {total}
        </span>
        <span className="text-xs text-muted-foreground">
          Intentos: {attempts}/{bossMode ? 2 : 5}
        </span>
      </div>
      <Rich source={exercise.prompt} className="text-lg" />

      {!bossMode && exercise.hint && (showHint || progress.boosts.hint > 0) && (
        <div className="mt-3">
          {showHint ? (
            <div className="text-sm bg-secondary/60 border border-border/60 rounded p-3">
              <span className="font-semibold mr-2">Pista:</span>
              <Rich source={exercise.hint} className="inline" />
            </div>
          ) : (
            <button
              onClick={useHint}
              className="text-xs text-accent underline-offset-2 hover:underline"
            >
              Usar 1 pista ({progress.boosts.hint} disp.)
            </button>
          )}
        </div>
      )}

      <form onSubmit={submit} className="mt-5 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          inputMode="decimal"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status === "correct" || status === "revealed"}
          placeholder="p. ej. 1.23"
          className="flex-1 min-w-[200px] px-3 py-2 rounded-md border border-input bg-background font-mono tabular-nums text-lg focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
        <button
          type="submit"
          disabled={status === "correct" || status === "revealed" || !input}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition"
        >
          Comprobar
        </button>
        {!bossMode && status !== "correct" && status !== "revealed" && progress.boosts.skip > 0 && (
          <button
            type="button"
            onClick={useSkip}
            className="px-3 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground"
          >
            Saltar ({progress.boosts.skip})
          </button>
        )}
      </form>

      <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
        Formato numérico: decimal con al menos 2 dígitos de precisión (ej. <code className="font-mono">1.23</code>,{" "}
        <code className="font-mono">8.0093</code>). Si vale exactamente $5$, escribe{" "}
        <code className="font-mono">5.00</code>. Casos especiales: escribe <code className="font-mono">No</code>{" "}
        si el límite no existe, <code className="font-mono">Inf</code> si tiende a $+\infty$,{" "}
        <code className="font-mono">-Inf</code> si tiende a $-\infty$.
      </div>

      {status === "wrong" && (
        <div className="mt-4 p-3 rounded border border-destructive/40 bg-destructive/5 text-destructive text-sm">
          No es correcto. Te quedan {(bossMode ? 2 : 5) - attempts} intento(s) antes de que te revele la solución.
        </div>
      )}

      {(status === "correct" || status === "revealed") && (
        <div
          className={`mt-4 p-4 rounded border ${
            status === "correct"
              ? "border-success/40 bg-success/5"
              : "border-accent/40 bg-accent/5"
          }`}
        >
          <div
            className={`text-sm font-semibold mb-2 ${
              status === "correct" ? "text-success" : "text-accent-foreground"
            }`}
          >
            {status === "correct"
              ? "✓ Correcto"
              : `Solución revelada (tras ${attempts} intentos)`}
          </div>
          <Rich source={exercise.solution} />
          <div className="mt-4 text-right">
            <button
              onClick={() =>
                onComplete({
                  correct: status === "correct",
                  revealed: status === "revealed",
                  attempts,
                })
              }
              className="px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition"
            >
              {index + 1 === total ? "Terminar nivel →" : "Siguiente ejercicio →"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
