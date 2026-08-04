import { useMemo, useRef, useState, useEffect } from "react";
import { Rich } from "./Rich";
import { sfx } from "@/lib/sfx";

/** Divide la lección en secciones usando los encabezados `###` / `##`. */
function splitSections(body: string): { title: string | null; content: string }[] {
  const lines = body.replace(/\r/g, "").split("\n");
  const sections: { title: string | null; content: string[] }[] = [];
  let current: { title: string | null; content: string[] } = { title: null, content: [] };
  for (const line of lines) {
    const h = line.match(/^#{2,4}\s+(.*)$/);
    if (h) {
      if (current.title !== null || current.content.join("").trim()) sections.push(current);
      current = { title: h[1]!.trim(), content: [] };
    } else {
      current.content.push(line);
    }
  }
  if (current.title !== null || current.content.join("").trim()) sections.push(current);
  return sections
    .map((s) => ({ title: s.title, content: s.content.join("\n").trim() }))
    .filter((s) => s.title || s.content);
}

const NUDGES = [
  "Tómate un segundo antes de continuar: ¿podrías explicárselo a alguien?",
  "Si algo no ha quedado claro, vuelve atrás. No hay prisa.",
  "Lee la fórmula en voz alta. Ayuda más de lo que parece.",
  "Este bloque es una pieza del puzzle. Guárdala.",
];

export function LessonPlayer({
  body,
  exerciseCount,
  onFinish,
}: {
  body: string;
  exerciseCount: number;
  onFinish: () => void;
}) {
  const sections = useMemo(() => splitSections(body), [body]);
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const total = sections.length;
  const visible = showAll ? total : Math.min(step + 1, total);
  const atEnd = visible >= total;
  const pct = total ? Math.round((visible / total) * 100) : 100;

  useEffect(() => {
    if (step > 0) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const next = () => {
    sfx.click();
    setStep((s) => Math.min(s + 1, total - 1));
  };

  return (
    <section className="mt-6 animate-fade-in">
      {/* Barra de progreso de lectura */}
      <div className="sticky top-14 z-20 -mx-1 px-1 py-2 bg-background/85 backdrop-blur rounded-b-md">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="text-accent">Lección interactiva</span>
          <span className="tabular-nums">
            {visible}/{total} · {pct}%
          </span>
        </div>
        <div className="mt-1.5 h-1.5 rounded bg-secondary overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {sections.map((s, i) => {
            const seen = i < visible;
            return (
              <button
                key={i}
                onClick={() => {
                  if (!seen) return;
                  sfx.click();
                  setStep(Math.max(step, i));
                  document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                disabled={!seen}
                title={s.title ?? `Bloque ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  seen ? "bg-accent w-6 hover:w-8" : "bg-border w-3"
                }`}
                aria-label={s.title ?? `Bloque ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {sections.slice(0, visible).map((s, i) => (
          <article
            key={i}
            id={`sec-${i}`}
            className={`bg-card/90 border rounded-lg p-6 md:p-7 card-lift animate-fade-in ${
              i === visible - 1 && !showAll ? "border-accent/50 shadow-sm" : "border-border/60"
            }`}
          >
            {s.title && (
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[11px] tabular-nums text-accent border border-accent/40 rounded px-1.5 py-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display tracking-tight text-xl text-accent">
                  <Rich source={s.title} className="inline [&>p]:inline" />
                </h2>
              </div>
            )}
            {s.content && <Rich source={s.content} />}
          </article>
        ))}
      </div>

      <div ref={endRef} />

      {!atEnd ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground italic max-w-sm">
            {NUDGES[visible % NUDGES.length]}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { sfx.click(); setShowAll(true); }}
              className="px-4 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground"
            >
              Ver lección completa
            </button>
            <button
              onClick={next}
              className="px-5 py-2.5 rounded-md bg-foreground text-background hover:opacity-90 btn-glow"
            >
              Continuar →
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-success/40 bg-success/5 p-6 text-center animate-scale-in">
          <div className="text-xs uppercase tracking-widest text-success">Lección completada</div>
          <p className="text-sm text-muted-foreground mt-2">
            Has recorrido los {total} bloques. Ahora toca comprobar si se te ha quedado.
          </p>
          <button
            onClick={() => { sfx.levelUp(); onFinish(); }}
            className="mt-4 px-5 py-2.5 rounded-md bg-foreground text-background hover:opacity-90 btn-glow"
          >
            Empezar ejercicios ({exerciseCount}) →
          </button>
        </div>
      )}
    </section>
  );
}
